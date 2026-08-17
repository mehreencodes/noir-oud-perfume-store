import { motion } from 'framer-motion';

// Replace with your real WhatsApp Business number, country code first,
// no + sign, no spaces or dashes. Example: Pakistan number
// 0300-1234567 becomes "923001234567".
export const WHATSAPP_NUMBER = '923001234567';

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7-1.87-1.87-4.36-2.9-7-2.9zm0 18.1a8.19 8.19 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.84zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

// Floating action button, fixed to the bottom-right corner across the
// whole site — for general inquiries, not tied to the cart.
export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi! I'm interested in Noir Oud fragrances — could you tell me more?"
  );

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '1.8rem',
        right: '1.8rem',
        zIndex: 80,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: '#25D366',
        color: '#0b0906',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
        textDecoration: 'none',
      }}
    >
      <WhatsAppIcon />
    </motion.a>
  );
}