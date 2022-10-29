from backend.database import get_db
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from sqlalchemy.orm import Session
import backend.models as models
from backend.utils import hash
from backend.schemas import User

end_user_router = APIRouter(
    prefix="/users",
    tags=['users']
)


@end_user_router.post("/add-user")
def add_new_user(user: User, db: Session = Depends(get_db)):
    hashed_password = hash(user.password)
    new_user = models.User(user_id=user.user_id, email=user.email, password=hashed_password, address=user.address,
                           name=user.name)
    db.add(new_user)
    db.commit()
    return new_user


@end_user_router.get("/user", response_model_exclude_none=True)
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

