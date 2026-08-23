'use client';

import { useData } from '@/contexts/DataContext';
import { useI18n } from '@/contexts/I18nContext';
import { ShoppingCart, Phone, Store as StoreIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function PublicStorefront() {
  const params = useParams();
  const slug = params.slug as string;
  const { storefronts } = useData();
  const { t, locale } = useI18n();
  const store = storefronts.find(s => s.slug === slug);
  const [cart, setCart] = useState<string[]>([]);

  if (!store) return <div className="min-h-screen flex items-center justify-center"><p>Store not found</p></div>;

  const products = store.products || [];
  const addToCart = (id: string) => setCart([...cart, id]);
  const checkout = () => {
    const items = cart.map(id => products.find(p => p.id === id)?.name).filter(Boolean).join(', ');
    if (typeof window !== 'undefined') window.open(`https://wa.me/?text=${encodeURIComponent('Hello, I want to order: ' + items)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b" style={{ borderColor: store.primaryColor + '40' }}>
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center gap-3">
            <StoreIcon className="h-8 w-8" style={{ color: store.primaryColor }} />
            <div>
              <h1 className="text-2xl font-bold">{store.storeName}</h1>
              <p className="text-sm text-muted-foreground">{store.description}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter(p => p.isActive).map(p => (
            <div key={p.id} className="card overflow-hidden">
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Rp {p.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(p.id)} className="btn btn-primary btn-sm"><ShoppingCart className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <button onClick={checkout} className="btn btn-primary btn-lg shadow-lg"><Phone className="h-4 w-4" />Checkout ({cart.length})</button>
          </div>
        )}
      </main>
    </div>
  );
}
