from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class CandidateBase(BaseModel):
    name: str = Field(..., description="Full name of applicant")
    email: EmailStr = Field(..., description="Primary contact address")
    github_username: Optional[str] = Field(None, description="Candidate GitHub profile alias")

class CandidateCreate(CandidateBase):
    pass

class CandidateResponse(CandidateBase):
    id: str
    class Config:
        from_attributes = True
