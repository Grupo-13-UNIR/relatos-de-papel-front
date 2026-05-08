import Features from '@/components/features';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <section className="home-page relative overflow-hidden border-b border-border h-[95vh] flex align-center">
        <div className="container mx-auto px-4 py-20 md:py-32 flex align-center justify-center">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center mr-30">
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
                Tu librería digital de confianza
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Descubre miles de libros físicos y digitales. Compra desde cualquier lugar y recibe
                tus lecturas favoritas al instante.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Link to="/books">Explorar Catálogo</Link>
                </Button>
                {/* ToDo: hide if already logged in  */}
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Iniciar Sesión
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center ml-1 min-y-2xl ">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-primary/50 rounded-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-linear-to-br from-secondary to-muted rounded-2xl transform -rotate-3"></div>
                <div className="relative bg-card rounded-2xl p-8 shadow-2xl">
                  <BookOpen className="size-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
    </>
  );
}
