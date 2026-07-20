# Proposal Pembaruan Pare Hurip

## Latar Belakang
Proyek `pare-hurip-v2` saat ini adalah landing page Next.js sederhana dengan konten informasi pemasaran. Pembaruan ini akan mengubahnya menjadi referensi pengembangan dashboard analitik padi yang terinspirasi dari proyek GitHub `pandupan/prediksi_produksi_dan_KSA_Padi`.

## Tujuan Utama
Membuat proposal pengembangan sistem analitik prediksi produksi padi dan ketahanan sosial area Tasikmalaya yang:

1. Beroperasi secara standalone (tidak tergantung pada layanan online eksternal).
2. Menyediakan tampilan grafik interaktif dengan pilihan:
   - data real-time
   - mode tampilan umum (view-only)
   - mode admin dengan kontrol dan manajemen data
3. Memiliki user management ber-peran:
   - superadmin
   - admin
   - user biasa
4. Menyediakan backend terpisah dengan arsitektur ganda:
   - satu untuk API dan otentikasi
   - satu untuk layanan ML / inference / pelatihan
5. Menyimpan data pada database lokal yang dapat diisi dari sumber data pemda per hari dan per bulan.
6. Menggunakan deep learning untuk prediksi, terutama Transformer, dan membandingkannya dengan model time-series lain seperti LSTM.
7. Menghindari penggunaan K-means untuk pola waktu; gunakan model yang menangkap temporal pattern.

## Rencana Fitur Utama

### 1. Arsitektur Standalone
- Frontend: Next.js 16 dengan TypeScript + Tailwind CSS.
- Backend API: FastAPI.
- Database: PostgreSQL / SQLite lokal.
- ML Service: modul Python terpisah untuk training dan inference.
- Semua dependensi berjalan di mesin lokal, tidak perlu hosting cloud untuk fitur dasar.

### 2. User Interface Dashboard
- Halaman dashboard utama dengan peta Leaflet, ringkasan produksi, dan grafik.
- Widget pilihan grafik:
  - Real-time update data lokal
  - Grafik harian untuk 1 tahun terakhir
  - Grafik bulanan untuk 3 tahun terakhir dan estimasi tahun depan
- Toggle untuk menampilkan/menyembunyikan grafik tertentu.

### 3. Manajemen Pengguna
- Login dengan 3 role:
  - `superadmin`: akses penuh, dapat mempromosikan admin.
  - `admin`: kelola data, lihat laporan, jalankan prediksi.
  - `user`: view-only.
- Otentikasi JWT dengan FastAPI.
- Halaman admin untuk:
  - mengelola user
  - memuat data baru
  - memantau model

### 4. Data Rice dan Pipeline
- Sumber data:
  - dataset harian pemda (1 tahun terakhir)
  - dataset bulanan (3 tahun terakhir)
- Data beras diorganisasikan ke dalam beberapa model atau wilayah, bukan satu model tunggal.
- Sistem menyimpan detail per varietas/area sehingga analisis lebih presisi.
- Data dapat dimuat dari file CSV lokal atau eksport data pemerintah daerah.

### 5. Prediksi Deep Learning
- Model utama: Transformer untuk time-series forecasting.
- Komparasi dengan model lain seperti LSTM atau model klasik time-series lainnya.
- Target:
  - prediksi produksi beras
  - prediksi harga beras
  - estimasi luas panen / volume produksi
- Hasil komparasi ditampilkan pada dashboard, misalnya:
  - Transformer vs LSTM
  - error metrics (MAE, RMSE)

### 6. Backend Ganda
- Backend A: FastAPI API utama dengan endpoint:
  - auth/login
  - auth/register
  - user/role
  - data/harian
  - data/bulanan
  - prediksi/transformer
  - prediksi/lstm
  - dashboard/summary
- Backend B: layanan ML Python (bisa FastAPI terpisah atau script). Tugas:
  - training model
  - inference prediksi
  - evaluasi model

### 7. Tampilan Peta dan Visualisasi
- Peta Leaflet interaktif untuk visualisasi wilayah Kabupaten Tasikmalaya.
- Marker / layer yang menunjukkan:
  - zona produksi
  - status panen
  - data ketahanan sosial area
- Grafik interaktif untuk:
  - produksi harian
  - produksi bulanan
  - perbandingan model prediksi

## Struktur Proyek yang Diusulkan

```
pare-hurip-v2/
├─ frontend/                 # Next.js app
│  ├─ src/app/
│  ├─ src/components/
│  ├─ public/
│  ├─ package.json
│  └─ README.md
├─ backend/
│  ├─ api/
│  │  ├─ main.py
│  │  ├─ routers/
│  │  └─ auth/
│  ├─ ml/
│  │  ├─ train.py
│  │  ├─ inference.py
│  │  └─ models/
│  ├─ db/
│  │  ├─ schema.py
│  │  └─ init_db.py
│  ├─ requirements.txt
│  └─ README.md
├─ data/
│  ├─ harian.csv
│  └─ bulanan.csv
└─ README.md
```

## Pembaruan Khusus dari Project GitHub Referensi

Berikut pembaruan yang disarankan agar lebih modern dan sesuai ketentuan:

- Ubah metode analisis menjadi `deep learning` dan `time-series forecasting`, bukan sekadar statistik sederhana.
- Tambahkan model `transformer` sebagai model utama prediksi.
- Buat komparasi hasil antara Transformer dan LSTM.
- Jadikan aplikasi bersifat `standalone`, sehingga data lokal cukup untuk demo dan pengembangan.
- Pisahkan backend menjadi dua layanan: API dan ML.
- Tambahkan manajemen role user `superadmin`, `admin`, dan `user`.
- Gunakan database relasional untuk menyimpan data produksi dan user.
- Tambahkan opsi `real-time` untuk grafik yang di-refresh setiap update data lokal.
- Buat dashboard dengan peta Leaflet untuk memvisualisasikan area dan data ketahanan sosial.

## Rekomendasi Teknologi

- Frontend: Next.js 16 + React 19 + Tailwind CSS
- Backend: FastAPI + Pydantic
- Database: PostgreSQL lokal atau SQLite untuk proof of concept
- ML: PyTorch atau TensorFlow
- Visualisasi: Leaflet, Recharts atau Chart.js
- Auth: JWT + role-based access control

## Tutorial Menjalankan

### 1. Siapkan lingkungan

- Install Node.js 20+ dan `pnpm`
- Install Python 3.11+ dan `pip`
- Siapkan database lokal (PostgreSQL atau SQLite)

### 2. Jalankan backend

```bash
cd backend/api
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Jalankan layanan ML (opsional)

```bash
cd backend/ml
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
python train.py
python inference.py
```

### 4. Jalankan frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### 5. Akses aplikasi

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

## Catatan Pengembangan

- Data real-time dapat diimplementasikan dengan cron lokal atau service yang memperbarui database setiap hari.
- Model deep learning bisa dilatih offline menggunakan dataset CSV.
- Dashboard offline tetap dapat menampilkan hasil historis dan prediksi tanpa koneksi internet.

## Komponen yang Perlu Ditambahkan pada `pare-hurip-v2`

1. Halaman login dan dashboard user.
2. Halaman admin untuk manajemen user dan data.
3. Endpoint FastAPI untuk data produksi dan prediksi.
4. Modul ML untuk Transformer + LSTM.
5. Struktur database dengan tabel:
   - users
   - roles
   - rice_production_daily
   - rice_production_monthly
   - prediction_results
   - area_data
6. Leaflet map dan visualisasi data ketahanan sosial.

---

Dokumen ini bisa menjadi acuan pembaruan `pare-hurip-v2` agar lebih cocok dikembangkan menjadi sistem prediksi produksi padi dan KSA.
