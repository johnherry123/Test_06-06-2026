/* ══════════════════════════════════════════════════════════════════════
   COUPLE — Two People, One Story  [REFINED]
   ──────────────────────────────────────────────────────────────────────
   
   AUDIT FINDINGS fixed:
   
   PROBLEM: PersonPanel A + PersonPanel B = two independent profile cards.
            No emotional connection between the two people.
   FIX: New composition — portraits face each other, separated by a 
        vertical center column with the emotional connector text.
        Layout: [GROOM PHOTO] | [CENTER: connector text + date] | [BRIDE PHOTO]
        On mobile: bride above → connector → groom below
   
   PROBLEM: Each panel had hardcoded editorial text about the person
            ("Trưởng nam... người sẽ nâng niu...") — invented biography.
   FIX: Removed all invented personal text. 
        Connector text is universal wedding language, not invented biography.
        Portraits are the story. Text is minimal.
   
   PROBLEM: PanelConnector was just a line with a diamond. Decorative.
   FIX: Eliminated entirely. Center column IS the connector.
   
   KEPT:
   - GSAP reveal animations
   - Photo hover scale
   - ivory/cream palette
   - semantic article elements
   - alt text
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

export default function Couple() {
  const sectionRef  = useRef(null);
  const groomRef    = useRef(null);
  const brideRef    = useRef(null);
  const centerRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });

      /* Photos slide in from sides */
      tl.fromTo(groomRef.current,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0
      );
      tl.fromTo(brideRef.current,
        { x: 32, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0
      );

      /* Center text fades in slightly after */
      if (centerRef.current) {
        tl.fromTo(
          Array.from(centerRef.current.children),
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          0.22
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="couple"
      ref={sectionRef}
      aria-label="Đôi uyên ương"
      style={{
        backgroundColor: '#FDFBF5',
        overflow: 'hidden',
        padding: 'clamp(72px, 10vw, 104px) 0 0',
      }}
    >
      {/* Section label */}
      <div style={{
        textAlign: 'center',
        padding: '0 24px clamp(44px, 7vw, 62px)',
      }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.58rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#7C1D21', margin: 0,
        }}>Đôi Uyên Ương</p>
      </div>

      {/* ── Three-column composition ──
           Mobile: stacks vertically bride → center → groom
           Desktop: groom | center | bride  */}
      <div className="couple-trio" style={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(160px, 24vw, 280px) 1fr',
        minHeight: 'clamp(400px, 62vh, 680px)',
        alignItems: 'stretch',
      }}>

        {/* ── Groom Portrait ── */}
        <article
          ref={groomRef}
          aria-label={`Chú rể: ${COUPLE.groom.fullName}`}
          style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1A1008' }}
        >
          <img
            src={COUPLE.groom.photo.src}
            alt={COUPLE.groom.photo.alt}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 15%',
              display: 'block',
              filter: 'brightness(0.82) contrast(1.05) saturate(0.85)',
              transition: 'transform 9s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onError={e => { e.currentTarget.src = COUPLE.groom.photo.fallback; }}
          />
          {/* Gradient → center */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 50%, rgba(253,251,245,0.10) 80%, rgba(253,251,245,0.22) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Name overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(28px, 5vw, 44px) clamp(20px, 3.5vw, 32px)',
            background: 'linear-gradient(to top, rgba(18,10,4,0.72) 0%, transparent 100%)',
          }}>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(176,140,78,0.88)', marginBottom: '5px',
            }}>{COUPLE.groom.role}</p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.10rem, 2.2vw, 1.55rem)',
              fontWeight: 500, color: 'rgba(248,244,236,0.96)',
              lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0,
            }}>{COUPLE.groom.fullName}</p>
          </div>
        </article>

        {/* ── Center: emotional connector ── */}
        <div
          ref={centerRef}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#FDFBF5',
            padding: 'clamp(32px, 4vw, 48px) clamp(14px, 2.5vw, 22px)',
            gap: 'clamp(16px, 2.8vw, 22px)',
            textAlign: 'center',
            position: 'relative', zIndex: 2,
          }}
        >
          {/* Vertical line above */}
          <div aria-hidden="true" style={{
            width: '1px', height: 'clamp(28px, 6vw, 52px)',
            background: 'linear-gradient(to bottom, transparent, rgba(176,140,78,0.35))',
          }} />

          {/* Monogram */}
          <img
            src="/Test_06-06-2026/monogram.svg"
            alt=""
            aria-hidden="true"
            width="72" height="48"
            style={{
              opacity: 0.65,
              filter: 'brightness(0.7) sepia(0.3)',
            }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />

          {/* Ampersand — the emotional connector */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: '#B08C4E',
            lineHeight: 0.9, letterSpacing: '-0.02em',
          }}>
            &amp;
          </div>

          {/* Date */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(30,20,16,0.30)', marginBottom: '5px',
            }}>ngày cưới</p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.92rem, 1.7vw, 1.12rem)',
              fontWeight: 500, color: '#3D3228',
              lineHeight: 1.2, margin: 0,
            }}>
              20
              <span style={{ fontSize: '0.70em', fontWeight: 400, color: '#9E8E82', marginLeft: '3px' }}>
                .10.2026
              </span>
            </p>
          </div>

          {/* Vertical line below */}
          <div aria-hidden="true" style={{
            width: '1px', height: 'clamp(28px, 6vw, 52px)',
            background: 'linear-gradient(to top, transparent, rgba(176,140,78,0.35))',
          }} />
        </div>

        {/* ── Bride Portrait ── */}
        <article
          ref={brideRef}
          aria-label={`Cô dâu: ${COUPLE.bride.fullName}`}
          style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1A1008' }}
        >
          <img
            src={COUPLE.bride.photo.src}
            alt={COUPLE.bride.photo.alt}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 18%',
              display: 'block',
              filter: 'brightness(0.80) contrast(1.06) saturate(0.84)',
              transition: 'transform 9s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onError={e => { e.currentTarget.src = COUPLE.bride.photo.fallback; }}
          />
          {/* Gradient ← center */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to left, transparent 50%, rgba(253,251,245,0.10) 80%, rgba(253,251,245,0.22) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Name overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(28px, 5vw, 44px) clamp(20px, 3.5vw, 32px)',
            background: 'linear-gradient(to top, rgba(18,10,4,0.72) 0%, transparent 100%)',
          }}>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(176,140,78,0.88)', marginBottom: '5px',
            }}>{COUPLE.bride.role}</p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.10rem, 2.2vw, 1.55rem)',
              fontWeight: 500, color: 'rgba(248,244,236,0.96)',
              lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0,
            }}>{COUPLE.bride.fullName}</p>
          </div>
        </article>
      </div>

      <style>{`
        /* Mobile: bride on top, center, groom below */
        @media (max-width: 680px) {
          .couple-trio {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            min-height: auto !important;
          }
          .couple-trio > article:first-child {
            height: clamp(300px, 70vw, 380px);
          }
          .couple-trio > article:last-child {
            height: clamp(300px, 70vw, 380px);
          }
          .couple-trio > div {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 16px !important;
            padding: 28px 24px !important;
          }
          .couple-trio > div > div[style*="height"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
