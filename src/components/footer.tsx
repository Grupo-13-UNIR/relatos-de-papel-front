import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="size-6" />
              <span className="font-semibold text-lg">Relatos de Papel</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Tu librería digital de confianza. Miles de libros físicos y digitales al alcance de un
              clic.
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

          {/* Categorías | ToDo: acceso directo a busqueda filtrada por categorías   */}
          <div>
            <h3 className="font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Ficción
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  No Ficción
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Misterio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Romance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Ciencia Ficción
                </a>
              </li>
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

          {/* Newsletter desabilitada*/}
          {/* <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Suscríbete para recibir novedades, ofertas exclusivas y recomendaciones
              personalizadas.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu email"
                className="flex-1"
              />
              <Button>Suscribir</Button>
            </div>
          </div> */}
        </div>

        <Separator className="mb-8" />

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
