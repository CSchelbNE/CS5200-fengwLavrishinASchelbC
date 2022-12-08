import sqlalchemy.exc

from database import get_db, run_transaction
from sqlalchemy.engine import Engine
from fastapi import status, HTTPException, Depends
from fastapi import APIRouter
from schemas import Comment

technician_router = APIRouter(
    prefix="/tech",
    tags=['tech']
)


@technician_router.get("/get-open-tickets/{tech_id}")
def get_all_open_tickets(tech_id: int, db: Engine = Depends(get_db)):
    def get_all_open_tickets_callback(conn, kwargs):
        res = conn.execute("""CALL filterOpenTicketsByTechnician(%s)""", (str(kwargs["tech_id"]))).fetchall()
        return res

    return run_transaction(db, get_all_open_tickets_callback, tech_id=tech_id)


@technician_router.put("/accept-ticket/")
def accept_open_ticket(ticket_id: int, tech_id: int, db: Engine = Depends(get_db)):
    def accept_open_ticket_callback(conn, kwargs):
        res = conn.execute(f"CALL assignOpenTicket(%s,%s)", (str(kwargs["ticket_id"]), str(kwargs["tech_id"]))).first()
        return res
    return run_transaction(db, accept_open_ticket_callback, ticket_id=ticket_id, tech_id=tech_id)


@technician_router.get("/get-assigned-tickets/{tech_id}")
def get_assigned_tickets(tech_id: int, db: Engine = Depends(get_db)):
    def get_assigned_tickets_callback(conn, kwargs):
        res = conn.execute(f"""CALL filterAcceptedTicketsByTechnician(%s)""", (str(kwargs["tech_id"]),)).all()
        return res

    return run_transaction(db, get_assigned_tickets_callback, tech_id=tech_id)


@technician_router.put("/close-ticket/{ticket_id}")
def close_ticket(ticket_id: int, db: Engine = Depends(get_db)):
    def close_ticket_callback(conn, kwargs):
        res = conn.execute(f"""CALL closeTicket(%s)""", (str(kwargs["ticket_id"]))).first()
        return res

    return run_transaction(db, close_ticket_callback, ticket_id=ticket_id)


@technician_router.post("/create-comment/")
def create_comment(comment: Comment, db: Engine = Depends(get_db)):
    def close_ticket_callback(conn, kwargs):
        res = conn.execute(f"""CALL createComment(%s, %s, %s)""", (str(kwargs["comment_body"]), str(kwargs["ticket_id"]),
                                                                    str(kwargs["tech_id"]))).first()
        return res

    return run_transaction(db, close_ticket_callback, comment_body=comment.comment_body, ticket_id=comment.ticket_id,
                           tech_id=comment.tech_id)