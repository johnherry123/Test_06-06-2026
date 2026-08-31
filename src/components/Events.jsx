import React from 'react';
import { Clock, MapPin, ExternalLink } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   WEDDING SCHEDULE & TIMELINE (CHƯƠNG TRÌNH HÔN LỄ)
   100% Native Vietnamese Typography & Verified Google Maps Routing
══════════════════════════════════════════════════════════════════════ */

const EVENTS = [
  {
    num: '01',
    time: '07:30',
    period: 'Sáng',
    date: '20.10.2026',
    title: 'Lễ Vu Quy',
    subtitle: 'Nghi thức xuất giá tại Tư gia Nhà Gái',
    description: 'Nghi lễ gia tiên trang trọng, dâng hương kính báo tổ tiên và trao gửi lời chúc phúc thiêng liêng từ gia đình họ nhà gái.',
    locationName: 'Tư Gia Nhà Gái',
    address: '456 Nguyễn Đình Chiểu, Phường Bàn Cờ, Quận 3, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=456+Nguyễn+Đình+Chiểu+Quận+3+TP+HCM',
    tag: 'Nhà Gái',
  },
  {
    num: '02',
    time: '10:30',
    period: 'Sáng',
    date: '20.10.2026',
    title: 'Lễ Thành Hôn',
    subtitle: 'Nghi thức rước dâu tại Tư gia Nhà Trai',
    description: 'Khoảnh khắc đón cô dâu về dinh, làm lễ gia tiên báo hỷ và đón nhận sự chúc tụng ấm áp từ quan viên hai họ.',
    locationName: 'Tư Gia Nhà Trai',
    address: '123 Lê Văn Sỹ, Phường 13, Quận 3, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=123+Lê+Văn+Sỹ+Quận+3+TP+HCM',
    tag: 'Nhà Trai',
  },
  {
    num: '03',
    time: '17:30',
    period: 'Tối',
    date: '20.10.2026',
    title: 'Tiệc Cưới Chung Vui',
    subtitle: 'Đón Khách 17:30 · Khai Tiệc 19:00',
    description: 'Đêm tiệc thân mật cùng nâng ly chúc mừng hạnh phúc, thưởng thức ẩm thực tinh hoa và lưu giữ những khoảnh khắc đáng nhớ nhất.',
    locationName: 'Sảnh Castor (Tầng 5) · Gem Center',
    address: 'Số 8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=Gem+Center+8+Nguyễn+Bỉnh+Khiêm+Quận+1+TP+HCM',
    tag: 'Đại Tiệc',
    isMain: true,
  },
];

export default function Events() {
  return (
    <section
      id="events"
      style={{
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div className="eyebrow-luxury">Chương Trình Hôn Lễ</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Sự Kiện <span style={{ color: '#8B1E22' }}>Trọng Đại</span>
          </h2>
          <div className="divider-luxury">
            <span style={{ color: '#8B1E22' }}>囍</span>
          </div>
          <p
            className="font-serif"
            style={{
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: '#584A40',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            Trân trọng kính mời Quý khách cùng hòa chung niềm vui với gia đình chúng tôi
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(24px, 3.5vw, 36px)',
          }}
        >
          {EVENTS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px 28px 30px',
                backgroundColor: item.isMain ? '#FFFDF9' : '#FFFFFF',
                border: item.isMain
                  ? '1.5px solid rgba(139, 30, 34, 0.35)'
                  : '1px solid rgba(197, 160, 89, 0.25)',
                boxShadow: item.isMain
                  ? '0 16px 45px rgba(139, 30, 34, 0.1)'
                  : '0 10px 30px rgba(35, 27, 21, 0.05)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    backgroundColor: item.isMain ? '#8B1E22' : 'rgba(197, 160, 89, 0.15)',
                    color: item.isMain ? '#FFFFFF' : '#8B1E22',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '4px 12px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.tag}
                </span>

                <span
                  className="font-display"
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: 'rgba(197, 160, 89, 0.3)',
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                    marginBottom: '6px',
                  }}
                >
                  <Clock size={18} color="#8B1E22" style={{ alignSelf: 'center' }} />
                  <span
                    className="font-display"
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      color: '#8B1E22',
                      lineHeight: 1,
                    }}
                  >
                    {item.time}
                  </span>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#8F7E73',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.period} · {item.date}
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#231B15',
                    margin: '8px 0 4px',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#8B1E22',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {item.subtitle}
                </p>
              </div>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#584A40',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  flexGrow: 1,
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(197, 160, 89, 0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
                  <MapPin size={16} color="#8B1E22" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.94rem', color: '#231B15', marginBottom: '2px' }}>
                      {item.locationName}
                    </strong>
                    <span style={{ fontSize: '0.84rem', color: '#8F7E73', lineHeight: 1.5, display: 'block' }}>
                      {item.address}
                    </span>
                  </div>
                </div>

                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={item.isMain ? 'btn-crimson' : 'btn-gold-outline'}
                  data-cursor-hover
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    fontSize: '0.82rem',
                  }}
                >
                  <ExternalLink size={14} />
                  Xem Bản Đồ Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
