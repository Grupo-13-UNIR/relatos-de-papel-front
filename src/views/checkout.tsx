import { CheckoutForm } from '@/components/checkout/checkout-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { useCart } from '@/context/cart/CartContext';

const Checkout = () => {
  const { cart } = useCart();

  if (Object.keys(cart).length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-8">
      <CheckoutForm />

      <OrderSummary cart={cart} />
    </div>
  );
};

export default Checkout;
