import sys

sys.path.append("../")
from backend.database import get_db
from sqlalchemy.engine import Engine
from fastapi import Depends, APIRouter

init_router = APIRouter(
    prefix="/init",
    tags=['init']
)


def generate_stored_procedures(db: Engine = Depends(get_db)):
    db.execute("DROP PROCEDURE IF EXISTS createTicket;" +
               "DELIMITER $$" +
               "CREATE PROCEDURE createTicket(IN n_subject VARCHAR(25), IN n_type VARCHAR(64), IN n_description VARCHAR(255)," +
               "IN n_priority VARCHAR(64), IN n_status VARCHAR(64), IN n_date_created DATE," +
               "n_user_id BIGINT UNSIGNED)" +
               "BEGIN" +
               "declare n_ticket_id int unsigned default 0;" +
               "INSERT INTO ticket (priority,date_created,status,user_id) VALUES (n_priority, n_date_created, n_status, n_user_id);" +
               "SET n_ticket_id = last_insert_id();" +
               "INSERT INTO problem (subject, type,description,ticket_id) VALUES (n_subject, n_type, n_description, n_ticket_id);" +
               "SELECT * FROM ticket NATURAL JOIN problem WHERE ticket_id = n_ticket_id;" +
               "END $$" +
               "DELIMITER ;"
               "");
