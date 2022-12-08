import sqlalchemy.exc

from database import get_db, run_transaction
from sqlalchemy.engine import Engine
from fastapi import APIRouter
from schemas import Ticket, Survey
from fastapi import status, HTTPException, Depends

ticket_router = APIRouter(
    prefix="/tickets",
    tags=['tickets']
)


@ticket_router.get("/get-tickets/{user_id}")
def get_users_tickets(user_id: int, db: Engine = Depends(get_db)):
    def get_tickets_callback(conn, kwargs):
        res = conn.execute(f"""CALL selectTicketsByID(%s)""", (str(kwargs["user_id"]),)).fetchall()
        return res

    return run_transaction(db, get_tickets_callback, user_id=user_id)


@ticket_router.get("/get-closed-tickets/{user_id}")
def get_users_closed_tickets(user_id: int, db: Engine = Depends(get_db)):
    def get_closed_tickets_callback(conn, kwargs):
        res = conn.execute(f"""CALL selectClosedTicketsByID(%s)""", (str(user_id),)).fetchall()
        return res

    return run_transaction(db, get_closed_tickets_callback, user_id=user_id)


@ticket_router.put("/edit-ticket/{ticket_id}")
def edit_ticket(ticket: Ticket, ticket_id: int, db: Engine = Depends(get_db)):
    def edit_ticket_callback(conn, kwargs):
        edited_ticket = conn.execute(f"""call updateTicketProblem(%s,%s,%s,%s)""",
                                     (str(kwargs["subject"]), str(kwargs["type"]),
                                      str(kwargs["description"]),
                                      str(kwargs["ticket_id"]))).first()
        return edited_ticket

    return run_transaction(db, edit_ticket_callback, subject=ticket.subject,
                           type=ticket.type, description=ticket.description, ticket_id=ticket_id)


@ticket_router.delete("/delete-ticket/{ticket_id}")
def delete_ticket(ticket_id: int, db: Engine = Depends(get_db)):
    def delete_ticket_callback(conn, kwargs):
        conn.execute(f"""DELETE FROM ticket WHERE ticket_id = %s""", str(kwargs["ticket_id"]))
        return {"ticket_id": ticket_id}
    return run_transaction(db, delete_ticket_callback, ticket_id=ticket_id)


@ticket_router.post("/create-ticket")  # something here for if ticket == hardware: trigger
def create_ticket(ticket: Ticket, db: Engine = Depends(get_db)):
    def create_ticket_callback(conn, kwargs):
        if ticket.type == "Hardware":
            new_ticket = conn.execute(f"""call createTicketWithApproval(%s,%s,%s,%s,%s,%s,%s)""",
                                      (str(kwargs["subject"]), str(kwargs["type"]),
                                       str(kwargs["description"]), str(kwargs["priority"]), str(kwargs["status"]),
                                       str(kwargs["date_created"]),
                                       str(kwargs["user_id"]))).fetchone()

        else:
            new_ticket = conn.execute(f"""call createTicket(%s,%s,%s,%s,%s,%s,%s)""",
                                      (str(kwargs["subject"]), str(kwargs["type"]),
                                       str(kwargs["description"]), str(kwargs["priority"]), str(kwargs["status"]),
                                       str(kwargs["date_created"]),
                                       str(kwargs["user_id"]))).fetchone()
        return new_ticket

    return run_transaction(db, create_ticket_callback, subject=ticket.subject,
                           type=ticket.type, description=ticket.description, priority=ticket.priority,
                           status=ticket.status, date_created=ticket.date_created, user_id=ticket.user_id)


@ticket_router.get("/get-comments/{ticket_id}")
def get_comments(ticket_id: int, db: Engine = Depends(get_db)):
    def get_comments_callback(conn, kwargs):
        res = conn.execute(f"""CALL getCommentsByID(%s)""", (str(kwargs["ticket_id"]))).fetchall()
        return res

    return run_transaction(db, get_comments_callback, ticket_id=ticket_id)


@ticket_router.post("/complete-survey/{ticket_id}")
def complete_survey(ticket_id: int, survey: Survey, db: Engine = Depends(get_db)):
    def complete_survey_callback(conn, kwargs):
        res = conn.execute(f"""CALL fillOutSurvey(%s,%s,%s,%s)""", (str(kwargs["survey_body"]), str(kwargs["user_id"]),
                                                              str(kwargs["ticket_id"]), str(kwargs["satisfaction_level"]))).fetchone()
        return res
    return run_transaction(db, complete_survey_callback, survey_body=survey.survey_body, user_id=survey.user_id,
                           ticket_id=ticket_id, satisfaction_level=survey.satisfaction_level)
