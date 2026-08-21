export function AdminDashboard() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products, orders, customers, deliveries and live tracking.</p>
      </section>
      <section className="dashboard-grid">
        <div className="dashboard-card">Orders</div>
        <div className="dashboard-card">Products</div>
        <div className="dashboard-card">Delivery Boys</div>
        <div className="dashboard-card">Live Tracking</div>
      </section>
    </main>
  );
}
