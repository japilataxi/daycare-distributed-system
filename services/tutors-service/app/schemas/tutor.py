from pydantic import BaseModel

class TutorOut(BaseModel):
    id: int
    user_id: str
    full_name: str
    phone: str

    class Config:
        from_attributes = True
