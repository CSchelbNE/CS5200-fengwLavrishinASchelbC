import sqlalchemy
import sqlalchemy as sql
from sqlalchemy.ext.declarative import declarative_base
import time
from fastapi import HTTPException, status

first_load = True
if first_load:
    username = input("Username: ").strip("")
    password = input("Password: ").strip("")

# NO SPECIAL CHARACTERS IN THE PASSWORD THAT MIGHT CONFLICT WITH THE LOCALHOST STRING PARSING (@ IS BAD)


LOCAL_HOST_URL = "mysql+pymysql://" + username + ":" + \
                 password + "@localhost"
# aws remote server password is cs5200finalproject
engine = sql.create_engine(LOCAL_HOST_URL,
                           connect_args=dict(host='localhost', port=3306))
while True:
    try:
        LOCAL_HOST_URL = "mysql+pymysql://" + username + ":" + \
                         password + "@localhost"
        engine = sql.create_engine(LOCAL_HOST_URL,
                                   connect_args=dict(host='localhost', port=3306))
        conn = engine.connect()
        Base = declarative_base()
        conn.execute("USE ticket_system")
        print("Database connection was successful")
        break
    except Exception as error:
        print("Connection failed")
        print("Error:" + error.__str__())
        time.sleep(1)
        username = input("Username: ")
        password = input("Password: ")


def get_db():
    try:
        yield conn
    finally:
        pass


def run_transaction(db, function, **kwargs):
    conn = db.connect()
    with conn.begin() as trans:
        try:
            res = function(conn, kwargs)
            trans.commit()
            return res
        except sqlalchemy.exc.InterfaceError as err:
            trans.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="INTERNAL ERROR")
        except sqlalchemy.exc.PendingRollbackError as err:
            trans.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="ROLLBACK OCCURRED")
        except sqlalchemy.exc.OperationalError as err:
            trans.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="OPS ERROR")
        except sqlalchemy.exc.InvalidRequestError as err:
            trans.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="INVALID REQ")
        except sqlalchemy.exc.InternalError as err:
            trans.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="INVALID REQ")
        finally:
            conn.close()
