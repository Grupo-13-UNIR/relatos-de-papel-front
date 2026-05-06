import type { User } from '@/types/user';
import type { Book } from '@/types/book';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: Book['id'];
  title: Book['title'];
  price: Book['price'];
  quantity: number;
}

export interface Address {
  name: string;
  line1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: User['id'];
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: Address;
}
