from fastapi import APIRouter, Depends
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """
    Returns the authenticated user's ID and email.
    Validates the Supabase JWT — returns 401 if missing or invalid.
    """
    return {
        "user_id": user.get("sub"),
        "email": user.get("email"),
        "role": user.get("role", "authenticated"),
    }
