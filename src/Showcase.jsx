import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useTilt } from './hooks/useTilt';
import { useLocation } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';


export const PRODUCTS = [
  {
    id: 'noir-oud',
    name: 'Noir Oud',
    notes: 'Oud · Amber · Musk',
    family: 'Floral',
    price: 'Rs 8,500',
    sizes: [
      { label: '30ML', price: 'Rs 6,000' },
      { label: '50ML', price: 'Rs 8,500' },
      { label: '100ML', price: 'Rs 14,500' },
    ],
    description:
      'A deep, resinous oud softened with warm amber and a base of dark musk. Bold enough for evening wear, built to last well past midnight.',
    image:
      'https://i.pinimg.com/736x/03/d2/66/03d2662cfd7414968bb954057edd49f5.jpg',
      hoverImage:
  'https://i.pinimg.com/736x/89/5b/7e/895b7e61e9e4f807a82b5cf1b384ee22.jpg',
  },
  {
    id: 'velours',
    name: 'Velours',
    notes: 'Rose · Sandalwood',
    family: 'Oud',
    price: 'Rs 7,200',
    sizes: [
      { label: '30ML', price: 'Rs 5,000' },
      { label: '50ML', price: 'Rs 7,200' },
      { label: '100ML', price: 'Rs 12,500' },
    ],
    description:
      'Rose de Mai over creamy sandalwood — soft, textured, and quietly confident. Wears close to skin rather than announcing itself.',
    image:
      'https://i.pinimg.com/736x/fa/90/5a/fa905a9d2937a55ab00b9c35eaf16482.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/47/27/39/472739c6da6c645d409bd8054bbc81de.jpg',
  },
  {
    id: 'ambre-nuit',
    name: 'Ambre Nuit',
    notes: 'Vanilla · Tobacco',
    family: 'Amber',
    price: 'Rs 9,000',
    sizes: [
      { label: '30ML', price: 'Rs 6,300' },
      { label: '50ML', price: 'Rs 9,000' },
      { label: '100ML', price: 'Rs 15,500' },
    ],
    description:
      'Warm vanilla wrapped around a dry tobacco leaf accord. Rich without being sweet — built for cold nights and long dinners.',
    image:
      'https://i.pinimg.com/736x/0b/1f/be/0b1fbefdb8d9ef154beffbb18a3fcad8.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/71/8f/19/718f19cda0f5704d5c59d7bec5e2c6f8.jpg',
  },
  {
    id: 'santal-rare',
    name: 'Santal Rare',
    notes: 'Cardamom · Cedar',
    family: 'Woody',
    price: 'Rs 7,800',
    sizes: [
      { label: '30ML', price: 'Rs 5,500' },
      { label: '50ML', price: 'Rs 7,800' },
      { label: '100ML', price: 'Rs 13,500' },
    ],
    description:
      'Spiced cardamom opens into dry cedarwood. Clean, understated, and versatile enough to wear from morning meetings into evening.',
    image:
      'https://i.pinimg.com/736x/7a/75/88/7a758822268613b2977a4bb63bdf8564.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/b4/78/f9/b478f95783aebb4c3dbb55d6ba083a87.jpg',
  },
  {
    id: 'nuit-blanche',
    name: 'Nuit Blanche',
    notes: 'Iris · Leather · Vetiver',
    family: 'Woody',
    price: 'Rs 8,900',
    sizes: [
      { label: '30ML', price: 'Rs 6,200' },
      { label: '50ML', price: 'Rs 8,900' },
      { label: '100ML', price: 'Rs 15,000' },
    ],
    description:
      'Powdery iris meets supple leather and earthy vetiver. Sophisticated and a little mysterious — our most requested evening scent.',
    image:
      'https://i.pinimg.com/736x/78/67/0e/78670e4244e60abc67b2cb39e43f2fa3.jpg',
        hoverImage:
  'https://i.pinimg.com/736x/a5/8f/3b/a58f3bad72f83b3f2dc6d5ac206dfbfe.jpg',
  },
  {
    id: 'cuir-noir',
    name: 'Cuir Noir',
    notes: 'Black Leather · Patchouli',
    family: 'Floral',
    price: 'Rs 9,400',
    sizes: [
      { label: '30ML', price: 'Rs 6,600' },
      { label: '50ML', price: 'Rs 9,400' },
      { label: '100ML', price: 'Rs 16,000' },
    ],
    description:
      'A dark leather accord grounded in patchouli. Confident, a little rebellious, and unmistakably long-lasting on skin.',
    image:
      'https://i.pinimg.com/736x/49/f4/98/49f4981f19c37974f009e82adb9fb6e4.jpg',
        hoverImage:
  'https://i.pinimg.com/736x/78/45/07/7845071143278a0e5fc0c2caca3cf56a.jpg',
  },
  {
    id: 'fleur-dombre',
    name: "Fleur d'Ombre",
    notes: 'Tuberose · Incense',
    family: 'Oud',
    price: 'Rs 8,200',
    sizes: [
      { label: '30ML', price: 'Rs 5,700' },
      { label: '50ML', price: 'Rs 8,200' },
      { label: '100ML', price: 'Rs 14,000' },
    ],
    description:
      'Heady white tuberose tempered with smoky incense. Dramatic in small doses, built for those who like to be remembered.',
    image:
      'https://i.pinimg.com/736x/ec/92/c0/ec92c060c8840a09f2b2f1ae20d0e135.jpg',
        hoverImage:
  'https://i.pinimg.com/736x/83/74/95/8374951e47b67d04a0af131ea9bb112e.jpg',
  },
  {
    id: 'epices-dorees',
    name: 'Épices Dorées',
    notes: 'Clove · Amberwood',
    family: 'Amber',
    price: 'Rs 8,700',
    sizes: [
      { label: '30ML', price: 'Rs 6,100' },
      { label: '50ML', price: 'Rs 8,700' },
      { label: '100ML', price: 'Rs 14,800' },
    ],
    description:
      'Warm clove spice over golden amberwood. Cozy and grounding — the kind of scent that feels like a favourite coat.',
    image:
      'https://i.pinimg.com/736x/5e/4e/bb/5e4ebb0687c0b31461e64eac5e9e9a71.jpg',
        hoverImage:
  'https://i.pinimg.com/736x/97/19/e3/9719e30cefc88823523b88dcde4bf855.jpg',
  },
  {
    id: 'bois-secret',
    name: 'Bois Secret',
    notes: 'Oud · Cedar · Saffron',
    family: 'Floral',
    price: 'Rs 9,600',
    sizes: [
      { label: '30ML', price: 'Rs 6,700' },
      { label: '50ML', price: 'Rs 9,600' },
      { label: '100ML', price: 'Rs 16,500' },
    ],
    description:
      'Rare oud layered with dry cedar and a touch of saffron. Deep, elegant, and quietly intense — made for evenings that leave an impression.',
    image:
      'https://i.pinimg.com/736x/08/b3/85/08b385d66b797a7e00d37e5f0c462cbb.jpg',
        hoverImage:
  'https://i.pinimg.com/736x/4e/67/9a/4e679a0672ba7fe66a3d598b2af87a49.jpg',
  },
  {
    id: 'rose-noire',
    name: 'Rose Noire',
    notes: 'Dark Rose · Musk · Amber',
    family: 'Oud',
    price: 'Rs 8,600',
    sizes: [
      { label: '30ML', price: 'Rs 6,000' },
      { label: '50ML', price: 'Rs 8,600' },
      { label: '100ML', price: 'Rs 14,700' },
    ],
    description:
      'A darker interpretation of rose, softened with warm amber and clean musk. Romantic without feeling overly sweet.',
    image:
      'https://i.pinimg.com/736x/51/96/89/519689cec8268de7061290dfba71e2ab.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/aa/3e/98/aa3e9851ca744889fbc89e873520c753.jpg',
  },
  {
    id: 'ambre-velours',
    name: 'Ambre Velours',
    notes: 'Amber · Vanilla · Tonka',
    family: 'Amber',
    price: 'Rs 9,200',
    sizes: [
      { label: '30ML', price: 'Rs 6,400' },
      { label: '50ML', price: 'Rs 9,200' },
      { label: '100ML', price: 'Rs 15,800' },
    ],
    description:
      'Silky amber meets creamy vanilla and tonka bean. Warm, smooth, and enveloping with a luxurious lingering finish.',
    image:
      'https://i.pinimg.com/736x/14/a6/87/14a687cd401c627352e8b567fdeaf4bc.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/4b/d2/28/4bd2283149591690f3c8747a6ebd8962.jpg',
  },
  {
    id: 'bois-dore',
    name: 'Bois Doré',
    notes: 'Cedar · Leather · Amber',
    family: 'Woody',
    price: 'Rs 9,800',
    sizes: [
      { label: '30ML', price: 'Rs 6,800' },
      { label: '50ML', price: 'Rs 9,800' },
      { label: '100ML', price: 'Rs 16,800' },
    ],
    description:
      'Polished cedarwood wrapped in soft leather and golden amber. Refined, confident, and designed for a distinctive signature.',
    image:
      'https://i.pinimg.com/736x/a8/25/26/a8252629ca3ca6b26f64aafed6c4e01b.jpg',
         hoverImage:
  'https://i.pinimg.com/736x/ea/39/47/ea3947e7785966fc6379635a1969efd8.jpg',
  
  },
];
function ProductCard({ product, onOpenQuickView }) {
  const cardRef = useRef(null);
  const { tilt, glow, handleMouseMove, handleMouseLeave } = useTilt(cardRef);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);

  function handleWishlist(e) {
    e.stopPropagation();
    toggleWishlist(product);
  }

  function handleAddToBag(e) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        padding: 0,
        minWidth: '0',
        transformStyle: 'preserve-3d',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* mouse-following glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(201,162,39,0.15), transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* IMAGE — bleeds edge-to-edge to the card's top and sides */}
      <div
        style={{
          position: 'relative',
          height: '260px',
          overflow: 'hidden',
        }}
      >
        <div
          className="product-image-swap"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-image-main"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85) saturate(1.05)',
              transition: 'opacity 0.4s ease',
            }}
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="product-image-hover"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) saturate(1.05)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          )}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.8rem',
            right: '0.8rem',
            background: 'rgba(11,9,6,0.55)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'var(--gold)' : 'none'}>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke={wishlisted ? 'var(--gold)' : 'var(--ivory)'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* TEXT — padding lives here only, not around the image */}
      <div style={{ position: 'relative', padding: '1.5rem 2rem 2rem' }}>
        <p className="eyebrow" style={{ fontSize: '0.62rem' }}>
          {product.notes}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 500,
            margin: '0.5rem 0 1rem',
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ color: 'var(--gold-soft)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
            {product.price}
          </p>
          <button
            onClick={handleAddToBag}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              color: added ? 'var(--gold)' : 'var(--ivory)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.5rem 0.9rem',
              cursor: 'pointer',
              transition: 'color 0.3s ease, border-color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              minWidth: '110px',
              justifyContent: 'center',
            }}
            className="add-to-cart-btn"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          >
            <svg className="cart-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: 'none' }}>
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

          <style>{`
            .add-to-cart-btn:hover .cart-btn-icon { display: block !important; }
            .add-to-cart-btn:hover .cart-btn-text { display: none; }
          `}</style>
        </div>
      </div>
    </motion.div>
  );
}

function QuickViewModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        background: 'rgba(11,9,6,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="quick-view-modal"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '86vh',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div style={{ position: 'relative', minHeight: '320px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div style={{ padding: '2.5rem', position: 'relative' }}>
          <button
            onClick={onClose}
            aria-label="Close quick view"
            style={{
              position: 'absolute',
              top: '1.4rem',
              right: '1.4rem',
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'var(--gold-soft)',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>

          <p className="eyebrow" style={{ fontSize: '0.62rem' }}>
            {product.notes}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 500,
              margin: '0.6rem 0 1rem',
            }}
          >
            {product.name}
          </h3>
          <p style={{ color: 'var(--gold-soft)', fontSize: '1rem', marginBottom: '1.4rem' }}>
            {product.price}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                −
              </button>
              <span style={{ color: 'var(--ivory)', fontSize: '0.95rem', minWidth: '14px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>

            <button className="btn-gold" onClick={handleAdd} style={{ flex: 1 }}>
              {added ? 'Added ✓' : 'Add to Bag'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Pill-style filter buttons — filters the grid below by scent family.
function FilterBar({ active, onChange }) {
  const FAMILIES = ['All', 'Oud', 'Floral', 'Woody', 'Amber'];
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.7rem',
        flexWrap: 'wrap',
        marginBottom: '3rem',
      }}
    >
      {FAMILIES.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            background: active === f ? 'var(--gold)' : 'transparent',
            color: active === f ? 'var(--bg)' : 'var(--ivory)',
            border: '1px solid var(--line)',
            borderColor: active === f ? 'var(--gold)' : 'var(--line)',
            padding: '0.5rem 1.2rem',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            borderRadius: '999px',
            transition: 'all 0.25s ease',
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default function Showcase() {
  useDocumentTitle(
    'Collection — Noir Oud | Twelve Signature Fragrances',
    'Browse twelve small-batch oud, floral, woody, and amber fragrances — hand-poured in Lahore, shipped nationwide.'
  );
  const location = useLocation();

  useEffect(() => {
    const id = location.state?.highlightId;
    if (!id) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`product-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-pulse');
      setTimeout(() => el.classList.remove('highlight-pulse'), 1600);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.state]);
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts =
    activeFilter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.family === activeFilter);

  return (
    <section id="collection" className="section" style={{ scrollMarginTop: '90px', paddingTop: 0, position: 'relative' }}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: '14rem',
          paddingBottom: '3.5rem',
          position: 'relative',
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,39,0.08), transparent 70%), linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg) 100%)',
          overflow: 'hidden',
          margin: '0 -6vw 3rem',
          padding: '14rem 6vw 3.5rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '620px',
            height: '620px',
            background: 'radial-gradient(circle, rgba(201,162,39,0.16) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '20%',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(138,75,35,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          The Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            margin: '1.4rem 0 1.6rem',
            position: 'relative',
          }}
        >
          A signature for every mood.
        </motion.h2>

        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '1px',
            background: 'var(--gold)',
            margin: '0.4rem auto 0',
            opacity: 0.6,
          }}
        />
      </div>

      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className="collection-grid">
        {filteredProducts.map((p) => (
          <ProductCard product={p} key={p.id} onOpenQuickView={setQuickViewProduct} />
        ))}
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .product-image-swap:hover .product-image-hover {
          opacity: 1 !important;
        }
        .product-image-swap:hover .product-image-main {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}