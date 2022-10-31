from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Sequence
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, Sequence("user_id"), primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    address = Column(String(100), nullable=False)
    email = Column(String(50), unique=True, index=True)
    password = Column(String(50), nullable=False)
    campus = Column(String, nullable=False)
