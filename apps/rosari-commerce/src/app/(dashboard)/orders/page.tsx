'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Plus, Eye } from 'lucide-react';
import { Order, OrderItem } from '@/types';

export default function OrdersPage() {
  const { orders, products, customers, addOrder, updateOrderStatus } = useData();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [viewing, setViewing] = useState<Order | null>(null);
  const [form, setForm] = useState({ customerId: '', items: [] as OrderItem[], paymentMethod: 'transfer', paymentStatus: 'unpaid', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === form.customerId);
    const total = form.items.reduce((s, i) => s + i.price * i.quantity, 0);
    addOrder({
      id: `ORD-${Date.now()}`,
      customerId: form.customerId,
      customerName: customer?.name || 'Guest',
      items: form.items,
      total,
      status: 'pending',
      paymentMethod: form.paymentMethod as Order['paymentMethod'],
      paymentStatus: form.paymentStatus as Order['paymentStatus'],
      notes: form.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setShowForm(false);
  };

  const addItem = () => {
    const product = products[0];
    setForm({
      ...form,
      items: [...form.items, { productId: product?.id || '', productName: product?.name || '', quantity: 1, price: product?.price || 0 }]
    });
  };

  const updateItem = (idx: number, field: keyof OrderItem, value: string | number) => {
    const items = [...form.items];
    items[idx] = { ...items[idx], [field]: value };
    if (field === 'productId') {
      const p = products.find(x => x.id === value);
      if (p) items[idx] = { ...items[idx], productName: p.name, price: p.price };
    }
    setForm({ ...form, items });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('orders.title')}</h1>
            <p className="text-muted-foreground">{orders.length} orders</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn btn-primary"><Plus className="h-4 w-4" />{t('orders.newOrder')}</button>
        </div>
        <div className="card overflow-hidden">
          <table className="table">
            <thead className="table-header bg-muted/50">
              <tr>
                <th className="table-cell text-left font-medium">{t('orders.orderId')}</th>
                <th className="table-cell text-left font-medium">{t('orders.customer')}</th>
                <th className="table-cell text-left font-medium">{t('orders.total')}</th>
                <th className="table-cell text-left font-medium">{t('orders.status')}</th>
                <th className="table-cell text-right font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {orders.map(o => (
                <tr key={o.id} className="table-row">
                  <td className="table-cell font-mono text-xs">{o.id}</td>
                  <td className="table-cell">{o.customerName}</td>
                  <td className="table-cell">Rp {o.total.toLocaleString()}</td>
                  <td className="table-cell"><span className={`badge ${o.status === 'delivered' ? 'badge-success' : o.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`}>{t(`orders.${o.status}`)}</span></td>
                  <td className="table-cell text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setViewing(o)} className="btn btn-ghost btn-sm"><Eye className="h-3 w-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
            <div className="card w-full max-w-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">{t('orders.newOrder')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2"><label className="text-sm font-medium">{t('orders.customer')}</label><select className="input" value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})} required><option value="">Select</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('orders.items')}</label>
                  {form.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-end">
                      <select className="input" value={item.productId} onChange={e => updateItem(idx, 'productId', e.target.value)}>
                        <option value="">Product</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <input className="input w-20" type="number" value={item.quantity} onChange={e => updateItem(idx, 'quantity', Number(e.target.value))} />
                      <input className="input w-32" type="number" value={item.price} onChange={e => updateItem(idx, 'price', Number(e.target.value))} />
                      <button type="button" onClick={() => setForm({...form, items: form.items.filter((_, i) => i !== idx)})} className="btn btn-ghost btn-sm text-destructive">X</button>
                    </div>
                  ))}
                  <button type="button" onClick={addItem} className="btn btn-secondary btn-sm">Add Item</button>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">{t('common.cancel')}</button>
                  <button type="submit" className="btn btn-primary">{t('common.save')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {viewing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="card w-full max-w-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order {viewing.id}</h2>
              <div className="space-y-2 text-sm">
                <p><strong>{t('orders.customer')}:</strong> {viewing.customerName}</p>
                <p><strong>{t('orders.total')}:</strong> Rp {viewing.total.toLocaleString()}</p>
                <p><strong>{t('orders.status')}:</strong> {t(`orders.${viewing.status}`)}</p>
                <div><strong>{t('orders.items')}:</strong>
                  <ul className="list-disc pl-5">{viewing.items.map((i, idx) => <li key={idx}>{i.productName} x{i.quantity} @ Rp {i.price.toLocaleString()}</li>)}</ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setViewing(null)} className="btn btn-secondary">{t('common.close')}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
