from pydantic import BaseModel
from datetime import datetime

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: str
    is_done: bool

class Task(TaskBase):
    id: int
    is_done: bool
    created_at: datetime

    class Config:
        orm_mode = True