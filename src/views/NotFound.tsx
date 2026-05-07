import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
      <Card className="max-w-xl text-center">
        <CardContent>
          <div className="text-muted-foreground mb-2 text-sm">404</div>
          <h1 className="font-heading text-3xl font-bold mb-2">Página no encontrada</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
