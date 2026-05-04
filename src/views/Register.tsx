import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useContext, useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '@/context/auth/AuthContext.tsx';
import { userService } from '@/services/user-service.ts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';

export default function Register() {
  console.log('Renderizando Register');
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }) as typeof prev);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const user = await userService.register({
        id: 0,
        email: formData.email,
        name: formData.name,
        lastname: formData.lastname,
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
            <CardTitle className="text-xl">Crear una cuenta</CardTitle>
            <CardDescription>
              Ingresa tu información a continuación para crear tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastname">Apellido</FieldLabel>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Apellido"
                      required
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </Field>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="usuario@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FieldDescription>
                    Utilizaremos tu email para enviarte informacion importante, como restablecer tu
                    contraseña.
                  </FieldDescription>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <FieldDescription>Por favor, confirma tu contraseña.</FieldDescription>
                  </Field>
                </Field>
                {error && <div className="text-red-600">{error}</div>}
                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Cargando...' : 'Crear Cuenta'}
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </FieldDescription>
      </div>
    </div>
  );
}
