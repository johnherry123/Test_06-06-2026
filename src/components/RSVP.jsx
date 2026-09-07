import { useState } from 'react';
import { COUPLE, WEDDING } from '../weddingData';
import { Heart, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attend: 'yes',
    guests: '1',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v3');
      if (saved) return JSON.parse(saved);
      // Default sample sweet wishes
      return [
        {
          id: 1,
          name: 'Gia đình Bác Thành',
          message: 'Chúc hai cháu trăm năm tình viên mãn, đầu bạc răng long, mãi mãi hạnh phúc bên nhau!',
          date: 'Hôm nay',
        },
        {
          id: 2,
          name: 'Nhóm bạn thân Đại học',
          message: 'Mừng cho đôi bạn trẻ! Chúc Nghĩa & Nhung luôn ngọt ngào như ngày đầu mới yêu nhé!',
          date: 'Hôm qua',
        },
      ];
    } catch {
      return [];
    }
  });

  const [showWishes, setShowWishes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (form.message.trim()) {
      const newEntry = {
        id: Date.now(),
        name: form.name.trim(),
        message: form.message.trim(),
        date: 'Vừa xong',
      };
      const updated = [newEntry, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem('wedding_wishes_v3', JSON.stringify(updated));
      } catch {}
    }

    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      aria-label="Xác nhận tham dự và gửi lời chúc"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #F5EDE0 0%, #FAF7F2 100%)',
        padding: 'clamp(70px, 10vw, 110px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 54px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Heart size={13} fill="currentColor" />
            Hồi Đáp Thiệp Cưới
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.8rem, 6.5vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.1,
              margin: '0 0 8px 0',
              fontWeight: 400,
            }}
          >
            Xác Nhận Tham Dự
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
            }}
          >
            Để chúng mình chuẩn bị đón tiếp chu đáo nhất, xin vui lòng gửi phản hồi trước ngày 10.10.2026
          </p>
        </div>

        {/* ── LUXURY RSVP FORM CARD ── */}
        <div
          className="gsap-reveal stationery-card"
          style={{
            borderRadius: '20px',
            padding: 'clamp(28px, 6vw, 48px) clamp(22px, 5vw, 40px)',
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="rsvp-name"
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#2C221C',
                    marginBottom: '6px',
                  }}
                >
                  Họ và tên của bạn *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A & Người thương"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    background: '#FFFFFF',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1E1612',
                    outline: 'none',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#801D24';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128, 29, 36, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="rsvp-phone"
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#2C221C',
                    marginBottom: '6px',
                  }}
                >
                  Số điện thoại (tùy chọn)
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  placeholder="Để ban tổ chức hỗ trợ khi cần"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    background: '#FFFFFF',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1E1612',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#801D24';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
                  }}
                />
              </div>

              {/* Attendance Choice */}
              <div style={{ marginBottom: '18px' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#2C221C',
                    marginBottom: '8px',
                  }}
                >
                  Bạn sẽ đến chung vui chứ? *
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, attend: 'yes' })}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '10px',
                      border: form.attend === 'yes' ? '2px solid #801D24' : '1px solid rgba(197, 160, 89, 0.35)',
                      backgroundColor: form.attend === 'yes' ? 'rgba(128, 29, 36, 0.08)' : '#FFFFFF',
                      color: form.attend === 'yes' ? '#801D24' : '#584A42',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}
                  >
                    🎉 Chắc chắn tham dự
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, attend: 'no' })}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '10px',
                      border: form.attend === 'no' ? '2px solid #801D24' : '1px solid rgba(197, 160, 89, 0.35)',
                      backgroundColor: form.attend === 'no' ? 'rgba(128, 29, 36, 0.08)' : '#FFFFFF',
                      color: form.attend === 'no' ? '#801D24' : '#584A42',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}
                  >
                    💌 Rất tiếc không thể đến
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {form.attend === 'yes' && (
                <div style={{ marginBottom: '18px' }}>
                  <label
                    htmlFor="rsvp-guests"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#2C221C',
                      marginBottom: '6px',
                    }}
                  >
                    Số lượng khách tham dự
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(197, 160, 89, 0.4)',
                      background: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      color: '#1E1612',
                      outline: 'none',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} người ({n === 1 ? 'Đi một mình' : `Đi cùng ${n - 1} người`})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Heartfelt Wish */}
              <div style={{ marginBottom: '26px' }}>
                <label
                  htmlFor="rsvp-message"
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#2C221C',
                    marginBottom: '6px',
                  }}
                >
                  Lời chúc gửi đến đôi uyên ương
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  placeholder="Gửi gắm những lời chúc phúc ngọt ngào..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    background: '#FFFFFF',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1E1612',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#801D24';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-luxury btn-luxury-primary"
                style={{ width: '100%', padding: '16px', fontSize: '0.86rem' }}
              >
                <Send size={16} />
                Gửi Lời Hồi Đáp
              </button>
            </form>
          ) : (
            /* Thank You Card */
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <CheckCircle size={56} color="#801D24" style={{ margin: '0 auto 16px auto' }} />

              <h3
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: '2.8rem',
                  color: '#801D24',
                  margin: '0 0 8px 0',
                }}
              >
                Cảm Ơn Bạn Rất Nhiều!
              </h3>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: '#2C221C',
                  marginBottom: '14px',
                  lineHeight: 1.5,
                }}
              >
                {form.attend === 'yes'
                  ? `Chúng mình vô cùng hạnh phúc khi biết ${form.name} sẽ cùng đến chung vui trong ngày trọng đại!`
                  : `Chúng mình đã nhận được lời nhắn từ ${form.name} và luôn trân trọng tình cảm của bạn!`}
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9A7836',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Chỉnh sửa lại phản hồi
              </button>
            </div>
          )}

          {/* Guestbook Wishes Toggle */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
              textAlign: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setShowWishes(!showWishes)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.80rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageSquare size={16} />
              {showWishes ? 'Thu gọn sổ lưu bút' : `Xem sổ lưu bút (${wishes.length} lời chúc)`}
            </button>

            {/* Wishes Feed */}
            {showWishes && (
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxHeight: '360px',
                  overflowY: 'auto',
                  textAlign: 'left',
                }}
              >
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      boxShadow: '0 2px 8px rgba(50, 30, 15, 0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#801D24',
                        }}
                      >
                        {w.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#A59890' }}>{w.date}</span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: '#4A3B32',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
