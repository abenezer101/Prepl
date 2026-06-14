from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    role: str

@router.post("/login", response_model=UserResponse)
async def login(payload: LoginRequest):
    # Stub login verification
    if payload.email == "founder@prepl.ai" and payload.password == "admin":
        return UserResponse(id="usr_001", email=payload.email, role="founder")
    if payload.email == "candidate@prepl.ai" and payload.password == "warmup":
        return UserResponse(id="usr_002", email=payload.email, role="candidate")
    raise HTTPException(status_code=400, detail="Invalid login credentials")

@router.get("/verify")
async def verify_token():
    return {"status": "authenticated", "user_id": "usr_001", "role": "founder"}
