'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  Store,
  MessageCircle,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// bilingual strings (EN / ID)
// ---------------------------------------------------------------------------
const STRINGS = {
  en: {
    brand: 'Rosari Commerce OS',
    tagline: 'Commerce OS for UMKM',
    loginTitle: 'Welcome back',
    loginHint: 'Sign in with demo account admin@rosari.id / password123',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    invalid: 'Invalid credentials. Use admin@rosari.id / password123',
    logout: 'Logout',
    langToggle: 'ID',
    tabs: {
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      customers: 'Customers',
      finance: 'Finance',
      storefront: 'Storefront',
      waha: 'WAHA',
      settings: 'Settings',
    },
    tabDesc: {
      dashboard: 'Overview of sales, orders and revenue — your daily pulse.',
      products: 'Manage catalogue, stock and pricing for every channel.',
      orders: 'Track and fulfil orders from marketplace and storefront.',
      customers: 'CRM — segment, message and retain your buyers.',
      finance: 'Income, expenses and profit reports at a glance.',
      storefront: 'Customise your hosted storefront and domain.',
      waha: 'WhatsApp HTTP API — automate chat and commerce.',
      settings: 'Workspace, team and integration settings.',
    },
    demoNote: 'Demo Account: admin@rosari.id / password123 (hf_user cheap auth)',
  },
  id: {
    brand: 'Rosari Commerce OS',
    tagline: 'Commerce OS untuk UMKM',
    loginTitle: 'Selamat datang kembali',
    loginHint: 'Masuk dengan akun demo admin@rosari.id / password123',
    email: 'Email',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    signingIn: 'Memproses...',
    invalid: 'Kredensial salah. Gunakan admin@rosari.id / password123',
    logout: 'Keluar',
    langToggle: 'EN',
    tabs: {
      dashboard: 'Dasbor',
      products: 'Produk',
      orders: 'Pesanan',
      customers: 'Pelanggan',
      finance: 'Keuangan',
      storefront: 'Toko Online',
      waha: 'WAHA',
      settings: 'Pengaturan',
    },
    tabDesc: {
      dashboard: 'Ringkasan penjualan, pesanan, dan pendapatan harian.',
      products: 'Kelola katalog, stok, dan harga di semua channel.',
      orders: 'Lacak dan penuhi pesanan dari marketplace & toko.',
      customers: 'CRM — segmentasi dan retensi pelanggan.',
      finance: 'Laporan pemasukan, pengeluaran, dan laba.',
      storefront: 'Kustomisasi toko online dan domain Anda.',
      waha: 'WhatsApp HTTP API — otomasi chat & commerce.',
      settings: 'Pengaturan workspace, tim, dan integrasi.',
    },
    demoNote: 'Akun Demo: admin@rosari.id / password123 (hf_user cheap auth)',
  },
} as const;

type Lang = keyof typeof STRINGS;
type TabKey = keyof typeof STRINGS.en.tabs;

const VALID_TABS: TabKey[] = [
  'dashboard',
  'products',
  'orders',
  'customers',
  'finance',
  'storefront',
  'waha',
  'settings',
];

const TAB_ICONS: Record<TabKey, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  products: Package,
  orders: ShoppingCart,
  customers: Users,
  finance: Wallet,
  storefront: Store,
  waha: MessageCircle,
  settings: Settings,
};

// hf_user cheap auth — hardcoded demo credential check via credentials
const DEMO_EMAIL = 'admin@rosari.id';
const DEMO_PASS = 'password123';

export default function RootRouter() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [hfUser, setHfUser] = useState<Record<string, string> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const t = STRINGS[lang];

  // restore hf_user + lang + tab from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('hf_user');
      if (raw) setHfUser(JSON.parse(raw));
      const savedLang = localStorage.getItem('rosari_lang') as Lang | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'id')) setLang(savedLang);
      const savedTab = localStorage.getItem('rosari_tab') as TabKey | null;
      if (savedTab && VALID_TABS.includes(savedTab)) setActiveTab(savedTab);
      // hash-based tab routing
      const hash = window.location.hash.replace('#', '') as TabKey;
      if (hash && VALID_TABS.includes(hash)) setActiveTab(hash);
    } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'id' : 'en';
      localStorage.setItem('rosari_lang', next);
      return next;
    });
  }, []);

  const selectTab = useCallback((tab: TabKey) => {
    setActiveTab(tab);
    localStorage.setItem('rosari_tab', tab);
    window.location.hash = tab;
    setMobileNav(false);
  }, []);

  // redirect logic handled via hf_user cheap auth + next-auth session
  useEffect(() => {
    // if next-auth authenticated, sync to hf_user for cheap auth compatibility
    if (status === 'authenticated' && session?.user?.email && !hfUser) {
      const synced = { email: session.user.email, name: session.user.name ?? session.user.email };
      localStorage.setItem('hf_user', JSON.stringify(synced));
      setHfUser(synced as Record<string, string>);
    }
  }, [status, session, hfUser]);

  const isAuthenticated = !!hfUser || status === 'authenticated';

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      // cheap hf_user auth: hardcoded credentials check
      setTimeout(() => {
        if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASS) {
          const user = { id: '1', email: DEMO_EMAIL, name: 'Admin Rosari', role: 'admin', storeName: 'Toko Rosari' };
          localStorage.setItem('hf_user', JSON.stringify(user));
          setHfUser(user);
          setError('');
        } else {
          setError(t.invalid);
        }
        setLoading(false);
      }, 400);
    },
    [email, password, t.invalid],
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('hf_user');
    setHfUser(null);
    setEmail('');
    setPassword('');
    router.refresh();
  }, [router]);

  // ------------------------------------------------------------------
  // loading state
  // ------------------------------------------------------------------
  if (status === 'loading' && !hfUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // ------------------------------------------------------------------
  // unauthenticated — bilingual auth screen
  // ------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary px-4 py-12">
        <div className="absolute right-4 top-4">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent"
          >
            <Globe className="h-3.5 w-3.5" /> {t.langToggle}
          </button>
        </div>
        <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">{t.brand}</h1>
            <p className="mt-1 text-xs text-muted-foreground">{t.tagline}</p>
          </div>
          <h2 className="mb-1 text-sm font-semibold">{t.loginTitle}</h2>
          <p className="mb-4 text-xs text-muted-foreground">{t.loginHint}</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={DEMO_EMAIL}
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>
            {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={loading} className="btn w-full">
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>
          <p className="mt-4 text-center text-[11px] text-muted-foreground">{t.demoNote}</p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // authenticated — tab router with bilingual + lazy conditional render
  // ------------------------------------------------------------------
  return (
    <div className="flex min-h-screen bg-background">
      {/* sidebar desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-card md:flex">
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight">{t.brand}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">{t.tagline}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {VALID_TABS.map((key) => {
            const Icon = TAB_ICONS[key];
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => selectTab(key)}
                className={`sidebar-item w-full text-left ${active ? 'active bg-accent text-accent-foreground' : ''}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t.tabs[key]}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t p-3 space-y-2">
          <button onClick={toggleLang} className="sidebar-item w-full">
            <Globe className="h-4 w-4" /> {lang === 'en' ? 'Bahasa Indonesia' : 'English'}
          </button>
          <button onClick={handleLogout} className="sidebar-item w-full text-destructive">
            <LogOut className="h-4 w-4" /> {t.logout}
          </button>
          <p className="px-3 pt-1 text-[11px] text-muted-foreground truncate">{hfUser?.email ?? session?.user?.email}</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* mobile topbar */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
          <span className="text-sm font-bold">{t.brand}</span>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="rounded-full border px-2.5 py-1 text-xs font-medium">
              <Globe className="mr-1 inline h-3 w-3" />{t.langToggle}
            </button>
            <button onClick={() => setMobileNav((v) => !v)} className="rounded-lg border p-1.5">
              {mobileNav ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </header>
        {mobileNav && (
          <nav className="grid grid-cols-2 gap-1 border-b bg-card p-3 md:hidden">
            {VALID_TABS.map((key) => {
              const Icon = TAB_ICONS[key];
              return (
                <button
                  key={key}
                  onClick={() => selectTab(key)}
                  className={`sidebar-item ${activeTab === key ? 'active' : ''}`}
                >
                  <Icon className="h-4 w-4" /> {t.tabs[key]}
                </button>
              );
            })}
            <button onClick={handleLogout} className="sidebar-item text-destructive">
              <LogOut className="h-4 w-4" /> {t.logout}
            </button>
          </nav>
        )}

        {/* tab content — conditional lazy sections */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">{t.tabs[activeTab]}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.tabDesc[activeTab]}</p>
            </div>

            {/* dashboard */}
            {activeTab === 'dashboard' && (
              <section className="grid gap-4 md:grid-cols-3">
                {[t.tabs.dashboard, t.tabs.products, t.tabs.orders].map((label) => (
                  <div key={label} className="card p-5">
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-bold">—</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.tagline}</p>
                  </div>
                ))}
              </section>
            )}
            {activeTab === 'products' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.products}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.products}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Product catalogue — connect to /dashboard/products</div>
              </section>
            )}
            {activeTab === 'orders' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.orders}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.orders}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Order list — connect to /dashboard/orders</div>
              </section>
            )}
            {activeTab === 'customers' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.customers}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.customers}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Customer CRM — connect to /dashboard/customers</div>
              </section>
            )}
            {activeTab === 'finance' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.finance}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.finance}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Finance reports — connect to /dashboard/finance</div>
              </section>
            )}
            {activeTab === 'storefront' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.storefront}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.storefront}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Storefront editor — connect to /dashboard/storefront</div>
              </section>
            )}
            {activeTab === 'waha' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.waha}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.waha}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">WAHA integration — connect to /dashboard/waha</div>
              </section>
            )}
            {activeTab === 'settings' && (
              <section className="card p-6">
                <h3 className="font-semibold">{t.tabs.settings}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.tabDesc.settings}</p>
                <div className="mt-4 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Settings — connect to /dashboard/settings</div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
