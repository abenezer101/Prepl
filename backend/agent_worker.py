"""
Prepl LiveKit Worker — entry point

Run this process alongside the FastAPI server to power the AI interview agent.

Usage:
    # Development (auto-reconnect on file changes)
    python agent_worker.py dev

    # Production
    python agent_worker.py start

Required environment variables (same .env as the FastAPI server):
    LIVEKIT_URL         wss://your-project.livekit.cloud
    LIVEKIT_API_KEY     from LiveKit dashboard
    LIVEKIT_API_SECRET  from LiveKit dashboard
    GEMINI_API_KEY      from Google AI Studio
"""

import os
import sys
import logging
from pathlib import Path

# Make sure the backend package is importable when running from the project root
sys.path.insert(0, str(Path(__file__).parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / ".env")

# Validate required env vars before starting the worker
_required = ["LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET", "GEMINI_API_KEY"]
_missing = [k for k in _required if not os.getenv(k)]
if _missing:
    print(
        f"[agent_worker] ❌ Missing required environment variables: {', '.join(_missing)}\n"
        "Please fill them in backend/.env before starting the agent worker."
    )
    sys.exit(1)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
)

from livekit.agents import cli
from app.agents.interview_agent import worker_options

if __name__ == "__main__":
    cli.run_app(worker_options)
