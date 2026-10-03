export interface User {
  id: string;
  email: string;
  name: string;
  storeName?: string;
  role: 'admin' | 'staff';
  locale: 'en' | 'id';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'transfer' | 'ewallet';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  date: Date;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: 'order' | 'adjustment';
}

export interface Storefront {
  slug: string;
  storeName: string;
  description: string;
  logo?: string;
  banner?: string;
  primaryColor: string;
  isPublic: boolean;
  products: Product[];
  createdAt: Date;
}

export interface AdEvent {
  id: string;
  type: 'page_view' | 'view_content' | 'add_to_cart' | 'purchase';
  source: 'meta' | 'google';
  payload: Record<string, unknown>;
  createdAt: Date;
}

export interface LocaleMessages {
  [key: string]: Record<string, string>;
}
