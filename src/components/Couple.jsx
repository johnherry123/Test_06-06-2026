import React from 'react';

const PEOPLE = [
  {
    name: 'Đại Nghĩa', role: 'Chú Rể',
    parents: 'Con trai Ông Nguyễn Văn A & Bà Trần Thị B',
    desc: 'Điềm đạm, ấm áp — chỗ dựa vững chắc của gia đình.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=faces&q=85',
  },
  {
    name: 'Thị Nhung', role: 'Cô Dâu',
    parents: 'Con gái Ông Lê Văn C & Bà Phạm Thị D',
    desc: 'Dịu dàng, tinh tế — nụ cười rạng rỡ của gia đình.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop&crop=faces&q=85',
  },
];

export default function Couple() {
  return (
    <section className="section section--warm" style={{ textAlign: 'center' }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '5rem' }}>
        <span className="eyebrow" style={{ marginBottom: '1rem' }}>Nhân Vật Chính</span>
        <h2 className="f-script" style={{ fontSize: 'clamp(3rem,7vw,5rem)', color: 'var(--ruby)', lineHeight:1 }}>
          Chú Rể &amp; Cô Dâu
        </h2>
        <div className="rule-gold" style={{ width: '100px', margin: '1.5rem auto 0' }} />
      </div>

      {/* Portraits */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: '3rem 5rem', maxWidth: '820px', margin: '0 auto', padding: '0 1rem',
      }}>
        {PEOPLE.map(p => (
          <div key={p.name} className="fade-up" style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>

            {/* Photo — full arch */}
            <div style={{
              position: 'relative', marginBottom: '2.5rem',
              width: '220px',
            }}>
              {/* Outer gold arch border */}
              <div style={{
                position: 'absolute', inset: '-10px',
                border: '1px solid rgba(201,169,110,.5)',
                borderRadius: '110px 110px 0 0',
              }} />
              {/* Photo */}
              <div style={{
                width: '220px', height: '300px',
                borderRadius: '110px 110px 0 0',
                overflow: 'hidden',
                border: '2px solid rgba(201,169,110,.55)',
                boxShadow: '0 20px 60px rgba(0,0,0,.13)',
              }}>
                <img src={p.img} alt={p.name} style={{
                  width:'100%', height:'100%', objectFit:'cover', objectPosition:'top',
                  display:'block', transition:'transform .6s ease',
                }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
              </div>
              {/* Gold circle badge */}
              <div style={{
                position:'absolute', bottom:'-16px', left:'50%', transform:'translateX(-50%)',
                width:'32px', height:'32px', borderRadius:'50%',
                background:'linear-gradient(135deg,var(--gold-bright),var(--gold))',
                boxShadow:'0 4px 14px rgba(0,0,0,.18)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,.7)' }}/>
              </div>
            </div>

            <h3 className="f-script" style={{ fontSize:'2.8rem', color:'var(--ruby)', margin:'0 0 .3rem' }}>{p.name}</h3>
            <span className="eyebrow" style={{ marginBottom:'1rem' }}>{p.role}</span>
            <div className="rule-gold" style={{ width:'40px', margin:'0 auto 1rem' }} />
            <p className="f-sans" style={{ fontSize:'11px', color:'var(--muted)', lineHeight:1.8, maxWidth:'210px', marginBottom:'.7rem' }}>{p.parents}</p>
            <p className="f-cormorant" style={{ fontSize:'1.05rem', color:'var(--charcoal)', fontStyle:'italic', maxWidth:'210px', lineHeight:1.8, opacity:.75 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
