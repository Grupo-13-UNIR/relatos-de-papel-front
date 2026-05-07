import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { useCatalogue } from '@/context/catalogue/CatalogueContext.tsx';

export const CatalogueFooter = () => {
  const { totalCount, pageable, setPageable } = useCatalogue();
  const totalPages = Math.max(1, Math.ceil(totalCount / pageable.pageSize));
  const canGoPrev = pageable.page > 1;
  const canGoNext = pageable.page < totalPages;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === pageable.page) return;
    setPageable({ ...pageable, page });
  };

  return (
    <footer className="flex mt-3 border p-2">
      <div className="min-w-16 text-sm text-muted-foreground content-center">
        Total de elementos: <span className="font-medium text-foreground">{totalCount}</span>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (canGoPrev) goToPage(pageable.page - 1);
              }}
              className={!canGoPrev ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive onClick={(e) => e.preventDefault()}>
              {pageable.page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (canGoNext) goToPage(pageable.page + 1);
              }}
              className={!canGoNext ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </footer>
  );
};
