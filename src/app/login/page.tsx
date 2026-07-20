'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveStoredUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      saveStoredUser({ email: data.email, name: data.name, role: data.role }, data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-20">
      <div className="mx-auto max-w-xl px-6 sm:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">PARE HURIP</p>
            <h1 className="text-4xl font-extrabold">Masuk ke Dashboard</h1>
            <p className="text-slate-600">Gunakan akun superadmin, admin, atau user biasa untuk mengakses.</p>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent transition focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent transition focus:ring-green-500"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm text-slate-700">
            Akun contoh:
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>superadmin@parehurip.id / superpass</li>
              <li>admin@parehurip.id / adminpass</li>
              <li>user@parehurip.id / userpass</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
