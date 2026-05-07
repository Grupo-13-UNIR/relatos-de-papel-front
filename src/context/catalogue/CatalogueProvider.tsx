import { useState, type ReactNode, useEffect } from 'react';
import { BookCategory, type BookShortened } from '@/types/book.ts';
import type { BookFilters } from '@/types/catalogue.ts';
import type { Pageable } from '@/types/pagination.ts';
import { useSearchParams } from 'react-router';
import { bookService } from '@/services/book-service.ts';
import { CatalogueContext } from '@/context/catalogue/CatalogueContext.tsx';

export const CatalogueProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookShortened[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<BookFilters>({});
  const [pageable, setPageable] = useState<Pageable>({ page: 1, pageSize: 10 });
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = async (bookFilters: BookFilters, newPageable: Pageable) => {
    setLoading(true);
    try {
      const result = await bookService.search(bookFilters, newPageable.pageSize, newPageable.page);
      setBooks(result.content);
      setTotalCount(result.total);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtersFromParams: BookFilters = {};
    filtersFromParams.title = searchParams.get('title') || undefined;
    filtersFromParams.author = searchParams.get('author') || undefined;
    filtersFromParams.category = searchParams.get('category') as BookCategory | undefined;
    filtersFromParams.priceLowerThan = Number(searchParams.get('priceLowerThan'));
    filtersFromParams.priceGreaterThan = Number(searchParams.get('priceGreaterThan'));
    const page = Number(searchParams.get('page') ?? 1);
    const pageSize = Number(searchParams.get('pageSize') ?? 10);
    setFilters(filtersFromParams);
    setPageable({ page, pageSize });
    search(filtersFromParams, { page, pageSize });
  }, [searchParams]);

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (filters.title) params.set('title', filters.title);
    if (filters.author) params.set('author', filters.author);
    if (filters.category) params.set('category', filters.category);
    if (filters.priceLowerThan) params.set('priceLowerThan', String(filters.priceLowerThan));
    if (filters.priceGreaterThan) params.set('priceGreaterThan', String(filters.priceGreaterThan));

    params.set('page', String(pageable.page));
    params.set('pageSize', String(pageable.pageSize));

    setSearchParams(params);
  };

  useEffect(() => {
    updateSearchParams();
  }, [filters, pageable]);

  return (
    <CatalogueContext.Provider
      value={{
        books,
        loading,
        filters,
        error,
        setFilters,
        pageable,
        setPageable,
        totalCount,
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};
