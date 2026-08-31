/* ══════════════════════════════════════════════════════════════════════
   RSVP — Vietnamese Editorial Wedding
   Removed: eyebrow-luxury, divider-luxury 囍, gold-frame, glassmorphism,
            btn-luxury-crimson / btn-luxury-gold classes.
   Design: Clean warm form. Burgundy for primary action. Simple typography.
   Preserved: RSVP form, guestbook tab, localStorage persistence, presets.
══════════════════════════════════════════════════════════════════════ */
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';

const INITIAL_WISHES = [
  {
    id: 1,
    name: 'Gia đình Bác Hai',
    side: 'Nhà Trai',
    message: 'Chúc hai cháu Đại Nghĩa & Thị Nhung trăm năm hạnh phúc, răng long đầu bạc, vạn sự như ý!',
    time: 'Vừa xong',
  },
  {
    id: 2,
    name: 'Thu Trang & Minh Hoàng',
    side: 'Bạn Cô Dâu',
    message: 'Chúc mừng cô dâu xinh đẹp nhất trần đời! Chúc hai bạn luôn ngập tràn tiếng cười và tình yêu!',
    time: '1 giờ trước',
  },
  {
    id: 3,
    name: 'Nhóm Bạn Cấp 3',
    side: 'Bạn Chú Rể',
    message: 'Cuối cùng anh Nghĩa cũng rước được nàng về dinh! Chúc mừng hạnh phúc hai bạn nhé!',
    time: '3 giờ trước',
  },
];

const WISH_PRESETS = [
  'Trăm năm hạnh phúc! 💍',
  'Chúc mừng hạnh phúc hai bạn! 🎉',
  'Chúc đôi uyên ương sớm sinh quý tử! 👶',
  'Vạn sự như ý, trọn đời bên nhau! ❤️',
];

/* Shared input style */
const INPUT = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#FDFBF7',
  border: '1px solid rgba(35,27,21,0.15)',
  borderRadius: '2px',
  fontSize: '0.92rem',
  color: '#231B15',
  outline: 'none',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  transition: 'border-color 0.2s ease',
};
const LABEL = {
  display: 'block',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontSize: '0.76rem',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#4A3F38',
  marginBottom: '7px',
};

export default function RSVP() {
  const [activeTab, setActiveTab] = useState('rsvp');

  const [formData, setFormData] = useState({
    name: '', phone: '', side: 'Nhà Trai',
    attend: 'yes', guests: '1', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_db');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch { return INITIAL_WISHES; }
  });

  const [wishInput, setWishInput] = useState({ name: '', side: 'Bạn Bè', message: '' });

  useEffect(() => {
    try { localStorage.setItem('wedding_wishes_db', JSON.stringify(wishes)); } catch {}
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
  };

  /* Tab button style */
  const tabStyle = (isActive) => ({
    padding: '10px 24px',
    fontFamily: "'Be Vietnam Pro', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #8B1E22' : '2px solid transparent',
    color: isActive ? '#8B1E22' : '#756B63',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '-1px',
  });

  return (
    <section
      id="rsvp"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#FDFBF7',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(36px, 5vw, 52px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Phúc Đáp
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            RSVP
          </h2>
          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.15rem',
              fontStyle: 'italic',
              color: '#4A3F38',
            }}
          >
            Bạn sẽ đến chung vui cùng chúng mình chứ?
          </p>
        </div>

        {/* Tab navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(35,27,21,0.1)',
          marginBottom: '36px',
        }}>
          <button onClick={() => setActiveTab('rsvp')} style={tabStyle(activeTab === 'rsvp')}>
            Xác nhận tham dự
          </button>
          <button onClick={() => setActiveTab('wishes')} style={tabStyle(activeTab === 'wishes')}>
            Sổ lưu bút ({wishes.length})
          </button>
        </div>

        {/* RSVP Form */}
        {activeTab === 'rsvp' && (
          isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={40} color="#8B1E22" style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.6rem',
                fontWeight: 500,
                color: '#231B15',
                marginBottom: '12px',
              }}>
                Cảm ơn, {formData.name}!
              </h3>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: '#4A3F38',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}>
                Gia đình chúng tôi rất vinh hạnh được đón tiếp bạn<br />vào ngày 20.10.2026.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary"
              >
                Gửi lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={LABEL}>Họ và Tên *</label>
                  <input
                    type="text" required placeholder="Nguyễn Văn An"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={INPUT}
                    onFocus={e => { e.target.style.borderColor = '#8B1E22'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(35,27,21,0.15)'; }}
                  />
                </div>
                <div>
                  <label style={LABEL}>Số điện thoại</label>
                  <input
                    type="tel" placeholder="0901 234 567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={INPUT}
                    onFocus={e => { e.target.style.borderColor = '#8B1E22'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(35,27,21,0.15)'; }}
                  />
                </div>
              </div>

              {/* Side */}
              <div>
                <label style={LABEL}>Bạn là khách mời của</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Nhà Trai', 'Nhà Gái', 'Bạn Chung'].map(side => (
                    <label
                      key={side}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '9px 16px',
                        border: `1px solid ${formData.side === side ? '#8B1E22' : 'rgba(35,27,21,0.15)'}`,
                        backgroundColor: formData.side === side ? 'rgba(139,30,34,0.06)' : 'transparent',
                        borderRadius: '2px', cursor: 'pointer',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.86rem',
                        color: formData.side === side ? '#8B1E22' : '#4A3F38',
                        fontWeight: formData.side === side ? 600 : 400,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="radio" name="side"
                        checked={formData.side === side}
                        onChange={() => setFormData({ ...formData, side })}
                        style={{ accentColor: '#8B1E22', width: '14px', height: '14px' }}
                      />
                      {side}
                    </label>
                  ))}
                </div>
              </div>

              {/* Attend + Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={LABEL}>Xác nhận tham dự</label>
                  <select
                    value={formData.attend}
                    onChange={e => setFormData({ ...formData, attend: e.target.value })}
                    className="form-input"
                    style={INPUT}
                  >
                    <option value="yes">Chắc chắn tham dự</option>
                    <option value="maybe">Có thể tham dự</option>
                    <option value="no">Rất tiếc không thể</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL}>Số người đi cùng</label>
                  <select
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                    style={INPUT}
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
                <label style={LABEL}>Lời chúc gửi đến đôi uyên ương</label>
                <textarea
                  rows={3}
                  placeholder="Gửi lời chúc phúc yêu thương của bạn..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...INPUT, resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = '#8B1E22'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(35,27,21,0.15)'; }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', justifyContent: 'center' }}>
                <Send size={15} />
                Gửi xác nhận
              </button>
            </form>
          )
        )}

        {/* Guestbook */}
        {activeTab === 'wishes' && (
          <div>
            {/* Write wish */}
            <div style={{
              padding: 'clamp(20px, 3vw, 28px)',
              backgroundColor: '#F8F4EC',
              border: '1px solid rgba(35,27,21,0.1)',
              borderRadius: '2px',
              marginBottom: '28px',
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                color: '#231B15',
                marginBottom: '12px',
                fontWeight: 500,
              }}>
                Để lại lời chúc phúc
              </p>

              {/* Preset chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {WISH_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setWishInput(prev => ({ ...prev, message: preset }))}
                    style={{
                      fontSize: '0.78rem',
                      padding: '5px 12px',
                      background: 'transparent',
                      border: '1px solid rgba(35,27,21,0.15)',
                      borderRadius: '2px',
                      color: '#756B63',
                      cursor: 'pointer',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#8B1E22'; e.currentTarget.style.color = '#8B1E22'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(35,27,21,0.15)'; e.currentTarget.style.color = '#756B63'; }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <form onSubmit={handleWishSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="text" required placeholder="Tên của bạn"
                    value={wishInput.name}
                    onChange={e => setWishInput({ ...wishInput, name: e.target.value })}
                    style={{ ...INPUT, backgroundColor: '#FDFBF7' }}
                    onFocus={e => { e.target.style.borderColor = '#8B1E22'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(35,27,21,0.15)'; }}
                  />
                  <select
                    value={wishInput.side}
                    onChange={e => setWishInput({ ...wishInput, side: e.target.value })}
                    style={{ ...INPUT, backgroundColor: '#FDFBF7' }}
                  >
                    <option value="Bạn Chú Rể">Bạn Chú Rể</option>
                    <option value="Bạn Cô Dâu">Bạn Cô Dâu</option>
                    <option value="Gia Đình Họ Hàng">Gia Đình Họ Hàng</option>
                    <option value="Bạn Bè Đồng Nghiệp">Bạn Bè Đồng Nghiệp</option>
                  </select>
                </div>
                <textarea
                  rows={2} required
                  placeholder="Viết lời chúc phúc gửi đến đôi bạn trẻ..."
                  value={wishInput.message}
                  onChange={e => setWishInput({ ...wishInput, message: e.target.value })}
                  style={{ ...INPUT, backgroundColor: '#FDFBF7', resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = '#8B1E22'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(35,27,21,0.15)'; }}
                />
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 24px' }}>
                  <MessageSquareHeart size={15} />
                  Gửi lời chúc
                </button>
              </form>
            </div>

            {/* Wishes feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishes.map(w => (
                <div
                  key={w.id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#FDFBF7',
                    borderBottom: '1px solid rgba(35,27,21,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: '#231B15',
                        marginRight: '8px',
                      }}>
                        {w.name}
                      </span>
                      <span style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        color: '#8B1E22',
                        letterSpacing: '0.04em',
                      }}>
                        {w.side}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      color: '#756B63',
                    }}>
                      {w.time}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: '#4A3F38',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    "{w.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
