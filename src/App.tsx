import { Link } from 'react-router-dom';
import { useState, useEffect, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  FileText,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  X,
  Zap,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { GlobalSearchProvider, useGlobalSearch } from './contexts/GlobalSearchContext.tsx';

const heroImage = 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export interface CategoryItem {
  id: number;
  name: string;
  items: Product[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  specification: string;
  size: string;
  unit: string;
  price: string;
  gst: string;
  stock: string;
  images: string[];
  description: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 1, name: 'Wires, Cables & Wiring Accessories', items: [] },
  { id: 2, name: 'Switches, Sockets & Modular', items: [] },
  { id: 3, name: 'Lighting & Fans', items: [] },
  { id: 4, name: 'MCB, Protection & Distribution', items: [] },
  { id: 5, name: 'Switchgear, Control & Automation', items: [] },
  { id: 6, name: 'Earthing & Electrical Safety', items: [] },
  { id: 7, name: 'Tools & Testing Instruments', items: [] },
  { id: 8, name: 'Motors, Capacitors & Industrial', items: [] },
  { id: 9, name: 'Power Backup, Solar & Batteries', items: [] },
  { id: 10, name: 'Smart, Security & Communication', items: [] },
];

const whatsappPhone = '916377374179';
const phoneNumber = '6377374179';

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured;

  return 'https://jbrelec.onrender.com/api';
};

const API_BASE = getApiBaseUrl();

function AppInner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { query, setQuery } = useGlobalSearch();
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteRequirement, setQuoteRequirement] = useState('');
  const [quoteAddress, setQuoteAddress] = useState('');
  const [quoteShopTime, setQuoteShopTime] = useState('');

  const [cart, setCart] = useState<{ item: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryShopTime, setDeliveryShopTime] = useState('');
  const [deliveryError, setDeliveryError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/products?limit=3000`)
      .then((res) => {
        console.log('[App] products fetch status', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('[App] products fetch data', data);
        const mapped: Product[] = (data.products || []).map((p: { id: string; name: string; brand?: { name: string }; sku?: string; description?: string; specifications?: Record<string, unknown>; price?: number; stock?: number; images?: string[] }) => ({
          id: p.id,
          name: p.name,
          brand: p.brand?.name || '',
          model: p.sku || '',
          specification: p.specifications ? JSON.stringify(p.specifications) : '',
          size: '',
          unit: '',
          price: String(p.price ?? ''),
          gst: '',
          stock: String(p.stock ?? ''),
          images: p.images || [],
          description: p.description || '',
        }));
        console.log('[App] mapped products', mapped);
        setDbProducts(mapped);
      })
      .catch((err) => {
        console.error('Failed to load products', err);
      });
  }, []);

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  function addToCart(item: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item === item);
      if (existing) return prev.map((c) => c.item === item ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  }

  function decreaseQty(item: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item === item);
      if (!existing) return prev;
      if (existing.qty <= 1) return prev.filter((c) => c.item !== item);
      return prev.map((c) => c.item === item ? { ...c, qty: c.qty - 1 } : c);
    });
  }

  function removeFromCart(item: string) {
    setCart((prev) => prev.filter((c) => c.item !== item));
  }

  function getQty(item: string) {
    return cart.find((c) => c.item === item)?.qty ?? 0;
  }

  function setQty(item: string, value: number) {
    const qty = Math.max(0, Number(value) || 0);
    setCart((prev) => {
      const existing = prev.find((c) => c.item === item);
      if (!existing) {
        if (qty <= 0) return prev;
        return [...prev, { item, qty }];
      }
      if (qty <= 0) return prev.filter((c) => c.item !== item);
      return prev.map((c) => c.item === item ? { ...c, qty } : c);
    });
  }

  function sendEnquiry() {
    if (!deliveryName.trim() || !deliveryPhone.trim() || !deliveryAddress.trim() || !deliveryShopTime.trim()) {
      setDeliveryError('Please fill all delivery details: name, mobile number, address, and shop opening time.');
      return;
    }
    setDeliveryError('');
    const subject = encodeURIComponent('JBR Electrical — Product Enquiry / Order');
    const body = encodeURIComponent(
      `JBR Electrical — Product Enquiry\n\nItems I am interested in:\n${cart.map((c, idx) => `${idx + 1}. ${c.item}  x${c.qty}`).join('\n')}\n\nDelivery Details:\nName: ${deliveryName || 'N/A'}\nMobile: ${deliveryPhone || 'N/A'}\nAddress: ${deliveryAddress || 'N/A'}\nShop Opening Time: ${deliveryShopTime || 'N/A'}\n\nPlease share availability and pricing.`
    );
    window.open(`mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`);
  }

  async function whatsappEnquiry() {
    if (!deliveryName.trim() || !deliveryPhone.trim() || !deliveryAddress.trim() || !deliveryShopTime.trim()) {
      setDeliveryError('Please fill all delivery details: name, mobile number, address, and shop opening time.');
      return;
    }
    setDeliveryError('');
    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const text = encodeURIComponent(
      `Hello JBR Electrical,\n\nI have placed an order request with ${cart.length} items (${totalItems} units).\n\nPlease see the attached PDF for the complete list.\n\nDelivery Details:\nName: ${deliveryName || 'N/A'}\nMobile: ${deliveryPhone || 'N/A'}\nAddress: ${deliveryAddress || 'N/A'}\nShop Opening Time: ${deliveryShopTime || 'N/A'}\n\nI will call to confirm this order.`
    );
    const { generateOrderPdf } = await import('./utils/pdfGenerator.ts');
    await generateOrderPdf(cart, phoneNumber);
    window.open(`https://wa.me/916377374179?text=${text}`);
  }

  function openProductDetail(product: Product) {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  }

  function closeProductDetail() {
    setProductDetailOpen(false);
    setSelectedProduct(null);
  }

  const navItems = [
    { label: 'Products', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: 'About', to: '/about' },
    { label: 'Brands', to: '/brands' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
  ];

  const openQuoteModal = () => {
    setSubmitted(false);
    setQuoteName('');
    setQuotePhone('');
    setQuoteRequirement('');
    setQuoteAddress('');
    setQuoteShopTime('');
    setQuoteOpen(true);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent('JBR Electrical — New Quote Enquiry');
    const body = encodeURIComponent(
      `JBR Electrical Enquiry\n\nName: ${quoteName || 'N/A'}\nPhone: ${quotePhone || 'N/A'}\nDelivery Address: ${quoteAddress || 'N/A'}\nShop Opening Time: ${quoteShopTime || 'N/A'}\nRequirement: ${quoteRequirement || 'N/A'}`
    );

    window.location.href = `mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <div style={{ background: 'var(--navy)', color: 'white', textAlign: 'center', padding: '10px 18px', fontSize: 13, lineHeight: 1.5 }}>
        <strong>🚀 Full version launching 1st November 2026.</strong> For any inquiry, contact us on <a href="tel:6377374179" style={{ color: '#fbbf24', textDecoration: 'underline' }}>6377374179</a> or <a href="https://wa.me/916377374179" target="_blank" rel="noreferrer" style={{ color: '#fbbf24', textDecoration: 'underline' }}>WhatsApp</a>.
      </div>
      <div className="announcement"><span><Zap size={13} fill="currentColor" /> Quality electrical products <i /> Reliable service <i /> Easy enquiry</span><span className="announcement-location">JBR Electrical, Syed Jung Ln, Troop Bazaar, Koti, Hyderabad, Telangana 500001</span></div>
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
        <div className="header-actions">
          <a className="whatsapp-link" href="https://wa.me/916377374179" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
          <Link className="button button-orange small" to="/quote">Get a quote <ArrowRight size={16} /></Link>
        </div>
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> JBR ELECTRICAL <span className="eyebrow-dot" /></div>
            <h1>Powering every connection with <em>quality</em> you can trust.</h1>
            <p className="hero-lede">Reliable electrical products, accessories and solutions for homes, businesses, electricians and projects.</p>
            <div className="hero-note"><BadgeCheck size={18} /> <span>Product availability and pricing may vary. <strong>Ask JBR for current details.</strong></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-grid-pattern" />
            <div className="hero-image-wrap"><img src={heroImage} alt="Organized electrical wiring and control components" /></div>
            <div className="hero-product-card"><div className="product-card-icon"><ShieldCheck size={20} /></div><div><strong>Built for real work</strong><span>Products selected for everyday reliability</span></div></div>
            <div className="hero-stamp"><span>JBR</span><small>Electrical<br />partner</small></div>
          </div>
        </section>

        {/* ALL PRODUCTS SECTION */}
        <section className="products-section">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-eyebrow"><span className="section-eyebrow-line" /> ALL PRODUCTS</div>
              <h2 className="section-heading" style={{ textAlign: 'center', display: 'block' }}>Complete product list</h2>
              <p className="section-subtitle">
                All items across every category. Add to cart and send us an enquiry in one click.
              </p>
            </div>
            <div className="products-search" style={{ marginBottom: 24 }}>
              <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
                <input
                  type="search"
                  placeholder="Search products..."
                  aria-label="Search products"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    borderRadius: 8,
                    border: '1.5px solid #e2eaed',
                    background: 'white',
                    fontSize: 14,
                    color: 'var(--navy)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8a9aa5', pointerEvents: 'none' }} />
              </div>
            </div>
            <div className="products-grid">
              {(dbProducts.length > 0 ? dbProducts : CATEGORIES.flatMap((cat) => cat.items))
                .filter((product) => {
                  if (!query.trim()) return true;
                  const q = query.toLowerCase();
                  return (
                    product.name.toLowerCase().includes(q) ||
                    (product.description && product.description.toLowerCase().includes(q)) ||
                    (product.brand && product.brand.toLowerCase().includes(q)) ||
                    (product.model && product.model.toLowerCase().includes(q))
                  );
                })
                .map((product) => {
                const qty = getQty(product.name);
                const inCart = qty > 0;
                return (
                  <div
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    className={`product-card ${inCart ? 'product-card--active' : ''}`}
                  >
                    {product.images && product.images.length > 0 && (
                      <div className="product-card-image">
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                      <span className="product-card-name" style={{ flex: 1 }}>
                        {product.name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); decreaseQty(product.name); }}
                          disabled={qty === 0}
                          className="qty-button minus"
                          style={{ opacity: qty === 0 ? 0.4 : 1 }}
                        >
                          <Minus size={11} />
                        </button>
                        <input
                          key={`${product.id}-${product.name}-${qty}`}
                          className="qty-value"
                          type="text"
                          inputMode="numeric"
                          defaultValue={qty}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            e.currentTarget.value = val;
                          }}
                          onBlur={(e) => {
                            const val = parseInt(e.currentTarget.value) || 0;
                            setQty(product.name, val);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = parseInt((e.target as HTMLInputElement).value) || 0;
                              setQty(product.name, val);
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          style={{ width: 28, textAlign: 'center', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 800, color: 'var(--navy)', padding: 0 }}
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product.name); }}
                          className="qty-button plus"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    {(product.description || product.price) && (
                      <div className="product-card-meta">
                        {product.description && <span>{product.description}</span>}
                        {product.price && <span className="product-card-price">Price: ₹{product.price}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ENQUIRY CART MODAL */}
      {cartOpen && (
        <div className="modal-backdrop" onClick={() => setCartOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enquiry Cart ({cart.length} items)</h2>
              <button onClick={() => setCartOpen(false)} className="modal-close">✕</button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: '#6b7f8c', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>No items added yet. Browse categories and click + to add items.</p>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {cart.map(({ item, qty }) => (
                    <div key={item} className="cart-item">
                      <span className="cart-item-name">{item}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <button onClick={() => decreaseQty(item)} className="qty-button minus"><Minus size={13} /></button>
                        <input
                          key={`${item}-${qty}`}
                          className="qty-value"
                          type="text"
                          inputMode="numeric"
                          defaultValue={qty}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            e.currentTarget.value = val;
                          }}
                          onBlur={(e) => {
                            const val = parseInt(e.currentTarget.value) || 0;
                            setQty(item, val);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = parseInt((e.target as HTMLInputElement).value) || 0;
                              setQty(item, val);
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          style={{ width: 28, textAlign: 'center', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 800, color: 'var(--navy)', padding: 0 }}
                        />
                        <button onClick={() => addToCart(item)} className="qty-button plus"><Plus size={13} /></button>
                        <button onClick={() => removeFromCart(item)} style={{ height: 28, padding: '0 10px', borderRadius: 6, border: 'none', background: '#e11d48', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'white', fontSize: 11, fontWeight: 700, marginLeft: 4 }}><Trash2 size={12} /> Delete</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <span>Total items</span>
                  <span>{cart.length} product{cart.length > 1 ? 's' : ''} · {totalItems} unit{totalItems > 1 ? 's' : ''}</span>
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#344054', textTransform: 'uppercase', letterSpacing: '.12em' }}>Delivery Details</label>
                  <input value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} placeholder="Full name *" required style={{ padding: '13px 16px', border: '1.5px solid #e2eaed', borderRadius: 12, background: '#f8fbfc', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
                  <input value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} placeholder="Mobile number *" type="tel" required style={{ padding: '13px 16px', border: '1.5px solid #e2eaed', borderRadius: 12, background: '#f8fbfc', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
                  <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Delivery address *" required rows={3} style={{ padding: '13px 16px', border: '1.5px solid #e2eaed', borderRadius: 12, background: '#f8fbfc', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', width: '100%', resize: 'vertical' }} />
                  <input value={deliveryShopTime} onChange={(e) => setDeliveryShopTime(e.target.value)} placeholder="Shop opening time *" required style={{ padding: '13px 16px', border: '1.5px solid #e2eaed', borderRadius: 12, background: '#f8fbfc', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
                  {deliveryError && <p style={{ color: '#e11d48', fontSize: 12, margin: 0 }}>{deliveryError}</p>}
                </div>

                <div className="cart-actions">
                  <button onClick={whatsappEnquiry} className="button button-navy">
                    <MessageCircle size={15} /> Order Now
                  </button>
                  <button onClick={sendEnquiry} className="button button-orange">
                    <ArrowRight size={15} /> Send via Email
                  </button>
                  <button onClick={() => setCart([])} style={{ marginTop: 8, background: 'none', border: 'none', color: '#e11d48', fontSize: 12, fontWeight: 700, cursor: 'pointer', width: '100%', textAlign: 'center' }}>
                    Clear all items
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {productDetailOpen && selectedProduct && (
        <div className="modal-backdrop" onClick={closeProductDetail}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520, padding: 0, overflow: 'hidden' }}>
            {selectedProduct.images && selectedProduct.images.length > 0 && (
              <div style={{ width: '100%', background: '#f4f8f6' }}>
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )}

            <div style={{ padding: '18px 20px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: 'var(--navy)', margin: '0 0 6px', letterSpacing: '-.02em' }}>{selectedProduct.name}</h2>
                  <p style={{ margin: 0, color: '#6b7f8c', fontSize: 12 }}>{selectedProduct.description || ''}</p>
                </div>
                <button onClick={closeProductDetail} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6b7f8c', padding: 0, lineHeight: 1 }}>✕</button>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                {selectedProduct.price && <span style={{ background: '#fef3c7', padding: '4px 10px', borderRadius: 6, fontWeight: 700, color: '#92400e', fontSize: 12 }}>₹{selectedProduct.price}</span>}
              </div>

              <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                <button onClick={() => { addToCart(selectedProduct.name); closeProductDetail(); }} className="button button-navy" style={{ flex: 1, justifyContent: 'center' }}>
                  <ShoppingCart size={15} /> Add to Enquiry Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CART BUTTON */}
      {cart.length > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="floating-cart"
        >
          <ShoppingCart size={16} />
          {cart.length} product{cart.length > 1 ? 's' : ''} · {totalItems} unit{totalItems > 1 ? 's' : ''}
        </button>
      )}

      <footer className="footer"><div className="footer-main"><div><div style={{ fontSize: 20, fontWeight: 900, color: 'white', letterSpacing: '-.05em', marginBottom: 16, fontFamily: "'Manrope', sans-serif" }}>JBR <span style={{ color: 'var(--orange)' }}>ELECTRICAL</span></div><p>Reliable electrical products and support for homes, businesses, electricians and projects.</p></div><div className="footer-col"><span>Explore</span><Link to="/about">About JBR</Link><Link to="/">Products</Link><Link to="/services">Why JBR</Link></div><div className="footer-col"><span>Need help?</span><Link to="/quote">Request a quote</Link><a href="https://wa.me/916377374179" target="_blank" rel="noreferrer">WhatsApp JBR</a><Link to="/contact">Contact us</Link></div><div className="footer-col"><span>Head office</span><strong>JBR Electrical</strong><small>Syed Jung Ln, Troop Bazaar, Koti, Hyderabad, Telangana 500001</small></div></div><div className="footer-bottom">
        <span>© JBR Electrical. All rights reserved.</span>
        <span>
          Built by{' '}
          <a href="https://www.linkedin.com/in/vijay----ramdev/" target="_blank" rel="noreferrer" style={{ color: '#d9e6f4', textDecoration: 'underline' }}>@vijay----ramdev</a>
          {' '}&amp;{' '}
          <a href="https://www.linkedin.com/in/nitesh-godara-4473b037a" target="_blank" rel="noreferrer" style={{ color: '#d9e6f4', textDecoration: 'underline' }}>Nitesh Godara</a>
        </span>
        <div className="footer-small-note">Need delivery status updates? Contact us on WhatsApp.</div>
      </div></footer>

      <div className="mobile-bar"><a href={`tel:${phoneNumber}`}><PhoneIcon /> Call</a><a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a><button onClick={openQuoteModal}><FileText size={18} /> Get quote</button></div>
      {quoteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setQuoteOpen(false); }}><div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title"><button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close"><X size={20} /></button>{submitted ? <div className="success-state"><div className="success-icon"><CircleCheck size={28} /></div><h2>Requirement received.</h2><p>Thank you. JBR will review your request and get back to you with the next step.</p><button className="button button-navy" onClick={() => { setQuoteOpen(false); setSubmitted(false); }}>Done</button></div> : <><div className="section-kicker">QUICK ENQUIRY</div><h2 id="quote-title">Tell us what you need.</h2><p className="modal-subtitle">Share a few details and JBR will help you move forward.</p><form onSubmit={submitQuote}>
                <label>Name<input required value={quoteName} onChange={(event) => setQuoteName(event.target.value)} placeholder="Your name" /></label>
                <label>Phone number<input required type="tel" value={quotePhone} onChange={(event) => setQuotePhone(event.target.value)} placeholder="Your phone number" /></label>
                <label>Delivery address<textarea required value={quoteAddress} onChange={(event) => setQuoteAddress(event.target.value)} placeholder="Full delivery address" rows={3} /></label>
                <label>Shop opening time<input value={quoteShopTime} onChange={(event) => setQuoteShopTime(event.target.value)} placeholder="e.g. 9:00 AM - 8:00 PM" /></label>
                <label>What are you looking for?<textarea value={quoteRequirement} onChange={(event) => setQuoteRequirement(event.target.value)} placeholder="Product, category or requirement" rows={3} /></label>
                <button className="button button-orange" type="submit">Get my quotation <ArrowRight size={17} /></button>
              </form></>}</div></div>}
    </div>
  );
}

function PhoneIcon() { return <Phone size={18} />; }

export default function App() {
  return (
    <GlobalSearchProvider>
      <AppInner />
    </GlobalSearchProvider>
  );
}
