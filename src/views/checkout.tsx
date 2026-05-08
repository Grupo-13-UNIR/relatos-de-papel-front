import { CheckoutForm } from '@/components/checkout/checkoutForm';
import { OrderSummary } from '@/components/checkout/orderSummary';
import { useCart } from '@/context/cart/CartContext';

const Checkout = () => {
  const { cart } = useCart();

  if (Object.keys(cart).length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <CheckoutForm />

      <OrderSummary cart={cart} />
    </div>
  );
};

export default Checkout;
