import { Link } from 'react-router-dom';

export function AdminDashboard() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products, orders, customers, deliveries and live tracking.</p>
      </section>
      <section className="dashboard-grid">
        <Link to="/admin/products" className="dashboard-card">Products</Link>
        <div className="dashboard-card">Orders</div>
        <div className="dashboard-card">Delivery Boys</div>
        <div className="dashboard-card">Live Tracking</div>
      </section>
    </main>
  );
}
