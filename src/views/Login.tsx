import { useState, useContext, type SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { AuthContext } from '@/context/auth/AuthContext.tsx';
import { userService } from '@/services/user-service.ts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await userService.login({
        email: formData.email,
        password: formData.password,
      });
      onLogin(user);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
            <CardDescription>Inicia sesión con tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Field>
                {error && <div className="text-red-600">{error}</div>}
                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                  </Button>
                  <FieldDescription className="text-center">
                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y{' '}
          <a href="#">Política de Privacidad</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
