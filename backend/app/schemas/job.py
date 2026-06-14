from pydantic import BaseModel, Field
from typing import List, Optional

class JobBase(BaseModel):
    title: str = Field(..., description="Job role position title")
    description: str = Field(..., description="Details and overview specifications")
    requirements: List[str] = Field(default=[], description="List of technical stack keywords")

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: str
    status: str
    class Config:
        from_attributes = True
