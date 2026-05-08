import type { BookShortened } from '@/types/book';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
  cart: Record<string, { book: BookShortened; quantity: number }>;
}

export const OrderSummary = ({ cart }: Props) => {
  const total = Object.values(cart).reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.values(cart).map((item) => (
          <div key={item.book.id} className="flex justify-between items-start text-sm">
            <span className="text-muted-foreground truncate mr-4">{item.book.title}</span>
            <span className="font-medium whitespace-nowrap">
              {item.quantity} x {item.book.price.toFixed(2)}€
            </span>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-medium">0.00€</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full text-lg font-bold">
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </CardFooter>
    </Card>
  );
};
