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

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
      return;
    }

    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, cantidad } : i
      )
    );
  };

  const clearCart = () => {
  setItems([]);
};

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
