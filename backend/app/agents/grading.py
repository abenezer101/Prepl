from typing import Dict, Any, List

class GradingAgent:
    def __init__(self):
        self.system_instruction = (
            "You are the Grading Agent for Prepl. Review the candidate's interview text transcript, "
            "composure metrics, and the output of their sandbox code execution. "
            "Output composite scores and constructive feedback recommendations."
        )

    async def evaluate_candidate(
        self,
        parsed_candidate: Dict[str, Any],
        custom_challenge: Dict[str, Any],
        session_transcript: List[Dict[str, str]]
    ) -> Dict[str, Any]:
        """
        Calculates final assessments grades.
        """
        # Score calculation stubs
        return {
            "composite_score": 96,
            "module_breakdown": {
                "structural_architecture": 98,
                "sandbox_code_execution": 95,
                "conversational_composure": 91
            },
            "growth_recommendations": [
                "Good grasp of cross-origin token setups.",
                "Maintain focus on target webcam indicators."
            ]
        }

    def get_system_instruction(self) -> str:
        return self.system_instruction
