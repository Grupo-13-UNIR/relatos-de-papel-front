import { useCart } from "@/context/cart/CartContext";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const CartDropdown = () => {
  const { cart } = useCart();

  const total = Object.values(cart).reduce(
    (acc, { book, quantity }) => acc + book.price * quantity,
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

      {Object.values(cart).length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
              maxHeight: 300,
              overflowY: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {Object.values(cart).map(({ book, quantity }) => (
              <div
                key={book.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book.title}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#666",
                    }}
                  >
                    x{quantity}
                  </p>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {(book.price * quantity).toFixed(2)}€
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