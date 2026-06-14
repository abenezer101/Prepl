import sys
import io
import contextlib
from typing import Dict, Any

class SecureSandboxRunner:
    @staticmethod
    def run_untrusted_code(code_string: str, assertions: list) -> Dict[str, Any]:
        """
        Executes code inside a restricted context.
        """
        local_scope = {}
        stdout_capture = io.StringIO()
        
        # Redirect stdout and isolate global namespace
        try:
            with contextlib.redirect_stdout(stdout_capture):
                # Exec user code in isolated locals scope
                exec(code_string, {}, local_scope)
                
                # Exec testing assertions
                for statement in assertions:
                    exec(statement, {}, local_scope)
            
            return {
                "success": True,
                "logs": stdout_capture.getvalue(),
                "error": None
            }
        except Exception as e:
            return {
                "success": False,
                "logs": stdout_capture.getvalue(),
                "error": str(e)
            }
        finally:
            stdout_capture.close()
