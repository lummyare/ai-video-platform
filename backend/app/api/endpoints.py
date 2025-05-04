from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

# Add your other endpoints here (auth, generation, analytics, etc.)
