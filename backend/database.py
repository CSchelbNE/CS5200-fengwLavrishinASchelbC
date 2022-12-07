import sqlalchemy as sql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import time

REMOTE_DATABASE_URL = "mysql+pymysql://admin:cs5200finalproject@database-1.c5mdh4lrufto.us-east-2.rds.amazonaws.com" \
                      "/ticket_system"


first_load = True
if first_load:
    username = input("Username: ").strip("")
    password = input("Password: ").strip("")
# NO SPECIAL CHARACTERS IN THE PASSWORD THAT MIGHT CONFLICT WITH THE LOCALHOST STRING PARSING (@ IS BAD)


REMOTE_DATABASE_URL = "mysql+pymysql://admin:cs5200finalproject@database-1.c5mdh4lrufto.us-east-2.rds.amazonaws.com" \
                      "/ticket_system"

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
        session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
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
    db = session()
    try:
        yield conn
    finally:
        db.close()


# aws remote server password is cs5200finalproject
# try:
#     engine = sql.create_engine(LOCAL_HOST_URL,
#                                connect_args=dict(host='localhost', port=3306))
#     Base = declarative_base()
#     conn = engine.connect()
#     conn.execute("USE ticket_system")
#     print("Database connection was successful")
# except Exception as error:
#     print("Connection failed")
#     print("Error:" + error.__str__())

