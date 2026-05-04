import { useState, type ReactNode } from "react";
import { CartContext } from "@/context/cart/CartContext";
import type { CartItem } from "@/types/cartItem";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);

      if (exists) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};