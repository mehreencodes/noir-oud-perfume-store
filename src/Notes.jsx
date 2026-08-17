import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTES = [
  {
    tier: 'Top',
    time: '0 – 15 min',
    intensity: 30,
    radius: 90,
    duration: 9,
    items: ['Bergamot', 'Pink Pepper', 'Saffron'],
    description:
      'The first impression — bright, citrus-forward, and sharp. It fades within minutes, but it decides whether someone leans in closer.',
  },
  {
    tier: 'Heart',
    time: '15 min – 4 hrs',
    intensity: 65,
    radius: 145,
    duration: 16,
    items: ['Rose de Mai', 'Oud Wood', 'Cardamom'],
    description:
      'The soul of the fragrance. Once the top notes settle, floral and woody tones emerge and define the character for hours.',
  },
  {
    tier: 'Base',
    time: '4 – 12 hrs',
    intensity: 90,
    radius: 195,
    duration: 26,
    items: ['Amber', 'Sandalwood', 'Dark Musk'],
    description:
      'The lasting foundation — deep, warm, and grounding. This is what lingers on skin and fabric long after everything else has faded.',
  },
];

const CENTER = 210;

// Orbiting rings: each note radiates outward from a central point,
// slower rings (base notes) travel further and linger longer — the
// motion itself carries the meaning instead of a static chart.
function OrbitDiagram({ active, onSelect }) {
  return (
    <svg viewBox="0 0 420 420" width="100%" style={{ maxWidth: '400px' }}>
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient pulse at the center — the "moment of application" */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r="34"
        fill="url(#centerGlow)"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />
      <circle cx={CENTER} cy={CENTER} r="5" fill="var(--gold-soft)" />

      {NOTES.map((note) => {
        const isActive = active === note.tier;
        return (
          <g key={note.tier}>
            {/* static ring path */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={note.radius}
              fill="none"
              stroke={isActive ? 'var(--gold)' : 'rgba(236,227,209,0.10)'}
              strokeWidth={isActive ? 1.4 : 1}
              style={{ transition: 'stroke 0.4s ease' }}
            />

            {/* continuously orbiting marker dot */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: note.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            >
              <circle
                cx={CENTER + note.radius}
                cy={CENTER}
                r={isActive ? 6 : 4}
                fill="var(--gold-soft)"
                style={{ transition: 'r 0.3s ease' }}
              />
            </motion.g>

            {/* clickable label chip, fixed at the top of each ring */}
            <g
              onClick={() => onSelect(note.tier)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={CENTER}
                cy={CENTER - note.radius}
                r="3"
                fill={isActive ? 'var(--gold)' : 'var(--muted)'}
              />
              <text
                x={CENTER + 12}
                y={CENTER - note.radius + 4}
                fill={isActive ? 'var(--gold-soft)' : 'var(--muted)'}
                fontSize="10"
                letterSpacing="2"
                fontFamily="Jost, sans-serif"
                style={{ transition: 'fill 0.3s ease' }}
              >
                {note.tier.toUpperCase()}
              </text>
              {/* wider invisible hit-area for easier clicking */}
              <rect
                x={CENTER - 40}
                y={CENTER - note.radius - 14}
                width="120"
                height="28"
                fill="transparent"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function IntensityDots({ value }) {
  const filled = Math.round(value / 20);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: i < filled ? 'var(--gold)' : 'rgba(236,227,209,0.15)',
          }}
        />
      ))}
    </div>
  );
}

export default function Notes() {
  const [active, setActive] = useState('Heart');
  const current = NOTES.find((n) => n.tier === active);

  return (
    <section
      id="composition"
      className="section"
      style={{ background: 'var(--bg-elevated)', scrollMarginTop: '90px' }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Composition
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
          margin: '1rem 0 4rem',
          maxWidth: '600px',
        }}
      >
        How the scent unfolds on skin.
      </motion.h2>

      <div
        className="notes-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 420px) 1fr',
          gap: '3rem',
          alignItems: 'center',
          maxWidth: '1050px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <OrbitDiagram active={active} onSelect={setActive} />
        </div>

        {/* detail panel, swaps content with a crossfade as the active
            tier changes — no accordion, no list, just one focused card */}
        <div style={{ minHeight: '260px' }}>
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.tier}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1.2rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.2rem',
                      color: 'var(--gold-soft)',
                    }}
                  >
                    {current.tier}
                  </span>
                  <span
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {current.time}
                  </span>
                </div>

                <div style={{ marginBottom: '1.4rem' }}>
                  <IntensityDots value={current.intensity} />
                </div>

                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '1rem',
                    lineHeight: 1.85,
                    maxWidth: '440px',
                    marginBottom: '1.4rem',
                  }}
                >
                  {current.description}
                </p>

                <p
                  style={{
                    color: 'var(--ivory)',
                    fontSize: '0.92rem',
                    letterSpacing: '0.03em',
                    borderTop: '1px solid var(--line)',
                    paddingTop: '1.2rem',
                  }}
                >
                  {current.items.join('  ·  ')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* tier switch, small and secondary — the diagram is primary nav */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            {NOTES.map((note) => (
              <button
                key={note.tier}
                onClick={() => setActive(note.tier)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: active === note.tier ? 'var(--gold-soft)' : 'var(--muted)',
                  borderBottom:
                    active === note.tier
                      ? '1px solid var(--gold-soft)'
                      : '1px solid transparent',
                  paddingBottom: '0.3rem',
                  transition: 'color 0.3s ease',
                }}
              >
                {note.tier}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}