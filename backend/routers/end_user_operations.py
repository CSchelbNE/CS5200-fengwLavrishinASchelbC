from backend.database import get_db
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from sqlalchemy.orm import Session
import backend.models as models

user_router = APIRouter(
    prefix="/login",
    tags=['users']
)


@user_router.get("/xd")
async def root():
    return {"message": "Hello World"}


@user_router.get("/", response_model_exclude_none=True)
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

