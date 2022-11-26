from pydantic import BaseModel, EmailStr
from pydantic.types import Optional


class User(BaseModel):
    campus: str
    email: EmailStr
    name: str
    password: str
    address: str
    type: str


class Credentials(BaseModel):
    username: str
    password: str


class Ticket(BaseModel):
    description: str
    user_id: int
    subject: str
    status: str
    priority: str
    date_created: str
    type: str
    ticket_id: Optional[str]


class Approval(BaseModel):
    status: str
    description: str
    type: str
