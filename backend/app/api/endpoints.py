from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.ai_service import AIService
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class TextToVideoRequest(BaseModel):
    prompt: str

@router.post("/generation/text-to-video")
async def video_generation_from_text(request: TextToVideoRequest):
    try:
        ai_service = AIService()
        video_url = ai_service.video_generation_from_text(request.prompt)
        return {"video_url": video_url}  # <--- Only return a dict with the URL!
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
