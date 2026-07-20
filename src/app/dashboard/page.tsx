'use client';

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { clearStoredUser, getStoredUser, getStoredUserSnapshot } from '@/lib/auth';

interface PredictionResponse {
  summary: {
    productionToday: number;
    activeAreas: number;
    updatedAt: string;
  };
  comparison: { model: string; rmse: number; mae: number; description: string }[];
  forecast: {
    daily: { label: string; value: number }[];
    monthly: { label: string; value: number }[];
  };
}

type Range = 'daily' | 'monthly';

type DashboardUser = { name: string; email: string; role: string; token: string };

interface AdminData {
  title: string;
  description: string;
  productionToday: number;
  activeAreas: number;
  fileName?: string;
  fileType?: string;
  fileData?: string;
  updatedAt: string;
}

function subscribeToStoredUser(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

function getServerUser(): DashboardUser | null {
  return null;
}

function ForecastChart({ data, color, title, unit }: { data: { label: string; value: number }[]; color: string; title: string; unit: string }) {
  const points = useMemo(() => {
    const maximum = Math.max(...data.map((item) => item.value), 1);
    return data.map((item, index) => ({ ...item, x: data.length === 1 ? 50 : 8 + (index * 84) / (data.length - 1), y: 88 - (item.value / maximum) * 68 }));
  }, [data]);

  return <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
    <div className="mb-3 flex items-center justify-between text-sm"><span className="font-semibold text-slate-900">{title}</span><span className="text-slate-500">{unit}</span></div>
    <svg viewBox="0 0 100 100" className="h-48 w-full overflow-visible" aria-label={title} role="img">
      {[25, 50, 75].map((y) => <line key={y} x1="8" x2="92" y1={y} y2={y} stroke="#334155" strokeWidth="0.4" />)}
      <path d={points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')} fill="none" stroke={color} strokeWidth="2" />
      {points.map((point) => <circle key={point.label} cx={point.x} cy={point.y} r="1.8" fill={color}><title>{`${point.label}: ${point.value.toLocaleString('id-ID')}`}</title></circle>)}
      {points.map((point) => <text key={`${point.label}-label`} x={point.x} y="98" textAnchor="middle" fontSize="5" fill="#94a3b8">{point.label}</text>)}
    </svg>
  </div>;
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeToStoredUser, getStoredUserSnapshot, getServerUser);
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [users, setUsers] = useState<{ email: string; name: string; role: string }[]>([]);
  const [error, setError] = useState('');
  const [range, setRange] = useState<Range>('daily');
  const [showChart, setShowChart] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadPredictions = useCallback(() => {
    fetch('/api/predictions')
      .then((res) => {
        if (!res.ok) throw new Error('prediction request failed');
        return res.json();
      })
      .then((data: PredictionResponse) => {
        setPredictions(data);
        setError('');
      })
      .catch(() => setError('Gagal memuat data prediksi. Pastikan layanan API lokal berjalan.'));
  }, []);

  const loadAdminData = useCallback(() => {
    fetch(`/api/admin/data?cache=${Date.now()}`)
      .then((res) => res.json())
      .then((result) => {
        setAdminData(result.data || null);
      })
      .catch(() => {
        setAdminData(null);
      });
  }, []);

  useEffect(() => {
    const stored = getStoredUser();
    loadPredictions();
    loadAdminData();

    if (stored && (stored.role === 'admin' || stored.role === 'superadmin')) {
      fetch('/api/auth/users', { headers: { Authorization: `Bearer ${stored.token}` } })
        .then((res) => res.json())
        .then((data) => {
          if (data.users) {
            setUsers(data.users);
          }
        })
        .catch(() => null);
    }
  }, [loadPredictions, loadAdminData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const refreshTimer = window.setInterval(() => {
      loadPredictions();
      loadAdminData();
    }, 30_000);
    return () => window.clearInterval(refreshTimer);
  }, [autoRefresh, loadPredictions, loadAdminData]);

  function handleLogout() {
    clearStoredUser();
    router.push('/login');
  }

  async function handlePromote(email: string) {
    if (!user) return;
    const response = await fetch('/api/auth/promote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? 'Promosi pengguna gagal.');
      return;
    }
    setUsers((current) => current.map((item) => item.email === email ? { ...item, role: 'admin' } : item));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard PARE HURIP</p>
            <h1 className="text-4xl font-extrabold">Selamat Datang</h1>
            <p className="text-slate-600">Lihat prediksi per kecamatan dan data perjalanan panen Anda.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-red-500 hover:bg-red-100"
              >
                Keluar
              </button>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-500 bg-red-50/60 p-6 text-red-700">{error}</div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Produksi Hari Ini</p>
            <p className="mt-4 text-5xl font-extrabold text-slate-900">{predictions?.summary.productionToday ?? '...'}</p>
            <p className="mt-2 text-sm text-slate-600">Perkiraan volume padi terproses.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Area Aktif</p>
            <p className="mt-4 text-5xl font-extrabold text-slate-900">{predictions?.summary.activeAreas ?? '...'}</p>
            <p className="mt-2 text-sm text-slate-600">Jumlah wilayah aktif dalam analisis.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Terakhir diperbarui</p>
            <p className="mt-4 text-2xl font-bold text-slate-900">{predictions?.summary.updatedAt ? new Date(predictions.summary.updatedAt).toLocaleString('id-ID') : '...'}</p>
            <p className="mt-2 text-sm text-slate-600">Data real-time lokal.</p>
          </div>
        </div>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Konten Admin</p>
              <h2 className="text-2xl font-bold text-slate-900">Informasi yang dibagikan admin</h2>
            </div>
            {user && (user.role === 'admin' || user.role === 'superadmin') ? (
              <a href="/admin" className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100">
                Buka Halaman Admin
              </a>
            ) : null}
          </div>

          {adminData ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Judul</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{adminData.title}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Produksi Hari Ini</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{adminData.productionToday.toLocaleString('id-ID')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Area Aktif</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{adminData.activeAreas.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-slate-500">
              Tidak ada data admin terbaru. Pengguna biasa akan melihat konten default jika admin belum mengisi data.
            </div>
          )}

          {adminData && adminData.description ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Deskripsi</p>
              <p className="mt-3 text-base leading-relaxed">{adminData.description}</p>
            </div>
          ) : null}

          {adminData && adminData.fileName ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">File terunggah</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{adminData.fileName}</span>
                <a
                  href={`data:${adminData.fileType};base64,${adminData.fileData}`}
                  download={adminData.fileName}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Unduh file
                </a>
              </div>
            </div>
          ) : null}
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Perbandingan Model</h2>
            <div className="mt-6 space-y-4">
              {predictions?.comparison.map((item) => (
                <div key={item.model} className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.model}</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">{item.model}</h3>
                    </div>
                    <span className="rounded-full bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">{item.rmse.toFixed(1)} RMSE</span>
                  </div>
                  <p className="mt-4 text-slate-400">{item.description}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">MAE: {item.mae.toFixed(1)}</div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">RMSE: {item.rmse.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div><h2 className="text-xl font-bold text-slate-900">Prediksi Forecast</h2><p className="mt-2 text-sm text-slate-600">Pilih seri yang ingin ditampilkan. Pembaruan memakai data lokal terbaru.</p></div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300"><input checked={autoRefresh} onChange={(event) => setAutoRefresh(event.target.checked)} type="checkbox" className="accent-green-500" /> Real-time</label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setRange('daily')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${range === 'daily' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-900'}`}>Harian · 1 tahun</button>
              <button onClick={() => setRange('monthly')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${range === 'monthly' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-900'}`}>Bulanan · 3 tahun</button>
              <button onClick={() => setShowChart((current) => !current)} className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300">{showChart ? 'Sembunyikan grafik' : 'Tampilkan grafik'}</button>
            </div>
            {showChart && predictions ? <ForecastChart data={predictions.forecast[range]} color={range === 'daily' ? '#34d399' : '#60a5fa'} title={range === 'daily' ? 'Prediksi produksi harian' : 'Estimasi produksi bulanan'} unit={range === 'daily' ? 'ton / hari' : 'ton / bulan'} /> : null}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {predictions?.forecast[range].map((item) => <div key={item.label} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700"><span>{item.label}</span><span className="float-right font-semibold text-slate-900">{item.value.toLocaleString('id-ID')}</span></div>)}
            </div>
          </section>
        </div>

        {user ? (
          (user.role === 'admin' || user.role === 'superadmin') && (
            <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Manajemen Pengguna</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Daftar Akun</h2>
                </div>
                <p className="text-sm text-slate-400">Hanya dapat diakses admin dan superadmin.</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((item) => (
                  <div key={item.email} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">{item.role}</p>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.email}</p>
                    {user.role === 'superadmin' && item.role === 'user' ? (
                      <button onClick={() => handlePromote(item.email)} className="mt-4 rounded-xl bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-400">Promosikan jadi admin</button>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )
        ) : (
          <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Akses Publik</p>
              <h2 className="text-2xl font-bold text-slate-900">Dashboard siap digunakan tanpa login</h2>
              <p className="text-slate-600">Anda menggunakan peran user biasa dan dapat melihat seluruh ringkasan, grafik, serta perbandingan prediksi. Login hanya diperlukan untuk admin dan superadmin.</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
