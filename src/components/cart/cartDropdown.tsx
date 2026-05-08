import { useCart } from '@/context/cart/CartContext';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const CartDropdown = () => {
  const { cart } = useCart();
  const items = Object.values(cart);

  const total = items.reduce((acc, { book, quantity }) => acc + book.price * quantity, 0);

  return (
    <div className="absolute top-full right-0 w-80 z-50">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Carrito</CardTitle>
          <CardDescription className="text-muted-foreground">
            {items.length === 0 ? 'El carrito está vacío' : `${items.length} artículo(s)`}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              Agrega libros al carrito para verlos aquí.
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto p-4 space-y-4">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex items-start gap-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{book.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">x{quantity}</p>
                  </div>

                  <div className="font-semibold">{(book.price * quantity).toFixed(2)}€</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="font-bold">{total.toFixed(2)}€</div>
          </div>

          <Button asChild className="w-full">
            <Link to="/cart">Ir al carrito</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
