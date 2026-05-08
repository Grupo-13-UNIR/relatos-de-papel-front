import { createContext, useContext } from 'react';
import type { BookShortened } from '@/types/book.ts';
import type { BookFilters } from '@/types/catalogue.ts';
import type { Pageable } from '@/types/pagination.ts';

interface CatalogueContextType {
  books: BookShortened[];
  loading: boolean;
  error: Error | null;
  filters: BookFilters;
  setFilters: (filters: BookFilters) => void;
  pageable: Pageable;
  setPageable: (pageable: Pageable) => void;
  totalCount: number;
}

export const CatalogueContext = createContext<CatalogueContextType | null>(null);

export const useCatalogue = () => {
  const context = useContext(CatalogueContext);
  if (!context) {
    throw new Error('useCatalogue must be used inside CatalogueProvider');
  }
  return context;
};
