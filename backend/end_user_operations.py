import passlib.exc

from database import get_db, run_transaction
from sqlalchemy.engine import Engine
from fastapi import status, HTTPException, Depends
from fastapi import APIRouter
from utils import hash, verify_password
from schemas import User, Credentials

end_user_router = APIRouter(
    prefix="/users",
    tags=['users']
)


@end_user_router.post("/add-user")
def add_new_user(user: User, db: Engine = Depends(get_db)):
    hashed_password = hash(user.password)  # hashed pw is stored in models.User.password

    def add_new_user_callback(conn, kwargs):
        new_user = conn.execute(f"""CALL createUser(%s,%s,%s,%s,%s,%s)""", (str(kwargs["hashed_password"]),
                                                                            str(kwargs["type"]), str(kwargs["name"]),
                                                                            str(kwargs["address"]),
                                                                            str(kwargs["email"]),
                                                                            str(kwargs["campus"]))).first()
        return new_user

    return run_transaction(db, add_new_user_callback, hashed_password=hashed_password,
                           type=user.type, name=user.name, address=user.address,
                           email=user.email, campus=user.campus)


@end_user_router.post("/login", response_model_exclude_none=True)
def login(credentials: Credentials, db: Engine = Depends(get_db)):
    def login_callback(conn, kwargs):
        try:
            result = conn.execute(f"""SELECT * FROM users WHERE name = %s""", (str(kwargs["username"]),)).first()
            if verify_password(credentials.password, result.password):
                return result
        except AttributeError:
            print("***** AttributeError: Ensure username is valid *****")
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Invalid login credentials")
        except passlib.exc.UnknownHashError:
            print("***** passlib.exc.UnknownHashError: User potentially has unhashed password stored in DB *****")

    return run_transaction(db, login_callback, username=credentials.username, password=credentials.password)
