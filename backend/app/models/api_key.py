from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from ..database import Base
import datetime
import secrets

class APIKey(Base):
tablename = "api_keys"
id = Column(Integer, primary_key=True, index=True)
user_id = Column(Integer, ForeignKey("users.id"))
key = Column(String, unique=True, index=True)
name = Column(String)
is_active = Column(Boolean, default=True)
last_used = Column(DateTime, nullable=True)
created_at = Column(DateTime, default=datetime.datetime.utcnow)

@classmethod
def generate_key(cls):
    return f"sk_{secrets.token_urlsafe(32)}"
