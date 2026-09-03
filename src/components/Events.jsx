/* ══════════════════════════════════════════════════════════════════════
   EVENTS — Editorial Invitation Layout  [REDESIGNED]
   ART DIRECTION: Deep burgundy — the bold emotional color moment.
   Main event gets visual emphasis. Timeline feels like printed schedule.
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
        backgroundColor: '#6A1518',
        padding: 'clamp(84px, 13vw, 124px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle paper texture on burgundy */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.020'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '180px 180px',
      }} />

      {/* Top warm glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-80px', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(255,210,130,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '880px', margin: '0 auto',
        position: 'relative', zIndex: 1,
        padding: '0 clamp(0px, 3.5vw, 44px)',
      }}>

        {/* Large editorial date — visual anchor */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(48px, 7.5vw, 72px)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 'clamp(10px, 2vw, 22px)',
            marginBottom: 'clamp(14px, 2.5vw, 22px)',
            flexWrap: 'wrap',
          }}>
            {/* Day number — large */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4.5rem, 13vw, 10rem)',
              fontWeight: 400,
              color: 'rgba(248,244,236,0.96)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              flexShrink: 0,
            }}>20</div>

            {/* Month + year stacked */}
            <div style={{
              paddingBottom: 'clamp(8px, 1.6vw, 16px)',
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(3px, 0.7vw, 7px)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.25rem, 2.8vw, 2.1rem)',
                fontStyle: 'italic', fontWeight: 400,
                color: 'rgba(248,244,236,0.62)',
                lineHeight: 1,
              }}>Tháng Mười</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.25rem, 2.8vw, 2.1rem)',
                fontWeight: 400,
                color: 'rgba(248,244,236,0.38)',
                lineHeight: 1, letterSpacing: '-0.02em',
              }}>2026</div>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
            fontWeight: 500,
            color: 'rgba(248,244,236,0.88)',
            lineHeight: 1.2, letterSpacing: '-0.01em',
            marginBottom: '8px',
          }}>Ngày Trọng Đại</h2>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.92rem, 1.7vw, 1.08rem)',
            fontStyle: 'italic',
            color: 'rgba(248,244,236,0.40)',
            margin: 0,
          }}>{WEDDING.venue} · {WEDDING.venueHall}</p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Vertical thread */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: '88px', top: '6px', bottom: '6px',
            width: '1px',
            background: 'rgba(248,244,236,0.09)',
          }} />

          {EVENTS.map((event, i) => (
            <div
              key={i}
              className="gsap-reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: '0 clamp(20px, 3.5vw, 38px)',
                marginBottom: i < EVENTS.length - 1
                  ? (event.isMain ? 'clamp(48px,7.5vw,68px)' : 'clamp(34px,5vw,50px)')
                  : 0,
                alignItems: 'start',
              }}
            >
              {/* Time column */}
              <div style={{
                textAlign: 'right',
                paddingTop: event.isMain ? '3px' : '2px',
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: event.isMain
                    ? 'clamp(1.15rem, 2.2vw, 1.55rem)'
                    : 'clamp(0.92rem, 1.7vw, 1.15rem)',
                  fontWeight: event.isMain ? 500 : 400,
                  color: event.isMain ? 'rgba(248,244,236,0.96)' : 'rgba(248,244,236,0.50)',
                  lineHeight: 1, margin: 0,
                }}>{event.time}</p>
                <p style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.54rem', letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,236,0.22)',
                  marginTop: '3px', marginBottom: 0,
                }}>{event.period}</p>
              </div>

              {/* Event content */}
              <div style={{
                paddingLeft: 'clamp(18px, 3vw, 30px)',
                borderLeft: event.isMain
                  ? '2px solid rgba(176,140,78,0.68)'
                  : '1px solid rgba(248,244,236,0.11)',
                paddingTop: '2px',
                paddingBottom: 'clamp(18px, 3vw, 30px)',
                position: 'relative',
              }}>
                {/* Gold dot on main event */}
                {event.isMain && (
                  <div aria-hidden="true" style={{
                    position: 'absolute',
                    left: '-5px', top: '10px',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#B08C4E',
                    boxShadow: '0 0 0 2px rgba(106,21,24,0.85)',
                  }} />
                )}

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: event.isMain
                    ? 'clamp(1.28rem, 2.6vw, 1.88rem)'
                    : 'clamp(1.05rem, 2vw, 1.35rem)',
                  fontWeight: event.isMain ? 500 : 400,
                  color: event.isMain ? 'rgba(248,244,236,0.96)' : 'rgba(248,244,236,0.70)',
                  lineHeight: 1.15, marginBottom: '5px',
                }}>{event.title}</h3>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.86rem, 1.4vw, 0.98rem)',
                  fontStyle: 'italic',
                  color: 'rgba(248,244,236,0.38)',
                  marginBottom: event.isMain ? '12px' : '7px',
                }}>{event.subtitle}</p>

                {event.isMain && event.description && (
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    color: 'rgba(248,244,236,0.38)',
                    lineHeight: 1.74,
                    marginBottom: '14px',
                    maxWidth: '420px',
                  }}>{event.description}</p>
                )}

                {/* Location + map */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  flexWrap: 'wrap', gap: '7px 16px',
                }}>
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(248,244,236,0.32)',
                    margin: 0,
                  }}>{event.locationName}</p>

                  {event.mapUrl && event.mapUrl !== '#' && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Xem bản đồ: ${event.locationName}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.64rem', fontWeight: 500,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: 'rgba(176,140,78,0.58)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#B08C4E'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(176,140,78,0.58)'; }}
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
