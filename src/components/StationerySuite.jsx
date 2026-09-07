import { useState, useEffect, useRef } from 'react';
import { COUPLE, WEDDING, GALLERY, BANK_ACCOUNTS } from '../weddingData';
import {
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Gift,
  Ticket,
  QrCode,
  Layers,
  Eye,
  Check,
  Copy,
} from 'lucide-react';

/* ── Live Countdown Hook ── */
function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

/* ══════════════════════════════════════════════════════════════════════
   CARD 1: MAIN INVITATION CARD (THIỆP MỜI CHÍNH & LỜI THỀ NGUYỆN)
   ══════════════════════════════════════════════════════════════════════ */
function MainInvitationCard({ isFlipped, onFlip, onSelect }) {
  return (
    <div
      className="perspective-container"
      style={{
        width: '100%',
        maxWidth: '440px',
        minHeight: '520px',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={onSelect}
    >
      <div
        className="preserve-3d"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="backface-hidden flatlay-card-paper"
          style={{
            position: 'absolute',
            inset: 0,
            padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Pill */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '999px',
                background: 'rgba(128, 29, 36, 0.08)',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={11} />
              Save The Date · 20.10.2026
            </div>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                color: '#9A7836',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
              }}
            >
              Trân Trọng Kính Mời
            </p>
          </div>

          {/* Roman Arch Photo Frame */}
          <div
            style={{
              width: '170px',
              height: '210px',
              borderRadius: '85px 85px 12px 12px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 12px 30px rgba(50, 30, 15, 0.16)',
              border: '2px solid #C5A059',
              margin: '6px 0',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=88&fm=webp"
              alt="Đại Nghĩa & Trịnh Nhung"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Monogram Seal */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 21, 16, 0.85)',
                border: '1px solid #C5A059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5ECE0',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              N&amp;N
            </div>
          </div>

          {/* Names & Date */}
          <div>
            <h2
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.4rem, 5.5vw, 3.2rem)',
                color: '#801D24',
                lineHeight: 1.1,
                margin: '4px 0',
                fontWeight: 400,
              }}
            >
              Đại Nghĩa &amp; Trịnh Nhung
            </h2>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.96rem',
                fontStyle: 'italic',
                color: '#584A42',
                margin: '2px 0 14px 0',
              }}
            >
              Khởi đầu cho hành trình trăm năm hạnh phúc
            </p>

            {/* Flip Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFlip();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <RotateCw size={13} />
              Lật mặt sau (Lời Hẹn Ước)
            </button>
          </div>
        </div>

        {/* BACK SIDE (VOWS & STORY) */}
        <div
          className="backface-hidden flatlay-card-paper rotate-y-180"
          style={{
            position: 'absolute',
            inset: 0,
            padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxSizing: 'border-box',
            backgroundColor: '#FAF7F2',
          }}
        >
          <div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #801D24 0%, #5D1217 100%)',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
                boxShadow: '0 6px 16px rgba(128, 29, 36, 0.3)',
              }}
            >
              <Heart size={18} fill="#FAF7F2" />
            </div>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                color: '#9A7836',
                textTransform: 'uppercase',
                margin: '0 0 6px 0',
              }}
            >
              Lời Hẹn Ước Trăm Năm
            </p>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.4rem',
                color: '#1E1612',
                fontStyle: 'italic',
                margin: '0 0 12px 0',
              }}
            >
              &ldquo;Nguyện cùng người đi qua giông bão, ngắm trọn hoàng hôn.&rdquo;
            </h3>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px dashed rgba(197, 160, 89, 0.5)',
              margin: '6px 0',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.0rem',
                lineHeight: 1.7,
                color: '#4A3B32',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              &ldquo;Cảm ơn duyên phận đã cho hai đứa gặp nhau, hiểu nhau và cùng bước tới ngày hôm nay. Ngày chúng mình về chung một mái nhà, trân trọng kính mời những người thân yêu nhất đến chung vui và chứng kiến phút giây thiêng liêng này.&rdquo;
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: '2.0rem',
                color: '#801D24',
                margin: '0 0 12px 0',
              }}
            >
              Đại Nghĩa &amp; Trịnh Nhung
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFlip();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(128, 29, 36, 0.1)',
                border: '1px solid rgba(128, 29, 36, 0.3)',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCw size={13} />
              Quay lại mặt trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CARD 2: CEREMONY & VENUE CARD (LỄ & TIỆC CƯỚI TẠI GEM CENTER)
   ══════════════════════════════════════════════════════════════════════ */
function CeremonyVenueCard({ onSelect }) {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING.calendarTarget);

  const handleOpenMap = (e) => {
    e.stopPropagation();
    window.open(
      'https://www.google.com/maps/search/?api=1&query=GEM+Center+8+Nguyen+Binh+Khiem+Quan+1+TP+HCM',
      '_blank'
    );
  };

  const handleAddToCalendar = (e) => {
    e.stopPropagation();
    const title = encodeURIComponent(`Lễ Thành Hôn | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời Quý khách tham dự Lễ Thành Hôn và Tiệc Cưới của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${WEDDING.venueHall} - ${WEDDING.venue}. Đón khách: 17:30, Khai tiệc: 19:00.`
    );
    const location = encodeURIComponent(WEDDING.venueAddress);
    const dates = '20261020T103000Z/20261020T143000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div
      className="flatlay-card-paper"
      onClick={onSelect}
      style={{
        width: '100%',
        maxWidth: '440px',
        padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '999px',
            background: 'rgba(128, 29, 36, 0.08)',
            color: '#801D24',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.64rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          <Calendar size={11} />
          Lễ Cưới &amp; Dạ Yến
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)',
            fontWeight: 600,
            color: '#1E1612',
            margin: '4px 0',
          }}
        >
          Sảnh Castor · Gem Center
        </h3>

        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.78rem',
            color: '#7D6A5D',
            lineHeight: 1.5,
            margin: '0 0 16px 0',
          }}
        >
          Tầng 5 · Số 8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
        </p>
      </div>

      {/* Program Timeline */}
      <div
        style={{
          backgroundColor: '#FAF6EE',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          margin: '10px 0 16px 0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.2)',
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              17:30
            </span>
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.7rem',
                color: '#584A42',
                fontWeight: 600,
              }}
            >
              ĐÓN KHÁCH &amp; CHECK-IN
            </span>
          </div>

          <div
            style={{
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.2)',
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              19:00
            </span>
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.7rem',
                color: '#584A42',
                fontWeight: 600,
              }}
            >
              KHAI TIỆC &amp; HÔN LỄ
            </span>
          </div>
        </div>

        {/* Dress Code Dots */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#801D24',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Dress Code:
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              title="Trắng Sữa"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#FAF6EE',
                border: '1.5px solid #C5A059',
                display: 'inline-block',
              }}
            />
            <span
              title="Be Cát"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#E6D7C3',
                border: '1.5px solid #C5A059',
                display: 'inline-block',
              }}
            />
            <span
              title="Vàng Nhạt"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#F3E5AB',
                border: '1.5px solid #C5A059',
                display: 'inline-block',
              }}
            />
            <span
              title="Đỏ Rượu Vang"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#801D24',
                border: '1.5px solid #C5A059',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                color: '#7D6A5D',
              }}
            >
              (Tone ấm sang trọng)
            </span>
          </div>
        </div>
      </div>

      {/* Mini Countdown */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#801D24',
              display: 'block',
            }}
          >
            {days}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#9A7836', textTransform: 'uppercase' }}>
            Ngày
          </span>
        </div>
        <span style={{ color: '#C5A059', fontWeight: 700 }}>:</span>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#801D24',
              display: 'block',
            }}
          >
            {hours}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#9A7836', textTransform: 'uppercase' }}>
            Giờ
          </span>
        </div>
        <span style={{ color: '#C5A059', fontWeight: 700 }}>:</span>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#801D24',
              display: 'block',
            }}
          >
            {minutes}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#9A7836', textTransform: 'uppercase' }}>
            Phút
          </span>
        </div>
        <span style={{ color: '#C5A059', fontWeight: 700 }}>:</span>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#801D24',
              display: 'block',
            }}
          >
            {seconds}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#9A7836', textTransform: 'uppercase' }}>
            Giây
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button
          type="button"
          onClick={handleOpenMap}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 14px',
            borderRadius: '999px',
            backgroundColor: '#801D24',
            color: '#FAF7F2',
            border: 'none',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <MapPin size={13} />
          Chỉ Đường Map
        </button>

        <button
          type="button"
          onClick={handleAddToCalendar}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 14px',
            borderRadius: '999px',
            backgroundColor: '#FAF4EC',
            color: '#801D24',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Calendar size={13} />
          Lưu Lịch Tiệc
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CARD 3: POLAROID KEEPSAKE STACK (XẤP ẢNH KỶ NIỆM TƯƠNG TÁC)
   ══════════════════════════════════════════════════════════════════════ */
function PolaroidKeepsakeStack({ onSelect, onOpenLightbox }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const photos = GALLERY;
  const currentPhoto = photos[activePhotoIdx];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  return (
    <div
      className="flatlay-card-paper"
      onClick={onSelect}
      style={{
        width: '100%',
        maxWidth: '440px',
        padding: 'clamp(20px, 4vw, 30px)',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '999px',
          background: 'rgba(128, 29, 36, 0.08)',
          color: '#801D24',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.64rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        <Layers size={11} />
        Xấp Ảnh Kỷ Niệm · {activePhotoIdx + 1}/{photos.length}
      </div>

      {/* Realistic Polaroid Frame */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '12px 12px 28px 12px',
          borderRadius: '12px',
          boxShadow: '0 16px 36px rgba(45, 30, 15, 0.16), 0 0 0 1px rgba(0,0,0,0.05)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          width: '100%',
          maxWidth: '320px',
          transform: 'rotate(-2deg)',
          transition: 'transform 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Photo Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            borderRadius: '6px',
            backgroundColor: '#1E1612',
          }}
        >
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title || currentPhoto.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              animation: 'fadeIn 0.35s ease',
            }}
            onError={(e) => {
              e.currentTarget.src = currentPhoto.fallback;
            }}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(activePhotoIdx);
            }}
            aria-label="Phóng to ảnh"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(28, 21, 16, 0.75)',
              color: '#FAF7F2',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Handwritten Style Caption */}
        <div style={{ marginTop: '14px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.2rem',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#1E1612',
              margin: '0 0 2px 0',
            }}
          >
            {currentPhoto.title}
          </p>
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              color: '#8A7A70',
            }}
          >
            {currentPhoto.alt}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={handlePrevPhoto}
          aria-label="Ảnh trước"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#FAF4EC',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            color: '#801D24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#801D24',
            letterSpacing: '0.12em',
          }}
        >
          {activePhotoIdx + 1} / {photos.length}
        </span>

        <button
          type="button"
          onClick={handleNextPhoto}
          aria-label="Ảnh tiếp theo"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#FAF4EC',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            color: '#801D24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CARD 4: RSVP WAX ENVELOPE & VIP TICKET (BÌ THƯ HỒI ĐÁP & VÉ VIP)
   ══════════════════════════════════════════════════════════════════════ */
function RsvpEnvelopeCard({ onSelect }) {
  const [form, setForm] = useState({ name: '', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [vipTicket, setVipTicket] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const randomVip = 'VIP-' + Math.floor(100000 + Math.random() * 900000);
    setVipTicket(randomVip);
    setSubmitted(true);
  };

  return (
    <div
      className="flatlay-card-paper"
      onClick={onSelect}
      style={{
        width: '100%',
        maxWidth: '440px',
        padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px)',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '999px',
          background: 'rgba(128, 29, 36, 0.08)',
          color: '#801D24',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.64rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        <Ticket size={11} />
        Xác Nhận Tham Dự &amp; Vé VIP
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)',
          fontWeight: 600,
          color: '#1E1612',
          margin: '4px 0 6px 0',
        }}
      >
        {submitted ? 'Tấm Vé Danh Dự Của Bạn' : 'Phiếu Hồi Đáp Hỷ Sự'}
      </h3>

      <p
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.76rem',
          color: '#7D6A5D',
          lineHeight: 1.5,
          margin: '0 0 18px 0',
        }}
      >
        {submitted
          ? 'Trân trọng kính đón Quý khách tại Gem Center ngày 20.10.2026'
          : 'Sự hiện diện của bạn là niềm vinh hạnh lớn lao cho gia đình chúng mình'}
      </p>

      {/* CONTENT: FORM OR VIP TICKET */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <label
              htmlFor="guest-name"
              style={{
                display: 'block',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#584A42',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Họ và tên của bạn *
            </label>
            <input
              id="guest-name"
              type="text"
              required
              placeholder="VD: Nguyễn Văn A..."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.84rem',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label
              htmlFor="guest-count"
              style={{
                display: 'block',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#584A42',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Số người tham dự
            </label>
            <select
              id="guest-count"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.84rem',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            >
              <option value="1">1 người (Đi một mình)</option>
              <option value="2">2 người (Đi cùng người thương)</option>
              <option value="3">3 người trở lên (Đi cùng gia đình)</option>
            </select>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label
              htmlFor="guest-message"
              style={{
                display: 'block',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#584A42',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Lời chúc gửi tới đôi uyên ương
            </label>
            <textarea
              id="guest-message"
              rows={2}
              placeholder="Chúc hai bạn trăm năm hạnh phúc..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.84rem',
                boxSizing: 'border-box',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #801D24 0%, #A62B34 100%)',
              color: '#FAF7F2',
              border: 'none',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(128, 29, 36, 0.25)',
              marginTop: '6px',
            }}
          >
            Xác Nhận &amp; Nhận Vé VIP
          </button>
        </form>
      ) : (
        /* GOLDEN FOIL VIP TICKET */
        <div
          onClick={(e) => e.stopPropagation()}
          className="ticket-shimmer-effect"
          style={{
            width: '100%',
            backgroundColor: '#1E1612',
            background: 'linear-gradient(135deg, #241A14 0%, #150F0C 100%)',
            border: '2px solid #C5A059',
            borderRadius: '16px',
            padding: '20px',
            color: '#FAF7F2',
            boxSizing: 'border-box',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px dashed rgba(197, 160, 89, 0.4)',
              paddingBottom: '12px',
              marginBottom: '14px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.64rem',
                  letterSpacing: '0.14em',
                  color: '#C5A059',
                  textTransform: 'uppercase',
                }}
              >
                Royal Wedding Guest Pass
              </span>
              <h4
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem',
                  color: '#FAF7F2',
                  margin: '2px 0 0 0',
                }}
              >
                {form.name}
              </h4>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid #C5A059',
                borderRadius: '8px',
                padding: '4px 10px',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#E5CD94',
              }}
            >
              {vipTicket}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '0.74rem',
              textAlign: 'left',
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            <div>
              <span style={{ color: '#C5A059', display: 'block', fontSize: '0.62rem' }}>
                ĐỊA ĐIỂM
              </span>
              Sảnh Castor · Gem Center
            </div>
            <div>
              <span style={{ color: '#C5A059', display: 'block', fontSize: '0.62rem' }}>
                THỜI GIAN
              </span>
              17:30 · 20.10.2026
            </div>
            <div>
              <span style={{ color: '#C5A059', display: 'block', fontSize: '0.62rem' }}>
                SỐ LƯỢNG
              </span>
              {form.guests} Khách Mời
            </div>
            <div>
              <span style={{ color: '#C5A059', display: 'block', fontSize: '0.62rem' }}>
                TRẠNG THÁI
              </span>
              <span style={{ color: '#68D391', fontWeight: 600 }}>✓ Đã Xác Nhận</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CARD 5: KEEPSAKE GIFT BOX (HỘP QUÀ MỪNG CƯỚI KÍN ĐÁO)
   ══════════════════════════════════════════════════════════════════════ */
function GiftBoxKeepsake({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (accId, number, e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(number);
    } catch {
      const el = document.createElement('textarea');
      el.value = number;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedId(accId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="flatlay-card-paper"
      onClick={onSelect}
      style={{
        width: '100%',
        maxWidth: '440px',
        padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px)',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '999px',
          background: 'rgba(128, 29, 36, 0.08)',
          color: '#801D24',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.64rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        <Gift size={11} />
        Hộp Mừng Cưới Kín Đáo
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)',
          fontWeight: 600,
          color: '#1E1612',
          margin: '4px 0 6px 0',
        }}
      >
        Gửi Trao Chúc Phúc Từ Xa
      </h3>

      <p
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.76rem',
          color: '#7D6A5D',
          lineHeight: 1.5,
          margin: '0 0 16px 0',
        }}
      >
        Sự hiện diện của bạn là món quà quý nhất. Quý khách muốn gửi quà mừng từ xa có thể nhấn mở hộp thông tin bên dưới:
      </p>

      {/* Button to Open Box */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 22px',
          borderRadius: '999px',
          backgroundColor: isOpen ? '#801D24' : '#FAF4EC',
          color: isOpen ? '#FAF7F2' : '#801D24',
          border: '1px solid rgba(197, 160, 89, 0.5)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.76rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        <QrCode size={14} />
        {isOpen ? 'Đóng Thông Tin Mừng Cưới' : 'Mở Mã QR & Số Tài Khoản'}
      </button>

      {/* Expanded Bank Accounts */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: '20px',
            paddingTop: '18px',
            borderTop: '1px dashed rgba(197, 160, 89, 0.4)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeIn 0.35s ease',
          }}
        >
          {BANK_ACCOUNTS.map((acc) => (
            <div
              key={acc.id}
              style={{
                backgroundColor: '#FAF7F2',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textAlign: 'left',
              }}
            >
              <img
                src={acc.qrCode}
                alt={`Mã QR ${acc.role}`}
                style={{
                  width: '74px',
                  height: '74px',
                  objectFit: 'contain',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '4px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              />

              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    color: '#801D24',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  {acc.role} · {acc.bankShort}
                </span>
                <h5
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#1E1612',
                    margin: '2px 0',
                  }}
                >
                  {acc.name}
                </h5>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#9A7836',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {acc.accountNumber}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleCopy(acc.id, acc.accountNumber, e)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: copiedId === acc.id ? '#801D24' : '#FFFFFF',
                    color: copiedId === acc.id ? '#FAF7F2' : '#801D24',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.64rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {copiedId === acc.id ? <Check size={11} /> : <Copy size={11} />}
                  {copiedId === acc.id ? 'Đã chép' : 'Sao chép'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT: STATIONERY SUITE (BÀN TIỆC LỤA HOÀNG GIA)
   ══════════════════════════════════════════════════════════════════════ */
export default function StationerySuite() {
  const [selectedCard, setSelectedCard] = useState(0); // 0: Invitation, 1: Ceremony, 2: Photos, 3: RSVP, 4: Gifts
  const [isFlipped, setIsFlipped] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [viewMode, setViewMode] = useState('focus'); // 'flatlay' or 'focus'

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#hero' || hash === '#invitation' || hash === '#loi-ngo') {
        setSelectedCard(0);
        setViewMode('focus');
      } else if (hash === '#ceremony' || hash === '#events') {
        setSelectedCard(1);
        setViewMode('focus');
      } else if (hash === '#moments' || hash === '#gallery') {
        setSelectedCard(2);
        setViewMode('focus');
      } else if (hash === '#rsvp') {
        setSelectedCard(3);
        setViewMode('focus');
      } else if (hash === '#gifts') {
        setSelectedCard(4);
        setViewMode('focus');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const cardTitles = [
    { title: 'Thiệp Mời', icon: '💌' },
    { title: 'Lễ Tiệc', icon: '🏛️' },
    { title: 'Kỷ Niệm', icon: '📷' },
    { title: 'Hồi Đáp', icon: '🎟️' },
    { title: 'Mừng Cưới', icon: '🧧' },
  ];

  const handleNext = () => {
    setSelectedCard((prev) => (prev < cardTitles.length - 1 ? prev + 1 : 0));
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setSelectedCard((prev) => (prev > 0 ? prev - 1 : cardTitles.length - 1));
    setIsFlipped(false);
  };

  return (
    <section
      id="stationery-suite"
      aria-label="The Royal Interactive Flatlay Suite - Bộ thiệp cưới thủ công thượng lưu"
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF5EE',
        background: 'radial-gradient(ellipse 90% 70% at 50% 30%, #FFFDF9 0%, #F5ECE0 55%, #EBE0CF 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(70px, 10vw, 90px) clamp(14px, 3vw, 24px) 110px',
        boxSizing: 'border-box',
      }}
    >
      {/* Hidden Anchor Spans for Seamless Navigation */}
      <span id="hero" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="loi-ngo" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="ceremony" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="events" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="moments" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="gallery" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="rsvp" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="gifts" style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* ── Top Header Banner ── */}
      <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '640px', marginBottom: '20px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '999px',
            background: 'rgba(128, 29, 36, 0.08)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            color: '#801D24',
            fontFamily: "'Cinzel', serif",
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          <Sparkles size={12} />
          The Royal Stationery Suite
        </div>

        <h1
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            color: '#801D24',
            lineHeight: 1.15,
            margin: '0 0 6px 0',
            fontWeight: 400,
          }}
        >
          Đại Nghĩa &amp; Trịnh Nhung
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            fontStyle: 'italic',
            color: '#6E5D52',
            margin: 0,
          }}
        >
          Chạm vào từng tấm thiệp thủ công để khám phá câu chuyện và thông tin ngày chung đôi
        </p>
      </div>

      {/* ── VIEW MODE 1: FOCUS WALKTHROUGH VIEW ── */}
      {viewMode === 'focus' && (
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {/* Previous Card Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Thẻ trước"
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              color: '#801D24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Active Card */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {selectedCard === 0 && (
              <MainInvitationCard
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
                onSelect={() => {}}
              />
            )}
            {selectedCard === 1 && <CeremonyVenueCard onSelect={() => {}} />}
            {selectedCard === 2 && (
              <PolaroidKeepsakeStack
                onSelect={() => {}}
                onOpenLightbox={(idx) => setLightboxIdx(idx)}
              />
            )}
            {selectedCard === 3 && <RsvpEnvelopeCard onSelect={() => {}} />}
            {selectedCard === 4 && <GiftBoxKeepsake onSelect={() => {}} />}
          </div>

          {/* Next Card Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Thẻ sau"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              color: '#801D24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      {/* ── VIEW MODE 2: FLATLAY OVERVIEW (BÀN TIỆC TOÀN CẢNH) ── */}
      {viewMode === 'flatlay' && (
        <div
          style={{
            width: '100%',
            maxWidth: '1080px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            zIndex: 10,
            animation: 'fadeIn 0.35s ease',
            padding: '10px 0',
          }}
        >
          <div
            onClick={() => {
              setSelectedCard(0);
              setViewMode('focus');
            }}
          >
            <MainInvitationCard
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              onSelect={() => {}}
            />
          </div>

          <div
            onClick={() => {
              setSelectedCard(1);
              setViewMode('focus');
            }}
          >
            <CeremonyVenueCard onSelect={() => {}} />
          </div>

          <div
            onClick={() => {
              setSelectedCard(2);
              setViewMode('focus');
            }}
          >
            <PolaroidKeepsakeStack
              onSelect={() => {}}
              onOpenLightbox={(idx) => setLightboxIdx(idx)}
            />
          </div>

          <div
            onClick={() => {
              setSelectedCard(3);
              setViewMode('focus');
            }}
          >
            <RsvpEnvelopeCard onSelect={() => {}} />
          </div>

          <div
            onClick={() => {
              setSelectedCard(4);
              setViewMode('focus');
            }}
          >
            <GiftBoxKeepsake onSelect={() => {}} />
          </div>
        </div>
      )}

      {/* ── LUXURY BOTTOM FLOATING DOCK BAR ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255, 253, 249, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(197, 160, 89, 0.5)',
          boxShadow: '0 16px 40px rgba(50, 30, 15, 0.18)',
          maxWidth: 'calc(100vw - 28px)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {cardTitles.map((item, idx) => {
          const isActive = selectedCard === idx;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setSelectedCard(idx);
                setViewMode('focus');
                setIsFlipped(false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '999px',
                backgroundColor: isActive ? '#801D24' : 'transparent',
                color: isActive ? '#FAF7F2' : '#4A3B32',
                border: 'none',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </button>
          );
        })}

        {/* View mode toggle */}
        <div
          style={{
            width: '1px',
            height: '24px',
            backgroundColor: 'rgba(197, 160, 89, 0.4)',
            margin: '0 4px',
          }}
        />

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'focus' ? 'flatlay' : 'focus')}
          title={viewMode === 'focus' ? 'Xem toàn cảnh bàn tiệc' : 'Xem chi tiết thẻ'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(197, 160, 89, 0.2)',
            color: '#801D24',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {viewMode === 'focus' ? <Layers size={13} /> : <Eye size={13} />}
          <span>{viewMode === 'focus' ? 'Toàn Cảnh' : 'Tập Trung'}</span>
        </button>
      </div>

      {/* Fullscreen Lightbox for Polaroid Photos */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(12px, 8px, 6px, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Đóng"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>

          <img
            src={GALLERY[lightboxIdx].src}
            alt={GALLERY[lightboxIdx].title}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '12px',
              border: '2px solid rgba(197, 160, 89, 0.5)',
            }}
          />
        </div>
      )}
    </section>
  );
}
