"""
Supabase admin client for server-side database operations.

Uses the SERVICE ROLE key — this bypasses Row Level Security.
NEVER expose this client or its key to browser code.
"""

from supabase import create_client, Client
from app.config import settings

_admin_client: Client | None = None


def get_supabase_admin() -> Client:
    """Return a singleton Supabase admin client (secret key)."""
    global _admin_client
    if _admin_client is None:
        if not settings.SUPABASE_URL or not settings.SUPABASE_SECRET_KEY:
            raise RuntimeError(
                "SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env "
                "before using the admin Supabase client."
            )
        _admin_client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SECRET_KEY,
        )
    return _admin_client


# ── Session helpers ───────────────────────────────────────────────────────────

async def create_session_record(
    user_id: str,
    session_type: str,
    job_description: str | None,
) -> dict:
    """Insert a new session row and return the created record."""
    sb = get_supabase_admin()
    result = (
        sb.table("sessions")
        .insert({
            "user_id": user_id,
            "session_type": session_type,
            "job_description": job_description,
            "status": "pending",
        })
        .execute()
    )
    return result.data[0]


async def update_session_status(session_id: str, status: str) -> None:
    """Update session status field."""
    sb = get_supabase_admin()
    sb.table("sessions").update({"status": status}).eq("id", session_id).execute()


async def update_session_scores(session_id: str, scores: dict) -> None:
    """Write grading scores and completion timestamp to the sessions table."""
    import datetime
    sb = get_supabase_admin()
    sb.table("sessions").update({
        **scores,
        "status": "completed",
        "completed_at": datetime.datetime.utcnow().isoformat(),
    }).eq("id", session_id).execute()


async def save_recommendations(session_id: str, recommendations: list[dict]) -> None:
    """Bulk-insert recommendations for a completed session."""
    sb = get_supabase_admin()
    rows = [
        {
            "session_id": session_id,
            "category": r.get("category"),
            "recommendation": r.get("recommendation"),
            "priority": r.get("priority", 1),
        }
        for r in recommendations
    ]
    if rows:
        sb.table("recommendations").insert(rows).execute()


async def get_session(session_id: str, user_id: str) -> dict | None:
    """Fetch a session by ID, enforcing ownership (user_id must match)."""
    sb = get_supabase_admin()
    result = (
        sb.table("sessions")
        .select("*, recommendations(*)")
        .eq("id", session_id)
        .eq("user_id", user_id)
        .single()
        .execute()
    )
    return result.data
