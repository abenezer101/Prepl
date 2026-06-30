"""
LiveKit access token generator.

Generates short-lived room tokens for the interview session WebRTC connection.
Tokens are scoped per-user and per-room — a user can only join the room
that belongs to their session.
"""

import uuid
from livekit.api import AccessToken, VideoGrants
from app.config import settings


def generate_interview_token(
    user_id: str,
    session_id: str,
    user_name: str = "Candidate",
) -> tuple[str, str]:
    """
    Generate a LiveKit access token for a specific interview session.

    Returns:
        (token, room_name) — the JWT string and the room name used.
    """
    room_name = f"interview-{session_id}"

    token = (
        AccessToken(
            api_key=settings.LIVEKIT_API_KEY,
            api_secret=settings.LIVEKIT_API_SECRET,
        )
        .with_identity(user_id)
        .with_name(user_name)
        .with_grants(
            VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,       # candidate publishes their mic
                can_subscribe=True,     # candidate receives AI audio
                can_publish_data=True,  # session control messages
            )
        )
        .to_jwt()
    )

    return token, room_name
