import React, { useState } from 'react';

const EVENTS = [
  {
    label: 'Lễ Gia Tiên',
    desc: 'Nghi lễ dâng trà & kính báo tổ tiên',
    time: '07:30',
    date: 'Thứ Ba · 20 · 10 · 2026',
    place: 'Tư Gia Họ Nhà Trai',
    addr: '123 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh',
    mapsUrl: 'https://maps.google.com/',
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=700&fit=crop&q=85',
    n: '01',
  },
  {
    label: 'Tiệc Cưới',
    desc: 'Tiệc chung vui cùng hai họ và khách quý',
    time: '11:00',
    date: 'Thứ Ba · 20 · 10 · 2026',
    place: 'White Palace Convention Center',
    addr: '194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM',
    mapsUrl: 'https://maps.google.com/',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=700&fit=crop&q=85',
    n: '02',
  },
];

export default function Events() {
  const [hov, setHov] = useState(null);
  return (
    <section className="section section--paper" id="events">
      <div className="fade-up" style={{ textAlign:'center', marginBottom:'5rem' }}>
        <span className="eyebrow" style={{ marginBottom:'1rem' }}>Chương Trình</span>
        <h2 className="f-script" style={{ fontSize:'clamp(3rem,7vw,5rem)', color:'var(--ruby)', lineHeight:1 }}>Sự Kiện</h2>
        <div className="rule-gold" style={{ width:'100px', margin:'1.5rem auto 0' }} />
      </div>

      <div style={{ maxWidth:'800px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'4rem' }}>
        {EVENTS.map((ev,i) => (
          <div key={i} className="fade-up"
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{
              border:'1px solid rgba(201,169,110,.2)',
              boxShadow: hov===i ? '0 24px 70px rgba(0,0,0,.1)' : '0 8px 32px rgba(0,0,0,.06)',
              transform: hov===i ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all .35s ease',
              background:'#fff', overflow:'hidden',
            }}>

            {/* Photo with time overlay */}
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src={ev.img} alt={ev.label} style={{
                width:'100%', height:'280px', objectFit:'cover', display:'block',
                transform: hov===i ? 'scale(1.04)' : 'scale(1)',
                transition:'transform .6s ease',
              }}/>
              {/* Dark overlay */}
              <div style={{ position:'absolute',inset:0, background:'linear-gradient(to top,rgba(8,5,8,.6) 0%,rgba(8,5,8,.1) 60%,transparent 100%)' }}/>

              {/* Time — bottom left */}
              <div style={{ position:'absolute',bottom:'1.5rem',left:'2rem' }}>
                <p className="f-sans" style={{ fontSize:'8px',letterSpacing:'.4em',color:'rgba(201,169,110,.8)',margin:'0 0 .2rem' }}>GIỜ BẮT ĐẦU</p>
                <p className="f-serif" style={{ fontSize:'3rem',color:'#fff',margin:0,lineHeight:1,fontWeight:700 }}>{ev.time}</p>
              </div>

              {/* Number — top right */}
              <div style={{ position:'absolute',top:'1.5rem',right:'1.5rem',
                width:'40px',height:'40px',border:'1px solid rgba(201,169,110,.5)',
                display:'flex',alignItems:'center',justifyContent:'center',
                backdropFilter:'blur(4px)',background:'rgba(8,5,8,.35)',
              }}>
                <span className="f-sans" style={{ fontSize:'10px',color:'rgba(201,169,110,.85)',letterSpacing:'.1em' }}>{ev.n}</span>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding:'2.5rem 2.5rem 2.8rem', textAlign:'center' }}>
              <span className="eyebrow" style={{ marginBottom:'.8rem' }}>{ev.date}</span>
              <h3 className="f-script" style={{ fontSize:'clamp(2.2rem,5vw,3rem)',color:'var(--ruby)',margin:'0 0 .5rem' }}>{ev.label}</h3>
              <p className="f-cormorant" style={{ fontSize:'1.1rem',fontStyle:'italic',color:'var(--muted)',margin:'0 0 2rem' }}>{ev.desc}</p>
              <div className="rule-gold" style={{ width:'80px',margin:'0 auto 2rem' }}/>
              <div style={{ background:'var(--paper-warm)',padding:'1.4rem',border:'1px solid rgba(201,169,110,.15)' }}>
                <p className="f-serif" style={{ fontWeight:600,color:'var(--charcoal)',marginBottom:'.4rem' }}>{ev.place}</p>
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" style={{ textDecoration:'none' }}>
                  <p className="f-sans" style={{ fontSize:'11px',color:'var(--ruby)',letterSpacing:'.04em',margin:0,textDecoration:'underline',textUnderlineOffset:'3px' }}>{ev.addr}</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
