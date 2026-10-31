import { useState, type FormEvent } from 'react';
import { ShieldCheck, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '../hooks/use-auth.ts';

interface Props {
  /** Called after a successful admin login so the parent can re-render */
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
        setError('Access denied. This portal is for administrators only.');
        // clear the session — customer credentials shouldn't persist here
        localStorage.removeItem('jbr_token');
        localStorage.removeItem('jbr_user');
        return;
      }
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(135deg, #042b22 0%, #07594c 50%, #0d9488 100%)',
      display: 'grid',
      placeItems: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background orbs */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        border: '1px solid rgba(245,158,11,.15)', top: -200, right: -100, pointerEvents: 'none',
        boxShadow: '0 0 0 80px rgba(245,158,11,.03), 0 0 0 160px rgba(245,158,11,.02)',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,.06)', bottom: -120, left: -60, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440 }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: 20, background: 'rgba(245,158,11,.15)',
            border: '1px solid rgba(245,158,11,.3)', marginBottom: 20,
          }}>
            <ShieldCheck size={30} color="#f59e0b" />
          </div>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 26, fontWeight: 900, color: 'white', letterSpacing: '-.04em' }}>
            JBR <span style={{ color: '#f59e0b' }}>ELECTRICAL</span>
          </div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,.5)', fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' }}>
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 28,
          padding: '40px 36px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 80px rgba(0,0,0,.4)',
        }}>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 800,
            color: 'white', margin: '0 0 6px', letterSpacing: '-.04em',
          }}>
            Administrator Login
          </h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, margin: '0 0 32px', lineHeight: 1.6 }}>
            Enter your credentials to access the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                Email address
              </span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jbrelectrical.com"
                style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.12)',
                  background: 'rgba(255,255,255,.07)',
                  color: 'white',
                  fontSize: 14,
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color .2s, box-shadow .2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245,158,11,.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,.12)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                Password
              </span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    padding: '14px 48px 14px 16px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,.12)',
                    background: 'rgba(255,255,255,.07)',
                    color: 'white',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'border-color .2s, box-shadow .2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(245,158,11,.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none', color: 'rgba(255,255,255,.4)',
                    cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center',
                  }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)',
                borderRadius: 10, padding: '12px 16px', color: '#fca5a5', fontSize: 13, lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                padding: '15px 24px',
                borderRadius: 12,
                border: 'none',
                background: loading ? 'rgba(245,158,11,.5)' : '#f59e0b',
                color: '#1c1917',
                fontWeight: 800,
                fontSize: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background .2s, transform .2s',
                letterSpacing: '.04em',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,.2)', borderTopColor: '#1c1917', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
                  Signing in…
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign in to Admin
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: 24, color: 'rgba(255,255,255,.3)', fontSize: 11 }}>
          <Zap size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: '#f59e0b' }} />
          This portal is restricted to authorised JBR Electrical staff only.
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,.25) !important; }
      `}</style>
    </div>
  );
}
