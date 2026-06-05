import React, { useState } from 'react';

export default function RSVP() {
  const [form, setForm] = useState({ name: '', attend: 'yes', guests: '1', note: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="sec s-ivory" id="rsvp" style={{ textAlign: 'center' }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(139,0,0,.04) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      <div className="wrap-xs fu">
        <span className="eyebrow" style={{ marginBottom: '16px' }}>Xác Nhận Tham Dự</span>
        <h2 className="f-script" style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          color: 'var(--crimson)',
          lineHeight: 1,
          marginBottom: '12px',
        }}>
          Phúc Đáp
        </h2>

        <p className="f-sans" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '.04em', marginBottom: '8px' }}>
          Vui lòng phản hồi trước{' '}
          <strong style={{ color: 'var(--crimson)', fontWeight: 600 }}>10 · 10 · 2026</strong>
        </p>

        <div className="rule-crimson" style={{ width: '50px', margin: '20px auto 44px' }} />

        {sent ? (
          <div style={{
            padding: '64px 32px',
            background: '#fff',
            border: '1px solid rgba(201,168,76,.25)',
            boxShadow: '0 8px 48px rgba(30,20,0,.1)',
          }}>
            {/* Checkmark */}
            <div style={{
              width: '64px', height: '64px',
              borderRadius: '50%',
              border: '2px solid var(--crimson)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              background: 'rgba(139,0,0,.05)',
            }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M2 10 L10 18 L26 2" stroke="var(--crimson)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="f-script" style={{ fontSize: '3rem', color: 'var(--crimson)', marginBottom: '12px' }}>
              Cảm ơn bạn!
            </h3>
            <p className="f-serif" style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.15rem' }}>
              Chúng tôi rất mong được gặp bạn trong ngày vui.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: '#fff',
            padding: 'clamp(28px, 5vw, 48px)',
            border: '1px solid rgba(201,168,76,.2)',
            boxShadow: '0 16px 60px rgba(30,20,0,.1)',
            textAlign: 'left',
          }}>
            {/* Name field */}
            <div style={{ marginBottom: '28px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '10px', display: 'block' }}>
                Tên Khách Mời
              </span>
              <input
                type="text"
                placeholder="Họ và tên đầy đủ"
                required
                className="form-field"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                style={{ borderColor: focused === 'name' ? 'var(--crimson)' : undefined }}
              />
            </div>

            {/* Guests field */}
            <div style={{ marginBottom: '28px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '10px', display: 'block' }}>
                Số Người Tham Dự
              </span>
              <input
                type="number"
                min="1" max="10"
                placeholder="1"
                className="form-field"
                value={form.guests}
                onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                onFocus={() => setFocused('guests')}
                onBlur={() => setFocused('')}
                style={{ borderColor: focused === 'guests' ? 'var(--crimson)' : undefined }}
              />
            </div>

            {/* Attendance toggle */}
            <div style={{ marginBottom: '28px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '10px', display: 'block' }}>
                Xác Nhận
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[['yes', '✓  Có mặt'], ['no', '✕  Vắng mặt']].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, attend: v }))}
                    style={{
                      padding: '12px 16px',
                      border: `1.5px solid ${form.attend === v ? 'var(--crimson)' : 'rgba(139,0,0,.15)'}`,
                      background: form.attend === v ? 'var(--crimson)' : 'transparent',
                      color: form.attend === v ? '#fff' : 'var(--text-muted)',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '.35em',
                      textTransform: 'uppercase',
                      transition: 'all .25s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: '36px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '10px', display: 'block' }}>
                Lời Chúc
              </span>
              <textarea
                rows={3}
                placeholder="Gửi đến cô dâu chú rể…"
                className="form-field"
                style={{
                  resize: 'none',
                  paddingLeft: '4px',
                  borderColor: focused === 'note' ? 'var(--crimson)' : undefined,
                }}
                value={form.note}
                onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                onFocus={() => setFocused('note')}
                onBlur={() => setFocused('')}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '9px' }}>
              <span>Gửi Xác Nhận</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
