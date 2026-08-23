'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, Order, Customer, JournalEntry, Storefront } from '@/types';
import { getDb, resetDb } from '@/lib/db';

interface DataContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  journalEntries: JournalEntry[];
  storefront: Storefront | null;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addCustomer: (customer: Customer) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateStorefront: (data: Partial<Storefront>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState(getDb());

  const refresh = useCallback(() => setDb(getDb()), []);

  const addProduct = useCallback((product: Product) => {
    setDb(prev => ({ ...prev, products: [...prev.products, product] }));
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setDb(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...data } : p),
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setDb(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id),
    }));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setDb(prev => ({ ...prev, orders: [...prev.orders, order] }));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setDb(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === id ? { ...o, status, updatedAt: new Date() } : o),
    }));
  }, []);

  const addCustomer = useCallback((customer: Customer) => {
    setDb(prev => ({ ...prev, customers: [...prev.customers, customer] }));
  }, []);

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    setDb(prev => ({ ...prev, journalEntries: [...prev.journalEntries, entry] }));
  }, []);

  const updateStorefront = useCallback((data: Partial<Storefront>) => {
    setDb(prev => ({
      ...prev,
      storefronts: prev.storefronts.map(s => s.slug === 'rosari' ? { ...s, ...data } : s),
    }));
  }, []);

  const storefront = db.storefronts[0] || null;

  return (
    <DataContext.Provider value={{
      products: db.products,
      orders: db.orders,
      customers: db.customers,
      journalEntries: db.journalEntries,
      storefront,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      addCustomer,
      addJournalEntry,
      updateStorefront,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
