import { useState } from 'react';
import { COUPLE, WEDDING } from '../weddingData';
import { Heart, Send, CheckCircle, MessageSquare, Ticket, QrCode, Sparkles, Download, Share2 } from 'lucide-react';

const QUICK_WISHES = [
  '🥂 Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!',
  '💖 Chúc tổ ấm nhỏ luôn ngập tràn tiếng cười và yêu thương!',
  '🌟 Chúc Nghĩa & Nhung mãi ngọt ngào, cùng nhau xây đắp tương lai rực rỡ!',
  '🎉 Chúc mừng ngày vui! Hẹn gặp hai bạn tại Gem Center!',
];

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attend: 'yes',
    guests: '1',
    diet: 'all',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v4');
      if (saved) return JSON.parse(saved);
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
          message: 'Mừng cho đôi bạn trẻ! Chúc Đại Nghĩa & Trịnh Nhung luôn ngọt ngào như ngày đầu mới yêu nhé!',
          date: 'Hôm qua',
        },
        {
          id: 3,
          name: 'Anh chị Hoàng & Ly',
          message: 'Hẹn gặp hai em tại Gem Center ngày 20.10 nhé. Chúc hai em có một đêm tiệc thật thăng hoa!',
          date: '2 ngày trước',
        },
      ];
    } catch {
      return [];
    }
  });

  const [showWishes, setShowWishes] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const randomId = 'VIP-' + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(randomId);

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
        localStorage.setItem('wedding_wishes_v4', JSON.stringify(updated));
      } catch {}
    }

    setSubmitted(true);
  };

  const addQuickWish = (text) => {
    setForm((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message} ${text}` : text,
    }));
  };

  return (
    <section
      id="rsvp"
      aria-label="Xác nhận tham dự và nhận vé mời VIP điện tử"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5ECE0 50%, #FAF7F2 100%)',
        padding: 'clamp(60px, 9vw, 100px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '740px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Ticket size={13} color="#C5A059" />
            Hồi Đáp &amp; Nhận Vé VIP
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Xác Nhận Tham Dự
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            “Để chúng mình chuẩn bị đón tiếp chu đáo và gửi tặng Quý khách Tấm Vé VIP mang tên bạn, xin vui lòng gửi phản hồi trước ngày 10.10.2026.”
          </p>
        </div>

        {/* ── CARD WRAPPER ── */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid #C5A059',
            boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.12)',
            padding: 'clamp(24px, 5vw, 44px) clamp(18px, 4vw, 36px)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {!submitted ? (
            /* ── RSVP FORM ── */
            <form onSubmit={handleSubmit} noValidate style={{ width: '100%', boxSizing: 'border-box' }}>
              {/* Name */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="rsvp-name"
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 700,
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
                  placeholder="Ví dụ: Nguyễn Văn A &amp; Người thương"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    background: '#FAF7F2',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1E1612',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Phone & Guests Count Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
                  gap: '16px',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <label
                    htmlFor="rsvp-phone"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#2C221C',
                      marginBottom: '6px',
                    }}
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    placeholder="Để ban tổ chức hỗ trợ khi đón tiếp"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(197, 160, 89, 0.4)',
                      background: '#FAF7F2',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      color: '#1E1612',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="rsvp-guests"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#2C221C',
                      marginBottom: '6px',
                    }}
                  >
                    Số lượng khách đi cùng
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(197, 160, 89, 0.4)',
                      background: '#FAF7F2',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      color: '#1E1612',
                      outline: 'none',
                    }}
                  >
                    <option value="1">1 người (Đi một mình)</option>
                    <option value="2">2 người (Đi cùng người thương)</option>
                    <option value="3">3 người (Gia đình)</option>
                    <option value="4">4 người trở lên</option>
                  </select>
                </div>
              </div>

              {/* Attendance Choice */}
              <div style={{ marginBottom: '18px' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 700,
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
                      padding: '12px 10px',
                      borderRadius: '12px',
                      border: form.attend === 'yes' ? '2px solid #801D24' : '1px solid rgba(197, 160, 89, 0.35)',
                      backgroundColor: form.attend === 'yes' ? 'rgba(128, 29, 36, 0.08)' : '#FAF7F2',
                      color: form.attend === 'yes' ? '#801D24' : '#584A42',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: form.attend === 'yes' ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {form.attend === 'yes' ? '✓ Chắc chắn tham dự' : 'Chắc chắn tham dự'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, attend: 'no' })}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '12px',
                      border: form.attend === 'no' ? '2px solid #801D24' : '1px solid rgba(197, 160, 89, 0.35)',
                      backgroundColor: form.attend === 'no' ? 'rgba(128, 29, 36, 0.08)' : '#FAF7F2',
                      color: form.attend === 'no' ? '#801D24' : '#584A42',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: form.attend === 'no' ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {form.attend === 'no' ? '✓ Tiếc là không thể đến' : 'Tiếc là không thể đến'}
                  </button>
                </div>
              </div>

              {/* Message & Quick Wishes */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  htmlFor="rsvp-message"
                  style={{
                    display: 'block',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 700,
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
                    boxSizing: 'border-box',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    background: '#FAF7F2',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1E1612',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '8px',
                  }}
                />

                {/* Quick Wish Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {QUICK_WISHES.map((w, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addQuickWish(w)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: '#FAF5EE',
                        border: '1px dashed rgba(197, 160, 89, 0.45)',
                        color: '#801D24',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.68rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-luxury btn-luxury-primary"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Send size={16} />
                <span>Xác Nhận &amp; Xuất Tấm Vé VIP Danh Dự</span>
              </button>
            </form>
          ) : (
            /* ── PERSONALIZED LUXURY VIP E-TICKET PASS ── */
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(46, 125, 50, 0.10)',
                  color: '#2E7D32',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                <CheckCircle size={15} />
                <span>Xác Nhận Thành Công! Tấm Vé Của Bạn Đã Sẵn Sàng</span>
              </div>

              {/* The Realistic Luxury Boarding / VIP Ticket */}
              <div
                id="wedding-vip-pass"
                style={{
                  backgroundColor: '#FFFDF9',
                  borderRadius: '20px',
                  border: '2px solid #C5A059',
                  boxShadow: '0 16px 40px -8px rgba(128, 29, 36, 0.25)',
                  overflow: 'hidden',
                  position: 'relative',
                  textAlign: 'left',
                  margin: '0 auto 20px auto',
                  maxWidth: '520px',
                }}
              >
                {/* Gold Top Header Ribbon */}
                <div
                  style={{
                    backgroundColor: '#801D24',
                    color: '#FFF2D4',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.66rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#E6CA85',
                      }}
                    >
                      ✦ VIP Wedding Pass · Vé Mời Danh Dự ✦
                    </span>
                    <h4
                      style={{
                        fontFamily: "'Alex Brush', cursive",
                        fontSize: '1.6rem',
                        color: '#FFFDF9',
                        margin: '2px 0 0 0',
                        fontWeight: 400,
                      }}
                    >
                      Đại Nghĩa &amp; Trịnh Nhung
                    </h4>
                  </div>

                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.80rem',
                      fontWeight: 700,
                      color: '#FFE4A0',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {ticketNumber}
                  </span>
                </div>

                {/* Ticket Body */}
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.66rem',
                        textTransform: 'uppercase',
                        color: '#7C6E66',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                      }}
                    >
                      Kính Mời Quý Khách
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#801D24',
                        margin: '2px 0 0 0',
                      }}
                    >
                      {form.name}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      padding: '12px 0',
                      borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
                      borderBottom: '1px dashed rgba(197, 160, 89, 0.35)',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.64rem', color: '#7C6E66', fontFamily: "'Be Vietnam Pro', sans-serif", textTransform: 'uppercase' }}>
                        Thời Gian
                      </span>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: '#1E1612' }}>
                        17:30 · 20.10.2026
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.64rem', color: '#7C6E66', fontFamily: "'Be Vietnam Pro', sans-serif", textTransform: 'uppercase' }}>
                        Địa Điểm
                      </span>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: '#1E1612' }}>
                        Castor Hall · Gem Center
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.64rem', color: '#7C6E66', fontFamily: "'Be Vietnam Pro', sans-serif", textTransform: 'uppercase' }}>
                        Số Lượng
                      </span>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: '#801D24' }}>
                        {form.guests} Khách Quý
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.64rem', color: '#7C6E66', fontFamily: "'Be Vietnam Pro', sans-serif", textTransform: 'uppercase' }}>
                        Trạng Thái
                      </span>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: '#2E7D32' }}>
                        Đã Xác Nhận ✓
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.68rem', color: '#9A7836', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                      * Xin vui lòng giữ vé để check-in nhận quà lưu niệm tại cổng sảnh tiệc.
                    </span>
                    <QrCode size={36} color="#801D24" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => alert('Mẹo: Bạn có thể nhấn Chụp màn hình (Screenshot) trên điện thoại để lưu vé vào Thư viện ảnh nhé!')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    backgroundColor: '#801D24',
                    color: '#FFF2D4',
                    border: 'none',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} />
                  <span>Lưu Tấm Vé VIP Này</span>
                </button>

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
                  }}
                >
                  Chỉnh sửa phản hồi
                </button>
              </div>
            </div>
          )}

          {/* ── LIVE WISHING WALL (BỨC TƯỜNG LỜI CHÚC) ── */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} color="#801D24" />
                <h4
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#1E1612',
                    margin: 0,
                  }}
                >
                  Sổ Lưu Bút &amp; Lời Chúc Hạnh Phúc ({wishes.length})
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setShowWishes(!showWishes)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9A7836',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {showWishes ? 'Thu gọn' : 'Mở rộng'}
              </button>
            </div>

            {showWishes && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  textAlign: 'left',
                }}
              >
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
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
                      <span style={{ fontSize: '0.66rem', color: '#A59890' }}>{w.date}</span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: '#42332A',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      “{w.message}”
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
