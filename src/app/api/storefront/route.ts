import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const db = getDb();
  if (slug) {
    const s = db.storefronts.find(x => x.slug === slug);
    return NextResponse.json(s || null);
  }
  return NextResponse.json(db.storefronts);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const db = getDb();
  const idx = db.storefronts.findIndex(s => s.slug === data.slug);
  if (idx >= 0) db.storefronts[idx] = { ...db.storefronts[idx], ...data };
  return NextResponse.json(data);
}
