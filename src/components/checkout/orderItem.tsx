import type { CartItem } from "@/types/cartItem";

interface Props {
  item: CartItem;
}

export const OrderItem = ({ item }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <img
        src={item.imagen}
        alt={item.nombre}
        style={{
          width: 60,
          height: 60,
          objectFit: "cover",
        }}
      />

      <div>
        <h4>{item.nombre}</h4>

        <p>
          {item.cantidad} x {item.precio}€
        </p>

        <p>
          Subtotal: {(item.precio * item.cantidad).toFixed(2)}€
        </p>
      </div>
    </div>
  );
};