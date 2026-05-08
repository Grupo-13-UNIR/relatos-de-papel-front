import { BookSummary } from '@/views/Catalogue/book-summary.tsx';
import { useCatalogue } from '@/context/catalogue/CatalogueContext.tsx';
import { useNavigate } from 'react-router';
import type { BookShortened } from '@/types/book.ts';

export const CatalogueContent = () => {
  const { books, error } = useCatalogue();
  const navigate = useNavigate();

  const onClickBook = (book: BookShortened) => {
    navigate('/books/' + book.id);
  };

  return (
    <div className="flex min-h-0 flex-1 overflow-y-auto pr-1">
      {books.length ? (
        <div className="flex w-full flex-wrap content-start gap-4 p-1">
          {books.map((book) => (
            <div key={book.id} className="w-72">
              <BookSummary
                book={book}
                onClick={onClickBook}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full min-h-60 w-full flex-col items-center justify-center gap-3">
          <span className="text-lg">No se encontraron libros</span>
          {error && <span className="text-red-500">{error.message}</span>}
        </div>
      )}
    </div>
  );
};
