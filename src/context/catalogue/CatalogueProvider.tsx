import { useState, type ReactNode, useEffect } from 'react';
import { BookCategory } from '@/types/book.ts';
import type { BookFilters } from '@/types/catalogue.ts';
import type { Pageable } from '@/types/pagination.ts';
import { useSearchParams } from 'react-router';
import { bookService } from '@/services/book-service.ts';
import { CatalogueContext } from '@/context/catalogue/CatalogueContext.tsx';
import useQuery from '@/hooks/useQuery.tsx';

export const CatalogueProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<BookFilters>({});
  const [pageable, setPageable] = useState<Pageable>({ page: 1, pageSize: 10 });
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = async (bookFilters: BookFilters, newPageable: Pageable) => {
    const result = await bookService.search(bookFilters, newPageable.pageSize, newPageable.page);
    setTotalCount(result.total);
    return result.content;
  };

  const {
    result: books,
    loading,
    error,
    execute,
  } = useQuery(() => search(filters, pageable), {
    toastConfiguration: { showError: true },
  });

  useEffect(() => {
    const filtersFromParams: BookFilters = {};
    filtersFromParams.title = searchParams.get('title') || undefined;
    filtersFromParams.author = searchParams.get('author') || undefined;
    filtersFromParams.category = searchParams.get('category') as BookCategory | undefined;
    filtersFromParams.priceMin = searchParams.has('priceMin')
      ? Number(searchParams.get('priceMin'))
      : undefined;
    filtersFromParams.priceMax = searchParams.has('priceMax')
      ? Number(searchParams.get('priceMax'))
      : undefined;
    const page = Number(searchParams.get('page') ?? 1);
    const pageSize = Number(searchParams.get('pageSize') ?? 10);
    setFilters(filtersFromParams);
    setPageable({ page, pageSize });
    execute();
  }, [searchParams]);

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (filters.title) params.set('title', filters.title);
    if (filters.author) params.set('author', filters.author);
    if (filters.category) params.set('category', filters.category);
    if (filters.priceMin) params.set('priceMin', String(filters.priceMin));
    if (filters.priceMax) params.set('priceMax', String(filters.priceMax));

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
        books: books ?? [],
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
