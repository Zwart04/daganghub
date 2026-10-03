'use client';

import { useI18n } from '@/contexts/I18nContext';
import { useSession } from 'next-auth/react';
import { Globe } from 'lucide-react';

export function TopBar() {
  const { t, locale, setLocale } = useI18n();
  const { data } = useSession();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">{t('dashboard.subtitle')}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setLocale(locale === 'en' ? 'id' : 'en')} className="btn btn-ghost text-xs flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {locale === 'en' ? 'EN' : 'ID'}
        </button>
        <span className="text-sm text-muted-foreground">{data?.user?.name || 'Admin'}</span>
      </div>
    </header>
  );
}
