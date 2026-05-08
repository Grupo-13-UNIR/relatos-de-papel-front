import type { BookShortened } from '@/types/book';

interface Props {
  cart: Record<string, { book: BookShortened; quantity: number }>;
}

export const OrderSummary = ({ cart }: Props) => {
  const total = Object.values(cart).reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1.5rem',
        borderRadius: 8,
      }}
    >
      <h2>Resumen del pedido</h2>

      {Object.values(cart).map((item) => (
        <div key={item.book.id}>
          <p>{item.book.title}</p>
          <p>
            {item.quantity} x {item.book.price.toFixed(2)}€
          </p>
        </div>
      ))}

      <hr />

      <p>Envío: 0€</p>

      <h3>Total: {total.toFixed(2)}€</h3>
    </div>
  );
};
