import pymysql.cursors
import sqlalchemy as sql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, String, Integer

DATABASE_URL = "mysql+pymysql://admin:cs5200finalproject@database-1.c5mdh4lrufto.us-east-2.rds.amazonaws.com" \
               "/ticket_system"

# aws remote server password is cs5200finalproject
engine = sql.create_engine(DATABASE_URL,
                           connect_args=dict(host='database-1.c5mdh4lrufto.us-east-2.rds.amazonaws.com', port=3306))
while True:
    try:
        conn = engine.connect()
        Base = declarative_base()
        session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        print("Database connection was successful")
        break
    except Exception as error:
        print("Connection failed")
        print("Error:" + error.__str__())


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()
