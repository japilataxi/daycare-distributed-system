from sqlalchemy import create_engine
from app.database import Base
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL.replace("asyncpg", "psycopg2")
)

def init_models():
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas tutors creadas")

if __name__ == "__main__":
    init_models()
