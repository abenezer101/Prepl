import json
from typing import Dict, Any

class IngestionAgent:
    def __init__(self):
        self.system_instruction = (
            "You are the Ingestion Agent for Prepl. Your role is to analyze CV text, "
            "LinkedIn details, and GitHub code structure. Extract programming languages, "
            "architecture choices, and any red flags or candidate strengths."
        )

    async def parse_profile(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses applicant resume data.
        In a production pipeline, this calls the google-genai client with system instructions.
        """
        # Mock Gemini parsing extraction
        name = raw_data.get("name", "Unknown Applicant")
        experience = raw_data.get("experience_text", "Python and JavaScript developer.")
        
        extracted_skills = ["Python", "TypeScript", "React"] if "python" in experience.lower() else ["JavaScript"]
        
        return {
            "name": name,
            "skills": extracted_skills,
            "years_of_experience": 3,
            "strengths": ["Clear code organization", "Consistent async functions"],
            "red_flags": []
        }
        
    def get_system_instruction(self) -> str:
        return self.system_instruction
