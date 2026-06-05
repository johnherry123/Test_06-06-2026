import React from 'react';

export default function Invitation() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-pearl)', textAlign: 'center' }}>
      <div className="fade-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold-champagne)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>

        <h2 className="font-script" style={{ fontSize: '3.5rem', color: 'var(--cherry-dark)', marginBottom: '1.5rem' }}>Lời Ngỏ</h2>
        
        <p className="font-cormorant" style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 2, marginBottom: '2rem' }}>
          "Tình yêu không phải là nhìn chằm chằm vào nhau,<br/>mà là cùng nhau nhìn về một hướng."
        </p>

        <p className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
          Sự hiện diện của Quý vị là niềm vinh hạnh lớn nhất cho gia đình chúng tôi.<br/>
          Cùng nhau, chúng ta sẽ tạo nên một kỷ niệm khó quên trong ngày trọng đại này.
        </p>

        <div className="divider-gold" />

      </div>
    </section>
  );
}
