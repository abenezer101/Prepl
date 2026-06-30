"""
Supabase JWT verification dependency for FastAPI.

Every protected endpoint uses `Depends(get_current_user)` which:
1. Extracts the Bearer token from the Authorization header.
2. Verifies signature, expiry, and audience using the Supabase JWT secret.
3. Returns the decoded payload (contains `sub` = Supabase user UUID).

The Supabase JWT secret is found in:
    Supabase Dashboard → Settings → API → JWT Settings → JWT Secret
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from app.config import settings

# ── HTTP Bearer scheme ────────────────────────────────────────────────────────

_bearer = HTTPBearer(auto_error=True)

# ── JWT verification ──────────────────────────────────────────────────────────

def verify_supabase_jwt(token: str) -> dict:
    """
    Decode and verify a Supabase-issued JWT.

    Raises HTTP 401 if the token is malformed, expired, or has an invalid
    signature. Returns the full decoded payload on success.
    """
    if not settings.SUPABASE_JWT_SECRET:
        # In development, if the secret is not configured, return a dev user
        # so local testing doesn't break. Remove this branch before production.
        if settings.ENVIRONMENT == "development":
            return {"sub": "dev-user-id", "email": "dev@prepl.ai", "role": "authenticated"}
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JWT secret not configured on server.",
        )

    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
            options={"verify_exp": True},
        )
        return payload
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {exc}",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


# ── FastAPI dependency ────────────────────────────────────────────────────────

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict:
    """
    FastAPI dependency that validates the Authorization: Bearer token.

    Usage:
        @router.get("/me")
        async def me(user: dict = Depends(get_current_user)):
            return {"user_id": user["sub"]}
    """
    return verify_supabase_jwt(credentials.credentials)


def get_current_user_id(
    user: dict = Depends(get_current_user),
) -> str:
    """Convenience dependency that returns just the Supabase user UUID string."""
    return user["sub"]
