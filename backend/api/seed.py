from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import RiceObservation, User
from .security import hash_password


def seed_database(db: Session) -> None:
    if db.scalar(select(User.id).limit(1)) is None:
        db.add_all([
            User(name="Super Admin", email="superadmin@parehurip.id", password_hash=hash_password("superpass"), role="superadmin"),
            User(name="Admin Daerah", email="admin@parehurip.id", password_hash=hash_password("adminpass"), role="admin"),
            User(name="Pengguna Umum", email="user@parehurip.id", password_hash=hash_password("userpass"), role="user"),
        ])
    if db.scalar(select(RiceObservation.id).limit(1)) is None:
        today = date.today()
        regions = ["Cikalong", "Cikatomas", "Singaparna"]
        rows = []
        for offset in range(365):
            observed = today - timedelta(days=364 - offset)
            base = 13500 + (offset % 21) * 70
            rows.append(RiceObservation(observed_on=observed, granularity="daily", region=regions[offset % len(regions)], variety="Ciherang", production_ton=base, price_idr=14200 + (offset % 14) * 25, harvested_hectare=41 + (offset % 8)))
        for offset in range(36):
            observed = date(today.year - 3 + (today.month + offset - 1) // 12, (today.month + offset - 1) % 12 + 1, 1)
            rows.append(RiceObservation(observed_on=observed, granularity="monthly", region=regions[offset % len(regions)], variety="Inpari 32", production_ton=8800 + offset * 110, price_idr=13500 + offset * 35, harvested_hectare=840 + offset * 9))
        db.add_all(rows)
    db.commit()
