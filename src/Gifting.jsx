import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from './Showcase';
import { useCart } from './CartContext';
import { useDocumentTitle } from './hooks/useDocumentTitle';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const digits = String(priceStr).replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

// Curated bundles — pulled live from PRODUCTS so images/prices always
// stay in sync with the main catalogue. Each bundle is priced ~15%
// below the sum of its individual items.
const GIFT_SETS = [
  {
    id: 'signature-duo',
    title: 'The Signature Duo',
    subtitle: 'Oud · Amber · Musk',
    tagline: 'Our two most-loved fragrances, paired for a first impression that lasts.',
    productIds: ['noir-oud', 'velours'],
  },
  {
    id: 'discovery-trio',
    title: 'The Discovery Trio',
    subtitle: 'Cardamom · Vanilla · Rose',
    tagline: 'A curated trio spanning our three signature scent families — the perfect introduction to Noir Oud.',
    productIds: ['santal-rare', 'ambre-nuit', 'rose-noire'],
  },
  {
    id: 'evening-edit',
    title: 'The Evening Edit',
    subtitle: 'Leather · Iris · Vetiver',
    tagline: 'Two deep, after-dark fragrances built for occasions worth dressing up for.',
    productIds: ['cuir-noir', 'nuit-blanche'],
  },
];

function GiftIntro() {
  return (
    <section
      style={{
        paddingTop: '13rem',
        paddingBottom: '2rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.14) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative' }}
      >
        Curated Gift Sets
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          color: 'var(--ivory)',
          margin: '1rem 0 1.2rem',
          position: 'relative',
        }}
      >
        Give a scent, not a guess.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{
          color: 'var(--muted)',
          fontSize: '0.92rem',
          letterSpacing: '0.03em',
          position: 'relative',
          maxWidth: '460px',
          margin: '0 auto',
          lineHeight: 1.8,
        }}
      >
        Thoughtfully paired sets, boxed and ready — each one designed to feel
        like more than the sum of its bottles.
      </motion.p>
    </section>
  );
}

function GiftSetCard({ set, index }) {
  const items = set.productIds.map(findProduct).filter(Boolean);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const originalTotal = items.reduce((sum, p) => sum + parsePrice(p.price), 0);
  const bundlePrice = Math.round((originalTotal * 0.85) / 50) * 50; // ~15% off, rounded
  const savings = originalTotal - bundlePrice;

  function handleAddSet() {
    items.forEach((p) => addToCart(p));
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="gift-set-card"
      style={{
        display: 'grid',
        gridTemplateColumns: isReversed ? '1fr 1.05fr' : '1.05fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        padding: '3rem 0',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* IMAGE COLLAGE */}
      <div
        style={{
          order: isReversed ? 2 : 1,
          position: 'relative',
          height: '360px',
        }}
        className="gift-collage"
      >
        {items.map((p, i) => {
          const total = items.length;
          const spread = 64;
          const offset = (i - (total - 1) / 2) * spread;
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: `${10 + i * 6}%`,
                left: `calc(50% + ${offset}px)`,
                transform: 'translateX(-50%)',
                width: '190px',
                height: '260px',
                zIndex: i,
                border: '1px solid var(--line)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                background: 'var(--bg-card)',
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.88) saturate(1.05)',
                }}
              />
            </div>
          );
        })}

        {savings > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '4%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: items.length + 1,
              background: 'var(--gold)',
              color: 'var(--bg)',
              fontSize: '0.66rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '0.5rem 1rem',
              boxShadow: '0 8px 20px rgba(201,162,39,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            Save Rs {savings.toLocaleString()}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div style={{ order: isReversed ? 1 : 2 }}>
        <p className="eyebrow" style={{ fontSize: '0.62rem' }}>{set.subtitle}</p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
            margin: '0.6rem 0 1rem',
            color: 'var(--ivory)',
          }}
        >
          {set.title}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '1.6rem', maxWidth: '440px' }}>
          {set.tagline}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.8rem' }}>
          {items.map((p) => (
            <li
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.6rem 0',
                borderBottom: '1px solid var(--line)',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ color: 'var(--ivory)' }}>{p.name}</span>
              <span style={{ color: 'var(--muted)' }}>{p.price}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1.6rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold-soft)' }}>
            Rs {bundlePrice.toLocaleString()}
          </span>
          {savings > 0 && (
            <span
              style={{
                color: 'var(--muted)',
                fontSize: '0.85rem',
                textDecoration: 'line-through',
              }}
            >
              Rs {originalTotal.toLocaleString()}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleAddSet}
            className="btn-gold"
            style={{ minWidth: '190px' }}
          >
            {added ? 'Added to Bag ✓' : 'Add Set to Bag'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function GiftNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: '4rem',
        border: '1px solid rgba(201,162,39,0.35)',
        background: 'rgba(201,162,39,0.04)',
        padding: '2.4rem',
        display: 'flex',
        gap: '1.6rem',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          flexShrink: 0,
          borderRadius: '50%',
          border: '1px solid var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20 12v8H4v-8M2 7h20v5H2V7ZM12 7v13M12 7c-1.5-3-6-4-6 0s4.5 3 6 0ZM12 7c1.5-3 6-4 6 0s-4.5 3-6 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p style={{ color: 'var(--ivory)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
          Every set arrives gift-ready.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '540px' }}>
          Each bundle is hand-packed in matte black gift box with a ribboned
          seal — no extra charge, no extra step. Mention a note for the
          recipient when you checkout via WhatsApp and we'll include a
          handwritten card.
        </p>
      </div>
    </motion.div>
  );
}

export default function Gifting() {
  useDocumentTitle(
    'Gift Sets — Noir Oud | Curated Fragrance Bundles',
    'Thoughtfully paired fragrance sets, gift-boxed and ready to send. Save when you shop our curated Noir Oud bundles.'
  );

  return (
    <>
      <GiftIntro />

      <section className="section" style={{ scrollMarginTop: '90px', paddingBottom: '4rem' }}>
        {GIFT_SETS.map((set, i) => (
          <GiftSetCard set={set} index={i} key={set.id} />
        ))}

        <GiftNote />

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
            Prefer to build your own set?
          </p>
          <Link
            to="/collection"
            className="btn-gold"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Browse the Full Collection
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .gift-set-card {
            grid-template-columns: 1fr !important;
          }
          .gift-set-card > div {
            order: unset !important;
          }
          .gift-collage {
            height: 300px !important;
          }
        }
      `}</style>
    </>
  );
}