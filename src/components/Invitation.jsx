import React from 'react';

/* ══════════════════════════════════════════════════════════════════════
   WEDDING INVITATION & ANNOUNCEMENT (LỜI NGỎ)
   100% Native Vietnamese Typography & Family Lineage
══════════════════════════════════════════════════════════════════════ */

export default function Invitation() {
  return (
    <section
      id="invitation"
      style={{
        position: 'relative',
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.12) 1px, transparent 0)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '860px',
          margin: '0 auto',
          zIndex: 2,
        }}
      >
        <div
          className="gold-frame corner-ornament"
          style={{
            backgroundColor: '#FFFDF9',
            padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px)',
            textAlign: 'center',
          }}
        >
          {/* Eyebrow */}
          <div className="eyebrow-luxury">Lời Ngỏ</div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 16px',
            }}
          >
            Trân Trọng Kính Mời
          </h2>

          <div className="divider-luxury" style={{ marginBottom: '32px' }}>
            <span style={{ color: '#8B1E22', fontSize: '1.2rem' }}>囍</span>
          </div>

          {/* Family Lineage Presentation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              margin: '0 auto 36px',
              padding: '24px 20px',
              backgroundColor: 'rgba(248, 245, 238, 0.85)',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              borderRadius: '3px',
            }}
          >
            {/* Groom Family */}
            <div style={{ textAlign: 'center' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#8B1E22',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Nhà Trai
              </span>
              <p
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#231B15',
                  margin: '0 0 4px',
                }}
              >
                Ông: NGUYỄN VĂN HÙNG
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#231B15',
                  margin: '0 0 6px',
                }}
              >
                Bà: TRẦN THỊ MAI
              </p>
              <span
                className="font-sans"
                style={{
                  fontSize: '0.85rem',
                  color: '#8F7E73',
                }}
              >
                Tân Bình, TP. Hồ Chí Minh
              </span>
            </div>

            {/* Bride Family */}
            <div style={{ textAlign: 'center' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#8B1E22',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Nhà Gái
              </span>
              <p
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#231B15',
                  margin: '0 0 4px',
                }}
              >
                Ông: LÊ VĂN THÀNH
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#231B15',
                  margin: '0 0 6px',
                }}
              >
                Bà: PHẠM THỊ LAN
              </p>
              <span
                className="font-sans"
                style={{
                  fontSize: '0.85rem',
                  color: '#8F7E73',
                }}
              >
                Quận 3, TP. Hồ Chí Minh
              </span>
            </div>
          </div>

          {/* Couple Role Titles */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              margin: '0 auto 36px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#8F7E73',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Trưởng Nam
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#8B1E22',
                  margin: '4px 0 0',
                }}
              >
                NGUYỄN ĐẠI NGHĨA
              </h3>
            </div>

            <span
              className="font-serif"
              style={{ fontSize: '1.8rem', color: '#C5A059', fontStyle: 'italic' }}
            >
              &
            </span>

            <div style={{ textAlign: 'center' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#8F7E73',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Út Nữ
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#8B1E22',
                  margin: '4px 0 0',
                }}
              >
                LÊ THỊ NHUNG
              </h3>
            </div>
          </div>

          {/* Message Body */}
          <div style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                fontStyle: 'italic',
                color: '#584A40',
                lineHeight: 1.9,
                margin: '0 0 18px',
              }}
            >
              "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.
              Sau hành trình tìm hiểu và gắn kết, chúng tôi quyết định nắm tay nhau bước vào
              chương mới của cuộc đời."
            </p>

            <p
              className="font-sans"
              style={{
                fontSize: '0.95rem',
                color: '#231B15',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Sự hiện diện và lời chúc phúc của Quý khách là niềm vinh hạnh và món quà quý giá
              nhất đối với gia đình chúng tôi trong ngày trọng đại này.
            </p>
          </div>

          {/* Signatures */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
              marginTop: '28px',
            }}
          >
            <div className="font-script text-gold-luxury" style={{ fontSize: '2.5rem' }}>
              Đại Nghĩa
            </div>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C5A059' }} />
            <div className="font-script text-gold-luxury" style={{ fontSize: '2.5rem' }}>
              Thị Nhung
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
