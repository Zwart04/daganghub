'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Product } from '@/types';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: 0, stock: 0, category: '', isActive: true });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', description: '', price: 0, stock: 0, category: '', isActive: true });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock, category: p.category, isActive: p.isActive });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct({ id: `prod-${Date.now()}`, ...form, createdAt: new Date() });
    }
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('products.title')}</h1>
            <p className="text-muted-foreground">{products.length} {t('common.noData') === 'No data available' ? 'items' : 'item'}</p>
          </div>
          <button onClick={openCreate} className="btn btn-primary"><Plus className="h-4 w-4" />{t('products.addProduct')}</button>
        </div>
        <div className="card overflow-hidden">
          <table className="table">
            <thead className="table-header bg-muted/50">
              <tr>
                <th className="table-cell text-left font-medium">{t('products.name')}</th>
                <th className="table-cell text-left font-medium">{t('products.category')}</th>
                <th className="table-cell text-left font-medium">{t('products.price')}</th>
                <th className="table-cell text-left font-medium">{t('products.stock')}</th>
                <th className="table-cell text-left font-medium">{t('products.status')}</th>
                <th className="table-cell text-right font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {products.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="table-cell font-medium">{p.name}</td>
                  <td className="table-cell">{p.category}</td>
                  <td className="table-cell">Rp {p.price.toLocaleString()}</td>
                  <td className="table-cell">{p.stock}</td>
                  <td className="table-cell"><span className={`badge ${p.isActive ? 'badge-success' : 'badge-secondary'}`}>{p.isActive ? t('products.active') : t('products.inactive')}</span></td>
                  <td className="table-cell text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="btn btn-ghost btn-sm"><Pencil className="h-3 w-3" /></button>
                      <button onClick={() => deleteProduct(p.id)} className="btn btn-ghost btn-sm text-destructive"><Trash2 className="h-3 w-3" /></button>
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
              <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit' : t('products.addProduct')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2"><label className="text-sm font-medium">{t('products.name')}</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('products.category')}</label><input className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium">{t('products.price')}</label><input className="input" type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">{t('products.stock')}</label><input className="input" type="number" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} required /></div>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('common.description')}</label><textarea className="input min-h-[80px]" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
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
