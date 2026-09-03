/*
  COUPLE — Meet the two people
  ─────────────────────────────────────────────────────────────────
  
  This is the "meet the couple" page of the invitation.
  Not editorial profiles. Not portfolio cards.
  Just: here are the two people. Their portraits.
  Warm, simple, beautiful.
  
  Layout:
  - Portrait photos side by side (or stacked on mobile)
  - Name below each portrait
  - A brief connecting line below both
  
  No invented biography.
  No editorial text.
  Real data only from weddingData.js.
*/
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

function Portrait({ person, side }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
          delay: side === 'right' ? 0.12 : 0,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [side]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Portrait photo */}
      <div style={{
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1A120D',
        marginBottom: 'clamp(16px, 3vw, 22px)',
      }}>
        <img
          src={person.photo.src}
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 12%',
            display: 'block',
            filter: 'brightness(0.84) contrast(1.04) saturate(0.86)',
            transition: 'transform 8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.src = person.photo.fallback; }}
        />
      </div>

      {/* Role label */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.60rem', fontWeight: 600,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: '#7C1D21',
        marginBottom: '6px',
      }}>
        {person.role}
      </p>

      {/* Name */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.18rem, 2.5vw, 1.65rem)',
        fontWeight: 500,
        color: '#1A1008',
        lineHeight: 1.15,
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}>
        {person.fullName}
      </p>
    </div>
  );
}

export default function Couple() {
  const sectionRef = useRef(null);
  const bottomRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bottomRef.current) {
        gsap.fromTo(bottomRef.current,
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: bottomRef.current, start: 'top 82%', once: true },
          }
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
        backgroundColor: '#FAF6EC',
        padding: 'clamp(72px, 11vw, 108px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <div style={{
        maxWidth: '720px', margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>

        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 60px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
            fontStyle: 'italic',
            color: 'rgba(80,54,16,0.42)',
            letterSpacing: '0.04em',
          }}>
            Chú rể &amp; Cô dâu
          </p>
        </div>

        {/* Two portraits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(20px, 4vw, 48px)',
          marginBottom: 'clamp(36px, 6vw, 52px)',
        }}
        className="couple-portraits"
        >
          <Portrait person={COUPLE.groom} side="left" />
          <Portrait person={COUPLE.bride}  side="right" />
        </div>

        {/* Bottom connector — warm, simple */}
        <div
          ref={bottomRef}
          style={{ textAlign: 'center', paddingTop: 'clamp(24px, 4vw, 36px)', borderTop: '0.5px solid rgba(160,120,50,0.18)' }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.9rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: '#3D2C12',
            lineHeight: 1.50,
          }}>
            {COUPLE.groom.firstName}
            <span style={{
              color: 'rgba(155,115,42,0.70)',
              fontWeight: 300,
              margin: '0 clamp(8px, 1.8vw, 16px)',
            }}>
              &amp;
            </span>
            {COUPLE.bride.firstName}
          </p>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.68rem',
            color: 'rgba(80,54,16,0.38)',
            letterSpacing: '0.08em',
            marginTop: '8px',
          }}>
            20 · 10 · 2026
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .couple-portraits {
            grid-template-columns: 1fr !important;
            max-width: 280px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
