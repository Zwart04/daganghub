'use client';

import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TrendingUp, ShoppingCart, Users, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
  const { orders, products, customers, journalEntries } = useData();
  const { t, locale } = useI18n();

  const totalRevenue = journalEntries.filter(j => j.type === 'income').reduce((s, j) => s + j.amount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.filter(p => p.isActive).length;

  const salesByMonth = [
    { name: locale === 'id' ? 'Jan' : 'Jan', total: 1200000 },
    { name: locale === 'id' ? 'Feb' : 'Feb', total: 2100000 },
    { name: locale === 'id' ? 'Mar' : 'Mar', total: 1800000 },
    { name: locale === 'id' ? 'Apr' : 'Apr', total: 3200000 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t('dashboard.totalRevenue'), value: `Rp ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-success' },
            { label: t('dashboard.totalOrders'), value: totalOrders.toString(), icon: ShoppingCart, color: 'text-primary' },
            { label: t('dashboard.totalCustomers'), value: totalCustomers.toString(), icon: Users, color: 'text-warning' },
            { label: t('dashboard.totalProducts'), value: totalProducts.toString(), icon: Package, color: 'text-destructive' },
          ].map((stat, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard.salesChart')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="var(--color-primary-500)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
