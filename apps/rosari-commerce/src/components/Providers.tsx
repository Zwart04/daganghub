'use client';

import { SessionProvider } from 'next-auth/react';
import { DataProvider } from '@/contexts/DataContext';
import { I18nProvider } from '@/contexts/I18nContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={process.env.NEXT_PUBLIC_OAUTH_ENABLED === "true" ? undefined : null} refetchOnWindowFocus={false}>
      <I18nProvider>
        <DataProvider>
          {children}
        </DataProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
