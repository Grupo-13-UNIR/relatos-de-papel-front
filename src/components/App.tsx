import Home from '@/components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';
import Products from '@/components/Products/Products';
import Cart from '@/components/Cart/Cart';
import Profile from '@/components/Profile/Profile';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/auth/AuthProvider';
import { PrivateRoute } from '@/components/PivateRoute/PrivateRoute';

function App() {
  console.log('App render');
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Loading React Scan script...');
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
  console.log(import.meta.env.DEV + ' React Scan script loaded');
  console.log('Loading React Scan script...');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
