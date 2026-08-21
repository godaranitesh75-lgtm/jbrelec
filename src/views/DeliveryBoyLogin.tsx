import { FormEvent, useState } from 'react';
import { useAuth } from '../auth.tsx';
import { useNavigate } from 'react-router-dom';

export function DeliveryBoyLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/deliveryboy/dashboard');
    } catch {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-panel auth-panel--centered">
        <div className="auth-header">
          <span className="auth-eyebrow">JBR Electrical</span>
          <h1>Delivery Partner Login</h1>
          <p>Access your delivery assignments and update shipment status.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Enter your password" />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button button-orange button-fullwidth" type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
