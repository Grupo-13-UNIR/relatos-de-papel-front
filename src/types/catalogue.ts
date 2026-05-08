import { BookCategory } from '@/types/book.ts';

export interface BookFilters {
  title?: string;
  author?: string;
  category?: BookCategory;
  priceMin?: number;
  priceMax?: number;
}
