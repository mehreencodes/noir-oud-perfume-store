import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from './Showcase';
import { useCart } from './CartContext';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const REVIEWS_KEY = 'noir-oud-reviews';

function loadReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveReviews(all) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
}
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.1rem 0',
          color: 'var(--ivory)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {title}
        <span style={{ color: 'var(--gold-soft)', fontSize: '1.1rem' }}>{open ? '−' : '+'}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ paddingBottom: '1.4rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.8 }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function ProductAccordion({ product }) {
  return (
    <div style={{ marginTop: '2.5rem' }}>
      <AccordionItem title="Fragrance Notes">
        {product.notes} — every batch is aged a minimum of six weeks before
        it leaves the studio, letting the raw notes round out into
        something wearable.
      </AccordionItem>
      <AccordionItem title="Shipping & Returns">
        Orders are hand-packed in Lahore and shipped nationwide, arriving
        within 2–3 business days. If a fragrance isn't right for you, reach
        out within 7 days of delivery for an exchange.
      </AccordionItem>
      <AccordionItem title="How to Apply">
        Apply to pulse points — wrists, neck, and behind the ears — right
        after a shower when skin is clean and slightly damp for the best
        longevity. Avoid rubbing wrists together, as this breaks down the
        top notes faster.
      </AccordionItem>
    </div>
  );
}
function Stars({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange && onChange(n)}
          style={{ background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default', padding: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={n <= value ? 'var(--gold)' : 'none'}>
            <polygon
              points="12 2 15.09 8.63 22 9.24 16.5 14.14 18.18 21 12 17.27 5.82 21 7.5 14.14 2 9.24 8.91 8.63 12 2"
              stroke="var(--gold)"
              strokeWidth="1"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ZoomImage({ src, alt }) {
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '560px',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        cursor: 'zoom-in',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: zoom ? 'scale(1.8)' : 'scale(1)',
          transformOrigin: `${pos.x}% ${pos.y}%`,
          transition: zoom ? 'none' : 'transform 0.3s ease',
        }}
      />
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '9rem 2rem' }}>
        <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Not Found</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: '1rem 0 2rem' }}>
          We couldn't find that fragrance.
        </h2>
        <Link to="/collection" className="btn-gold" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Back to Collection
        </Link>
      </section>
    );
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
  useDocumentTitle(
    `${product.name} — Noir Oud | ${product.notes}`,
    product.description
  );

  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? product.sizes.find((s) => s.label === '50ML') || product.sizes[0] : null
  );
  const displayPrice = selectedSize ? selectedSize.price : product.price;

  const [allReviews, setAllReviews] = useState(loadReviews());
  const reviews = allReviews[product.id] || [];
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  function handleAdd() {
    const itemToAdd = selectedSize
      ? { ...product, price: selectedSize.price, size: selectedSize.label }
      : product;
    for (let i = 0; i < qty; i++) addToCart(itemToAdd);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    const itemToBuy = selectedSize
      ? { ...product, price: selectedSize.price, size: selectedSize.label, qty }
      : { ...product, qty };
    navigate('/checkout', {
      state: {
        items: [itemToBuy],
      },
    });
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const updated = {
      ...allReviews,
      [product.id]: [
        { ...newReview, date: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
        ...reviews,
      ],
    };
    setAllReviews(updated);
    saveReviews(updated);
    setNewReview({ name: '', rating: 5, text: '' });
    setShowForm(false);
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const others = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="section" style={{ scrollMarginTop: '90px', paddingTop: '7rem' }}>
      <Link
        to="/collection"
        style={{
          color: 'var(--muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '2.5rem',
        }}
      >
        ← Back to Collection
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}
        className="product-page-grid"
      >
        <ZoomImage src={product.image} alt={product.name} />

        <div>
          <p className="eyebrow" style={{ fontSize: '0.62rem' }}>{product.notes}</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              margin: '0.8rem 0 1rem',
            }}
          >
            {product.name}
          </h1>

          {avgRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
              <Stars value={Math.round(avgRating)} />
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                {avgRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <p style={{ color: 'var(--gold-soft)', fontSize: '1.1rem', marginBottom: '1.8rem' }}>
            {displayPrice}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
            {product.description}
          </p>

          {hasSizes && (
            <div style={{ marginBottom: '2rem' }}>
              <p
                style={{
                  fontSize: '0.66rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '0.8rem',
                }}
              >
                Size
              </p>
              <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => {
                  const isActive = selectedSize?.label === s.label;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        background: isActive ? 'var(--gold)' : 'transparent',
                        color: isActive ? 'var(--bg)' : 'var(--ivory)',
                        border: `1px solid ${isActive ? 'var(--gold)' : 'var(--line)'}`,
                        padding: '0.6rem 1.1rem',
                        fontSize: '0.8rem',
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.15rem',
                        minWidth: '82px',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{s.label}</span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>{s.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '30px', height: '30px', cursor: 'pointer' }}
              >
                −
              </button>
              <span style={{ color: 'var(--ivory)', fontSize: '0.95rem', minWidth: '14px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '30px', height: '30px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>

                       <button
              className="btn-gold add-to-cart-btn"
              onClick={handleAdd}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '160px' }}
            >
              <svg className="cart-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ display: 'none' }}>
                <path
                  d="M6.5 8.5H17.5L18.3 20.5C18.35 21.15 17.83 21.7 17.18 21.7H6.82C6.17 21.7 5.65 21.15 5.7 20.5L6.5 8.5Z"
                  stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
                />
                <path
                  d="M9 8V6.5C9 4.84 10.34 3.5 12 3.5C13.66 3.5 15 4.84 15 6.5V8"
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                />
              </svg>
              <span className="cart-btn-text">{added ? 'Added ✓' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              style={{
                flex: 1,
                minWidth: '160px',
                background: 'transparent',
                border: '1px solid var(--gold)',
                color: 'var(--gold-soft)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '0.9rem 1.2rem',
                cursor: 'pointer',
                transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = 'var(--bg)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,162,39,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--gold-soft)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Buy It Now
            </button>
          </div>

          {/* Accordion: Ingredients, Shipping, How to Apply */}
          <ProductAccordion product={product} />
        </div>
      </motion.div>

      <div style={{ marginTop: '5rem', maxWidth: '760px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <p className="eyebrow" style={{ fontSize: '0.62rem' }}>
            Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
          </p>
          <button
            onClick={() => setShowForm((s) => !s)}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              color: 'var(--gold-soft)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.55rem 1.1rem',
              cursor: 'pointer',
            }}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmitReview}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', padding: '1.6rem', marginBottom: '2rem' }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.6rem' }}>
                Your Rating
              </label>
              <Stars value={newReview.rating} onChange={(n) => setNewReview({ ...newReview, rating: n })} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.6rem' }}>
                Your Name
              </label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', color: 'var(--ivory)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', padding: '0.5rem 0', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.6rem' }}>
                Your Review
              </label>
              <textarea
                rows={3}
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', color: 'var(--ivory)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', padding: '0.5rem 0', outline: 'none', resize: 'none' }}
              />
            </div>
            <button type="submit" className="btn-gold">Submit Review</button>
          </motion.form>
        )}

        {reviews.length === 0 && !showForm && (
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            No reviews yet — be the first to share your experience with this fragrance.
          </p>
        )}

        {reviews.map((r, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--line)', padding: '1.4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <Stars value={r.rating} />
              <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{r.date}</span>
            </div>
            <p style={{ color: 'var(--ivory)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
              {r.text}
            </p>
            <p style={{ color: 'var(--gold-soft)', fontSize: '0.78rem' }}>{r.name}</p>
          </div>
        ))}
      </div>

      {others.length > 0 && (
        <div style={{ marginTop: '5rem' }}>
          <p className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: '1.5rem' }}>
            You May Also Like
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: 'none', color: 'var(--ivory)', flex: '1 1 200px' }}
              >
                <div style={{ height: '160px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{p.name}</p>
                <p style={{ color: 'var(--gold-soft)', fontSize: '0.85rem' }}>{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .product-page-grid { grid-template-columns: 1fr !important; }
        }
      
        @media (max-width: 760px) {
          .product-page-grid { grid-template-columns: 1fr !important; }
        }
        .add-to-cart-btn:hover .cart-btn-icon { display: block !important; }
        .add-to-cart-btn:hover .cart-btn-text { display: none; }
      `}
      </style>
    </section>
  );
}