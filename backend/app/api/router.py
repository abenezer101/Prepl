from fastapi import APIRouter
from app.api.v1 import auth, jobs, sandbox, session

api_router = APIRouter()

# Register sub-routes
api_router.include_router(auth.router, prefix="/v1/auth", tags=["auth"])
api_router.include_router(jobs.router, prefix="/v1/jobs", tags=["jobs"])
api_router.include_router(sandbox.router, prefix="/v1/sandbox", tags=["sandbox"])
api_router.include_router(session.router, prefix="/v1/sessions", tags=["sessions"])
