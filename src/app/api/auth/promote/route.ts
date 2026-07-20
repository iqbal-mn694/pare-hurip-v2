import { NextRequest, NextResponse } from 'next/server';
import { promoteUser, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  const body = await request.json();
  const email = body?.email;

  if (!email) {
    return NextResponse.json({ error: 'Email diperlukan' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.PARE_HURIP_API_URL ?? 'http://127.0.0.1:8000'}/users/promote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(authHeader ? { Authorization: authHeader } : {}) },
      body: JSON.stringify({ email }),
      cache: 'no-store',
      signal: AbortSignal.timeout(2_000),
    });
    const payload = await response.json();
    if (response.ok) return NextResponse.json({ promoted: payload });
    return NextResponse.json({ error: payload.detail ?? 'Akses ditolak' }, { status: response.status });
  } catch {
    // Mode demo tetap mendukung promosi lokal.
  }

  const user = verifyToken(token || undefined);
  if (!user || user.role !== 'superadmin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
  }

  const promoted = promoteUser(email);
  if (!promoted) {
    return NextResponse.json({ error: 'Pengguna tidak ditemukan atau sudah admin/superadmin' }, { status: 404 });
  }

  return NextResponse.json({ promoted });
}
