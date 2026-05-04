import type { Book } from '@/types/book.ts';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ShoppingCart, Trash } from 'lucide-react';

export interface BookSummaryProps {
  book: Book;
  cartQuantity: number;
  onAddToCart?: (book: Book) => void;
  onRemoveFromCart?: (book: Book) => void;
}

export const BookSummary = ({
  book,
  cartQuantity,
  onRemoveFromCart,
  onAddToCart,
}: BookSummaryProps) => {
  return (
    <Card className="flex h-full min-h-[420px] flex-col overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={book.image}
          alt={book.title}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold">${book.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">{book.rating} / 5</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
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
