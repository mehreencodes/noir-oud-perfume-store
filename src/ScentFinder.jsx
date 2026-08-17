import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { PRODUCTS } from './Showcase';
import { useNavigate } from 'react-router-dom';

const PRODUCT_TAGS = {
  'noir-oud': { time: 'night', mood: 'bold', family: 'woody', season: 'cool' },
  velours: { time: 'day', mood: 'subtle', family: 'floral', season: 'warm' },
  'ambre-nuit': { time: 'night', mood: 'bold', family: 'spicy', season: 'cool' },
  'santal-rare': { time: 'day', mood: 'subtle', family: 'woody', season: 'warm' },
  'nuit-blanche': { time: 'night', mood: 'subtle', family: 'leather', season: 'cool' },
  'cuir-noir': { time: 'night', mood: 'bold', family: 'leather', season: 'cool' },
  'fleur-dombre': { time: 'night', mood: 'bold', family: 'floral', season: 'warm' },
  'epices-dorees': { time: 'day', mood: 'bold', family: 'spicy', season: 'warm' },
};

const QUESTIONS = [
  {
    key: 'time',
    question: 'When do you wear fragrance most?',
    options: [
      { label: 'By day', value: 'day' },
      { label: 'By night', value: 'night' },
    ],
  },
  {
    key: 'mood',
    question: "What's your signature energy?",
    options: [
      { label: 'Bold & confident', value: 'bold' },
      { label: 'Subtle & understated', value: 'subtle' },
    ],
  },
  {
    key: 'family',
    question: 'Which family calls to you?',
    options: [
      { label: 'Woody', value: 'woody' },
      { label: 'Floral', value: 'floral' },
      { label: 'Spicy', value: 'spicy' },
      { label: 'Leather', value: 'leather' },
    ],
  },
  {
    key: 'season',
    question: 'Which season feels like you?',
    options: [
      { label: 'Warm & cozy', value: 'warm' },
      { label: 'Cool & crisp', value: 'cool' },
    ],
  },
];

function getMatch(answers) {
  let best = null;
  let bestScore = -1;
  for (const product of PRODUCTS) {
    const tags = PRODUCT_TAGS[product.id];
    if (!tags) continue;
    let score = 0;
    for (const key in answers) {
      if (tags[key] === answers[key]) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }
  return best;
}



export default function ScentFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const result = useMemo(() => getMatch(answers), [answers]);
  const isDone = step >= QUESTIONS.length;
const navigate = useNavigate();

  function handleAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function handleRetake() {
    setAnswers({});
    setStep(0);
    setAdded(false);
  }

  function handleViewFragrance() {
    navigate('/collection', { state: { highlightId: result.id } });
  }

  function handleQuickAdd() {
    addToCart(result);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <section className="section" style={{ background: 'var(--bg-elevated)' }}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Scent Finder
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
          margin: '1rem 0 3rem',
          maxWidth: '600px',
        }}
      >
        Not sure which one is yours?
      </motion.h2>

      <div style={{ maxWidth: '640px' }}>
        {/* progress dots */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                height: '2px',
                flex: 1,
                background: i <= step - (isDone ? 0 : 0) && (isDone || i < step)
                  ? 'var(--gold)'
                  : i === step
                  ? 'var(--gold)'
                  : 'var(--line)',
                opacity: isDone || i <= step ? 1 : 0.4,
                transition: 'opacity 0.4s ease, background 0.4s ease',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--ivory)',
                  marginBottom: '1.8rem',
                }}
              >
                {QUESTIONS[step].question}
              </h3>

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(QUESTIONS[step].key, opt.value)}
                    style={{
                      textAlign: 'left',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--line)',
                      color: 'var(--ivory)',
                      padding: '1.1rem 1.4rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold)';
                      e.currentTarget.style.color = 'var(--gold-soft)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.color = 'var(--ivory)';
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    marginTop: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
              )}
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '1.8rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--gold)',
                  padding: '1.8rem',
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p className="eyebrow" style={{ fontSize: '0.6rem' }}>Your Match</p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.7rem',
                      color: 'var(--ivory)',
                      margin: '0.5rem 0 0.4rem',
                    }}
                  >
                    {result.name}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {result.notes} · {result.price}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button className="btn-gold" onClick={handleViewFragrance}>
                      View This Fragrance
                    </button>
                    <button
                      onClick={handleQuickAdd}
                      style={{
                        background: 'none',
                        border: '1px solid var(--line)',
                        color: added ? 'var(--gold)' : 'var(--ivory)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0 1.4rem',
                        cursor: 'pointer',
                      }}
                    >
                      {added ? 'Added ✓' : '+ Bag'}
                    </button>
                    <button
                      onClick={handleRetake}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--muted)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                      }}
                    >
                      Retake ↻
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}