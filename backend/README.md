# Backend lokal Pare Hurip

API FastAPI ini memakai SQLite lokal (`pare_hurip.db`) dan membuat data contoh saat pertama berjalan.

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

Dokumentasi API: `http://127.0.0.1:8000/docs`. Akun demo: `superadmin@parehurip.id` / `superpass`. Ganti `SECRET_KEY` dan kata sandi sebelum dipakai di luar lingkungan demo.
