import { useState, useEffect, useCallback } from 'react';
import { COUPLE, WEDDING, GALLERY, BANK_ACCOUNTS, FAMILY, TRADITIONAL_PARTIES } from '../weddingData';
import {
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  Maximize2,
  X,
  Gift,
  Mail,
  Copy,
  Check,
  Edit3,
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

/* ── Lightweight Confetti Particle Canvas ── */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'tes_confetti_canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#C5A059', '#E5CD94', '#82202B', '#A32936', '#FAF7F2', '#EADBB8'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width * 0.5,
      y: canvas.height * 0.55,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - elapsed / 2800);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    if (elapsed < 2800) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }

  animationFrame = requestAnimationFrame(render);
}

export default function StationerySuite() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING.calendarTarget);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  /* Traditional Wedding Side: 'nhaTrai' or 'nhaGai' */
  const [activeSide, setActiveSide] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const party = params.get('nha') || params.get('side') || params.get('party');
      if (party === 'gai' || party === 'nha-gai' || party === 'bride') return 'nhaGai';
      return 'nhaTrai';
    } catch {
      return 'nhaTrai';
    }
  });

  /* Guest Name personalization from URL parameter (?to=...) */
  const [guestName, setGuestName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to') || params.get('guest');
      return to ? decodeURIComponent(to) : 'Quý Khách Quý';
    } catch {
      return 'Quý Khách Quý';
    }
  });
  const [isEditingGuestName, setIsEditingGuestName] = useState(false);

  /* RSVP Form State */
  const [rsvpState, setRsvpState] = useState({
    name: guestName !== 'Quý Khách Quý' ? guestName : '',
    attending: 'yes',
    side: activeSide,
    guests: '1',
    diet: 'standard',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const curatedPhotos = GALLERY.slice(0, 5);
  const currentParty = TRADITIONAL_PARTIES[activeSide];

  /* Gentle photo rotation */
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % curatedPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [curatedPhotos.length]);

  const handleOpenMap = (url) => {
    window.open(url || currentParty.mapUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${currentParty.title} | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời ${guestName} tham dự ${currentParty.title} của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${currentParty.address}. Nghi thức: ${currentParty.timeCeremony}, Khai tiệc: ${currentParty.timeBanquet}.`
    );
    const location = encodeURIComponent(currentParty.address);
    const dates = '20261020T033000Z/20261020T073000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpState.name.trim()) return;
    setRsvpSubmitted(true);
    launchConfetti();
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
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section
      id="tes_masterpiece_section"
      aria-label="Thiệp cưới truyền thống Đại Nghĩa & Trịnh Nhung"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 70% at 50% 20%, #FFFDF9 0%, #F5ECE0 60%, #EBE0CF 100%)',
        padding: 'clamp(36px, 5vw, 60px) clamp(12px, 3vw, 20px) clamp(45px, 7vw, 75px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
         THE TRADITIONAL ONE-FOLIO MASTERPIECE (THIỆP CƯỚI TRUYỀN THỐNG NHÀ TRAI & NHÀ GÁI)
         ══════════════════════════════════════════════════════════════════════ */}
      <div id="tes_masterpiece_folio" className="tes_masterpiece_card">
        
        {/* 1. Monogram Crest & Salute Ribbon (Căn giữa dọc cân đối, sang trọng) */}
        <div
          id="tes_header_crest_section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            width: '100%',
          }}
        >
          {/* Royal Gilded Monogram Crest */}
          <div
            id="tes_royal_crest"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: 'clamp(30px, 8vw, 55px)',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #C5A059)',
              }}
            />
            
            <div
              id="tes_monogram_badge"
              title="Đôi nhẫn ước hẹn — Nghĩa & Nhung"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5EE 100%)',
                border: '1.5px solid #C5A059',
                boxShadow: '0 6px 18px rgba(197, 160, 89, 0.28), 0 0 0 3px rgba(197, 160, 89, 0.12) inset',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                style={{ filter: 'drop-shadow(0 1px 3px rgba(130, 32, 43, 0.2))' }}
              >
                {/* Left Ring (Gold) */}
                <circle cx="12" cy="17" r="7" stroke="#C5A059" strokeWidth="2" fill="none" />
                {/* Right Ring (Bordeaux) */}
                <circle cx="20" cy="17" r="7" stroke="#82202B" strokeWidth="2" fill="none" opacity="0.9" />
                {/* Diamond Solitaire Accent */}
                <path d="M12 9 L14 11.5 L10 11.5 Z" fill="#C5A059" />
                <circle cx="12" cy="7.5" r="1.5" fill="#FFFDF9" stroke="#C5A059" strokeWidth="0.9" />
              </svg>
            </div>

            <div
              style={{
                width: 'clamp(30px, 8vw, 55px)',
                height: '1px',
                background: 'linear-gradient(to left, transparent, #C5A059)',
              }}
            />
          </div>

          {/* Elegant Guest Salute Ribbon (Clean, Prestigious, Centered) */}
          <div
            id="tes_salute_container"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              boxShadow: '0 4px 14px rgba(50, 30, 15, 0.06)',
              color: '#82202B',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: '#9B7630', textTransform: 'uppercase', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Trân trọng kính mời:
            </span>

            {isEditingGuestName ? (
              <input
                type="text"
                value={guestName}
                autoFocus
                onBlur={() => setIsEditingGuestName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingGuestName(false)}
                onChange={(e) => setGuestName(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: '1.5px solid #82202B',
                  background: 'transparent',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#82202B',
                  outline: 'none',
                  padding: '0 4px',
                  width: '130px',
                }}
              />
            ) : (
              <span
                onClick={() => setIsEditingGuestName(true)}
                title="Chạm để chỉnh sửa tên khách mời"
                style={{
                  fontWeight: 700,
                  color: '#82202B',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {guestName}
                <Edit3 size={11} style={{ opacity: 0.5, marginLeft: '2px' }} />
              </span>
            )}
          </div>
        </div>

        {/* 2. Couple Names Headline (Romantic Cursive Script) */}
        <div style={{ textAlign: 'center', marginBottom: '12px', width: '100%', overflow: 'hidden' }}>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: '#9B7630',
              textTransform: 'uppercase',
              margin: '0 0 6px 0',
            }}
          >
            ✦ LỄ THÀNH HÔN &amp; VU QUY ✦
          </p>

          <h1
            id="tes_couple_headline"
            style={{
              fontFamily: "'Dancing Script', 'Style Script', cursive",
              fontSize: 'clamp(2.1rem, 6vw, 3.0rem)',
              fontWeight: 700,
              color: '#82202B',
              lineHeight: 1.25,
              margin: '0 0 6px 0',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 10px rgba(130, 32, 43, 0.12)',
              letterSpacing: '0.01em',
            }}
          >
            Đại Nghĩa &amp; Trịnh Nhung
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '4px',
            }}
          >
            <div style={{ width: '28px', height: '1px', background: '#C5A059', opacity: 0.6 }} />
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '0.88rem',
                fontStyle: 'italic',
                color: '#5C4D44',
                margin: 0,
              }}
            >
              Trăm năm kết tóc duyên cầm sắt
            </p>
            <div style={{ width: '28px', height: '1px', background: '#C5A059', opacity: 0.6 }} />
          </div>
        </div>

        {/* 3. Central Curated Photo Frame (Organic Soft Rectangle) */}
        <div id="tes_curated_photo_frame" className="tes_curated_photo_container">
          <img
            src={curatedPhotos[activePhotoIdx].src}
            alt={curatedPhotos[activePhotoIdx].title}
            className="tes_curated_photo_img"
          />

          {/* Lightbox Trigger Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Xem ảnh phóng to"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(28, 21, 16, 0.65)',
              color: '#FAF7F2',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            <Maximize2 size={15} />
          </button>

          {/* Discreet Photo Dots Navigation */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(24, 16, 12, 0.6)',
              backdropFilter: 'blur(6px)',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              zIndex: 2,
            }}
          >
            {curatedPhotos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                aria-label={`Chuyển đến ảnh ${idx + 1}`}
                style={{
                  width: activePhotoIdx === idx ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  backgroundColor: activePhotoIdx === idx ? '#C5A059' : 'rgba(255, 255, 255, 0.45)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* 4. Heartfelt Traditional Quote */}
        <p
          id="tes_heartfelt_quote"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(0.98rem, 2vw, 1.12rem)',
            fontStyle: 'italic',
            color: '#3E3129',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: '460px',
            margin: '0 auto 16px auto',
          }}
        >
          &ldquo;Trăm năm kết tóc duyên cầm sắt · Một dạ son vàng nghĩa thủy chung. Kính mời Quý khách cùng người thân đến chung vui trong ngày trọng đại của hai gia đình.&rdquo;
        </p>

        {/* 5. Live Countdown Ribbon */}
        <div id="tes_countdown_ribbon" className="tes_countdown_container">
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
                fontWeight: 700,
                color: '#82202B',
                display: 'block',
              }}
            >
              {days}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.62rem', color: '#7D6A5D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ngày
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.1rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
                fontWeight: 700,
                color: '#82202B',
                display: 'block',
              }}
            >
              {hours}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.62rem', color: '#7D6A5D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Giờ
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.1rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
                fontWeight: 700,
                color: '#82202B',
                display: 'block',
              }}
            >
              {minutes}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.62rem', color: '#7D6A5D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Phút
            </span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.1rem' }}>:</span>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
                fontWeight: 700,
                color: '#82202B',
                display: 'block',
              }}
            >
              {seconds}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.62rem', color: '#7D6A5D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Giây
            </span>
          </div>
        </div>

        {/* 6. TRADITIONAL EVENT DETAILS: SEPARATE NHÀ TRAI & NHÀ GÁI (NO GEM CENTER) */}
        <div id="tes_traditional_section" style={{ width: '100%', marginBottom: '20px' }}>
          
          {/* Party Switcher Tabs (Nhà Gái / Nhà Trai) */}
          <div
            id="tes_party_tabs"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              backgroundColor: 'rgba(197, 160, 89, 0.14)',
              padding: '4px',
              borderRadius: '14px',
              marginBottom: '12px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveSide('nhaTrai')}
              style={{
                padding: '9px 6px',
                borderRadius: '11px',
                border: 'none',
                backgroundColor: activeSide === 'nhaTrai' ? '#82202B' : 'transparent',
                color: activeSide === 'nhaTrai' ? '#FAF7F2' : '#5C4D44',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeSide === 'nhaTrai' ? '0 4px 12px rgba(130, 32, 43, 0.25)' : 'none',
              }}
            >
              🎩 Tiệc Nhà Trai (Thành Hôn)
            </button>

            <button
              type="button"
              onClick={() => setActiveSide('nhaGai')}
              style={{
                padding: '9px 6px',
                borderRadius: '11px',
                border: 'none',
                backgroundColor: activeSide === 'nhaGai' ? '#82202B' : 'transparent',
                color: activeSide === 'nhaGai' ? '#FAF7F2' : '#5C4D44',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeSide === 'nhaGai' ? '0 4px 12px rgba(130, 32, 43, 0.25)' : 'none',
              }}
            >
              🌸 Tiệc Nhà Gái (Vu Quy)
            </button>
          </div>

          {/* Active Party Card Details — Flawless Vietnamese Font */}
          <div id="tes_event_box" className="tes_event_box" style={{ margin: 0 }}>
            {/* Header Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#82202B',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              <Calendar size={13} />
              THỜI GIAN &amp; ĐỊA ĐIỂM
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.35rem, 3.4vw, 1.75rem)',
                fontWeight: 700,
                color: '#261E1A',
                margin: '2px 0 2px 0',
              }}
            >
              {currentParty.title}
            </h3>

            {/* Host Parents Info (Truyền thống tôn trọng song thân) */}
            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#82202B',
                margin: '0 0 2px 0',
              }}
            >
              Kính mời bởi: {currentParty.parents}
            </p>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                color: '#7D6A5D',
                fontStyle: 'italic',
                margin: '0 0 12px 0',
              }}
            >
              {currentParty.brideGroomLine}
            </p>

            {/* Address */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '10px 12px',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                marginBottom: '12px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#261E1A',
                  margin: '0 0 2px 0',
                }}
              >
                {currentParty.badge}
              </p>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.76rem',
                  color: '#5C4D44',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {currentParty.address}
              </p>
            </div>

            {/* 2 Time Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '10px 8px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#82202B',
                    display: 'block',
                  }}
                >
                  {currentParty.timeCeremony}
                </span>
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    color: '#5C4D44',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {currentParty.labelCeremony}
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '10px 8px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#82202B',
                    display: 'block',
                  }}
                >
                  {currentParty.timeBanquet}
                </span>
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    color: '#5C4D44',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {currentParty.labelBanquet}
                </span>
              </div>
            </div>

            {/* 2 Quick Action Buttons: Google Maps & Add Calendar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: 0,
              }}
            >
              <button
                id="tes_btn_maps"
                type="button"
                onClick={() => handleOpenMap(currentParty.mapUrl)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 12px',
                  borderRadius: '999px',
                  backgroundColor: '#82202B',
                  color: '#FAF7F2',
                  border: 'none',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(130, 32, 43, 0.25)',
                }}
              >
                <MapPin size={14} />
                Chỉ Đường Maps
              </button>

              <button
                id="tes_btn_calendar"
                type="button"
                onClick={handleAddToCalendar}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 12px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#82202B',
                  border: '1.5px solid rgba(197, 160, 89, 0.6)',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Calendar size={14} />
                Lưu Lịch Hẹn
              </button>
            </div>
          </div>
        </div>

        {/* 7. Two Smart Action Buttons (Interactive Capsules) */}
        <div
          id="tes_action_capsules"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            marginBottom: '18px',
          }}
        >
          <button
            id="tes_btn_open_rsvp"
            type="button"
            className="tes_btn_pill_primary"
            onClick={() => setShowRsvpModal(true)}
          >
            <Mail size={16} />
            <span>Xác Nhận Tham Dự &amp; Gửi Lời Chúc</span>
          </button>

          <button
            id="tes_btn_open_gift"
            type="button"
            className="tes_btn_pill_secondary"
            onClick={() => setShowGiftModal(true)}
          >
            <Gift size={16} />
            <span>Hộp Mừng Cưới &amp; Mã VietQR</span>
          </button>
        </div>

        {/* 8. Signature Footer Inside the Card */}
        <div
          id="tes_signature_footer"
          style={{
            textAlign: 'center',
            paddingTop: '14px',
            borderTop: '1px solid rgba(197, 160, 89, 0.25)',
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '0.96rem',
              fontStyle: 'italic',
              color: '#5C4D44',
              margin: '0 0 4px 0',
            }}
          >
            Chân thành cảm ơn sự hiện diện và những lời chúc phúc quý báu!
          </p>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              color: '#9B7630',
              letterSpacing: '0.14em',
              fontWeight: 600,
              margin: 0,
            }}
          >
            20 · 10 · 2026 — TP. HỒ CHÍ MINH
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         MODAL 1: RSVP & HEARTFELT WISHES (ĐƠN GIẢN, TINH TẾ)
         ══════════════════════════════════════════════════════════════════════ */}
      {showRsvpModal && (
        <div
          id="tes_rsvp_modal_overlay"
          className="tes_modal_overlay"
          onClick={() => setShowRsvpModal(false)}
        >
          <div
            id="tes_rsvp_modal_card"
            className="tes_modal_card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowRsvpModal(false)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(130, 32, 43, 0.08)',
                color: '#82202B',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={17} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#82202B',
                  margin: '0 0 4px 0',
                }}
              >
                {rsvpSubmitted ? 'Gửi Lời Chúc Thành Công!' : 'Xác Nhận Tham Dự & Gửi Lời Chúc'}
              </h3>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.78rem',
                  color: '#6E5D52',
                  margin: 0,
                }}
              >
                {rsvpSubmitted
                  ? 'Cảm ơn bạn rất nhiều! Lời chúc của bạn đã được trao gửi đến cô dâu & chú rể.'
                  : 'Sự hiện diện của bạn là niềm vinh hạnh to lớn cho hai bên gia đình.'}
              </p>
            </div>

            {!rsvpSubmitted ? (
              <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label
                    htmlFor="tes_input_name"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#3E3129',
                      marginBottom: '4px',
                    }}
                  >
                    Họ và tên của bạn *
                  </label>
                  <input
                    id="tes_input_name"
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn A..."
                    value={rsvpState.name}
                    onChange={(e) => setRsvpState({ ...rsvpState, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(197, 160, 89, 0.5)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.86rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Chọn bên tham dự (Nhà Trai hoặc Nhà Gái) */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#3E3129',
                      marginBottom: '6px',
                    }}
                  >
                    Khách mời của họ
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: rsvpState.side === 'nhaTrai' ? '1.5px solid #82202B' : '1px solid rgba(197, 160, 89, 0.35)',
                        backgroundColor: rsvpState.side === 'nhaTrai' ? 'rgba(130, 32, 43, 0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: '#3E3129',
                      }}
                    >
                      <input
                        type="radio"
                        name="tes_side"
                        value="nhaTrai"
                        checked={rsvpState.side === 'nhaTrai'}
                        onChange={(e) => setRsvpState({ ...rsvpState, side: e.target.value })}
                      />
                      <span>🎩 Họ Nhà Trai</span>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: rsvpState.side === 'nhaGai' ? '1.5px solid #82202B' : '1px solid rgba(197, 160, 89, 0.35)',
                        backgroundColor: rsvpState.side === 'nhaGai' ? 'rgba(130, 32, 43, 0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: '#3E3129',
                      }}
                    >
                      <input
                        type="radio"
                        name="tes_side"
                        value="nhaGai"
                        checked={rsvpState.side === 'nhaGai'}
                        onChange={(e) => setRsvpState({ ...rsvpState, side: e.target.value })}
                      />
                      <span>🌸 Họ Nhà Gái</span>
                    </label>
                  </div>
                </div>

                {/* Attendance Confirmation Radio */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#3E3129',
                      marginBottom: '6px',
                    }}
                  >
                    Khả năng tham dự
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        border: rsvpState.attending === 'yes' ? '1.5px solid #82202B' : '1px solid rgba(197, 160, 89, 0.35)',
                        backgroundColor: rsvpState.attending === 'yes' ? 'rgba(130, 32, 43, 0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#3E3129',
                      }}
                    >
                      <input
                        type="radio"
                        name="tes_attending"
                        value="yes"
                        checked={rsvpState.attending === 'yes'}
                        onChange={(e) => setRsvpState({ ...rsvpState, attending: e.target.value })}
                      />
                      <span>Sẽ đến chung vui 🎉</span>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        border: rsvpState.attending === 'no' ? '1.5px solid #82202B' : '1px solid rgba(197, 160, 89, 0.35)',
                        backgroundColor: rsvpState.attending === 'no' ? 'rgba(130, 32, 43, 0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#3E3129',
                      }}
                    >
                      <input
                        type="radio"
                        name="tes_attending"
                        value="no"
                        checked={rsvpState.attending === 'no'}
                        onChange={(e) => setRsvpState({ ...rsvpState, attending: e.target.value })}
                      />
                      <span>Gửi lời chúc từ xa 💌</span>
                    </label>
                  </div>
                </div>

                {/* Companions (if attending) */}
                {rsvpState.attending === 'yes' && (
                  <div>
                    <label
                      htmlFor="tes_select_guests"
                      style={{
                        display: 'block',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#3E3129',
                        marginBottom: '4px',
                      }}
                    >
                      Số người đi cùng
                    </label>
                    <select
                      id="tes_select_guests"
                      value={rsvpState.guests}
                      onChange={(e) => setRsvpState({ ...rsvpState, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(197, 160, 89, 0.5)',
                        backgroundColor: '#FFFFFF',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.86rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    >
                      <option value="1">1 người (Đi một mình)</option>
                      <option value="2">2 người (Đi cùng người thương)</option>
                      <option value="3">3 người (Đi cùng gia đình)</option>
                      <option value="4">4 người</option>
                    </select>
                  </div>
                )}

                {/* Heartfelt Wish Message */}
                <div>
                  <label
                    htmlFor="tes_textarea_wish"
                    style={{
                      display: 'block',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#3E3129',
                      marginBottom: '4px',
                    }}
                  >
                    Lời chúc gửi tới hai gia đình &amp; đôi uyên ương
                  </label>
                  <textarea
                    id="tes_textarea_wish"
                    rows={3}
                    placeholder="Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương..."
                    value={rsvpState.message}
                    onChange={(e) => setRsvpState({ ...rsvpState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(197, 160, 89, 0.5)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.86rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  id="tes_btn_submit_rsvp"
                  type="submit"
                  className="tes_btn_pill_primary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Sparkles size={16} />
                  <span>Gửi Lời Chúc Phúc</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    border: '1.5px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#82202B',
                    margin: '0 auto 14px auto',
                  }}
                >
                  <Heart size={28} fill="#82202B" />
                </div>

                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: '#3E3129',
                    marginBottom: '10px',
                  }}
                >
                  &ldquo;Cảm ơn {rsvpState.name} đã trao gửi những lời chúc tốt đẹp nhất cho ngày hạnh phúc của chúng mình!&rdquo;
                </p>

                <p
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.8rem',
                    color: '#7D6A5D',
                    marginBottom: '20px',
                  }}
                >
                  Hẹn gặp bạn tại {currentParty.badge} vào ngày 20.10.2026!
                </p>

                <button
                  type="button"
                  onClick={() => setShowRsvpModal(false)}
                  className="tes_btn_pill_primary"
                  style={{ padding: '10px 24px', fontSize: '0.78rem' }}
                >
                  Hoàn Tất
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
         MODAL 2: WEDDING GIFTS & VIETQR (THẺ MỪNG CƯỚI TINH TẾ)
         ══════════════════════════════════════════════════════════════════════ */}
      {showGiftModal && (
        <div
          id="tes_gift_modal_overlay"
          className="tes_modal_overlay"
          onClick={() => setShowGiftModal(false)}
        >
          <div
            id="tes_gift_modal_card"
            className="tes_modal_card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowGiftModal(false)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(130, 32, 43, 0.08)',
                color: '#82202B',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={17} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#82202B',
                  margin: '0 0 4px 0',
                }}
              >
                Hộp Mừng Cưới
              </h3>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.78rem',
                  color: '#6E5D52',
                  margin: 0,
                }}
              >
                Dành cho bạn bè và người thân ở xa muốn gửi gắm tình cảm và lời chúc mừng
              </p>
            </div>

            {/* 2 Bank Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {BANK_ACCOUNTS.map((acc) => (
                <div
                  key={acc.id}
                  style={{
                    backgroundColor: '#FAF5EE',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(197, 160, 89, 0.45)',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  {/* QR Image */}
                  <div
                    style={{
                      width: '85px',
                      height: '85px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '4px',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={acc.qrImage}
                      alt={`VietQR ${acc.ownerRole}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.64rem',
                        color: '#9B7630',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      {acc.ownerRole}
                    </span>
                    <h4
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#261E1A',
                        margin: '2px 0',
                      }}
                    >
                      {acc.owner}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.72rem',
                        color: '#6E5D52',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {acc.bankName}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleCopy(acc.id, acc.accountNumber)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        backgroundColor: copiedId === acc.id ? '#82202B' : '#FFFFFF',
                        color: copiedId === acc.id ? '#FAF7F2' : '#82202B',
                        border: '1px solid rgba(197, 160, 89, 0.5)',
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copiedId === acc.id ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedId === acc.id ? 'Đã sao chép' : acc.accountNumber}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
         LIGHTBOX (PHÓNG TO ẢNH TOÀN MÀN HÌNH)
         ══════════════════════════════════════════════════════════════════════ */}
      {lightboxOpen && (
        <div
          id="tes_lightbox_overlay"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(10, 6, 4, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng phóng to"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
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
            src={curatedPhotos[activePhotoIdx].src}
            alt={curatedPhotos[activePhotoIdx].title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              border: '1.5px solid #C5A059',
            }}
          />
        </div>
      )}
    </section>
  );
}
