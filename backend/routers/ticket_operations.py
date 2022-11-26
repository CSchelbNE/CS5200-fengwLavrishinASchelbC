import sys

sys.path.append("../")
from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Response, status, HTTPException, Depends
from fastapi import APIRouter
from backend.schemas import Ticket


ticket_router = APIRouter(
    prefix="/tickets",
    tags=['tickets']
)


@ticket_router.get("/get-tickets/{user_id}")
def get_users_tickets(user_id: int, db: Engine = Depends(get_db)):
    return db.execute("""SELECT * FROM ticket NATURAL JOIN problem WHERE user_id = %s""", user_id).all()

@ticket_router.put("/edit-ticket/{ticket_id}")
def edit_ticket(ticket: Ticket, db: Engine = Depends(get_db)):
    return db.execute(f"""call updateTicketProblem(%s,%s,%s,%s)""", (str(ticket.subject), str(ticket.type),
                                                                     str(ticket.description), str(ticket.ticket_id)))


@ticket_router.post("/create-ticket") # something here for if ticket == hardware: trigger
def create_ticket(ticket: Ticket, db: Engine = Depends(get_db)):
    conn = db.connect()
    trans = conn.begin()
    if (ticket.type == "Hardware"):
        new_ticket = conn.execute(f"""call createTicketWithApproval(%s,%s,%s,%s,%s,%s,%s)""", (str(ticket.subject), str(ticket.type),
                         str(ticket.description), str(ticket.priority), str(ticket.status), str(ticket.date_created),
                                                                        str(ticket.user_id))).first()
    else:
        new_ticket = conn.execute(f"""call createTicket(%s,%s,%s,%s,%s,%s,%s)""", (str(ticket.subject), str(ticket.type),
                         str(ticket.description), str(ticket.priority), str(ticket.status), str(ticket.date_created),
                                                                        str(ticket.user_id))).first()
    trans.commit()
    return new_ticket
    # conn.execute(f"""INSERT INTO problem (subject,type,description,tick) VALUES %s, %s, %s, %s""",
    #              (str(ticket.subject), str(ticket.type), str(ticket.description), str(new_ticket.ticket_id)))
    # trans.commit()
    # return conn.execute("""SELECT * FROM ticket NATURAL JOIN problem WHERE ticket_id = %s""", new_ticket.ticket_id).first()
