/*
  RSVP — Reply to the invitation
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  Responding to a wedding invitation. Simple, warm, direct.
  Not a web form. Not a dashboard.
  
  Fields:
  - Tên
  - Điện thoại (optional)
  - Tham dự? (yes/no)
  - Số người (if yes)
  - Lời chúc ngắn
  
  Guestbook: collapsed by default, toggle to view.
  Section bg: warm ivory.
*/
import React, { useState, useEffect } from 'react';
import { COUPLE } from '../weddingData';

const INP = {
  width: '100%',
  padding: '12px 14px',
  backgroundColor: '#FDFBF5',
  border: '1px solid rgba(30,20,16,0.14)',
  fontSize: '0.88rem',
  color: '#1E1410',
  outline: 'none',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  borderRadius: '1px',
  WebkitAppearance: 'none',
  transition: 'border-color 0.2s',
};

const LBL = {
  display: 'block',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontSize: '0.64rem', fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: '#3D3228', marginBottom: '7px',
};

export default function RSVP() {
  const [form, setForm] = useState({
    name: '', phone: '', attend: 'yes', guests: '1', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('wedding_wishes_v2') || '[]'); }
    catch { return []; }
  });
  const [showWishes, setShowWishes] = useState(false);
  const [wishForm, setWishForm]     = useState({ name: '', message: '' });
  const [wishSent, setWishSent]     = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    /* Save wish from RSVP form too */
    if (form.message.trim()) {
      const entry = {
        id: Date.now(),
        name: form.name.trim(),
        message: form.message.trim(),
        attend: form.attend,
        date: new Date().toLocaleDateString('vi-VN'),
      };
      const updated = [entry, ...wishes];
      setWishes(updated);
      try { localStorage.setItem('wedding_wishes_v2', JSON.stringify(updated)); } catch {}
    }
    setSubmitted(true);
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;
    const entry = {
      id: Date.now(),
      name: wishForm.name.trim(),
      message: wishForm.message.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
    };
    const updated = [entry, ...wishes];
    setWishes(updated);
    try { localStorage.setItem('wedding_wishes_v2', JSON.stringify(updated)); } catch {}
    setWishSent(true);
    setWishForm({ name: '', message: '' });
  };

  /* Attend choices */
  const ATTEND = [
    { value: 'yes', label: 'Có, tôi sẽ tham dự 🎉' },
    { value: 'no',  label: 'Rất tiếc, tôi không thể đến' },
  ];

  const guests = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section
      id="rsvp"
      aria-label="Xác nhận tham dự"
      style={{
        backgroundColor: '#FAF6EC',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 5vw, 48px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
            fontStyle: 'italic', color: 'rgba(80,54,16,0.44)',
            marginBottom: '8px',
          }}>
            Sự hiện diện của bạn
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 5vw, 2.8rem)',
            fontWeight: 500, color: '#1A1008',
            lineHeight: 1.10, letterSpacing: '0.01em',
            marginBottom: 'clamp(8px, 1.5vw, 12px)',
          }}>
            là điều quý giá nhất
          </h2>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.76rem, 1.3vw, 0.86rem)',
            color: 'rgba(80,54,16,0.45)',
            lineHeight: 1.7,
          }}>
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName} rất mong được gặp bạn<br />
            trong ngày trọng đại 20 · 10 · 2026.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="rsvp-name" style={LBL}>Họ và tên *</label>
              <input
                id="rsvp-name"
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Tên của bạn"
                required
                style={INP}
                onFocus={e => { e.currentTarget.style.borderColor = '#7C1D21'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.14)'; }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="rsvp-phone" style={LBL}>Số điện thoại</label>
              <input
                id="rsvp-phone"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="Tùy chọn"
                style={INP}
                onFocus={e => { e.currentTarget.style.borderColor = '#7C1D21'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.14)'; }}
              />
            </div>

            {/* Attendance */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ ...LBL, marginBottom: '10px' }}>Bạn có thể đến không? *</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ATTEND.map(opt => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '11px 14px',
                      border: `1px solid ${form.attend === opt.value ? '#7C1D21' : 'rgba(30,20,16,0.14)'}`,
                      backgroundColor: form.attend === opt.value ? 'rgba(124,29,33,0.04)' : '#FDFBF5',
                      cursor: 'pointer',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.86rem', color: '#1E1410',
                      transition: 'all 0.2s',
                      borderRadius: '1px',
                    }}
                  >
                    <input
                      type="radio"
                      name="attend"
                      value={opt.value}
                      checked={form.attend === opt.value}
                      onChange={set('attend')}
                      style={{ accentColor: '#7C1D21', width: '15px', height: '15px' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Guest count — only if attending */}
            {form.attend === 'yes' && (
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="rsvp-guests" style={LBL}>Số người tham dự</label>
                <select
                  id="rsvp-guests"
                  value={form.guests}
                  onChange={set('guests')}
                  style={{
                    ...INP,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B5D52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px',
                  }}
                >
                  {guests.map(n => (
                    <option key={n} value={String(n)}>{n} người</option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="rsvp-message" style={LBL}>Lời chúc</label>
              <textarea
                id="rsvp-message"
                value={form.message}
                onChange={set('message')}
                placeholder="Gửi lời chúc đến đôi uyên ương..."
                rows={3}
                style={{ ...INP, resize: 'vertical', minHeight: '80px', lineHeight: 1.6 }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7C1D21'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.14)'; }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', padding: '14px 24px', fontSize: '0.82rem' }}
            >
              Xác nhận tham dự
            </button>
          </form>
        ) : (
          /* Thank-you */
          <div style={{
            textAlign: 'center',
            padding: 'clamp(32px, 6vw, 48px)',
            border: '1px solid rgba(124,29,33,0.15)',
            backgroundColor: 'rgba(124,29,33,0.025)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
              fontStyle: 'italic', color: '#1A1008',
              marginBottom: '10px', lineHeight: 1.2,
            }}>
              {form.attend === 'yes'
                ? 'Cảm ơn bạn rất nhiều!'
                : 'Cảm ơn đã cho biết.'}
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.82rem', color: 'rgba(80,54,16,0.55)',
              lineHeight: 1.7,
            }}>
              {form.attend === 'yes'
                ? `Chúng mình rất vui khi biết ${form.name} sẽ cùng chúng mình trong ngày trọng đại này.`
                : `Chúng mình sẽ nhớ đến bạn trong ngày cưới.`}
            </p>
          </div>
        )}

        {/* Guestbook toggle */}
        <div style={{ marginTop: 'clamp(28px, 5vw, 40px)', textAlign: 'center' }}>
          <div style={{
            width: '100%', height: '0.5px',
            background: 'rgba(160,120,50,0.20)',
            marginBottom: 'clamp(18px, 3vw, 26px)',
          }} />

          <button
            onClick={() => setShowWishes(s => !s)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.90rem, 1.7vw, 1.05rem)',
              fontStyle: 'italic',
              color: '#7C1D21',
              background: 'transparent', border: 'none',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
          >
            {showWishes ? 'Ẩn lời chúc' : `Xem lời chúc${wishes.length > 0 ? ` (${wishes.length})` : ''}`}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"
              style={{ transform: showWishes ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </button>

          {showWishes && (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              {/* Quick wish form */}
              {!wishSent ? (
                <form onSubmit={handleWish} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="Tên của bạn"
                      value={wishForm.name}
                      onChange={e => setWishForm(f => ({ ...f, name: e.target.value }))}
                      style={{ ...INP, flex: 1 }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Lời chúc..."
                      value={wishForm.message}
                      onChange={e => setWishForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...INP, flex: 1 }}
                    />
                    <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>
                      Gửi
                    </button>
                  </div>
                </form>
              ) : (
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.96rem', fontStyle: 'italic',
                  color: 'rgba(80,54,16,0.55)',
                  marginBottom: '16px',
                }}>Lời chúc của bạn đã được gửi đi ♡</p>
              )}

              {/* Wish list */}
              {wishes.length === 0 ? (
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.90rem', fontStyle: 'italic',
                  color: 'rgba(80,54,16,0.32)', textAlign: 'center', padding: '16px 0',
                }}>
                  Chưa có lời chúc nào. Hãy là người đầu tiên!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto' }}>
                  {wishes.slice(0, 20).map(w => (
                    <div key={w.id} style={{
                      padding: '12px 14px',
                      borderLeft: '2px solid rgba(124,29,33,0.18)',
                      backgroundColor: 'rgba(253,251,245,0.60)',
                    }}>
                      <p style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.80rem', color: '#1A1008',
                        lineHeight: 1.65, marginBottom: '5px',
                      }}>
                        "{w.message}"
                      </p>
                      <p style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.64rem', color: 'rgba(80,54,16,0.40)',
                        letterSpacing: '0.04em',
                      }}>
                        — {w.name} · {w.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
