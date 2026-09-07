import { useState } from 'react';
import { Clock, MapPin, Calendar, ExternalLink, Navigation, Sparkles, Heart } from 'lucide-react';
import { WEDDING, FAMILY, COUPLE } from '../weddingData';

const DRESS_CODE_PALETTE = [
  { name: 'Đỏ Rượu Vang', hex: '#7A1A22', textColor: '#FFF2D4' },
  { name: 'Vàng Sâm Panh', hex: '#C5A059', textColor: '#1E1612' },
  { name: 'Cát Ấm & Be', hex: '#E2D5C3', textColor: '#1E1612' },
  { name: 'Đen Lịch Lãm', hex: '#1E1612', textColor: '#FAF7F2' },
];

export default function Events() {
  const [selectedPalette, setSelectedPalette] = useState(null);

  const handleOpenMap = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=GEM+Center+8+Nguyen+Binh+Khiem+Quan+1+TP+HCM',
      '_blank'
    );
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Thành Hôn | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời Quý khách tham dự Lễ Thành Hôn và Tiệc Cưới của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${WEDDING.venueHall} - ${WEDDING.venue}. Đón khách: 17:30, Khai tiệc: 19:00.`
    );
    const location = encodeURIComponent(WEDDING.venueAddress);
    const dates = '20261020T103000Z/20261020T143000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section
      id="ceremony"
      aria-label="Thông tin hôn lễ và tiệc cưới tại Gem Center"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #F5ECE0 0%, #FAF7F2 50%, #FAF5EE 100%)',
        padding: 'clamp(60px, 9vw, 95px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <span id="events" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="dresscode" style={{ position: 'absolute', top: 0, left: 0 }} />
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 44px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} color="#C5A059" />
            Chương II · The Sacred Ceremony &amp; Gala
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Thư Mời &amp; Dạ Tiệc Trăm Năm
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {WEDDING.dateDisplay} — {WEDDING.lunarDate}
          </p>
        </div>

        {/* ── THE GRAND SILK INVITATION STATIONERY CARD ── */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid #C5A059',
            boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.12), 0 0 30px rgba(197, 160, 89, 0.15)',
            padding: 'clamp(28px, 6vw, 56px) clamp(18px, 5vw, 48px)',
            textAlign: 'center',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* Inner Golden Foil Inset Border */}
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              borderRadius: '16px',
              pointerEvents: 'none',
            }}
          />

          {/* Royal Crest / Double Happiness SVG */}
          <div style={{ marginBottom: '14px' }}>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Cinzel', serif",
                fontSize: '28px',
                color: '#C5A059',
                fontWeight: 700,
                display: 'inline-block',
                textShadow: '0 1px 4px rgba(197, 160, 89, 0.4)',
              }}
            >
              囍
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#9A7836',
              marginBottom: '14px',
            }}
          >
            Trân Trọng Kính Báo Lễ Thành Hôn
          </p>

          {/* Parents Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(14px, 3vw, 32px)',
              paddingBottom: '20px',
              borderBottom: '1px dashed rgba(197, 160, 89, 0.35)',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.64rem',
                  letterSpacing: '0.12em',
                  color: '#801D24',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Nhà Trai
              </span>
              <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.96rem, 2vw, 1.15rem)', fontWeight: 600, color: '#1E1612' }}>
                {FAMILY.groom.father}
              </p>
              <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.96rem, 2vw, 1.15rem)', fontWeight: 600, color: '#1E1612' }}>
                {FAMILY.groom.mother}
              </p>
            </div>

            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.64rem',
                  letterSpacing: '0.12em',
                  color: '#801D24',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Nhà Gái
              </span>
              <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.96rem, 2vw, 1.15rem)', fontWeight: 600, color: '#1E1612' }}>
                {FAMILY.bride.father}
              </p>
              <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.96rem, 2vw, 1.15rem)', fontWeight: 600, color: '#1E1612' }}>
                {FAMILY.bride.mother}
              </p>
            </div>
          </div>

          {/* Invitation Lead-in */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              fontStyle: 'italic',
              color: '#42332A',
              marginBottom: '8px',
            }}
          >
            Trân trọng kính mời Quý khách tới dự bữa cơm thân mật chung vui cùng gia đình chúng mình tại:
          </p>

          {/* Venue & Hall */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.7rem, 4.2vw, 2.5rem)',
              fontWeight: 700,
              color: '#801D24',
              lineHeight: 1.2,
              margin: '0 0 6px 0',
            }}
          >
            {WEDDING.venueHall}
          </h3>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.84rem, 2vw, 0.98rem)',
              fontWeight: 600,
              color: '#1E1612',
              margin: '0 0 4px 0',
            }}
          >
            {WEDDING.venue}
          </p>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.76rem, 1.8vw, 0.86rem)',
              color: '#7C6E66',
              marginBottom: '24px',
            }}
          >
            {WEDDING.venueAddress}
          </p>

          {/* Schedule Highlights (Reception & Banquet) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: '12px',
              marginBottom: '26px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FAF7F2',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(128, 29, 36, 0.08)',
                  color: '#801D24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.66rem', color: '#9A7836', fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  17:30 · Đón Khách
                </span>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: '#1E1612', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Chụp ảnh lưu niệm &amp; Tiệc nhẹ Welcome
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FAF7F2',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(197, 160, 89, 0.16)',
                  color: '#801D24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Heart size={18} fill="#801D24" />
              </div>
              <div>
                <span style={{ fontSize: '0.66rem', color: '#9A7836', fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  19:00 · Khai Tiệc
                </span>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: '#1E1612', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Nghi lễ thành hôn &amp; Dạ tiệc âm nhạc
                </p>
              </div>
            </div>
          </div>

          {/* ── INTEGRATED DRESS CODE PALETTE ROW ── */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#FAF5EE',
              border: '1px dashed rgba(197, 160, 89, 0.45)',
              marginBottom: '26px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={12} color="#C5A059" />
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#801D24',
                }}
              >
                Gợi Ý Tone Màu Trang Phục Dự Tiệc
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {DRESS_CODE_PALETTE.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: p.hex,
                      border: '1px solid rgba(0,0,0,0.15)',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: '0.74rem', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, color: '#584A42' }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>

            <p style={{ margin: '8px 0 0 0', fontSize: '0.70rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", color: '#7C6E66' }}>
              * Quý khách vui lòng hạn chế mặc trang phục trắng tinh khôi để dành trọn khoảnh khắc cho Cô Dâu.
            </p>
          </div>

          {/* Action Buttons: Directions & Calendar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={handleOpenMap}
              className="btn-luxury btn-luxury-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.80rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Navigation size={14} />
              <span>Chỉ Đường Đến Gem Center</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCalendar}
              className="btn-luxury btn-luxury-outline"
              style={{
                padding: '12px 20px',
                fontSize: '0.80rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Calendar size={14} />
              <span>Lưu Lịch Cưới</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
