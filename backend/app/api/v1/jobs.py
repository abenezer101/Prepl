from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import List

router = APIRouter()

class JobDescriptionPayload(BaseModel):
    title: str
    description: str
    requirements: List[str]

@router.post("/ingest")
async def ingest_job_description(payload: JobDescriptionPayload):
    # Stub job description ingest pipeline
    return {
        "status": "success",
        "job_id": "job_991",
        "title": payload.title,
        "requirements_parsed": len(payload.requirements)
    }

@router.post("/apply")
async def submit_candidate_profile(
    name: str = Form(...),
    email: str = Form(...),
    resume: UploadFile = File(...)
):
    # Stub applicant resume parser pipeline
    return {
        "status": "applied",
        "candidate_id": "cand_087",
        "name": name,
        "email": email,
        "resume_filename": resume.filename
    }
