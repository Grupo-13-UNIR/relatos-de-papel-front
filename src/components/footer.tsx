import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BookCategory } from '@/types/book.ts';
import { Link } from 'react-router';
import { categoryLabels } from '@/translations/category.ts';
import { cn } from '@/lib/utils.ts';

interface FooterProps {
  fullFooter?: boolean;
}

export default function Footer({ fullFooter }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className={cn('container mx-auto p-0', { 'py-16 px-4': fullFooter })}>
        {fullFooter && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="size-6" />
                <span className="font-semibold text-lg">Relatos de Papel</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Tu librería digital de confianza. Miles de libros físicos y digitales al alcance de
                un clic.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  <span>info@relatosdepapel.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <span>+34 900 123 456</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>Madrid, España</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categorías</h3>
              <ul className="space-y-2 text-muted-foreground">
                {Object.values(BookCategory).map((category) => (
                  <li>
                    <Link
                      to={'/books?category=' + category}
                      className="hover:text-foreground transition-colors"
                    >
                      {categoryLabels[category]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda | ToDo: acceso directo a páginas de ayuda*/}
            <div>
              <h3 className="font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Estado de pedido
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Métodos de pago
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <Separator className={cn({ 'mb-8': fullFooter })} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Relatos de Papel. Todos los derechos reservados.</p>
          {/* ToDo: acceso directo a páginas de ayuda y configuraciones */}
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
