"""
Prepl Interview Agent — LiveKit + Gemini Live

This agent runs as a server-side LiveKit worker.
When a candidate joins a room, this agent:
1. Connects to the LiveKit room.
2. Starts a Gemini Live session with a role-specific system prompt.
3. Pipes bidirectional audio: candidate mic → Gemini → AI voice output.
4. Greets the candidate and conducts the structured interview.

The agent is launched separately via `agent_worker.py`, not as part of
the FastAPI server. Run both processes together:
    uvicorn backend.main:app --port 8000
    python backend/agent_worker.py dev

Environment variables required:
    LIVEKIT_URL         wss://your-project.livekit.cloud
    LIVEKIT_API_KEY     from LiveKit dashboard
    LIVEKIT_API_SECRET  from LiveKit dashboard
    GEMINI_API_KEY      from Google AI Studio
"""

from livekit import agents
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, RoomInputOptions
from livekit.plugins import google

import logging
import os

logger = logging.getLogger("prepl.interview_agent")

# ── System prompt templates ───────────────────────────────────────────────────

STAR_SYSTEM_PROMPT = """You are Alex, an expert AI technical interviewer at Prepl. 
Your job is to conduct a structured STAR-method behavioral interview.

INTERVIEW PROTOCOL:
1. Greet the candidate warmly by name if known, otherwise say "Welcome to your Prepl session."
2. Ask one question at a time — always STAR-structured (Situation, Task, Action, Result).
3. Listen actively. Ask ONE follow-up if the candidate's answer is vague or missing a component.
4. Keep a professional but warm, human tone. You are supportive, not intimidating.
5. After 4-5 questions, conclude the session graciously and tell the candidate they did great.
6. Never break character. Never mention you are an AI mid-interview.

PACING:
- Speak clearly and at a natural 130-150 WPM pace.
- Leave natural pauses after questions so the candidate has time to think.
- If the candidate speaks too fast or rushes, gently say: "Take your time, there's no rush."

START: Greet the candidate and ask your first STAR behavioral question."""

BEHAVIORAL_DEEP_DIVE_PROMPT = """You are Morgan, a senior technical interviewer at Prepl specializing
in deep behavioral assessments for senior and leadership roles.

INTERVIEW PROTOCOL:
1. Open with a brief welcome and set expectations for the session.
2. Conduct 3-4 deep behavioral probes — focus on leadership, conflict resolution, 
   cross-functional collaboration, and high-stakes decision making.
3. For each question, probe 2 levels deep: initial answer → clarification → impact.
4. Challenge the candidate constructively if their answer is too surface-level.
5. Close the session by summarizing what you heard and thanking the candidate.

TONE: Senior, intellectually rigorous but respectful. Not intimidating — coaching.

START: Introduce yourself and begin the first behavioral deep-dive question."""


def get_system_prompt(session_type: str | None, job_description: str | None) -> str:
    """Build the system prompt, optionally injecting the job description for calibration."""
    base = BEHAVIORAL_DEEP_DIVE_PROMPT if session_type == "behavioral_deep_dive" else STAR_SYSTEM_PROMPT

    if job_description:
        calibration = (
            f"\n\nROLE CONTEXT (calibrate your questions to this role):\n{job_description[:1000]}"
        )
        return base + calibration

    return base


# ── Agent entrypoint ──────────────────────────────────────────────────────────

async def entrypoint(ctx: JobContext):
    """
    Called by the LiveKit worker for each new interview room.
    Reads room metadata to get session_type and job_description,
    then starts the Gemini Live session.
    """
    await ctx.connect()

    logger.info(f"Agent connected to room: {ctx.room.name}")

    # Read session metadata from room (set by backend when creating the LiveKit room)
    room_metadata: dict = {}
    try:
        import json
        room_metadata = json.loads(ctx.room.metadata or "{}")
    except Exception:
        pass

    session_type = room_metadata.get("session_type", "star_conversational")
    job_description = room_metadata.get("job_description")
    agent_name = "Alex" if session_type == "star_conversational" else "Morgan"

    system_prompt = get_system_prompt(session_type, job_description)

    session = AgentSession(
        llm=google.realtime.RealtimeModel(
            model="gemini-2.5-flash-preview-native-audio-dialog",
            voice="Puck",           # Natural, warm voice
            temperature=0.75,
            modalities=["AUDIO"],
        )
    )

    await session.start(
        room=ctx.room,
        agent=Agent(instructions=system_prompt),
        room_input_options=RoomInputOptions(),
    )

    # Send the opening greeting
    await session.generate_reply(
        instructions=(
            f"You are {agent_name}. Greet the candidate warmly and begin the interview "
            f"with your first question. Keep the opener under 30 seconds."
        )
    )

    logger.info(f"Session started — agent: {agent_name}, type: {session_type}")


# ── Worker options ────────────────────────────────────────────────────────────

worker_options = WorkerOptions(entrypoint_fnc=entrypoint)

if __name__ == "__main__":
    cli.run_app(worker_options)
