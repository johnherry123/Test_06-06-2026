import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    // Wait two frames so the DOM is fully painted before GSAP queries
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const els = ref.current.querySelectorAll('.hero-anim');
        if (!els.length) {
          // Fallback: make all children visible immediately
          if (ref.current) ref.current.style.opacity = '1';
          return;
        }
        gsap.fromTo(els,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, stagger: .18, duration: 1.8, ease: 'power3.out', delay: .3 }
        );
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=1080&fit=crop&q=90"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 30%',
          zIndex: 0,
        }}
      />

      {/* Cinematic overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,0,0,.75) 0%, rgba(5,0,0,.55) 45%, rgba(5,0,0,.8) 100%)',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,.55) 100%)',
      }} />

      {/* Content */}
      <div ref={ref} style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        padding: '0 24px',
        width: '100%',
      }}>
        <p className="hero-anim eyebrow" style={{
          color: 'rgba(232,201,122,.85)',
          marginBottom: '20px',
          letterSpacing: '.9em',
          opacity: 0,
        }}>
          Lễ Thành Hôn · 20 · 10 · 2026
        </p>

        <div className="hero-anim" style={{
          opacity: 0,
          width: '100px',
          height: '1px',
          margin: '0 auto 28px',
          background: 'linear-gradient(90deg, transparent, rgba(232,201,122,.7), transparent)',
        }} />

        <h1 className="hero-anim f-script" style={{
          opacity: 0,
          fontSize: 'clamp(4.5rem, 18vw, 13rem)',
          color: '#F5ECD8',
          lineHeight: .88,
          margin: 0,
          textShadow: '0 4px 60px rgba(139,0,0,.5), 0 2px 20px rgba(0,0,0,.5)',
        }}>
          Đại Nghĩa
        </h1>

        <p className="hero-anim f-serif" style={{
          opacity: 0,
          fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
          fontStyle: 'italic',
          color: 'rgba(232,201,122,.9)',
          margin: '10px 0',
        }}>
          &amp;
        </p>

        <h1 className="hero-anim f-script" style={{
          opacity: 0,
          fontSize: 'clamp(4.5rem, 18vw, 13rem)',
          color: '#F5ECD8',
          lineHeight: .88,
          margin: '0 0 32px',
          textShadow: '0 4px 60px rgba(139,0,0,.5), 0 2px 20px rgba(0,0,0,.5)',
        }}>
          Thị Nhung
        </h1>

        <div className="hero-anim" style={{
          opacity: 0,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to left, rgba(232,201,122,.7), transparent)' }} />
          <span className="eyebrow" style={{ color: 'rgba(232,201,122,.8)', fontSize: '8px', letterSpacing: '.7em' }}>
            Thứ Ba · 20 Tháng 10 · 2026
          </span>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to right, rgba(232,201,122,.7), transparent)' }} />
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      }}>
        <span className="eyebrow" style={{ color: 'rgba(232,201,122,.35)', fontSize: '7px' }}>Cuộn xuống</span>
        <div style={{
          width: '1px', height: '52px',
          background: 'linear-gradient(to bottom, rgba(232,201,122,.7), transparent)',
          animation: 'scrollCue 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
