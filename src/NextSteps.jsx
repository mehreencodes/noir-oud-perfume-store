import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Browse the Collection',
    text: 'Twelve scents, filtered by family — or take the Scent Finder quiz if you\'re not sure where to start.',
  },
  {
    num: '02',
    title: 'Message Us on WhatsApp',
    text: 'Add to bag, then send your order straight to our studio — no account, no checkout forms.',
  },
  {
    num: '03',
    title: 'Delivered to Your Door',
    text: 'Hand-packed in Lahore, shipped nationwide. Most orders arrive within 2–3 days.',
  },
];

// Compact 3-step strip — makes the ordering process explicit instead of
// leaving people to guess how buying actually works.
export function HowItWorks() {
  return (
    <section
      className="section"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        How It Works
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
          margin: '1rem 0 3rem',
        }}
      >
        From browse to bottle.
      </motion.h2>

      <div
        className="how-it-works-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem',
        }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            style={{
              borderTop: '1px solid var(--line)',
              paddingTop: '1.6rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.3rem',
                color: 'var(--gold-soft)',
                display: 'block',
                marginBottom: '0.8rem',
              }}
            >
              {step.num}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '1.25rem',
                color: 'var(--ivory)',
                marginBottom: '0.7rem',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.88rem',
                lineHeight: 1.75,
              }}
            >
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .how-it-works-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}

// Single, quiet closing line + one button — the one clear next step
// before the footer, not another full section.
export function FinalCTA() {
  return (
    <section
      style={{
        padding: '4rem 6vw',
        textAlign: 'center',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
          color: 'var(--ivory)',
          marginBottom: '1.6rem',
        }}
      >
        Found your signature scent yet?
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* <Link to="/collection" className="btn-gold" style={{ textDecoration: 'none' }}>
          Explore the Collection
        </Link> */}
        <Link
  to="/collection"
  className="btn-gold"
  style={{
    textDecoration: 'none',
    display: 'inline-block',
    width: '100%',
    maxWidth: '320px',
  }}
>
  Explore the Collection
</Link>
      </motion.div>
    </section>
  );
}