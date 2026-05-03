import { Button } from '@/components/ui/button.tsx';

export default function Catalogue() {
  return (
    <section>
      <h1>Productos</h1>
      <ul className="space-y-2">
        <li className="flex items-center justify-between">
          <span>Producto 1</span>
          <Button size="sm">Añadir</Button>
        </li>
        <li className="flex items-center justify-between">
          <span>Producto 2</span>
          <Button size="sm">Añadir</Button>
        </li>
      </ul>
    </section>
  );
}
