import passlib.exc
from backend.database import get_db
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from sqlalchemy.orm import Session
import backend.models as models
from backend.utils import hash, verify_password
from backend.schemas import User, Credentials

end_user_router = APIRouter(
    prefix="/users",
    tags=['users']
)


@end_user_router.post("/add-user")
def add_new_user(user: User, db: Session = Depends(get_db)):
    hashed_password = hash(user.password) # hashed pw is stored in models.User.password
    new_user = models.User(email=user.email, password=hashed_password, address=user.address,
                           name=user.name)
    db.add(new_user)
    db.commit()
    return new_user


@end_user_router.get("/user", response_model_exclude_none=True)
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@end_user_router.post("/login", response_model_exclude_none=True)
def login(credentials: Credentials, db: Session = Depends(get_db)):
    try:
        # in DB - find 1st matching username
        result = db.query(models.User).filter(models.User.name == credentials.username).first()
        if verify_password(credentials.password, result.password):
            return result  # if inputted pw matches stored(hashed) pw, return the user

    except AttributeError:
        print("***** AttributeError: Ensure username is valid *****")

    except passlib.exc.UnknownHashError:
        print("***** passlib.exc.UnknownHashError: User potentially has unhashed password stored in DB *****")

