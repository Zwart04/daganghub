'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product, Order, Customer, JournalEntry, Storefront, User } from '@/types';
import { getDb, resetDb } from '@/lib/db';

interface DataContextType {
  users: User[];
  products: Product[];
  orders: Order[];
  customers: Customer[];
  journalEntries: JournalEntry[];
  storefronts: Storefront[];
  storefront: Storefront | null;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addUser: (user: User) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateStorefront: (data: Partial<Storefront>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState(getDb());

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem('rosari-commerce.data.v1'); if (saved) { const value = JSON.parse(saved, (_key, val) => typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val) ? new Date(val) : val); if (['users','products','orders','customers','journalEntries','storefronts'].every(k => Array.isArray(value[k]))) setDb(value); } } catch { /* retain the existing seed if storage is unavailable */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem('rosari-commerce.data.v1', JSON.stringify(db)); }, [db, loaded]);
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

  const updateCustomer = useCallback((id: string, data: Partial<Customer>) => setDb(prev => ({ ...prev, customers: prev.customers.map(c => c.id === id ? { ...c, ...data } : c) })), []);
  const deleteCustomer = useCallback((id: string) => setDb(prev => ({ ...prev, customers: prev.customers.filter(c => c.id !== id) })), []);
  const addCustomer = useCallback((customer: Customer) => {
    setDb(prev => ({ ...prev, customers: [...prev.customers, customer] }));
  }, []);

  const addUser = useCallback((user: User) => {
    setDb(prev => ({ ...prev, users: [...prev.users, user] }));
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
      users: db.users,
      products: db.products,
      orders: db.orders,
      customers: db.customers,
      journalEntries: db.journalEntries,
      storefronts: db.storefronts,
      storefront,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      addCustomer, updateCustomer, deleteCustomer,
      addUser,
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
