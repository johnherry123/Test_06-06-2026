import React from 'react';

export default function Invitation() {
  return (
    <section id="invitation" className="sec s-cream" style={{ textAlign: 'center' }}>
      {/* Top ornament */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, var(--gold), transparent)' }} />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1 L12 7 L18 7 L13.5 11 L15.5 17 L10 13.5 L4.5 17 L6.5 11 L2 7 L8 7 Z" fill="var(--gold)" opacity=".6" />
        </svg>
        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, var(--gold), transparent)' }} />
      </div>

      <div className="wrap-sm fu">
        <span className="eyebrow" style={{ marginBottom: '16px' }}>Lời Ngỏ</span>

        <h2 className="f-script" style={{
          fontSize: 'clamp(3.5rem, 9vw, 6rem)',
          color: 'var(--crimson)',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          Thiệp Mời
        </h2>

        <div className="rule-crimson" style={{ width: '60px', margin: '0 auto 44px' }} />

        {/* Quote */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(201,168,76,.06) 0%, rgba(139,0,0,.04) 100%)',
          border: '1px solid rgba(201,168,76,.2)',
          padding: '36px 40px',
          marginBottom: '40px',
        }}>
          {/* Quote marks */}
          <span style={{
            position: 'absolute', top: '12px', left: '18px',
            fontFamily: 'Georgia, serif', fontSize: '4rem',
            color: 'rgba(201,168,76,.25)', lineHeight: 1,
          }}>"</span>
          <p className="f-serif" style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            lineHeight: 2,
          }}>
            Tình yêu không phải là nhìn nhau,<br />
            mà là cùng nhìn về một hướng.
          </p>
          <span style={{
            position: 'absolute', bottom: '4px', right: '18px',
            fontFamily: 'Georgia, serif', fontSize: '4rem',
            color: 'rgba(201,168,76,.25)', lineHeight: 1,
          }}>"</span>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '0 auto 36px', justifyContent: 'center' }}>
          <div className="rule" style={{ width: '40px', flex: '0 0 40px' }} />
          <span style={{ color: 'var(--gold)', fontSize: '10px' }}>✦</span>
          <div className="rule" style={{ width: '40px', flex: '0 0 40px' }} />
        </div>

        <p className="f-sans" style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 2.2,
          letterSpacing: '.02em',
          marginBottom: '40px',
        }}>
          Sự hiện diện của Quý vị là niềm vinh hạnh lớn nhất<br />
          cho gia đình chúng tôi trong ngày trọng đại này.
        </p>

        {/* Couple name signature */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, var(--gold), transparent)' }} />
          <span className="f-script" style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--crimson)',
            lineHeight: 1,
          }}>
            Đại Nghĩa &amp; Thị Nhung
          </span>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, var(--gold), transparent)' }} />
        </div>

        <span className="eyebrow" style={{ marginTop: '16px', color: 'var(--text-faint)' }}>
          20 · 10 · 2026 · Thứ Ba
        </span>
      </div>
    </section>
  );
}
