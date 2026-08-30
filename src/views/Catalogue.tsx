import { useState, useMemo } from 'react';
import { Search, MessageCircle, Phone, ShoppingCart, ArrowRight, Plus, Minus, Trash2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { CATALOGUE, CATEGORY_COLOR } from '../data/catalogueData.ts';

export function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<{ item: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryShopTime, setDeliveryShopTime] = useState('');

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

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return CATALOGUE;
    const lower = q.toLowerCase();
    return CATALOGUE
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.toLowerCase().includes(lower)),
      }))
      .filter((cat) => cat.items.length > 0 || cat.category.toLowerCase().includes(lower));
  }, [search]);

  function handleSearchChange(value: string) {
    setSearch(value);
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
    } else {
      setSearchParams({});
    }
  }

  function sendEnquiry() {
    const subject = encodeURIComponent('JBR Electrical — Product Enquiry / Order');
    const body = encodeURIComponent(
      `JBR Electrical — Product Enquiry\n\nItems I am interested in:\n${cart.map((c, idx) => `${idx + 1}. ${c.item}  x${c.qty}`).join('\n')}\n\nDelivery Details:\nName: ${deliveryName || 'N/A'}\nMobile: ${deliveryPhone || 'N/A'}\nAddress: ${deliveryAddress || 'N/A'}\nShop Opening Time: ${deliveryShopTime || 'N/A'}\n\nPlease share availability and pricing.`
    );
    window.open(`mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`);
  }

  async function whatsappEnquiry() {
    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const text = encodeURIComponent(
      `Hello JBR Electrical,\n\nI have placed an order request with ${cart.length} items (${totalItems} units).\n\nPlease see the attached PDF for the complete list.\n\nDelivery Details:\nName: ${deliveryName || 'N/A'}\nMobile: ${deliveryPhone || 'N/A'}\nAddress: ${deliveryAddress || 'N/A'}\nShop Opening Time: ${deliveryShopTime || 'N/A'}\n\nI will call to confirm this order.`
    );
    const { generateOrderPdf } = await import('../utils/pdfGenerator.ts');
    await generateOrderPdf(cart);
    window.open(`https://wa.me/916377374179?text=${text}`);
  }

  return (
    <main>
      {/* HERO */}
      <section className="catalog-hero">
        <div className="catalog-hero-orb" aria-hidden />
        <div className="catalog-hero-inner">
          <span className="catalog-hero-eyebrow"><span className="catalog-hero-eyebrow-line" /> Wiring Accessories Catalogue</span>
          <h1>Complete Wiring Accessories — Browse & Order</h1>
          <p>Over 200 products across 20 categories. Add items to your enquiry cart and send us a quote request instantly.</p>
          <div className="catalog-hero-actions">
            <div className="catalog-search-wrap">
              <Search size={16} color="rgba(255,255,255,.7)" />
              <input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products e.g. cable ties, gland, trunking..."
              />
            </div>
            {cart.length > 0 && (
              <button onClick={() => setCartOpen(true)} className="catalog-cart-btn">
                <ShoppingCart size={15} /> Enquiry Cart ({totalItems})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY QUICK JUMP */}
      <div className="category-tabs">
        <button
          onClick={() => setActiveCategory(null)}
          className={`category-tab ${activeCategory === null ? 'active' : ''}`}
        >
          All
        </button>
        {CATALOGUE.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.id}. {cat.category.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      {/* CATALOGUE GRID */}
      <div className="catalog-section">
        {search && filtered.length === 0 && (
          <div className="empty-state">
            <Search size={32} className="empty-state-icon" />
            <p className="empty-state-title">No products found for "{search}"</p>
            <p className="empty-state-text">Try a different keyword or <a href="https://wa.me/916377374179">ask us on WhatsApp</a></p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 28 }}>
          {(activeCategory ? filtered.filter((c) => c.id === activeCategory) : filtered).map((cat) => (
            <div key={cat.id} className="catalog-category-card">
              {/* Category Header */}
              <div className="catalog-category-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="catalog-category-header-badge">
                    {String(cat.id).padStart(2, '0')}
                  </span>
                  <h2>{cat.category}</h2>
                </div>
                <span className="catalog-category-header-count">
                  {cat.items.length} items
                </span>
              </div>

              {/* Items Grid */}
              <div className="catalog-items-grid">
                {cat.items.map((item) => {
                  const qty = getQty(item);
                  const inCart = qty > 0;
                  return (
                    <div
                      key={item}
                      className={`catalog-item ${inCart ? 'in-cart' : ''}`}
                    >
                      <span className="catalog-item-name">
                        {search ? (
                          <span dangerouslySetInnerHTML={{
                            __html: item.replace(new RegExp(`(${search})`, 'gi'), '<mark style="background:#fef08a;border-radius:2px;padding:0 1px">$1</mark>')
                          }} />
                        ) : item}
                      </span>
                      <div className="catalog-item-actions">
                        <button
                          onClick={() => decreaseQty(item)}
                          disabled={qty === 0}
                          style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${CATEGORY_COLOR}`, background: 'white', cursor: qty === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: CATEGORY_COLOR, padding: 0, opacity: qty === 0 ? 0.4 : 1 }}
                        >
                          <Minus size={11} />
                        </button>
                        <input
                          key={`${item}-${qty}`}
                          className="catalog-item-qty"
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
                          style={{ width: 24, textAlign: 'center', border: 'none', background: 'transparent', fontSize: 12, fontWeight: 800, color: 'var(--navy)', padding: 0 }}
                        />
                        <button
                          onClick={() => addToCart(item)}
                          style={{ width: 22, height: 22, borderRadius: 5, border: 'none', background: CATEGORY_COLOR, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: 0 }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Category Footer */}
              <div className="catalog-category-footer">
                <span className="catalog-category-footer-hint">Click items to add to enquiry cart</span>
                <a
                  href={`https://wa.me/916377374179?text=${encodeURIComponent(`Hello JBR Electrical, I would like to enquire about products from category: ${cat.category}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="catalog-category-footer-link"
                >
                  <MessageCircle size={12} /> Ask about this category
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ENQUIRY CART MODAL */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 0 0' }} onClick={() => setCartOpen(false)}>
          <div style={{ background: 'white', width: '100%', maxWidth: 560, borderRadius: '20px 20px 0 0', padding: '32px 28px', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, color: 'var(--navy)', margin: 0 }}>
                Enquiry Cart ({cart.length} items)
              </h2>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6b7f8c' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: '#6b7f8c', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>No items added yet. Browse the catalogue and click items to add them.</p>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {cart.map(({ item, qty }) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 14px', background: '#f4f8f6', borderRadius: 10, border: '1px solid #e2eaed' }}>
                      <span style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 500, flex: 1, lineHeight: 1.4 }}>{item}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        {/* Decrease */}
                        <button
                          onClick={() => decreaseQty(item)}
                          title="Decrease quantity"
                          style={{ width: 28, height: 28, borderRadius: 6, border: '1.5px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: 900, fontSize: 16 }}
                        >
                          <Minus size={13} />
                        </button>
                        {/* Quantity */}
                        <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy)', minWidth: 24, textAlign: 'center' }}>{qty}</span>
                        {/* Increase */}
                        <button
                          onClick={() => addToCart(item)}
                          title="Increase quantity"
                          style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                        >
                          <Plus size={13} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item)}
                          title="Delete item"
                          style={{ height: 28, padding: '0 10px', borderRadius: 6, border: 'none', background: '#e11d48', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'white', fontSize: 11, fontWeight: 700, marginLeft: 4 }}
                        >
                          <Trash2 size={12} /> Delete
                        </button>
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
                  <input value={deliveryShopTime} onChange={(e) => setDeliveryShopTime(e.target.value)} placeholder="Shop opening time (e.g. 9:00 AM - 8:00 PM)" style={{ padding: '13px 16px', border: '1.5px solid #e2eaed', borderRadius: 12, background: '#f8fbfc', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
                </div>

                <div className="cart-actions">
                  <button onClick={whatsappEnquiry} className="button button-navy">
                    <MessageCircle size={15} /> Order Now
                  </button>
                  <button onClick={sendEnquiry} className="button button-orange">
                    <ArrowRight size={15} /> Send via Email
                  </button>
                  <Link to="/quote" className="button button-outline" onClick={() => setCartOpen(false)}>
                    Fill a detailed quote form
                  </Link>
                </div>

                <button onClick={() => setCart([])} style={{ marginTop: 14, background: 'none', border: 'none', color: '#e11d48', fontSize: 12, fontWeight: 700, cursor: 'pointer', width: '100%', textAlign: 'center' }}>
                  Clear all items
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* FLOATING CART BUTTON */}
      {cart.length > 0 && !cartOpen && (
        <button onClick={() => setCartOpen(true)} className="floating-cart">
          <ShoppingCart size={16} />
          {cart.length} product{cart.length > 1 ? 's' : ''} · {totalItems} unit{totalItems > 1 ? 's' : ''}
        </button>
      )}

      {/* BOTTOM CTA */}
      <section className="cta-section cta-gradient" style={{ margin: '0 5.5% 80px', borderRadius: 24, padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(245,158,11,.2)', right: -60, top: -60, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: '#f8b446', display: 'block', marginBottom: 10 }}>Can't find what you need?</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(22px, 2.8vw, 34px)', color: 'white', lineHeight: 1.1, letterSpacing: '-.04em', margin: '0 0 10px' }}>
            Ask us directly — we'll source it for you
          </h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Our team can help find, quote and deliver any wiring accessory you need.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <a href="https://wa.me/916377374179" target="_blank" rel="noreferrer" className="button button-orange">
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href="tel:6377374179" className="button" style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.22)' }}>
            <Phone size={14} /> Call Us
          </a>
        </div>
      </section>
    </main>
  );
}
