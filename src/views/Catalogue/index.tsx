import { CatalogueFilters } from '@/views/Catalogue/catalogue-filters.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { CatalogueFooter } from '@/views/Catalogue/catalogue-footer.tsx';
import { CatalogueProvider } from '@/context/catalogue/CatalogueProvider.tsx';
import { CatalogueContent } from '@/views/Catalogue/catalogue-content.tsx';

export default function Catalogue() {
  return (
    <CatalogueProvider>
      <div className="h-[calc(100vh-6rem)] p-4">
        <div className="flex h-full p-2 gap-4 overflow-hidden">
          <Card className="w-full max-w-sm shrink-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <CatalogueFilters />
            </CardContent>
          </Card>
          <div className="flex min-h-0 flex-1 flex-col">
            <CatalogueContent />
            <CatalogueFooter />
          </div>
        </div>
      </div>
    </CatalogueProvider>
  );
}
