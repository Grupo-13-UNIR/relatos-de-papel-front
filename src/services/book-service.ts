import type { BookFilters } from '@/types/catalogue.ts';
import bookMock from '@/mock/book-mock.ts';
import type { Page } from '@/types/pagination.ts';
import type { Book } from '@/types/book.ts';

export const bookService = {
  search: async (
    filters: BookFilters,
    pageSize: number = 10,
    page: number = 1
  ): Promise<Page<Book>> => {
    const books = bookMock
      .filter((book) =>
        filters.title
          ? book.title.toLowerCase().includes(filters.title.toLowerCase())
          : filters.category
            ? book.category === filters.category
            : filters.priceLowerThan
              ? book.price < filters.priceLowerThan
              : filters.priceGreaterThan
                ? book.price > filters.priceGreaterThan
                : true
      )
      .slice((page - 1) * pageSize, page * pageSize);
    return Promise.resolve({ content: books, total: books.length, pageable: { page, pageSize } });
  },
};
