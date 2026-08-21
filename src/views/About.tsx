import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Users,
  Zap,
  Target,
  Heart,
  CheckCircle,
  TrendingUp,
  MapPin,
} from 'lucide-react';

const CORE_VALUES = [
  {
    icon: Award,
    title: 'Quality First',
    desc: 'We source premium electrical products from trusted manufacturers ensuring reliability and longevity.',
    color: 'var(--orange)',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    desc: 'Your needs drive our decisions. We listen, advise, and provide solutions tailored to your requirements.',
    color: '#10b981',
  },
  {
    icon: Zap,
    title: 'Technical Excellence',
    desc: 'Expert guidance on specifications, compatibility, and installation for every electrical project.',
    color: '#8b5cf6',
  },
];

const MILESTONES = [
  {
    number: '500+',
    label: 'Products in catalog',
    icon: TrendingUp,
  },
  {
    number: '10K+',
    label: 'Satisfied customers',
    icon: Heart,
  },
  {
    number: '100+',
    label: 'Contractors supported',
    icon: Users,
  },
];

const SERVICES = [
  {
    icon: Target,
    title: 'Homeowners',
    desc: 'Complete solutions for residential electrical needs, home upgrades, and maintenance projects.',
  },
  {
    icon: Zap,
    title: 'Electricians',
    desc: 'Professional-grade supplies, bulk pricing, and technical support for electrical installations.',
  },
  {
    icon: Users,
    title: 'Contractors & Builders',
    desc: 'Large-scale project support with volume discounts and dedicated account management.',
  },
];

export function About() {
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
            About Us
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
            We power electrical installations across Hyderabad
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
            JBR Electrical is your trusted partner for premium electrical products, expert guidance, and reliable support. From homeowners to contractors, we serve every project with professionalism and care.
          </p>
          <Link to="/" className="button button-orange">
            Explore Products
          </Link>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ padding: '72px 5.5%' }}>
        {/* WHO WE ARE */}
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '50px 40px',
            boxShadow: '0 8px 32px rgba(7,89,76,.08)',
            border: '1px solid rgba(7,89,76,.06)',
            marginBottom: 72,
            maxWidth: '100%',
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
            Our Story
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: 'var(--navy)',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 24px',
            }}
          >
            Who We Are
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            <div>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: 14,
                  color: '#6b7f8c',
                  lineHeight: 1.8,
                }}
              >
                JBR Electrical is a leading electrical accessories supplier based in Hyderabad, Telangana. Since our establishment, we've been committed to delivering premium electrical products and exceptional customer service to homeowners, electricians, contractors, and builders across the region.
              </p>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: 14,
                  color: '#6b7f8c',
                  lineHeight: 1.8,
                }}
              >
                Located at Syed Jung Lane, Troop Bazaar, Koti, we maintain a comprehensive inventory of electrical components, wiring accessories, switches, sockets, and specialized equipment. Our team combines technical expertise with a customer-first approach to deliver solutions that truly matter.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: '#6b7f8c',
                  lineHeight: 1.8,
                }}
              >
                Whether you're planning a home electrical installation, running a contracting business, or managing a large-scale project, JBR Electrical is here to support your success with quality products and professional guidance.
              </p>
            </div>
            <div>
              <div
                style={{
                  background: 'var(--mint)',
                  borderRadius: 16,
                  padding: '28px',
                  border: '1px solid rgba(13,148,136,.1)',
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    display: 'block',
                    marginBottom: 14,
                  }}
                >
                  Head Office
                </span>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    marginBottom: 20,
                  }}
                >
                  <MapPin size={18} style={{ color: 'var(--navy)', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--navy)',
                        marginBottom: 4,
                      }}
                    >
                      JBR Electrical
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: '#6b7f8c',
                        lineHeight: 1.7,
                      }}
                    >
                      Syed Jung Lane, Troop Bazaar, Koti<br />
                      Hyderabad, Telangana 500001<br />
                      India
                    </p>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(13,148,136,.15)', paddingTop: 20 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--navy)',
                      display: 'block',
                      marginBottom: 12,
                    }}
                  >
                    Contact
                  </span>
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: 12,
                      color: '#6b7f8c',
                    }}
                  >
                    <strong style={{ color: 'var(--navy)' }}>Phone:</strong> 6377374179
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: '#6b7f8c',
                    }}
                  >
                    <strong style={{ color: 'var(--navy)' }}>Email:</strong> jabraram8015@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CORE VALUES */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
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
              Foundation
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(28px, 3vw, 42px)',
                color: 'var(--navy)',
                lineHeight: 1.1,
                letterSpacing: '-.04em',
                margin: '0',
              }}
            >
              Our Core Values
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {CORE_VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '28px',
                  boxShadow: '0 4px 20px rgba(7,89,76,.06)',
                  border: '1px solid rgba(7,89,76,.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'transform .2s, box-shadow .2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 12px 32px rgba(7,89,76,.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 20px rgba(7,89,76,.06)';
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    margin: '0',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: '0',
                    fontSize: 12,
                    color: '#6b7f8c',
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MILESTONES */}
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
            Our Impact
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-.04em',
              margin: '0 0 40px',
            }}
          >
            By the Numbers
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 36,
            }}
          >
            {MILESTONES.map(({ number, label, icon: Icon }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f8b446',
                    margin: '0 auto 20px',
                  }}
                >
                  <Icon size={24} />
                </div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 800,
                    color: '#f8b446',
                    margin: '0 0 10px',
                    letterSpacing: '-.05em',
                  }}
                >
                  {number}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: 'rgba(255,255,255,.7)',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WHO WE SERVE */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
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
              Our Customers
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(28px, 3vw, 42px)',
                color: 'var(--navy)',
                lineHeight: 1.1,
                letterSpacing: '-.04em',
                margin: '0',
              }}
            >
              Who We Serve
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(7,89,76,.06)',
                  border: '1px solid rgba(7,89,76,.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#eaf6f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--navy)',
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    margin: '0',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: '0',
                    fontSize: 13,
                    color: '#6b7f8c',
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OUR COMMITMENT */}
        <div
          style={{
            background: 'linear-gradient(135deg, #07594c, #0d9488)',
            borderRadius: 24,
            padding: '50px 40px',
            color: 'white',
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
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
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
              Our Promise
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(26px, 3vw, 38px)',
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-.04em',
                margin: '0 0 16px',
              }}
            >
              Committed to Your Success
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,.75)',
                fontSize: 14,
                lineHeight: 1.8,
                margin: '0 0 28px',
              }}
            >
              At JBR Electrical, we're not just a supplier—we're your partner in every electrical project. We invest in quality products, expert knowledge, and responsive service because your success is our success. Whether you're a homeowner, electrician, or contractor, we're here to support your goals with integrity and professionalism.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                className="button button-orange"
              >
                Get in Touch <ArrowRight size={14} />
              </Link>
              <Link
                to="/"
                className="button"
                style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.22)' }}
              >
                Browse Products <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
