import { useEffect, useState } from 'react';
import api from '../api.ts';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function CustomerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/account/notifications')
      .then((response) => setNotifications(response.data))
      .catch(() => setError('Unable to load notifications.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="section-kicker">Notifications</div>
      <h2>Recent updates</h2>
      {loading && <p>Loading notifications…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && notifications.length === 0 && (
        <div className="empty-state">
          <h3>No notifications yet</h3>
          <p>Important order and delivery updates will appear here.</p>
        </div>
      )}
      <div className="notification-list">
        {notifications.map((notification) => (
          <article className={`notification-card ${notification.read ? 'read' : 'unread'}`} key={notification.id}>
            <header>
              <strong>{notification.title}</strong>
              <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
            </header>
            <p>{notification.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
