import { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { COUPLE, WEDDING } from '../weddingData';

const MAIN_PHOTO = {
  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=85',
  alt: `${COUPLE.groom.fullName} & ${COUPLE.bride.fullName}`,
};

function useLiveCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetISO).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  return timeLeft;
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useLiveCountdown(WEDDING.calendarTarget);

  const scrollToRsvp = (e) => {
    e.preventDefault();
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Lễ Thành Hôn | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời Quý khách tham dự Lễ Thành Hôn và Tiệc Cưới của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${WEDDING.venueHall} - ${WEDDING.venue}.`
    );
    const location = encodeURIComponent(WEDDING.venueAddress);
    const dates = '20261020T103000Z/20261020T143000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section
      id="hero"
      aria-label={`Thiệp cưới ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName}`}
      style={{
        position: 'relative',
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 75% at 50% 15%, #FFFDF9 0%, #F5ECE0 100%)',
        padding: 'clamp(90px, 12vw, 120px) clamp(16px, 4vw, 36px) clamp(40px, 6vw, 65px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Subtle Accent Pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(197, 160, 89, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '760px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span id="loi-ngo" style={{ position: 'absolute', top: 0, left: 0 }} />
        {/* Top Header Pill */}
        <div
          className="gsap-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.94)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            boxShadow: '0 2px 10px rgba(50, 30, 15, 0.05)',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={11} color="#C5A059" />
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.60rem, 1.8vw, 0.68rem)',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#801D24',
            }}
          >
            Chương I · Lễ Thành Hôn &amp; Lời Ngỏ
          </span>
          <Sparkles size={11} color="#C5A059" />
        </div>

        {/* Couple Names */}
        <h1
          className="gsap-reveal"
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: 'clamp(2.4rem, 7vw, 4.6rem)',
            color: '#801D24',
            lineHeight: 1.15,
            margin: '0 0 6px 0',
            fontWeight: 400,
            textShadow: '0 2px 14px rgba(128, 29, 36, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span>{COUPLE.groom.firstName}</span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#C5A059',
              fontSize: '0.78em',
            }}
          >
            &amp;
          </span>
          <span>{COUPLE.bride.firstName}</span>
        </h1>

        {/* Full Formal Names */}
        <p
          className="gsap-reveal"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            fontStyle: 'italic',
            color: '#42332A',
            letterSpacing: '0.04em',
            marginBottom: 'clamp(16px, 3vw, 24px)',
          }}
        >
          {COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName}
        </p>

        {/* ── EDITORIAL ROMAN ARCH PORTRAIT ── */}
        <div
          className="gsap-reveal"
          style={{
            width: '100%',
            maxWidth: 'min(300px, 80vw)',
            marginBottom: 'clamp(20px, 4vw, 30px)',
            position: 'relative',
          }}
        >
          {/* Ornate Double Matting & Gold Hairline Border */}
          <div
            style={{
              padding: '8px',
              backgroundColor: '#FFFFFF',
              borderRadius: '160px 160px 16px 16px',
              border: '2px solid #C5A059',
              boxShadow: '0 18px 45px -10px rgba(50, 30, 15, 0.18), 0 0 25px rgba(197, 160, 89, 0.25)',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '150px 150px 10px 10px',
                overflow: 'hidden',
                backgroundColor: '#F0E6D6',
                position: 'relative',
              }}
            >
              <img
                src={MAIN_PHOTO.src}
                alt={MAIN_PHOTO.alt}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                }}
                onError={(e) => {
                  e.currentTarget.src = MAIN_PHOTO.fallback;
                }}
              />
            </div>
          </div>
        </div>

        {/* Poetic Wedding Vow */}
        <p
          className="gsap-reveal"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
            fontStyle: 'italic',
            color: '#584A42',
            maxWidth: '540px',
            lineHeight: 1.7,
            margin: '0 auto clamp(18px, 3.5vw, 26px)',
          }}
        >
          “Tình yêu không phải là tìm một người hoàn hảo, mà là học cách nhìn nhận một người không hoàn hảo một cách trọn vẹn nhất.”
        </p>

        {/* ── MINIMALIST COUNTDOWN BADGE ── */}
        <div
          className="gsap-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(10px, 2.5vw, 18px)',
            padding: '10px clamp(16px, 3vw, 28px)',
            borderRadius: '999px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 8px 24px rgba(50, 30, 15, 0.06)',
            marginBottom: 'clamp(20px, 4vw, 32px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: '#801D24', lineHeight: 1 }}>
              {days}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.58rem', textTransform: 'uppercase', color: '#9A7836', letterSpacing: '0.08em', marginTop: '2px' }}>
              Ngày
            </span>
          </div>

          <span style={{ color: '#C5A059', fontWeight: 300 }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: '#801D24', lineHeight: 1 }}>
              {String(hours).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.58rem', textTransform: 'uppercase', color: '#9A7836', letterSpacing: '0.08em', marginTop: '2px' }}>
              Giờ
            </span>
          </div>

          <span style={{ color: '#C5A059', fontWeight: 300 }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: '#801D24', lineHeight: 1 }}>
              {String(minutes).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.58rem', textTransform: 'uppercase', color: '#9A7836', letterSpacing: '0.08em', marginTop: '2px' }}>
              Phút
            </span>
          </div>

          <span style={{ color: '#C5A059', fontWeight: 300 }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: '#801D24', lineHeight: 1 }}>
              {String(seconds).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '0.58rem', textTransform: 'uppercase', color: '#9A7836', letterSpacing: '0.08em', marginTop: '2px' }}>
              Giây
            </span>
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div
          className="gsap-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#rsvp"
            onClick={scrollToRsvp}
            className="btn-luxury btn-luxury-primary"
            style={{
              padding: '12px 26px',
              fontSize: '0.80rem',
            }}
          >
            <Heart size={14} />
            <span>Xác Nhận Tham Dự (RSVP)</span>
          </a>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="btn-luxury btn-luxury-outline"
            style={{
              padding: '12px 22px',
              fontSize: '0.80rem',
            }}
          >
            <Calendar size={14} />
            <span>Thêm Vào Lịch</span>
          </button>
        </div>
      </div>
    </section>
  );
}
