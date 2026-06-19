// Configuración centralizada para las URLs del gateway
export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8762';

// Rutas específicas del gateway
export const API_ROUTES = {
  // Para peticiones de catálogo (productos)
  CATALOGUE: `${GATEWAY_URL}/catalogue`,

  // Para peticiones de órdenes
  ORDERS: `${GATEWAY_URL}/orders`,

  // Para comunicaciones (chat WebSocket)
  //COMMUNICATIONS: `http://localhost:8082`,

  COMMUNICATIONS: `${GATEWAY_URL}/communications`,

  // Para gestión de usuarios y sesiones
  USERS: `${GATEWAY_URL}/users`,
};

// Función helper para construir URLs completas
export const buildApiUrl = (service: keyof typeof API_ROUTES, endpoint: string) => {
  const baseUrl: string = API_ROUTES[service];
  if (!baseUrl) {
    throw new Error(`Unknown service: ${service}`);
  }

  // Asegurar que el endpoint comience con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${baseUrl}${normalizedEndpoint}`;
};
