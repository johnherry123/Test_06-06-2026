/*
  HERO — Inside the Invitation
  ─────────────────────────────────────────────────────────────────
  
  THE PROBLEM WE FIXED:
  Previous version was a split-screen (photo LEFT | text RIGHT)
  with a dark vertical divider. That looks like a fashion/editorial
  landing page. DELETED.
  
  NEW COMPOSITION:
  One centered column. Everything belongs to one invitation.
  
  Hierarchy:
  1. Italic invitation label ("Trân trọng kính mời")
  2. Groom full name
  3. Ampersand
  4. Bride full name  
  5. Date
  6. Wedding photograph (tasteful width, NOT full-screen)
  7. Venue + short countdown
  8. Single primary CTA
  
  This is the INSIDE PAGE of a wedding invitation.
  Not a landing page. Not a magazine cover. Not a split-screen UI.
  
  Desktop:
  - Max width container, centered
  - Photo: max 640px wide, natural proportion
  - Everything centered
  
  Mobile (390×844):
  - Photo: 100% width, 60vw height
  - Text: readable sizes, comfortable padding
  
  Typography:
  - Cormorant Garamond: names, ampersand, italic labels
  - Be Vietnam Pro: date, venue, countdown, buttons
  - NO Playfair Display in this section
*/
import { useState, useEffect, useRef } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

/* Couple photo — replace src with real photo in weddingData */
const PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
  alt:      `${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`,
};

function useCountdownDays() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const target = new Date(WEDDING.calendarTarget).getTime();
    const calc = () => {
      const d = Math.max(0, Math.floor((target - Date.now()) / 86400000));
      setDays(d);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, []);
  return days;
}

export default function Hero() {
  const days    = useCountdownDays();
  const ref     = useRef(null);
  const entered = useRef(false);

  /* Simple entrance — just a fade, no stagger complexity */
  useEffect(() => {
    if (entered.current || !ref.current) return;
    entered.current = true;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    /* rAF to let paint happen first */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, []);

  const scrollToRsvp = (e) => {
    e.preventDefault();
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label={`Thiệp cưới ${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`}
      style={{
        /* Warm ivory — same as the invitation card */
        backgroundColor: '#FAF6EC',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        /* Centered column */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(52px, 9vw, 80px) clamp(24px, 6vw, 48px) clamp(56px, 9vw, 88px)',
        /* NO split, NO grid, NO dark divider */
      }}
    >
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {/* Thin rule — echo of invitation card */}
        <div style={{
          width: '32px', height: '0.5px',
          background: 'rgba(160,120,50,0.30)',
          marginBottom: 'clamp(20px, 4vw, 28px)',
        }} aria-hidden="true" />

        {/* Invitation label */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.78rem, 1.4vw, 0.90rem)',
          fontStyle: 'italic',
          color: 'rgba(80,54,16,0.45)',
          letterSpacing: '0.03em',
          marginBottom: 'clamp(18px, 3.5vw, 26px)',
        }}>
          Trân trọng kính mời
        </p>

        {/* GROOM NAME — h1, invitation typography, not editorial */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.90rem, 4.5vw, 2.80rem)',
          fontWeight: 500,
          fontStyle: 'normal',
          color: '#1A1008',
          lineHeight: 1.12,
          letterSpacing: '0.01em',
          margin: 0,
        }}>
          {COUPLE.groom.fullName}
        </h1>

        {/* Ampersand */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(155,115,42,0.70)',
          margin: 'clamp(3px, 0.6vw, 6px) 0',
          lineHeight: 1,
        }}>
          &amp;
        </p>

        {/* BRIDE NAME */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.90rem, 4.5vw, 2.80rem)',
          fontWeight: 500,
          fontStyle: 'normal',
          color: '#1A1008',
          lineHeight: 1.12,
          letterSpacing: '0.01em',
          margin: 0,
          marginBottom: 'clamp(20px, 3.5vw, 28px)',
        }}>
          {COUPLE.bride.fullName}
        </p>

        {/* DATE — clear, not tiny */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.72rem, 1.3vw, 0.82rem)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: '#1A1008',
          marginBottom: 'clamp(26px, 5vw, 38px)',
          opacity: 0.55,
        }}>
          20 · 10 · 2026
        </p>

        {/* ── WEDDING PHOTOGRAPH ──
             Centered. Tasteful proportion. NOT full-bleed.
             Max width 580px on desktop. Photo is secondary to names.  */}
        <div style={{
          width: '100%',
          maxWidth: '520px',
          aspectRatio: '4/3',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#1A120D',
          marginBottom: 'clamp(22px, 4vw, 32px)',
        }}>
          <img
            src={PHOTO.src}
            alt={PHOTO.alt}
            loading="eager"
            decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 22%',
              display: 'block',
              filter: 'brightness(0.86) contrast(1.04) saturate(0.85)',
            }}
            onError={e => { e.currentTarget.src = PHOTO.fallback; }}
          />
        </div>

        {/* VENUE */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.88rem, 1.5vw, 1.02rem)',
          fontStyle: 'italic',
          color: 'rgba(80,54,16,0.50)',
          lineHeight: 1.55,
          marginBottom: 'clamp(6px, 1.2vw, 10px)',
        }}>
          {WEDDING.venue} · {WEDDING.venueHall}
        </p>

        {/* COUNTDOWN — one restrained line, not a widget */}
        {days > 0 && (
          <p
            aria-label={`Còn ${days} ngày đến ngày cưới`}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.66rem, 1.2vw, 0.74rem)',
              fontWeight: 400,
              color: 'rgba(80,54,16,0.38)',
              letterSpacing: '0.05em',
              marginBottom: 'clamp(28px, 5vw, 40px)',
            }}>
            Còn {days} ngày
          </p>
        )}

        {/* SINGLE CTA */}
        <a
          href="#rsvp"
          onClick={scrollToRsvp}
          className="btn-primary"
          aria-label="Xác nhận tham dự"
          style={{ textAlign: 'center', minWidth: '200px' }}
        >
          Xác nhận tham dự
        </a>

        {/* Scroll cue — barely visible */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          color: 'rgba(80,54,16,0.22)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: 'clamp(32px, 6vw, 48px)',
        }}>
          Cuộn để khám phá
        </p>
      </div>
    </section>
  );
}
