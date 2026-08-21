import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  Phone,
  Clock,
  CheckCircle,
  MapPin,
  Zap,
  Headphones,
  Users,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Package,
    title: 'Product Guidance',
    desc: 'Expert recommendations for the right electrical accessories, components, and solutions tailored to your project needs.',
    color: 'var(--navy)',
  },
  {
    icon: Truck,
    title: 'Availability Verification',
    desc: 'Check product stock status and lead times before ordering to ensure timely delivery and project continuity.',
    color: '#f59e0b',
  },
  {
    icon: MapPin,
    title: 'Local Store Support',
    desc: 'Visit our Hyderabad store for immediate product collection, consultations, and urgent supply needs.',
    color: '#10b981',
  },
  {
    icon: Clock,
    title: 'Fast Response',
    desc: 'Quick turnaround on inquiries and orders with same-day support for contractor and project requirements.',
    color: '#8b5cf6',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    desc: 'Professional assistance with product specifications, compatibility, installation guidance and troubleshooting.',
    color: '#ec4899',
  },
  {
    icon: Users,
    title: 'Bulk & B2B Solutions',
    desc: 'Dedicated account management for contractors, electricians, and builders with volume pricing and priority access.',
    color: '#0891b2',
  },
];

const FEATURES = [
  {
    icon: CheckCircle,
    label: 'Quality Assured',
    text: 'Premium products from trusted manufacturers',
  },
  {
    icon: Phone,
    label: 'Easy Contact',
    text: 'Multiple channels for quick communication',
  },
  {
    icon: Truck,
    label: 'Reliable Delivery',
    text: 'Fast and secure shipping to your location',
  },
  {
    icon: Zap,
    label: 'Expert Team',
    text: 'Experienced professionals ready to assist',
  },
];

export function Services() {
  return (
    <main style={{ background: '#f4f8f6' }}>
      {/* ── HERO SECTION ── */}
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
            What We Offer
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
            Support beyond the product shelf
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
            From expert product guidance to availability verification and fast delivery, we provide comprehensive electrical solutions tailored to your needs.
          </p>
          <Link to="/" className="button button-orange">
            Browse Products
          </Link>
        </div>
      </section>

      {/* ── MAIN SERVICES CONTAINER ── */}
      <div style={{ padding: '72px 5.5%' }}>
        {/* SERVICES GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            marginBottom: 72,
          }}
        >
          {SERVICES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '32px',
                boxShadow: '0 4px 24px rgba(7,89,76,.07)',
                border: '1px solid rgba(7,89,76,.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 16px 40px rgba(7,89,76,.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 4px 24px rgba(7,89,76,.07)';
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: `color-mix(in srgb, ${color} 12%, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                }}
              >
                <Icon size={24} />
              </div>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--navy)',
                  margin: '0',
                  letterSpacing: '-.03em',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: 13,
                  color: '#6b7f8c',
                  lineHeight: 1.75,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <div
          style={{
            background: 'var(--navy)',
            borderRadius: 24,
            padding: '50px 40px',
            color: 'white',
            marginBottom: 72,
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
              marginBottom: 14,
            }}
          >
            Why Choose Us
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 36px',
            }}
          >
            Trusted Partner for Your Electrical Needs
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 32,
            }}
          >
            {FEATURES.map(({ icon: Icon, label, text }) => (
              <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f8b446',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: 'white',
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </strong>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: 'rgba(255,255,255,.6)',
                      lineHeight: 1.65,
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '50px 40px',
            boxShadow: '0 8px 32px rgba(7,89,76,.08)',
            border: '1px solid rgba(7,89,76,.06)',
            marginBottom: 72,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              display: 'block',
              marginBottom: 14,
            }}
          >
            Process
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: 'var(--navy)',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 36px',
            }}
          >
            How to get started
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24,
            }}
          >
            {[
              { step: '1', title: 'Contact us', text: 'Reach out via phone, WhatsApp, or email with your requirements' },
              { step: '2', title: 'Share details', text: 'Tell us what you need, your project scope, and timeline' },
              { step: '3', title: 'Get a quote', text: 'Receive competitive pricing and availability confirmation' },
              { step: '4', title: 'Place order', text: 'Finalize your order and arrange delivery at your convenience' },
            ].map(({ step, title, text }) => (
              <div key={step}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--orange)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  {step}
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    margin: '0 0 8px',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: '#6b7f8c',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div
          style={{
            background: 'linear-gradient(135deg, #07594c, #0d9488)',
            borderRadius: 24,
            padding: '50px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              border: '1px solid rgba(245,158,11,.2)',
              right: -60,
              top: -60,
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#f8b446',
                display: 'block',
                marginBottom: 14,
              }}
            >
              Ready to get started?
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(26px, 3vw, 42px)',
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-.04em',
                margin: '0 0 16px',
              }}
            >
              Let's help you find the right products
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,.7)',
                fontSize: 14,
                margin: '0 0 28px',
                lineHeight: 1.7,
              }}
            >
              Reach out today and let our team guide you through every step of your project.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="tel:6377374179"
                className="button button-orange"
              >
                Call us now
              </a>
              <Link to="/contact" className="button" style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.22)' }}>
                Send inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
