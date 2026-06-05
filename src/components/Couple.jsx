import React from 'react';

const PEOPLE = [
  {
    name: 'Đại Nghĩa',
    role: 'Chú Rể',
    parents: 'Con trai Ông Nguyễn Văn A & Bà Trần Thị B',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=950&fit=crop&crop=faces&q=90',
  },
  {
    name: 'Thị Nhung',
    role: 'Cô Dâu',
    parents: 'Con gái Ông Lê Văn C & Bà Phạm Thị D',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&h=950&fit=crop&crop=faces&q=90',
  },
];

export default function Couple() {
  return (
    <section id="couple" className="sec s-warm">
      {/* Decorative top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,.4) 30%, rgba(201,168,76,.4) 70%, transparent 95%)',
      }} />

      <div className="sec-head fu">
        <span className="eyebrow">Nhân Vật Chính</span>
        <h2>Chú Rể &amp; Cô Dâu</h2>
        <div className="rule-crimson" style={{ width: '60px', margin: '0 auto' }} />
      </div>

      <div className="wrap grid-2">
        {PEOPLE.map((p, idx) => (
          <div key={p.name} className="fu" style={{ transitionDelay: `${idx * .15}s` }}>
            {/* Portrait frame */}
            <div style={{
              position: 'relative',
              boxShadow: '0 24px 80px rgba(30,0,0,.18)',
            }}>
              <div className="portrait">
                <img src={p.img} alt={p.name} />
                <div className="portrait-info">
                  <span className="eyebrow" style={{ color: 'rgba(232,201,122,.85)', marginBottom: '8px' }}>{p.role}</span>
                  <h3 className="f-script" style={{
                    fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)',
                    color: '#F5ECD8',
                    lineHeight: 1,
                    marginBottom: '10px',
                    textShadow: '0 2px 20px rgba(0,0,0,.6)',
                  }}>
                    {p.name}
                  </h3>
                  <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,201,122,.6), transparent)', margin: '0 auto 12px' }} />
                  <p className="f-sans" style={{ fontSize: '10px', color: 'rgba(255,255,255,.6)', letterSpacing: '.03em', lineHeight: 1.7 }}>
                    {p.parents}
                  </p>
                </div>
              </div>
              {/* Gold corner accents */}
              {[
                { top: '-6px', left: '-6px' },
                { top: '-6px', right: '-6px', transform: 'rotate(90deg)' },
                { bottom: '-6px', left: '-6px', transform: 'rotate(270deg)' },
                { bottom: '-6px', right: '-6px', transform: 'rotate(180deg)' },
              ].map((s, i) => (
                <svg key={i} style={{ position: 'absolute', width: '24px', height: '24px', ...s }} viewBox="0 0 24 24" fill="none">
                  <path d="M1 23 L1 1 L23 1" stroke="rgba(201,168,76,.7)" strokeWidth="1.5" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom ampersand flourish */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <span className="f-script" style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          color: 'rgba(139,0,0,.12)',
          lineHeight: 1,
        }}>
          Hạnh Phúc Viên Mãn
        </span>
      </div>
    </section>
  );
}
