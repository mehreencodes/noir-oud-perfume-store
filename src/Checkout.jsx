import { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';
import { WHATSAPP_NUMBER } from './WhatsAppButton';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const digits = String(priceStr).replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Delivery (4 to 5 working days)', price: 250 },
  { id: 'swift', label: 'Swift Delivery (2 to 3 working days)', price: 750 },
];

const PAYMENT_METHODS = [
  { id: 'payfast', label: 'PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)', note: "You'll be redirected to PAYFAST to complete your purchase." },
  { id: 'card', label: 'Debit / Credit Card' },
  { id: 'cod', label: 'Cash on Delivery (COD)' },
  { id: 'bank', label: 'Bank Deposit' },
];

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: '0.62rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--gold-soft)',
        marginBottom: '1.1rem',
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

function Field({ label, ...props }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.5rem',
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid var(--line)',
          color: 'var(--ivory)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          padding: '0.75rem 0.9rem',
          outline: 'none',
        }}
      />
    </div>
  );
}

function RadioCard({ id, name, checked, onChange, children }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.8rem',
        border: `1px solid ${checked ? 'var(--gold)' : 'var(--line)'}`,
        background: checked ? 'rgba(201,162,39,0.06)' : 'transparent',
        padding: '0.9rem 1rem',
        marginBottom: '0.7rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ marginTop: '3px', accentColor: 'var(--gold)' }}
      />
      <div style={{ flex: 1 }}>{children}</div>
    </label>
  );
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items: cartItems, subtotal: cartSubtotal } = useCart();

  // Buy-Now items arrive via navigate state; otherwise fall back to the cart.
  const items = location.state?.items?.length ? location.state.items : cartItems;

  const [contact, setContact] = useState({ email: '', phone: '', newsletter: false });
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    saveInfo: false,
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [billingSame, setBillingSame] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const itemsSubtotal = useMemo(() => {
    if (location.state?.items?.length) {
      return items.reduce((sum, it) => sum + parsePrice(it.price) * (it.qty || 1), 0);
    }
    return cartSubtotal;
  }, [items, cartSubtotal, location.state]);

  const shippingCost = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price || 0;
  const total = itemsSubtotal + shippingCost;

  function validate() {
    const errs = {};
    if (!contact.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'Enter a valid email address.';
    if (!address.firstName.trim()) errs.firstName = 'First name is required.';
    if (!address.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!address.addressLine.trim()) errs.addressLine = 'Address is required.';
    if (!address.city.trim()) errs.city = 'City is required.';
    if (!contact.phone.trim()) errs.phone = 'Phone number is required.';
    return errs;
  }

  function buildWhatsAppMessage() {
    const lines = items.map(
      (it) => `• ${it.name} x${it.qty || 1} — ${it.price}`
    );
    const paymentLabel = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label;
    const shippingLabel = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label;

    const message = [
      "Hi! I'd like to place an order:",
      '',
      ...lines,
      '',
      `Subtotal: Rs ${itemsSubtotal.toLocaleString()}`,
      `Shipping (${shippingLabel}): Rs ${shippingCost.toLocaleString()}`,
      `Total: Rs ${total.toLocaleString()}`,
      '',
      `Name: ${address.firstName} ${address.lastName}`,
      `Phone: ${contact.phone}`,
      `Email: ${contact.email}`,
      `Address: ${address.addressLine}, ${address.city} ${address.postalCode}`.trim(),
      `Payment Method: ${paymentLabel}`,
    ].join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const url = buildWhatsAppMessage();
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  if (!items || items.length === 0) {
    return (
      <section
        className="section"
        style={{ textAlign: 'center', padding: '10rem 2rem', minHeight: '60vh' }}
      >
        <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Checkout</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: '1rem 0 2rem' }}>
          Your checkout is empty.
        </h2>
        <Link to="/collection" className="btn-gold" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Browse Fragrances
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section
        className="section"
        style={{ textAlign: 'center', padding: '10rem 2rem', minHeight: '60vh' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--gold)',
              fontSize: '1.6rem',
            }}
          >
            ✓
          </div>
          <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Order Received</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '2.2rem',
              margin: '1rem 0 1rem',
            }}
          >
            Thank you, {address.firstName}.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            We've opened WhatsApp with your order details. Please send the message
            to confirm — we'll follow up shortly to finalize delivery.
          </p>
          <Link to="/" className="btn-gold" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Back to Home
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <p className="eyebrow" style={{ fontSize: '0.62rem' }}>Noir Oud Checkout</p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          margin: '0.6rem 0 2.5rem',
        }}
      >
        Complete Your Order
      </h1>

      <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
        {/* LEFT: FORM */}
        <form onSubmit={handleSubmit} noValidate>

          {/* CONTACT */}
          <div style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Contact</SectionLabel>
            <Field
              label="Email"
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
            {errors.email && <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '-0.7rem', marginBottom: '1rem' }}>{errors.email}</p>}

            <Field
              label="Phone Number"
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
            {errors.phone && <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '-0.7rem', marginBottom: '1rem' }}>{errors.phone}</p>}

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={contact.newsletter}
                onChange={(e) => setContact({ ...contact, newsletter: e.target.checked })}
                style={{ accentColor: 'var(--gold)' }}
              />
              Email me with news and offers
            </label>
          </div>

          {/* DELIVERY */}
          <div style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Delivery</SectionLabel>

            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                Country / Region
              </label>
              <div
                style={{
                  border: '1px solid var(--line)',
                  padding: '0.75rem 0.9rem',
                  color: 'var(--ivory)',
                  fontSize: '0.9rem',
                }}
              >
                Pakistan
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field
                label="First Name"
                type="text"
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
              />
              <Field
                label="Last Name"
                type="text"
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '-0.7rem', marginBottom: '1rem' }}>
                {errors.firstName || errors.lastName}
              </p>
            )}

            <Field
              label="Address"
              type="text"
              value={address.addressLine}
              onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
            />
            {errors.addressLine && <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '-0.7rem', marginBottom: '1rem' }}>{errors.addressLine}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field
                label="City"
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <Field
                label="Postal Code (optional)"
                type="text"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              />
            </div>
            {errors.city && <p style={{ color: '#c0645a', fontSize: '0.72rem', marginTop: '-0.7rem', marginBottom: '1rem' }}>{errors.city}</p>}

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={address.saveInfo}
                onChange={(e) => setAddress({ ...address, saveInfo: e.target.checked })}
                style={{ accentColor: 'var(--gold)' }}
              />
              Save this information for next time
            </label>
          </div>

          {/* SHIPPING METHOD */}
          <div style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Shipping Method</SectionLabel>
            {SHIPPING_METHODS.map((m) => (
              <RadioCard
                key={m.id}
                id={`shipping-${m.id}`}
                name="shipping"
                checked={shippingMethod === m.id}
                onChange={() => setShippingMethod(m.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>{m.label}</span>
                  <span style={{ color: 'var(--gold-soft)', fontSize: '0.88rem' }}>Rs {m.price.toLocaleString()}.00</span>
                </div>
              </RadioCard>
            ))}
          </div>

          {/* PAYMENT */}
          <div style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Payment</SectionLabel>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginBottom: '1rem' }}>
              All transactions are secure and encrypted.
            </p>
            {PAYMENT_METHODS.map((p) => (
              <RadioCard
                key={p.id}
                id={`payment-${p.id}`}
                name="payment"
                checked={paymentMethod === p.id}
                onChange={() => setPaymentMethod(p.id)}
              >
                <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>{p.label}</span>
                {p.note && paymentMethod === p.id && (
                  <p style={{ color: 'var(--muted)', fontSize: '0.76rem', marginTop: '0.4rem' }}>{p.note}</p>
                )}
              </RadioCard>
            ))}
          </div>

          {/* BILLING ADDRESS */}
          <div style={{ marginBottom: '2.5rem' }}>
            <SectionLabel>Billing Address</SectionLabel>
            <RadioCard
              id="billing-same"
              name="billing"
              checked={billingSame}
              onChange={() => setBillingSame(true)}
            >
              <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>Same as shipping address</span>
            </RadioCard>
            <RadioCard
              id="billing-different"
              name="billing"
              checked={!billingSame}
              onChange={() => setBillingSame(false)}
            >
              <span style={{ color: 'var(--ivory)', fontSize: '0.88rem' }}>Use a different billing address</span>
            </RadioCard>
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%' }}>
            Finalize Order
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--line)',
            padding: '1.8rem',
            position: 'sticky',
            top: '110px',
          }}
        >
          <SectionLabel>Order Summary</SectionLabel>

          {items.map((it, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1rem',
                paddingBottom: '1.2rem',
                marginBottom: '1.2rem',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={it.image}
                  alt={it.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--gold)',
                    color: 'var(--bg)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {it.qty || 1}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'var(--ivory)', fontSize: '0.9rem', lineHeight: 1.4 }}>{it.name}</p>
                {it.notes && <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{it.notes}</p>}
              </div>
              <span style={{ color: 'var(--gold-soft)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                {it.price}
              </span>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.6rem' }}>
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid var(--line)',
                color: 'var(--ivory)',
                fontSize: '0.85rem',
                padding: '0.6rem 0.8rem',
                outline: 'none',
              }}
            />
            <button
              type="button"
              style={{
                background: 'none',
                border: '1px solid var(--line)',
                color: 'var(--gold-soft)',
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0 1rem',
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Subtotal</span>
            <span style={{ color: 'var(--ivory)', fontSize: '0.85rem' }}>Rs {itemsSubtotal.toLocaleString()}.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Shipping</span>
            <span style={{ color: 'var(--ivory)', fontSize: '0.85rem' }}>Rs {shippingCost.toLocaleString()}.00</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid var(--line)',
            }}
          >
            <span style={{ color: 'var(--ivory)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Total</span>
            <span style={{ color: 'var(--gold-soft)', fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
              Rs {total.toLocaleString()}.00
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}