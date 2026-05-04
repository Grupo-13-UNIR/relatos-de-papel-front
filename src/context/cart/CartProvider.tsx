import { useState, type ReactNode } from 'react';
import { CartContext } from '@/context/cart/CartContext.tsx';
import type { Book } from '@/types/book.ts';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<string, { book: Book; quantity: number }>>({});

  const onChangeCartQuantity = (book: Book, quantity: number) => {
    setCart((prevState) => ({ ...prevState, [book.id]: { book, quantity } }));
  };

  return (
    <CartContext.Provider value={{ cart, onChangeCartQuantity }}>{children}</CartContext.Provider>
  );
};
