import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ── Gold dust particles ── */
function GoldDust() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let W, H, raf;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + .3,
      vy: -(Math.random() * .3 + .08),
      vx: (Math.random() - .5) * .15,
      a: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += .006;
        if (p.y < -4) p.y = H + 4;
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
        const op = Math.sin(p.a) * .4 + .55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${op * .75})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />;
}

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(els,
      { opacity: 0, y: 70 },
      { opacity: 1, y: 0, duration: 1.8, stagger: .22, ease: 'power3.out', delay: .3 }
    );
  }, []);

  return (
    <section style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 120% 100% at 50% 100%, #4A0C0C 0%, #1C0408 30%, #0D0209 60%, #080508 100%)',
    }}>

      <GoldDust />

      {/* Warm center glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 35% at 50% 52%, rgba(140,30,20,.1) 0%, transparent 70%)',
      }} />

      {/* Corner brackets */}
      {[[0,0,'0'],[0,1,'90'],[1,0,'270'],[1,1,'180']].map(([r,c,rot],i) => (
        <svg key={i} width="48" height="48" viewBox="0 0 48 48" fill="none" style={{
          position: 'absolute', zIndex: 3, opacity: .45,
          top: r ? 'auto' : '24px', bottom: r ? '24px' : 'auto',
          left: c ? 'auto' : '24px', right: c ? '24px' : 'auto',
          transform: `rotate(${rot}deg)`,
        }}>
          <path d="M2 46L2 2L46 2" stroke="rgba(201,169,110,.8)" strokeWidth="1.5" />
        </svg>
      ))}

      {/* CONTENT */}
      <div ref={ref} style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '0 2rem', width: '100%',
      }}>

        {/* Eyebrow */}
        <p data-reveal className="eyebrow" style={{
          color: 'rgba(201,169,110,.75)', marginBottom: '2.5rem',
          opacity: 0,
        }}>
          Lễ Thành Hôn &nbsp;·&nbsp; 20 · 10 · 2026
        </p>

        {/* Rule */}
        <div data-reveal style={{ opacity: 0, width: '160px', height: '1px', margin: '0 auto 3rem', background: 'linear-gradient(90deg,transparent,rgba(201,169,110,.7),transparent)' }} />

        {/* Name 1 — GIANT */}
        <h1 data-reveal className="f-script" style={{
          fontSize: 'clamp(5.5rem, 18vw, 13rem)',
          color: '#F8EDD5', lineHeight: .88, margin: 0,
          textShadow: '0 0 120px rgba(180,60,20,.25)',
          opacity: 0,
        }}>Đại Nghĩa</h1>

        {/* & separator */}
        <p data-reveal className="f-cormorant" style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontStyle: 'italic', color: 'rgba(201,169,110,.8)',
          margin: '1.2rem 0', opacity: 0,
          letterSpacing: '.08em',
        }}>&amp;</p>

        {/* Name 2 — GIANT */}
        <h1 data-reveal className="f-script" style={{
          fontSize: 'clamp(5.5rem, 18vw, 13rem)',
          color: '#F8EDD5', lineHeight: .88, margin: '0 0 3.5rem',
          textShadow: '0 0 120px rgba(180,60,20,.25)',
          opacity: 0,
        }}>Thị Nhung</h1>

        {/* Rule */}
        <div data-reveal style={{ opacity: 0, width: '220px', height: '1px', margin: '0 auto 2.5rem', background: 'linear-gradient(90deg,transparent,rgba(201,169,110,.7),transparent)' }} />

        {/* Date */}
        <div data-reveal style={{ display: 'inline-flex', alignItems: 'center', gap: '1.2rem', opacity: 0 }}>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to left,rgba(201,169,110,.7),transparent)' }} />
          <span className="f-sans" style={{ fontSize: '10px', letterSpacing: '.55em', color: 'rgba(201,169,110,.75)', textTransform: 'uppercase' }}>
            20 · 10 · 2026
          </span>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to right,rgba(201,169,110,.7),transparent)' }} />
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem',
      }}>
        <span className="f-sans" style={{ fontSize: '7px', letterSpacing: '.6em', color: 'rgba(201,169,110,.4)', textTransform: 'uppercase' }}>Cuộn xuống</span>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom,rgba(201,169,110,.7),transparent)', animation: 'scrollCue 1.8s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
