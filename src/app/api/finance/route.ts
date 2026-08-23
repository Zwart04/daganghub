import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.journalEntries);
}

export async function POST(req: Request) {
  const data = await req.json();
  const db = getDb();
  db.journalEntries.push(data);
  return NextResponse.json(data);
}
