import { useCart } from '@/context/cart/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { useMemo } from 'react';

const Cart = () => {
  const { cart, updateCart } = useCart();
  const navigate = useNavigate();

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="w-full px-8 py-10">
      <h1 className="text-4xl font-bold mb-10">Tu Carrito</h1>

      <div className="flex gap-16 items-start">
        <div className="flex-1 flex flex-col">
          {cartItems.map(({ quantity, book }) => (
            <div
              key={book.id}
              className="flex items-center justify-between border-b border-gray-300 py-8"
            >
              <div className="flex items-center gap-6">
                <img src={book.image} alt={book.title} className="w-24 h-24 object-cover border" />

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{book.title}</h3>

                  <p className="text-gray-600">{book.price.toFixed(2)}€</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" onClick={() => updateCart(book, quantity - 1)}>
                      -
                    </Button>

                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === '') return;

                        updateCart(book, Number(value));
                      }}
                      className="w-16 text-center"
                    />

                    <Button variant="outline" onClick={() => updateCart(book, quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <p className="text-xl font-semibold">{(book.price * quantity).toFixed(2)}€</p>

                <Button variant="destructive" onClick={() => updateCart(book, 0)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[320px] border border-gray-300 p-8 flex flex-col gap-8 sticky top-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Total:</h2>

            <p className="text-2xl">{total.toFixed(2)}€</p>
          </div>

          {cartItems.length > 0 && (
            <Button className="w-full py-6 text-lg" onClick={() => navigate('/checkout')}>
              Comprar ahora
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
