/*
  EVENTS — Wedding Day Details
  ─────────────────────────────────────────────────────────────────
  
  This section is the ceremony details page of the invitation.
  A Vietnamese wedding invitation prints this information clearly:
  - Lễ cưới / Tiệc mừng
  - Ngày giờ
  - Địa điểm
  - Map link
  
  Keep it elegant and readable. Not a UI dashboard.
  Not a modern timeline component. Not a dashboard widget.
  Just beautiful, clear information.
*/
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { EVENTS, WEDDING } from '../weddingData';

export default function Events() {
  return (
    <section
      id="events"
      aria-label="Lịch trình lễ cưới"
      style={{
        backgroundColor: '#6A1518',
        padding: 'clamp(72px, 11vw, 108px) clamp(24px, 5vw, 56px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle warm paper grain on burgundy */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '180px 180px',
      }} />

      <div style={{
        maxWidth: '640px', margin: '0 auto',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>

        {/* Section header */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(44px, 7vw, 64px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.75rem, 1.4vw, 0.88rem)',
            fontStyle: 'italic',
            color: 'rgba(248,244,236,0.40)',
            letterSpacing: '0.04em',
            marginBottom: 'clamp(10px, 2vw, 14px)',
          }}>
            Trân trọng kính mời
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.2rem, 6vw, 4.0rem)',
            fontWeight: 400, fontStyle: 'italic',
            color: 'rgba(248,244,236,0.94)',
            lineHeight: 1.08, letterSpacing: '0.01em',
            margin: 0,
          }}>
            Ngày 20 tháng Mười
          </h2>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)',
            fontWeight: 400,
            color: 'rgba(248,244,236,0.32)',
            letterSpacing: '0.08em',
            marginTop: '8px',
          }}>
            {WEDDING.venueAddress}
          </p>
        </div>

        {/* Events — printed-invitation style, no widget chrome */}
        <div className="gsap-stagger" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px, 5vw, 40px)',
        }}>
          {EVENTS.map((event, i) => (
            <div key={i} style={{
              borderTop: i === 0
                ? '0.5px solid rgba(248,244,236,0.12)'
                : '0.5px solid rgba(248,244,236,0.08)',
              paddingTop: 'clamp(20px, 3.5vw, 28px)',
              position: 'relative',
            }}>
              {/* Gold accent dot for main event */}
              {event.isMain && (
                <div aria-hidden="true" style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  backgroundColor: '#B08C4E',
                  margin: '0 auto clamp(12px, 2.5vw, 18px)',
                }} />
              )}

              {/* Time */}
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: event.isMain
                  ? 'clamp(0.68rem, 1.4vw, 0.80rem)'
                  : 'clamp(0.62rem, 1.2vw, 0.72rem)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: event.isMain
                  ? 'rgba(176,140,78,0.90)'
                  : 'rgba(248,244,236,0.32)',
                marginBottom: 'clamp(6px, 1.2vw, 10px)',
              }}>
                {event.time} {event.period}
              </p>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: event.isMain
                  ? 'clamp(1.45rem, 3.2vw, 2.1rem)'
                  : 'clamp(1.15rem, 2.5vw, 1.6rem)',
                fontWeight: event.isMain ? 500 : 400,
                color: event.isMain
                  ? 'rgba(248,244,236,0.95)'
                  : 'rgba(248,244,236,0.65)',
                lineHeight: 1.15,
                marginBottom: 'clamp(5px, 1vw, 8px)',
              }}>
                {event.title}
              </h3>

              {/* Subtitle */}
              {event.subtitle && (
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.98rem)',
                  fontStyle: 'italic',
                  color: 'rgba(248,244,236,0.36)',
                  marginBottom: event.description ? 'clamp(8px, 1.5vw, 12px)' : 0,
                }}>
                  {event.subtitle}
                </p>
              )}

              {/* Description for main event */}
              {event.isMain && event.description && (
                <p style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(248,244,236,0.34)',
                  lineHeight: 1.72,
                  marginBottom: 'clamp(8px, 1.5vw, 12px)',
                  maxWidth: '380px',
                  margin: '0 auto clamp(8px, 1.5vw, 12px)',
                }}>
                  {event.description}
                </p>
              )}

              {/* Location + map */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                gap: '14px', flexWrap: 'wrap',
                marginTop: 'clamp(6px, 1.2vw, 10px)',
              }}>
                <span style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.70rem',
                  color: 'rgba(248,244,236,0.28)',
                }}>
                  {event.locationName}
                </span>

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
                      color: 'rgba(176,140,78,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#B08C4E'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(176,140,78,0.55)'; }}
                  >
                    <ExternalLink size={10} aria-hidden="true" />
                    Bản đồ
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
