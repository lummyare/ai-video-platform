from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints

app = FastAPI(title="AI Video Platform")

app.add_middleware(
CORSMiddleware,
allow_origins=[""],
allow_credentials=True,
allow_methods=[""],
allow_headers=["*"],
)

app.include_router(endpoints.router)

@app.get("/")
async def root():
return {"message": "AI Video Generation API"}
