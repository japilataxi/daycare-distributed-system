import asyncio
from app.database import AsyncSessionLocal
from app.models import User
from app.security import hash_password
from sqlalchemy.future import select

async def seed():
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(User).where(User.email == "test@daycare.com")
        )
        user = result.scalar_one_or_none()

        if not user:
            user = User(
                email="test@daycare.com",
                hashed_password=hash_password("123456"),
                is_active=True
            )
            db.add(user)
            await db.commit()
            print("✅ Usuario seed creado")
        else:
            print("ℹ️ Usuario ya existe")

if __name__ == "__main__":
    asyncio.run(seed())
