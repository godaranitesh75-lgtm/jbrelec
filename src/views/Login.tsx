import { FormEvent, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.ts';

export function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged-in users shouldn't see the login page
  if (!loading && user) {
    if (user.role === 'ADMIN' || user.role === 'STAFF') {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === 'CUSTOMER') {
      return <Navigate to="/account" replace />;
    }
    if (user.role === 'DELIVERY_BOY') {
      return <Navigate to="/deliveryboy/dashboard" replace />;
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const loggedUser = await login(email, password);

      if (loggedUser.role === 'ADMIN' || loggedUser.role === 'STAFF') {
        navigate('/admin');
        return;
      }
      if (loggedUser.role === 'DELIVERY_BOY') {
        navigate('/deliveryboy/dashboard');
        return;
      }
      navigate('/account');
    } catch {
      setError('Login failed. Please check your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-panel auth-panel--centered">
        <div className="auth-header">
          <span className="auth-eyebrow">JBR Electrical</span>
          <h1>Login</h1>
          <p>Access your account to manage orders, deliveries and customer details.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button className="button button-orange" type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Login'}
            </button>
          </div>
          <div className="auth-footer">
            <p>First time here? <Link className="text-link" to="/register">Register now</Link>.</p>
          </div>
        </form>
      </section>
    </main>
  );
}
