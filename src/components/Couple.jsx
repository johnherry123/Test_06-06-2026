import { COUPLE } from '../weddingData';
import { Heart } from 'lucide-react';

function PersonCard({ person, side }) {
  return (
    <div
      className="gsap-reveal"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 'min(300px, 100%)',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Roman Arch Portrait Frame */}
      <div
        className="arch-gold-border"
        style={{
          width: '100%',
          maxWidth: 'min(250px, 75vw)',
          marginBottom: '18px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="arch-frame"
          style={{
            width: '100%',
            aspectRatio: '3 / 4',
            backgroundColor: '#F0E6D6',
          }}
        >
          <img
            src={person.photo.src}
            alt={person.photo.alt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              display: 'block',
              transition: 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onError={(e) => {
              e.currentTarget.src = person.photo.fallback;
            }}
          />
        </div>
      </div>

      {/* Role Pill */}
      <div
        style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: '999px',
          background: 'rgba(128, 29, 36, 0.08)',
          color: '#801D24',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.64rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        {person.role} · {person.roleLabel}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.5rem, 3.2vw, 2.0rem)',
          fontWeight: 600,
          color: '#1E1612',
          lineHeight: 1.15,
          marginBottom: '4px',
          wordBreak: 'break-word',
        }}
      >
        {person.fullName}
      </h3>

      {/* Profession */}
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.72rem',
          color: '#C5A059',
          letterSpacing: '0.08em',
          fontWeight: 600,
          marginBottom: '12px',
        }}
      >
        {person.title}
      </p>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: '#584A42',
          lineHeight: 1.6,
          marginBottom: '16px',
          padding: '0 4px',
          wordBreak: 'break-word',
        }}
      >
        {person.quote}
      </p>

      {/* Details List */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(197, 160, 89, 0.28)',
          borderRadius: '12px',
          padding: '12px 14px',
          boxShadow: '0 4px 16px rgba(50, 30, 15, 0.04)',
          textAlign: 'left',
          boxSizing: 'border-box',
        }}
      >
        {person.details?.map((det, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: i < person.details.length - 1 ? '1px dashed rgba(197, 160, 89, 0.2)' : 'none',
              fontSize: '0.76rem',
              gap: '8px',
            }}
          >
            <span style={{ color: '#801D24', fontWeight: 600, flexShrink: 0 }}>{det.label}:</span>
            <span style={{ color: '#584A42', textAlign: 'right', wordBreak: 'break-word' }}>{det.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      aria-label="Thông tin chú rể và cô dâu"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 70% at 50% 20%, #FFFDF9 0%, #F5EDE0 100%)',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 60px)' }}>
          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#801D24',
              marginBottom: '8px',
            }}
          >
            Đôi Uyên Ương
          </p>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: 0,
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Chú Rể &amp; Cô Dâu
          </h2>
        </div>

        {/* ── TWO ARCH PORTRAIT CARDS WITH ROMANTIC UNITY ── */}
        <div
          className="couple-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: 'clamp(24px, 5vw, 48px)',
            alignItems: 'start',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <PersonCard person={COUPLE.groom} side="left" />
          <PersonCard person={COUPLE.bride} side="right" />
        </div>

        {/* Loving Union Banner */}
        <div
          className="gsap-reveal"
          style={{
            textAlign: 'center',
            marginTop: 'clamp(36px, 6vw, 56px)',
            padding: '20px 16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 235, 0.9) 100%)',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            boxShadow: '0 8px 25px rgba(50, 30, 15, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Heart size={18} color="#801D24" fill="#801D24" style={{ flexShrink: 0 }} />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              fontStyle: 'italic',
              color: '#2C221C',
              margin: 0,
              wordBreak: 'break-word',
            }}
          >
            "Hai trái tim hòa cùng một nhịp đập, hai cuộc đời gắn kết trọn yêu thương."
          </p>
          <Heart size={18} color="#801D24" fill="#801D24" style={{ flexShrink: 0 }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .couple-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
