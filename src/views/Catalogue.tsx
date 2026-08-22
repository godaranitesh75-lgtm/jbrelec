import { useState, useMemo } from 'react';
import { Search, MessageCircle, Phone, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATALOGUE = [
  {
    id: 1,
    category: 'Conduit & Pipe Accessories',
    items: [
      'PVC conduit pipe', 'Heavy PVC conduit', 'Flexible conduit', 'Corrugated flexible conduit',
      'GI conduit', 'Conduit bend', 'Conduit elbow', 'Conduit tee', 'Conduit junction',
      'Conduit coupler', 'Conduit socket', 'Conduit adapter', 'Conduit bush', 'Conduit locknut',
      'Conduit saddle', 'Spacer bar saddle', 'U-clamp', 'Conduit clips', 'Conduit inspection box',
      'Conduit junction box', 'Conduit circular box', 'Conduit deep box',
    ],
  },
  {
    id: 2,
    category: 'Cable Management',
    items: [
      'Cable ties', 'Nylon cable ties', 'Releasable cable ties', 'Stainless-steel cable ties',
      'Velcro cable ties', 'Cable clips', 'Nail cable clips', 'Adhesive cable clips',
      'Screw cable clips', 'Cable clamps', 'Cable saddles', 'Cable cleats', 'Cable markers',
      'Cable labels', 'Cable identification tags', 'Spiral cable wrap', 'Cable sleeves',
      'Braided cable sleeves', 'Cable trunking', 'PVC trunking', 'Cable duct', 'Wiring duct',
      'Raceway', 'Cable tray', 'Cable ladder',
    ],
  },
  {
    id: 3,
    category: 'Cable Glands',
    items: [
      'PVC cable glands', 'Brass cable glands', 'Nylon cable glands', 'Metal cable glands',
      'Armoured cable glands', 'Waterproof cable glands', 'PG cable glands', 'Metric cable glands',
      'Compression cable glands', 'Cable gland locknuts', 'Cable gland washers',
      'Cable gland shrouds', 'Cable gland earth tags',
    ],
  },
  {
    id: 4,
    category: 'Wire & Cable Termination',
    items: [
      'Cable lugs', 'Copper lugs', 'Aluminium lugs', 'Bimetallic lugs', 'Ring terminals',
      'Fork terminals', 'Pin terminals', 'Blade terminals', 'Butt connectors', 'Bullet connectors',
      'Female terminals', 'Male terminals', 'Ferrules', 'Twin-wire ferrules',
      'Insulated terminals', 'Non-insulated terminals', 'Crimp terminals', 'Cable end sleeves',
    ],
  },
  {
    id: 5,
    category: 'Wire Connectors & Joining Accessories',
    items: [
      'Terminal blocks', 'Connector strips', 'Screw terminal connectors', 'Push-in connectors',
      'Lever connectors', 'Inline connectors', 'Wire nuts', 'Twist-on connectors',
      'Quick connectors', 'T-connectors', 'Butt connectors', 'Split-bolt connectors',
      'Junction connectors', 'Cable splice connectors', 'Waterproof wire connectors',
      'Distribution connectors',
    ],
  },
  {
    id: 6,
    category: 'Junction & Connection Boxes',
    items: [
      'PVC junction boxes', 'ABS junction boxes', 'Waterproof junction boxes',
      'Electrical junction boxes', 'Circular junction boxes', 'Square junction boxes',
      'Rectangular junction boxes', 'Deep junction boxes', 'Surface junction boxes',
      'Concealed junction boxes', 'Pull boxes', 'Inspection boxes', 'Terminal boxes',
      'Cable joint boxes',
    ],
  },
  {
    id: 7,
    category: 'Switch & Socket Wiring Accessories',
    items: [
      'Modular boxes', 'Surface boxes', 'Concealed boxes', 'Switch boxes', 'Socket boxes',
      'Modular plates', 'Blank plates', 'Cover plates', 'Mounting frames', 'Switch box screws',
      'Socket box screws', 'Modular box separators', 'Mounting brackets', 'Box extenders',
    ],
  },
  {
    id: 8,
    category: 'Electrical Tape & Insulation',
    items: [
      'PVC insulation tape', 'Electrical insulation tape', 'Self-amalgamating tape',
      'Rubber insulation tape', 'Cloth electrical tape', 'Aluminium foil tape',
      'Heat-shrink tubing', 'Heat-shrink sleeves', 'Heat-shrink end caps',
      'Insulation sleeves', 'Insulation sheets', 'Insulating boots',
    ],
  },
  {
    id: 9,
    category: 'Wiring Channels & Trunking',
    items: [
      'PVC wiring channel', 'Mini trunking', 'Slotted wiring duct', 'Panel wiring duct',
      'Flexible wiring duct', 'Corner trunking', 'Flat trunking', 'Round trunking',
      'Floor trunking', 'Surface raceway', 'Raceway accessories', 'Trunking corner',
      'Trunking tee', 'Trunking end cap', 'Trunking coupler',
    ],
  },
  {
    id: 10,
    category: 'Cable Tray Accessories',
    items: [
      'Perforated cable tray', 'Ladder cable tray', 'Cable tray coupler', 'Cable tray bend',
      'Cable tray tee', 'Cable tray cross', 'Cable tray reducer', 'Cable tray end cap',
      'Cable tray bracket', 'Cable tray support', 'Cable tray clamp', 'Tray hanger',
      'Tray mounting accessories',
    ],
  },
  {
    id: 11,
    category: 'Earthing Wiring Accessories',
    items: [
      'Earthing wire', 'Earth cable', 'Earth clamps', 'Earth terminals', 'Earth lugs',
      'Earth bars', 'Copper earth strip', 'GI earth strip', 'Earth electrodes',
      'Earthing rods', 'Earth pit covers', 'Earth pit accessories', 'Earth bonding clamps',
      'Earth bonding wire',
    ],
  },
  {
    id: 12,
    category: 'Wiring Fasteners',
    items: [
      'Cable clips', 'Cable saddles', 'PVC saddles', 'Metal saddles', 'Cable clamps',
      'P-clamps', 'U-clamps', 'Cable cleats', 'Cable ties', 'Tie mounts', 'Screw clips',
      'Adhesive mounts', 'Wall plugs', 'Rawl plugs', 'Screws', 'Anchors',
      'Cable support hooks',
    ],
  },
  {
    id: 13,
    category: 'Panel Wiring Accessories',
    items: [
      'DIN rails', 'Terminal blocks', 'End clamps', 'End plates', 'Jumper bars',
      'Terminal markers', 'Cable ducts', 'Wire ferrules', 'Panel cable glands',
      'Busbar supports', 'Busbar connectors', 'DIN rail accessories', 'Wire labels',
      'Panel wiring channels',
    ],
  },
  {
    id: 14,
    category: 'Cable Jointing Accessories',
    items: [
      'Cable joint kits', 'Straight-through joint kits', 'Branch joint kits',
      'Heat-shrink joint kits', 'Cold-shrink joint kits', 'Resin joint kits',
      'Cable joint sleeves', 'Jointing compounds', 'Cable repair sleeves',
      'Insulation sleeves', 'Jointing tape', 'Cable sealing kits',
    ],
  },
  {
    id: 15,
    category: 'Distribution & Wiring Accessories',
    items: [
      'Distribution blocks', 'Power distribution blocks', 'Terminal distribution blocks',
      'Busbar blocks', 'Busbar supports', 'Neutral links', 'Earth links', 'Connector blocks',
      'Splitter blocks', 'DIN rail distribution blocks', 'Feed-through terminals',
    ],
  },
  {
    id: 16,
    category: 'Service & Installation Accessories',
    items: [
      'Fish tape', 'Cable pulling tape', 'Wire pulling springs', 'Cable pulling lubricant',
      'Cable cutters', 'Wire strippers', 'Crimping tools', 'Ferrule crimpers', 'Lug crimpers',
      'Cable gland tools', 'Cable tie tools', 'Conduit cutters', 'Conduit threading accessories',
    ],
  },
  {
    id: 17,
    category: 'Small Wiring Consumables',
    items: [
      'Fuse wire', 'Binding wire', 'Cable markers', 'Wire labels', 'Identification sleeves',
      'Heat-shrink markers', 'Insulation sleeves', 'Cable ties', 'Electrical tape',
      'Terminal screws', 'Connector screws', 'Cable glands', 'Rubber bushes', 'PVC bushes',
      'Grommets', 'Cable entry seals',
    ],
  },
  {
    id: 18,
    category: 'Grommets & Cable Protection',
    items: [
      'Rubber grommets', 'PVC grommets', 'Edge protection grommets', 'Cable entry grommets',
      'Panel grommets', 'Cable protection sleeves', 'Spiral protection', 'Split loom tubing',
      'Heat-shrink protection', 'Abrasion-resistant sleeves',
    ],
  },
  {
    id: 19,
    category: 'Wiring Accessories for Electrical Panels',
    items: [
      'DIN rail', 'DIN rail terminals', 'End clamps', 'End plates', 'Jumper links',
      'Terminal markers', 'Wire ducts', 'Cable glands', 'Panel plugs', 'Panel connectors',
      'Busbar supports', 'Neutral bars', 'Earth bars', 'Cable entry plates',
    ],
  },
  {
    id: 20,
    category: 'Common Retail Wiring Items',
    items: [
      'PVC conduit', 'Flexible conduit', 'Conduit bends', 'Conduit tees', 'Conduit junctions',
      'Conduit saddles', 'Junction boxes', 'Modular boxes', 'Cable glands', 'Cable ties',
      'Cable clips', 'Cable lugs', 'Ferrules', 'Terminal blocks', 'Connector strips',
      'Wire connectors', 'PVC insulation tape', 'Heat-shrink sleeves', 'Rubber grommets',
      'Cable markers', 'Wiring channels', 'PVC trunking', 'Cable clamps', 'Cable cleats',
      'DIN rails', 'Neutral links', 'Earth links', 'Distribution blocks', 'Cable sleeves',
      'Earthing clamps',
    ],
  },
];

const CATEGORY_COLORS = [
  '#0d9488', '#f59e0b', '#10b981', '#8b5cf6',
  '#ec4899', '#0891b2', '#f97316', '#6366f1',
  '#14b8a6', '#e11d48', '#84cc16', '#06b6d4',
  '#a855f7', '#f59e0b', '#10b981', '#0d9488',
  '#8b5cf6', '#ec4899', '#0891b2', '#f97316',
];

export function Catalogue() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [enquiredItem, setEnquiredItem] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return CATALOGUE;
    const q = search.toLowerCase();
    return CATALOGUE
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0 || cat.category.toLowerCase().includes(q));
  }, [search]);

  function addToCart(item: string) {
    if (!cart.includes(item)) setCart((prev) => [...prev, item]);
  }

  function removeFromCart(item: string) {
    setCart((prev) => prev.filter((i) => i !== item));
  }

  function sendEnquiry() {
    const subject = encodeURIComponent('JBR Electrical — Product Enquiry / Order');
    const body = encodeURIComponent(
      `JBR Electrical — Product Enquiry\n\nItems I am interested in:\n${cart.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\nPlease share availability and pricing.\n\nName:\nPhone:\nDelivery Location:`
    );
    window.open(`mailto:jabraram8015@gmail.com?subject=${subject}&body=${body}`);
  }

  function whatsappEnquiry() {
    const text = encodeURIComponent(
      `Hello JBR Electrical,\n\nI would like to enquire about the following products:\n${cart.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\nPlease share availability and pricing.`
    );
    window.open(`https://wa.me/916377374179?text=${text}`);
  }

  return (
    <main style={{ background: '#f4f8f6' }}>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #07594c 0%, #0d9488 100%)',
        padding: '70px 5.5% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(245,158,11,.2)', top: -140, right: -60, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontSize: 10, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 28, height: 1, background: '#f59e0b' }} /> Wiring Accessories Catalogue
          </span>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 1.05, letterSpacing: '-.05em', color: 'white', margin: '0 0 18px', maxWidth: 680 }}>
            Complete Wiring Accessories — Browse & Order
          </h1>
          <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: '0 0 28px' }}>
            Over 200 products across 20 categories. Add items to your enquiry cart and send us a quote request instantly.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260, maxWidth: 420 }}>
              <Search size={16} color="rgba(255,255,255,.7)" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products e.g. cable ties, gland, trunking..."
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 13, width: '100%' }}
              />
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                style={{ background: '#f59e0b', color: '#1c1917', padding: '10px 18px', borderRadius: 8, fontWeight: 800, fontSize: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ShoppingCart size={15} /> Enquiry Cart ({cart.length})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY QUICK JUMP */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2eaed', padding: '14px 5.5%', overflowX: 'auto', display: 'flex', gap: 10, position: 'sticky', top: 82, zIndex: 10 }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid', borderColor: activeCategory === null ? 'var(--navy)' : '#e2eaed', background: activeCategory === null ? 'var(--navy)' : 'white', color: activeCategory === null ? 'white' : '#6b7f8c', fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          All
        </button>
        {CATALOGUE.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid', borderColor: activeCategory === cat.id ? 'var(--navy)' : '#e2eaed', background: activeCategory === cat.id ? 'var(--navy)' : 'white', color: activeCategory === cat.id ? 'white' : '#6b7f8c', fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {cat.id}. {cat.category.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      {/* CATALOGUE GRID */}
      <div style={{ padding: '48px 5.5% 80px' }}>
        {search && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7f8c' }}>
            <Search size={32} style={{ marginBottom: 16, opacity: 0.4 }} />
            <p style={{ fontSize: 15, margin: '0 0 8px', fontWeight: 600 }}>No products found for "{search}"</p>
            <p style={{ fontSize: 13, margin: 0 }}>Try a different keyword or <a href="https://wa.me/916377374179" style={{ color: 'var(--navy)', fontWeight: 700 }}>ask us on WhatsApp</a></p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 28 }}>
          {(activeCategory ? filtered.filter((c) => c.id === activeCategory) : filtered).map((cat) => (
            <div key={cat.id} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(7,89,76,.06)', border: '1px solid rgba(7,89,76,.06)' }}>
              {/* Category Header */}
              <div style={{ background: CATEGORY_COLORS[(cat.id - 1) % CATEGORY_COLORS.length], padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: 'rgba(255,255,255,.2)', color: 'white', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 4 }}>
                    {String(cat.id).padStart(2, '0')}
                  </span>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-.02em' }}>
                    {cat.category}
                  </h2>
                </div>
                <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, whiteSpace: 'nowrap' }}>
                  {cat.items.length} items
                </span>
              </div>

              {/* Items Grid */}
              <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {cat.items.map((item) => {
                  const inCart = cart.includes(item);
                  return (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${inCart ? CATEGORY_COLORS[(cat.id - 1) % CATEGORY_COLORS.length] : '#e8f0ee'}`,
                        background: inCart ? `color-mix(in srgb, ${CATEGORY_COLORS[(cat.id - 1) % CATEGORY_COLORS.length]} 6%, white)` : '#f8fbfa',
                        transition: 'all .15s',
                        cursor: 'pointer',
                      }}
                      onClick={() => inCart ? removeFromCart(item) : addToCart(item)}
                    >
                      <span style={{ fontSize: 12, color: inCart ? 'var(--navy)' : '#3d5260', fontWeight: inCart ? 700 : 500, lineHeight: 1.4 }}>
                        {search ? (
                          <span dangerouslySetInnerHTML={{
                            __html: item.replace(new RegExp(`(${search})`, 'gi'), '<mark style="background:#fef08a;border-radius:2px;padding:0 1px">$1</mark>')
                          }} />
                        ) : item}
                      </span>
                      <span style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: inCart ? CATEGORY_COLORS[(cat.id - 1) % CATEGORY_COLORS.length] : '#a0b4be',
                        flexShrink: 0,
                      }}>
                        {inCart ? '✓ Added' : '+ Add'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Category Footer */}
              <div style={{ borderTop: '1px solid #eef3f2', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#8a9aa5' }}>
                  Click items to add to enquiry cart
                </span>
                <a
                  href={`https://wa.me/916377374179?text=${encodeURIComponent(`Hello JBR Electrical, I would like to enquire about products from category: ${cat.category}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {cart.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f4f8f6', borderRadius: 10, border: '1px solid #e2eaed' }}>
                      <span style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 500 }}>{item}</span>
                      <button onClick={() => removeFromCart(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48', fontSize: 12, fontWeight: 700 }}>Remove</button>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 12, color: '#6b7f8c', margin: '0 0 16px', lineHeight: 1.6 }}>
                  Send your enquiry to JBR Electrical and our team will get back with pricing and availability.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={whatsappEnquiry}
                    className="button button-navy"
                    style={{ justifyContent: 'center', gap: 10 }}
                  >
                    <MessageCircle size={15} /> Send via WhatsApp
                  </button>
                  <button
                    onClick={sendEnquiry}
                    className="button button-orange"
                    style={{ justifyContent: 'center', gap: 10 }}
                  >
                    <ArrowRight size={15} /> Send via Email
                  </button>
                  <Link
                    to="/quote"
                    className="button button-outline"
                    style={{ justifyContent: 'center', textAlign: 'center' }}
                    onClick={() => setCartOpen(false)}
                  >
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
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            background: 'var(--navy)',
            color: 'white',
            border: 'none',
            borderRadius: 50,
            padding: '14px 20px',
            fontWeight: 800,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(7,89,76,.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            zIndex: 50,
          }}
        >
          <ShoppingCart size={16} />
          {cart.length} item{cart.length > 1 ? 's' : ''} in cart
        </button>
      )}

      {/* BOTTOM CTA */}
      <section style={{ margin: '0 5.5% 80px', background: 'linear-gradient(135deg, #07594c, #0d9488)', borderRadius: 24, padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
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
