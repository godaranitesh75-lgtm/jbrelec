import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api.ts';

interface Product {
  name: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  total: number;
  product: Product;
}

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
}

export function CustomerOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/orders/${id}`)
      .then((response) => setOrder(response.data))
      .catch(() => setError('Unable to load order details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const canCancel = order ? ['PENDING', 'CONFIRMED', 'PROCESSING'].includes(order.status) : false;

  const handleCancel = async () => {
    if (!id || !canCancel) return;
    setCancelling(true);
    try {
      await api.post(`/api/orders/${id}/cancel`, { reason: 'Customer requested cancellation' });
      navigate(0);
    } catch {
      setError('Could not cancel this order.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <p>Loading order details…</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <div className="section-kicker">Order details</div>
      <h2>{order.orderNumber}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <div className="panel">
        <div><strong>Shipping address</strong><p>{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p></div>
        <div><strong>Subtotal</strong><p>₹{order.subtotal.toFixed(2)}</p></div>
        <div><strong>Tax</strong><p>₹{order.tax.toFixed(2)}</p></div>
        <div><strong>Delivery</strong><p>₹{order.deliveryFee.toFixed(2)}</p></div>
        <div><strong>Total</strong><p>₹{order.total.toFixed(2)}</p></div>
      </div>
      <div className="order-items">
        <h3>Items</h3>
        {order.items.map((item) => (
          <article className="product-card" key={item.id}>
            <div><strong>{item.product.name}</strong></div>
            <div>Qty: {item.quantity}</div>
            <div>Price: ₹{item.unitPrice.toFixed(2)}</div>
            <div>Total: ₹{item.total.toFixed(2)}</div>
          </article>
        ))}
      </div>
      <div className="page-actions">
        <button className="button button-outline" onClick={() => navigate(-1)}>Back</button>
        {canCancel && (
          <button className="button button-orange" onClick={handleCancel} disabled={cancelling}>{cancelling ? 'Cancelling…' : 'Cancel order'}</button>
        )}
      </div>
    </div>
  );
}
