'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/contexts/I18nContext';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Package, ShoppingCart, Users, Wallet, Store, Settings, LogOut, MessageCircle } from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const router = useRouter();
  const items = [
    { href: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { href: '/products', icon: Package, label: t('nav.products') },
    { href: '/orders', icon: ShoppingCart, label: t('nav.orders') },
    { href: '/customers', icon: Users, label: t('nav.customers') },
    { href: '/finance', icon: Wallet, label: t('nav.finance') },
    { href: '/storefront', icon: Store, label: t('nav.storefront') },
    { href: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur flex flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-bold">Rosari Commerce</span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(item => (
          <Link key={item.href} href={item.href} className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t">
        <button onClick={() => signOut()} className="sidebar-item w-full justify-start text-destructive">
          <LogOut className="h-4 w-4" />
          {t('nav.logout')}
        </button>
      </div>
    </aside>
  );
}
