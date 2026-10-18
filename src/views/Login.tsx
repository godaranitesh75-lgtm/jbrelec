import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.ts';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button className="button button-orange" type="submit">Login</button>
          </div>
          <div className="auth-footer">
            <p>First time here? <Link className="text-link" to="/register">Register now</Link>.</p>
          </div>
        </form>
      </section>
    </main>
  );
}
