import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from './Showcase';
import { useCart } from './CartContext';

// Hand-picked for the homepage — swap these ids for whichever
// fragrances you want to feature (e.g. best sellers, new arrivals).
const FEATURED_IDS = ['noir-oud', 'velours', 'ambre-nuit', 'bois-dore'];

function FeaturedCard({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAdd(e) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: '230px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.88) saturate(1.05)',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      <div style={{ padding: '1.5rem' }}>
        <p className="eyebrow" style={{ fontSize: '0.6rem' }}>
          {product.notes}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 500,
            color: 'var(--ivory)',
            margin: '0.5rem 0 0.9rem',
          }}
        >
          {product.name}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--gold-soft)', fontSize: '0.88rem' }}>{product.price}</span>
          <button
            onClick={handleAdd}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              color: added ? 'var(--gold)' : 'var(--ivory)',
              fontSize: '0.63rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.45rem 0.8rem',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          >
            {added ? 'Added ✓' : '+ Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const featured = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Studio Favourites
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
          margin: '1rem 0 2.5rem',
        }}
      >
        A few to start with.
      </motion.h2>

      <div
        className="featured-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {featured.map((p) => (
          <FeaturedCard product={p} key={p.id} />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/collection"
          className="btn-gold"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          View All Collection
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}