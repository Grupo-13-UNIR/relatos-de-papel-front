import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { useAuth } from '@/context/auth/AuthContext';
import { registerApi } from '@/lib/auth';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }) as typeof prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const user = await registerApi(formData.name, formData.email, formData.password);
      auth?.login(user);
      navigate('/profile');
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Ingresa tu información a continuación para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <FieldDescription>
                Utilizaremos tu email para enviarte informacion importante, como restablecer tu
                contraseña.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <FieldDescription>Tiene que tener al menos 8 caracteres.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirmar Contraseña</FieldLabel>
              <Input
                id="confirm-password"
                name="confirm"
                type="password"
                required
                value={formData.confirm}
                onChange={handleChange}
              />
              <FieldDescription>Por favor, confirma tu contraseña.</FieldDescription>
            </Field>
            {error && <div className="text-red-600">{error}</div>}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Cargando...' : 'Crear Cuenta'}
                </Button>
                <FieldDescription className="px-6 text-center">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
