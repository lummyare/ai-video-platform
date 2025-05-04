from sqlalchemy import Column, Integer, String, ForeignKey
from ..database import Base

class Generation(Base):
tablename = "generations"
id = Column(Integer, primary_key=True, index=True)
user_id = Column(Integer, ForeignKey("users.id"))
prompt = Column(String)
type = Column(String)
status = Column(String)
result_url = Column(String)
