import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lightbulb,
  Zap,
  Award,
  Shield,
  Truck,
  CheckCircle,
  Star,
  TrendingUp,
} from 'lucide-react';

const BRAND_CATEGORIES = [
  {
    icon: Zap,
    title: 'Switches & Sockets',
    desc: 'Premium wiring accessories from established brands trusted by electricians and contractors for everyday installations.',
    color: 'var(--navy)',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Solutions',
    desc: 'Fixture-grade lighting products with consistent build quality, performance, and reliable after-sales support.',
    color: '#f59e0b',
  },
  {
    icon: Award,
    title: 'Installation Components',
    desc: 'Boxes, conduits, clamps, connectors, and cable management solutions from trusted manufacturers.',
    color: '#10b981',
  },
];

const BRAND_BENEFITS = [
  {
    icon: Shield,
    label: 'Quality Assured',
    text: 'Every brand meets our rigorous quality standards',
  },
  {
    icon: Truck,
    label: 'Always in Stock',
    text: 'Reliable availability for your immediate needs',
  },
  {
    icon: CheckCircle,
    label: 'Warranty Support',
    text: 'Full manufacturer warranties and local service',
  },
  {
    icon: Star,
    label: 'Expert Verified',
    text: 'Selected by electricians and professionals',
  },
];

const FEATURED_BRANDS = [
  {
    name: 'Anchor',
    category: 'Switches & Wiring',
    description: 'Premium Indian brand known for durable switches, sockets, and electrical accessories.',
  },
  {
    name: 'Havells',
    category: 'Electrical Solutions',
    description: 'Leading manufacturer of switches, fans, lighting, and electrical equipment for homes and industries.',
  },
  {
    name: 'Legrand',
    category: 'Wiring Devices',
    description: 'Global brand offering high-quality modular switches and installation components.',
  },
  {
    name: 'Polycab',
    category: 'Wires & Cables',
    description: 'Trusted cable and wiring solutions with extensive distribution and service network.',
  },
  {
    name: 'RayVolt',
    category: 'MCBs & Distribution',
    description: 'Specializes in miniature circuit breakers and distribution boards for electrical safety.',
  },
  {
    name: 'Crompton',
    category: 'Fans & Lighting',
    description: 'Premium fans and lighting products engineered for performance and durability.',
  },
  {
    name: 'Girish',
    category: 'Installation Boxes',
    description: 'Quality electrical boxes and enclosures for neat, professional installations.',
    featured: true,
  },
  {
    name: 'Syska',
    category: 'LED & Lighting',
    description: 'Energy-efficient lighting solutions with advanced technology and design.',
  },
];

const WHY_OUR_BRANDS = [
  {
    number: '01',
    title: 'Handpicked Selection',
    desc: 'We carefully select brands based on durability, performance, warranty support, and local availability to ensure you get the best value.',
  },
  {
    number: '02',
    title: 'Trusted by Professionals',
    desc: 'Our brand portfolio is curated by experienced electricians and contractors who rely on these products daily.',
  },
  {
    number: '03',
    title: 'Local Support',
    desc: 'All our brands have service centers and warranty support in Hyderabad for hassle-free maintenance and replacement.',
  },
  {
    number: '04',
    title: 'Competitive Pricing',
    desc: 'We offer direct pricing from brands with volume discounts available for bulk and contractor orders.',
  },
];

export function Brands() {
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
            Trusted Brands
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
            Premium brands you can rely on
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
            We partner with leading electrical brands selected for durability, reliability, and proven performance. Every product is backed by quality assurance and local service support.
          </p>
          <Link to="/" className="button button-orange">
            Explore Products
          </Link>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ padding: '72px 5.5%' }}>
        {/* BRAND CATEGORIES */}
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
              What We Stock
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
              Brand Categories
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {BRAND_CATEGORIES.map(({ icon: Icon, title, desc, color }) => (
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
                    width: 48,
                    height: 48,
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

        {/* WHY OUR BRANDS */}
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
            Our Approach
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
            Why We Choose These Brands
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            {WHY_OUR_BRANDS.map(({ number, title, desc }) => (
              <div key={number} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: 'var(--orange)',
                    fontFamily: "'Manrope', sans-serif",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {number}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 14,
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
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BRAND BENEFITS */}
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
              Promise
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
              Brand Quality Guarantee
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
            }}
          >
            {BRAND_BENEFITS.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                style={{
                  background: '#f0fdfa',
                  borderRadius: 16,
                  padding: '20px',
                  border: '1px solid rgba(13,148,136,.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--navy)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    margin: '0',
                  }}
                >
                  {label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: '#6b7f8c',
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED BRANDS */}
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
              Catalog
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
              Featured Brands We Stock
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {FEATURED_BRANDS.map(({ name, category, description, featured }) => (
              <div
                key={name}
                style={{
                  background: featured ? 'linear-gradient(135deg, #f0fdfa, #eaf6f3)' : 'white',
                  borderRadius: 16,
                  padding: '24px',
                  boxShadow: featured ? '0 8px 24px rgba(13,148,136,.12)' : '0 2px 12px rgba(7,89,76,.05)',
                  border: featured ? '2px solid var(--navy)' : '1px solid rgba(7,89,76,.06)',
                  position: 'relative',
                }}
              >
                {featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'var(--orange)',
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 8,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Featured
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    margin: '0 0 6px',
                  }}
                >
                  {name}
                </h3>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--orange)',
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  {category}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: '#6b7f8c',
                    lineHeight: 1.7,
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
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
              Next Step
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
              Explore our full product range
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,.75)',
                fontSize: 14,
                lineHeight: 1.8,
                margin: '0 0 28px',
              }}
            >
              Discover the complete catalog of premium electrical products from our trusted brand partners. Browse by category or get personalized recommendations for your specific needs.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/"
                className="button button-orange"
              >
                Browse Products <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="button"
                style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.22)' }}
              >
                Ask for a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
