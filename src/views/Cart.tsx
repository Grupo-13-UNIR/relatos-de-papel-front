import { useCart } from "@/context/cart/CartContext";
import { useNavigate } from "react-router";

const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) return <p>Carrito vacío</p>;

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Tu Carrito</h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        
        <div style={{ flex: 2 }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "#ddd",
                  marginRight: "1rem",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.nombre}</h3>
                <p>{item.precio}€</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginLeft: "1rem",
                  color: "red",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "2rem",
            height: "fit-content",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Total:</h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {total.toFixed(2)}€
          </p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/checkout")} 
          style={{
            padding: "0.75rem 1.5rem",
            background: "#ddd",
            border: "1px solid #999",
            cursor: "pointer",
          }}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default Cart;