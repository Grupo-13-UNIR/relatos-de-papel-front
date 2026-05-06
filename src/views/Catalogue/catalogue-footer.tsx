import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import type { Pageable } from '@/types/pagination.ts';
import type { Dispatch, SetStateAction } from 'react';

interface CatalogueFooterProps {
  total: number;
  pagination: Pageable;
  setPagination: Dispatch<SetStateAction<Pageable>>;
}

export const CatalogueFooter = ({ total, pagination, setPagination }: CatalogueFooterProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pagination.pageSize));
  const canGoPrev = pagination.page > 1;
  const canGoNext = pagination.page < totalPages;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === pagination.page) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <footer className="flex mt-3 border p-2">
      <div className="min-w-16 text-sm text-muted-foreground content-center">
        Total de elementos: <span className="font-medium text-foreground">{total}</span>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (canGoPrev) goToPage(pagination.page - 1);
              }}
              className={!canGoPrev ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive onClick={(e) => e.preventDefault()}>
              {pagination.page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
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
  );
};
