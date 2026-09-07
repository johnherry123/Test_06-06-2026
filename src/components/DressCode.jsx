import { useState } from 'react';
import { Sparkles, Check, Info, Shirt, UserCheck } from 'lucide-react';

const DRESS_COLORS = [
  {
    id: 'burgundy',
    name: 'Đỏ Rượu Vang',
    subname: 'Deep Wine Burgundy',
    hex: '#7A1A22',
    textColor: '#FFF2D4',
    vibe: 'Quyến rũ, nồng nàn & quý phái hoàng gia',
    menTips: 'Cà vạt, nơ nhung đỏ rượu hoặc khăn cài túi áo vest (Pocket square).',
    womenTips: 'Đầm dạ hội lụa satin đỏ rượu, váy cúp ngực quý phái kết hợp phụ kiện ánh kim.',
  },
  {
    id: 'gold',
    name: 'Vàng Sâm Panh',
    subname: 'Champagne Gold',
    hex: '#C5A059',
    textColor: '#1E1612',
    vibe: 'Sang trọng, ấm áp & lộng lẫy',
    menTips: 'Bộ suit be sáng, áo sơ mi kem nhạt kết hợp phụ kiện đồng hồ kim loại vàng.',
    womenTips: 'Đầm dạ tiệc champagne, váy ánh nhũ nhẹ nhàng hoặc lụa tơ tằm thướt tha.',
  },
  {
    id: 'sand',
    name: 'Cát Ấm & Be Nhẹ',
    subname: 'Warm Sand & Beige',
    hex: '#E2D5C3',
    textColor: '#1E1612',
    vibe: 'Thanh lịch, trang nhã & êm dịu tự nhiên',
    menTips: 'Suit màu kem, blazer tone đất ấm kết hợp quần tây ống đứng chỉn chu.',
    womenTips: 'Váy midi tone be, đầm ren xếp ly hoặc váy voan bay bổng nữ tính.',
  },
  {
    id: 'black',
    name: 'Đen Lịch Lãm',
    subname: 'Classic Black Tie',
    hex: '#1E1612',
    textColor: '#FAF7F2',
    vibe: 'Kinh điển, huyền bí & chuẩn mực dạ tiệc',
    menTips: 'Tuxedo hoặc bộ suit đen kinh điển, giày tây oxford bóng bẩy.',
    womenTips: 'Đầm cocktail đen thanh lịch, đầm ôm body quý phái phối cùng chuỗi ngọc trai.',
  },
];

export default function DressCode() {
  const [selectedColor, setSelectedColor] = useState(DRESS_COLORS[0]);

  return (
    <section
      id="dresscode"
      aria-label="Gợi ý trang phục tham dự đám cưới"
      style={{
        backgroundColor: '#FAF5EE',
        background: 'radial-gradient(circle at 50% 30%, #FFFDF9 0%, #F5ECE0 100%)',
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
            Dress Code &amp; Vibe Guide
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
            Gợi Ý Trang Phục Dạ Tiệc
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
            “Sự hiện diện chỉn chu và rạng ngời của Quý khách sẽ tạo nên một đêm dạ tiệc hoàn hảo và những khung hình kỷ niệm lộng lẫy nhất.”
          </p>
        </div>

        {/* ── COLOR PALETTE SWATCHES ── */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid #C5A059',
            boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.12)',
            padding: 'clamp(24px, 4.5vw, 40px)',
            boxSizing: 'border-box',
            marginBottom: '28px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.74rem',
                color: '#9A7836',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              ✦ Bảng Màu Trang Phục Ưu Tiên ✦
            </span>
            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.78rem',
                color: '#7C6E66',
                margin: '4px 0 0 0',
              }}
            >
              (Chạm vào từng ô màu để xem gợi ý chi tiết cho Quý Ông &amp; Quý Cô)
            </p>
          </div>

          {/* Interactive Swatches Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
              gap: '14px',
              marginBottom: '28px',
            }}
          >
            {DRESS_COLORS.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color.hex,
                    color: color.textColor,
                    border: isSelected ? '3px solid #801D24' : '2px solid rgba(197, 160, 89, 0.4)',
                    borderRadius: '16px',
                    padding: '20px 14px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
                    boxShadow: isSelected
                      ? '0 12px 28px rgba(128, 29, 36, 0.35)'
                      : '0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isSelected ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <Check size={14} color={color.textColor} />
                  </div>

                  <strong
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {color.name}
                  </strong>

                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.62rem',
                      opacity: 0.85,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {color.subname}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Swatch Detailed Breakdown */}
          <div
            style={{
              backgroundColor: '#FAF7F2',
              borderRadius: '18px',
              border: '1.5px solid rgba(197, 160, 89, 0.35)',
              padding: 'clamp(20px, 3.5vw, 30px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: selectedColor.hex,
                  border: '1px solid rgba(0,0,0,0.2)',
                }}
              />
              <h4
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: '#801D24',
                  margin: 0,
                }}
              >
                Gợi Ý Phối Đồ Với Tone {selectedColor.name}
              </h4>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  color: '#584A42',
                  fontSize: '0.92rem',
                }}
              >
                — “{selectedColor.vibe}”
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                gap: '18px',
              }}
            >
              {/* Gentlemen Tips */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shirt size={16} color="#801D24" />
                  <strong
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.80rem',
                      color: '#1E1612',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Dành Cho Quý Ông (Gentlemen)
                  </strong>
                </div>
                <p
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.80rem',
                    color: '#584A42',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selectedColor.menTips}
                </p>
              </div>

              {/* Ladies Tips */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={16} color="#C5A059" />
                  <strong
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.80rem',
                      color: '#1E1612',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Dành Cho Quý Cô (Ladies)
                  </strong>
                </div>
                <p
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.80rem',
                    color: '#584A42',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selectedColor.womenTips}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thoughtful Etiquette Note */}
        <div
          className="gsap-reveal"
          style={{
            backgroundColor: 'rgba(128, 29, 36, 0.05)',
            border: '1px dashed rgba(128, 29, 36, 0.35)',
            borderRadius: '18px',
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#801D24',
              color: '#FFF2D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Info size={18} />
          </div>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.80rem',
              color: '#584A42',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <strong style={{ color: '#801D24' }}>Lời nhắn nhủ thân thương:</strong> Quý khách có thể tùy ý diện trang phục thoải mái theo sở thích của mình. Nếu có thể, xin ưu tiên bảng màu trên và <strong style={{ color: '#801D24' }}>hạn chế diện trang phục màu trắng tinh khôi</strong> để nhường trọn khoảnh khắc nổi bật nhất cho Cô Dâu nhé!
          </p>
        </div>
      </div>
    </section>
  );
}
