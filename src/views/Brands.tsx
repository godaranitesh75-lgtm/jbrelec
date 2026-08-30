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
} from 'lucide-react';
import { CATALOGUE } from '../data/catalogueData.ts';

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
    name: 'Havells',
    category: 'Electrical Solutions',
    description: 'Leading manufacturer of switches, fans, lighting, and electrical equipment for homes and industries.',
    image: 'https://www.havells.com/static/images/havells-logo.png',
    categories: [1, 2, 9, 10, 11],
  },
  {
    name: 'Anchor',
    category: 'Switches & Wiring',
    description: 'Premium Indian brand known for durable switches, sockets, and electrical accessories.',
    image: 'https://www.anchorworld.com/images/logo.png',
    categories: [1, 2],
  },
  {
    name: 'Legrand',
    category: 'Wiring Devices',
    description: 'Global brand offering high-quality modular switches and installation components.',
    image: 'https://www.legrand.co.in/sites/default/files/logo.png',
    categories: [1, 2],
  },
  {
    name: 'Polycab',
    category: 'Wires & Cables',
    description: 'Trusted cable and wiring solutions with extensive distribution and service network.',
    image: 'https://www.polycab.com/assets/images/logo.png',
    categories: [3, 15],
  },
  {
    name: 'Finolex',
    category: 'Cables & Pipes',
    description: 'Popular brand for electrical cables, PVC pipes, and fittings across India.',
    image: 'https://www.finolex.com/images/logo.png',
    categories: [3, 15],
  },
  {
    name: 'Crompton',
    category: 'Fans & Lighting',
    description: 'Premium fans and lighting products engineered for performance and durability.',
    image: 'https://www.crompton.in/images/logo.png',
    categories: [9, 10],
  },
  {
    name: 'Syska',
    category: 'LED & Lighting',
    description: 'Energy-efficient lighting solutions with advanced technology and design.',
    image: 'https://www.syska.com/images/logo.png',
    categories: [10],
  },
  {
    name: 'RayVolt',
    category: 'MCBs & Distribution',
    description: 'Specializes in miniature circuit breakers and distribution boards for electrical safety.',
    image: '/assets/images/rayvolt-mcb-box.svg',
    categories: [4, 12],
  },
  {
    name: 'Girish',
    category: 'Installation Boxes',
    description: 'Quality electrical boxes and enclosures for neat, professional installations.',
    featured: true,
    image: '/assets/images/girish-doorbell-box.svg',
    categories: [5],
  },
  {
    name: 'Orient Electric',
    category: 'Fans & Appliances',
    description: 'Trusted Indian brand for fans, lighting, and home appliances with wide service network.',
    image: 'https://www.orientelectric.com/images/logo.png',
    categories: [9, 10],
  },
  {
    name: 'Bajaj Electricals',
    category: 'Lighting & Appliances',
    description: 'Iconic brand offering lighting, fans, and home appliances with nationwide presence.',
    image: 'https://www.bajajelectricals.com/images/logo.png',
    categories: [9, 10],
  },
  {
    name: 'Wipro',
    category: 'LED Lighting',
    description: 'Leading LED lighting brand with innovative and energy-efficient illumination solutions.',
    image: 'https://www.wiprolighting.com/images/logo.png',
    categories: [10],
  },
];

const BRAND_PRODUCTS: Record<string, string[]> = {};
FEATURED_BRANDS.forEach((brand) => {
  const items: string[] = [];
  brand.categories.forEach((catId) => {
    const category = CATALOGUE.find((c) => c.id === catId);
    if (category) {
      items.push(...category.items.slice(0, 6));
    }
  });
  BRAND_PRODUCTS[brand.name] = items.slice(0, 8);
});

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
    <main>
      {/* ── HERO SECTION ── */}
      <section className="brands-hero">
        <div className="brands-hero-orb" aria-hidden />
        <div className="brands-hero-inner">
          <span className="brands-hero-eyebrow"><span className="brands-hero-eyebrow-line" /> Trusted Brands</span>
          <h1>Premium brands you can rely on</h1>
          <p>We partner with leading electrical brands selected for durability, reliability, and proven performance. Every product is backed by quality assurance and local service support.</p>
          <Link to="/" className="button button-orange">Explore Products</Link>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="brands-main">
        {/* BRAND CATEGORIES */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
            <span className="brands-panel-kicker">What We Stock</span>
            <h2>Brand Categories</h2>
          </div>
          <div className="brand-category-grid">
            {BRAND_CATEGORIES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="brand-category-card">
                <div className="brand-category-icon" style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY OUR BRANDS */}
        <div className="brands-panel">
          <span className="brands-panel-kicker">Our Approach</span>
          <h2>Why We Choose These Brands</h2>
          <div className="brands-benefits-grid">
            {WHY_OUR_BRANDS.map(({ number, title, desc }) => (
              <div key={number} className="brand-benefit-item">
                <div className="brand-benefit-number">{number}</div>
                <div>
                  <strong style={{ fontSize: 12, color: 'var(--navy)', display: 'block' }}>{title}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7f8c', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BRAND BENEFITS */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
            <span className="brands-panel-kicker">Promise</span>
            <h2>Brand Quality Guarantee</h2>
          </div>
          <div className="brands-benefits-grid">
            {BRAND_BENEFITS.map(({ icon: Icon, label, text }) => (
              <div key={label} className="brand-category-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div className="brand-category-icon" style={{ background: 'white', color: 'var(--navy)', margin: '0 auto 12px' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: 13 }}>{label}</h3>
                <p style={{ fontSize: 11 }}>{text}</p>
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
            {FEATURED_BRANDS.map(({ name, category, description, featured, image }) => (
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
                <div style={{ width: '100%', height: 120, borderRadius: 12, overflow: 'hidden', marginBottom: 16, background: '#f4f8f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={image}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const sibling = target.nextSibling as HTMLElement;
                      if (sibling) sibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0fdfa, #eaf6f3)', fontSize: 32, fontWeight: 900, color: 'var(--navy)', fontFamily: "'Manrope', sans-serif" }}>
                    {name.charAt(0)}
                  </div>
                </div>
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

        {/* PRODUCTS BY BRAND */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 36 }}>
            <span className="brands-panel-kicker">Catalog</span>
            <h2>Products by Brand</h2>
          </div>
          <div style={{ display: 'grid', gap: 32 }}>
            {FEATURED_BRANDS.map(({ name, category, image }) => {
              const products = BRAND_PRODUCTS[name] || [];
              if (products.length === 0) return null;
              return (
                <div key={name} style={{ background: 'white', borderRadius: 20, padding: '28px 32px', border: '1px solid var(--line)', boxShadow: '0 4px 20px rgba(7,89,76,.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', background: '#f4f8f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '0 0 4px' }}>{name}</h3>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{category}</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                    {products.map((product) => (
                      <div key={product} style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e8f0ee', background: '#f8fbfa', fontSize: 12, color: '#3d5260', lineHeight: 1.4 }}>
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
