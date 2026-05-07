import { useCart } from "@/context/cart/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.nombre}</h3>
          <p>{item.precio}€</p>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            
            <Button
              onClick={() =>
                updateQuantity(item.id, item.cantidad - 1)
              }
            >
              -
            </Button>

            <input
              type="number"
              min={1}
              value={item.cantidad}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") return;
                updateQuantity(item.id, Number(value));
              }}
              style={{ width: 60, textAlign: "center" }}
            />

            <Button
              onClick={() =>
                updateQuantity(item.id, item.cantidad + 1)
              }
            >
              +
            </Button>
          </div>

          <Button
            variant="destructive"
            onClick={() => removeItem(item.id)}
          >
            Eliminar
          </Button>
        </div>
      ))}

      <h2>Total: {total.toFixed(2)}€</h2>

      {items.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <Button onClick={() => navigate("/checkout")}>
            Comprar ahora
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;