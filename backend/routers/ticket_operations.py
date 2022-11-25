import sys

sys.path.append("../")
import passlib.exc
from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from backend.utils import hash, verify_password
from backend.schemas import User, Credentials

ticket_router = APIRouter(
    prefix="/tickets",
    tags=['tickets']
)


@ticket_router.get("/get-tickets/{user_id}")
def getUsersTickets(user_id: int, db: Engine = Depends(get_db)):
    conn = db.connect()
    return conn.execute("""SELECT * FROM ticket NATURAL JOIN problem WHERE user_id = %s""", user_id).all()





@ticket_router.post("/create-ticket")
def createTicket(ticket, db: Engine = Depends(get_db)):
    conn = db.connect()
    trans = conn.begin()
    print(ticket)
    # conn.execute(f"""INSERT INTO problem (subject,type,description,ticket_id) VALUES %s, %s, %s, %s""")
    # trans.commit()
