from pydantic import BaseModel


class User(BaseModel):
    campus: str
    email: str
    name: str
    password: str
    address: str


class Credentials(BaseModel):
    username: str
    password: str
