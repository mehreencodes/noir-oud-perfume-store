import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Expertly Crafted',
    text: 'Blended by master perfumers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2c1.5 3 4 5.5 4 9a4 4 0 1 1-8 0c0-3.5 2.5-6 4-9Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 19.5h7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Long Lasting',
    text: 'Premium quality for all-day freshness',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 7.5V12l3 2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Elegant Packaging',
    text: 'Designed to reflect luxury & perfection',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 7 12 11.5 20.5 7M12 11.5v10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// Sits with a negative top margin so it overlaps the bottom of the Hero
// section — a semi-transparent "glass" panel rather than a boxed section,
// matching premium reference sites where the feature strip floats over
// the hero imagery instead of sitting in its own hard block.
export default function HeroFeatures() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '-60px',
        zIndex: 5,
        padding: '0 6vw',
      }}
    >
      <div
        className="hero-features-glass"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'rgba(20,16,11,0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(201,162,39,0.25)',
          borderRadius: '6px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          padding: '2rem 2.5rem',
        }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.9rem',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-soft)',
              }}
            >
              {f.icon}
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--ivory)',
                  marginBottom: '0.35rem',
                }}
              >
                {f.title}
              </p>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.8rem',
                  lineHeight: 1.55,
                }}
              >
                {f.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-features-glass {
            grid-template-columns: 1fr !important;
            gap: 1.4rem !important;
            padding: 1.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}