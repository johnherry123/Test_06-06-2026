/*
  HERO — Inside the Invitation
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  After the guest opens the invitation, they see the inside.
  This is NOT a landing page. NOT a magazine cover.
  It is the inside page of a wedding invitation.
  
  Composition:
  - Warm cream background (same warmth as the card)
  - Couple photograph — tasteful size, not dominating
  - Full names in Cormorant Garamond below
  - Wedding date + venue in Be Vietnam Pro
  - Subtle countdown as pure typography
  - Two CTAs: RSVP + Calendar
  
  What this is NOT:
  - A full-bleed poster
  - An editorial split composition
  - Giant names over a dark photo
  - A widget dashboard

  Mobile (390×844):
  - Photo fills width at reasonable height (~45vw)
  - Everything centered like an invitation
  - Text at invitation-appropriate sizes
*/
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

const HERO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1400&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      `${COUPLE.groom.firstName} và ${COUPLE.bride.firstName} — thay thế bằng ảnh thật`,
};

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(WEDDING.calendarTarget).getTime();
    const tick = () => {
      const dist = target - Date.now();
      if (dist > 0) setT({
        d: Math.floor(dist / 86400000),
        h: Math.floor((dist % 86400000) / 3600000),
        m: Math.floor((dist % 3600000) / 60000),
        s: Math.floor((dist % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p
      aria-label={`Còn ${t.d} ngày đến ngày cưới`}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)',
        fontStyle: 'italic',
        color: 'rgba(80,54,16,0.48)',
        letterSpacing: '0.02em',
        margin: 0,
        lineHeight: 1.5,
      }}
    >
      Còn{' '}
      <span style={{ fontWeight: 500, color: '#3D2C12', fontStyle: 'normal' }}>
        {t.d}
      </span>
      {' '}ngày &nbsp;·&nbsp; {String(t.h).padStart(2,'0')} giờ &nbsp;·&nbsp; {String(t.m).padStart(2,'0')} phút
    </p>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const innerRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Gentle reveal of inner content */
      if (innerRef.current) {
        gsap.fromTo(
          Array.from(innerRef.current.children),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.10, ease: 'power3.out', delay: 0.08 }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToRsvp = (e) => {
    e.preventDefault();
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCalendar = () => {
    const t = encodeURIComponent(`Lễ Thành Hôn: ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const l = encodeURIComponent(WEDDING.venueAddress);
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=20261020T103000Z/20261020T143000Z&location=${l}`,
      '_blank', 'noopener noreferrer'
    );
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label={`Thiệp cưới ${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`}
      style={{
        backgroundColor: '#F5EFE3',
        /* Subtle paper grain to continue the card feel */
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        paddingBottom: 'clamp(52px, 8vw, 80px)',
      }}
    >

      {/* ── Couple photograph ──
           Proportions: 4:3 landscape — tasteful, not dominating.
           Max height so it does not fill the screen.         */}
      <div style={{
        width: '100%',
        maxHeight: 'clamp(240px, 48vw, 540px)',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1A120D',
      }}>
        <img
          src={HERO_PHOTO.src}
          alt={HERO_PHOTO.alt}
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: 'clamp(240px, 48vw, 540px)',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            display: 'block',
            /* Warm film-like treatment, not stark B&W */
            filter: 'brightness(0.84) contrast(1.04) saturate(0.86)',
          }}
          onError={e => { e.currentTarget.src = HERO_PHOTO.fallback; }}
        />
        {/* Very subtle bottom fade — links photo to cream below */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(to top, rgba(245,239,227,0.60) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Invitation inside — text content ── */}
      <div
        ref={innerRef}
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: 'clamp(36px, 6vw, 52px) clamp(28px, 6vw, 48px) 0',
          textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 0,
        }}
      >

        {/* Thin champagne rule — continuation of card language */}
        <div style={{
          width: 'clamp(28px, 7vw, 42px)', height: '0.5px',
          background: 'rgba(160,120,50,0.32)',
          marginBottom: 'clamp(22px, 4.5vw, 32px)',
        }} aria-hidden="true" />

        {/* h1 — Full names, invitation typography */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.75rem, 4.8vw, 2.85rem)',
          fontWeight: 500,
          color: '#1A1008',
          lineHeight: 1.14,
          letterSpacing: '0.01em',
          marginBottom: 'clamp(4px, 0.8vw, 7px)',
        }}>
          {COUPLE.groom.fullName}
        </h1>

        {/* Ampersand */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.0rem, 2.4vw, 1.40rem)',
          fontStyle: 'italic', fontWeight: 300,
          color: 'rgba(155,115,42,0.75)',
          margin: 'clamp(3px, 0.5vw, 6px) 0',
          lineHeight: 1,
        }}>
          &amp;
        </p>

        {/* Bride full name */}
        <p
          aria-label={`Cô dâu: ${COUPLE.bride.fullName}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.75rem, 4.8vw, 2.85rem)',
            fontWeight: 500,
            color: '#1A1008',
            lineHeight: 1.14,
            letterSpacing: '0.01em',
            marginBottom: 'clamp(22px, 4.5vw, 32px)',
          }}>
          {COUPLE.bride.fullName}
        </p>

        {/* Date */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.70rem, 1.4vw, 0.82rem)',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(80,54,16,0.52)',
          marginBottom: 'clamp(4px, 0.7vw, 7px)',
        }}>
          20 · 10 · 2026
        </p>

        {/* Venue */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.82rem, 1.5vw, 0.96rem)',
          fontStyle: 'italic',
          color: 'rgba(80,54,16,0.40)',
          marginBottom: 'clamp(20px, 4vw, 28px)',
          lineHeight: 1.5,
        }}>
          {WEDDING.venue} · {WEDDING.venueHall}
        </p>

        {/* Countdown — integrated, no box */}
        <div style={{ marginBottom: 'clamp(28px, 5.5vw, 40px)' }}>
          <Countdown />
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '10px', width: '100%', maxWidth: '280px',
        }}>
          <a
            href="#rsvp"
            onClick={scrollToRsvp}
            className="btn-primary"
            aria-label="Xác nhận tham dự"
            style={{ textAlign: 'center' }}
          >
            Xác nhận tham dự
          </a>
          <button
            onClick={addToCalendar}
            className="btn-secondary"
            aria-label="Lưu ngày cưới vào Google Calendar"
            style={{ textAlign: 'center', width: '100%' }}
          >
            Lưu vào lịch
          </button>
        </div>
      </div>
    </section>
  );
}
