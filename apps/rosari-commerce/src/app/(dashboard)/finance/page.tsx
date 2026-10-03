'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { JournalEntry } from '@/types';

export default function FinancePage() {
  const { journalEntries, addJournalEntry } = useData();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'income' as 'income' | 'expense', category: '', amount: 0, description: '', referenceId: '' });

  const income = journalEntries.filter(j => j.type === 'income').reduce((s, j) => s + j.amount, 0);
  const expense = journalEntries.filter(j => j.type === 'expense').reduce((s, j) => s + j.amount, 0);
  const balance = income - expense;

  const chartData = [
    { name: t('finance.income'), value: income },
    { name: t('finance.expense'), value: expense },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry({
      id: `je-${Date.now()}`,
      date: new Date(),
      ...form,
      amount: Number(form.amount),
    });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('finance.title')}</h1>
            <p className="text-muted-foreground">{t('finance.journal')}</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn btn-primary"><Plus className="h-4 w-4" />{t('finance.addEntry')}</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-6"><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-success" /><p className="text-sm text-muted-foreground">{t('finance.income')}</p></div><p className="mt-2 text-2xl font-bold">Rp {income.toLocaleString()}</p></div>
          <div className="card p-6"><div className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-destructive" /><p className="text-sm text-muted-foreground">{t('finance.expense')}</p></div><p className="mt-2 text-2xl font-bold">Rp {expense.toLocaleString()}</p></div>
          <div className="card p-6"><div className="flex items-center gap-2"><p className="text-sm text-muted-foreground">{t('finance.balance')}</p></div><p className="mt-2 text-2xl font-bold">Rp {balance.toLocaleString()}</p></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    <Cell fill="var(--color-success)" />
                    <Cell fill="var(--color-danger)" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">{t('finance.journal')}</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {journalEntries.slice().reverse().map(j => (
                <div key={j.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{j.description}</p>
                    <p className="text-xs text-muted-foreground">{j.category} - {new Date(j.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-semibold ${j.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                    {j.type === 'income' ? '+' : '-'}Rp {j.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="card w-full max-w-lg p-6">
              <h2 className="text-lg font-semibold mb-4">{t('finance.addEntry')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2"><label className="text-sm font-medium">{t('finance.category')}</label><input className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium">{t('finance.income')}</label><input className="input" type="number" value={form.amount} onChange={e => setForm({...form, type: 'income', amount: Number(e.target.value)})} /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">{t('finance.expense')}</label><input className="input" type="number" value={form.amount} onChange={e => setForm({...form, type: 'expense', amount: Number(e.target.value)})} /></div>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">{t('common.description')}</label><textarea className="input" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required /></div>
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
