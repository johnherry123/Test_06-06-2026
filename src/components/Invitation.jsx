import { COUPLE, FAMILY, WEDDING } from '../weddingData';

export default function Invitation() {
  return (
    <section
      id="loi-ngo"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #F5EDE0 0%, #FAF7F2 100%)',
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
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* ── THE ORNATE WEDDING INVITATION CARD ── */}
        <div
          className="gsap-reveal stationery-card"
          style={{
            borderRadius: '20px',
            padding: 'clamp(28px, 6vw, 56px) clamp(16px, 5vw, 48px)',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Inner hairline border */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '10px',
              border: '1px solid rgba(197, 160, 89, 0.28)',
              borderRadius: '12px',
              pointerEvents: 'none',
            }}
          >
            {/* Corner ornaments */}
            <span style={{ position: 'absolute', top: 5, left: 7, fontSize: '10px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', top: 5, right: 7, fontSize: '10px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 5, left: 7, fontSize: '10px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 5, right: 7, fontSize: '10px', color: '#C5A059' }}>✦</span>
          </div>

          {/* Section Subtitle */}
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#801D24',
              marginBottom: '10px',
            }}
          >
            Thư Mời Báo Hỷ
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 500,
              color: '#1E1612',
              lineHeight: 1.2,
              marginBottom: '10px',
              wordBreak: 'break-word',
            }}
          >
            Hai Gia Đình Trân Trọng Kính Mời
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0rem, 2.2vw, 1.2rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '540px',
              margin: '0 auto clamp(24px, 4.5vw, 36px)',
              lineHeight: 1.6,
            }}
          >
            Đến dự buổi tiệc rượu chung vui cùng gia đình chúng tôi trong ngày vui trọng đại của hai con:
          </p>

          {/* Couple Announcement in Calligraphy */}
          <div style={{ marginBottom: 'clamp(28px, 5vw, 42px)' }}>
            <p
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.1rem, 6vw, 3.6rem)',
                color: '#801D24',
                lineHeight: 1.15,
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              {COUPLE.groom.firstName}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: '#C5A059',
                margin: '2px 0',
              }}
            >
              &amp;
            </p>
            <p
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.1rem, 6vw, 3.6rem)',
                color: '#801D24',
                lineHeight: 1.15,
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              {COUPLE.bride.firstName}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                fontStyle: 'italic',
                color: '#584A42',
                marginTop: '6px',
                marginBottom: 0,
              }}
            >
              ({COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName})
            </p>
          </div>

          {/* Symmetrical Gold Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              margin: '0 auto clamp(28px, 5vw, 38px)',
              maxWidth: '280px',
            }}
          >
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span style={{ color: '#C5A059', fontSize: '13px' }}>❦</span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>

          {/* ── TWO DIGNIFIED COLUMNS: NHÀ TRAI & NHÀ GÁI ── */}
          <div
            className="family-columns-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 'clamp(16px, 4vw, 36px)',
              textAlign: 'center',
              marginBottom: 'clamp(30px, 5vw, 42px)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Nhà Trai */}
            <div
              style={{
                padding: '18px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '999px',
                  background: 'rgba(128, 29, 36, 0.08)',
                  color: '#801D24',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Nhà Trai
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '3px',
                }}
              >
                {FAMILY.groom.father}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '8px',
                }}
              >
                {FAMILY.groom.mother}
              </p>

              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.72rem',
                  color: '#7C6E66',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}
              >
                {FAMILY.groom.address}
              </p>
            </div>

            {/* Nhà Gái */}
            <div
              style={{
                padding: '18px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '999px',
                  background: 'rgba(128, 29, 36, 0.08)',
                  color: '#801D24',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Nhà Gái
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '3px',
                }}
              >
                {FAMILY.bride.father}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '8px',
                }}
              >
                {FAMILY.bride.mother}
              </p>

              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.72rem',
                  color: '#7C6E66',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}
              >
                {FAMILY.bride.address}
              </p>
            </div>
          </div>

          {/* Sincere Gratitude Footer inside Card */}
          <div
            style={{
              borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
              paddingTop: 'clamp(18px, 4vw, 26px)',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                fontStyle: 'italic',
                color: '#801D24',
                lineHeight: 1.6,
                marginBottom: '8px',
                wordBreak: 'break-word',
              }}
            >
              "Sự hiện diện và lời chúc phúc của Quý khách là niềm vinh hạnh to lớn cho hai gia đình chúng tôi."
            </p>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#9A7836',
                letterSpacing: '0.06em',
                wordBreak: 'break-word',
              }}
            >
              {WEDDING.dateDisplay} · {WEDDING.venue}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .family-columns-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
