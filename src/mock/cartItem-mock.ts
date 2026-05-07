import type { CartItem } from "@/types/cartItem";

const mockCart: CartItem[] = [
  {
    id: "1",
    nombre: "Libro React Básico",
    precio: 19.99,
    cantidad: 1,
    imagen: "",
  },
  {
    id: "2",
    nombre: "Guía TypeScript Avanzado",
    precio: 29.99,
    imagen: "",
    cantidad: 1,
  },
  {
    id: "3",
    nombre: "JavaScript Moderno ES2025",
    precio: 24.99,
    imagen: "",
    cantidad: 1,
  },
];

export default mockCart;
