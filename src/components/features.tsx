import {
    Search,
    ShoppingCart,
    CreditCard,
    Package,
    MessageSquare,
    Globe,
    Shield,
    Zap
  } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const features = [
    {
      icon: Search,
      title: 'Búsqueda Avanzada',
      description: 'Encuentra libros por título, autor, género o palabras clave con filtros potentes.'
    },
    {
      icon: ShoppingCart,
      title: 'Carrito Intuitivo',
      description: 'Gestiona tus compras fácilmente. Añade, modifica o elimina productos antes de pagar.'
    },
    {
      icon: CreditCard,
      title: 'Pagos Seguros',
      description: 'Múltiples métodos de pago: tarjetas, PayPal y más. Tus datos siempre protegidos.'
    },
    {
      icon: Package,
      title: 'Envíos Rastreables',
      description: 'Sigue tus pedidos en tiempo real. Historial completo de compras disponible.'
    },
    {
      icon: MessageSquare,
      title: 'Comunidad de Lectores',
      description: 'Comparte y lee reseñas de otros amantes de la lectura. Tu opinión importa.'
    },
    {
      icon: Globe,
      title: 'Multilingüe',
      description: 'Disponible en varios idiomas para atender a lectores de todo el mundo.'
    },
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description: 'Cifrado de extremo a extremo para proteger tu información personal y financiera.'
    },
    {
      icon: Zap,
      title: 'Descarga Instantánea',
      description: 'Libros digitales disponibles al momento. Lee desde cualquier dispositivo.'
    }
  ];


  export default function Features() {
    return (
      <section className="py-20 md:py-32 bg-muted/30 h-[95vh]">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl mb-4">
              Todo lo que necesitas para disfrutar de la lectura
            </h2>
            <p className="text-xl text-muted-foreground pt-8 pb-24 px-4">
              Una plataforma completa diseñada para hacer tu experiencia de compra
              simple, segura y satisfactoria.
            </p>
  
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
                <Card className="h-full hover:shadow-lg transition-shadow pb-10">
                  <CardHeader>
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
  