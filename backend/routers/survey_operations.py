import sys

sys.path.append("../")
from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from backend.schemas import Ticket


survery_router = APIRouter(
    prefix="/surveys",
    tags=['survery']
)




