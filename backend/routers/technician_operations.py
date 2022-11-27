from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from backend.schemas import Ticket

technician_router = APIRouter(
    prefix="/tech",
    tags=['tech']
)


@technician_router.get("/get-open-tickets")
def get_all_open_tickets(db: Engine = Depends(get_db)):
    return db.execute("""SELECT * FROM ticket NATURAL JOIN problem WHERE status=\"OPEN\"""").all()
