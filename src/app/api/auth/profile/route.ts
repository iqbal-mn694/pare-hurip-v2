import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  const user = verifyToken(token || undefined);

  if (!user) {
    return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
  }

  return NextResponse.json({ profile: { email: user.email, name: user.name, role: user.role } });
}
