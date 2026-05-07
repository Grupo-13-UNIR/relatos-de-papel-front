import { BookCategory } from '@/types/book.ts';

export const categoryLabels: Record<BookCategory, string> = {
  [BookCategory.ADVENTURE]: 'Aventura',
  [BookCategory.SCIENCE_FICTION]: 'Ciencia Ficción',
  [BookCategory.HORROR]: 'Terror',
  [BookCategory.THRILLER]: 'Suspense',
  [BookCategory.DRAMA]: 'Drama',
  [BookCategory.ROMANCE]: 'Romance',
  [BookCategory.FANTASY]: 'Fantasía',
};
