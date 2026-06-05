import React from 'react';

const PEOPLE = [
  {
    name: 'Đại Nghĩa',
    role: 'Trưởng Nam',
    desc: 'Một chàng trai điềm đạm, ấm áp, luôn là chỗ dựa vững chắc.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Thị Nhung',
    role: 'Út Nữ',
    desc: 'Một cô gái dịu dàng, tinh tế, luôn mang đến nụ cười rạng rỡ.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
];

export default function Couple() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-cream)' }}>
      <div className="fade-up" style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div className="text-center mb-16">
          <p className="font-sans" style={{ fontSize: '11px', letterSpacing: '.4em', color: 'var(--cherry-primary)', textTransform: 'uppercase', marginBottom: '.5rem', fontWeight: 600 }}>Nhân Vật Chính</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem,8vw,4.5rem)', color: 'var(--cherry-dark)', margin: 0 }}>
            Chú Rể &amp; Cô Dâu
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Responsive grid: 1 col mobile → 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PEOPLE.map(p => (
            <div key={p.name} className="flex flex-col items-center text-center">
              {/* Arch photo frame */}
              <div className="mb-8 relative" style={{ width: '200px', height: '280px' }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '200px 200px 0 0', overflow: 'hidden',
                  border: '4px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <h3 className="font-serif mb-1" style={{ fontSize: '2rem', color: 'var(--cherry-dark)' }}>{p.name}</h3>
              <p className="font-sans mb-4" style={{ fontSize: '11px', letterSpacing: '.25em', color: 'var(--gold-champagne)', textTransform: 'uppercase', fontWeight: 600 }}>{p.role}</p>
              <div className="divider-gold" style={{ width: '40px', margin: '0 auto 1rem' }} />
              <p className="font-serif" style={{ fontSize: '1rem', color: 'var(--text-light)', fontStyle: 'italic', maxWidth: '260px' }}>{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
