import type { CartItem } from "@/types/cartItem";

interface Props {
  items: CartItem[];
}

export const OrderSummary = ({ items }: Props) => {
  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1.5rem",
        borderRadius: 8,
      }}
    >
      <h2>Resumen del pedido</h2>

      {items.map(item => (
        <div key={item.id}>
          <p>{item.nombre}</p>
          <p>
            {item.cantidad} x {item.precio}€
          </p>
        </div>
      ))}

      <hr />

      <p>Envío: 0€</p>

      <h3>Total: {total.toFixed(2)}€</h3>
    </div>
  );
};