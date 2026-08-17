import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { PRODUCTS } from './Showcase';
import { useScrollLock } from './hooks/useScrollLock';
import { useEscapeKey } from './hooks/useEscapeKey';
import { WHATSAPP_NUMBER } from './WhatsAppButton';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from './WishlistContext';


function buildWhatsAppOrderUrl(items, subtotal) {
  const lines = items.map((i) => `• ${i.name} x${i.qty} — ${i.price}`);
  const message = [
    "Hi! I'd like to place an order:",
    '',
    ...lines,
    '',
    `Total: Rs ${subtotal.toLocaleString()}`,
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// const LINKS = [
//   { label: 'Collection', href: '#collection' },
//   { label: 'Composition', href: '#composition' },
//   { label: 'Story', href: '#story' },
//   { label: 'Journal', href: '#journal' },
//   { label: 'Contact', href: '#contact' },
// ];
const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Story', href: '/story' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];
// function NavLink({ label, href, onClick }) {
function NavLink({ label, href }) {
  const [hover, setHover] = useState(false);
  return (
    // <a
    //   href={href}
      // onClick={onClick}
      <Link 
  to={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        textDecoration: 'none',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: '1.12rem',
        letterSpacing: '0.02em',
        color: hover ? 'var(--gold-soft)' : 'var(--ivory)',
        paddingBottom: '5px',
        transition: 'color 0.3s ease',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '1px',
          width: hover ? '100%' : '0%',
          background: 'var(--gold-soft)',
          transition: 'width 0.35s ease',
        }}
      />
    {/* </a> */}
    </Link>
  );
}

function IconButton({ label, onClick, children, badge }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
width: '38px',
        height: '38px',
        color: hover ? 'var(--gold-soft)' : 'var(--ivory)',
        transition: 'color 0.3s ease',
      }}
    >
      {children}
      {badge > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: 'var(--gold)',
            color: 'var(--bg)',
            fontSize: '0.6rem',
            fontWeight: 600,
            
width: '17px',
            height: '17px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}


     function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <line x1="15.4" y1="15.4" x2="21" y2="21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}    


 function BagIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 8.5H17.5L18.3 20.5C18.35 21.15 17.83 21.7 17.18 21.7H6.82C6.17 21.7 5.65 21.15 5.7 20.5L6.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6.5C9 4.84 10.34 3.5 12 3.5C13.66 3.5 15 4.84 15 6.5V8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function HamburgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.4" />
      <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.4" />
      <line x1="0" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

// Live search: filters PRODUCTS by name or notes as the person types.

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // const results = useMemo(() => {
  //   if (!query.trim()) return [];
  //   const q = query.trim().toLowerCase();
  //   return PRODUCTS.filter(
  //     (p) => p.name.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q)
  //   ).slice(0, 5);
  // }, [query]);
const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  function goToProduct() {
    onClose();
    navigate('/collection');
  }

  useEscapeKey(onClose);


 
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(11,9,6,0.85)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          margin: '10vh auto 0',
          padding: '0 6vw',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--line)', paddingBottom: '1rem' }}>
          <SearchIcon />
          <input
            autoFocus
            type="text"
            placeholder="Search fragrances, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--ivory)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
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
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {query.trim() && results.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              No fragrances match "{query}".
            </p>
          )}
          {results.map((p) => (
        <button
  key={p.id}
  onClick={goToProduct}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--line)',
                padding: '0.9rem 0',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: '46px', height: '46px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ivory)' }}>
                  {p.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.notes}</p>
              </div>
              <span style={{ color: 'var(--gold-soft)', fontSize: '0.85rem' }}>{p.price}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
function WishlistDrawer({ onClose }) {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.5)' }}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          width: 'min(400px, 90vw)',
          background: '#0e0b07',
          borderLeft: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 1.8rem',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--ivory)' }}>
            Your Wishlist
          </span>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              color: 'var(--gold-soft)',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.8rem' }}>
          {items.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Your wishlist is empty. Tap the heart on any fragrance to save it here.
            </p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '1rem',
                paddingBottom: '1.2rem',
                marginBottom: '1.2rem',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ivory)' }}>
                  {item.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--gold-soft)', margin: '0.3rem 0 0.8rem' }}>
                  {item.price}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--line)',
                      color: 'var(--ivory)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.4rem 0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    + Bag
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
function CartDrawer({ onClose }) {
  const { items, removeFromCart, updateQty, subtotal, checkout, orderPlaced } = useCart();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.5)' }}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          width: 'min(400px, 90vw)',
          background: '#0e0b07',
          borderLeft: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 1.8rem',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--ivory)' }}>
            Your Bag
          </span>
          <button
            onClick={onClose}
            aria-label="Close bag"
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              color: 'var(--gold-soft)',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.8rem' }}>
          {orderPlaced && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                border: '1px solid var(--gold)',
                background: 'rgba(201,162,39,0.08)',
                padding: '1.4rem',
                marginBottom: '1.4rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--gold-soft)', fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Order placed ✓
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                Thank you — we'll email you shortly to confirm details.
              </p>
            </motion.div>
          )}
          {items.length === 0 && !orderPlaced && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Your bag is empty. Add a fragrance from the collection.
            </p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '1rem',
                paddingBottom: '1.2rem',
                marginBottom: '1.2rem',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ivory)' }}>
                  {item.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--gold-soft)', margin: '0.3rem 0 0.6rem' }}>
                  {item.price}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '22px', height: '22px', cursor: 'pointer' }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ivory)' }}>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ivory)', width: '22px', height: '22px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.05em', cursor: 'pointer', marginLeft: 'auto' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem 1.8rem', borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Subtotal</span>
              <span style={{ color: 'var(--gold-soft)', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                Rs {subtotal.toLocaleString()}
              </span>
            </div>

            <a
              href={buildWhatsAppOrderUrl(items, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                width: '100%',
                background: '#25D366',
                color: '#0b0906',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '0.9rem',
                textDecoration: 'none',
                marginBottom: '0.8rem',
              }}
            >
              Order via WhatsApp
            </a>

            <button className="btn-gold" style={{ width: '100%' }} onClick={checkout}>
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useScrollLock(open || searchOpen || cartOpen || wishlistOpen);

  /*function handleLinkClick(e, href) {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }*/


  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
        }}
      >
        {/* announcement strip */}
        <div
          style={{
            background: '#0e0b07',
            borderBottom: '1px solid var(--line)',
            textAlign: 'center',
            padding: '0.55rem 1rem',
          }}
        >
          
<span
            className="announcement-text"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-soft)',
            }}
          >
            <span className="announcement-full">Free Nationwide Delivery · Order via WhatsApp · A Scent Studio Since 2019</span>
            <span className="announcement-short">Free Delivery · Order via WhatsApp</span>
          </span>

          <style>{`
            .announcement-short { display: none; }
            @media (max-width: 600px) {
              .announcement-full { display: none; }
              .announcement-short { display: inline; }
              .announcement-text { font-size: 0.6rem !important; }
            }
          `}</style>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '1.5rem 6vw',
            background: scrolled ? 'rgba(11,9,6,0.75)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
        >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', textDecoration: 'none', justifySelf: 'start' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', transform: 'translateY(-6px)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: '1.5rem', color: 'var(--ivory)', letterSpacing: '0.03em' }}>
            Noir
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-soft)', transform: 'translateY(-1px)' }}>
            Oud
          </span>
        </a>

        <div className="nav-desktop-links" style={{ display: 'flex', gap: '3rem', justifySelf: 'center' }}>
          {/*{LINKS.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} />
          ))}*/}
          {LINKS.map((link) => (
  <NavLink
    key={link.label}
    label={link.label}
    href={link.href}
  />
))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifySelf: 'end' }}>
        <IconButton label="Search" onClick={() => setSearchOpen(true)}>
  <SearchIcon />
</IconButton>
<IconButton label="Wishlist" onClick={() => setWishlistOpen(true)} badge={wishlistCount}>
  <HeartIcon />
</IconButton>
<IconButton label="Bag" onClick={() => setCartOpen(true)} badge={count}>
  <BagIcon />
</IconButton>
          <button
            className="nav-mobile-trigger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '34px', height: '34px', color: 'var(--gold-soft)', alignItems: 'center', justifyContent: 'center' }}
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>
    </div>

     <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
<AnimatePresence>{wishlistOpen && <WishlistDrawer onClose={() => setWishlistOpen(false)} />}</AnimatePresence>
<AnimatePresence>{cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.5)' }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                width: 'min(380px, 88vw)',
                background: '#0e0b07',
                borderLeft: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(201,162,39,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.8rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--ivory)' }}>
                  Noir Oud
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  style={{ background: 'none', border: '1px solid var(--line)', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-soft)', fontSize: '1rem', lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem 1.8rem', gap: '0.3rem' }}>
               {/*{LINKS.map((link, i) => (
                   <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--ivory)', textDecoration: 'none', padding: '0.7rem 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-soft)'; e.currentTarget.style.paddingLeft = '0.4rem'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ivory)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.a>
                ))}*/}
                {LINKS.map((link, i) => (
  <motion.div
    key={link.label}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
    style={{
      borderBottom: '1px solid var(--line)',
    }}
  >
    <Link
      to={link.href}
      onClick={() => setOpen(false)}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.35rem',
        fontWeight: 400,
        color: 'var(--ivory)',
        textDecoration: 'none',
        padding: '0.7rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <span>{link.label}</span>

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
        }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>
    </Link>
  </motion.div>
))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ padding: '1.5rem 1.8rem 2rem', color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.05em', lineHeight: 1.8 }}
              >
                Lahore · Karachi · Islamabad
                <br />
                hello@noiroud.com
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}