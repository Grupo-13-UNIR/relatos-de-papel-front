import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router';
import { useCart } from '@/context/cart/CartContext';

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  const handlePurchase = () => {
    if (!isFormValid) return;

    clearCart();

    navigate('/success');
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-2xl font-semibold tracking-tight">Datos de envío</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Apellidos</Label>
          <Input
            id="surname"
            name="surname"
            placeholder="Apellidos"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Código Postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="Código Postal"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        disabled={!isFormValid}
        onClick={handlePurchase}
        size="lg"
        className="w-full md:w-auto"
      >
        Completar compra
      </Button>
    </div>
  );
};
