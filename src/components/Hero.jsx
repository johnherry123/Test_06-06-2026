/* ══════════════════════════════════════════════════════════════════════
   HERO SECTION — Apple-style Scrollytelling
   Features:
   - GSAP ScrollTrigger reveal animations
   - Floating petal canvas animation
   - Live countdown timer
   - Glassmorphism info badges
   - Parallax photo frame
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from 'react';
import { Calendar, Heart, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const subtitleRef = useRef(null);
  const frameRef   = useRef(null);
  const badgesRef  = useRef(null);
  const timerRef   = useRef(null);
  const ctaRef     = useRef(null);

  /* ── Countdown ── */
  useEffect(() => {
    const targetDate = new Date('2026-10-20T17:30:00+07:00').getTime();
    const update = () => {
      const dist = targetDate - Date.now();
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

  /* ── Petal canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    const resize = () => {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 4.5 + 2.5,
      vx: Math.random() * 0.5 - 0.12,
      vy: Math.random() * 0.6 + 0.25,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.025,
      alpha: Math.random() * 0.35 + 0.15,
      gold: Math.random() > 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.x  += p.vx + Math.sin(Date.now() * 0.0006 + p.rot) * 0.2;
        p.y  += p.vy;
        p.rot += p.rotV;
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(229,195,120,${p.alpha})`
          : `rgba(230,155,170,${p.alpha})`;
        ctx.fill();
        ctx.restore();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Title stagger letter reveal
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
        );
      }
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        );
      }
      if (frameRef.current) {
        tl.fromTo(frameRef.current,
          { y: 50, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.5'
        );
      }
      if (badgesRef.current) {
        tl.fromTo(badgesRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        );
      }
      if (timerRef.current) {
        tl.fromTo(timerRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current.children,
          { y: 16, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
          '-=0.2'
        );
      }

      // Parallax on scroll
      if (frameRef.current) {
        gsap.to(frameRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
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
        padding: 'clamp(120px, 16vw, 160px) 24px clamp(80px, 10vw, 110px)',
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
      }}
    >
      {/* Petals canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />

      {/* Radial bg glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(197,160,89,0.06) 0%, transparent 65%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 5,
        maxWidth: '1080px', width: '100%',
        margin: '0 auto', textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <div className="eyebrow-luxury gsap-reveal" style={{ marginBottom: '18px' }}>
          Save The Date · 20.10.2026
        </div>

        {/* Main title */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          <p className="font-sub" style={{
            fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)',
            fontWeight: 700, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#8B1E22',
            marginBottom: '12px',
          }}>LỄ THÀNH HÔN</p>

          <h1 className="font-display text-gold-luxury" style={{
            fontSize: 'clamp(3rem, 8.5vw, 6rem)',
            fontWeight: 700, lineHeight: 1.1,
            margin: '0 0 8px',
          }}>
            Đại Nghĩa &amp; Thị Nhung
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ opacity: 0 }}>
          <div className="divider-luxury" style={{ margin: '20px auto 28px' }}>
            <span style={{ color: '#C5A059', fontSize: '1.1rem' }}>✦</span>
          </div>
        </div>

        {/* Photo frame */}
        <div
          ref={frameRef}
          className="corner-ornament"
          style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto 44px',
            padding: '10px',
            backgroundColor: '#FFF',
            borderRadius: '12px',
            boxShadow: '0 24px 70px -16px rgba(35,27,21,0.15), 0 0 0 1px rgba(197,160,89,0.28)',
            opacity: 0,
          }}
        >
          {/* Inner photo */}
          <div style={{
            position: 'relative',
            borderRadius: '6px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            backgroundColor: '#F7F4EC',
          }}>
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=90"
              alt="Đại Nghĩa & Thị Nhung"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=90'; }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(24,17,14,0.5) 0%, transparent 45%)',
            }} />
            {/* Caption */}
            <p className="font-serif" style={{
              position: 'absolute', bottom: '18px', left: 0, right: 0,
              textAlign: 'center', color: '#FFF',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontStyle: 'italic',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)', margin: 0,
            }}>
              "Hai trái tim — Một nhịp đập hạnh phúc"
            </p>
          </div>
        </div>

        {/* Badges */}
        <div ref={badgesRef} style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: '14px', marginBottom: '44px',
        }}>
          {[
            { icon: <Calendar size={17} color="#8B1E22" />, text: 'Thứ Ba · 20.10.2026' },
            { icon: <MapPin size={17} color="#8B1E22" />,  text: 'Gem Center · TP.HCM'  },
          ].map((b, i) => (
            <div key={i} className="glass-card" style={{
              display: 'inline-flex', alignItems: 'center',
              gap: '10px', padding: '12px 24px', borderRadius: '100px',
            }}>
              {b.icon}
              <span className="font-sub" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#231B15' }}>
                {b.text}
              </span>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div ref={timerRef} style={{ maxWidth: '560px', margin: '0 auto 48px', opacity: 0 }}>
          <p className="font-sub" style={{
            fontSize: '0.68rem', letterSpacing: '0.3em',
            color: '#8F7E73', textTransform: 'uppercase',
            marginBottom: '18px', fontWeight: 700,
          }}>Đếm ngược ngày chung đôi</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(8px,2vw,16px)' }}>
            {[
              { label: 'Ngày',  value: timeLeft.days },
              { label: 'Giờ',   value: timeLeft.hours },
              { label: 'Phút',  value: timeLeft.minutes },
              { label: 'Giây',  value: timeLeft.seconds },
            ].map((u, i) => (
              <div key={i} className="glass-card" style={{
                padding: 'clamp(14px,2.5vw,22px) 6px',
                textAlign: 'center', borderRadius: '12px',
              }}>
                <div className="font-display text-gold-luxury" style={{
                  fontSize: 'clamp(1.8rem,4.5vw,3rem)',
                  fontWeight: 700, lineHeight: 1, marginBottom: '6px',
                }}>
                  {String(u.value).padStart(2, '0')}
                </div>
                <div className="font-sub" style={{
                  fontSize: '0.65rem', letterSpacing: '0.12em',
                  color: '#8F7E73', textTransform: 'uppercase', fontWeight: 700,
                }}>{u.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center', gap: '16px',
        }}>
          <a href="#rsvp" data-cursor-hover className="btn-crimson" style={{ borderRadius: '100px' }}>
            <Heart size={16} />
            Xác Nhận Tham Dự (RSVP)
          </a>
          <button onClick={addToCalendar} data-cursor-hover className="btn-gold-outline" style={{ borderRadius: '100px' }}>
            <Calendar size={16} />
            Lưu Vào Lịch
          </button>
        </div>
      </div>
    </section>
  );
}
