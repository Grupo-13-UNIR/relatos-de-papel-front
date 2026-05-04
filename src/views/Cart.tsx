import { useState } from "react";
import { useCart } from "@/context/cart/CartContext";
import mockCart from "@/mock/cartItem-mock";

const Cart = () => {
  const { removeItem } = useCart();

  // 🔹 mock directamente en la vista
  const [items] = useState(() =>
    mockCart.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad ?? 1,
    }))
  );

  if (items.length === 0) return <p>Carrito vacío</p>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.nombre}</h3>
          <p>{item.precio}€</p>
          <p>Cantidad: {item.cantidad}</p>

          <button onClick={() => removeItem(item.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;