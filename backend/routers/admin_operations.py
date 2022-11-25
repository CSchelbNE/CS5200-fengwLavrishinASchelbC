import passlib.exc
from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from backend.utils import hash, verify_password
from backend.schemas import User, Credentials


admin_router = APIRouter(
    prefix="/admin",
    tags=['admin']
)


@admin_router.get("/get-all-approvals")
def get_approvals(db: Engine = Depends(get_db)):
    return db.execute("""SELECT * FROM approvals""")
