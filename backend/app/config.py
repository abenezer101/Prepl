import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GEMINI_API_KEY: str = "your_key_here"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/prepl"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    
    # Calibration model thresholds
    EYE_GAZE_DEVIATION_THRESHOLD: float = 0.15 # 15% Max deviation
    COMPOSURE_MIN_THRESHOLD: float = 75.0
    SPEECH_PACING_MIN_WPM: int = 110
    SPEECH_PACING_MAX_WPM: int = 180

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
