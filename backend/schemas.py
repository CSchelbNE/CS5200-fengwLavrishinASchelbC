from pydantic import BaseModel


class User(BaseModel):
    email: str
    name: str
    password: str
    address: str


class Credentials(BaseModel):
    username: str
    password: str
