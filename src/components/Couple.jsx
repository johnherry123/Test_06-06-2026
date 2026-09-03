/* ══════════════════════════════════════════════════════════════════════
   COUPLE — Two People, One Story  [REDESIGNED]
   ART DIRECTION: Clean ivory panels — photography fills its column.
   The connector text is now an editorial statement from the couple data.
   Hard-coded placeholder text replaced with data-driven approach.
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

function PersonPanel({ person, photoLeft }) {
  const panelRef = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          Array.from(textRef.current.children),
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 78%', once: true },
          }
        );
      }
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={panelRef}
      className="couple-panel"
      aria-label={`${person.role}: ${person.fullName}`}
      style={{
        display: 'grid',
        gridTemplateColumns: photoLeft ? '58% 42%' : '42% 58%',
        minHeight: 'clamp(480px, 62vh, 640px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Photo column */}
      <div
        className="couple-photo-col"
        style={{
          order: photoLeft ? 1 : 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={person.photo.src}
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 18%',
            display: 'block',
            transition: 'transform 9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.src = person.photo.fallback; }}
        />
        {/* Bottom gradient */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '28%',
          background: 'linear-gradient(to top, rgba(30,20,16,0.12), transparent)',
          pointerEvents: 'none',
        }} />
        {/* Side gradient — where photo meets text */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, bottom: 0,
          [photoLeft ? 'right' : 'left']: 0,
          width: '72px',
          background: `linear-gradient(to ${photoLeft ? 'right' : 'left'}, transparent, rgba(245,239,227,0.10))`,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Text column */}
      <div
        ref={textRef}
        className="couple-text-col"
        style={{
          order: photoLeft ? 2 : 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6.5vw, 80px) clamp(32px, 5.5vw, 68px)',
          backgroundColor: '#FDFBF5',
        }}
      >
        {/* Role */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#7C1D21',
          marginBottom: 'clamp(14px, 2.5vw, 20px)',
        }}>{person.role}</p>

        {/* Full name */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.85rem, 3.6vw, 2.9rem)',
          fontWeight: 500,
          color: '#1E1410',
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(20px, 3.2vw, 30px)',
        }}>{person.fullName}</h2>

        {/* Accent line */}
        <div style={{
          width: 'clamp(26px, 4.5vw, 38px)',
          height: '1px',
          background: 'linear-gradient(to right, rgba(176,140,78,0.70), transparent)',
          marginBottom: 'clamp(18px, 3vw, 28px)',
        }} />

        {/* Editorial statement — uses roleLabel from data */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.02rem, 1.85vw, 1.22rem)',
          fontStyle: 'italic', fontWeight: 400,
          color: '#6B5D52',
          lineHeight: 1.88,
          margin: '0 0 clamp(14px, 2.2vw, 22px)',
        }}>
          {person.role === 'Chú Rể'
            ? 'Trưởng nam trong gia đình — người sẽ nâng niu và trân trọng từng khoảnh khắc bên nhau.'
            : 'Út nữ yêu dấu của gia đình — người mang đến ánh sáng và tiếng cười cho những ai may mắn được gặp.'}
        </p>

        {/* Role label */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.70rem', fontWeight: 500,
          color: '#B08C4E',
          letterSpacing: '0.07em',
        }}>{person.roleLabel}</p>
      </div>
    </article>
  );
}

/* Visual connector between panels */
function PanelConnector() {
  return (
    <div aria-hidden="true" style={{
      position: 'relative',
      height: '1px',
      backgroundColor: 'rgba(30,20,16,0.06)',
      overflow: 'visible',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        width: '5px', height: '5px',
        backgroundColor: '#B08C4E',
        opacity: 0.50,
      }} />
    </div>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      aria-label="Hai chúng mình"
      style={{ backgroundColor: '#F5EFE3' }}
    >
      {/* Section header */}
      <div className="gsap-reveal" style={{
        textAlign: 'center',
        padding: 'clamp(42px, 7vw, 68px) 24px clamp(18px, 3vw, 28px)',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
          fontWeight: 500,
          color: '#1E1410',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {COUPLE.groom.firstName}&nbsp;
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontWeight: 300,
            color: '#B08C4E',
            fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
          }}>&amp;</span>&nbsp;
          {COUPLE.bride.firstName}
        </h2>
      </div>

      <PersonPanel person={COUPLE.groom} photoLeft={true} />
      <PanelConnector />
      <PersonPanel person={COUPLE.bride} photoLeft={false} />
    </section>
  );
}
