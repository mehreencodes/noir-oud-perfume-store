import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEscapeKey } from './hooks/useEscapeKey';

const SESSION_KEY = 'noir-oud-session';

function EyeIcon({ open }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor" strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.1 5.5A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a13.5 13.5 0 0 1-3.1 3.9M6.2 6.6C3.7 8.3 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.24 3.6-.66"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      />
    </svg>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '0.4rem' }}>
      {message}
    </p>
  );
}

export default function LoginModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEscapeKey(onClose);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((errs) => ({ ...errs, [field]: '' }));
  }

  function validate() {
    const errs = {};
    if (mode === 'signup' && !form.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (form.password.length < 4) {
      errs.password = 'Password must be at least 4 characters.';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);

    // No real backend — this is a portfolio project, so we simulate a
    // brief network round-trip before "logging in", to match the real
    // loading-state UX people expect.
    setTimeout(() => {
      const name = mode === 'signup' ? form.name.trim() : form.email.split('@')[0];
      const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      const session = {
        name,
        email: form.email.trim(),
        initials,
        joined: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));

      setLoading(false);
      setSuccess(true);
      if (onSuccess) onSuccess(session);
      setTimeout(() => onClose(), 1100);
    }, 700);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 130,
        background: 'rgba(11,9,6,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          maxWidth: '400px',
          width: '100%',
          padding: '2.6rem 2.2rem',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close login"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'none',
            border: '1px solid var(--line)',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            color: 'var(--gold-soft)',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <p className="eyebrow" style={{ fontSize: '0.6rem' }}>
          {mode === 'login' ? 'Welcome Back' : 'Join Noir Oud'}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '1.9rem',
            color: 'var(--ivory)',
            margin: '0.6rem 0 1.8rem',
          }}
        >
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </h2>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '1.4rem 0' }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--gold)',
                fontSize: '1.3rem',
              }}
            >
              ✓
            </div>
            <p style={{ color: 'var(--gold-soft)', fontSize: '0.95rem' }}>
              {mode === 'login' ? 'Logged in successfully' : 'Account created'}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {mode === 'signup' && (
              <div style={{ marginBottom: '1.3rem' }}>
                <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.5rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  style={{
                    width: '100%', background: 'transparent', border: 'none',
                    borderBottom: `1px solid ${fieldErrors.name ? '#c0645a' : 'var(--line)'}`,
                    color: 'var(--ivory)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', padding: '0.5rem 0', outline: 'none',
                  }}
                />
                <FieldError message={fieldErrors.name} />
              </div>
            )}

            <div style={{ marginBottom: '1.3rem' }}>
              <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderBottom: `1px solid ${fieldErrors.email ? '#c0645a' : 'var(--line)'}`,
                  color: 'var(--ivory)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', padding: '0.5rem 0', outline: 'none',
                }}
              />
              <FieldError message={fieldErrors.email} />
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${fieldErrors.password ? '#c0645a' : 'var(--line)'}` }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  style={{
                    flex: 1, background: 'transparent', border: 'none',
                    color: 'var(--ivory)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', padding: '0.5rem 0', outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.3rem' }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <FieldError message={fieldErrors.password} />
            </div>

            <button
              type="submit"
              className="btn-gold"
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '1.6rem',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
              }}
            >
              {loading && (
                <span
                  style={{
                    width: '13px',
                    height: '13px',
                    border: '2px solid rgba(11,9,6,0.3)',
                    borderTopColor: 'var(--bg)',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
              )}
              {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1.4rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setFieldErrors({}); }}
                style={{ background: 'none', border: 'none', color: 'var(--gold-soft)', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline', padding: 0 }}
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </form>
        )}
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}