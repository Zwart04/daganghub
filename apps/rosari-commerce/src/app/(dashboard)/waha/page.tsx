'use client';

import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MessageCircle, Send, QrCode } from 'lucide-react';

export default function WahaPage() {
  const { t } = useI18n();
  const [connected, setConnected] = useState(false);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [qr, setQr] = useState('');

  const connect = () => {
    setConnected(true);
    setQr('mock-qr-data');
  };

  const send = () => {
    alert('Template sent to ' + phone + ': ' + message);
    setMessage('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('wa.title')}</h1>
          <p className="text-muted-foreground">{t('wa.sendTemplate')}</p>
        </div>
        <div className="card p-6">
          {!connected ? (
            <div className="text-center space-y-4">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{t('wa.disconnected')}</p>
              <button onClick={connect} className="btn btn-primary"><QrCode className="h-4 w-4" />{t('wa.connect')}</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-success" /><span className="text-sm">{t('wa.connected')}</span></div>
              <div className="space-y-2"><label className="text-sm font-medium">Phone</label><input className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="62812..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">{t('wa.templateMessage')}</label><textarea className="input" value={message} onChange={e => setMessage(e.target.value)} /></div>
              <button onClick={send} className="btn btn-primary"><Send className="h-4 w-4" />{t('wa.sendTemplate')}</button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
