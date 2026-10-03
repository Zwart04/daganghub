'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Customer } from '@/types';

export default function CustomersPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateCustomer(editing.id, form);
    } else {
      addCustomer({ id: `cust-${Date.now()}`, ...form, totalOrders: 0, totalSpent: 0, createdAt: new Date() });
    }
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('customers.title')}</h1>
            <p className="text-muted-foreground">{customers.length} customers</p>
          </div>
          <button onClick={() => { setEditing(null); setForm({ name: '', phone: '', email: '', address: '' }); setShowForm(true); }} className="btn btn-primary"><Plus className="h-4 w-4" />{t('customers.addCustomer')}</button>
        </div>
        <div className="card overflow-hidden">
          <table className="table">
            <thead className="table-header bg-muted/50">
              <tr>
                <th className="table-cell text-left font-medium">{t('customers.name')}</th>
                <th className="table-cell text-left font-medium">{t('customers.phone')}</th>
                <th className="table-cell text-left font-medium">{t('customers.email')}</th>
                <th className="table-cell text-left font-medium">{t('customers.address')}</th>
                <th className="table-cell text-right font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {customers.map(c => (
                <tr key={c.id} className="table-row">
                  <td className="table-cell font-medium">{c.name}</td>
                  <td className="table-cell">{c.phone}</td>
                  <td className="table-cell">{c.email}</td>
                  <td className="table-cell">{c.address}</td>
                  <td className="table-cell text-right">
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-ghost btn-sm"><Pencil className="h-3 w-3" /></button>
                      <button className="btn btn-ghost btn-sm text-destructive"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="card w-full max-w-lg p-6">
              <h2 className="text-lg font-semibold mb-4">{t('customers.addCustomer')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2"><label className="text-sm font-medium">{t('customers.name')}</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('customers.phone')}</label><input className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('customers.email')}</label><input className="input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('customers.address')}</label><textarea className="input" value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">{t('common.cancel')}</button>
                  <button type="submit" className="btn btn-primary">{t('common.save')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
