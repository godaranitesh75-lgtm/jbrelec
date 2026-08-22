import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleCheck,
  FileText,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from './auth.tsx';
import api from './api.ts';

const heroImage = 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const categories = [
  { name: 'General Electrical Accessories', short: 'Everyday essentials', icon: Zap, tone: 'blue' },
  { name: 'Wiring Accessories', short: 'Reliable installations', icon: Boxes, tone: 'orange' },
  { name: 'Switches & Sockets', short: 'Control & connection', icon: SlidersHorizontal, tone: 'green' },
  { name: 'Pipe Accessories', short: 'Neat cable routing', icon: Wrench, tone: 'navy' },
  { name: 'Fans & Appliances', short: 'Comfort at home', icon: Sparkles, tone: 'sand' },
  { name: 'Tools & Safety', short: 'Built for the job', icon: ShieldCheck, tone: 'blue' },
];

const galleryProducts = [
  { name: 'Girish Doorbell Box', image: '/assets/images/girish-doorbell-box.svg', details: 'Premium ABS doorbell enclosure for clean wiring and easy installation.' },
  { name: 'RayVolt MCB Box', image: '/assets/images/rayvolt-mcb-box.svg', details: 'Metal-backed MCB box for compact distribution board installations.' },
  { name: 'Round Ceiling Speaker', image: '/assets/images/round-ceiling-speaker.svg', details: 'Circular designer speaker cover for false ceilings and recessed wiring.' },
  { name: '3 Pin Plug', image: '/assets/images/three-pin-plug.svg', details: 'Heavy-duty 3-pin plug with brass terminals for reliable power connection.' },
  { name: 'Bayonet Holder', image: '/assets/images/bayonet-holder.svg', details: 'Standard bayonet lamp holder suitable for residential lighting.' },
  { name: 'Multi Plug Adapter', image: '/assets/images/multi-plug-adapter.svg', details: '3-way adapter for powering multiple devices from a single outlet.' },
  { name: 'Metal Conduit', image: '/assets/images/metal-conduit.svg', details: 'Flexible conduit for protecting electrical wiring runs.' },
  { name: 'Color Bulb Set', image: '/assets/images/color-bulb-set.svg', details: 'Decorative color bulbs for festive and accent lighting.' },
  { name: 'Pliers', image: '/assets/images/pliers.svg', details: 'Utility pliers for cutting, gripping and bending wires safely.' },
  { name: 'Capacitor 1.5uF', image: '/assets/images/capacitor-1-5uf.svg', details: 'Motor-run capacitor rated for 440VAC and high temperature operation.' },
  { name: 'Classic 2 Pin Plug Top', image: '/assets/images/classic-2-pin-plug-top.svg', details: 'Compact 2-pin plug top with brass pin inserts.' },
  { name: 'Screwdriver Set', image: '/assets/images/screwdriver-set.svg', details: 'Insulated screwdriver set for everyday electrical work.' },
];

const whatsappPhone = '916377374179';
const phoneNumber = '6377374179';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navItems = [
    { label: 'Products', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Brands', to: '/brands' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
  ];
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteRequirement, setQuoteRequirement] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof galleryProducts[number] | null>(null);
  const [buying, setBuying] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredCategories = useMemo(() => categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()) || category.short.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent('JBR Electrical — New Quote Enquiry');
    const body = encodeURIComponent(
      `JBR Electrical Enquiry\n\nName: ${quoteName || 'N/A'}\nPhone: ${quotePhone || 'N/A'}\nRequirement: ${quoteRequirement || 'N/A'}`
    );

    window.location.href = `mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const openProduct = (product: typeof galleryProducts[number]) => {
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="site-shell">
      <div className="announcement"><span><Zap size={13} fill="currentColor" /> Quality electrical products <i /> Reliable service <i /> Easy enquiry</span><span className="announcement-location">JBR Electrical, Syed Jung Lane, Troop Bazaar, Koti, Hyderabad</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JBR Electrical home">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Manrope', sans-serif" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.05em' }}>
              JBR <span style={{ color: 'var(--orange)' }}>ELECTRICAL</span>
            </div>
          </div>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions"><button className="icon-button" aria-label="Search" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}><Search size={18} /></button><Link className="button button-navy small" to="/login">Login</Link><a className="whatsapp-link" href="https://wa.me/916377374179" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a><button className="button button-orange small" onClick={() => setQuoteOpen(true)}>Get a quote <ArrowRight size={16} /></button></div>
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      {/* ── SITE NOTICE ── */}
      <div style={{
        position: 'sticky',
        top: 82,
        zIndex: 19,
        background: '#f59e0b',
        borderBottom: '2px solid #d97706',
        padding: '10px 5.5%',
        textAlign: 'center',
        color: '#1c1917',
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <span>
          🚧 <strong>Website under development.</strong> Full version launching <strong>1st November 2026.</strong> For any inquiry — product availability or pricing — contact us via:
        </span>
        <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="https://wa.me/916377374179" target="_blank" rel="noreferrer" style={{ background: '#07594c', color: 'white', padding: '4px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>WhatsApp</a>
          <a href="tel:6377374179" style={{ background: '#07594c', color: 'white', padding: '4px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>Call</a>
          <a href="mailto:jabraram8015@gmail.com" style={{ background: '#07594c', color: 'white', padding: '4px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>Email</a>
        </span>
      </div>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> JBR ELECTRICAL <span className="eyebrow-dot" /></div>
            <h1>Powering every connection with <em>quality</em> you can trust.</h1>
            <p className="hero-lede">Reliable electrical products, accessories and solutions for homes, businesses, electricians and projects.</p>
            <div className="hero-actions"><a className="button button-navy" href="#products">Explore products <ArrowRight size={17} /></a><button className="button button-outline" onClick={() => setQuoteOpen(true)}>Get a quote</button></div>
            <div className="hero-login-buttons">
              <Link className="button button-orange" to="/login">Customer Login</Link>
            </div>
            <div className="hero-note"><BadgeCheck size={18} /> <span>Product availability and pricing may vary. <strong>Ask JBR for current details.</strong></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-grid-pattern" />
            <div className="hero-image-wrap"><img src={heroImage} alt="Organized electrical wiring and control components" /></div>
            <div className="hero-product-card"><div className="product-card-icon"><ShieldCheck size={20} /></div><div><strong>Built for real work</strong><span>Products selected for everyday reliability</span></div></div>
            <div className="hero-stamp"><span>JBR</span><small>Electrical<br />partner</small></div>
          </div>
        </section>

        <section className="category-section" id="products"><div className="section-heading"><div><div className="section-kicker">PRODUCT DISCOVERY</div><h2>Everything you need,<br /><span>in one place.</span></h2></div><div className="catalog-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or categories..." aria-label="Search products or categories" /></div></div><div className="category-grid">{filteredCategories.map(({ name, short, icon: Icon, tone }) => <article className={`category-card ${tone}`} key={name}><div className="category-card-top"><span className="category-number">0{filteredCategories.indexOf(categories.find((category) => category.name === name)!) + 1}</span><Icon size={25} /></div><h3>{name}</h3><p>{short}</p><button className="card-arrow" aria-label={`View ${name}`}><ArrowUpRightIcon /></button></article>)}{filteredCategories.length === 0 && <div className="empty-search"><Search size={28} /><h3>Couldn't find exactly that?</h3><p>Ask JBR to help identify or source the right product.</p><button className="text-link" onClick={() => setQuoteOpen(true)}>Ask JBR <ArrowRight size={17} /></button></div>}</div><div className="catalog-footer"><span>Showing categories that make sourcing simpler.</span><a className="text-link" href="#gallery">View all products <ArrowRight size={17} /></a></div></section>

        <section className="gallery-section" id="gallery">
          <div className="section-heading"><div><div className="section-kicker">PRODUCT GALLERY</div><h2>Shop the full range<br /><span>with product details.</span></h2></div><p className="section-intro">Tap any item to see the full description and technical details directly in the app.</p></div>
          <div className="gallery-grid">
            {galleryProducts.map((product) => (
              <article className="gallery-card" key={product.name} onClick={() => openProduct(product)}>
                <div className="gallery-image"><img src={product.image} alt={product.name} /></div>
                <div className="gallery-copy"><strong>{product.name}</strong><p>{product.details}</p></div>
              </article>
            ))}
          </div>
          <div className="gallery-note">Click any product to open more information.</div>
        </section>

      </main>

<footer className="footer"><div className="footer-main"><div><div style={{ fontSize: 20, fontWeight: 900, color: 'white', letterSpacing: '-.05em', marginBottom: 16, fontFamily: "'Manrope', sans-serif" }}>JBR <span style={{ color: 'var(--orange)' }}>ELECTRICAL</span></div><p>Reliable electrical products and support for homes, businesses, electricians and projects.</p></div><div className="footer-col"><span>Explore</span><a href="/about">About JBR</a><a href="#products">Products</a><a href="/services">Why JBR</a></div><div className="footer-col"><span>Need help?</span><a href="/quote">Request a quote</a><a href="https://wa.me/916377374179" target="_blank" rel="noreferrer">WhatsApp JBR</a><a href="/contact">Contact us</a></div><div className="footer-col"><span>Head office</span><strong>JBR Electrical</strong><small>Syed Jung Lane, Troop Bazaar, Koti, Hyderabad, Telangana 500001</small></div></div><div className="footer-bottom">
  <span>© JBR Electrical. All rights reserved.</span>
  <span>
    Built by{' '}
    <a href="https://www.linkedin.com/in/vijay----ramdev/" target="_blank" rel="noreferrer" style={{ color: '#d9e6f4', textDecoration: 'underline' }}>@vijay----ramdev</a>
    {' '}&amp;{' '}
    <a href="https://www.linkedin.com/in/nitesh-godara-4473b037a" target="_blank" rel="noreferrer" style={{ color: '#d9e6f4', textDecoration: 'underline' }}>Nitesh Godara</a>
  </span>
  <div className="footer-small-note">Delivery partner? <a href="/deliveryboy/login">Login here</a></div>
</div></footer>

      <div className="mobile-bar"><a href={`tel:${phoneNumber}`}><PhoneIcon /> Call</a><a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a><button onClick={() => setQuoteOpen(true)}><FileText size={18} /> Get quote</button></div>
      {quoteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setQuoteOpen(false); }}><div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title"><button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close"><X size={20} /></button>{submitted ? <div className="success-state"><div className="success-icon"><CircleCheck size={28} /></div><h2>Requirement received.</h2><p>Thank you. JBR will review your request and get back to you with the next step.</p><button className="button button-navy" onClick={() => { setQuoteOpen(false); setSubmitted(false); }}>Done</button></div> : <><div className="section-kicker">QUICK ENQUIRY</div><h2 id="quote-title">Tell us what you need.</h2><p className="modal-subtitle">Share a few details and JBR will help you move forward.</p><form onSubmit={submitQuote}>
                <label>Name<input required value={quoteName} onChange={(event) => setQuoteName(event.target.value)} placeholder="Your name" /></label>
                <label>Phone number<input required type="tel" value={quotePhone} onChange={(event) => setQuotePhone(event.target.value)} placeholder="Your phone number" /></label>
                <label>What are you looking for?<textarea required value={quoteRequirement} onChange={(event) => setQuoteRequirement(event.target.value)} placeholder="Product, category or requirement" rows={3} /></label>
                <button className="button button-orange" type="submit">Get my quotation <ArrowRight size={17} /></button>
              </form></>}</div></div>}
      {selectedProduct && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeProduct(); }}><div className="product-detail-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title"><button className="modal-close" onClick={closeProduct} aria-label="Close"><X size={20} /></button><div className="detail-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div><div className="detail-copy"><div className="section-kicker">PRODUCT DETAIL</div><h2 id="product-detail-title">{selectedProduct.name}</h2><p>{selectedProduct.details}</p><div className="detail-actions"><button className="button button-navy" onClick={() => { setQuoteOpen(true); closeProduct(); }}>Enquire about this product</button><button className="button button-orange" onClick={async () => {
                if (!user) {
                  navigate('/login');
                  return;
                }
                if (!selectedProduct) return;
                try {
                  setBuying(true);
                  const addrRes = await api.get<Array<{ id: string }>>('/api/account/addresses');
                  const addresses = addrRes.data;
                  if (!addresses || addresses.length === 0) {
                    setBuying(false);
                    if (confirm('No shipping address found. Add one now?')) navigate('/account');
                    return;
                  }
                  const shippingAddressId = addresses[0].id;
                  const prodRes = await api.get<{ products: Array<{ id: string }> }>(`/api/products?search=${encodeURIComponent(selectedProduct.name)}`);
                  const found = prodRes.data && prodRes.data.products && prodRes.data.products.length ? prodRes.data.products[0] : null;
                  const productId = found?.id ?? null;
                  if (!productId) {
                    setBuying(false);
                    alert('Unable to resolve product id for quick-order. Please add to cart instead.');
                    return;
                  }
                  await api.post('/api/orders', { shippingAddressId, items: [{ productId, quantity: 1 }] });
                  setBuying(false);
                  alert('Order placed. View your orders in your account.');
                  navigate('/account/orders');
                } catch (err: unknown) {
                  setBuying(false);
                  if (err instanceof Error) {
                    alert(err.message);
                  } else {
                    alert('Failed to place order');
                  }
                }
              }}>{buying ? 'Ordering...' : 'Order now'}</button><button className="button button-outline" onClick={closeProduct}>Close</button></div></div></div></div>}
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={18} />; }
function PhoneIcon() { return <Phone size={18} />; }

export default App;



