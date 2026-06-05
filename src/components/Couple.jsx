import React from 'react';

export default function Couple() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-cream)' }}>
      <div className="fade-up" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="font-script" style={{ fontSize: '4rem', color: 'var(--cherry-dark)', margin: 0 }}>Chú Rể & Cô Dâu</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Groom */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '200px', height: '280px', margin: '0 auto 2rem',
              borderRadius: '200px 200px 0 0', overflow: 'hidden',
              border: '4px solid var(--bg-pearl)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" alt="Groom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--cherry-dark)', marginBottom: '0.5rem' }}>Đại Nghĩa</h3>
            <p className="font-sans" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold-champagne)', textTransform: 'uppercase', marginBottom: '1rem' }}>Trưởng Nam</p>
            <p className="font-serif" style={{ fontSize: '1rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Một chàng trai điềm đạm, ấm áp, luôn là chỗ dựa vững chắc.</p>
          </div>

          {/* Bride */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '200px', height: '280px', margin: '0 auto 2rem',
              borderRadius: '200px 200px 0 0', overflow: 'hidden',
              border: '4px solid var(--bg-pearl)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Bride" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--cherry-dark)', marginBottom: '0.5rem' }}>Thị Nhung</h3>
            <p className="font-sans" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold-champagne)', textTransform: 'uppercase', marginBottom: '1rem' }}>Út Nữ</p>
            <p className="font-serif" style={{ fontSize: '1rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Một cô gái dịu dàng, tinh tế, luôn mang đến nụ cười rạng rỡ.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
