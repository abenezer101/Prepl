from google import genai
from google.genai import types
from app.config import settings

class GeminiClientManager:
    def __init__(self):
        # Initializes the client wrapper from settings configs
        # Note: If no API Key is provided, client falls back to GEMINI_API_KEY environment variable.
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY if settings.GEMINI_API_KEY != "your_key_here" else None)

    def generate_content_with_system_instruction(
        self,
        prompt: str,
        system_instruction: str,
        model_name: str = "gemini-3.5-flash"
    ) -> str:
        """
        Sends requests to the Gemini model with system instruction configuration parameters.
        """
        try:
            response = self.client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.2
                )
            )
            return response.text or ""
        except Exception as e:
            # Fallback for hackathon testing if API key is invalid
            print(f"Gemini API request failed: {e}")
            return f"[Offline Mock Gemini Response] Prompt: {prompt}"
