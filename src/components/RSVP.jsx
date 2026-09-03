/* ══════════════════════════════════════════════════════════════════════
   RSVP — Part of the Invitation  [REDESIGNED]
   ART DIRECTION: Return to warmth. Intimate, invitation-like.
   Form feels like writing back to the couple, not filling a web form.
   Guestbook: localStorage only — clearly indicated. No fake messages.
══════════════════════════════════════════════════════════════════════ */
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';

const WISH_PRESETS = [
  'Trăm năm hạnh phúc!',
  'Chúc mừng hạnh phúc hai bạn!',
  'Vạn sự như ý, trọn đời bên nhau!',
];

const INPUT_STYLE = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: '#FDFBF5',
  border: '1px solid rgba(30,20,16,0.13)',
  borderRadius: '1px',
  fontSize: '0.90rem',
  color: '#1E1410',
  outline: 'none',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  transition: 'border-color 0.2s ease',
  WebkitAppearance: 'none',
};

const LABEL_STYLE = {
  display: 'block',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: '#3D3228',
  marginBottom: '8px',
};

const SELECT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B5D52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '', phone: '', side: 'Nhà Trai',
    attend: 'yes', guests: '1', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v2');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishInput, setWishInput] = useState({ name: '', side: 'Bạn Bè', message: '' });
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('wedding_wishes_v2', JSON.stringify(wishes)); } catch {}
  }, [wishes]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setIsSubmitted(true);
    if (formData.message.trim()) {
      setWishes(prev => [{
        id: Date.now(), name: formData.name, side: formData.side,
        message: formData.message, time: 'Vừa xong',
      }, ...prev]);
    }
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishInput.name.trim() || !wishInput.message.trim()) return;
    setWishes(prev => [{
      id: Date.now(), name: wishInput.name, side: wishInput.side,
      message: wishInput.message, time: 'Vừa xong',
    }, ...prev]);
    setWishInput({ name: '', side: 'Bạn Bè', message: '' });
    setWishSubmitted(true);
    setTimeout(() => setWishSubmitted(false), 3000);
  };

  const focusBorder = e => { e.target.style.borderColor = '#7C1D21'; };
  const blurBorder  = e => { e.target.style.borderColor = 'rgba(30,20,16,0.13)'; };

  return (
    <section
      id="rsvp"
      aria-label="Xác nhận tham dự và lời chúc"
      style={{
        padding: 'clamp(84px, 13vw, 116px) clamp(24px, 5vw, 48px)',
        backgroundColor: '#F5EFE3',
        position: 'relative',
      }}
    >
      {/* Subtle warm texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.016'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '220px 220px',
      }} />

      <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(40px, 6.5vw, 56px)' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
            fontWeight: 500, color: '#1E1410',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: 'clamp(12px, 2.2vw, 18px)',
          }}>
            Bạn sẽ đến<br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#7C1D21' }}>
              cùng vui chứ?
            </span>
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.02rem, 1.9vw, 1.22rem)',
            fontStyle: 'italic', color: '#6B5D52',
            lineHeight: 1.82, marginBottom: '10px',
          }}>
            Sự hiện diện của bạn là món quà ý nghĩa nhất với chúng mình.
          </p>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.66rem',
            color: 'rgba(107,93,82,0.48)',
            fontStyle: 'italic', lineHeight: 1.6,
          }}>
            ✶ Xác nhận được lưu trên thiết bị của bạn. Vui lòng liên hệ trực tiếp để xác nhận chính thức.
          </p>
        </div>

        {/* RSVP Form / Success */}
        {isSubmitted ? (
          <div style={{
            textAlign: 'center',
            padding: 'clamp(36px, 6.5vw, 60px) clamp(22px, 4vw, 38px)',
            backgroundColor: '#FDFBF5',
            border: '1px solid rgba(30,20,16,0.07)',
          }}>
            <div style={{
              width: '50px', height: '50px',
              margin: '0 auto clamp(18px, 3vw, 26px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: 'rgba(124,29,33,0.06)',
              border: '1px solid rgba(124,29,33,0.12)',
            }}>
              <Heart size={22} color="#7C1D21" fill="rgba(124,29,33,0.14)" />
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.65rem, 3.2vw, 2.1rem)',
              fontWeight: 500, color: '#1E1410',
              marginBottom: 'clamp(9px, 1.8vw, 14px)',
              letterSpacing: '-0.01em',
            }}>Cảm ơn, {formData.name}!</h3>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.02rem, 1.8vw, 1.18rem)',
              fontStyle: 'italic', color: '#3D3228',
              lineHeight: 1.80,
              marginBottom: formData.attend !== 'no' ? 'clamp(5px, 1vw, 9px)' : 'clamp(22px, 3.8vw, 30px)',
            }}>
              {formData.attend === 'no'
                ? 'Chúng mình rất tiếc khi không được gặp bạn. Tình cảm của bạn luôn ở đây.'
                : 'Gia đình rất vui khi được đón tiếp bạn vào ngày 20.10.2026.'}
            </p>

            {formData.attend !== 'no' && (
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.76rem', color: '#9E8E82',
                marginBottom: 'clamp(22px, 3.8vw, 30px)',
                letterSpacing: '0.02em',
              }}>
                Gem Center · Sảnh Castor · 17:30
              </p>
            )}

            <button onClick={() => setIsSubmitted(false)} className="btn-secondary">
              Gửi lại
            </button>
          </div>
        ) : (
          <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>

            {/* Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Họ và Tên *</label>
                <input
                  type="text" required placeholder="Tên của bạn"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={INPUT_STYLE}
                  onFocus={focusBorder} onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Điện thoại</label>
                <input
                  type="tel" placeholder="0901 234 567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={INPUT_STYLE}
                  onFocus={focusBorder} onBlur={blurBorder}
                />
              </div>
            </div>

            {/* Side — radio chips */}
            <div>
              <label style={LABEL_STYLE}>Khách mời của</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Nhà Trai', 'Nhà Gái', 'Bạn Chung'].map(side => (
                  <label
                    key={side}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '9px 16px',
                      border: `1px solid ${formData.side === side ? '#7C1D21' : 'rgba(30,20,16,0.13)'}`,
                      backgroundColor: formData.side === side ? 'rgba(124,29,33,0.05)' : 'transparent',
                      borderRadius: '1px', cursor: 'pointer',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.84rem',
                      color: formData.side === side ? '#7C1D21' : '#3D3228',
                      fontWeight: formData.side === side ? 600 : 400,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio" name="rsvp-side"
                      checked={formData.side === side}
                      onChange={() => setFormData({ ...formData, side })}
                      style={{ accentColor: '#7C1D21', width: '14px', height: '14px' }}
                    />
                    {side}
                  </label>
                ))}
              </div>
            </div>

            {/* Attend + Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
              <div>
                <label style={LABEL_STYLE}>Tham dự</label>
                <select
                  value={formData.attend}
                  onChange={e => setFormData({ ...formData, attend: e.target.value })}
                  style={{
                    ...INPUT_STYLE,
                    backgroundImage: SELECT_BG,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px', cursor: 'pointer',
                  }}
                  onFocus={focusBorder} onBlur={blurBorder}
                >
                  <option value="yes">Chắc chắn tham dự</option>
                  <option value="maybe">Có thể tham dự</option>
                  <option value="no">Rất tiếc không thể</option>
                </select>
              </div>
              <div>
                <label style={LABEL_STYLE}>Số người</label>
                <select
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    ...INPUT_STYLE,
                    backgroundImage: SELECT_BG,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px', cursor: 'pointer',
                  }}
                  onFocus={focusBorder} onBlur={blurBorder}
                >
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4+">4 người trở lên</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={LABEL_STYLE}>Lời chúc phúc</label>
              <textarea
                rows={3}
                placeholder="Gửi lời chúc yêu thương của bạn..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{ ...INPUT_STYLE, resize: 'none' }}
                onFocus={focusBorder} onBlur={blurBorder}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', justifyContent: 'center' }}>
              Gửi xác nhận
            </button>
          </form>
        )}

        {/* Separator */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(176,140,78,0.35) 30%, rgba(176,140,78,0.35) 70%, transparent)',
          margin: 'clamp(44px, 7vw, 68px) 0 clamp(30px, 5vw, 44px)',
        }} />

        {/* Guestbook */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 'clamp(22px, 3.8vw, 34px)',
            flexWrap: 'wrap', gap: '10px',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.38rem, 2.8vw, 1.85rem)',
              fontWeight: 500, color: '#1E1410',
              lineHeight: 1.15, margin: 0,
            }}>
              Lời Chúc
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontWeight: 400,
                color: '#B08C4E', marginLeft: '10px',
              }}>&amp; Kỷ Niệm</span>
            </h3>
            {wishes.length > 0 && (
              <button
                onClick={() => setShowGuestbook(!showGuestbook)}
                style={{
                  background: 'transparent', border: 'none',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.72rem', fontWeight: 500,
                  color: '#7C1D21', cursor: 'pointer',
                  letterSpacing: '0.04em',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                {showGuestbook ? 'Ẩn' : `Xem ${wishes.length} lời chúc`}
              </button>
            )}
          </div>

          {/* Write wish */}
          <div style={{
            padding: 'clamp(18px, 3.2vw, 28px)',
            backgroundColor: '#FDFBF5',
            border: '1px solid rgba(30,20,16,0.07)',
            marginBottom: 'clamp(18px, 3vw, 26px)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.98rem, 1.7vw, 1.12rem)',
              fontStyle: 'italic', color: '#3D3228',
              marginBottom: '14px',
            }}>Để lại lời chúc phúc gửi đến đôi bạn...</p>

            {/* Quick presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '14px' }}>
              {WISH_PRESETS.map((preset, i) => (
                <button
                  key={i} type="button"
                  onClick={() => setWishInput(prev => ({ ...prev, message: preset }))}
                  style={{
                    fontSize: '0.76rem', padding: '5px 12px',
                    background: 'transparent',
                    border: '1px solid rgba(30,20,16,0.13)',
                    borderRadius: '1px', color: '#6B5D52',
                    cursor: 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#7C1D21'; e.currentTarget.style.color = '#7C1D21'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.13)'; e.currentTarget.style.color = '#6B5D52'; }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {wishSubmitted ? (
              <div style={{ textAlign: 'center', padding: '14px 0', color: '#7C1D21' }}>
                <CheckCircle2 size={18} style={{ display: 'inline-block', marginRight: '7px', verticalAlign: 'middle' }} />
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.86rem' }}>
                  Cảm ơn lời chúc của bạn!
                </span>
              </div>
            ) : (
              <form onSubmit={handleWishSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text" required placeholder="Tên của bạn"
                    value={wishInput.name}
                    onChange={e => setWishInput({ ...wishInput, name: e.target.value })}
                    style={INPUT_STYLE}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                  <select
                    value={wishInput.side}
                    onChange={e => setWishInput({ ...wishInput, side: e.target.value })}
                    style={{
                      ...INPUT_STYLE,
                      backgroundImage: SELECT_BG,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: '36px', cursor: 'pointer',
                    }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  >
                    <option value="Bạn Chú Rể">Bạn Chú Rể</option>
                    <option value="Bạn Cô Dâu">Bạn Cô Dâu</option>
                    <option value="Gia Đình">Gia Đình</option>
                    <option value="Bạn Bè">Bạn Bè</option>
                  </select>
                </div>
                <textarea
                  rows={2} required
                  placeholder="Viết lời chúc phúc..."
                  value={wishInput.message}
                  onChange={e => setWishInput({ ...wishInput, message: e.target.value })}
                  style={{ ...INPUT_STYLE, resize: 'none' }}
                  onFocus={focusBorder} onBlur={blurBorder}
                />
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '11px 22px' }}>
                  Gửi lời chúc
                </button>
              </form>
            )}
          </div>

          {/* Wishes list */}
          {showGuestbook && wishes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {wishes.map(w => (
                <div key={w.id} style={{
                  padding: 'clamp(14px, 2.2vw, 20px)',
                  borderBottom: '1px solid rgba(30,20,16,0.07)',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '7px',
                  }}>
                    <div>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.94rem', fontWeight: 500,
                        color: '#1E1410', marginRight: '8px',
                      }}>{w.name}</span>
                      <span style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.66rem', fontWeight: 500,
                        color: '#7C1D21', letterSpacing: '0.04em',
                      }}>{w.side}</span>
                    </div>
                    <span style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.68rem', color: '#9E8E82',
                    }}>{w.time}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(0.98rem, 1.7vw, 1.08rem)',
                    fontStyle: 'italic', color: '#3D3228',
                    lineHeight: 1.72, margin: 0,
                  }}>"{w.message}"</p>
                </div>
              ))}
            </div>
          )}

          {wishes.length === 0 && (
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.98rem', fontStyle: 'italic',
              color: '#9E8E82', textAlign: 'center', paddingTop: '8px',
            }}>
              Hãy là người đầu tiên gửi lời chúc phúc.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
