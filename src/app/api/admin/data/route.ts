import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.PARE_HURIP_API_URL ?? 'http://127.0.0.1:8000';

export async function GET() {
  try {
    const response = await fetch(`${apiBaseUrl}/admin/content`, { cache: 'no-store' });
    const payload = await response.json();
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ data: null });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const body = await request.json();

  try {
    const response = await fetch(`${apiBaseUrl}/admin/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: payload.detail || payload.error || 'Akses ditolak' }, { status: response.status });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Tidak dapat terhubung ke backend admin.' }, { status: 500 });
  }
}
