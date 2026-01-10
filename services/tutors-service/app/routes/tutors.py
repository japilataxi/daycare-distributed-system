from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.tutor import Tutor
from app.schemas.tutor import TutorOut
from app.security import get_current_user

router = APIRouter(prefix="/tutors", tags=["Tutors"])

@router.get("/me", response_model=TutorOut)
async def get_me(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
):
    stmt = select(Tutor).where(Tutor.user_id == user["sub"])
    result = await db.execute(stmt)
    tutor = result.scalar_one_or_none()

    if tutor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tutor not found for this user",
        )

    return tutor
