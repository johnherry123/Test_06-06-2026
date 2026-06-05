import React from 'react';

export default function Invitation() {
  return (
    <section className="section section--paper" style={{ textAlign: 'center' }}>
      <div className="fade-up" style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Label */}
        <span className="eyebrow" style={{ marginBottom: '1rem', color: 'var(--gold)' }}>Lời Ngỏ</span>

        {/* Title */}
        <h2 className="f-script" style={{
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
          color: 'var(--ruby)', lineHeight: 1, marginBottom: '2.5rem',
        }}>Thiệp Mời</h2>

        {/* Rule */}
        <div className="rule-gold" style={{ width: '120px', margin: '0 auto 4rem' }} />

        {/* Card */}
        <div style={{
          background: '#fff', padding: '4rem 3.5rem',
          border: '1px solid rgba(201,169,110,.18)',
          boxShadow: '0 24px 64px rgba(0,0,0,.06)',
          position: 'relative',
        }}>
          {/* Hairline inner */}
          <div style={{ position: 'absolute', inset: '10px', border: '.5px solid rgba(201,169,110,.12)', pointerEvents: 'none' }} />

          {/* Corners */}
          {[{top:'10px',left:'10px',rot:0},{top:'10px',right:'10px',rot:90},{bottom:'10px',left:'10px',rot:270},{bottom:'10px',right:'10px',rot:180}].map((c,i)=>(
            <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{ position:'absolute', top:c.top, bottom:c.bottom, left:c.left, right:c.right, transform:`rotate(${c.rot}deg)` }}>
              <path d="M1 15L1 1L15 1" stroke="rgba(201,169,110,.5)" strokeWidth="1.2"/>
            </svg>
          ))}

          {/* Quote */}
          <p className="f-cormorant" style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic', color: 'var(--muted)',
            lineHeight: 2, marginBottom: '2.5rem',
            borderLeft: '2px solid rgba(201,169,110,.3)',
            paddingLeft: '1.5rem', textAlign: 'left',
          }}>
            "Tình yêu không phải là nhìn nhau,<br />
            mà là cùng nhìn về một hướng."
          </p>

          <div className="rule-gold" style={{ margin: '0 0 2.5rem' }} />

          <p className="f-serif" style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 2, marginBottom: '2.5rem' }}>
            Sự hiện diện của Quý vị là niềm vinh hạnh lớn nhất<br />
            cho gia đình chúng tôi trong ngày trọng đại này.
          </p>

          {/* Signature */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ flex:1, maxWidth:'70px', height:'1px', background:'linear-gradient(to left,rgba(201,169,110,.5),transparent)' }}/>
            <span className="f-script" style={{ fontSize:'2.2rem', color:'var(--ruby)', lineHeight:1 }}>Đại Nghĩa &amp; Thị Nhung</span>
            <div style={{ flex:1, maxWidth:'70px', height:'1px', background:'linear-gradient(to right,rgba(201,169,110,.5),transparent)' }}/>
          </div>

          <p className="eyebrow" style={{ marginTop: '1.5rem', color: 'var(--gold)' }}>20 · 10 · 2026 · Thứ Ba</p>
        </div>
      </div>
    </section>
  );
}
