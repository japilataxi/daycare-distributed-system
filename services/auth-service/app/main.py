from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router

app = FastAPI(title="Auth Service")

# ✅ CORS (necesario para el frontend en localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # tu frontend principal
        "http://localhost:8002",  # Swagger UI / otro frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(auth_router)

@app.get("/")
def root():
    return {"service": "Auth Service", "status": "running"}
