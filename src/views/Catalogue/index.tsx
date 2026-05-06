import { CatalogueFilters } from '@/views/Catalogue/catalogue-filters.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useEffect, useState } from 'react';
import type { Pageable } from '@/types/pagination.ts';
import { bookService } from '@/services/book-service.ts';
import type { BookFilters } from '@/types/catalogue.ts';
import type { BookShortened } from '@/types/book.ts';
import { BookSummary } from '@/views/Catalogue/book-summary.tsx';
import { useCart } from '@/context/cart/CartContext.tsx';
import { CatalogueFooter } from '@/views/Catalogue/catalogue-footer.tsx';
import { useNavigate } from 'react-router';

export default function Catalogue() {
  const [books, setBooks] = useState<BookShortened[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<BookFilters>({});
  const [pagination, setPagination] = useState<Pageable>({ page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cart, updateCart } = useCart();
  const navigate = useNavigate();

  const onSearch = async (nextFilters?: BookFilters) => {
    if (nextFilters) setFilters(nextFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setLoading(true);
    setError(null);
    try {
      const result = await bookService.search(filters, pagination.pageSize, pagination.page);
      setBooks(result.content);
      setTotal(result.total);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const firstSearch = async () => onSearch();
    firstSearch();
  }, []);

  const onAddToCart = (book: BookShortened) => {
    updateCart(book, 1);
  };

  const onRemoveFromCart = (book: BookShortened) => {
    updateCart(book, 0);
  };

  const onClickBook = (book: BookShortened) => {
    navigate('/books/' + book.id);
  };

  return (
    <div className="h-[calc(100vh-5rem)] p-4">
      <div className="flex h-full p-2 gap-4 overflow-hidden">
        <Card className="w-full max-w-sm shrink-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <CatalogueFilters onSearch={onSearch} loading={loading} />
          </CardContent>
        </Card>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 overflow-y-auto pr-1">
            {books.length ? (
              <div className="flex w-full flex-wrap content-start gap-4 p-1">
                {books.map((book) => (
                  <div key={book.id} className="w-72">
                    <BookSummary
                      book={book}
                      cartQuantity={cart[book.id]?.quantity ?? 0}
                      onClick={onClickBook}
                      onAddToCart={onAddToCart}
                      onRemoveFromCart={onRemoveFromCart}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-60 w-full flex-col items-center justify-center gap-3">
                <span className="text-lg">No se encontraron libros</span>
                {error && <span className="text-red-500">{error}</span>}
              </div>
            )}
          </div>
          <CatalogueFooter total={total} pagination={pagination} setPagination={setPagination} />
        </div>
      </div>
    </div>
  );
}
