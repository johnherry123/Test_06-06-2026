import React from 'react';

const EVENTS = [
  {
    n: '01',
    label: 'Lễ Gia Tiên',
    time: '07:30',
    date: 'Thứ Ba · 20 / 10 / 2026',
    desc: 'Nghi lễ dâng trà & kính báo tổ tiên, ghi dấu sự khởi đầu thiêng liêng của hai họ.',
    place: 'Tư Gia Họ Nhà Trai',
    addr: '123 Lê Văn Sỹ, Quận 3, TP. HCM',
    mapUrl: 'https://maps.google.com/?q=123+Le+Van+Sy+Q3+HCMC',
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=700&fit=crop&q=90',
    accent: '#8B0000',
  },
  {
    n: '02',
    label: 'Tiệc Cưới',
    time: '11:00',
    date: 'Thứ Ba · 20 / 10 / 2026',
    desc: 'Tiệc chung vui cùng hai họ và toàn thể quý khách trong không gian lộng lẫy.',
    place: 'White Palace Convention Center',
    addr: '194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM',
    mapUrl: 'https://maps.google.com/?q=194+Hoang+Van+Thu+Phu+Nhuan+HCMC',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=700&fit=crop&q=90',
    accent: '#8B0000',
  },
];

export default function Events() {
  return (
    <section className="sec s-cream" id="events">
      {/* Background ornamental text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Great Vibes, cursive',
        fontSize: 'clamp(8rem, 20vw, 18rem)',
        color: 'rgba(139,0,0,.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        Sự Kiện
      </div>

      <div className="sec-head fu">
        <span className="eyebrow">Chương Trình</span>
        <h2>Sự Kiện</h2>
        <div className="rule-crimson" style={{ width: '60px', margin: '0 auto' }} />
      </div>

      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {EVENTS.map((ev, idx) => (
          <div key={ev.n} className="fu" style={{ transitionDelay: `${idx * .15}s` }}>
            <div className="grid-ev card" style={{ borderRadius: '2px', overflow: 'hidden' }}>
              {/* Image side */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <img src={ev.img} alt={ev.label} style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform .8s cubic-bezier(.16,1,.3,1)',
                  display: 'block',
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(10,0,0,.6) 0%, rgba(10,0,0,.2) 60%, transparent 100%)',
                }} />

                {/* Time badge */}
                <div style={{
                  position: 'absolute', bottom: '24px', left: '24px',
                }}>
                  <span className="eyebrow" style={{ color: 'rgba(232,201,122,.8)', marginBottom: '4px' }}>
                    Giờ bắt đầu
                  </span>
                  <div className="f-serif" style={{
                    fontSize: 'clamp(2.8rem, 6vw, 4rem)',
                    color: '#fff',
                    lineHeight: 1,
                    fontWeight: 300,
                    textShadow: '0 2px 20px rgba(0,0,0,.5)',
                  }}>
                    {ev.time}
                  </div>
                </div>

                {/* Number badge */}
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  width: '44px', height: '44px',
                  border: '1px solid rgba(232,201,122,.6)',
                  background: 'rgba(0,0,0,.35)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="eyebrow" style={{ color: 'rgba(232,201,122,.9)', fontSize: '9px', letterSpacing: '.4em' }}>
                    {ev.n}
                  </span>
                </div>
              </div>

              {/* Info side */}
              <div style={{
                padding: 'clamp(28px, 4vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#fff',
              }}>
                <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '12px' }}>
                  {ev.date}
                </span>

                <h3 className="f-script" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  color: 'var(--crimson)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}>
                  {ev.label}
                </h3>

                <p className="f-serif" style={{
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  marginBottom: '28px',
                }}>
                  {ev.desc}
                </p>

                <div className="rule" style={{ width: '48px', margin: '0 0 24px' }} />

                {/* Location */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="var(--crimson)" opacity=".6" />
                  </svg>
                  <div>
                    <p className="f-sans" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>
                      {ev.place}
                    </p>
                    <a href={ev.mapUrl} target="_blank" rel="noreferrer" className="f-sans" style={{
                      color: 'var(--gold-deep)',
                      fontSize: '11px',
                      letterSpacing: '.03em',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      textDecorationColor: 'rgba(122,88,0,.4)',
                    }}>
                      {ev.addr}
                    </a>
                  </div>
                </div>

                {/* Map button */}
                <a href={ev.mapUrl} target="_blank" rel="noreferrer" style={{ marginTop: '28px', display: 'inline-block' }}>
                  <button className="btn">
                    <span>Xem Bản Đồ</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                      <path d="M1 9 L9 1 M4 1 L9 1 L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
