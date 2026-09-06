import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const POSTS = [
  {
    id: 'aged',
    title: 'Why oud is aged, not distilled fast',
    category: 'Craft',
    date: 'Jul 2026',
    readTime: '6 min read',
    excerpt:
      'Most fragrance houses rush agarwood through production. We don\'t — here\'s what six weeks of rest actually does to the oil.',
    image:
      'https://i.pinimg.com/1200x/18/d3/a9/18d3a93338359bd6975ff33f1442c39d.jpg',
  },
  {
    id: 'studio',
    title: 'Inside our Lahore blending studio',
    category: 'Studio',
    date: 'Jun 2026',
    readTime: '4 min read',
    excerpt:
      'A look at the small-batch process — from raw resin to a finished bottle, entirely done by hand under one roof.',
    image:
      'https://i.pinimg.com/736x/1c/72/37/1c7237c7b283f89c9fbaee0bcacc0b19.jpg',
  },
  {
    id: 'humid',
    title: 'Layering fragrance for humid weather',
    category: 'Guide',
    date: 'May 2026',
    readTime: '3 min read',
    excerpt:
      'Heat changes how a scent reads on skin. Here\'s how to layer oud-heavy fragrances so they don\'t overwhelm in summer.',
    image:
      'https://i.pinimg.com/736x/8a/7d/f2/8a7df214183396ba3f9baa13ecf9e42a.jpg',
  },
];

function JournalIntro() {
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
        Notes & Guides
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
          margin: '1.4rem 0 1.4rem',
          position: 'relative',
        }}
      >
        Writing from the studio.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{
          color: 'var(--muted)',
          fontSize: '0.9rem',
          letterSpacing: '0.04em',
          position: 'relative',
        }}
      >
        {POSTS.length} entries · craft, guides, and life inside the studio
      </motion.p>

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

function JournalDeck() {
  const [order, setOrder] = useState(POSTS.map((p) => p.id));

  function bringToFront(id) {
    setOrder((prev) => [id, ...prev.filter((item) => item !== id)]);
  }

  const slots = [
    { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
    { x: 34, y: 26, rotate: -4, scale: 0.94, zIndex: 2 },
    { x: 64, y: 50, rotate: -7, scale: 0.88, zIndex: 1 },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 480px) auto',
        gap: '3.5rem',
        alignItems: 'center',
      }}
      className="journal-deck-wrap"
    >
      <div style={{ position: 'relative', height: '480px' }}>
        {order.map((id, slotIndex) => {
          const post = POSTS.find((p) => p.id === id);
          const slot = slots[slotIndex];
          const isFront = slotIndex === 0;

          return (
            <motion.div
              key={id}
              layout
              onClick={() => !isFront && bringToFront(id)}
              animate={{
                x: slot.x,
                y: slot.y,
                rotate: slot.rotate,
                scale: slot.scale,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: slot.zIndex,
                cursor: isFront ? 'default' : 'pointer',
                border: '1px solid var(--line)',
                background: 'var(--bg-card)',
                overflow: 'hidden',
                boxShadow: isFront
                  ? '0 30px 60px rgba(0,0,0,0.5)'
                  : '0 15px 30px rgba(0,0,0,0.35)',
              }}
            >
              <div style={{ position: 'relative', height: '58%' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isFront ? 'none' : 'brightness(0.6)',
                    transition: 'filter 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 60%, var(--bg-card) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    left: '1.2rem',
                    background: 'rgba(11,9,6,0.7)',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold-soft)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '0.4rem 0.9rem',
                  }}
                >
                  {post.category}
                </span>
              </div>

              <div style={{ padding: '1.6rem 1.8rem', opacity: isFront ? 1 : 0 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                    color: 'var(--ivory)',
                    lineHeight: 1.25,
                    marginBottom: '0.7rem',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                  }}
                >
                  {post.excerpt}
                </p>
                <span
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {post.date} · {post.readTime}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        {POSTS.map((post, i) => {
          const isFront = order[0] === post.id;
          return (
            <button
              key={post.id}
              onClick={() => bringToFront(post.id)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.9rem 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  color: isFront ? 'var(--gold-soft)' : 'var(--muted)',
                  transition: 'color 0.3s ease',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  color: isFront ? 'var(--ivory)' : 'var(--muted)',
                  maxWidth: '160px',
                  transition: 'color 0.3s ease',
                }}
              >
                {post.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Journal() {
  useDocumentTitle(
    'Journal — Noir Oud | Notes from the Studio',
    'Guides on fragrance layering, the craft of oud ageing, and life inside our Lahore studio.'
  );
  return (
    <>
      <JournalIntro />

      <section id="journal" className="section" style={{ scrollMarginTop: '90px' }}>
        <JournalDeck />
      </section>
    </>
  );
}

function ContactIntro() {
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative' }}
      >
        We'd Love to Hear From You
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
          margin: '1.4rem 0 1.4rem',
          position: 'relative',
        }}
      >
        Let's talk fragrance.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{
          color: 'var(--muted)',
          fontSize: '0.9rem',
          letterSpacing: '0.04em',
          position: 'relative',
        }}
      >
        Three studios across Pakistan · replies within 24 hours
      </motion.p>

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

export function Contact() {
    useDocumentTitle(
    'Contact Us — Noir Oud | Lahore, Karachi, Islamabad',
    'Visit our studios in Lahore, Karachi, or Islamabad — or message us directly. We reply within 24 hours.'
  );
  const [activeCity, setActiveCity] = useState('Lahore');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const CITIES = [
    { name: 'Lahore', detail: 'Flagship studio · MM Alam Road' },
    { name: 'Karachi', detail: 'Boutique · Zamzama Boulevard' },
    { name: 'Islamabad', detail: 'By appointment · F-7 Markaz' },
  ];

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwlwgbr';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error('Formspree request failed');

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Formspree error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  return (
    <>
      <ContactIntro />

      <section
        id="contact"
        className="section"
        style={{ background: 'var(--bg-elevated)', scrollMarginTop: '90px' }}
      >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Get in Touch
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
          margin: '1rem 0 3.5rem',
          maxWidth: '600px',
        }}
      >
        Visit the studio, or write to us.
      </motion.h2>

      <div
        className="contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          maxWidth: '1050px',
          alignItems: 'start',
        }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {['name', 'email', 'message'].map((field) => (
            <div key={field} style={{ marginBottom: '1.8rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-soft)',
                  marginBottom: '0.6rem',
                }}
              >
                {field === 'name' ? 'Your Name' : field === 'email' ? 'Email' : 'Message'}
              </label>
              {field === 'message' ? (
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--line)',
                    color: 'var(--ivory)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    padding: '0.5rem 0',
                    resize: 'none',
                    outline: 'none',
                  }}
                />
              ) : (
                <input
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--line)',
                    color: 'var(--ivory)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    padding: '0.5rem 0',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'var(--line)')}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn-gold"
            disabled={status === 'sending'}
            style={{ marginTop: '0.5rem', opacity: status === 'sending' ? 0.6 : 1 }}
          >
            {status === 'sending'
              ? 'Sending...'
              : status === 'sent'
              ? 'Sent ✓'
              : 'Send Message'}
          </button>
          <p
            style={{
              color: status === 'error' ? '#c0645a' : 'var(--muted)',
              fontSize: '0.72rem',
              marginTop: '1rem',
              letterSpacing: '0.03em',
            }}
          >
            {status === 'error'
              ? "Something went wrong — please try again or email us directly."
              : status === 'sent'
              ? "Thanks — we'll reply within 24 hours."
              : 'We reply within 24 hours.'}
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: '1.6rem' }}>
            Studio Locations
          </p>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.4rem',
              padding: '0 4px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '4px',
                right: '4px',
                height: '1px',
                background: 'var(--line)',
              }}
            />
            {CITIES.map((city) => {
              const isActive = activeCity === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => setActiveCity(city.name)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.7rem',
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      width: isActive ? '11px' : '9px',
                      height: isActive ? '11px' : '9px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--gold)' : 'var(--bg-elevated)',
                      border: `1px solid ${isActive ? 'var(--gold)' : 'var(--muted)'}`,
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 0 12px rgba(201,162,39,0.6)' : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      color: isActive ? 'var(--gold-soft)' : 'var(--muted)',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {city.name}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeCity}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                color: 'var(--muted)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                borderTop: '1px solid var(--line)',
                paddingTop: '1.2rem',
                marginBottom: '2.4rem',
              }}
            >
              {CITIES.find((c) => c.name === activeCity)?.detail}
            </motion.p>
          </AnimatePresence>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Email</p>
              <p style={{ color: 'var(--muted)', marginTop: '0.6rem', lineHeight: 1.8 }}>
                hello@noiroud.com
              </p>
            </div>
            <div>
              <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Hours</p>
              <p style={{ color: 'var(--muted)', marginTop: '0.6rem', lineHeight: 1.8 }}>
                Mon – Sat, 11am – 7pm
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
    </>
  );
}