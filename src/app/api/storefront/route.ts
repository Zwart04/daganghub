import { NextResponse } from 'next/server';
function unavailable() {
  return NextResponse.json({ error: 'Server storage is not configured. This application uses browser-local data and export.' }, { status: 501 });
}
export const GET = unavailable;
export const POST = unavailable;
export const PUT = unavailable;
export const DELETE = unavailable;
