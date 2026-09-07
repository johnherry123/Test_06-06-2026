import { COUPLE, FAMILY, WEDDING } from '../weddingData';

export default function Invitation() {
  return (
    <section
      id="loi-ngo"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #F5EDE0 0%, #FAF7F2 100%)',
        padding: 'clamp(70px, 10vw, 110px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── THE ORNATE WEDDING INVITATION CARD ── */}
        <div
          className="gsap-reveal stationery-card"
          style={{
            borderRadius: '20px',
            padding: 'clamp(36px, 7vw, 64px) clamp(24px, 6vw, 56px)',
            textAlign: 'center',
          }}
        >
          {/* Inner hairline border */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '14px',
              border: '1px solid rgba(197, 160, 89, 0.28)',
              borderRadius: '12px',
              pointerEvents: 'none',
            }}
          >
            {/* Corner ornaments */}
            <span style={{ position: 'absolute', top: 6, left: 8, fontSize: '11px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', top: 6, right: 8, fontSize: '11px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 6, left: 8, fontSize: '11px', color: '#C5A059' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 6, right: 8, fontSize: '11px', color: '#C5A059' }}>✦</span>
          </div>

          {/* Section Subtitle */}
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#801D24',
              marginBottom: '12px',
            }}
          >
            Thư Mời Báo Hỷ
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
              fontWeight: 500,
              color: '#1E1612',
              lineHeight: 1.15,
              marginBottom: '10px',
            }}
          >
            Hai Gia Đình Trân Trọng Kính Mời
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '540px',
              margin: '0 auto clamp(28px, 5vw, 40px)',
              lineHeight: 1.6,
            }}
          >
            Đến dự buổi tiệc rượu chung vui cùng gia đình chúng tôi trong ngày vui trọng đại của hai con:
          </p>

          {/* Couple Announcement in Calligraphy */}
          <div style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <p
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.6rem, 6.5vw, 3.8rem)',
                color: '#801D24',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {COUPLE.groom.fullName}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: '#C5A059',
                margin: '4px 0',
              }}
            >
              &amp;
            </p>
            <p
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.6rem, 6.5vw, 3.8rem)',
                color: '#801D24',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {COUPLE.bride.fullName}
            </p>
          </div>

          {/* Symmetrical Gold Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              margin: '0 auto clamp(32px, 6vw, 44px)',
              maxWidth: '360px',
            }}
          >
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span style={{ color: '#C5A059', fontSize: '15px' }}>❦</span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>

          {/* ── TWO DIGNIFIED COLUMNS: NHÀ TRAI & NHÀ GÁI ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(24px, 5vw, 48px)',
              textAlign: 'center',
              marginBottom: 'clamp(36px, 6vw, 48px)',
            }}
          >
            {/* Nhà Trai */}
            <div
              style={{
                padding: '20px 18px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(197, 160, 89, 0.22)',
              }}
            >
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
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Nhà Trai
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
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
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '10px',
                }}
              >
                {FAMILY.groom.mother}
              </p>

              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  color: '#7C6E66',
                  lineHeight: 1.5,
                }}
              >
                {FAMILY.groom.address}
              </p>
            </div>

            {/* Nhà Gái */}
            <div
              style={{
                padding: '20px 18px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(197, 160, 89, 0.22)',
              }}
            >
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
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Nhà Gái
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
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
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#1E1612',
                  marginBottom: '10px',
                }}
              >
                {FAMILY.bride.mother}
              </p>

              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  color: '#7C6E66',
                  lineHeight: 1.5,
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
              paddingTop: 'clamp(20px, 4vw, 30px)',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                fontStyle: 'italic',
                color: '#801D24',
                lineHeight: 1.7,
                marginBottom: '8px',
              }}
            >
              "Sự hiện diện và lời chúc phúc của Quý khách là niềm vinh hạnh to lớn cho hai gia đình chúng tôi."
            </p>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#9A7836',
                letterSpacing: '0.08em',
              }}
            >
              {WEDDING.dateDisplay} · {WEDDING.venue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
