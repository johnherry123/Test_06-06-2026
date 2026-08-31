/* ══════════════════════════════════════════════════════════════════════
   HERO — Vietnamese Editorial Wedding
   Design: Magazine cover. Names as focal point. One large photograph.
   Removed: petal canvas, countdown, glassmorphism badges, gradient text,
            corner ornaments, eyebrow-luxury class.
   Added: countdown as separate section below.
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Standalone Countdown — separated from hero */
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-10-20T17:30:00+07:00').getTime();
    const update = () => {
      const dist = target - Date.now();
      if (dist > 0) setTimeLeft({
        days:    Math.floor(dist / 86400000),
        hours:   Math.floor((dist % 86400000) / 3600000),
        minutes: Math.floor((dist % 3600000) / 60000),
        seconds: Math.floor((dist % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Ngày',   value: timeLeft.days },
    { label: 'Giờ',    value: timeLeft.hours },
    { label: 'Phút',   value: timeLeft.minutes },
    { label: 'Giây',   value: timeLeft.seconds },
  ];

  return (
    <section style={{
      backgroundColor: '#FDFBF7',
      padding: 'clamp(56px, 8vw, 80px) 24px',
      borderTop: '1px solid rgba(35,27,21,0.08)',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>

        <p className="section-label gsap-reveal" style={{ marginBottom: '40px' }}>
          Đếm ngược đến ngày chung đôi
        </p>

        <div className="gsap-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(35,27,21,0.1)',
          border: '1px solid rgba(35,27,21,0.1)',
        }}>
          {units.map((u, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FDFBF7',
                padding: 'clamp(20px, 4vw, 32px) 8px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 400,
                color: '#231B15',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {String(u.value).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#756B63',
              }}>
                {u.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const photoRef   = useRef(null);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
        );
      }
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
        );
        /* Subtle parallax */
        gsap.to(photoRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToCalendar = () => {
    const t = encodeURIComponent('Lễ Thành Hôn: Đại Nghĩa & Thị Nhung');
    const l = encodeURIComponent('Gem Center, 8 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM');
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=20261020T103000Z/20261020T143000Z&location=${l}`,
      '_blank'
    );
  };

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(100px, 14vw, 140px) 24px clamp(60px, 8vw, 80px)',
          backgroundColor: '#F8F4EC',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>

          {/* Text block — centered */}
          <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}>

            {/* Save the date */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: 'clamp(20px, 4vw, 32px)',
            }}>
              Save the Date
            </p>

            {/* Names — the focal point */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#231B15',
              margin: '0',
              letterSpacing: '-0.01em',
            }}>
              Đại Nghĩa
            </h1>

            {/* Ampersand */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontStyle: 'italic',
              color: '#B89555',
              margin: 'clamp(4px, 1vw, 8px) 0',
              fontWeight: 300,
            }}>
              &amp;
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#231B15',
              margin: '0 0 clamp(24px, 4vw, 36px)',
              letterSpacing: '-0.01em',
            }}>
              Thị Nhung
            </h1>

            {/* Date · Venue */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#756B63',
              marginBottom: 'clamp(28px, 4vw, 40px)',
            }}>
              20.10.2026 &nbsp;·&nbsp; Gem Center, TP.HCM
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <a href="#rsvp" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Xác nhận tham dự
              </a>
              <button onClick={addToCalendar} className="btn-secondary">
                Lưu vào lịch
              </button>
            </div>
          </div>

          {/* Hero photograph */}
          <div
            ref={photoRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '780px',
              margin: '0 auto',
              overflow: 'hidden',
              opacity: 0,
            }}
          >
            {/* Thin top line — editorial detail */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px', backgroundColor: 'rgba(184,149,85,0.4)',
              zIndex: 2,
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '1px', backgroundColor: 'rgba(184,149,85,0.4)',
              zIndex: 2,
            }} />

            <div style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85"
                alt="Đại Nghĩa & Thị Nhung"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  transition: 'transform 8s ease',
                }}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85'; }}
              />
            </div>

            {/* Editorial caption */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.88rem',
              fontStyle: 'italic',
              color: '#756B63',
              textAlign: 'right',
              marginTop: '12px',
              paddingRight: '4px',
            }}>
              Hai trái tim — Một nhịp đập hạnh phúc
            </p>
          </div>

        </div>
      </section>

      {/* Countdown — separate section */}
      <CountdownSection />
    </>
  );
}
