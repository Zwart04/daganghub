import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const db = getDb();
  const u = db.users.find(x => x.email === email);
  if (!u) return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  const user = { id: u.id, email: u.email, name: u.name, storeName: u.storeName, role: u.role };
  return NextResponse.json({ user });
}
