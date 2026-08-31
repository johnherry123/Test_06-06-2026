/* ══════════════════════════════════════════════════════════════════════
   EVENTS / NGÀY TRỌNG ĐẠI
   ──────────────────────────────────────────────────────────────────────
   Art direction: BURGUNDY background — the BOLD COLOR moment.
   This is the most emotionally important section: the actual wedding day.
   It should feel DIFFERENT from every other section.

   Layout: Vertical timeline on dark burgundy.
   Main reception receives strongest visual emphasis.
   Data sourced from weddingData.js.
══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { EVENTS, WEDDING } from '../weddingData';

export default function Events() {
  return (
    <section
      id="events"
      aria-label="Lịch trình ngày cưới"
      style={{
        /* BURGUNDY MOMENT — bold color for the most important section */
        backgroundColor: '#7A1A1E',
        padding: 'clamp(80px, 12vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle warm texture on burgundy */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }} />
      {/* Subtle warm glow at top */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '35%',
        background: 'radial-gradient(ellipse, rgba(255,200,120,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(52px, 8vw, 72px)' }}>
          <p className="gsap-reveal" style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(248,244,236,0.45)',
            marginBottom: '16px',
          }}>
            {WEDDING.dateDisplay}
          </p>

          <h2 className="gsap-reveal" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 500,
            color: 'rgba(248,244,236,0.95)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '12px',
          }}>
            Ngày Trọng Đại
          </h2>

          <p className="gsap-reveal" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            fontStyle: 'italic',
            color: 'rgba(248,244,236,0.50)',
            margin: 0,
          }}>
            {WEDDING.venue} · {WEDDING.venueHall}
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="gsap-stagger" style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: '74px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'rgba(248,244,236,0.12)',
          }} />

          {EVENTS.map((event, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '74px 1fr',
                gap: '0 clamp(20px, 3vw, 32px)',
                marginBottom: i < EVENTS.length - 1
                  ? (event.isMain ? 'clamp(48px,7vw,64px)' : 'clamp(36px,5vw,52px)')
                  : 0,
                alignItems: 'start',
              }}
            >
              {/* Time column */}
              <div style={{ textAlign: 'right', paddingTop: '2px', paddingRight: '0' }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: event.isMain ? 'clamp(1.2rem, 2.5vw, 1.6rem)' : 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: event.isMain ? 500 : 400,
                  color: event.isMain ? 'rgba(248,244,236,0.95)' : 'rgba(248,244,236,0.6)',
                  lineHeight: 1,
                  margin: 0,
                }}>
                  {event.time}
                </p>
                <p style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,236,0.30)',
                  marginTop: '3px',
                  marginBottom: 0,
                }}>
                  {event.period}
                </p>
              </div>

              {/* Event content */}
              <div style={{
                paddingLeft: 'clamp(20px, 3vw, 32px)',
                borderLeft: event.isMain
                  ? '2px solid rgba(184,149,85,0.65)'
                  : '1px solid rgba(248,244,236,0.15)',
                paddingTop: '2px',
                paddingBottom: 'clamp(20px,3vw,28px)',
              }}>
                {/* Main event badge */}
                {event.isMain && (
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#B89555',
                    marginBottom: '8px',
                  }}>
                    Sự kiện chính
                  </p>
                )}

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: event.isMain
                    ? 'clamp(1.3rem, 2.8vw, 1.9rem)'
                    : 'clamp(1.1rem, 2.2vw, 1.45rem)',
                  fontWeight: event.isMain ? 500 : 400,
                  color: event.isMain ? 'rgba(248,244,236,0.95)' : 'rgba(248,244,236,0.78)',
                  lineHeight: 1.15,
                  marginBottom: '6px',
                }}>
                  {event.title}
                </h3>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
                  fontStyle: 'italic',
                  color: 'rgba(248,244,236,0.45)',
                  marginBottom: event.isMain ? '12px' : '8px',
                }}>
                  {event.subtitle}
                </p>

                {event.isMain && (
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    color: 'rgba(248,244,236,0.45)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}>
                    {event.description}
                  </p>
                )}

                {/* Location + Map link */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 16px' }}>
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(248,244,236,0.38)',
                    margin: 0,
                  }}>
                    {event.locationName}
                  </p>

                  {event.mapUrl && event.mapUrl !== '#' && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Xem bản đồ: ${event.locationName}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(184,149,85,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#B89555'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,149,85,0.65)'; }}
                    >
                      <ExternalLink size={10} aria-hidden="true" />
                      Bản đồ
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
