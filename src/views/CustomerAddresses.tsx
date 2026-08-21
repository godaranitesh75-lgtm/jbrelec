import { useEffect, useState } from 'react';
import api from '../api.ts';

interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function CustomerAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/account/addresses')
      .then((response) => setAddresses(response.data))
      .catch(() => setError('Unable to load saved addresses.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="section-kicker">Saved addresses</div>
      <h2>Your delivery addresses</h2>
      {loading && <p>Loading addresses…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && addresses.length === 0 && (
        <div className="empty-state">
          <h3>No saved addresses</h3>
          <p>Add a delivery address while placing your next order.</p>
        </div>
      )}
      <div className="address-grid">
        {addresses.map((address) => (
          <article className="address-card" key={address.id}>
            <h3>{address.label}</h3>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>{address.city}, {address.state} {address.postalCode}</p>
            <p>{address.country}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
