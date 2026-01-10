from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tutors import router as tutors_router

app = FastAPI(
    title="Tutors Service",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # tu frontend real
        "http://localhost:8002",  # Swagger UI o frontend de docs
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutors_router)


@app.get("/")
def root():
    return {"service": "Tutors Service", "status": "running"}
