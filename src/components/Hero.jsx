import { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin } from 'lucide-react';
import { COUPLE, WEDDING } from '../weddingData';

const MAIN_PHOTO = {
  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=85',
  alt: `${COUPLE.groom.fullName} và ${COUPLE.bride.fullName}`,
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
    // Google Calendar URL generator
    const title = encodeURIComponent(`Lễ Thành Hôn | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
    const details = encodeURIComponent(`Trân trọng kính mời Quý khách tham dự Lễ Thành Hôn và Tiệc Cưới của ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName} tại ${WEDDING.venueHall} - ${WEDDING.venue}.`);
    const location = encodeURIComponent(WEDDING.venueAddress);
    // 2026-10-20 17:30 to 21:30 (UTC+7 -> UTC: 10:30 to 14:30)
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
        background: 'radial-gradient(ellipse 90% 80% at 50% 10%, #FFFDF9 0%, #F5EDE0 100%)',
        padding: 'clamp(64px, 10vw, 110px) clamp(20px, 4vw, 40px) clamp(70px, 10vw, 110px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Floral Accents */}
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
          maxWidth: '780px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Monogram Ribbon */}
        <div
          className="gsap-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 20px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            boxShadow: '0 2px 10px rgba(50, 30, 15, 0.04)',
            marginBottom: '22px',
          }}
        >
          <span style={{ color: '#C5A059', fontSize: '13px' }}>✦</span>
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#801D24',
            }}
          >
            Lễ Thành Hôn · Save The Date
          </span>
          <span style={{ color: '#C5A059', fontSize: '13px' }}>✦</span>
        </div>

        {/* Groom & Bride Names in Romantic Calligraphy & Serif */}
        <h1
          className="gsap-reveal"
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: 'clamp(3.0rem, 8.5vw, 5.0rem)',
            color: '#801D24',
            lineHeight: 1.05,
            margin: '0 0 6px 0',
            fontWeight: 400,
            textShadow: '0 2px 12px rgba(128, 29, 36, 0.08)',
          }}
        >
          {COUPLE.groom.firstName}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#C5A059',
              margin: '0 clamp(10px, 2.5vw, 24px)',
              fontSize: '0.75em',
            }}
          >
            &amp;
          </span>
          {COUPLE.bride.firstName}
        </h1>

        {/* Full Names for Formal Elegance */}
        <p
          className="gsap-reveal"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)',
            fontStyle: 'italic',
            color: '#42332A',
            letterSpacing: '0.04em',
            marginBottom: 'clamp(24px, 4.5vw, 36px)',
          }}
        >
          {COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName}
        </p>

        {/* ── ROMAN ARCH PORTRAIT ── */}
        <div
          className="gsap-reveal arch-gold-border"
          style={{
            width: '100%',
            maxWidth: '460px',
            marginBottom: 'clamp(28px, 5vw, 40px)',
          }}
        >
          <div
            className="arch-frame"
            style={{
              width: '100%',
              aspectRatio: '4 / 5',
              backgroundColor: '#EDE5D8',
            }}
          >
            <img
              src={MAIN_PHOTO.src}
              alt={MAIN_PHOTO.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onError={(e) => {
                e.currentTarget.src = MAIN_PHOTO.fallback;
              }}
            />
            {/* Subtle bottom vignette */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 10, 5, 0.35) 0%, transparent 40%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Date and Location Badge */}
        <div
          className="gsap-reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: 'clamp(26px, 5vw, 38px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#801D24' }}>
            <Calendar size={18} />
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: '#1E1612',
              }}
            >
              20 . 10 . 2026
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7C6E66', fontSize: '0.88rem' }}>
            <MapPin size={15} color="#C5A059" />
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500 }}>
              {WEDDING.venueHall} · {WEDDING.venue}
            </span>
          </div>
        </div>

        {/* ── LIVE 4-CARD COUNTDOWN TIMER ── */}
        <div
          className="gsap-reveal"
          style={{
            width: '100%',
            maxWidth: '440px',
            marginBottom: 'clamp(32px, 6vw, 44px)',
          }}
        >
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9A7836',
              marginBottom: '12px',
            }}
          >
            Đếm ngược ngày chung đôi
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(8px, 2vw, 14px)',
            }}
          >
            {[
              { val: days, label: 'Ngày' },
              { val: hours, label: 'Giờ' },
              { val: minutes, label: 'Phút' },
              { val: seconds, label: 'Giây' },
            ].map((item, idx) => (
              <div key={idx} className="countdown-box">
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(1.35rem, 3.2vw, 1.8rem)',
                    fontWeight: 700,
                    color: '#801D24',
                    lineHeight: 1.1,
                  }}
                >
                  {String(item.val).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#7C6E66',
                    marginTop: '4px',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: RSVP & Calendar */}
        <div
          className="gsap-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#rsvp"
            onClick={scrollToRsvp}
            className="btn-luxury btn-luxury-primary"
            aria-label="Xác nhận tham dự tiệc cưới"
          >
            <Heart size={16} fill="currentColor" />
            Xác nhận tham dự
          </a>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="btn-luxury btn-luxury-outline"
            aria-label="Lưu ngày cưới vào lịch"
          >
            <Calendar size={16} color="#801D24" />
            Thêm vào lịch
          </button>
        </div>
      </div>
    </section>
  );
}
