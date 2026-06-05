import React from 'react';

const EVENTS = [
  {
    label: 'Lễ Gia Tiên',
    desc: 'Nghi lễ dâng trà & kính báo tổ tiên',
    time: '07:30',
    date: '20 . 10 . 2026',
    place: 'Tư Gia Họ Nhà Trai',
    addr: '123 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh',
    img: 'https://images.unsplash.com/photo-1522083165195-3444ea4f7768?auto=format&fit=crop&q=85&w=900&h=600',
  },
  {
    label: 'Tiệc Cưới',
    desc: 'Tiệc chung vui cùng hai họ',
    time: '11:00',
    date: '20 . 10 . 2026',
    place: 'White Palace Convention Center',
    addr: '194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=900&h=600',
  },
];

export default function Events() {
  return (
    <section className="section-padding" id="events" style={{ background: 'var(--bg-pearl)' }}>
      <div className="fade-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="font-script" style={{ fontSize: '4rem', color: 'var(--cherry-dark)', margin: 0 }}>Sự Kiện</h2>
          <div className="divider-gold" style={{ margin: '1rem auto' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {EVENTS.map((ev, idx) => (
            <div key={idx} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '2rem',
              background: '#FFF', padding: '2rem',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              
              {/* Image side */}
              <div style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{
                  position: 'relative', padding: '10px',
                  border: '1px solid var(--gold-champagne)',
                  borderRadius: '2px'
                }}>
                  <img src={ev.img} alt={ev.label} style={{ width: '100%', height: '350px', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>

              {/* Text side */}
              <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', padding: '1rem' }}>
                <p className="font-sans" style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--cherry-primary)', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{ev.date}</p>
                <h3 className="font-serif" style={{ fontSize: '2.8rem', color: 'var(--cherry-dark)', marginBottom: '0.5rem' }}>{ev.label}</h3>
                <p className="font-serif" style={{ fontSize: '2rem', color: 'var(--cherry-primary)', fontStyle: 'italic', marginBottom: '1rem' }}>{ev.time}</p>
                <p className="font-sans" style={{ fontSize: '14px', color: 'var(--text-dark)', marginBottom: '2rem' }}>{ev.desc}</p>
                
                <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', borderBottom: '1px solid rgba(212,175,55,0.3)', padding: '1.5rem 0' }}>
                  <p className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--cherry-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>{ev.place}</p>
                  <a href="https://maps.google.com/?q=123+Lê+Văn+Sỹ" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <p className="font-sans" style={{ fontSize: '12px', color: 'var(--cherry-primary)', textDecoration: 'underline', fontWeight: 500 }}>{ev.addr}</p>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
