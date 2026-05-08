import { useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import { bookService } from '@/services/book-service.ts';
import NotFound from '@/views/NotFound.tsx';
import { useCart } from '@/context/cart/CartContext.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { categoryLabels } from '@/translations/category.ts';
import Loader from '@/components/loader.tsx';
import useQuery from '@/hooks/useQuery.tsx';

const BookDetailEntry = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <p>{value ?? 'No Disponible'}</p>
  </div>
);

export const BookDetail = () => {
  const { id } = useParams();
  const { cart, updateCart } = useCart();
  const {
    result: book,
    loading,
    execute,
  } = useQuery(() => bookService.getBook(Number(id)), {
    toastConfiguration: { showError: true },
  });

  useEffect(() => {
    execute();
  }, [id]);

  const quantityInCart = useMemo(() => {
    if (!book) return 0;
    const item = cart[book.id];
    return item?.quantity ?? 0;
  }, [cart, book]);

  const formattedDate = useMemo(() => {
    if (!book) return '';
    const date = new Date(book.releaseDate);
    return Number.isNaN(date.getTime()) ? '-' : new Intl.DateTimeFormat('es-ES').format(date);
  }, [book]);

  const formattedPrice = useMemo(() => {
    if (!book) return '';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(book.price);
  }, [book]);

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <Loader description="Cargando..." />
      </div>
    );
  }

  if (!book) {
    return <NotFound />;
  }

  return (
    <section className="mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <div className="flex flex-row">
          <div className="p-4 w-72 shrink-0">
            <img
              src={book.image}
              alt={`Portada de ${book.title}`}
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="flex-1 p-4 md:p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">ID: {book.id}</p>
            </CardHeader>

            <CardContent className="space-y-4 p-0">
              <div className="grid gap-3 grid-cols-2">
                <BookDetailEntry label="Autor" value={book.author} />
                <BookDetailEntry label="Categoría" value={categoryLabels[book.category]} />
                <BookDetailEntry label="Fecha lanzamiento" value={formattedDate} />
                <BookDetailEntry label="Valoración" value={book.rating + '/5'} />
                <BookDetailEntry label="Stock" value={book.stock} />
                <BookDetailEntry label="Precio" value={formattedPrice} />
              </div>

              <div>
                <BookDetailEntry label="Resume" value={book.summary} />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  onClick={() => updateCart(book, quantityInCart + 1)}
                  disabled={quantityInCart >= book.stock}
                >
                  Añadir al carrito
                </Button>

                <Button
                  variant="outline"
                  onClick={() => updateCart(book, quantityInCart - 1)}
                  disabled={quantityInCart <= 0}
                >
                  Quitar
                </Button>

                <span className="text-sm text-muted-foreground">En carrito: {quantityInCart}</span>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
};
