import type { BookFilters } from '@/types/catalogue.ts';
import bookMock from '@/mock/book-mock.ts';
import type { Page } from '@/types/pagination.ts';
import type { Book, BookShortened } from '@/types/book.ts';

const bookMatches = (book: Book, filters: BookFilters): boolean => {
  if (filters.title && !book.title.toLowerCase().includes(filters.title.toLowerCase())) {
    return false;
  }
  if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) {
    return false;
  }
  if (filters.category && book.category !== filters.category) {
    return false;
  }
  if (filters.priceMin !== undefined && book.price < filters.priceMin) {
    return false;
  }
  if (filters.priceMax !== undefined && book.price > filters.priceMax) {
    return false;
  }
  return true;
};

export const bookService = {
  search: async (
    filters: BookFilters,
    pageSize: number = 10,
    page: number = 1
  ): Promise<Page<BookShortened>> => {
    const booksFiltered = bookMock.filter((book) => bookMatches(book, filters));
    return Promise.resolve({
      content: booksFiltered.slice((page - 1) * pageSize, page * pageSize),
      total: booksFiltered.length,
      pageable: { page, pageSize },
    });
  },
  getBook: async (bookId: number): Promise<Book> => {
    const book = bookMock.find((book) => book.id === bookId);
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    return Promise.resolve(book);
  },
};
