import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ChevronRight,
  Zap,
  Users,
  Headphones,
} from 'lucide-react';

const CHANNELS = [
  {
    icon: Phone,
    label: 'Call us directly',
    value: '6377374179',
    sub: 'Available Mon – Sun, 8:00 AM – 10:00 PM',
    href: 'tel:6377374179',
    cta: 'Call now',
    color: 'var(--navy)',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp support',
    value: '6377374179',
    sub: 'Instant messaging for urgent matters',
    href: 'https://wa.me/916377374179',
    cta: 'Open WhatsApp',
    color: '#25D366',
  },
  {
    icon: Mail,
    label: 'Email us',
    value: 'jabraram8015@gmail.com',
    sub: 'Response within 24 business hours',
    href: 'mailto:jabraram8015@gmail.com',
    cta: 'Send email',
    color: 'var(--orange)',
  },
];

const INFO = [
  {
    icon: MapPin,
    label: 'Office address',
    lines: [
      'JBR Electrical',
      'Syed Jung Ln, Troop Bazaar, Koti',
      'Hyderabad, Telangana 500001',
    ],
  },
  {
    icon: Clock,
    label: 'Business hours',
    lines: ['Monday – Sunday', '8:00 AM – 10:00 PM', 'Available for urgent queries'],
  },
];

const SERVICES = [
  {
    icon: Zap,
    title: 'Product Inquiries',
    desc: 'Comprehensive information on electrical products, specifications, availability, and competitive bulk pricing.',
  },
  {
    icon: Headphones,
    title: 'Technical Assistance',
    desc: 'Expert guidance on product compatibility, installation procedures, and technical troubleshooting.',
  },
  {
    icon: Users,
    title: 'B2B Solutions',
    desc: 'Dedicated account management for contractors, electricians, and builders with priority support.',
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  }

  return (
    <main style={{ background: '#f4f8f6' }}>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07594c 0%, #0d9488 100%)',
          padding: '80px 5.5% 90px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: '50%',
            border: '1px solid rgba(245,158,11,.25)',
            top: -160,
            right: -80,
            boxShadow: '0 0 0 60px rgba(245,158,11,.05)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 820, position: 'relative', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#f59e0b',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            <span style={{ width: 28, height: 1, background: '#f59e0b' }} />
            Contact Us
          </span>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(38px, 4.5vw, 64px)',
              lineHeight: 1.04,
              letterSpacing: '-.05em',
              color: 'white',
              margin: '0 0 22px',
              maxWidth: 700,
            }}
          >
            Get in touch with JBR Electrical
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.72)',
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 0 36px',
            }}
          >
            We provide premium electrical products, expert technical support, and reliable delivery coordination. Contact us for quotes, product availability, or project consultation.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a className="button button-orange" href="tel:6377374179">
              <Phone size={14} /> Call 6377374179
            </a>
            <a
              className="button"
              href="https://wa.me/916377374179"
              target="_blank"
              rel="noreferrer"
              style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.2)' }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── CHANNEL CARDS ── */}
      <section
        style={{
          padding: '0 5.5%',
          marginTop: -48,
          position: 'relative',
          zIndex: 2,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {CHANNELS.map(({ icon: Icon, label, value, sub, href, cta, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              style={{
                display: 'block',
                background: 'white',
                borderRadius: 20,
                padding: '28px 28px 24px',
                boxShadow: '0 8px 32px rgba(7,89,76,.08)',
                border: '1px solid rgba(7,89,76,.06)',
                textDecoration: 'none',
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(7,89,76,.13)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(7,89,76,.08)';
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: `color-mix(in srgb, ${color} 12%, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  color,
                }}
              >
                <Icon size={20} />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#8a9aa5',
                }}
              >
                {label}
              </span>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--ink)',
                  margin: '6px 0 4px',
                  wordBreak: 'break-all',
                }}
              >
                {value}
              </p>
              <p style={{ fontSize: 12, color: '#7a8e99', margin: '0 0 20px', lineHeight: 1.6 }}>{sub}</p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  color,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                {cta} <ChevronRight size={13} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SEND US A MESSAGE SECTION ── */}
      <section style={{ padding: '0 5.5% 72px' }}>
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '40px',
            boxShadow: '0 8px 40px rgba(7,89,76,.07)',
            border: '1px solid rgba(7,89,76,.06)',
            maxWidth: '100%',
          }}
        >
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0 16px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#e2f6f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#1e9c6e',
                }}
              >
                <CheckCircle size={30} />
              </div>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 28,
                  color: 'var(--navy)',
                  margin: '0 0 10px',
                }}
              >
                Message received
              </h2>
              <p style={{ color: '#6b7f8c', fontSize: 14, lineHeight: 1.75, margin: '0 0 28px' }}>
                Thank you for reaching out. Our team will get back to you within one business day.
              </p>
              <button
                className="button button-navy"
                onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                Send us a message
              </span>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(24px, 2.4vw, 32px)',
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  letterSpacing: '-.04em',
                  margin: '0 0 8px',
                }}
              >
                Send us an inquiry
              </h2>
              <p style={{ color: '#6b7f8c', fontSize: 14, lineHeight: 1.7, margin: '0 0 30px' }}>
                Have a question about our products or services? Fill out the form below and our team will respond within one business day.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
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
                        transition: 'border-color .2s',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                      Phone number
                    </span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      style={{
                        padding: '13px 16px',
                        border: '1.5px solid #e2eaed',
                        borderRadius: 12,
                        background: '#f8fbfc',
                        fontSize: 14,
                        color: 'var(--ink)',
                        outline: 'none',
                        transition: 'border-color .2s',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                    />
                  </label>
                </div>

                <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                    Email address *
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    style={{
                      padding: '13px 16px',
                      border: '1.5px solid #e2eaed',
                      borderRadius: 12,
                      background: '#f8fbfc',
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                      transition: 'border-color .2s',
                      boxSizing: 'border-box',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--navy)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2eaed')}
                  />
                </label>

                <label style={{ display: 'grid', gap: 7, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                    Message *
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your requirement, product query or project details..."
                    style={{
                      padding: '13px 16px',
                      border: '1.5px solid #e2eaed',
                      borderRadius: 12,
                      background: '#f8fbfc',
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color .2s',
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
                  {sending ? (
                    'Sending…'
                  ) : (
                    <>
                      Send message <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ── OFFICE ADDRESS & BUSINESS HOURS ── */}
      <section style={{ padding: '0 5.5% 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {INFO.map(({ icon: Icon, label, lines }) => (
          <div
            key={label}
            style={{
              background: 'white',
              borderRadius: 20,
              padding: '26px 28px',
              boxShadow: '0 4px 20px rgba(7,89,76,.06)',
              border: '1px solid rgba(7,89,76,.06)',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: '#eaf6f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy)',
                flexShrink: 0,
              }}
            >
              <Icon size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#8a9aa5',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {label}
              </span>
              {lines.map((line) => (
                <p key={line} style={{ margin: '0 0 3px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.65 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── HOW WE HELP SECTION ── */}
      <section style={{ padding: '0 5.5% 72px' }}>
        <div
          style={{
            background: 'var(--navy)',
            borderRadius: 20,
            padding: '40px',
            color: 'white',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: '#f8b446',
              display: 'block',
              marginBottom: 10,
            }}
          >
            How we help
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(24px, 2.4vw, 32px)',
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 28px',
            }}
          >
            Why choose JBR Electrical
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f8b446',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <strong style={{ display: 'block', fontSize: 13, color: 'white', marginBottom: 4 }}>
                    {title}
                  </strong>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,.58)', lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP EMBED ── */}
      <section style={{ padding: '0 5.5% 72px' }}>
        <div
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(7,89,76,.08)',
            border: '1px solid rgba(7,89,76,.07)',
            position: 'relative',
          }}
        >
          <iframe
            title="JBR Electrical location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.8599181547657!2d78.4729947!3d17.3647222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97e2d0d0d0d1%3A0x1b6e4d8b4e8e4e8e!2sSyed%20Jung%20Lane%2C%20Troop%20Bazaar%2C%20Koti%2C%20Hyderabad%2C%20Telangana%20500001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ display: 'block', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              background: 'white',
              borderRadius: 14,
              padding: '14px 18px',
              boxShadow: '0 8px 28px rgba(0,0,0,.15)',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              maxWidth: 360,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: '#eaf6f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy)',
                flexShrink: 0,
              }}
            >
              <MapPin size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <strong style={{ display: 'block', fontSize: 12, color: 'var(--navy)', marginBottom: 2 }}>
                JBR Electrical
              </strong>
              <span style={{ fontSize: 11, color: '#6b7f8c', lineHeight: 1.5 }}>
                Syed Jung Ln, Troop Bazaar, Koti
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          margin: '0 5.5% 80px',
          background: 'linear-gradient(135deg, #07594c, #0d9488)',
          borderRadius: 24,
          padding: '56px 7%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(245,158,11,.3)', right: -80, top: -100, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: '#f8b446', display: 'block', marginBottom: 10 }}>
            Next Steps
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 10px',
            }}
          >
            Connect with us today
          </h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Whether you need a product recommendation, technical support, or bulk ordering, we're here to help.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <a className="button button-orange" href="tel:6377374179">
            <Phone size={14} /> Call now
          </a>
          <a
            className="button"
            href="https://wa.me/916377374179"
            target="_blank"
            rel="noreferrer"
            style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.22)' }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
