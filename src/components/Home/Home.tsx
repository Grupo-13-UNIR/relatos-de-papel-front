import { Button } from '@/components/ui/button';
import { useState } from 'react';
export default function Home() {
  const [count, setCount] = useState(0);
  console.log('Home render');

  return (
    <>
      <Button size="lg" className="mb-4" onClick={() => setCount((count) => count + 1)}>
        Prueba
      </Button>
      <section>Count is {count}</section>
    </>
  );
}
