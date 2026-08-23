import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.customers);
}

export async function POST(req: Request) {
  const data = await req.json();
  const db = getDb();
  db.customers.push(data);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const db = getDb();
  const idx = db.customers.findIndex(c => c.id === data.id);
  if (idx >= 0) db.customers[idx] = data;
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const db = getDb();
  db.customers = db.customers.filter(c => c.id !== id);
  return NextResponse.json({ ok: true });
}
