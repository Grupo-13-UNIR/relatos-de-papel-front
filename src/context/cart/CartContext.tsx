import { createContext, useContext } from 'react';
import type { CartItem } from "@/types/cartItem";
import type { BookShortened } from '@/types/book.ts';

interface CartContextType {
  items: CartItem[];
  cart: Record<string, { book: BookShortened; quantity: number }>;
  updateCart: (book: BookShortened, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
