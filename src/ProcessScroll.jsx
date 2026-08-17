import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    num: '01',
    title: 'Harvest',
    text: 'Agarwood is hand-selected from trees aged over 40 years. Only the resin-infected heartwood is taken — the rest is left untouched.',
    image:
      'https://i.pinimg.com/736x/d8/d6/8f/d8d68f33dbf8da7c8d9aa057ef75602c.jpg',
  },
  {
    num: '02',
    title: 'Distill',
    text: 'Raw wood is steam-distilled in small copper stills over several days, slowly releasing the oil trapped deep in the grain.',
    image:
      'https://i.pinimg.com/1200x/40/31/1b/40311b35824d1c4cf62c00be9cb5edf7.jpg',
  },
  {
    num: '03',
    title: 'Rest',
    text: 'The oil is aged in dark glass for a minimum of six weeks, allowing the raw notes to round out into something wearable.',
    image:
      'https://i.pinimg.com/736x/1e/5f/dd/1e5fddeb30c199c21d519d40bedf8ba2.jpg',
  },
  {
    num: '04',
    title: 'Bottle',
    text: 'Each bottle is filled, sealed, and labeled entirely by hand in our Lahore studio — no automated line, no shortcuts.',
    image:
      'https://i.pinimg.com/1200x/68/6b/cf/686bcf4bcf96c8125367d88881083ced.jpg',
  },
];

export default function ProcessScroll() {
  const wrapperRef = useRef(null);
  const panelsRef = useRef([]);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const panels = panelsRef.current;

    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        gsap.set(panel, { opacity: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (STAGES.length - 1)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (STAGES.length - 1));
            setActive(idx);
          },
        },
      });

      STAGES.forEach((_, i) => {
        if (i < STAGES.length - 1) {
          tl.to(panels[i], { opacity: 0, duration: 1 }, i)
            .to(panels[i + 1], { opacity: 1, duration: 1 }, i);
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {STAGES.map((stage, i) => (
        <div
          key={stage.num}
          ref={(el) => (panelsRef.current[i] = el)}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(90deg, rgba(11,9,6,0.92) 0%, rgba(11,9,6,0.55) 45%, rgba(11,9,6,0.3) 100%), url(${stage.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div style={{ position: 'relative', padding: '0 6vw', maxWidth: '560px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '5rem',
                color: 'rgba(201,162,39,0.35)',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {stage.num}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                color: 'var(--ivory)',
                marginBottom: '1.2rem',
              }}
            >
              {stage.title}
            </h3>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: '1rem',
                lineHeight: 1.8,
              }}
            >
              {stage.text}
            </p>
          </div>
        </div>
      ))}

      {/* progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '6vw',
          display: 'flex',
          gap: '0.6rem',
          zIndex: 2,
        }}
      >
        {STAGES.map((stage, i) => (
          <div
            key={stage.num}
            style={{
              width: active === i ? '28px' : '10px',
              height: '2px',
              background: active === i ? 'var(--gold)' : 'rgba(236,227,209,0.25)',
              transition: 'width 0.4s ease, background 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}