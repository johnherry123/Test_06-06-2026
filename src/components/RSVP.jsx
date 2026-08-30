import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   RSVP & LIVE GUESTBOOK (XÁC NHẬN THAM DỰ & SỔ LƯU BÚT)
   100% Native Vietnamese Typography & LocalStorage Persistence
══════════════════════════════════════════════════════════════════════ */

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

export default function RSVP() {
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' | 'wishes'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    side: 'Nhà Trai',
    attend: 'yes',
    guests: '1',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_db');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch (_) {
      return INITIAL_WISHES;
    }
  });

  const [wishInput, setWishInput] = useState({ name: '', side: 'Bạn Bè', message: '' });

  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_db', JSON.stringify(wishes));
    } catch (_) {}
  }, [wishes]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitted(true);

    if (formData.message.trim()) {
      const newWish = {
        id: Date.now(),
        name: formData.name,
        side: formData.side,
        message: formData.message,
        time: 'Vừa xong',
      };
      setWishes((prev) => [newWish, ...prev]);
    }
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishInput.name.trim() || !wishInput.message.trim()) return;

    const newWish = {
      id: Date.now(),
      name: wishInput.name,
      side: wishInput.side,
      message: wishInput.message,
      time: 'Vừa xong',
    };

    setWishes((prev) => [newWish, ...prev]);
    setWishInput({ name: '', side: 'Bạn Bè', message: '' });
  };

  return (
    <section
      id="rsvp"
      style={{
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="eyebrow-luxury">Phúc Đáp & Chúc Phúc</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Gửi Lời <span style={{ color: '#8B1E22' }}>Yêu Thương</span>
          </h2>
          <div className="divider-luxury">
            <span style={{ color: '#8B1E22' }}>囍</span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <button
            onClick={() => setActiveTab('rsvp')}
            style={{
              padding: '12px 28px',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.88rem',
              fontWeight: 700,
              borderRadius: '2px',
              border: activeTab === 'rsvp'
                ? '1.5px solid #8B1E22'
                : '1px solid rgba(197, 160, 89, 0.3)',
              backgroundColor: activeTab === 'rsvp' ? '#8B1E22' : '#FFFFFF',
              color: activeTab === 'rsvp' ? '#FFFFFF' : '#584A40',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'rsvp' ? '0 6px 18px rgba(139, 30, 34, 0.25)' : 'none',
            }}
          >
            1. Xác Nhận Tham Dự
          </button>

          <button
            onClick={() => setActiveTab('wishes')}
            style={{
              padding: '12px 28px',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.88rem',
              fontWeight: 700,
              borderRadius: '2px',
              border: activeTab === 'wishes'
                ? '1.5px solid #8B1E22'
                : '1px solid rgba(197, 160, 89, 0.3)',
              backgroundColor: activeTab === 'wishes' ? '#8B1E22' : '#FFFFFF',
              color: activeTab === 'wishes' ? '#FFFFFF' : '#584A40',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'wishes' ? '0 6px 18px rgba(139, 30, 34, 0.25)' : 'none',
            }}
          >
            2. Sổ Lưu Bút ({wishes.length})
          </button>
        </div>

        {/* TAB 1: RSVP Form */}
        {activeTab === 'rsvp' && (
          <div
            className="gold-frame"
            style={{
              backgroundColor: '#FFFDF9',
              padding: 'clamp(28px, 5vw, 48px)',
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(139, 30, 34, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#8B1E22',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <h3
                  className="font-display"
                  style={{ fontSize: '2rem', color: '#8B1E22', margin: '0 0 12px', fontWeight: 700 }}
                >
                  Cảm Ơn Bạn!
                </h3>

                <p
                  className="font-sans"
                  style={{
                    fontSize: '1rem',
                    color: '#584A40',
                    maxWidth: '460px',
                    margin: '0 auto 28px',
                    lineHeight: 1.7,
                  }}
                >
                  Phản hồi của <strong>{formData.name}</strong> đã được ghi nhận thành công.
                  Gia đình chúng tôi rất vinh hạnh được đón tiếp bạn vào ngày <strong>20.10.2026</strong>!
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-luxury-gold"
                >
                  Gửi lại phản hồi khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '8px' }}>
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.95rem',
                        color: '#231B15',
                        outline: 'none',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '8px' }}>
                      Số Điện Thoại
                    </label>
                    <input
                      type="tel"
                      placeholder="Số điện thoại của bạn"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.95rem',
                        color: '#231B15',
                        outline: 'none',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '10px' }}>
                    Bạn là khách mời của:
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['Nhà Trai', 'Nhà Gái', 'Bạn Chung'].map((side) => (
                      <label
                        key={side}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 18px',
                          borderRadius: '2px',
                          border: formData.side === side ? '1.5px solid #8B1E22' : '1px solid rgba(197, 160, 89, 0.3)',
                          backgroundColor: formData.side === side ? 'rgba(139, 30, 34, 0.08)' : '#FFFFFF',
                          cursor: 'pointer',
                          fontSize: '0.92rem',
                          color: formData.side === side ? '#8B1E22' : '#584A40',
                          fontWeight: formData.side === side ? 600 : 400,
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                        }}
                      >
                        <input
                          type="radio"
                          name="side"
                          checked={formData.side === side}
                          onChange={() => setFormData({ ...formData, side })}
                          style={{ accentColor: '#8B1E22' }}
                        />
                        {side}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '8px' }}>
                      Xác nhận tham dự:
                    </label>
                    <select
                      value={formData.attend}
                      onChange={(e) => setFormData({ ...formData, attend: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.95rem',
                        color: '#231B15',
                        outline: 'none',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                      }}
                    >
                      <option value="yes">Chắc chắn tham dự</option>
                      <option value="maybe">Có thể tham dự</option>
                      <option value="no">Rất tiếc không thể tham dự</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '8px' }}>
                      Số lượng người đi cùng:
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.95rem',
                        color: '#231B15',
                        outline: 'none',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                      }}
                    >
                      <option value="1">1 người</option>
                      <option value="2">2 người</option>
                      <option value="3">3 người</option>
                      <option value="4+">4 người trở lên</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B1E22', marginBottom: '8px' }}>
                    Lời Chúc Gửi Đôi Uyên Ương:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Gửi lời chúc phúc yêu thương của bạn tại đây..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(197, 160, 89, 0.35)',
                      borderRadius: '2px',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.95rem',
                      color: '#231B15',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                  />
                </div>

                <button type="submit" className="btn-luxury-crimson" style={{ width: '100%', padding: '16px' }}>
                  <Send size={16} />
                  Gửi Phản Hồi Xác Nhận
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: Live Guestbook */}
        {activeTab === 'wishes' && (
          <div>
            <div
              className="gold-frame"
              style={{
                backgroundColor: '#FFFDF9',
                padding: '28px',
                marginBottom: '32px',
              }}
            >
              <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#8B1E22', fontWeight: 700, margin: '0 0 16px' }}>
                ✍️ Để Lại Lời Chúc Phúc
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {WISH_PRESETS.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setWishInput((prev) => ({ ...prev, message: preset }))}
                    style={{
                      fontSize: '0.82rem',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      color: '#584A40',
                      cursor: 'pointer',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <form onSubmit={handleWishSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Tên của bạn"
                    value={wishInput.name}
                    onChange={(e) => setWishInput({ ...wishInput, name: e.target.value })}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                  />

                  <select
                    value={wishInput.side}
                    onChange={(e) => setWishInput({ ...wishInput, side: e.target.value })}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                  >
                    <option value="Bạn Chú Rể">Bạn Chú Rể</option>
                    <option value="Bạn Cô Dâu">Bạn Cô Dâu</option>
                    <option value="Gia Đình Họ Hàng">Gia Đình Họ Hàng</option>
                    <option value="Bạn Bè Đồng Nghiệp">Bạn Bè Đồng Nghiệp</option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  required
                  placeholder="Viết lời chúc phúc chân thành gửi đến đôi bạn trẻ..."
                  value={wishInput.message}
                  onChange={(e) => setWishInput({ ...wishInput, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '2px',
                    fontSize: '0.95rem',
                    marginBottom: '14px',
                    resize: 'none',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                  }}
                />

                <button type="submit" className="btn-luxury-crimson" style={{ padding: '12px 28px' }}>
                  <MessageSquareHeart size={16} />
                  Gửi Lời Chúc Ngay
                </button>
              </form>
            </div>

            {/* Wishes Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="glass-luxury-card"
                  style={{
                    padding: '20px 24px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#231B15', fontFamily: "'Playfair Display', serif" }}>
                        {w.name}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontWeight: 600,
                          padding: '2px 8px',
                          backgroundColor: 'rgba(139, 30, 34, 0.08)',
                          color: '#8B1E22',
                          borderRadius: '2px',
                        }}
                      >
                        {w.side}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: '#8F7E73', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      {w.time}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.96rem', color: '#584A40', lineHeight: 1.65, margin: 0, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
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
