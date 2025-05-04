from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.ai_service import AIService

router = APIRouter()

class TextToVideoRequest(BaseModel):
    prompt: str

@router.post("/generation/text-to-video")
async def Video Generation_from_text(request: TextToVideoRequest):
    try:
        ai_service = AIService()
        video_url = ai_service.video_generation_from_text(request.prompt)
        return {"video_url": video_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Keep your existing endpoints
@router.get("/health")
async def health_check():
    return {"status": "ok"}
