'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/contexts/I18nContext';
import { useData } from '@/contexts/DataContext';

export default function LoginPage() {
  const { t, locale } = useI18n();
  const { users } = useData();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('hf_user');
    if (u) router.replace('/');
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const u = users.find(x => x.email === email);
    const accounts = JSON.parse(localStorage.getItem('hf_users') || '[]') as { email: string; password?: string }[];
    const account = accounts.find(a => a.email === email);
    if (!u || password !== (account?.password || 'password123')) {
      setError(t('auth.invalidCredentials'));
      return;
    }
    localStorage.setItem('hf_user', JSON.stringify({ id: u.id, email: u.email, name: u.name, role: u.role, storeName: u.storeName }));
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{t('auth.login')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Rosari Commerce</p>
        </div>
        <div className="card space-y-4 p-6">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.email')}</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.password')}</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-full">{t('auth.signIn')}</button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
          </div>
          {process.env.NEXT_PUBLIC_OAUTH_ENABLED === "true" && <a href="/api/auth/signin" className="btn btn-secondary w-full">{t('auth.signInWithHf')}</a>}
          <p className="text-center text-xs text-muted-foreground">{t('auth.noAccount')}</p>
        </div>
      </div>
    </div>
  );
}
