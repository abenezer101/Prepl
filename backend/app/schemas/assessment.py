from pydantic import BaseModel, Field
from typing import List, Dict

class AssessmentBase(BaseModel):
    session_id: str
    composite_score: float = Field(..., ge=0, le=100)
    scores: Dict[str, float] = Field(default={}, description="Scores mapped by module keys")

class AssessmentResponse(AssessmentBase):
    id: str
    growth_recommendations: List[str]
    class Config:
        from_attributes = True
