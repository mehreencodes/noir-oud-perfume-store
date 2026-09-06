import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SESSION_KEY = 'noir-oud-session';

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getAvatarUrl(session, size = 160) {
  const name = encodeURIComponent(session?.name || session?.email || 'U');
  return `https://ui-avatars.com/api/?name=${name}&background=1a1510&color=c9a227&bold=true&size=${size}&font-size=0.38`;
}

export default function Account() {
  const navigate = useNavigate();
  const [session, setSession] = useState(loadSession());

  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    navigate('/');
  }

  if (!session) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: '180px',
        paddingBottom: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: '620px',
          margin: '0 auto',
          padding: '0 6vw',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(165deg, #18130d 0%, #0e0b07 55%, #0b0906 100%)',
            border: '1px solid rgba(201,162,39,0.4)',
            boxShadow:
              '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,39,0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient gold glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-15%',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(201,162,39,0.14) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Header band */}
          <div
            style={{
              position: 'relative',
              padding: '3rem 2.5rem 2.2rem',
              background: 'rgba(201,162,39,0.05)',
              borderBottom: '1px solid rgba(201,162,39,0.18)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '104px',
                height: '104px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--gold)',
                margin: '0 auto 1.4rem',
                boxShadow: '0 0 26px rgba(201,162,39,0.35)',
              }}
            >
              <img
                src={getAvatarUrl(session, 208)}
                alt={session.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <p className="eyebrow" style={{ fontSize: '0.6rem' }}>
              Your Account
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: '2rem',
                color: 'var(--ivory)',
                margin: '0.5rem 0 0.5rem',
              }}
            >
              {session.name}
            </h1>

            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
              {session.email}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '1.2rem',
                padding: '0.35rem 0.8rem',
                border: '1px solid rgba(201,162,39,0.35)',
                background: 'rgba(201,162,39,0.06)',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'inline-block',
                  boxShadow: '0 0 6px rgba(201,162,39,0.7)',
                }}
              />
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-soft)',
                  fontWeight: 600,
                }}
              >
                Member since {new Date(session.joined || Date.now()).getFullYear()}
              </span>
            </div>
          </div>

          {/* Details */}
          <div style={{ position: 'relative', padding: '2.2rem 2.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.9rem 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Full Name</span>
              <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>{session.name}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.9rem 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Email</span>
              <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>{session.email}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.9rem 0',
              }}
            >
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Member Since</span>
              <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>
                {new Date(session.joined || Date.now()).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid var(--gold)',
                color: 'var(--gold-soft)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                width: '100%',
                marginTop: '2rem',
                transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = 'var(--bg)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,162,39,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--gold-soft)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Log Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}