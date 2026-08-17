import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from './hooks/useDocumentTitle';


function Bottle() {
  return (
    <motion.div
      className="hero-bottle"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        width: '680px',
        maxWidth: '92vw',
      }}
    >
      {/* wider, stronger ambient glow behind the bottle */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '520px',
          background:
            'radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <img
        className="hero-bottle-img"
        src="src/assets/perfume.png"
        alt="Luxury perfume bottle"
        style={{
          position: 'relative',
          width: '100%',
          height: '680px',
          maxHeight: '78vh',
          objectFit: 'contain',
          display: 'block',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 78%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, black 78%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: '-20px',
          height: '110px',
          background:
            'radial-gradient(ellipse at center, rgba(201,162,39,0.2) 0%, transparent 75%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  useDocumentTitle(
      'Noir Oud — A Scent Studio | Small-Batch Oud Perfumes',
      'Noir Oud is a Lahore-based scent studio crafting small-batch oud, amber, and rare floral fragrances.'
    );
  const navigate = useNavigate();
  return (
   <section
  id="home"
  className="section hero-section"
  style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    paddingTop: '8.5rem',
    flexWrap: 'wrap',
    position: 'relative',
    overflow: 'hidden',
  }}
>
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(201,162,39,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '580px', zIndex: 2 }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          A Scent Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
            lineHeight: 1.08,
            margin: '1.2rem 0 1.5rem',
          }}
        >
          Scent that{' '}
          <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>
            lingers
          </em>
          <br />
          in memory.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{
            color: 'var(--muted)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '440px',
            marginBottom: '2.5rem',
          }}
        >
          Rare oud, aged resins, and single-origin florals — poured in small
          batches for those who wear fragrance as identity, not habit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
        >
          <button
            className="btn-gold"
            onClick={() => navigate('/collection')}
          >
            Discover the Collection
          </button>
          <button
            onClick={() => navigate('/story')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              cursor: 'pointer',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '0.3rem',
            }}
          >
            Our Story ↓
          </button>
        </motion.div>
      </div>

     <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ zIndex: 2 }}
      >
        <Bottle />
      </motion.div>

<style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 8.5rem !important;
            padding-bottom: 2rem !important;
            justify-content: center !important;
            text-align: center;
          }
          .hero-section > div:first-child {
            max-width: 100% !important;
          }
          .hero-section > div:first-child > div:last-child {
            justify-content: center !important;
          }
          .hero-bottle {
            width: 340px !important;
            margin-top: -1rem !important;
            margin-bottom: -1rem !important;
          }
          .hero-bottle-img {
            height: 380px !important;
            max-height: 50vh !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section { padding-top: 7.5rem !important; }
          .hero-bottle {
            width: 280px !important;
          }
          .hero-bottle-img {
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}