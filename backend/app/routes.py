from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import services, schemas
from .database import get_db
from .logger import logger

router = APIRouter()

@router.get("/tasks", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    logger.info(f"Getting all tasks")
    return services.get_tasks(db)

@router.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    logger.info(f"Getting task with ID: {task_id}")
    return services.get_task(db, task_id)

@router.post("/tasks", response_model=schemas.Task)
def create(task_data: schemas.TaskCreate, db: Session = Depends(get_db)):
    logger.info(f"Creating task: {task_data}")
    return services.create_task(db, task_data)

@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update(task_id: int, task_data: schemas.TaskUpdate, db: Session = Depends(get_db)):
    logger.info(f"Updating task with ID: {task_id}")
    return services.update_task(db, task_id, task_data)

@router.delete("/tasks/{task_id}")
def delete(task_id: int, db: Session = Depends(get_db)):
    logger.info(f"Deleting task with ID: {task_id}")
    deleted_task = services.delete_task(db, task_id)
    return f"Task {deleted_task.id} deleted"
