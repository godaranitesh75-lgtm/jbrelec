import { useState } from 'react';
import { Send, CheckCircle, Package, Phone, MessageCircle } from 'lucide-react';

export function RequestQuote() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    details: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent('JBR Electrical — New Quote Request');
    const body = encodeURIComponent(
      `JBR Electrical — Quote Request\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nProduct / Category: ${form.product}\nQuantity: ${form.quantity}\nAdditional Details: ${form.details}`
    );

    window.location.href = `mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  }

  return (
    <main style={{ background: '#f4f8f6', minHeight: '100vh', padding: '60px 5.5% 80px' }}>

      {/* Header */}
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--orange)',
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          <span style={{ width: 28, height: 1, background: 'var(--orange)' }} />
          JBR Electrical
          <span style={{ width: 28, height: 1, background: 'var(--orange)' }} />
        </span>
        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: 'var(--navy)',
          lineHeight: 1.08,
          letterSpacing: '-.05em',
          margin: '0 0 16px',
        }}>
          Request a Quote
        </h1>
        <p style={{ color: '#6b7f8c', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
          Tell us what you need and we'll get back to you with pricing and availability as soon as possible.
        </p>
      </div>

      {/* Form Card */}
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: 24,
          padding: '44px 40px',
          boxShadow: '0 8px 40px rgba(7,89,76,.08)',
          border: '1px solid rgba(7,89,76,.06)',
        }}>
          {sent ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#e2f6f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#1e9c6e',
              }}>
                <CheckCircle size={36} />
              </div>
              <h2 style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 28,
                color: 'var(--navy)',
                margin: '0 0 12px',
              }}>
                Quote request sent!
              </h2>
              <p style={{ color: '#6b7f8c', fontSize: 14, lineHeight: 1.8, margin: '0 0 32px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                Thank you. Our team at JBR Electrical will review your request and contact you shortly with pricing and availability.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="button button-navy"
                  onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', product: '', quantity: '', details: '' }); }}
                >
                  Submit another quote
                </button>
                <a href="/" className="button button-outline">Back to home</a>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#eaf6f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--navy)',
                  flexShrink: 0,
                }}>
                  <Package size={22} />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 20,
                    color: 'var(--navy)',
                    margin: '0 0 3px',
                    letterSpacing: '-.03em',
                  }}>
                    Fill in your requirements
                  </h2>
                  <p style={{ margin: 0, fontSize: 12, color: '#8a9aa5' }}>All fields marked * are required</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      Full name *
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={{
                        padding: '13px 16px',
                        border: '1.5px solid #e2eaed',
                        borderRadius: 12,
                        background: '#f8fbfc',
                        fontSize: 14,
                        color: 'var(--ink)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      Phone number *
                    </span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      style={{
                        padding: '13px 16px',
                        border: '1.5px solid #e2eaed',
                        borderRadius: 12,
                        background: '#f8fbfc',
                        fontSize: 14,
                        color: 'var(--ink)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                </div>

                {/* Email */}
                <label style={{ display: 'grid', gap: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                    Email address
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={{
                      padding: '13px 16px',
                      border: '1.5px solid #e2eaed',
                      borderRadius: 12,
                      background: '#f8fbfc',
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                      boxSizing: 'border-box',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                  />
                </label>

                {/* Product & Quantity */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      Product / Category *
                    </span>
                    <input
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Modular switches, Wire"
                      style={{
                        padding: '13px 16px',
                        border: '1.5px solid #e2eaed',
                        borderRadius: 12,
                        background: '#f8fbfc',
                        fontSize: 14,
                        color: 'var(--ink)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      Quantity
                    </span>
                    <input
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 units, 200 metres"
                      style={{
                        padding: '13px 16px',
                        border: '1.5px solid #e2eaed',
                        borderRadius: 12,
                        background: '#f8fbfc',
                        fontSize: 14,
                        color: 'var(--ink)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                </div>

                {/* Additional Details */}
                <label style={{ display: 'grid', gap: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                    Additional details
                  </span>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Brand preference, specifications, project details, delivery location..."
                    style={{
                      padding: '13px 16px',
                      border: '1.5px solid #e2eaed',
                      borderRadius: 12,
                      background: '#f8fbfc',
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.65,
                      boxSizing: 'border-box',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                  />
                </label>

                <button
                  type="submit"
                  className="button button-navy"
                  disabled={sending}
                  style={{ justifyContent: 'center', gap: 10, opacity: sending ? 0.75 : 1 }}
                >
                  {sending ? 'Sending…' : <><Send size={14} /> Submit Quote Request</>}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Alternate contact */}
        <div style={{
          marginTop: 24,
          background: 'white',
          borderRadius: 16,
          padding: '20px 28px',
          boxShadow: '0 4px 16px rgba(7,89,76,.05)',
          border: '1px solid rgba(7,89,76,.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7f8c' }}>
            Prefer to talk directly? Reach us via:
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="tel:6377374179" className="button button-navy small">
              <Phone size={13} /> Call
            </a>
            <a href="https://wa.me/916377374179" target="_blank" rel="noreferrer" className="button button-orange small">
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
