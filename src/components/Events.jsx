/* ══════════════════════════════════════════════════════════════════════
   EVENTS — Vietnamese Editorial Wedding Timeline
   Removed: card-based grid, glassmorphism, excessive borders/shadows,
            badge tags, number overlays.
   Design: Vertical timeline — time + dot + event name + location.
   Functionality preserved: Google Maps links.
══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { ExternalLink } from 'lucide-react';

const EVENTS = [
  {
    time:         '07:30',
    period:       'Sáng',
    title:        'Lễ Vu Quy',
    subtitle:     'Nghi thức xuất giá tại Tư gia Nhà Gái',
    description:  'Nghi lễ gia tiên trang trọng, dâng hương kính báo tổ tiên và trao gửi lời chúc phúc thiêng liêng từ gia đình họ nhà gái.',
    locationName: 'Tư Gia Nhà Gái',
    address:      '456 Nguyễn Đình Chiểu, Phường Bàn Cờ, Quận 3, TP. Hồ Chí Minh',
    mapUrl:       'https://maps.google.com/?q=456+Nguyễn+Đình+Chiểu+Quận+3+TP+HCM',
    isMain:       false,
  },
  {
    time:         '10:30',
    period:       'Sáng',
    title:        'Lễ Thành Hôn',
    subtitle:     'Nghi thức rước dâu tại Tư gia Nhà Trai',
    description:  'Khoảnh khắc đón cô dâu về dinh, làm lễ gia tiên báo hỷ và đón nhận sự chúc tụng ấm áp từ quan viên hai họ.',
    locationName: 'Tư Gia Nhà Trai',
    address:      '123 Lê Văn Sỹ, Phường 13, Quận 3, TP. Hồ Chí Minh',
    mapUrl:       'https://maps.google.com/?q=123+Lê+Văn+Sỹ+Quận+3+TP+HCM',
    isMain:       false,
  },
  {
    time:         '17:30',
    period:       'Tối',
    title:        'Tiệc Cưới Chung Vui',
    subtitle:     'Đón Khách 17:30 · Khai Tiệc 19:00',
    description:  'Đêm tiệc thân mật cùng nâng ly chúc mừng hạnh phúc, thưởng thức ẩm thực tinh hoa và lưu giữ những khoảnh khắc đáng nhớ nhất.',
    locationName: 'Sảnh Castor (Tầng 5) · Gem Center',
    address:      'Số 8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    mapUrl:       'https://maps.google.com/?q=Gem+Center+8+Nguyễn+Bỉnh+Khiêm+Quận+1+TP+HCM',
    isMain:       true,
  },
];

export default function Events() {
  return (
    <section
      id="events"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Chương Trình
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            Lịch Trình Hôn Lễ
          </h2>
          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#756B63',
            }}
          >
            Thứ Ba, ngày 20 tháng 10 năm 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="gsap-stagger" style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 'calc(5.5rem + 12px)',
            top: '28px',
            bottom: '28px',
            width: '1px',
            backgroundColor: 'rgba(35,27,21,0.12)',
          }} />

          {EVENTS.map((ev, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '5.5rem 24px 1fr',
                gap: '0 24px',
                marginBottom: i < EVENTS.length - 1 ? 'clamp(40px, 6vw, 56px)' : 0,
                alignItems: 'start',
              }}
            >
              {/* Time */}
              <div style={{ paddingTop: '4px', textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.3rem',
                  fontWeight: 500,
                  color: ev.isMain ? '#8B1E22' : '#231B15',
                  lineHeight: 1,
                  marginBottom: '2px',
                }}>
                  {ev.time}
                </div>
                <div style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#756B63',
                }}>
                  {ev.period}
                </div>
              </div>

              {/* Dot */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '8px',
              }}>
                <div style={{
                  width: ev.isMain ? '12px' : '8px',
                  height: ev.isMain ? '12px' : '8px',
                  borderRadius: '50%',
                  backgroundColor: ev.isMain ? '#8B1E22' : '#B89555',
                  flexShrink: 0,
                  boxShadow: ev.isMain ? '0 0 0 3px rgba(139,30,34,0.12)' : 'none',
                }} />
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 500,
                  color: '#231B15',
                  marginBottom: '4px',
                  lineHeight: 1.2,
                }}>
                  {ev.title}
                </h3>

                {ev.isMain && (
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#8B1E22',
                    marginBottom: '8px',
                    letterSpacing: '0.02em',
                  }}>
                    {ev.subtitle}
                  </p>
                )}

                <p style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.9rem',
                  color: '#4A3F38',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}>
                  {ev.description}
                </p>

                {/* Location */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#231B15',
                    marginBottom: '2px',
                  }}>
                    {ev.locationName}
                  </p>
                  <p style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    color: '#756B63',
                    lineHeight: 1.5,
                  }}>
                    {ev.address}
                  </p>
                </div>

                {/* Maps link */}
                <a
                  href={ev.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: ev.isMain ? '#8B1E22' : '#756B63',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${ev.isMain ? 'rgba(139,30,34,0.3)' : 'rgba(117,107,99,0.3)'}`,
                    paddingBottom: '1px',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#8B1E22'; e.currentTarget.style.borderColor = '#8B1E22'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ev.isMain ? '#8B1E22' : '#756B63'; e.currentTarget.style.borderColor = ev.isMain ? 'rgba(139,30,34,0.3)' : 'rgba(117,107,99,0.3)'; }}
                >
                  <ExternalLink size={11} />
                  Xem bản đồ
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
