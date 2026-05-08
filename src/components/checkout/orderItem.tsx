import type { BookShortened } from "@/types/book";

interface Props {
  cart: Record<string, { book: BookShortened; quantity: number }>;
}
export const OrderItem = ({ cart }: Props) => {
  return (
    <>
      {Object.entries(cart).map(([key, { book, quantity }]) => (
        <div
          key={key}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
            }}
          />

          <div>
            <h4>{book.title}</h4>

            <p>
              {quantity} x {book.price}€
            </p>

            <p>
              Subtotal: {(book.price * quantity).toFixed(2)}€
            </p>
          </div>
        </div>
      ))}
    </>
  );
};