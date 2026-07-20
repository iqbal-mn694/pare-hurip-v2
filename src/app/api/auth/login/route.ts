import { NextRequest, NextResponse } from 'next/server';
import { appUsers, createToken, getPublicUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password diperlukan' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.PARE_HURIP_API_URL ?? 'http://127.0.0.1:8000'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
      signal: AbortSignal.timeout(2_000),
    });
    const payload = await response.json();
    if (response.ok) return NextResponse.json(payload);
    return NextResponse.json({ error: payload.detail ?? 'Email atau password salah' }, { status: response.status });
  } catch {
    // Mode demo tetap tersedia bila FastAPI lokal belum dijalankan.
  }

  const user = appUsers.find((item) => item.email === email && item.password === password);
  if (!user) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
  }

  const token = createToken(user);
  return NextResponse.json({ token, ...getPublicUser(user) });
}
