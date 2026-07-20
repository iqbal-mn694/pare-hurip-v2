"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getStoredUserSnapshot } from '@/lib/auth';

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

interface StoredUser {
  email: string;
  name: string;
  role: string;
  token: string;
}

function subscribeToStoredUser(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string | ArrayBuffer | null;
      if (typeof result !== 'string') {
        reject(new Error('File load failed.'));
        return;
      }
      const base64 = result.split(',')[1] ?? '';
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('File load failed.'));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeToStoredUser, getStoredUserSnapshot, () => null) as StoredUser | null;
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productionToday, setProductionToday] = useState(0);
  const [activeAreas, setActiveAreas] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadAdminData = useCallback(() => {
    fetch(`/api/admin/data?cache=${Date.now()}`)
      .then((response) => response.json())
      .then((result) => {
        setAdminData(result.data || null);
      })
      .catch(() => {
        setAdminData(null);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      router.replace('/dashboard');
      return;
    }

    loadAdminData();
    const interval = window.setInterval(loadAdminData, 10_000);
    return () => window.clearInterval(interval);
  }, [loadAdminData, router, user]);

  useEffect(() => {
    if (!adminData) {
      return;
    }

    setTitle(adminData.title);
    setDescription(adminData.description);
    setProductionToday(adminData.productionToday);
    setActiveAreas(adminData.activeAreas);
  }, [adminData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setMessage('Harus login sebagai admin untuk menyimpan data.');
      return;
    }

    setSaving(true);
    setMessage('');

    const payload: Record<string, unknown> = {
      title,
      description,
      productionToday,
      activeAreas,
    };

    if (file) {
      try {
        payload.fileName = file.name;
        payload.fileType = file.type || 'application/octet-stream';
        payload.fileData = await fileToBase64(file);
      } catch {
        setSaving(false);
        setMessage('Gagal membaca file. Silakan coba lagi.');
        return;
      }
    }

    const response = await fetch('/api/admin/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || 'Gagal menyimpan data admin.');
      setSaving(false);
      return;
    }

    setAdminData(result.data || null);
    loadAdminData();
    setMessage('Data admin berhasil disimpan.');
    setSaving(false);
  };

  const downloadUrl = useMemo(() => {
    if (!adminData?.fileData || !adminData.fileType || !adminData.fileName) {
      return undefined;
    }
    return `data:${adminData.fileType};base64,${adminData.fileData}`;
  }, [adminData]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Panel Admin</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Input Data dan File</h1>
              <p className="mt-2 text-slate-600">Masukkan data yang akan langsung terlihat oleh pengguna biasa di dashboard.</p>
            </div>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100">
              Kembali ke Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Form Input Khusus Admin</h2>
            <p className="mt-2 text-sm text-slate-600">Hanya admin atau superadmin yang dapat mengisi dan mengubah data di sini.</p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold text-slate-700">Judul</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  placeholder="Contoh: Data Panen Mingguan"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Deskripsi</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-2 h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  placeholder="Jelaskan ringkas data yang diunggah dan arti nilainya."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Produksi Hari Ini</label>
                  <input
                    type="number"
                    min="0"
                    value={productionToday}
                    onChange={(event) => setProductionToday(Number(event.target.value))}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Area Aktif</label>
                  <input
                    type="number"
                    min="0"
                    value={activeAreas}
                    onChange={(event) => setActiveAreas(Number(event.target.value))}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Unggah File</label>
                <input
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
                <p className="mt-2 text-sm text-slate-500">File akan disimpan ke backend dan bisa dilihat pengguna biasa di dashboard.</p>
              </div>
              {message ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{message}</div> : null}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saving ? 'Menyimpan...' : 'Simpan Data Admin'}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status Penyimpanan</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">Data Admin Terkini</h2>
              </div>
              <button
                type="button"
                onClick={loadAdminData}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                Segarkan
              </button>
            </div>
            <div className="mt-6">
              {adminData ? (
                <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <p className="text-sm text-slate-500">Judul</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{adminData.title}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Produksi Hari Ini</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">{adminData.productionToday.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Area Aktif</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">{adminData.activeAreas.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  {adminData.fileName ? (
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Nama File</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{adminData.fileName}</span>
                        {downloadUrl ? (
                          <a href={downloadUrl} download={adminData.fileName} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                            Unduh file
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  <p className="text-sm text-slate-500">Terakhir disimpan: {new Date(adminData.updatedAt).toLocaleString('id-ID')}</p>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                  Belum ada data tersimpan. Gunakan formulir input di sebelah kiri untuk menyimpan data admin.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
