import os
import replicate
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

class AIService:
    def __init__(self):
        self.api_token = os.getenv("REPLICATE_API_TOKEN")
        if not self.api_token:
            raise ValueError("REPLICATE_API_TOKEN not found in environment variables")

    def video_generation_from_text(self, prompt: str) -> str:
        try:
            client = replicate.Client(api_token=self.api_token)
            # Example: AnimateDiff model (change model if you want)
            output = client.run(
                "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
                input={
                    "prompt": prompt,
                    "negative_prompt": "blurry, bad quality, worst quality, low quality, text, watermark, signature, logo",
                    "num_frames": 16,
                    "num_inference_steps": 20
                }
            )
            # Output is usually a list with the video URL as the first item
            if isinstance(output, list) and output:
                return output[0]
            else:
                return output
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Video generation failed: {str(e)}"
            )
