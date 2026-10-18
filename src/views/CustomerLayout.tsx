import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.ts';

export function CustomerLayout() {
  const { user, logout } = useAuth();

  return (
    <main className="page-shell">
      <section className="page-header">
        <div>
          <h1>My Account</h1>
          <p>Access orders, tracking, addresses and notifications.</p>
        </div>
        <button className="button button-outline" onClick={logout}>Logout</button>
      </section>

      <section className="account-shell">
        <aside className="account-sidebar">
          <div className="account-user">
            <strong>{user?.email}</strong>
            <span>{user?.role}</span>
          </div>
          <nav className="account-nav">
            <Link to="">Overview</Link>
            <Link to="orders">My Orders</Link>
            <Link to="addresses">Addresses</Link>
            <Link to="notifications">Notifications</Link>
          </nav>
        </aside>
        <section className="account-content">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
