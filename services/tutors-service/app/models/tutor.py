from sqlalchemy import Column, Integer, String
from app.database import Base

class Tutor(Base):
    __tablename__ = "tutors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)  # viene del JWT (sub)
    full_name = Column(String)
    phone = Column(String)
