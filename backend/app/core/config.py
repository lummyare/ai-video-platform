import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
PROJECT_NAME: str = "AI Video Platform"
DATABASE_URL: str = os.getenv("DATABASE_URL")
REDIS_URL: str = os.getenv("REDIS_URL")
SECRET_KEY: str = os.getenv("SECRET_KEY")
AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_BUCKET_NAME: str = os.getenv("AWS_BUCKET_NAME")
AWS_REGION: str = os.getenv("AWS_REGION")
REPLICATE_API_TOKEN: str = os.getenv("REPLICATE_API_TOKEN")
STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY")
SENDGRID_API_KEY: str = os.getenv("SENDGRID_API_KEY")
FRONTEND_URL: str = os.getenv("FRONTEND_URL")

settings = Settings()
