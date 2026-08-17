import { motion } from 'framer-motion';


const PHOTOS = [
  'https://i.pinimg.com/736x/93/35/a5/9335a5c1194b12fd71374ee90a8cfa62.jpg',
  'https://i.pinimg.com/1200x/fc/55/19/fc5519adf4896bf2b385b4a2a0e1bc62.jpg',
  'https://i.pinimg.com/736x/65/4f/81/654f8194cb93dce17c0e4744e81fd6fc.jpg',
  'https://i.pinimg.com/1200x/37/05/81/3705817a5a8ab0125f712b1b3e2cfed1.jpg',
  'https://i.pinimg.com/736x/ea/1d/4b/ea1d4bbd3316347be3f36c1e347fc2fb.jpg',
  'https://i.pinimg.com/736x/b8/f8/5a/b8f85afa443789bc94a2852b47bfff93.jpg',
  'https://i.pinimg.com/736x/40/ee/b7/40eeb747bca9769b407313533071037e.jpg',
];

export default function Lookbook() {
  return (
    <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Lookbook
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
        Life in Noir Oud.
      </motion.h2>

      <div
        className="lookbook-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(2, 220px)',
          gap: '0.8rem',
        }}
      >
        {PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              
gridColumn: i === 0 || i === 3 || i === 6 ? 'span 2' : 'span 1',
              gridRow: i === 0 ? 'span 2' : 'span 1',
              border: '1px solid var(--line)',
            }}
            className="lookbook-item"
          >
            <img
              src={src}
              alt="Noir Oud lifestyle"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.88) saturate(1.05)',
                transition: 'transform 0.5s ease, filter 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
                e.currentTarget.style.filter = 'brightness(1) saturate(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(0.88) saturate(1.05)';
              }}
            />
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lookbook-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 160px !important;
            grid-template-rows: unset !important;
            grid-auto-flow: dense !important;
          }
          .lookbook-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .lookbook-item:nth-child(1) {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
          }
          .lookbook-item:nth-child(5) {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 480px) {
          .lookbook-grid { grid-auto-rows: 140px !important; }
        }
      `}</style>
    </section>
  );
}