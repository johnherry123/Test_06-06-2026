import { useState, useEffect, useRef } from 'react';
import { COUPLE, WEDDING, GALLERY, BANK_ACCOUNTS } from '../weddingData';
import {
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Gift,
  Ticket,
  QrCode,
  Check,
  Copy,
  Clock,
  Compass,
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

export default function StationerySuite() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING.calendarTarget);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '1', message: '' });
  const [vipTicket, setVipTicket] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const curatedPhotos = GALLERY.slice(0, 5);

  // Auto rotate photos gently every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % curatedPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [curatedPhotos.length]);

  const handleOpenMap = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=GEM+Center+8+Nguyen+Binh+Khiem+Quan+1+TP+HCM',
      '_blank'
    );
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Thành Hôn | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời Quý khách tham dự Lễ Thành Hôn và Tiệc Cưới của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${WEDDING.venueHall} - ${WEDDING.venue}. Đón khách: 17:30, Khai tiệc: 19:00.`
    );
    const location = encodeURIComponent(WEDDING.venueAddress);
    const dates = '20261020T103000Z/20261020T143000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    const randomVip = 'VIP-' + Math.floor(100000 + Math.random() * 900000);
    setVipTicket(randomVip);
  };

  const handleCopy = (accId, number) => {
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
    <section
      id="grand-invitation"
      aria-label="Thiệp cưới hoàng gia Đại Nghĩa & Trịnh Nhung"
      style={{
        backgroundColor: '#FAF6EE',
        background: 'radial-gradient(ellipse 90% 70% at 50% 20%, #FFFDF9 0%, #F5ECE0 60%, #EBE0CF 100%)',
        padding: 'clamp(50px, 8vw, 85px) clamp(14px, 3.5vw, 24px) clamp(60px, 10vw, 90px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Hidden Anchor Spans for seamless navigation */}
      <span id="hero" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="loi-ngo" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="ceremony" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="events" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="moments" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="gallery" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="rsvp" style={{ position: 'absolute', top: 0, left: 0 }} />
      <span id="gifts" style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* ══════════════════════════════════════════════════════════════════════
         THE GRAND ROYAL INVITATION CARD (TẤM THIỆP CHÍNH LIỀN MẠCH, KHÔNG GIẤU)
         ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="flatlay-card-paper"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: 'clamp(28px, 6vw, 44px) clamp(18px, 5vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Top Royal Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 18px',
            borderRadius: '999px',
            background: 'rgba(128, 29, 36, 0.08)',
            border: '1px solid rgba(197, 160, 89, 0.45)',
            color: '#801D24',
            fontFamily: "'Cinzel', serif",
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Sparkles size={12} />
          Lễ Thành Hôn · 20.10.2026
        </div>

        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.76rem',
            letterSpacing: '0.2em',
            color: '#9A7836',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          Trân Trọng Kính Mời
        </p>

        {/* Names in Calligraphy */}
        <h1
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: 'clamp(2.6rem, 6.5vw, 3.8rem)',
            color: '#801D24',
            lineHeight: 1.12,
            margin: '2px 0 10px 0',
            fontWeight: 400,
          }}
        >
          Đại Nghĩa &amp; Trịnh Nhung
        </h1>

        {/* Roman Arch Portrait */}
        <div
          style={{
            width: 'clamp(180px, 42vw, 220px)',
            height: 'clamp(230px, 52vw, 280px)',
            borderRadius: '110px 110px 16px 16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 16px 36px rgba(50, 30, 15, 0.18)',
            border: '2px solid #C5A059',
            margin: '8px 0 16px 0',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=88&fm=webp"
            alt="Đại Nghĩa & Trịnh Nhung"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(28, 21, 16, 0.85)',
              border: '1px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5ECE0',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            N&amp;N
          </div>
        </div>

        {/* Touching Quote */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.02rem, 2.2vw, 1.2rem)',
            fontStyle: 'italic',
            color: '#4A3B32',
            lineHeight: 1.6,
            maxWidth: '460px',
            margin: '0 0 18px 0',
          }}
        >
          &ldquo;Hai cuộc đời — Một hành trình. Trân trọng kính mời Quý khách cùng gia đình đến chứng kiến và chúc phúc cho giây phút thiêng liêng nhất của chúng mình.&rdquo;
        </p>

        {/* ── LIVE COUNTDOWN (ĐẾM NGƯỢC RÕ RÀNG) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(6px, 2vw, 12px)',
            backgroundColor: '#FAF5EE',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '16px',
            padding: '12px 20px',
            width: '100%',
            maxWidth: '380px',
            marginBottom: '28px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              {days}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#8A7A70', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ngày
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.2rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              {hours}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#8A7A70', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Giờ
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.2rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              {minutes}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#8A7A70', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phút
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.2rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                fontWeight: 700,
                color: '#801D24',
                display: 'block',
              }}
            >
              {seconds}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#8A7A70', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Giây
            </span>
          </div>
        </div>

        {/* ── THÔNG TIN LỄ & TIỆC CƯỚI CỰC KỲ RÕ RÀNG (KHÔNG CẦN TÌM KIẾM) ── */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FAF5EE',
            borderRadius: '20px',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3.5vw, 24px)',
            boxSizing: 'border-box',
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#801D24',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Calendar size={13} />
            Thời Gian &amp; Địa Điểm
          </div>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3.8vw, 1.9rem)',
              fontWeight: 700,
              color: '#1E1612',
              margin: '2px 0 6px 0',
            }}
          >
            Sảnh Castor · Gem Center
          </h3>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.82rem',
              color: '#584A42',
              lineHeight: 1.5,
              margin: '0 0 18px 0',
            }}
          >
            Tầng 5 · Số 8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
          </p>

          {/* 2 Blocks of Time */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px 10px',
                border: '1px solid rgba(197, 160, 89, 0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.3rem',
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
                  fontWeight: 700,
                  color: '#584A42',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                ĐÓN KHÁCH &amp; CHỤP ẢNH
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px 10px',
                border: '1px solid rgba(197, 160, 89, 0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.3rem',
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
                  fontWeight: 700,
                  color: '#584A42',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                KHAI TIỆC &amp; HÔN LỄ
              </span>
            </div>
          </div>

          {/* 2 Big Action Buttons: Google Maps & Add Calendar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <button
              type="button"
              onClick={handleOpenMap}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '999px',
                backgroundColor: '#801D24',
                color: '#FAF7F2',
                border: 'none',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(128, 29, 36, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <MapPin size={15} />
              Chỉ Đường Maps
            </button>

            <button
              type="button"
              onClick={handleAddToCalendar}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                color: '#801D24',
                border: '1.5px solid rgba(197, 160, 89, 0.6)',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Calendar size={15} />
              Lưu Lịch Nhắc Hẹn
            </button>
          </div>

          {/* Dress Code Palette */}
          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px dashed rgba(197, 160, 89, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#801D24',
                letterSpacing: '0.06em',
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
            </div>
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.7rem',
                color: '#7D6A5D',
              }}
            >
              (Trắng sữa, Be cát, Vàng nhạt, Đỏ rượu vang)
            </span>
          </div>
        </div>

        {/* ── BĂNG CHUYỀN ẢNH KỶ NIỆM (TỰ ĐỘNG CHUYỂN HOẶC VUỐT) ── */}
        <div style={{ width: '100%', marginBottom: '28px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 28px rgba(50, 30, 15, 0.12)',
              border: '1.5px solid rgba(197, 160, 89, 0.45)',
              aspectRatio: '16 / 10',
              backgroundColor: '#1E1612',
            }}
          >
            <img
              src={curatedPhotos[activePhotoIdx].src}
              alt={curatedPhotos[activePhotoIdx].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Photo Title Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 16px 12px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                }}
              >
                {curatedPhotos[activePhotoIdx].title}
              </span>

              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.72rem',
                  color: '#C5A059',
                  letterSpacing: '0.12em',
                }}
              >
                {activePhotoIdx + 1} / {curatedPhotos.length}
              </span>
            </div>

            {/* Left / Right mini arrows */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : curatedPhotos.length - 1))
              }
              aria-label="Ảnh trước"
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 21, 16, 0.65)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) => (prev + 1) % curatedPhotos.length)
              }
              aria-label="Ảnh sau"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 21, 16, 0.65)',
                color: '#FFFFFF',
                border: 'none',
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

        {/* ── 2 NÚT HÀNH ĐỘNG LỚN SIÊU DỄ DÙNG (CHO TẤT CẢ KHÁCH MỜI) ── */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Button 1: RSVP */}
          <button
            type="button"
            onClick={() => setShowRsvpModal(true)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #801D24 0%, #A62B34 100%)',
              color: '#FAF7F2',
              border: '1.5px solid #C5A059',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 10px 28px rgba(128, 29, 36, 0.3)',
              transition: 'all 0.25s ease',
            }}
          >
            <Ticket size={18} />
            Xác Nhận Tham Dự &amp; Nhận Vé VIP
          </button>

          {/* Button 2: Gifts */}
          <button
            type="button"
            onClick={() => setShowGiftModal(true)}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              color: '#801D24',
              border: '1.5px solid rgba(197, 160, 89, 0.6)',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            <Gift size={18} />
            Hộp Mừng Cưới &amp; Gửi Lời Chúc (Mã QR)
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         MODAL 1: RSVP POPUP (CỰC KỲ DỄ ĐIỀN)
         ══════════════════════════════════════════════════════════════════════ */}
      {showRsvpModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowRsvpModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(12, 8, 6, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFDF9',
              borderRadius: '24px',
              border: '1.5px solid rgba(197, 160, 89, 0.5)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              padding: 'clamp(24px, 5vw, 32px) clamp(18px, 4vw, 28px)',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowRsvpModal(false)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(128, 29, 36, 0.08)',
                color: '#801D24',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#801D24',
                  margin: '0 0 4px 0',
                }}
              >
                {vipTicket ? 'Tấm Vé Danh Dự Của Bạn' : 'Xác Nhận Tham Dự'}
              </h3>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.78rem',
                  color: '#7D6A5D',
                  margin: 0,
                }}
              >
                {vipTicket
                  ? 'Trân trọng kính đón bạn tại Sảnh Castor · Gem Center'
                  : 'Vui lòng điền họ tên để chúng mình chuẩn bị đón tiếp chu đáo nhất'}
              </p>
            </div>

            {!vipTicket ? (
              <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label
                    htmlFor="modal-name"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#4A3B32',
                      marginBottom: '4px',
                    }}
                  >
                    Họ và tên của bạn *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn A..."
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(197, 160, 89, 0.5)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-guests"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#4A3B32',
                      marginBottom: '4px',
                    }}
                  >
                    Số lượng người đi cùng
                  </label>
                  <select
                    id="modal-guests"
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(197, 160, 89, 0.5)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  >
                    <option value="1">1 người (Đi một mình)</option>
                    <option value="2">2 người (Đi cùng người thương)</option>
                    <option value="3">3 người trở lên (Đi cùng gia đình)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-message"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#4A3B32',
                      marginBottom: '4px',
                    }}
                  >
                    Lời chúc gửi tới cô dâu &amp; chú rể
                  </label>
                  <textarea
                    id="modal-message"
                    rows={2}
                    placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(197, 160, 89, 0.5)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
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
                    padding: '14px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #801D24 0%, #A62B34 100%)',
                    color: '#FAF7F2',
                    border: 'none',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(128, 29, 36, 0.25)',
                    marginTop: '6px',
                  }}
                >
                  Gửi Xác Nhận &amp; Nhận Vé VIP
                </button>
              </form>
            ) : (
              /* GOLDEN FOIL VIP TICKET */
              <div
                className="ticket-shimmer-effect"
                style={{
                  backgroundColor: '#1C1510',
                  background: 'linear-gradient(135deg, #241A14 0%, #150F0C 100%)',
                  border: '2px solid #C5A059',
                  borderRadius: '16px',
                  padding: '20px',
                  color: '#FAF7F2',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'left',
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
                        fontSize: '0.66rem',
                        letterSpacing: '0.14em',
                        color: '#C5A059',
                        textTransform: 'uppercase',
                      }}
                    >
                      Royal Wedding VIP Pass
                    </span>
                    <h4
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.35rem',
                        color: '#FAF7F2',
                        margin: '2px 0 0 0',
                      }}
                    >
                      {rsvpForm.name}
                    </h4>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(197, 160, 89, 0.15)',
                      border: '1px solid #C5A059',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.84rem',
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
                    gap: '10px',
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  <div>
                    <span style={{ color: '#C5A059', display: 'block', fontSize: '0.64rem' }}>
                      ĐỊA ĐIỂM
                    </span>
                    Sảnh Castor · Gem Center
                  </div>
                  <div>
                    <span style={{ color: '#C5A059', display: 'block', fontSize: '0.64rem' }}>
                      THỜI GIAN
                    </span>
                    17:30 · 20.10.2026
                  </div>
                  <div>
                    <span style={{ color: '#C5A059', display: 'block', fontSize: '0.64rem' }}>
                      SỐ LƯỢNG
                    </span>
                    {rsvpForm.guests} Khách Mời
                  </div>
                  <div>
                    <span style={{ color: '#C5A059', display: 'block', fontSize: '0.64rem' }}>
                      TRẠNG THÁI
                    </span>
                    <span style={{ color: '#68D391', fontWeight: 600 }}>✓ Đã Xác Nhận</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
         MODAL 2: GIFTS POPUP (MÃ QR & SỐ TÀI KHOẢN KÈM NÚT SAO CHÉP 1 CHẠM)
         ══════════════════════════════════════════════════════════════════════ */}
      {showGiftModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowGiftModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(12, 8, 6, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFDF9',
              borderRadius: '24px',
              border: '1.5px solid rgba(197, 160, 89, 0.5)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              padding: 'clamp(24px, 5vw, 32px) clamp(18px, 4vw, 28px)',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowGiftModal(false)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(128, 29, 36, 0.08)',
                color: '#801D24',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(128, 29, 36, 0.08)',
                  color: '#801D24',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                <Gift size={12} />
                Gửi Trao Chúc Phúc
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#801D24',
                  margin: '0 0 4px 0',
                }}
              >
                Hộp Mừng Cưới Từ Xa
              </h3>

              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.78rem',
                  color: '#7D6A5D',
                  margin: 0,
                }}
              >
                Quý khách có thể quét mã QR hoặc sao chép số tài khoản bên dưới:
              </p>
            </div>

            {/* 2 Bank Accounts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {BANK_ACCOUNTS.map((acc) => (
                <div
                  key={acc.id}
                  style={{
                    backgroundColor: '#FAF7F2',
                    borderRadius: '16px',
                    padding: '14px',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <img
                    src={acc.qrCode}
                    alt={`Mã QR ${acc.role}`}
                    style={{
                      width: '76px',
                      height: '76px',
                      objectFit: 'contain',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '4px',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                    }}
                  />

                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        color: '#801D24',
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      Mừng Cưới · {acc.role} ({acc.bankShort})
                    </span>

                    <h5
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.1rem',
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
                        fontSize: '0.92rem',
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
                      onClick={() => handleCopy(acc.id, acc.accountNumber)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        backgroundColor: copiedId === acc.id ? '#801D24' : '#FFFFFF',
                        color: copiedId === acc.id ? '#FAF7F2' : '#801D24',
                        border: '1px solid rgba(197, 160, 89, 0.45)',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {copiedId === acc.id ? <Check size={12} /> : <Copy size={12} />}
                      {copiedId === acc.id ? 'Đã sao chép' : 'Sao chép STK'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
