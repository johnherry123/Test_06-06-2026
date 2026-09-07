import { useState } from 'react';
import { Heart, MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { COUPLE } from '../weddingData';

const MILESTONES = [
  {
    id: 0,
    time: 'Mùa Thu 2020',
    title: 'Lần Đầu Gặp Gỡ',
    subtitle: 'Khoảnh Khắc Định Mệnh',
    location: 'Quán cà phê góc phố Sài Gòn',
    coordinates: '10.7769° N, 106.7009° E',
    summary: 'Một buổi chiều thu tình cờ tại quán cà phê góc phố Sài Gòn, nơi hai tâm hồn đồng điệu tìm thấy nhau qua những câu chuyện say mê không dứt.',
    secretNote: '“Hôm ấy anh giả vờ hỏi mượn cuốn sách em đang đọc dở, thực ra tim anh đã đập liên hồi từ giây phút em vừa bước vào quán.” — Đại Nghĩa',
    photo: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=88&fm=webp',
    stampColor: '#801D24',
    tag: 'Tình Cờ & Định Mệnh',
  },
  {
    id: 1,
    time: 'Mùa Hạ 2022',
    title: 'Chuyến Đi Kỷ Niệm',
    subtitle: 'Chạm Vào Hạnh Phúc',
    location: 'Đồi sương Đà Lạt',
    coordinates: '11.9404° N, 108.4583° E',
    summary: 'Cùng nhau đón bình minh trên đồi sương Đà Lạt, sẻ chia từng khoảnh khắc ngọt ngào và những ước mơ êm đềm về một mái ấm mai sau.',
    secretNote: '“Trời sáng sớm lạnh buốt 14 độ, anh nhường chiếc khăn len duy nhất cho em rồi nắm chặt tay em đút vào túi áo khoác của anh.” — Trịnh Nhung',
    photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=88&fm=webp',
    stampColor: '#C5A059',
    tag: 'Khắc Ghi Kỷ Niệm',
  },
  {
    id: 2,
    time: 'Mùa Đông 2024',
    title: 'Lời Hẹn Ước Trọn Đời',
    subtitle: 'She Said YES!',
    location: 'Hoàng hôn biển Phú Quốc',
    coordinates: '10.2899° N, 103.9840° E',
    summary: 'Dưới ánh hoàng hôn rực rỡ bên bờ biển Phú Quốc, chiếc nhẫn nguyện ước được trao tay cùng cái gật đầu hạnh phúc nhất cuộc đời.',
    secretNote: '“Anh giấu chiếc nhẫn trong vỏ ốc suốt cả buổi chiều. Lúc anh quỳ xuống nói ‘Làm vợ anh nhé’, cả hai đứa cùng nghẹn ngào rơi nước mắt.” — Đại Nghĩa & Trịnh Nhung',
    photo: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1000&q=88&fm=webp',
    stampColor: '#801D24',
    tag: 'Hẹn Ước Trăm Năm',
  },
  {
    id: 3,
    time: '20.10.2026',
    title: 'Ngày Chúng Mình Về Chung Nhà',
    subtitle: 'Lễ Thành Hôn Viên Mãn',
    location: 'Grand Ballroom Castor · Gem Center',
    coordinates: '10.7876° N, 106.7020° E',
    summary: 'Khép lại chặng đường 6 năm hẹn hò để mở ra hành trình hôn nhân viên mãn, cùng nhau xây đắp tổ ấm trọn vẹn yêu thương.',
    secretNote: '“Cảm ơn vì đã cùng anh đi qua mọi thăng trầm của tuổi trẻ. Từ hôm nay, anh hạnh phúc được gọi em là Vợ của anh.” — Chú rể Đại Nghĩa',
    photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=88&fm=webp',
    stampColor: '#9B7630',
    tag: 'Happy Wedding',
  },
];

export default function Story() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = MILESTONES[activeIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setActiveIdx((prev) => (prev + 1) % MILESTONES.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setActiveIdx((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);
  };

  const handleSelect = (idx) => {
    setIsFlipped(false);
    setActiveIdx(idx);
  };

  return (
    <section
      id="story"
      aria-label="Câu chuyện tình yêu của chúng mình"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 70% at 50% 20%, #FFFDF9 0%, #F6ECE0 100%)',
        padding: 'clamp(60px, 9vw, 100px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Decorative Gold Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(197, 160, 89, 0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '860px',
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
            <Sparkles size={13} color="#C5A059" />
            Sổ Kỷ Niệm Tình Yêu · Love Chronicle
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
            Hành Trình 6 Năm Yêu Thương
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
            “Từng trang kỷ niệm, từng điểm đến đều là minh chứng cho một tình yêu chân thành và bền chặt.”
          </p>
        </div>

        {/* Milestone Fast Navigation Pills */}
        <div
          className="gsap-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: 'clamp(28px, 4.5vw, 40px)',
          }}
        >
          {MILESTONES.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelect(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: isSelected ? '1.5px solid #801D24' : '1px solid rgba(197, 160, 89, 0.4)',
                  backgroundColor: isSelected ? '#801D24' : 'rgba(255, 255, 255, 0.85)',
                  color: isSelected ? '#FAF7F2' : '#584A42',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 4px 14px rgba(128, 29, 36, 0.28)' : '0 2px 6px rgba(0,0,0,0.03)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#E5CD94' : '#C5A059',
                  }}
                />
                <span>{m.time}</span>
              </button>
            );
          })}
        </div>

        {/* ── THE INTERACTIVE POLAROID SCRAPBOOK SPOTLIGHT ── */}
        <div
          className="gsap-reveal"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            perspective: '1200px',
          }}
        >
          {/* Main Flippable Scrapbook Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#FFFDF9',
              borderRadius: '24px',
              border: '2px solid #C5A059',
              boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.16), 0 8px 20px rgba(197, 160, 89, 0.20)',
              padding: 'clamp(20px, 4.5vw, 36px)',
              boxSizing: 'border-box',
              cursor: 'pointer',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            {/* Top Washi Tape Deco (Gold & Burgundy striped tape simulation) */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-1.5deg)',
                width: '110px',
                height: '24px',
                backgroundColor: 'rgba(229, 205, 148, 0.85)',
                border: '1px dashed rgba(128, 29, 36, 0.35)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                zIndex: 10,
                borderRadius: '2px',
              }}
            />

            {/* Inner Border */}
            <div
              style={{
                position: 'absolute',
                inset: '8px',
                border: '1px solid rgba(197, 160, 89, 0.28)',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />

            {/* Card Content: Front vs Back View */}
            {!isFlipped ? (
              /* ── FRONT OF POLAROID CARD ── */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Polaroid Frame Photo */}
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    padding: 'clamp(10px, 2.5vw, 16px) clamp(10px, 2.5vw, 16px) clamp(18px, 3.5vw, 24px)',
                    borderRadius: '16px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 10',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#F5EDE0',
                    }}
                  >
                    <img
                      src={current.photo}
                      alt={current.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {/* Golden Wax Stamp Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: current.stampColor,
                        color: '#FFF2D4',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255, 242, 212, 0.4)',
                      }}
                    >
                      {current.tag}
                    </div>
                  </div>

                  {/* Caption underneath photo */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '12px',
                      padding: '0 4px',
                      flexWrap: 'wrap',
                      gap: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#801D24' }}>
                      <MapPin size={13} />
                      <span
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '0.70rem',
                          fontWeight: 600,
                        }}
                      >
                        {current.location}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.62rem',
                        color: '#9A7836',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {current.coordinates}
                    </span>
                  </div>
                </div>

                {/* Milestone Details */}
                <div style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.72rem',
                      color: '#9A7836',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {current.time} · {current.subtitle}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(1.5rem, 3.8vw, 2.2rem)',
                      fontWeight: 600,
                      color: '#1E1612',
                      lineHeight: 1.2,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {current.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: 'clamp(0.82rem, 2vw, 0.94rem)',
                      color: '#584A42',
                      lineHeight: 1.7,
                      maxWidth: '540px',
                      margin: '0 auto 16px',
                    }}
                  >
                    {current.summary}
                  </p>

                  {/* Hint to Flip Card */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      background: 'rgba(197, 160, 89, 0.12)',
                      color: '#801D24',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      border: '1px dashed #C5A059',
                    }}
                  >
                    <RotateCw size={12} />
                    <span>Chạm để mở lá thư bí mật chưa từng kể ✦</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ── BACK OF POLAROID CARD (Handwritten Secret Note) ── */
              <div
                style={{
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 'clamp(16px, 3vw, 28px)',
                  background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF4E8 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(197, 160, 89, 0.35)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#801D24',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <Heart size={14} fill="#801D24" />
                  <span>Bức Thư Tay Bí Mật · {current.time}</span>
                </div>

                <h4
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    fontSize: 'clamp(2.0rem, 4.8vw, 3.2rem)',
                    color: '#801D24',
                    margin: '0 0 16px 0',
                    fontWeight: 400,
                  }}
                >
                  Gửi Người Thương Của Anh/Em
                </h4>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
                    fontStyle: 'italic',
                    color: '#2C221C',
                    lineHeight: 1.8,
                    maxWidth: '500px',
                    margin: '0 auto 24px',
                  }}
                >
                  {current.secretNote}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: '#801D24',
                    color: '#FFF2D4',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.66rem',
                    fontWeight: 600,
                  }}
                >
                  <RotateCw size={11} />
                  <span>Chạm để lật lại hình ảnh</span>
                </div>
              </div>
            )}
          </div>

          {/* Previous / Next Arrow Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '18px',
              padding: '0 6px',
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Kỷ niệm trước"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronLeft size={14} />
              <span>Trước</span>
            </button>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {MILESTONES.map((_, i) => (
                <span
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    width: activeIdx === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '999px',
                    backgroundColor: activeIdx === i ? '#801D24' : 'rgba(197, 160, 89, 0.35)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Kỷ niệm tiếp theo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              <span>Tiếp theo</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Loving Signature Quote */}
        <div
          className="gsap-reveal"
          style={{
            textAlign: 'center',
            marginTop: 'clamp(40px, 7vw, 65px)',
            paddingTop: '24px',
            borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.0rem, 5vw, 3.0rem)',
              color: '#801D24',
              margin: '0 0 4px 0',
              wordBreak: 'break-word',
            }}
          >
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
          </p>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem',
              color: '#9A7836',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            20 · 10 · 2026 — Trọn Vẹn Một Tình Yêu
          </p>
        </div>
      </div>
    </section>
  );
}
