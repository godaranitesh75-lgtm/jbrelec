export function DeliveryDashboard() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>Delivery Dashboard</h1>
        <p>View active assignments, delivery status and live location controls.</p>
      </section>
      <section className="dashboard-grid">
        <div className="dashboard-card">Active Delivery</div>
        <div className="dashboard-card">Today's Tasks</div>
        <div className="dashboard-card">Notifications</div>
      </section>
    </main>
  );
}
