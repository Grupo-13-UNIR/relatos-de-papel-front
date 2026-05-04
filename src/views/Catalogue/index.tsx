import { CatalogueFilters } from '@/views/Catalogue/catalogue-filters.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useState } from 'react';
import type { Pageable } from '@/types/pagination.ts';
import { bookService } from '@/services/book-service.ts';
import type { BookFilters } from '@/types/catalogue.ts';
import type { Book } from '@/types/book.ts';
import { BookSummary } from '@/views/Catalogue/book-summary.tsx';
import { useCart } from '@/context/cart/CartContext.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';

export default function Catalogue() {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<BookFilters>({});
  const [pagination, setPagination] = useState<Pageable>({ page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cart, onChangeCartQuantity } = useCart();

  const onSearch = async (nextFilters: BookFilters) => {
    setFilters(nextFilters);
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

  const onAddToCart = (book: Book) => {
    onChangeCartQuantity(book, 1);
  };

  const onRemoveFromCart = (book: Book) => {
    onChangeCartQuantity(book, 0);
  };

  const totalPages = Math.max(1, Math.ceil(total / pagination.pageSize));
  const canGoPrev = pagination.page > 1;
  const canGoNext = pagination.page < totalPages;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === pagination.page) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="h-[calc(100vh-5rem)] p-6">
      <div className="flex h-full gap-4 overflow-hidden">
        <Card className="w-full max-w-sm shrink-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <CatalogueFilters onSearch={onSearch} loading={loading} />
          </CardContent>
        </Card>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 overflow-y-auto pr-1">
            {books.length ? (
              <div className="flex w-full flex-wrap content-start gap-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="w-full sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.667rem)]"
                  >
                    <BookSummary
                      book={book}
                      cartQuantity={cart[book.id]?.quantity ?? 0}
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

          <footer className="mt-3 border-t pt-3">
            <div className="mb-2 text-sm text-muted-foreground">
              Total de elementos: <span className="font-medium text-foreground">{total}</span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (canGoPrev) goToPage(pagination.page - 1);
                    }}
                    className={!canGoPrev ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                    {pagination.page}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (canGoNext) goToPage(pagination.page + 1);
                    }}
                    className={!canGoNext ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </footer>
        </div>
      </div>
    </div>
  );
}
