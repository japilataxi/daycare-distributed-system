from sqlalchemy import create_engine
from app.database import Base
from app.models import User
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# 🔴 CAMBIAMOS A ENGINE SÍNCRONO
sync_engine = create_engine(
    DATABASE_URL.replace("asyncpg", "psycopg2")
)

def init_models():
    Base.metadata.create_all(bind=sync_engine)
    print("✅ Tablas creadas correctamente")

if __name__ == "__main__":
    init_models()
