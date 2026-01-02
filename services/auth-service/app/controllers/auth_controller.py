from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import LoginRequest, RegisterRequest
from app.services.auth_service import authenticate_user, register_user

router = APIRouter()

@router.post("/register")
def register(data: RegisterRequest):
    return register_user(data)

@router.post("/login")
def login(data: LoginRequest):
    token = authenticate_user(data)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}
