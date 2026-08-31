import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.ts';

interface OrderItem {
  id: string;
  quantity: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get<Order[]>('/api/orders');
        setOrders(response.data);
      } catch {
        setError('Unable to load orders.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="section-kicker">Order history</div>
      <h2>My orders</h2>
      {loading && <p>Loading orders…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && orders.length === 0 && (
        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>You haven't placed an order yet. Explore products to start shopping.</p>
          <Link className="button button-orange" to="/">Browse products</Link>
        </div>
      )}
      <div className="orders-grid">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card-header">
              <strong>{order.orderNumber}</strong>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="order-card-body">
              <p>Status: <strong>{order.status}</strong></p>
              <p>Items: {order.items.length}</p>
              <p>Total: ₹{order.total.toFixed(2)}</p>
            </div>
            <div className="order-card-actions">
              <Link className="text-link" to={order.id}>View details</Link>
              <Link className="text-link" to={`${order.id}/track`}>Track</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
