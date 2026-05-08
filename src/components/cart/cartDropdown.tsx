import { useCart } from "@/context/cart/CartContext";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const CartDropdown = () => {
  const { items } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        width: 320,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h4>Carrito</h4>

      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    {item.nombre}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#666",
                    }}
                  >
                    x{item.cantidad}
                  </p>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                  }}
                >
                  {(item.precio * item.cantidad).toFixed(2)}€
                </p>
              </div>
            ))}
          </div>

          <hr style={{ margin: "1rem 0" }} />

          <h4>Total: {total.toFixed(2)}€</h4>

          <Link to="/cart">
            <Button
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "0.75rem",
                cursor: "pointer",
              }}
            >
              Ir al carrito
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};