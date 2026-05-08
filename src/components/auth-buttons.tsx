import { Link } from 'react-router';
import { Button } from '@/components/ui/button.tsx';

export const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost">Iniciar sesión</Button>
      </Link>
      <Link to="/register">
        <Button>Registrarse</Button>
      </Link>
    </div>
  );
};
