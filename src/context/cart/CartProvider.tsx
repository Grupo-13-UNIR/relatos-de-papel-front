import { useState, useEffect, type ReactNode } from "react";
import { CartContext } from "@/context/cart/CartContext";
import type { CartItem } from "@/types/cartItem";
import mockCart from "@/mock/cartItem-mock";

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch {
        return [];
      }
    }

    return mockCart.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad ?? 1,
      imagen: item.imagen,
    }));
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

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