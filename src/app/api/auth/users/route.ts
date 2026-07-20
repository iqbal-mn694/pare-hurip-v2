import { NextRequest, NextResponse } from 'next/server';
import { appUsers, getPublicUser, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  try {
    const response = await fetch(`${process.env.PARE_HURIP_API_URL ?? 'http://127.0.0.1:8000'}/users`, {
      headers: authHeader ? { Authorization: authHeader } : {},
      cache: 'no-store',
      signal: AbortSignal.timeout(2_000),
    });
    const payload = await response.json();
    if (response.ok) return NextResponse.json(payload);
    return NextResponse.json({ error: payload.detail ?? 'Akses ditolak' }, { status: response.status });
  } catch {
    // Gunakan store demo jika layanan backend lokal belum berjalan.
  }

  const user = verifyToken(token || undefined);

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
  }

  const users = appUsers.map(getPublicUser);
  return NextResponse.json({ users });
}
