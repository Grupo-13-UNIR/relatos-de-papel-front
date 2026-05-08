import { useCart } from "@/context/cart/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div>
      {cartItems.map(({ quantity, book }) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.price}€</p>

          <div className="flex items-center gap-2">
            <Button onClick={() => updateCart(book, quantity - 1)}>-</Button>

            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') return;
                updateCart(book, Number(value));
              }}
              className="w-15 text-center"
            />

            <Button onClick={() => updateCart(book, quantity + 1)}>+</Button>
          </div>

          <Button variant="destructive" onClick={() => updateCart(book, 0)}>
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
