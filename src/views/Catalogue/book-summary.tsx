import type { BookShortened } from '@/types/book.ts';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ShoppingCart, Trash } from 'lucide-react';
import { useMemo } from 'react';

export interface BookSummaryProps {
  book: BookShortened;
  cartQuantity: number;
  onClick?: (book: BookShortened) => void;
  onAddToCart?: (book: BookShortened) => void;
  onRemoveFromCart?: (book: BookShortened) => void;
}

export const BookSummary = ({
  book,
  cartQuantity,
  onClick,
  onRemoveFromCart,
  onAddToCart,
}: BookSummaryProps) => {
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(book.price),
    [book]
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <CardHeader className="p-0" onClick={() => onClick?.(book)}>
        <img
          src={book.image}
          alt={book.title}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-4" onClick={() => onClick?.(book)}>
        <h3 className="line-clamp-2 text-base font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">{book.rating} / 5</span>
        </div>
      </CardContent>

      <CardFooter className="p-2">
        {!cartQuantity ? (
          <Button className="w-full" onClick={() => onAddToCart?.(book)}>
            <ShoppingCart className="mr-1" /> Anadir al carrito
          </Button>
        ) : (
          <Button variant="destructive" className="w-full" onClick={() => onRemoveFromCart?.(book)}>
            <Trash className="mr-1" /> Retirar del carrito
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
