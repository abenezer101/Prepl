from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Literal
from app.services.auth import get_current_user, get_current_user_id
from app.services.supabase_client import (
    create_session_record,
    update_session_status,
    update_session_scores,
    save_recommendations,
    get_session,
)
from app.services.livekit_token import generate_interview_token
from app.agents.grading import GradingAgent
from app.config import settings

router = APIRouter()

grading_agent = GradingAgent()

# ── Request / Response schemas ────────────────────────────────────────────────

class CreateSessionRequest(BaseModel):
    session_type: Literal["star_conversational", "behavioral_deep_dive"]
    job_description: str | None = None


class CreateSessionResponse(BaseModel):
    session_id: str
    livekit_token: str
    livekit_url: str
    room_name: str


class CompleteSessionRequest(BaseModel):
    transcript: str | None = None
    wpm_avg: int | None = None


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("/create", response_model=CreateSessionResponse)
async def create_session(
    payload: CreateSessionRequest,
    user: dict = Depends(get_current_user),
):
    """
    Create a new interview session.
    - Inserts a session record into Supabase (status: pending).
    - Generates a scoped LiveKit room token for this user + session.
    - Returns everything the frontend needs to join the LiveKit room.
    """
    user_id: str = user["sub"]
    user_name: str = user.get("user_metadata", {}).get("full_name", "Candidate")

    # 1. Create DB record
    session = await create_session_record(
        user_id=user_id,
        session_type=payload.session_type,
        job_description=payload.job_description,
    )
    session_id: str = session["id"]

    # 2. Generate LiveKit token
    token, room_name = generate_interview_token(
        user_id=user_id,
        session_id=session_id,
        user_name=user_name,
    )

    # 3. Mark session as in-progress
    await update_session_status(session_id, "in_progress")

    return CreateSessionResponse(
        session_id=session_id,
        livekit_token=token,
        livekit_url=settings.LIVEKIT_URL,
        room_name=room_name,
    )


@router.post("/{session_id}/complete")
async def complete_session(
    session_id: str,
    payload: CompleteSessionRequest,
    user_id: str = Depends(get_current_user_id),
):
    """
    Mark a session as complete and trigger AI grading.
    - Verifies ownership (user_id from JWT must match session record).
    - Runs the GradingAgent on the transcript.
    - Writes scores and recommendations back to Supabase.
    """
    # Ownership check
    session = await get_session(session_id, user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or access denied.")

    if session.get("status") == "completed":
        return {"message": "Session already completed."}

    # Run grading
    evaluation = await grading_agent.evaluate_candidate(
        parsed_candidate={"user_id": user_id},
        custom_challenge={"session_type": session.get("session_type")},
        session_transcript=[
            {"role": "candidate", "text": payload.transcript or ""}
        ],
    )

    scores = {
        "overall_score": evaluation.get("composite_score"),
        "transcript": payload.transcript,
        "wpm_avg": payload.wpm_avg,
    }

    await update_session_scores(session_id, scores)
    await save_recommendations(
        session_id,
        [
            {"category": "growth", "recommendation": r, "priority": i + 1}
            for i, r in enumerate(evaluation.get("growth_recommendations", []))
        ],
    )

    return {"message": "Session completed.", "session_id": session_id}


@router.get("/{session_id}")
async def get_session_detail(
    session_id: str,
    user_id: str = Depends(get_current_user_id),
):
    """
    Fetch a single session with its recommendations.
    Enforces ownership — you can only read your own sessions.
    """
    session = await get_session(session_id, user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or access denied.")
    return session


@router.post("/{session_id}/telemetry")
async def log_telemetry(
    session_id: str,
    payload: dict,
    user_id: str = Depends(get_current_user_id),
):
    """Lightweight telemetry sink — accepts WPM / gaze data from the interview room."""
    return {"status": "logged", "session_id": session_id}
