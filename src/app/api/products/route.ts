import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const db = getDb();
  db.products.push(data);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const db = getDb();
  const idx = db.products.findIndex(p => p.id === data.id);
  if (idx >= 0) db.products[idx] = data;
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const db = getDb();
  db.products = db.products.filter(p => p.id !== id);
  return NextResponse.json({ ok: true });
}
