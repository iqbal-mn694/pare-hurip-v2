from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(20), default="user")


class RiceObservation(Base):
    __tablename__ = "rice_observations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    observed_on: Mapped[date] = mapped_column(Date, index=True)
    granularity: Mapped[str] = mapped_column(String(10), index=True)
    region: Mapped[str] = mapped_column(String(120), index=True)
    variety: Mapped[str] = mapped_column(String(120), default="semua")
    production_ton: Mapped[float] = mapped_column(Float)
    price_idr: Mapped[float] = mapped_column(Float)
    harvested_hectare: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class AdminContent(Base):
    __tablename__ = "admin_content"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    production_today: Mapped[float] = mapped_column(Float, default=0.0)
    active_areas: Mapped[int] = mapped_column(Integer, default=0)
    file_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    file_type: Mapped[str | None] = mapped_column(String(255), nullable=True)
    file_data: Mapped[str | None] = mapped_column(Text, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
