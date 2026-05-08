import { PrivateRoute } from '@/components/private-route.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import { ViewLayout } from '@/components/view-layout.tsx';
import { AuthProvider } from '@/context/auth/AuthProvider.tsx';
import Cart from '@/views/Cart.tsx';
import Catalogue from '@/views/Catalogue';
import Home from '@/views/Home.tsx';
import Login from '@/views/Login.tsx';
import NotFound from '@/views/NotFound.tsx';
import Products from '@/views/Products.tsx';
import Profile from '@/views/Profile/Profile';
import Register from '@/views/Register.tsx';
import { type JSX, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Checkout from '@/views/Checkout.tsx';
import Success from '@/views/CheckoutSuccess.tsx';

import { CartProvider } from '@/context/cart/CartProvider.tsx';
import { BookDetail } from '@/views/BookDetail.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

interface RouteElement {
  path: string;
  component: JSX.Element;
  index?: boolean;
  showSearch?: boolean;
  fullFooter?: boolean;
  privateRoute?: boolean;
}

const routeElements: RouteElement[] = [
  {
    path: '/',
    component: <Home />,
    index: true,
    showSearch: true,
    fullFooter: true,
  },
  {
    path: '/register',
    component: <Register />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/products',
    component: <Products />,
    showSearch: true,
  },
  {
    path: '/cart',
    component: <Cart />,
    showSearch: false,
  },
  {
    path: '/profile',
    component: <Profile />,
    showSearch: false,
    privateRoute: true,
  },
  {
    path: '/books',
    component: <Catalogue />,
    showSearch: true,
  },
  {
    path: '/checkout',
    component: <Checkout />,
    showSearch: true,
  },
  {
    path: '/success',
    component: <Success />,
  },
  {
    path: '/books/:id',
    component: <BookDetail />,
    showSearch: true,
  },
  {
    path: '*',
    component: <NotFound />,
    showSearch: false,
  },
];

function App() {
  useEffect(() => {
    // Load React Scan in development
    if (import.meta.env.DEV) {
      const script = document.createElement('script');
      script.src = '//unpkg.com/react-scan/dist/auto.global.js';
      script.crossOrigin = 'anonymous';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider storageKey="ui-theme">
          <AuthProvider>
            <CartProvider>
              <Toaster position="top-right" />
              <Routes>
                {routeElements.map(
                  ({ path, index, privateRoute, showSearch, fullFooter, component }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        privateRoute ? (
                          <PrivateRoute>
                            <ViewLayout fullFooter={fullFooter} showSearch={showSearch ?? false}>
                              {component}
                            </ViewLayout>
                          </PrivateRoute>
                        ) : (
                          <ViewLayout fullFooter={fullFooter} showSearch={showSearch ?? false}>
                            {component}
                          </ViewLayout>
                        )
                      }
                      index={index}
                    />
                  )
                )}
              </Routes>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
