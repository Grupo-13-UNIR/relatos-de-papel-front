import { createContext, useContext } from 'react';
import type { Book } from '@/types/book.ts';

interface CartContextType {
  cart: Record<string, { book: Book; quantity: number }>;
  onChangeCartQuantity: (book: Book, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: {},
  onChangeCartQuantity: (book, quantity) => {},
});

export const useCart = () => {
  return useContext(CartContext);
};
