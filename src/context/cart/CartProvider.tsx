import { useState, type ReactNode } from "react";
import { CartContext } from "@/context/cart/CartContext";
import type { CartItem } from "@/types/cartItem";
import mockCart from "@/mock/cartItem-mock";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    mockCart.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad ?? 1,
      imagen: item.imagen,
    }))
  );

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

  const increaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
        )
        .filter(i => i.cantidad > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};