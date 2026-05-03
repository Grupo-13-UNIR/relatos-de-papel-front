import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth/AuthContext';
import { loginApi } from '@/lib/auth';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginApi(formData.email, formData.password);
      auth?.login(user);
      navigate('/profile');
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
}
