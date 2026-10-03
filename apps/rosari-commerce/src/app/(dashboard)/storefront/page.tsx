'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Store, Eye, ExternalLink } from 'lucide-react';

export default function StorefrontPage() {
  const { storefront, updateStorefront } = useData();
  const { t } = useI18n();
  const [form, setForm] = useState({ storeName: storefront?.storeName || '', description: storefront?.description || '', primaryColor: storefront?.primaryColor || '#4f46e5', isPublic: storefront?.isPublic ?? true });

  const handleSave = () => {
    updateStorefront(form);
    alert('Saved!');
  };

  if (!storefront) return <DashboardLayout><p>No storefront</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('storefront.title')}</h1>
            <p className="text-muted-foreground">{t('storefront.settings')}</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6 space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium">{t('storefront.slug')}</label><input className="input" value={storefront.slug} disabled /></div>
            <div className="space-y-2"><label className="text-sm font-medium">{t('settings.storeName')}</label><input className="input" value={form.storeName} onChange={e => setForm({...form, storeName: e.target.value})} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">{t('storefront.description')}</label><textarea className="input" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">{t('storefront.primaryColor')}</label><input className="input" type="color" value={form.primaryColor} onChange={e => setForm({...form, primaryColor: e.target.value})} /></div>
            <div className="flex items-center gap-2">
              <input id="public" type="checkbox" checked={form.isPublic} onChange={e => setForm({...form, isPublic: e.target.checked})} />
              <label htmlFor="public" className="text-sm font-medium">{t('storefront.isPublic')}</label>
            </div>
            <button onClick={handleSave} className="btn btn-primary">{t('common.save')}</button>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="h-32 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: form.primaryColor }}>{form.storeName}</div>
              <div className="p-4 bg-background">
                <p className="text-sm text-muted-foreground">{form.description}</p>
                <div className="mt-4 flex gap-2">
                  <a href={`/storefront/${storefront.slug}`} target="_blank" className="btn btn-primary btn-sm"><ExternalLink className="h-3 w-3" />{t('storefront.preview')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
