import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ChevronDown,
  CircleCheck,
  Clock3,
  FileText,
  Headphones,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const installerImage = 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const socketImage = 'https://images.pexels.com/photos/5691583/pexels-photo-5691583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const categories = [
  { name: 'General Electrical Accessories', short: 'Everyday essentials', icon: Zap, tone: 'blue' },
  { name: 'Wiring Accessories', short: 'Reliable installations', icon: Boxes, tone: 'orange' },
  { name: 'Switches & Sockets', short: 'Control & connection', icon: SlidersHorizontal, tone: 'green' },
  { name: 'Pipe Accessories', short: 'Neat cable routing', icon: Wrench, tone: 'navy' },
  { name: 'Fans & Appliances', short: 'Comfort at home', icon: Sparkles, tone: 'sand' },
  { name: 'Tools & Safety', short: 'Built for the job', icon: ShieldCheck, tone: 'blue' },
];

const faqs = [
  ['Can I check product availability?', 'Yes. Send us the product name, brand or a photo and our team can help confirm current availability.'],
  ['Do you handle bulk or project requirements?', 'Yes. Share your product list and quantities through the quote form so we can prepare a requirement-specific response.'],
  ['Can JBR help me find a specific item?', 'If you cannot find exactly what you need, ask JBR. We can help identify the right category or source request.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [finder, setFinder] = useState('Homeowner');
  const [activeFaq, setActiveFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const filteredCategories = useMemo(() => categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()) || category.short.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <div className="announcement"><span><Zap size={13} fill="currentColor" /> Quality electrical products <i /> Reliable service <i /> Easy enquiry</span><span className="announcement-location">Jodhpur, Rajasthan</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JBR Electrical home"><img src="/assets/images/image.png" alt="JBR Electrical" /></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          {['About', 'Products', 'Brands', 'Services', 'Why JBR', 'Contact'].map((item) => <a href={`#${item.toLowerCase().replace(' ', '-')}`} key={item} onClick={() => setMenuOpen(false)}>{item}{item === 'Products' && <ChevronDown size={14} />}</a>)}
        </nav>
        <div className="header-actions"><button className="icon-button" aria-label="Search" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}><Search size={18} /></button><a className="whatsapp-link" href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a><button className="button button-orange small" onClick={() => setQuoteOpen(true)}>Get a quote <ArrowRight size={16} /></button></div>
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> JBR ELECTRICAL <span className="eyebrow-dot" /></div>
            <h1>Powering every connection with <em>quality</em> you can trust.</h1>
            <p className="hero-lede">Reliable electrical products, accessories and solutions for homes, businesses, electricians and projects.</p>
            <div className="hero-actions"><a className="button button-navy" href="#products">Explore products <ArrowRight size={17} /></a><button className="button button-outline" onClick={() => setQuoteOpen(true)}>Get a quote</button></div>
            <div className="hero-note"><BadgeCheck size={18} /> <span>Product availability and pricing may vary. <strong>Ask JBR for current details.</strong></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-grid-pattern" />
            <div className="hero-image-wrap"><img src={heroImage} alt="Organized electrical wiring and control components" /></div>
            <div className="hero-product-card"><div className="product-card-icon"><ShieldCheck size={20} /></div><div><strong>Built for real work</strong><span>Products selected for everyday reliability</span></div></div>
            <div className="hero-stamp"><span>JBR</span><small>Electrical<br />partner</small></div>
          </div>
        </section>

        <section className="trust-strip"><div className="trust-intro">A better way to source<br /><strong>electrical essentials.</strong></div>{[['Quality products', BadgeCheck], ['Genuine brands', ShieldCheck], ['Expert guidance', Headphones], ['Competitive pricing', Sparkles], ['Reliable service', Clock3]].map(([label, Icon]) => <div className="trust-item" key={String(label)}><Icon size={20} /><span>{String(label)}</span></div>)}</section>

        <section className="finder section-grid" id="about"><div className="section-kicker">START WITH YOUR REQUIREMENT</div><div><h2>Looking for something <span>specific?</span></h2><p className="section-intro">Whether you are fixing a home, managing a project or keeping a site moving, start with the products that matter to you.</p></div><div className="finder-tabs">{['Homeowner', 'Electrician', 'Contractor / Builder'].map((item) => <button className={finder === item ? 'finder-tab active' : 'finder-tab'} onClick={() => setFinder(item)} key={item}><UserRound size={17} /> {item}</button>)}</div><div className="finder-result"><div><span className="result-label">RECOMMENDED FOR {finder.toUpperCase()}</span><h3>{finder === 'Homeowner' ? 'Make the everyday feel effortless.' : finder === 'Electrician' ? 'Everything that keeps the job moving.' : 'Plan bigger requirements with confidence.'}</h3><p>{finder === 'Homeowner' ? 'Switches, sockets, fans, lighting and wiring accessories.' : finder === 'Electrician' ? 'Wiring, pipe accessories, tools, connectors and terminals.' : 'Bulk supplies, project requirements and multiple categories.'}</p></div><a className="text-link" href="#products">Browse recommendations <ArrowRight size={17} /></a></div></section>

        <section className="category-section" id="products"><div className="section-heading"><div><div className="section-kicker">PRODUCT DISCOVERY</div><h2>Everything you need,<br /><span>in one place.</span></h2></div><div className="catalog-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or categories..." aria-label="Search products or categories" /></div></div><div className="category-grid">{filteredCategories.map(({ name, short, icon: Icon, tone }) => <article className={`category-card ${tone}`} key={name}><div className="category-card-top"><span className="category-number">0{filteredCategories.indexOf(categories.find((category) => category.name === name)!) + 1}</span><Icon size={25} /></div><h3>{name}</h3><p>{short}</p><button className="card-arrow" aria-label={`View ${name}`}><ArrowUpRightIcon /></button></article>)}{filteredCategories.length === 0 && <div className="empty-search"><Search size={28} /><h3>Couldn't find exactly that?</h3><p>Ask JBR to help identify or source the right product.</p><button className="text-link" onClick={() => setQuoteOpen(true)}>Ask JBR <ArrowRight size={17} /></button></div>}</div><div className="catalog-footer"><span>Showing categories that make sourcing simpler.</span><a className="text-link" href="#contact">View all products <ArrowRight size={17} /></a></div></section>

        <section className="story section-grid" id="why-jbr"><div className="story-image"><img src={installerImage} alt="Electrician working safely on an electrical panel" /><div className="image-caption"><span className="caption-mark">02</span><span>Practical guidance<br /><strong>for real requirements.</strong></span></div></div><div className="story-copy"><div className="section-kicker">THE JBR APPROACH</div><h2>Not just products.<br /><span>A trusted partner.</span></h2><p>Good electrical products are not only about price. They are about reliability, safety and knowing that someone will help you choose well.</p><p>JBR Electrical brings together everyday electrical essentials, technical guidance and a straightforward way to ask for what you need.</p><a className="text-link" href="#contact">Discover our story <ArrowRight size={17} /></a><div className="story-points"><div><strong>01</strong><span>Understand the requirement</span></div><div><strong>02</strong><span>Find the right product</span></div><div><strong>03</strong><span>Support the next step</span></div></div></div></section>

        <section className="quality-section" id="services"><div className="quality-content"><div className="section-kicker light">WHY CUSTOMERS CHOOSE JBR</div><h2>Clarity at every<br /><span>connection point.</span></h2><p>From the first question to the final requirement, we keep things simple, useful and honest.</p><div className="quality-list">{[['Product guidance', 'Choose with confidence'], ['Availability checks', 'Know what is currently possible'], ['Bulk requirements', 'Share your list, not your guess'], ['Responsive support', 'Get a clear next step']].map(([title, subtitle], index) => <div className="quality-item" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{subtitle}</small></div><CircleCheck size={18} /></div>)}</div></div><div className="quality-art"><div className="quality-orbit orbit-one" /><div className="quality-orbit orbit-two" /><div className="quality-orbit orbit-three" /><div className="quality-core"><Zap size={34} fill="currentColor" /><span>QUALITY<br />YOU CAN<br /><b>CHECK</b></span></div></div></section>

        <section className="applications" id="brands"><div className="section-heading"><div><div className="section-kicker">MADE FOR THE WAY YOU WORK</div><h2>Support for every<br /><span>kind of requirement.</span></h2></div><p className="section-intro">For the people building, maintaining and improving the spaces around us.</p></div><div className="application-grid"><div className="application-feature"><img src={socketImage} alt="Electrical switches being installed" /><div><span>01 / HOME & RESIDENTIAL</span><h3>Small details.<br />Big difference.</h3><a href="#products" className="text-link light-link">Explore essentials <ArrowRight size={17} /></a></div></div>{['Electricians', 'Contractors', 'Shops & offices', 'Maintenance'].map((item, index) => <div className="application-tile" key={item}><span>0{index + 2}</span><h3>{item}</h3><ArrowRight size={19} /></div>)}</div></section>

        <section className="faq-section" id="contact"><div><div className="section-kicker">COMMON QUESTIONS</div><h2>Good to know<br /><span>before you ask.</span></h2><p>Can’t see your question here? We’re happy to help.</p><button className="button button-navy" onClick={() => setQuoteOpen(true)}>Talk to JBR <MessageCircle size={16} /></button></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={activeFaq === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{activeFaq === index && <p>{answer}</p>}</div>)}</div></section>

        <section className="cta-section"><div className="cta-orb" /><div><div className="section-kicker light">READY WHEN YOU ARE</div><h2>Have an electrical<br /><span>requirement?</span></h2><p>Tell us what you need. We’ll help you find the right next step.</p></div><div className="cta-actions"><button className="button button-orange" onClick={() => setQuoteOpen(true)}>Get my quotation <ArrowRight size={17} /></button><a className="button button-light" href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp JBR</a></div></section>
      </main>

      <footer className="footer"><div className="footer-main"><div><img className="footer-logo" src="/assets/images/image.png" alt="JBR Electrical" /><p>Reliable electrical products and support for homes, businesses, electricians and projects.</p></div><div className="footer-col"><span>Explore</span><a href="#about">About JBR</a><a href="#products">Products</a><a href="#why-jbr">Why JBR</a></div><div className="footer-col"><span>Need help?</span><a href="#contact">Request a quote</a><a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp JBR</a><a href="#contact">Contact us</a></div><div className="footer-col"><span>Based in</span><strong>Jodhpur, Rajasthan</strong><small>Jagdish Patel · Proprietor</small></div></div><div className="footer-bottom"><span>© JBR Electrical. All rights reserved.</span><span>Privacy · Terms</span></div></footer>

      <div className="mobile-bar"><a href="tel:"><PhoneIcon /> Call</a><a href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a><button onClick={() => setQuoteOpen(true)}><FileText size={18} /> Get quote</button></div>
      {quoteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setQuoteOpen(false); }}><div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title"><button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close"><X size={20} /></button>{submitted ? <div className="success-state"><div className="success-icon"><CircleCheck size={28} /></div><h2>Requirement received.</h2><p>Thank you. JBR will review your request and get back to you with the next step.</p><button className="button button-navy" onClick={() => { setQuoteOpen(false); setSubmitted(false); }}>Done</button></div> : <><div className="section-kicker">QUICK ENQUIRY</div><h2 id="quote-title">Tell us what you need.</h2><p className="modal-subtitle">Share a few details and JBR will help you move forward.</p><form onSubmit={submitQuote}><label>Name<input required placeholder="Your name" /></label><label>Phone number<input required type="tel" placeholder="Your phone number" /></label><label>What are you looking for?<textarea required placeholder="Product, category or requirement" rows={3} /></label><button className="button button-orange" type="submit">Get my quotation <ArrowRight size={17} /></button></form></>}</div></div>}
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={18} />; }
function PhoneIcon() { return <Phone size={18} />; }

export default App;
