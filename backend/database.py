import sqlalchemy as sql
from sqlalchemy.ext.declarative import declarative_base
import time

# first_load = True
# if first_load:
#     username = input("Username: ").strip("")
#     password = input("Password: ").strip("")
username="root"
password="F1shg0d12345!"
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
