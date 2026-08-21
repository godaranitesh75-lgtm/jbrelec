import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.ts';

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('/api/auth/register', { email, password, phone, name });
      navigate('/login');
    } catch {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-panel auth-panel--centered">
        <div className="auth-header">
          <span className="auth-eyebrow">JBR Electrical</span>
          <h1>Register</h1>
          <p>Create your customer account to manage orders, track deliveries and request quotes.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
          <label>
            Name
            <input type="text" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" />
          </label>
          <label>
            Email
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Mobile number" />
          </label>
          <label>
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button className="button button-orange" type="submit">Register</button>
          </div>
          <div className="auth-footer">
            <p>Already have an account? <Link className="text-link" to="/login">Login here</Link>.</p>
          </div>
        </form>
      </section>
    </main>
  );
}
