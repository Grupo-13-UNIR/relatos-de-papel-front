import type { BookFilters } from '@/types/catalogue.ts';
import bookMock from '@/mock/book-mock.ts';
import type { Page } from '@/types/pagination.ts';
import type { Book, BookShortened } from '@/types/book.ts';

export const bookService = {
  search: async (
    filters: BookFilters,
    pageSize: number = 10,
    page: number = 1
  ): Promise<Page<BookShortened>> => {
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
  getBook: async (bookId: number): Promise<Book> => {
    const book = bookMock.find((book) => book.id === bookId);
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    return Promise.resolve(book);
  },
};
