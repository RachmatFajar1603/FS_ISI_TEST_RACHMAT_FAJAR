# FS_ISI_TEST_Rachmat_Fajar

A Fullstack Todo List Web Application built with **React**, **FastAPI**, and **PostgreSQL** — fully containerized using **Docker Compose**. This project is part of a fullstack engineer assessment test.

## Features

- Create, update, and delete tasks
- Mark tasks as completed
- Separate views for active and completed tasks
- Task sorting by creation time:
  - Active: oldest to newest
  - Completed: newest to oldest
- Editable task form with cancel functionality
- Fully responsive UI (based on provided Figma design)
- Interactive and clean UX using TailwindCSS
- REST API with FastAPI and PostgreSQL
- Development & deployment ready via Docker Compose

---

## Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Folder Structure

```
root/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── services.py
│   │   └── logger.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── .env
├── .env
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/username/FS_ISI_TEST_[NAMA].git
cd FS_ISI_TEST_[NAMA]
```

2. **Set environment variables**
```
root folder and frontend/

## root folder for backend
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=

## frontend
VITE_API_URL=
```

3. **Run with docker compose**
in root folder project
```bash
docker compose up --build
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
```

## API Documentation
```
All endpoints are documented automatically by FastAPI at /docs.

Example Endpoints:
	•	GET /tasks — Get all tasks
	•	POST /tasks — Create a task
	•	PUT /tasks/{id} — Update a task
	•	DELETE /tasks/{id} — Delete a task
```

## Author
### Rachmat Fajar
FullStack Developer
https://www.linkedin.com/in/rachmat-fajar-085908270/ https://github.com/RachmatFajar1603

