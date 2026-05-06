import { createContext, useContext } from "react";
import type { CartItem } from "@/types/cartItem";

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
 updateQuantity: (id: string, cantidad: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};