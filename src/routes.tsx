import { Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { UserRole } from './auth.tsx';
import App from './App.tsx';
import { AuthProvider, useAuth } from './auth.tsx';
import { AdminDashboard } from './views/AdminDashboard.tsx';
import { About } from './views/About.tsx';
import { Brands } from './views/Brands.tsx';
import { Contact } from './views/Contact.tsx';
import { DeliveryBoyLogin } from './views/DeliveryBoyLogin.tsx';
import { DeliveryDashboard } from './views/DeliveryDashboard.tsx';
import { Login } from './views/Login.tsx';
import { Register } from './views/Register.tsx';
import { Services } from './views/Services.tsx';
import { CustomerLayout } from './views/CustomerLayout.tsx';
import { CustomerAccount } from './views/CustomerAccount.tsx';
import { CustomerOrders } from './views/CustomerOrders.tsx';
import { CustomerOrderDetails } from './views/CustomerOrderDetails.tsx';
import { CustomerOrderTrack } from './views/CustomerOrderTrack.tsx';
import { CustomerAddresses } from './views/CustomerAddresses.tsx';
import { CustomerNotifications } from './views/CustomerNotifications.tsx';
import { NotFound } from './views/NotFound.tsx';

function ProtectedRoute({ roles }: { roles: UserRole[] }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/account',
    element: <ProtectedRoute roles={['CUSTOMER']} />,
    children: [
      {
        path: '',
        element: <CustomerLayout />,
        children: [
          { path: '', element: <CustomerAccount /> },
          { path: 'orders', element: <CustomerOrders /> },
          { path: 'orders/:id', element: <CustomerOrderDetails /> },
          { path: 'orders/:id/track', element: <CustomerOrderTrack /> },
          { path: 'addresses', element: <CustomerAddresses /> },
          { path: 'notifications', element: <CustomerNotifications /> },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute roles={['ADMIN']} />,
    children: [
      { path: '', element: <AdminDashboard /> },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/brands',
    element: <Brands />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/deliveryboy/login',
    element: <DeliveryBoyLogin />,
  },
  {
    path: '/deliveryboy',
    element: <ProtectedRoute roles={['DELIVERY_BOY']} />,
    children: [
      { path: 'dashboard', element: <DeliveryDashboard /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export function RouterProviderWithAuth() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

