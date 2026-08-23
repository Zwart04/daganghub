'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Package, ShoppingCart, Users, Wallet, LayoutDashboard, Globe, MessageCircle, BarChart3, Settings, LogOut, Eye, EyeOff, Languages } from 'lucide-react';

// DagangHub - Commerce OS for UMKM - Root page with hf_user auth + tab router
// Professional auth using localStorage hf_user / hf_users, bilingual EN/ID full
// If authenticated, shows tab router inline (dashboard/products/orders/customers/finance/storefront)
// Otherwise shows professional login page with validation and bilingual toggle

const DEFAULT_USER = { email: 'admin@rosari.id', password: 'password123', name: 'Rosari Admin', storeName: 'Rosari Store' };

const dict = {
  en: {
    brand: 'DagangHub',
    tagline: 'Commerce OS for UMKM',
    loginTitle: 'Welcome back',
    loginSub: 'Sign in to manage your store',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    demo: 'Demo: admin@rosari.id / password123',
    invalid: 'Invalid email or password',
    dashboard: 'Dashboard', products: 'Products', orders: 'Orders', customers: 'Customers', finance: 'Finance', storefront: 'Storefront', waha: 'WhatsApp', settings: 'Settings',
    logout: 'Logout', welcome: 'Welcome',
  },
  id: {
    brand: 'DagangHub',
    tagline: 'Commerce OS untuk UMKM',
    loginTitle: 'Selamat datang kembali',
    loginSub: 'Masuk untuk mengelola toko Anda',
    email: 'Email',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    demo: 'Demo: admin@rosari.id / password123',
    invalid: 'Email atau kata sandi salah',
    dashboard: 'Dasbor', products: 'Produk', orders: 'Pesanan', customers: 'Pelanggan', finance: 'Keuangan', storefront: 'Toko Online', waha: 'WhatsApp', settings: 'Pengaturan',
    logout: 'Keluar', welcome: 'Selamat datang',
  }
};

type Tab = 'dashboard' | 'products' | 'orders' | 'customers' | 'finance' | 'storefront' | 'waha' | 'settings';

const tabs: { id: Tab; icon: any; labelKey: keyof typeof dict.en }[] = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { id: 'products', icon: Package, labelKey: 'products' },
  { id: 'orders', icon: ShoppingCart, labelKey: 'orders' },
  { id: 'customers', icon: Users, labelKey: 'customers' },
  { id: 'finance', icon: Wallet, labelKey: 'finance' },
  { id: 'storefront', icon: Globe, labelKey: 'storefront' },
  { id: 'waha', icon: MessageCircle, labelKey: 'waha' },
  { id: 'settings', icon: Settings, labelKey: 'settings' },
];

function getStoredUser() {
  try {
    const raw = localStorage.getItem('hf_user');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function getStoredUsers() {
  try {
    const raw = localStorage.getItem('hf_users');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [DEFAULT_USER];
}

export default function RootPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<'en' | 'id'>('id');
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = dict[locale];

  useEffect(() => {
    const u = getStoredUser();
    if (u) setUser(u);
    const savedLocale = localStorage.getItem('daganghub_locale') as 'en' | 'id' | null;
    if (savedLocale) setLocale(savedLocale);
    setInitializing(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('daganghub_locale', locale);
  }, [locale]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const users = getStoredUsers();
    // ensure default user exists
    if (!users.find((u: any) => u.email === DEFAULT_USER.email)) {
      users.push(DEFAULT_USER);
      localStorage.setItem('hf_users', JSON.stringify(users));
    }
    const found = users.find((u: any) => u.email === email && u.password === password) || (email === DEFAULT_USER.email && password === DEFAULT_USER.password ? DEFAULT_USER : null);
    setTimeout(() => {
      if (found) {
        const sessionUser = { email: found.email, name: found.name, storeName: found.storeName || 'Rosari Store' };
        localStorage.setItem('hf_user', JSON.stringify(sessionUser));
        // persist users list without wiping - keep existing hf_users intact
        localStorage.setItem('hf_users', JSON.stringify(users));
        setUser(sessionUser);
        setLoading(false);
      } else {
        setError(t.invalid);
        setLoading(false);
      }
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem('hf_user');
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleTabChange = (tab: Tab) => {
    // Cheap client-side tab router: keep state, also push hash for shareable link
    setActiveTab(tab);
    // Also navigate to actual route for deep linking if exists
    const routeMap: Record<Tab, string> = {
      dashboard: '/dashboard',
      products: '/products',
      orders: '/orders',
      customers: '/customers',
      finance: '/finance',
      storefront: '/storefront',
      waha: '/waha',
      settings: '/settings',
    };
    router.push(routeMap[tab]);
  };

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not authenticated -> professional login page (bilingual, polished)
  if (!user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg">
                <Store className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{t.brand}</h1>
              <p className="text-sm text-muted-foreground">{t.tagline}</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-xl">
              <h2 className="mb-1 text-xl font-semibold">{t.loginTitle}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{t.loginSub}</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{t.email}</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@rosari.id" className="input" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{t.password}</label>
                  <div className="relative">
                    <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder="********" className="input pr-10" required />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="rounded-lg bg-destructive/10 p-2 text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                  {loading ? '...' : t.signIn}
                </button>
                <p className="text-center text-xs text-muted-foreground">{t.demo}</p>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <button onClick={() => setLocale(locale === 'id' ? 'en' : 'id')} className="text-sm font-medium hover:underline">
                  {locale === 'id' ? 'ID / EN' : 'EN / ID'}
                </button>
                <span className="text-xs text-muted-foreground">- {locale === 'id' ? 'Indonesia' : 'English'}</span>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">© 2026 DagangHub - Commerce OS untuk UMKM Indonesia</p>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center bg-violet-600 p-10 lg:flex">
          <div className="max-w-md text-white">
            <BarChart3 className="mb-6 h-12 w-12 opacity-90" />
            <h2 className="mb-4 text-3xl font-bold leading-tight">Kelola toko online, pesanan WhatsApp, dan keuangan dalam satu tempat</h2>
            <p className="text-violet-100">Public storefront shareable, template WA otomatis, journal keuangan, dan tracking iklan Meta/Google.</p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated -> tab router shell (cheap but complete)
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Store className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">{t.brand}</p>
            <p className="text-xs text-muted-foreground">{user.storeName}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-violet-600 text-white shadow' : 'hover:bg-accent'}`}>
                <Icon className="h-4 w-4" />
                {t[tab.labelKey]}
              </button>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">{user.name?.[0] || 'A'}</div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-accent">
            <LogOut className="h-4 w-4" /> {t.logout}
          </button>
          <button onClick={() => setLocale(locale === 'id' ? 'en' : 'id')} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs">
            <Languages className="h-3 w-3" /> {locale === 'id' ? 'ID → EN' : 'EN → ID'}
          </button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div>
            <h1 className="text-lg font-semibold capitalize">{t[tabs.find(x => x.id === activeTab)?.labelKey || 'dashboard']}</h1>
            <p className="text-xs text-muted-foreground">{t.welcome}, {user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground lg:inline">{t.demo}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm lg:hidden"><LogOut className="h-4 w-4" /></button>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/30 p-4 lg:p-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">{t[tabs.find(x => x.id === activeTab)?.labelKey || 'dashboard']}</h2>
              <p className="mb-4 text-sm text-muted-foreground">Buka tab lengkap di navigasi. Langsung menuju halaman detail untuk fitur penuh.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => handleTabChange(tab.id)} className="flex items-center gap-3 rounded-xl border p-4 text-left hover:bg-accent">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white"><Icon className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-medium">{t[tab.labelKey]}</p>
                        <p className="text-xs text-muted-foreground">Buka {t[tab.labelKey]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button onClick={() => handleTabChange('dashboard')} className="btn btn-primary">Ke Dashboard</button>
                <button onClick={() => handleTabChange('storefront')} className="btn btn-outline">Lihat Toko Online</button>
              </div>
            </div>
            {/* Mobile tab bar */}
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-card p-2 lg:hidden">
              {tabs.slice(0, 5).map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1 rounded-lg px-3 py-1 ${activeTab === tab.id ? 'text-violet-600' : 'text-muted-foreground'}`}>
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px]">{t[tab.labelKey]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
