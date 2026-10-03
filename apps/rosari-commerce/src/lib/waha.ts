export type WahaStatus = 'disconnected' | 'scanning' | 'connected';

export interface WahaSession {
  status: WahaStatus;
  phone?: string;
}

export async function getWahaStatus(url?: string): Promise<WahaSession> {
  return { status: 'disconnected' };
}

export async function startWahaSession(url: string, session: string): Promise<WahaSession> {
  return { status: 'scanning' };
}

export async function getWahaQr(url: string, session: string): Promise<string | null> {
  return 'mock-qr';
}

export async function sendWahaMessage(url: string, session: string, chatId: string, text: string): Promise<boolean> {
  return true;
}
