import type { BookShortened } from '@/types/book.ts';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { useMemo } from 'react';

export interface BookSummaryProps {
  book: BookShortened;
  onClick?: (book: BookShortened) => void;
}

export const BookSummary = ({
  book,
  onClick,
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

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-semibold">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">{book.rating} / 5</span>
        </div>
      </CardContent>
    </Card>
  );
};
