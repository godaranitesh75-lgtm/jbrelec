import { Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import type { UserRole } from './contexts/auth-context.ts';
import App from './App.tsx';
import { AuthProvider } from './auth.tsx';
import { useAuth } from './hooks/use-auth.ts';
import { AdminDashboard } from './views/AdminDashboard.tsx';
import { AdminProducts } from './views/AdminProducts.tsx';
import { AdminLogin } from './views/AdminLogin.tsx';
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
import { RequestQuote } from './views/RequestQuote.tsx';
import { Blog } from './views/Blog.tsx';
import { GlobalSearchProvider } from './contexts/GlobalSearchContext.tsx';

// ─── Admin gate ──────────────────────────────────────────────────────────────
// Shows the dedicated admin login screen when unauthenticated or when the
// logged-in user doesn't have an admin/staff role. Never redirects to the
// shared customer /login page.
function AdminGate() {
  const { user, loading } = useAuth();
  // Trigger re-render after a successful login without a full page navigation
  const [, setTick] = useState(0);

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh', display: 'grid', placeItems: 'center',
        background: 'linear-gradient(135deg, #042b22 0%, #07594c 50%, #0d9488 100%)',
      }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(245,158,11,.3)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in → show admin login UI
  if (!user) {
    return <AdminLogin onSuccess={() => setTick((t) => t + 1)} />;
  }

  // Logged in as a non-admin role (customer, delivery boy) → access denied
  if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
    return (
      <div style={{
        minHeight: '100dvh', display: 'grid', placeItems: 'center',
        background: 'linear-gradient(135deg, #042b22 0%, #07594c 50%, #0d9488 100%)',
        padding: 24, textAlign: 'center',
      }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", color: 'white', fontSize: 28, margin: '0 0 12px' }}>Access Denied</h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 14, margin: '0 0 28px' }}>
            Your account does not have permission to access the admin area.
          </p>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 10, background: '#f59e0b',
            color: '#1c1917', fontWeight: 800, fontSize: 13, textDecoration: 'none',
          }}>
            ← Back to Website
          </a>
        </div>
      </div>
    );
  }

  // Authenticated admin/staff → render the nested admin route
  return <Outlet />;
}

// ─── Customer-only protected route ───────────────────────────────────────────
function ProtectedRoute({ roles }: { roles: UserRole[] }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-shell" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}

const router = createBrowserRouter([
  // ── Public storefront (freely accessible to everyone) ─────────────────────
  {
    path: '/',
    element: <App />,
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
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/quote',
    element: <RequestQuote />,
  },

  // ── Customer auth ──────────────────────────────────────────────────────────
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // ── Customer account (requires CUSTOMER login) ─────────────────────────────
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

  // ── Admin area (requires ADMIN/STAFF — has its own dedicated login screen) ─
  {
    path: '/admin',
    element: <AdminGate />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
    ],
  },

  // ── Delivery boy ──────────────────────────────────────────────────────────
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
    <GlobalSearchProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GlobalSearchProvider>
  );
}
