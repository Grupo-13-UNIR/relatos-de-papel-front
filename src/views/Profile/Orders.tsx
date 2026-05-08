import { Fragment, useMemo, useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import ordersMock from '@/mock/order-mock';
import type { Order } from '@/types/order';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { delay } from '@/lib/delay';

const PAGE_SIZE = 5;

export default function Orders() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const userOrders = useMemo(() => {
    if (!user) return [];
    return ordersMock
      .filter((o: Order) => o.userId === user.id)
      .sort((a: Order, b: Order) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [user]);

  const totalPages = Math.max(1, Math.ceil(userOrders.length / PAGE_SIZE));

  const pagesToRender = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages - 1);

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 0 && i < totalPages) pages.add(i);
    }
    console.log(
      'Pages to render:',
      Array.from(pages).sort((a, b) => a - b)
    );
    return Array.from(pages).sort((a, b) => a - b);
  }, [totalPages, page]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return userOrders.slice(start, start + PAGE_SIZE);
  }, [userOrders, page]);

  if (!user) {
    return <div className="p-4">Inicia sesión para ver tus pedidos.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-medium">Mis pedidos</h2>

      {paged.length === 0 ? (
        <div className="text-sm text-muted-foreground">No tienes pedidos aún.</div>
      ) : (
        <div className="grid gap-3">
          {paged.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>
                  Pedido #{order.id} · {new Date(order.createdAt).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>
                    {order.items.length} artículo{order.items.length > 1 ? 's' : ''}
                  </div>
                  <div className="capitalize">{order.status}</div>
                </div>
                <div className="mt-2 font-medium">Total: €{order.total.toFixed(2)}</div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    delay(500, () => {
                      setSelectedOrder(order);
                    });
                  }}
                >
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Card>
              <CardHeader>
                <CardTitle>Detalle pedido #{selectedOrder.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="font-medium">Fecha</div>
                    <div>{new Date(selectedOrder.createdAt).toLocaleString()}</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Estado</div>
                    <div className="capitalize">{selectedOrder.status}</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Total</div>
                    <div className="font-semibold">€{selectedOrder.total.toFixed(2)}</div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Artículos</h4>
                    <ul className="divide-y rounded-md overflow-hidden border">
                      {selectedOrder.items.map((it) => (
                        <li
                          key={it.id}
                          className="flex items-center justify-between p-3 bg-background"
                        >
                          <div>
                            <div className="font-medium">{it.title}</div>
                            <div className="text-xs text-muted-foreground">
                              Precio unitario: €{it.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            x{it.quantity} · €{(it.price * it.quantity).toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Dirección de envío</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{selectedOrder.shippingAddress.name}</div>
                      <div>{selectedOrder.shippingAddress.line1}</div>
                      <div>
                        {selectedOrder.shippingAddress.city} -{' '}
                        {selectedOrder.shippingAddress.postalCode}
                      </div>
                      <div>{selectedOrder.shippingAddress.country}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="ml-auto">
                  <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                    Cerrar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage((p) => Math.max(1, p - 1))}
              aria-disabled={page <= 1}
              className={page <= 1 ? 'opacity-50 pointer-events-none' : undefined}
            />
          </PaginationItem>
          {pagesToRender.map((p, idx) => {
            const prev = pagesToRender[idx - 1];

            return (
              <Fragment key={p}>
                {prev && p - prev > 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                    className={p === page ? 'opacity-70 pointer-events-none' : undefined}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage((p) => Math.min(totalPages, p + 1))}
              aria-disabled={page >= totalPages}
              className={page >= totalPages ? 'opacity-50 pointer-events-none' : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
