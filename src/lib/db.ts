import { Product, Order, Customer, JournalEntry, Storefront, User } from '@/types';

export interface Db {
  users: User[];
  products: Product[];
  orders: Order[];
  customers: Customer[];
  journalEntries: JournalEntry[];
  storefronts: Storefront[];
}

let db: Db = {
  users: [
    {
      id: 'admin-1',
      email: 'admin@rosari.id',
      name: 'Rosari Admin',
      storeName: 'Rosari Store',
      role: 'admin',
      locale: 'id',
      createdAt: new Date('2024-01-01'),
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Batik Premium',
      description: 'Handmade batik shirt with modern patterns',
      price: 250000,
      stock: 45,
      category: 'Clothing',
      isActive: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'prod-2',
      name: 'Kopi Arabica Toraja',
      description: 'Single origin Toraja coffee beans 500g',
      price: 85000,
      stock: 120,
      category: 'Food & Beverage',
      isActive: true,
      createdAt: new Date('2024-02-01'),
    },
  ],
  orders: [
    {
      id: 'ORD-001',
      customerId: 'cust-1',
      customerName: 'Andi Wijaya',
      items: [
        { productId: 'prod-1', productName: 'Batik Premium', quantity: 2, price: 250000 },
      ],
      total: 500000,
      status: 'delivered',
      paymentMethod: 'transfer',
      paymentStatus: 'paid',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-12'),
    },
    {
      id: 'ORD-002',
      customerId: 'cust-2',
      customerName: 'Siti Nurhaliza',
      items: [
        { productId: 'prod-2', productName: 'Kopi Arabica Toraja', quantity: 3, price: 85000 },
      ],
      total: 255000,
      status: 'processing',
      paymentMethod: 'ewallet',
      paymentStatus: 'paid',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-15'),
    },
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'Andi Wijaya',
      phone: '+6281234567890',
      email: 'andi@example.com',
      address: 'Jakarta Selatan',
      totalOrders: 5,
      totalSpent: 1250000,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 'cust-2',
      name: 'Siti Nurhaliza',
      phone: '+6289876543210',
      email: 'siti@example.com',
      address: 'Bandung',
      totalOrders: 3,
      totalSpent: 780000,
      createdAt: new Date('2024-02-10'),
    },
  ],
  journalEntries: [
    {
      id: 'je-1',
      date: new Date('2024-03-10'),
      type: 'income',
      category: 'Sales',
      amount: 500000,
      description: 'Payment for ORD-001',
      referenceId: 'ORD-001',
      referenceType: 'order',
    },
    {
      id: 'je-2',
      date: new Date('2024-03-15'),
      type: 'income',
      category: 'Sales',
      amount: 255000,
      description: 'Payment for ORD-002',
      referenceId: 'ORD-002',
      referenceType: 'order',
    },
    {
      id: 'je-3',
      date: new Date('2024-03-01'),
      type: 'expense',
      category: 'Operations',
      amount: 1500000,
      description: 'Monthly operational costs',
    },
  ],
  storefronts: [
    {
      slug: 'rosari',
      storeName: 'Rosari Store',
      description: 'Premium Indonesian crafts and coffee',
      primaryColor: '#4f46e5',
      isPublic: true,
      products: [],
      createdAt: new Date('2024-01-01'),
    },
  ],
};

export function getDb(): Db {
  return db;
}

export function resetDb() {
  db = {
    users: db.users,
    products: db.products,
    orders: db.orders,
    customers: db.customers,
    journalEntries: db.journalEntries,
    storefronts: db.storefronts,
  };
}
