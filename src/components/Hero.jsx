/* ══════════════════════════════════════════════════════════════════════
   HERO — Fine Art Editorial Wedding
   Direction: Full-bleed hero photograph on dark espresso background
   Typography: Names as the dominant editorial element
   Assets: Botanical branch divider, fine champagne rules
   Photo: High-quality editorial wedding photography (Unsplash free license)
   Structure: [Names + date] → [Full-bleed photograph] → [CTA]
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Curated editorial wedding photographs ──
   Source: Unsplash — Free license (unsplash.com/license)
   Replace with real couple photos when available.
   Recommended specs: 3:2 or 16:9, min 2000px wide, editorial/cinematic style */
const EDITORIAL_PHOTOS = {
  hero: {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1800&q=90&fm=webp',
    alt: 'Không gian hôn lễ — ảnh minh họa. Thay thế bằng ảnh thật của cô dâu chú rể.',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85',
  },
};

/* ── Standalone Countdown ── */
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
    { label: 'Ngày',  value: timeLeft.days },
    { label: 'Giờ',   value: timeLeft.hours },
    { label: 'Phút',  value: timeLeft.minutes },
    { label: 'Giây',  value: timeLeft.seconds },
  ];

  return (
    <section aria-label="Đếm ngược đến ngày cưới" style={{
      backgroundColor: '#FDFBF7',
      padding: 'clamp(56px, 8vw, 80px) 24px',
      borderTop: '1px solid rgba(35,27,21,0.07)',
    }}>
      <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>

        <p className="section-label gsap-reveal" style={{ marginBottom: '36px' }}>
          Đếm ngược đến ngày chung đôi
        </p>

        {/* Botanical branch divider */}
        <div className="gsap-reveal" style={{ marginBottom: '32px', opacity: 0.7 }}>
          <img
            src="/Test_06-06-2026/branch-divider.svg"
            alt=""
            role="presentation"
            aria-hidden="true"
            style={{ width: '100%', maxWidth: '300px', height: '40px', display: 'block', margin: '0 auto' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Countdown units — open layout, no card */}
        <div className="gsap-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 3vw, 24px)',
        }}>
          {units.map((u, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 'clamp(16px, 3vw, 24px) 4px' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                fontWeight: 400,
                color: '#231B15',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {String(u.value).padStart(2, '0')}
              </div>
              <div style={{
                width: '20px', height: '1px',
                backgroundColor: '#B89555',
                margin: '6px auto 6px',
                opacity: 0.6,
              }} />
              <div style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.62rem',
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
  const nameRef    = useRef(null);
  const photoRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Staggered name reveal */
      if (nameRef.current) {
        gsap.fromTo(nameRef.current.children,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.15, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        );
      }
      /* Photo reveal */
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.4 }
        );
        /* Gentle parallax */
        gsap.to(photoRef.current.querySelector('img'), {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
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
      '_blank', 'noopener noreferrer'
    );
  };

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        aria-label="Thiệp cưới"
        style={{
          position: 'relative',
          backgroundColor: '#F8F4EC',
          overflow: 'hidden',
          paddingTop: 'clamp(96px, 13vw, 130px)',
          paddingBottom: 0,
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>

          {/* ── Typography block — the dominant visual ── */}
          <div ref={nameRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>

            {/* Save the date eyebrow */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: 'clamp(16px, 3vw, 28px)',
            }}>
              Save the Date
            </p>

            {/* Names — primary visual hierarchy */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 9.5vw, 7.5rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              color: '#231B15',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Đại Nghĩa
            </h1>

            {/* Ampersand — champagne accent */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#B89555',
              lineHeight: 1,
              margin: 'clamp(2px, 0.8vw, 8px) 0',
            }}>
              &amp;
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 9.5vw, 7.5rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              color: '#231B15',
              margin: '0 0 clamp(20px, 3.5vw, 32px)',
              letterSpacing: '-0.02em',
            }}>
              Thị Nhung
            </h1>

            {/* Date + venue — muted, secondary */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#756B63',
              marginBottom: 'clamp(24px, 4vw, 36px)',
              letterSpacing: '0.02em',
            }}>
              20 tháng 10, 2026 &nbsp;·&nbsp; Gem Center, TP. Hồ Chí Minh
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <a
                href="#rsvp"
                className="btn-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' }); }}
                aria-label="Xác nhận tham dự đám cưới Đại Nghĩa và Thị Nhung"
              >
                Xác nhận tham dự
              </a>
              <button
                onClick={addToCalendar}
                className="btn-secondary"
                aria-label="Lưu ngày cưới vào Google Calendar"
              >
                Lưu vào lịch
              </button>
            </div>
          </div>

          {/* ── Hero photograph — editorial full-width ──
               Aspect: 3:2 (landscape) on desktop, 4:5 on mobile
               Photo: Unsplash free license — replace with real couple photos ── */}
          <div
            ref={photoRef}
            style={{ opacity: 0, position: 'relative' }}
          >
            {/* Thin champagne top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5) 20%, rgba(184,149,85,0.5) 80%, transparent)',
              zIndex: 2,
            }} />

            <div style={{
              aspectRatio: 'clamp(4/5, 3/2, 16/9)',
              overflow: 'hidden',
              lineHeight: 0,
            }}>
              <img
                src={EDITORIAL_PHOTOS.hero.src}
                alt={EDITORIAL_PHOTOS.hero.alt}
                loading="eager"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 25%',
                  display: 'block',
                }}
                onError={e => { e.target.src = EDITORIAL_PHOTOS.hero.fallback; }}
              />
            </div>

            {/* Thin champagne bottom accent line */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5) 20%, rgba(184,149,85,0.5) 80%, transparent)',
              zIndex: 2,
            }} />

            {/* Editorial caption — bottom right */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.82rem',
              fontStyle: 'italic',
              color: '#9E9188',
              textAlign: 'right',
              marginTop: '10px',
              paddingRight: '2px',
            }}>
              Hai trái tim, một nhịp đập — 20.10.2026
            </p>
          </div>

        </div>
      </section>

      {/* ── Countdown ── */}
      <CountdownSection />
    </>
  );
}
