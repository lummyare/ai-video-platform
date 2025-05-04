from sqlalchemy import Column, Integer, String, Float, ForeignKey
from ..database import Base

class Feedback(Base):
tablename = "feedbacks"
id = Column(Integer, primary_key=True, index=True)
generation_id = Column(Integer, ForeignKey("generations.id"))
user_id = Column(Integer, ForeignKey("users.id"))
rating = Column(Float)
comment = Column(String, nullable=True)
