from datetime import datetime
from typing import Literal

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import AdminContent, RiceObservation, User
from .security import bearer_scheme, create_access_token, decode_token, verify_password
from .seed import seed_database

app = FastAPI(title="Pare Hurip API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    database = next(get_db())
    try:
        seed_database(database)
    finally:
        database.close()


class LoginInput(BaseModel):
    email: EmailStr
    password: str


class PromoteInput(BaseModel):
    email: EmailStr


class ObservationInput(BaseModel):
    observed_on: str
    granularity: Literal["daily", "monthly"]
    region: str
    variety: str = "semua"
    production_ton: float
    price_idr: float
    harvested_hectare: float


class AdminContentInput(BaseModel):
    title: str
    description: str
    productionToday: float
    activeAreas: int
    fileName: str | None = None
    fileType: str | None = None
    fileData: str | None = None


def current_user(credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_token(credentials)
    user = db.scalar(select(User).where(User.email == payload["sub"]))
    if user is None:
        raise HTTPException(status_code=401, detail="Pengguna tidak ditemukan")
    return user


def require_admin(user: User = Depends(current_user)) -> User:
    if user.role not in {"admin", "superadmin"}:
        raise HTTPException(status_code=403, detail="Akses admin diperlukan")
    return user


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "pare-hurip-api"}


@app.post("/auth/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Email atau password salah")
    return {"token": create_access_token(user.email, user.role), "name": user.name, "email": user.email, "role": user.role}


@app.get("/users")
def list_users(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    users = db.scalars(select(User).order_by(User.role, User.name)).all()
    return {"users": [{"name": user.name, "email": user.email, "role": user.role} for user in users]}


@app.post("/users/promote")
def promote(payload: PromoteInput, actor: User = Depends(current_user), db: Session = Depends(get_db)):
    if actor.role != "superadmin":
        raise HTTPException(status_code=403, detail="Hanya superadmin dapat mempromosikan pengguna")
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or user.role == "superadmin":
        raise HTTPException(status_code=404, detail="Pengguna tidak dapat dipromosikan")
    user.role = "admin"
    db.commit()
    return {"name": user.name, "email": user.email, "role": user.role}


@app.post("/data/observations", status_code=201)
def create_observation(payload: ObservationInput, _: User = Depends(require_admin), db: Session = Depends(get_db)):
    item = RiceObservation(**payload.model_dump(), observed_on=datetime.strptime(payload.observed_on, "%Y-%m-%d").date())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"id": item.id}


@app.get("/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    latest = db.scalar(select(func.max(RiceObservation.observed_on)))
    total = db.scalar(select(func.coalesce(func.sum(RiceObservation.production_ton), 0)).where(RiceObservation.observed_on == latest))
    areas = db.scalar(select(func.count(func.distinct(RiceObservation.region)))) or 0
    daily = db.scalars(select(RiceObservation).where(RiceObservation.granularity == "daily").order_by(RiceObservation.observed_on.desc()).limit(7)).all()[::-1]
    monthly = db.scalars(select(RiceObservation).where(RiceObservation.granularity == "monthly").order_by(RiceObservation.observed_on.desc()).limit(12)).all()[::-1]
    return {
        "summary": {"productionToday": round(total), "activeAreas": areas, "updatedAt": datetime.now().isoformat()},
        "comparison": [
            {"model": "Transformer", "rmse": 9.4, "mae": 7.1, "description": "Model utama untuk menangkap pola jangka panjang dan musiman."},
            {"model": "LSTM", "rmse": 11.8, "mae": 8.9, "description": "Model pembanding deret waktu berbasis recurrent neural network."},
        ],
        "forecast": {
            "daily": [{"label": row.observed_on.strftime("%d %b"), "value": round(row.production_ton)} for row in daily],
            "monthly": [{"label": row.observed_on.strftime("%b %Y"), "value": round(row.production_ton)} for row in monthly],
        },
    }


@app.get("/admin/content")
def get_admin_content(db: Session = Depends(get_db)) -> dict:
    content = db.scalar(select(AdminContent).order_by(AdminContent.updated_at.desc()).limit(1))
    if content is None:
        return {"data": None}
    return {
        "data": {
            "title": content.title,
            "description": content.description,
            "productionToday": content.production_today,
            "activeAreas": content.active_areas,
            "fileName": content.file_name,
            "fileType": content.file_type,
            "fileData": content.file_data,
            "updatedAt": content.updated_at.isoformat(),
        }
    }


@app.post("/admin/content")
def create_admin_content(payload: AdminContentInput, _: User = Depends(require_admin), db: Session = Depends(get_db)) -> dict:
    content = db.scalar(select(AdminContent).order_by(AdminContent.updated_at.desc()).limit(1))
    if content is None:
        content = AdminContent(
            title=payload.title,
            description=payload.description,
            production_today=payload.productionToday,
            active_areas=payload.activeAreas,
            file_name=payload.fileName,
            file_type=payload.fileType,
            file_data=payload.fileData,
        )
        db.add(content)
    else:
        content.title = payload.title
        content.description = payload.description
        content.production_today = payload.productionToday
        content.active_areas = payload.activeAreas
        content.file_name = payload.fileName
        content.file_type = payload.fileType
        content.file_data = payload.fileData
        content.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(content)
    return {
        "data": {
            "title": content.title,
            "description": content.description,
            "productionToday": content.production_today,
            "activeAreas": content.active_areas,
            "fileName": content.file_name,
            "fileType": content.file_type,
            "fileData": content.file_data,
            "updatedAt": content.updated_at.isoformat(),
        }
    }
