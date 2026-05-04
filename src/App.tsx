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
import Profile from '@/views/Profile.tsx';
import Register from '@/views/Register.tsx';
import { type JSX, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

interface RouteElement {
  path: string;
  component: JSX.Element;
  index?: boolean;
  showSearch?: boolean;
  privateRoute?: boolean;
}

const routeElements: RouteElement[] = [
  {
    path: '/',
    component: <Home />,
    index: true,
    showSearch: true,
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
  },
  {
    path: '/catalogue',
    component: <Catalogue />,
    showSearch: true,
  },
];

function App() {
  useEffect(() => {
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
            <Routes>
              {routeElements.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.privateRoute ? (
                      <PrivateRoute>
                        <ViewLayout showSearch={route.showSearch ?? false}>
                          {route.component}
                        </ViewLayout>
                      </PrivateRoute>
                    ) : (
                      <ViewLayout showSearch={route.showSearch ?? false}>
                        {route.component}
                      </ViewLayout>
                    )
                  }
                  index={route.index}
                />
              ))}
              <Route
                path="*"
                element={
                  <ViewLayout showSearch={false}>
                    <NotFound />
                  </ViewLayout>
                }
              />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
