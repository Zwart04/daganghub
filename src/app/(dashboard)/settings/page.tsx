'use client';

import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Globe, Share2 } from 'lucide-react';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const [metaPixel, setMetaPixel] = useState('');
  const [googleAds, setGoogleAds] = useState('');
  const [copied, setCopied] = useState(false);

  const share = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = origin + '/storefront/rosari';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
          <p className="text-muted-foreground">Manage your store preferences</p>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="text-lg font-semibold">{t('settings.language')}</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocale('en')} className={`btn ${locale === 'en' ? 'btn-primary' : 'btn-secondary'}`}>English</button>
            <button onClick={() => setLocale('id')} className={`btn ${locale === 'id' ? 'btn-primary' : 'btn-secondary'}`}>Bahasa Indonesia</button>
          </div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="text-lg font-semibold">{t('ads.title')}</h3>
          <div className="space-y-2"><label className="text-sm font-medium">{t('ads.metaPixel')}</label><input className="input" placeholder="Meta Pixel ID" value={metaPixel} onChange={e => setMetaPixel(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">{t('ads.googleAds')}</label><input className="input" placeholder="Google Ads ID" value={googleAds} onChange={e => setGoogleAds(e.target.value)} /></div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="text-lg font-semibold">{t('storefront.publicLink')}</h3>
          <div className="flex gap-2">
            <input className="input" readOnly value={`${origin}/storefront/rosari`} />
            <button onClick={share} className="btn btn-primary"><Share2 className="h-4 w-4" />{copied ? 'Copied!' : t('storefront.publicLink')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
