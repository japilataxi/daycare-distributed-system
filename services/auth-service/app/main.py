from fastapi import FastAPI
from app.controllers.auth_controller import router as auth_router

app = FastAPI(
    title="Auth Service",
    description="Authentication and Authorization Service",
    version="1.0.0"
)

app.include_router(auth_router, prefix="/auth")

@app.get("/health")
def health_check():
    return {"status": "Auth Service is running"}
