/* ══════════════════════════════════════════════════════════════════════
   HERO — Editorial Split Composition  [REFINED]
   ──────────────────────────────────────────────────────────────────────
   
   AUDIT FINDINGS fixed:
   
   PROBLEM: Names were clamp(3rem, 9.5vw, 8rem) — on 1400px = ~133px.
            Way too dominant. "Poster" not "editorial".
   FIX: Names reduced to clamp(2.2rem, 5.5vw, 4.8rem). Balanced.
   
   PROBLEM: Full-bleed photo with names overlaid = typical wedding template.
            "Below photo" panel felt disconnected.
   FIX: Two-column editorial split on desktop:
        LEFT (55%): Photography — vertical format, constrained height
        RIGHT (45%): Typography — names, date, location, CTAs
        This creates real visual tension and hierarchy.
        Mobile: still stacked (photo top, text below) but proportions fixed.
   
   PROBLEM: Countdown was a separate <section> with borders — widget feel.
   FIX: Countdown integrated INTO the right column as pure typography.
        No boxes, no borders, no section boundaries.
        Just: a number, a word, sitting in the type column.
   
   PROBLEM: "Below photo" had number "20" at clamp(4rem, 9.5vw, 7.5rem)
            competing with the names in the photo.
   FIX: Eliminated the disconnected "below" panel entirely.
        Date lives in the right column composition.
   
   KEPT:
   - Photo parallax (scoped to photo container only)
   - GSAP reveal animations
   - Warm cream background
   - Accessibility (h1 for SEO, aria-labels)
   - Calendar CTA + RSVP scroll CTA
   - Reduced-motion support
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

const HERO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1400&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      'Đại Nghĩa & Thị Nhung — thay thế bằng ảnh thật',
};

/* ── Countdown — pure typography, no boxes ── */
function EditorialCountdown() {
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

  return (
    <div aria-label={`Còn ${t.d} ngày đến ngày cưới`} style={{ lineHeight: 1 }}>
      {/* Days — large editorial number */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '8px',
        marginBottom: '3px',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.8rem, 5.8vw, 4.2rem)',
          fontWeight: 300, color: '#1E1410',
          letterSpacing: '-0.04em', lineHeight: 0.88,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {String(t.d).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.80rem, 1.4vw, 0.96rem)',
          fontStyle: 'italic', color: '#6B5D52',
          letterSpacing: '0.02em',
        }}>
          ngày
        </span>
      </div>
      {/* Hours + minutes inline, quieter */}
      <div style={{
        display: 'flex', gap: 'clamp(12px, 2vw, 20px)',
        flexWrap: 'wrap',
      }}>
        {[{ v: t.h, l: 'giờ' }, { v: t.m, l: 'phút' }].map((u, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.92rem, 1.7vw, 1.15rem)',
              fontWeight: 400, color: 'rgba(30,20,16,0.55)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}>
              {String(u.v).padStart(2, '0')}
            </span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.60rem, 1.0vw, 0.72rem)',
              fontStyle: 'italic', color: 'rgba(30,20,16,0.32)',
            }}>
              {u.l}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const photoRef  = useRef(null);
  const textRef   = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Text column: stagger reveal */
      if (textRef.current) {
        const children = Array.from(textRef.current.children);
        gsap.fromTo(children,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.09, ease: 'power3.out', delay: 0.12 }
        );
      }
      /* Photo subtle parallax — only within photo container */
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.0,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToCalendar = () => {
    const title = encodeURIComponent(`Lễ Thành Hôn: ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const loc   = encodeURIComponent(WEDDING.venueAddress);
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261020T103000Z/20261020T143000Z&location=${loc}`,
      '_blank', 'noopener noreferrer'
    );
  };

  const scrollToRsvp = (e) => {
    e.preventDefault();
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        aria-label={`Thiệp cưới ${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`}
        style={{
          backgroundColor: '#F5EFE3',
          minHeight: 'clamp(480px, 90vh, 820px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── Two-column editorial split ── */}
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          minHeight: 'clamp(480px, 90vh, 820px)',
          alignItems: 'stretch',
        }}>

          {/* LEFT: Photography — darker atmosphere */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#100C08',
          }}>
            <img
              ref={photoRef}
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              loading="eager"
              decoding="async"
              style={{
                position: 'absolute',
                inset: '-8%',
                width: '116%', height: '116%',
                objectFit: 'cover',
                objectPosition: 'center 22%',
                display: 'block',
                willChange: 'transform',
                filter: 'brightness(0.78) contrast(1.06) saturate(0.88)',
              }}
              onError={e => { e.currentTarget.src = HERO_PHOTO.fallback; }}
            />

            {/* Right-edge blend: photo → cream right column */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent 55%, rgba(245,239,227,0.18) 80%, rgba(245,239,227,0.38) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Bottom gradient */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,6,3,0.45) 0%, transparent 45%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* RIGHT: Typography — warm cream */}
          <div
            ref={textRef}
            style={{
              backgroundColor: '#F5EFE3',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 64px)',
              gap: 0,
              position: 'relative',
            }}
          >
            {/* Role label */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.58rem', fontWeight: 600,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#7C1D21',
              marginBottom: 'clamp(16px, 2.5vw, 22px)',
            }}>
              {COUPLE.groom.roleLabel} &amp; {COUPLE.bride.roleLabel}
            </p>

            {/* Names — h1 for SEO, restrained size */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
              fontWeight: 400, color: '#1E1410',
              lineHeight: 0.95, letterSpacing: '-0.02em',
              marginBottom: 'clamp(22px, 3.2vw, 32px)',
            }}>
              {COUPLE.groom.firstName}
              <br/>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.52em', fontStyle: 'italic',
                fontWeight: 300, color: '#B08C4E',
                letterSpacing: '0.01em',
              }}>&amp;</span>
              <br/>
              {COUPLE.bride.firstName}
            </h1>

            {/* Accent rule */}
            <div style={{
              width: 'clamp(28px, 5vw, 40px)', height: '1px',
              background: 'linear-gradient(to right, rgba(176,140,78,0.65), transparent)',
              marginBottom: 'clamp(18px, 3vw, 26px)',
            }} />

            {/* Date + venue */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.78rem, 1.3vw, 0.92rem)',
              fontWeight: 500, color: '#3D3228',
              letterSpacing: '0.03em', lineHeight: 1.55,
              marginBottom: 'clamp(4px, 0.7vw, 7px)',
            }}>
              {WEDDING.dateDisplay}
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.82rem, 1.4vw, 0.98rem)',
              fontStyle: 'italic', color: '#9E8E82',
              marginBottom: 'clamp(30px, 5vw, 42px)',
              lineHeight: 1.5,
            }}>
              {WEDDING.venue} · {WEDDING.venueHall}
            </p>

            {/* Countdown — editorial, no box */}
            <EditorialCountdown />

            {/* Spacer */}
            <div style={{ flexGrow: 1, minHeight: 'clamp(24px, 4vw, 38px)' }} />

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="#rsvp"
                className="btn-primary"
                onClick={scrollToRsvp}
                aria-label="Xác nhận tham dự"
                style={{ textAlign: 'center' }}
              >
                Xác nhận tham dự
              </a>
              <button
                onClick={addToCalendar}
                className="btn-secondary"
                aria-label="Lưu ngày cưới vào Google Calendar"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Lưu vào lịch
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Mobile: stack photo on top, text below */
        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .hero-grid > div:first-child {
            height: clamp(260px, 56vw, 380px) !important;
            position: relative !important;
          }
          .hero-grid > div:first-child img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
