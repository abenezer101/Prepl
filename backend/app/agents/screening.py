from typing import Dict, Any

class ScreeningAgent:
    def __init__(self):
        self.system_instruction = (
            "You are the Screening Agent for Prepl. Your role is to formulate custom, "
            "role-specific technical challenges and voice screening questions based on "
            "the candidate's experience level and the target Job Description."
        )

    async def synthesize_challenges(self, candidate_profile: Dict[str, Any], job_requirements: Dict[str, Any]) -> Dict[str, Any]:
        """
        Creates custom coding sandboxes parameters.
        In a production pipeline, this requests a calibrated challenge using Gemini API.
        """
        stack = job_requirements.get("title", "Software Developer")
        
        return {
            "challenge_id": "challenge_ch_90",
            "type": "architectural_design",
            "description": f"Design a secure websocket message dispatch router matching {stack} settings.",
            "boilerplate_code": "def ws_router(event: dict) -> bool:\n    pass",
            "assertions": ["assert ws_router({'type': 'auth'}) == True"]
        }

    def get_system_instruction(self) -> str:
        return self.system_instruction
