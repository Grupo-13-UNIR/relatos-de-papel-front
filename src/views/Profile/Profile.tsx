import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { AuthContext } from '@/context/auth/AuthContext';
import { delay } from '@/lib/delay';
import type { User } from '@/types/user';
import { useContext, useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Orders from '@/views/Profile/Orders';

export default function Profile() {
  const { user, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Pick<User, 'name' | 'lastname' | 'email' | 'avatar'>>>(
    () =>
      user
        ? {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            avatar: user.avatar,
          }
        : {}
  );
  const [preview, setPreview] = useState<string | undefined>(() => user?.avatar);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{
    variant: React.ComponentProps<typeof Alert>['variant'];
    title: string;
    description?: string;
    visible: boolean;
    duration?: number;
  } | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setForm((s) => ({ ...s, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPreview(value || undefined);
    setForm((s) => ({ ...s, avatar: value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated: User = {
        id: user.id,
        name: form.name || user.name,
        lastname: form.lastname || user.lastname,
        email: form.email || user.email,
        avatar: form.avatar || user.avatar,
      };
      console.log('Current user data:', user);
      console.log('Updated user data:', updated);
      if (JSON.stringify(user) === JSON.stringify(updated)) {
        showAlert('default', 'Sin cambios', 'No se han detectado cambios en tu perfil', 2000);
        return;
      }
      await delay(1500, () => {});
      onLogin(updated);
      showAlert('default', 'Perfil actualizado', 'Tus datos se han guardado correctamente');
    } catch (err) {
      showAlert('destructive', 'Error', (err as Error)?.message || 'Error al guardar los datos');
    } finally {
      setSaving(false);
    }
  };

  function showAlert(
    variant: React.ComponentProps<typeof Alert>['variant'],
    title: string,
    description?: string,
    duration = 4000
  ) {
    setAlert({ variant, title, description, visible: true, duration });
    setTimeout(() => setAlert((a) => (a ? { ...a, visible: false } : a)), duration);
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-card p-6 rounded-md">
        <div className="flex items-center gap-4">
          <Avatar>
            {preview && <AvatarImage src={preview} alt="avatar" />}
            <AvatarFallback>{user.name.charAt(0) + user.lastname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Cambiar imagen</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            <input
              type="url"
              placeholder="O pega una URL de imagen"
              className="mt-2 w-full"
              value={form.avatar}
              onChange={handleAvatarUrl}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Nombre</label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Apellido</label>
          <Input name="lastname" value={form.lastname} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Email</label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
          <Button variant="ghost" type="button" onClick={() => navigate('/')}>
            Cancelar
          </Button>
        </div>
      </form>
      <div className="mt-4">
        {alert && (
          <div
            className={`transform transition-all duration-300 ${
              alert.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Alert variant={alert.variant} className="shadow-lg relative overflow-hidden">
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.description && <AlertDescription>{alert.description}</AlertDescription>}
              <div className="absolute left-0 bottom-0 w-full" aria-hidden>
                <div className="alert-progress" />
              </div>
            </Alert>
          </div>
        )}
      </div>
      <Orders />
    </section>
  );
}
