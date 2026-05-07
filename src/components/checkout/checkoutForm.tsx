import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useCart } from "@/context/cart/CartContext";

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = Object.values(formData).every(
    value => value.trim() !== ""
  );

  const handlePurchase = () => {
    if (!isFormValid) return;

    clearCart();

    navigate("/success");
  };

  return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      width: "100%",
    }}
  >
    <h2>Datos de envío</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
      }}
    >
      <div>
        <p>Nombre</p>
        <input
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <p>Apellidos</p>
        <input
          name="surname"
          placeholder="Apellidos"
          value={formData.surname}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <p>Email</p>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <p>Ciudad</p>
        <input
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <p>Dirección</p>
        <input
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <p>Código Postal</p>
        <input
          name="postalCode"
          placeholder="Código Postal"
          value={formData.postalCode}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
    </div>

    <div>
      <p>Teléfono</p>
      <input
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
    </div>

    <Button
      disabled={!isFormValid}
      onClick={handlePurchase}
    >
      Completar compra
    </Button>
  </div>
);
};