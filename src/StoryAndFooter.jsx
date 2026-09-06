import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const STATS = [
  { value: '6', unit: 'weeks', label: 'Minimum ageing' },
  { value: '3', unit: 'countries', label: 'Raw material sourcing' },
  { value: '2019', unit: '', label: 'Studio established' },
];

// Intro banner for the /story page — sets context before the Story
// section itself, matching the site's dark-luxury visual language.
  function StoryIntro() {
  const stages = ['Harvest', 'Distill', 'Rest', 'Bottle'];

  return (
    <section
      style={{
        paddingTop: '14rem',
        paddingBottom: '4rem',
        textAlign: 'center',
        position: 'relative',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,39,0.08), transparent 70%), linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg) 100%)',
        overflow: 'hidden',
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
          right: '20%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(138,75,35,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
        The Craft
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          color: 'var(--ivory)',
          margin: '1rem 0 2.2rem',
          position: 'relative',
        }}
      >
        Six weeks in the making.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.8rem',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {stages.map((stage, i) => (
          <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold-soft)',
              }}
            >
              {stage}
            </span>
            {i < stages.length - 1 && (
              <span
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'var(--line)',
                  display: 'inline-block',
                }}
              />
            )}
            </div>
        ))}
      </motion.div>

      <div
        style={{
          position: 'relative',
          width: '64px',
          height: '1px',
          background: 'var(--gold)',
          margin: '2.2rem auto 0',
          opacity: 0.6,
        }}
      />
    </section>
  );
}

export function Story() {
  useDocumentTitle(
    'Our Story — Noir Oud | Small-Batch Since 2019',
    'Six weeks minimum ageing, three countries of sourcing — the craft behind every Noir Oud bottle.'
  );
  return (
    <>
      <StoryIntro />

      <section
        id="story"
        className="section"
        style={{
          background: 'var(--bg-elevated)',
          position: 'relative',
          overflow: 'hidden',
          scrollMarginTop: '90px',
        }}
      >
        {/* giant watermark numeral sitting behind everything — editorial detail */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-4rem',
            left: '-1rem',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(9rem, 18vw, 16rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,162,39,0.12)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          2019
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(280px, 0.9fr)',
            gap: '5rem',
            alignItems: 'start',
            position: 'relative',
            zIndex: 1,
          }}
          className="story-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">Since 2019</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                margin: '1rem 0 1.8rem',
                lineHeight: 1.15,
              }}
            >
              Distilled in small batches,
              <br />
              never rushed.
            </h2>
            <p
              style={{
                color: 'var(--muted)',
                lineHeight: 1.9,
                maxWidth: '480px',
                marginBottom: '1.5rem',
              }}
            >
              Every bottle is aged for a minimum of six weeks before it leaves
              our studio. No mass production, no shortcuts — just oud, resin,
              and time.
            </p>
            <p
              style={{
                color: 'var(--muted)',
                lineHeight: 1.9,
                maxWidth: '480px',
                marginBottom: '3rem',
              }}
            >
              We work with growers in three countries to source raw materials
              that most fragrance houses have stopped bothering with.
            </p>

            {/* stat strip — editorial detail, three numbers divided by hairlines */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--line)',
                paddingTop: '2rem',
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{
                    paddingRight: i < STATS.length - 1 ? '2.5rem' : 0,
                    borderRight:
                      i < STATS.length - 1 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.3rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.4rem',
                        color: 'var(--gold-soft)',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--muted)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginTop: '0.5rem',
                      maxWidth: '140px',
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* image with an offset gold frame + overlapping quote card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            style={{ position: 'relative', paddingBottom: '2.5rem' }}
          >
            {/* offset frame sitting behind the photo */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                right: '-18px',
                bottom: '38px',
                border: '1px solid var(--gold)',
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                height: '420px',
                backgroundImage:
                  'linear-gradient(rgba(11,9,6,0.35), rgba(11,9,6,0.55)), url(https://i.pinimg.com/736x/5b/85/7f/5b857fd982f088d913eea8739644162c.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--line)',
              }}
            />

            {/* quote card overlapping the bottom-left corner of the photo */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '-1.5rem',
                width: '78%',
                background: 'var(--bg-card)',
                border: '1px solid var(--gold)',
                padding: '1.6rem 1.8rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  color: 'var(--gold-soft)',
                  lineHeight: 1.4,
                  display: 'block',
                }}
              >
                "Fragrance is the memory you leave in a room."
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const COLUMNS = [
    {
      heading: 'Explore',
      links: [
        { label: 'Collection', href: '/collection' },
        { label: 'Composition', href: '/#composition' },
        { label: 'Story', href: '/story' },
        { label: 'Journal', href: '/journal' },
      ],
    },
    {
      heading: 'Studio',
      links: [
        { label: 'Lahore', href: '/contact' },
        { label: 'Karachi', href: '/contact' },
        { label: 'Islamabad', href: '/contact' },
      ],
    },
    {
      heading: 'Follow',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'Pinterest', href: '#' },
      ],
    },
  ];

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 6vw 2.5rem',
      }}
    >
      {/* giant faded wordmark watermark, echoes the Story section's numeral */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(6rem, 16vw, 13rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,162,39,0.08)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Noir Oud
      </span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* top: wordmark + newsletter */}
        <div
          className="footer-top"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '3rem',
            alignItems: 'end',
            marginBottom: '4rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                color: 'var(--ivory)',
                marginBottom: '0.6rem',
              }}
            >
              Noir Oud
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              A scent studio, established 2019.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ minWidth: '280px' }}
          >
            <p
              className="eyebrow"
              style={{ fontSize: '0.62rem', marginBottom: '0.8rem' }}
            >
              Join the list
            </p>
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--line)',
                paddingBottom: '0.6rem',
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--ivory)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--gold-soft)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {subscribed ? 'Joined ✓' : 'Subscribe →'}
              </button>
            </div>
          </motion.form>
        </div>

        <div className="hairline" style={{ marginBottom: '3rem' }} />

        {/* nav columns */}
        <div
          className="footer-columns"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
            marginBottom: '3.5rem',
            maxWidth: '600px',
          }}
        >
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-soft)',
                  marginBottom: '1rem',
                }}
              >
                {col.heading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={{
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ivory)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* bottom bar */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--line)',
          }}
        >
          <p style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
            © 2026 Noir Oud Studio. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              color: 'var(--gold-soft)',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: left;
          }
          .footer-columns {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem 1.5rem !important;
          }
          .footer-bottom-bar {
            justify-content: center !important;
            text-align: center;
            flex-direction: column-reverse;
          }
        }
        @media (max-width: 480px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 1.6rem !important;
          }
        }
      `}</style>
    </footer>
  );
}