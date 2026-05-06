import { useState, type ReactNode, useEffect } from 'react';
import { CartContext } from '@/context/cart/CartContext.tsx';
import type { BookShortened } from '@/types/book.ts';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<string, { book: BookShortened; quantity: number }>>(
    JSON.parse(localStorage.getItem('cart') ?? '{}') as Record<
      string,
      { book: BookShortened; quantity: number }
    >
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateCart = (book: BookShortened, quantity: number) => {
    setCart((prevState) => {
      if (quantity <= 0) {
        delete prevState[book.id];
        return { ...prevState };
      }
      return { ...prevState, [book.id]: { book, quantity } };
    });
  };

  return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
};
