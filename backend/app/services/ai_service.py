import os
import replicate
import logging
from dotenv import load_dotenv
from fastapi import HTTPException

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.api_token = os.getenv("REPLICATE_API_TOKEN")
        if not self.api_token:
            logger.error("REPLICATE_API_TOKEN not found in environment variables")
            raise ValueError("REPLICATE_API_TOKEN not found in environment variables")
        logger.info("AIService initialized successfully")

    def video_generation_from_text(self, prompt: str) -> str:
        try:
            logger.info(f"Attempting to generate video for prompt: {prompt}")

            # Initialize Replicate client
            client = replicate.Client(api_token=self.api_token)
            logger.info("Replicate client initialized")

            # Run the model
            output = client.run(
                "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
                input={
                    "prompt": prompt,
                    "negative_prompt": "blurry, bad quality, worst quality, low quality, text, watermark, signature, logo",
                    "num_frames": 16,
                    "num_inference_steps": 20
                }
            )

            logger.info(f"Received output from Replicate: {output}")

            # Return the video URL
            if isinstance(output, list) and output:
                return output[0]
            elif isinstance(output, str):
                return output
            else:
                raise ValueError(f"Unexpected output format from Replicate: {type(output)}")

        except replicate.exceptions.ModelError as e:
            logger.error(f"Model error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")
        except replicate.exceptions.ReplicateError as e:
            logger.error(f"Replicate API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Replicate API error: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
