/* ══════════════════════════════════════════════════════════════════════
   HERO — Editorial Magazine Opening  [REDESIGNED]
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION:
   After the intimate paper invitation opens, the Hero is the CINEMATIC REVEAL.
   Mood shift: warm paper → dark cinema → photographic world.

   The composition:
   - Photo fills left ~65% on desktop, full on mobile
   - Names emerge from the dark, LEFT-ALIGNED editorial style
   - Right side: minimal editorial metadata (date, venue, role labels)
   - Below photo: clean typographic date + 2 CTAs — NOT a separate "section"
   - Countdown: integrated below the date, not a separate floating section

   What was REMOVED:
   - Countdown as a separate full-width section with its own bg — felt like widget
   - Overly large names that crushed the composition
   - The "below photo" panel feeling disconnected from Hero
   - Two h1 tags (accessibility problem)
   
   Mobile:
   - Photo is 70vh tall, names overlay at bottom-left
   - No sidebar — full bleed
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

const HERO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1600&q=90&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      'Đại Nghĩa & Thị Nhung — thay thế bằng ảnh thật',
};

/* Elegant inline countdown */
function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(WEDDING.calendarTarget).getTime();
    const tick = () => {
      const dist = target - Date.now();
      if (dist > 0) {
        setT({
          d: Math.floor(dist / 86400000),
          h: Math.floor((dist % 86400000) / 3600000),
          m: Math.floor((dist % 3600000) / 60000),
          s: Math.floor((dist % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: t.d, l: 'ngày' },
    { v: t.h, l: 'giờ' },
    { v: t.m, l: 'phút' },
    { v: t.s, l: 'giây' },
  ];

  return (
    <div
      aria-label="Đếm ngược đến ngày cưới"
      style={{ display: 'flex', alignItems: 'baseline', gap: 0, flexWrap: 'wrap' }}
    >
      {units.map((u, i) => (
        <Fragment key={i}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 4.8vw, 3.6rem)',
            fontWeight: 300,
            color: '#1E1410',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            fontVariantNumeric: 'tabular-nums',
            minWidth: 'clamp(32px, 6vw, 58px)',
            textAlign: 'center',
          }}>
            {String(u.v).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.68rem, 1.3vw, 0.85rem)',
            fontStyle: 'italic',
            color: '#9E8E82',
            marginBottom: '3px',
            marginLeft: '2px',
            marginRight: i < 3 ? 'clamp(4px, 0.8vw, 8px)' : 0,
            lineHeight: 1,
          }}>
            {u.l}
          </span>
          {i < 3 && (
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)',
              fontWeight: 300,
              color: 'rgba(176,140,78,0.35)',
              lineHeight: 1,
              marginBottom: '1px',
              marginRight: 'clamp(3px, 0.6vw, 8px)',
              alignSelf: 'flex-start',
              paddingTop: '3px',
            }}>
              ·
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const photoRef   = useRef(null);
  const namesRef   = useRef(null);
  const infoRef    = useRef(null);
  const belowRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Names reveal from left */
      if (namesRef.current?.children) {
        gsap.fromTo(
          Array.from(namesRef.current.children),
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
        );
      }
      /* Info sidebar */
      if (infoRef.current) {
        gsap.fromTo(infoRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
        );
      }
      /* Below panel */
      if (belowRef.current) {
        gsap.fromTo(belowRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.7 }
        );
      }
      /* Photo parallax */
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToCalendar = () => {
    const t = encodeURIComponent(`Lễ Thành Hôn: ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const l = encodeURIComponent(WEDDING.venueAddress);
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=20261020T103000Z/20261020T143000Z&location=${l}`,
      '_blank', 'noopener noreferrer'
    );
  };

  return (
    <>
      {/* ── Hero cinematic section ── */}
      <section
        id="hero"
        ref={sectionRef}
        aria-label={`Thiệp cưới ${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`}
        style={{ position: 'relative', backgroundColor: '#100C08', overflow: 'hidden' }}
      >

        {/* Photo + names overlay */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(65vh, 78vh, 820px)',
          overflow: 'hidden',
        }}>

          {/* Full-bleed photo */}
          <img
            ref={photoRef}
            src={HERO_PHOTO.src}
            alt={HERO_PHOTO.alt}
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: '-10px',
              width: 'calc(100% + 20px)',
              height: 'calc(100% + 20px)',
              objectFit: 'cover',
              objectPosition: 'center 28%',
              display: 'block',
              willChange: 'transform',
            }}
            onError={e => { e.currentTarget.src = HERO_PHOTO.fallback; }}
          />

          {/* Bottom gradient — very deep, for name legibility */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(
                to top,
                rgba(10,6,3,0.97) 0%,
                rgba(10,6,3,0.76) 18%,
                rgba(10,6,3,0.30) 44%,
                rgba(10,6,3,0.06) 65%,
                transparent 80%
              )
            `,
            pointerEvents: 'none',
          }} />

          {/* Left vignette — for editorial left-aligned text */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(
                to right,
                rgba(10,6,3,0.52) 0%,
                rgba(10,6,3,0.24) 28%,
                rgba(10,6,3,0.06) 52%,
                transparent 68%
              )
            `,
            pointerEvents: 'none',
          }} />

          {/* Top gradient — subtle fade for nav breathing room */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,6,3,0.28) 0%, transparent 22%)',
            pointerEvents: 'none',
          }} />

          {/* ── Names — bottom-left editorial ── */}
          <div
            ref={namesRef}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: 'clamp(80px, 12vw, 110px) clamp(28px, 5vw, 68px) clamp(32px, 5vw, 52px)',
            }}
          >
            {/* Role label */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.60rem',
              fontWeight: 600,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(176,140,78,0.82)',
              marginBottom: 'clamp(12px, 2vw, 18px)',
            }}>
              {COUPLE.groom.roleLabel} &amp; {COUPLE.bride.roleLabel}
            </p>

            {/* Groom name — h1 for SEO */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 9.5vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.90,
              color: 'rgba(253,248,240,0.97)',
              margin: 0,
              letterSpacing: '-0.025em',
              textShadow: '0 2px 40px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.18)',
            }}>
              {COUPLE.groom.firstName}
            </h1>

            {/* Ampersand */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.3rem, 3.2vw, 2.8rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(190,158,90,0.78)',
              lineHeight: 1,
              margin: 'clamp(1px, 0.2vw, 4px) 0 clamp(1px, 0.2vw, 4px) clamp(6px, 1.5vw, 18px)',
            }}>
              &amp;
            </div>

            {/* Bride name */}
            <p aria-label={`Cô dâu: ${COUPLE.bride.firstName}`} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 9.5vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.90,
              color: 'rgba(253,248,240,0.97)',
              margin: 0,
              letterSpacing: '-0.025em',
              textShadow: '0 2px 40px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.18)',
            }}>
              {COUPLE.bride.firstName}
            </p>
          </div>

          {/* ── Right side: editorial metadata — desktop only ── */}
          <div
            ref={infoRef}
            className="desktop-only"
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 'clamp(28px, 4vw, 56px)',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '20px',
            }}
          >
            {/* Vertical date */}
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.60rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(253,248,240,0.25)',
            }}>
              20 · 10 · 2026
            </div>
            {/* Thin line */}
            <div style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, transparent, rgba(176,140,78,0.30))',
            }} />
            {/* Venue abbrev */}
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.72rem',
              fontStyle: 'italic',
              color: 'rgba(253,248,240,0.18)',
            }}>
              Gem Center
            </div>
          </div>
        </div>

        {/* ── Below photo: date info + CTAs ── */}
        <div
          ref={belowRef}
          style={{
            backgroundColor: '#F5EFE3',
            padding: 'clamp(32px, 5.5vw, 56px) clamp(28px, 5vw, 68px)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'clamp(20px, 4vw, 48px)',
            alignItems: 'end',
          }}
          className="hero-below-grid"
          >
            {/* Left: Date */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 'clamp(12px, 2vw, 24px)',
                marginBottom: 'clamp(12px, 2vw, 18px)',
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(4rem, 9.5vw, 7.5rem)',
                  fontWeight: 400,
                  color: '#1E1410',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  flexShrink: 0,
                }}>
                  20
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(3px, 0.6vw, 7px)',
                  paddingBottom: 'clamp(7px, 1.2vw, 12px)',
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.1rem, 1.9vw, 1.55rem)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#3D3228',
                    lineHeight: 1.1,
                  }}>
                    Tháng Mười,<br/>2026
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)',
                fontWeight: 400,
                color: '#9E8E82',
                letterSpacing: '0.03em',
              }}>
                {WEDDING.venue} · {WEDDING.venueHall}
              </p>
            </div>

            {/* Right: CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <a
                href="#rsvp"
                className="btn-primary"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Xác nhận tham dự"
                style={{ whiteSpace: 'nowrap' }}
              >
                Xác nhận tham dự
              </a>
              <button
                onClick={addToCalendar}
                className="btn-secondary"
                aria-label="Lưu ngày cưới vào Google Calendar"
                style={{ whiteSpace: 'nowrap' }}
              >
                Lưu vào lịch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Countdown — quiet, integrated, not widget-like ── */}
      <section
        aria-label="Đếm ngược đến ngày cưới"
        style={{
          backgroundColor: '#F5EFE3',
          padding: 'clamp(28px, 4.5vw, 44px) 24px',
          borderTop: '1px solid rgba(30,20,16,0.06)',
          borderBottom: '1px solid rgba(30,20,16,0.06)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#B08C4E',
            marginBottom: 'clamp(14px, 2.2vw, 22px)',
          }}>
            20 · 10 · 2026
          </p>
          <Countdown />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
            fontStyle: 'italic',
            color: 'rgba(62,50,40,0.45)',
            marginTop: 'clamp(10px, 1.8vw, 16px)',
            letterSpacing: '0.02em',
          }}>
            còn lại cho đến ngày trọng đại
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 580px) {
          .hero-below-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-below-grid > div:last-child {
            align-items: flex-start !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </>
  );
}
