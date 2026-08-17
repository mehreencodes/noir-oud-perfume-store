import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  DATA — swap these with real client reviews before launch          */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 520, suffix: "+", label: "Happy Customers" },
  { value: 12, suffix: "", label: "Signature Blends" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 3, suffix: "", label: "Cities Served" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ayesha Raza",
    city: "Lahore",
    rating: 5,
    quote:
      "Noir Oud lasted the entire day at my sister's mehndi — I kept getting asked what I was wearing. The bottle alone makes it worth the price.",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    city: "Karachi",
    rating: 5,
    quote:
      "I've tried a dozen local ouds and this is the first one that doesn't feel synthetic. Deep, warm, and it actually develops over the day.",
  },
  {
    id: 3,
    name: "Sana Khalid",
    city: "Islamabad",
    rating: 4,
    quote:
      "Ordered through WhatsApp and it showed up in two days, gift-wrapped. Scent Finder quiz recommended exactly the right one for me.",
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

function StatCounter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < count ? "var(--gold)" : "none"}
          stroke="var(--gold)"
          strokeWidth="1.3"
        >
          <polygon points="12 2 15.09 8.63 22 9.24 16.5 14.14 18.18 21 12 17.27 5.82 21 7.5 14.14 2 9.24 8.91 8.63 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                      */
/* ------------------------------------------------------------------ */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        padding: "120px 6vw 100px",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* ambient glow, matches Hero's amber-glow language */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, var(--amber) 0%, transparent 70%)",
          opacity: 0.06,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* ---------- eyebrow + heading ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: 70, position: "relative" }}
      >
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            letterSpacing: "0.25em",
            fontSize: 12,
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          Trusted Across Pakistan
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            color: "var(--ivory)",
            marginTop: 14,
          }}
        >
          Words From Our Collectors
        </h2>
      </motion.div>

      {/* ---------- stats strip ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          maxWidth: 900,
          margin: "0 auto 90px",
          borderTop: "1px solid rgba(212,175,55,0.2)",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          padding: "40px 0",
        }}
        className="testimonial-stats"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "var(--gold)",
                fontWeight: 500,
              }}
            >
              <StatCounter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals || 0}
              />
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ivory)",
                opacity: 0.6,
                marginTop: 6,
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- testimonial cards ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          maxWidth: 1200,
          margin: "0 auto",
        }}
        className="testimonial-grid"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 4,
              padding: "34px 30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stars count={t.rating} />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--ivory)",
                opacity: 0.9,
                fontStyle: "italic",
                flexGrow: 1,
              }}
            >
              "{t.quote}"
            </p>
            <div
              style={{
                marginTop: 22,
                paddingTop: 18,
                borderTop: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              <div style={{ color: "var(--gold)", fontSize: 14 }}>
                {t.name}
              </div>
              <div
                style={{
                  color: "var(--ivory)",
                  opacity: 0.5,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {t.city}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* responsive: collapse to 2 cols / 1 col like Showcase.jsx does */}
      <style>{`
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 24px !important; }
        }
        @media (max-width: 560px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}