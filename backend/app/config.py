import os
from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Core
    GEMINI_API_KEY: str = "your_key_here"
    ENVIRONMENT: str = "development"
    PORT: int = 8000

    # Supabase — server-side only
    SUPABASE_URL: str = ""
    SUPABASE_PUBLISHABLE_KEY: str = ""     # New name
    SUPABASE_SECRET_KEY: str = ""          # New name (bypasses RLS)
    
    # Legacy keys (for backward compatibility / fallbacks)
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    SUPABASE_JWT_SECRET: str = ""          # Settings → API → JWT Secret

    # LiveKit
    LIVEKIT_URL: str = ""          # wss://your-project.livekit.cloud
    LIVEKIT_API_KEY: str = ""
    LIVEKIT_API_SECRET: str = ""

    # CORS — comma-separated list of allowed origins
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    # Calibration model thresholds
    EYE_GAZE_DEVIATION_THRESHOLD: float = 0.15
    COMPOSURE_MIN_THRESHOLD: float = 75.0
    SPEECH_PACING_MIN_WPM: int = 110
    SPEECH_PACING_MAX_WPM: int = 180

    @model_validator(mode="after")
    def fallback_keys(self) -> 'Settings':
        if not self.SUPABASE_PUBLISHABLE_KEY and self.SUPABASE_ANON_KEY:
            self.SUPABASE_PUBLISHABLE_KEY = self.SUPABASE_ANON_KEY
        if not self.SUPABASE_SECRET_KEY and self.SUPABASE_SERVICE_ROLE_KEY:
            self.SUPABASE_SECRET_KEY = self.SUPABASE_SERVICE_ROLE_KEY
        return self

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
