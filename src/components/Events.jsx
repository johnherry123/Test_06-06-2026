import React from 'react';

const EVENTS = [
  {
    label: 'Lễ Gia Tiên',
    desc: 'Nghi lễ dâng trà & kính báo tổ tiên',
    time: '07:30',
    date: '20 . 10 . 2026',
    place: 'Tư Gia Họ Nhà Trai',
    addr: '123 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh',
    mapsUrl: 'https://maps.google.com/?q=Lê+Văn+Sỹ+Quận+3+TP+HCM',
    img: 'https://images.unsplash.com/photo-1522083165195-3444ea4f7768?auto=format&fit=crop&q=85&w=900&h=600',
  },
  {
    label: 'Tiệc Cưới',
    desc: 'Tiệc chung vui cùng hai họ và khách quý',
    time: '11:00',
    date: '20 . 10 . 2026',
    place: 'White Palace Convention Center',
    addr: '194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM',
    mapsUrl: 'https://maps.google.com/?q=White+Palace+Convention+Center+194+Hoang+Van+Thu+Phu+Nhuan',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=900&h=600',
  },
];

export default function Events() {
  return (
    <section className="section-padding" id="events" style={{ background: 'var(--bg-pearl)' }}>
      <div className="fade-up" style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div className="text-center mb-16">
          <p className="font-sans" style={{ fontSize: '11px', letterSpacing: '.4em', color: 'var(--cherry-primary)', textTransform: 'uppercase', marginBottom: '.5rem', fontWeight: 600 }}>Chương Trình</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem,8vw,4.5rem)', color: 'var(--cherry-dark)', margin: 0 }}>Sự Kiện</h2>
          <div className="divider-gold" />
        </div>

        <div className="flex flex-col gap-20">
          {EVENTS.map((ev, idx) => (
            <div key={idx} className="flex flex-col items-center" style={{
              background: '#FFF',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            }}>
              {/* Photo */}
              <div className="w-full" style={{ padding: '12px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                <div style={{ border: '1px solid rgba(212,175,55,0.4)', padding: '4px' }}>
                  <img src={ev.img} alt={ev.label} className="w-full object-cover" style={{ height: '280px', display: 'block' }} />
                </div>
              </div>

              {/* Info */}
              <div className="w-full flex flex-col items-center text-center p-8 gap-3">
                <p className="font-sans" style={{ fontSize: '12px', letterSpacing: '.25em', color: 'var(--cherry-primary)', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>{ev.date}</p>

                <h3 className="font-serif" style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', color: 'var(--cherry-dark)', margin: 0 }}>{ev.label}</h3>

                <div className="flex items-center gap-4">
                  <div style={{ width: '30px', height: '1px', background: 'var(--gold-champagne)' }} />
                  <span className="font-serif" style={{ fontSize: '2rem', color: 'var(--cherry-primary)', fontStyle: 'italic' }}>{ev.time}</span>
                  <div style={{ width: '30px', height: '1px', background: 'var(--gold-champagne)' }} />
                </div>

                <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>{ev.desc}</p>

                <div style={{ borderTop: '1px solid rgba(212,175,55,0.25)', borderBottom: '1px solid rgba(212,175,55,0.25)', padding: '1.2rem 2rem', width: '100%', marginTop: '.5rem' }}>
                  <p className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--cherry-dark)', fontWeight: 600, margin: '0 0 .4rem' }}>{ev.place}</p>
                  <a href={ev.mapsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <p className="font-sans" style={{ fontSize: '12px', color: 'var(--cherry-primary)', textDecoration: 'underline', fontWeight: 500, margin: 0 }}>{ev.addr}</p>
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
