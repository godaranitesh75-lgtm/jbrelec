import { useAuth } from '../auth.tsx';

export function CustomerAccount() {
  const { user, logout } = useAuth();

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>My Account</h1>
        <p>Welcome back, {user?.email}. Manage orders, addresses, and profile settings.</p>
      </section>
      <section className="dashboard-grid">
        <div className="dashboard-card">My Orders</div>
        <div className="dashboard-card">Saved Addresses</div>
        <div className="dashboard-card">Notifications</div>
        <button className="button button-outline" onClick={logout}>Logout</button>
      </section>
    </main>
  );
}
