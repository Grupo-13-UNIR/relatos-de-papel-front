import { BookCategory } from '@/types/book.ts';

export interface BookFilters {
  title?: string;
  author?: string;
  category?: BookCategory;
  priceLowerThan?: number;
  priceGreaterThan?: number;
}