import { handlers } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
function configured() { return Boolean(process.env.HF_CLIENT_ID && process.env.HF_CLIENT_SECRET && (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)); }
export async function GET(request: NextRequest) {
  if (!configured()) return NextResponse.json({ error: 'OAuth is not configured. Use the browser-local workspace.' }, { status: 503 });
  return handlers.GET(request);
}
export async function POST(request: NextRequest) {
  if (!configured()) return NextResponse.json({ error: 'OAuth is not configured.' }, { status: 503 });
  return handlers.POST(request);
}
