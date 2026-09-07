import { useState } from 'react';
import { Heart, Sparkles, User, Smile, Utensils, Compass, CheckCircle2 } from 'lucide-react';
import { COUPLE } from '../weddingData';

const PERSPECTIVES = {
  groom: {
    author: 'Đại Nghĩa nói về Trịnh Nhung',
    authorRole: 'Chú Rể · Chàng Kể',
    avatar: COUPLE.groom.photo.src,
    avatarAlt: 'Chú rể Đại Nghĩa',
    accentColor: '#801D24',
    moments: [
      {
        icon: Smile,
        title: 'Khoảnh khắc làm anh xiêu lòng',
        content: 'Nụ cười tỏa nắng của Nhung có một năng lượng diệu kỳ, có thể xua tan mọi áp lực mệt mỏi sau những giờ làm việc căng thẳng.',
      },
      {
        icon: Heart,
        title: 'Thói quen dễ thương của nàng',
        content: 'Mỗi khi say mê vẽ mẫu thời trang là cắn nhẹ đuôi bút, và mỗi khi được anh mang cho cốc trà đào yêu thích là mắt lại cười tít lại.',
      },
      {
        icon: Compass,
        title: 'Lời ước nguyện từ trái tim',
        content: 'Anh hứa sẽ luôn là bờ vai vững chãi nhất, chăm sóc và chở che cho em, cùng em đi qua mọi thăng trầm của cuộc đời.',
      },
    ],
  },
  bride: {
    author: 'Trịnh Nhung kể về Đại Nghĩa',
    authorRole: 'Cô Dâu · Nàng Kể',
    avatar: COUPLE.bride.photo.src,
    avatarAlt: 'Cô dâu Trịnh Nhung',
    accentColor: '#C5A059',
    moments: [
      {
        icon: Heart,
        title: 'Điều làm em rung động nhất',
        content: 'Sự kiên nhẫn, điềm đạm và cách anh luôn để ý từng điều nhỏ nhặt: luôn đi phía ngoài đường để che chắn cho em, luôn mang theo áo khoác phòng em lạnh.',
      },
      {
        icon: Smile,
        title: 'Điểm đáng yêu của chàng kỹ sư',
        content: 'Nhìn thì trầm tính ít nói nhưng mỗi lần dỗ dành em dỗi là lại viết code hiển thị trái tim bay trên màn hình máy tính.',
      },
      {
        icon: Compass,
        title: 'Lời ước nguyện từ trái tim',
        content: 'Em hứa sẽ luôn là hậu phương ấm áp, nấu những bữa ăn gia đình tràn ngập tiếng cười và là nơi bình yên nhất anh muốn trở về.',
      },
    ],
  },
};

const FUN_FACTS = [
  {
    q: 'Ai là bếp trưởng chính?',
    a: 'Đại Nghĩa (chuyên steak & pasta)',
    icon: Utensils,
  },
  {
    q: 'Ai là stylist trang phục?',
    a: 'Trịnh Nhung (chọn từng chiếc cà vạt)',
    icon: Sparkles,
  },
  {
    q: 'Ai luôn làm lành trước?',
    a: 'Đại Nghĩa (Nhung pha trà ngọt sau đó)',
    icon: Heart,
  },
];

export default function Couple() {
  const [activeTab, setActiveTab] = useState('groom');
  const activeData = PERSPECTIVES[activeTab];

  return (
    <section
      id="couple"
      aria-label="Đôi uyên ương chú rể và cô dâu"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'linear-gradient(180deg, #F6ECE0 0%, #FAF7F2 50%, #FAF5EE 100%)',
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
          maxWidth: '920px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
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
            <Heart size={13} fill="#801D24" />
            Đôi Uyên Ương · The Happy Couple
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
            Chú Rể &amp; Cô Dâu
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
            “Hai cá tính, hai tâm hồn riêng biệt nhưng khi ở bên nhau lại là mảnh ghép hoàn hảo nhất.”
          </p>
        </div>

        {/* ── ROMAN ARCH PORTRAITS SIDE-BY-SIDE ── */}
        <div
          className="gsap-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'stretch',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          {/* Groom Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid rgba(197, 160, 89, 0.45)',
              boxShadow: '0 16px 40px -8px rgba(50, 30, 15, 0.08)',
              padding: 'clamp(24px, 4vw, 36px) clamp(18px, 3vw, 28px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 'min(220px, 70vw)',
                aspectRatio: '3 / 4',
                borderRadius: '120px 120px 16px 16px',
                overflow: 'hidden',
                border: '3px solid #C5A059',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                marginBottom: '18px',
                backgroundColor: '#F5EDE0',
              }}
            >
              <img
                src={COUPLE.groom.photo.src}
                alt={COUPLE.groom.photo.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <span
              style={{
                padding: '4px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(128, 29, 36, 0.08)',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Chú Rể · {COUPLE.groom.roleLabel}
            </span>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.0rem)',
                fontWeight: 600,
                color: '#1E1612',
                margin: '0 0 4px 0',
              }}
            >
              {COUPLE.groom.fullName}
            </h3>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                color: '#9A7836',
                letterSpacing: '0.12em',
                marginBottom: '14px',
              }}
            >
              {COUPLE.groom.title}
            </p>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.98rem',
                fontStyle: 'italic',
                color: '#584A42',
                lineHeight: 1.6,
                margin: '0',
                paddingTop: '12px',
                borderTop: '1px dashed rgba(197, 160, 89, 0.3)',
              }}
            >
              {COUPLE.groom.quote}
            </p>
          </div>

          {/* Bride Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid rgba(197, 160, 89, 0.45)',
              boxShadow: '0 16px 40px -8px rgba(50, 30, 15, 0.08)',
              padding: 'clamp(24px, 4vw, 36px) clamp(18px, 3vw, 28px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 'min(220px, 70vw)',
                aspectRatio: '3 / 4',
                borderRadius: '120px 120px 16px 16px',
                overflow: 'hidden',
                border: '3px solid #C5A059',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                marginBottom: '18px',
                backgroundColor: '#F5EDE0',
              }}
            >
              <img
                src={COUPLE.bride.photo.src}
                alt={COUPLE.bride.photo.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <span
              style={{
                padding: '4px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(197, 160, 89, 0.14)',
                color: '#9A7836',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Cô Dâu · {COUPLE.bride.roleLabel}
            </span>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.0rem)',
                fontWeight: 600,
                color: '#1E1612',
                margin: '0 0 4px 0',
              }}
            >
              {COUPLE.bride.fullName}
            </h3>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                color: '#9A7836',
                letterSpacing: '0.12em',
                marginBottom: '14px',
              }}
            >
              {COUPLE.bride.title}
            </p>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.98rem',
                fontStyle: 'italic',
                color: '#584A42',
                lineHeight: 1.6,
                margin: '0',
                paddingTop: '12px',
                borderTop: '1px dashed rgba(197, 160, 89, 0.3)',
              }}
            >
              {COUPLE.bride.quote}
            </p>
          </div>
        </div>

        {/* ── DUAL PERSPECTIVE SWITCHER ("CHUYỆN CHÀNG KỂ" ⟷ "CHUYỆN NÀNG NGHE") ── */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid #C5A059',
            boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.12)',
            padding: 'clamp(24px, 4vw, 36px)',
            marginBottom: 'clamp(36px, 5vw, 56px)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                color: '#9A7836',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              ✦ Lăng Kính Tình Yêu ✦
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                color: '#801D24',
                margin: '6px 0 16px 0',
              }}
            >
              Góc Nhìn Của Chàng &amp; Nàng
            </h3>

            {/* Interactive Toggle Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px',
                borderRadius: '999px',
                backgroundColor: '#FAF5EE',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('groom')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: activeTab === 'groom' ? '#801D24' : 'transparent',
                  color: activeTab === 'groom' ? '#FFF2D4' : '#584A42',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === 'groom' ? '0 4px 12px rgba(128, 29, 36, 0.3)' : 'none',
                }}
              >
                👔 Chàng Kể Về Nàng
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bride')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: activeTab === 'bride' ? '#801D24' : 'transparent',
                  color: activeTab === 'bride' ? '#FFF2D4' : '#584A42',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === 'bride' ? '0 4px 12px rgba(128, 29, 36, 0.3)' : 'none',
                }}
              >
                👗 Nàng Kể Về Chàng
              </button>
            </div>
          </div>

          {/* Perspective Moments Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: '16px',
            }}
          >
            {activeData.moments.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAF7F2',
                    borderRadius: '16px',
                    padding: '20px 18px',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(128, 29, 36, 0.10)',
                      color: '#801D24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <IconComponent size={16} />
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: '#801D24',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.02rem',
                      fontStyle: 'italic',
                      color: '#42332A',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── LOVE COMPATIBILITY & FUN FACTS ── */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '20px',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            padding: '24px 20px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.68rem',
                color: '#9A7836',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Chỉ Số Đồng Điệu Của Cặp Đôi
            </span>
          </div>

          {/* Compatibility Progress Meters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, color: '#584A42', marginBottom: '6px' }}>
                <span>Đồng điệu tâm hồn</span>
                <span style={{ color: '#801D24', fontWeight: 700 }}>100%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#F0E6D6', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #C5A059, #801D24)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, color: '#584A42', marginBottom: '6px' }}>
                <span>Thấu hiểu &amp; sẻ chia</span>
                <span style={{ color: '#801D24', fontWeight: 700 }}>99.9%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#F0E6D6', overflow: 'hidden' }}>
                <div style={{ width: '99.9%', height: '100%', background: 'linear-gradient(90deg, #C5A059, #801D24)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, color: '#584A42', marginBottom: '6px' }}>
                <span>Tiếng cười mỗi ngày</span>
                <span style={{ color: '#801D24', fontWeight: 700 }}>100%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#F0E6D6', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #C5A059, #801D24)' }} />
              </div>
            </div>
          </div>

          {/* Quick Fun Facts Pill Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              paddingTop: '16px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.28)',
            }}
          >
            {FUN_FACTS.map((f, i) => {
              const IconComp = f.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                    fontSize: '0.72rem',
                    color: '#584A42',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                  }}
                >
                  <IconComp size={13} color="#801D24" />
                  <strong style={{ color: '#801D24' }}>{f.q}</strong>
                  <span>{f.a}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
