import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Heart, MapPin } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   HERO SECTION — Modern Luxury Editorial Frame (No Arch/Tombstone Shapes)
══════════════════════════════════════════════════════════════════════ */

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date('2026-10-20T17:30:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 3,
      speedX: Math.random() * 0.6 - 0.15,
      speedY: Math.random() * 0.8 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.35 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(230, 160, 170, ' : 'rgba(229, 195, 120, ',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius, p.radius * 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Lễ Thành Hôn: Đại Nghĩa & Thị Nhung');
    const details = encodeURIComponent('Trân trọng kính mời Quý khách đến tham dự Lễ Thành Hôn của chúng tôi tại Gem Center TP.HCM.');
    const location = encodeURIComponent('Gem Center, 8 Nguyễn Bỉnh Khiêm, Quận 1, TP. Hồ Chí Minh');
    const startDate = '20261020T103000Z';
    const endDate = '20261020T143000Z';

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleUrl, '_blank');
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div className="eyebrow-luxury" style={{ marginBottom: '14px' }}>
          Save The Date · 20.10.2026
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#8B1E22',
            marginBottom: '16px',
          }}
        >
          LỄ THÀNH HÔN
        </h1>

        {/* Couple Names Headline */}
        <div style={{ margin: '8px 0 20px' }}>
          <h2
            className="font-display text-gold-luxury"
            style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 5.2rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Đại Nghĩa & Thị Nhung
          </h2>
        </div>

        <div className="divider-luxury" style={{ marginBottom: '36px' }}>
          <span style={{ color: '#C5A059', fontSize: '1rem' }}>✦</span>
        </div>

        {/* Modern Luxury Fashion Magazine Frame (Clean 16px Rounded Rect, NO ARCH) */}
        <div
          style={{
            position: 'relative',
            maxWidth: '720px',
            margin: '0 auto 44px',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 20px 60px -15px rgba(35, 27, 21, 0.12), 0 0 0 1px rgba(197, 160, 89, 0.3)',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              backgroundColor: '#F7F4EC',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=90"
              alt="Đại Nghĩa & Thị Nhung"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=90';
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(24, 17, 14, 0.45) 0%, transparent 40%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: 0,
                right: 0,
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                  margin: 0,
                }}
              >
                "Hai trái tim — Một nhịp đập hạnh phúc"
              </p>
            </div>
          </div>
        </div>

        {/* Date & Location Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            className="glass-luxury-card"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '24px',
            }}
          >
            <Calendar size={18} color="#8B1E22" />
            <span
              className="font-display"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#231B15',
              }}
            >
              Thứ Ba · 20.10.2026
            </span>
          </div>

          <div
            className="glass-luxury-card"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '24px',
            }}
          >
            <MapPin size={18} color="#8B1E22" />
            <span
              className="font-display"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#231B15',
              }}
            >
              Gem Center · TP. Hồ Chí Minh
            </span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div style={{ maxWidth: '600px', margin: '0 auto 44px' }}>
          <p
            className="font-display"
            style={{
              fontSize: '0.82rem',
              letterSpacing: '0.2em',
              color: '#8F7E73',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            Đếm ngược ngày chung đôi
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(8px, 2.5vw, 16px)',
            }}
          >
            {[
              { label: 'Ngày', value: timeLeft.days },
              { label: 'Giờ', value: timeLeft.hours },
              { label: 'Phút', value: timeLeft.minutes },
              { label: 'Giây', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="glass-luxury-card"
                style={{
                  padding: 'clamp(14px, 2vw, 20px) 6px',
                  textAlign: 'center',
                  borderRadius: '12px',
                }}
              >
                <div
                  className="font-display text-gold-luxury"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div
                  className="font-sans"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    color: '#8F7E73',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <a href="#rsvp" className="btn-luxury-crimson" style={{ borderRadius: '24px' }}>
            <Heart size={16} />
            Xác Nhận Tham Dự (RSVP)
          </a>

          <button onClick={handleAddToCalendar} className="btn-luxury-gold" style={{ borderRadius: '24px' }}>
            <Calendar size={16} />
            Lưu Vào Lịch Hẹn
          </button>
        </div>
      </div>
    </section>
  );
}
