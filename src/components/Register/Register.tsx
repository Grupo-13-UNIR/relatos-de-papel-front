import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
  return (
    <section>
      <h1>Register</h1>
      <form className="space-y-2">
        <Input placeholder="Nombre" name="name" />
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Contraseña" type="password" name="password" />
        <Button type="submit">Crear cuenta</Button>
      </form>
    </section>
  );
}
