import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════
   YOUTUBE MUSIC PLAYER — Em Đồng Ý
═══════════════════════════════════════════════ */
const YT_VIDEO_ID = 'IOe0tNoUGv8';

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) { resolve(window.YT); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
}

/* ═══════════════════════════════════════════════
   CANVAS PARTICLE ENGINE — Ultra Gold Dust (60fps)
   Particle types: orb, star, spark
═══════════════════════════════════════════════ */
function GoldDust({ burst, burstOrigin }) {
  const canvas = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  const makeAmbient = () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    r:     Math.random() * 2.2 + 0.4,
    vx:    (Math.random() - 0.5) * 0.22,
    vy:    -(Math.random() * 0.45 + 0.06),
    phase: Math.random() * Math.PI * 2,
    spd:   0.006 + Math.random() * 0.007,
    hue:   38 + Math.random() * 22,
    type:  Math.random() > 0.7 ? 'star' : 'orb',
    life:  1,
    burst: false,
  });

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');

    const resize = () => {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 120 ambient particles
    particles.current = Array.from({ length: 120 }, makeAmbient);

    const drawStar = (ctx, x, y, r, alpha, hue) => {
      const spikes = 4;
      const outer = r * 3.5;
      const inner = r * 1.2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tRef.current * 0.008);
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outer : inner;
        const angle = (i * Math.PI) / spikes;
        if (i === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue}, 95%, 82%, ${alpha * 0.9})`;
      ctx.fill();
      // Core glow
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, outer);
      grd.addColorStop(0, `hsla(${hue}, 100%, 95%, ${alpha})`);
      grd.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);
      ctx.beginPath();
      ctx.arc(0, 0, outer, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    };

    const drawOrb = (ctx, x, y, r, alpha, hue) => {
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 4.5);
      grd.addColorStop(0,   `hsla(${hue}, 95%, 90%, ${alpha})`);
      grd.addColorStop(0.3, `hsla(${hue}, 85%, 72%, ${alpha * 0.7})`);
      grd.addColorStop(0.7, `hsla(${hue}, 70%, 50%, ${alpha * 0.3})`);
      grd.addColorStop(1,   `hsla(${hue}, 60%, 35%, 0)`);
      ctx.beginPath();
      ctx.arc(x, y, r * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      // Bright white core
      ctx.beginPath();
      ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(50, 100%, 98%, ${alpha})`;
      ctx.fill();
    };

    const draw = () => {
      tRef.current++;
      ctx.clearRect(0, 0, c.width, c.height);

      particles.current.forEach((p, i) => {
        if (p.burst) {
          // Burst particles: fly out then fade
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04; // gravity
          p.life -= 0.018;
          if (p.life <= 0) {
            particles.current[i] = makeAmbient();
            return;
          }
          const a = Math.max(0, p.life * 0.9);
          if (p.type === 'star') drawStar(ctx, p.x, p.y, p.r, a, p.hue);
          else drawOrb(ctx, p.x, p.y, p.r, a, p.hue);
        } else {
          // Ambient float
          p.x += p.vx + Math.sin(tRef.current * 0.009 + p.phase) * 0.14;
          p.y += p.vy;
          if (p.y < -10) { p.y = c.height + 5; p.x = Math.random() * c.width; }
          if (p.x < -5 || p.x > c.width + 5) p.x = Math.random() * c.width;

          const alpha = ((Math.sin(tRef.current * p.spd + p.phase) + 1) / 2) * 0.75;
          if (p.type === 'star') drawStar(ctx, p.x, p.y, p.r, alpha, p.hue);
          else drawOrb(ctx, p.x, p.y, p.r, alpha, p.hue);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Handle burst
  useEffect(() => {
    if (!burst || !burstOrigin) return;
    const { x, y } = burstOrigin;
    // Replace 80 particles with burst particles
    const burstCount = 80;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.3;
      const speed = Math.random() * 9 + 2;
      const hue = 35 + Math.random() * 30;
      particles.current[i] = {
        x, y,
        r: Math.random() * 2.5 + 0.8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        phase: 0,
        spd: 0.01,
        hue,
        type: Math.random() > 0.5 ? 'star' : 'orb',
        life: 0.9 + Math.random() * 0.5,
        burst: true,
      };
    }
  }, [burst, burstOrigin]);

  return <canvas ref={canvas} style={{
    position: 'absolute', inset: 0,
    pointerEvents: 'none', zIndex: 3,
  }} />;
}

/* ═══════════════════════════════════════════════
   LIGHT RAYS — cinematic crepuscular rays
═══════════════════════════════════════════════ */
function LightRays({ visible }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const c = canvasRef.current;
    if (!c) return;
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    const ctx = c.getContext('2d');
    let t = 0;
    let opacity = 0;

    const draw = () => {
      t++;
      if (opacity < 1) opacity = Math.min(1, opacity + 0.025);
      ctx.clearRect(0, 0, c.width, c.height);

      const cx = c.width / 2;
      const cy = c.height / 2;
      const numRays = 14;

      for (let i = 0; i < numRays; i++) {
        const baseAngle = (Math.PI * 2 * i) / numRays;
        const angle = baseAngle + Math.sin(t * 0.005 + i * 0.5) * 0.08;
        const len = Math.min(c.width, c.height) * (0.7 + Math.sin(t * 0.008 + i) * 0.15);
        const width = 18 + Math.sin(t * 0.012 + i * 0.8) * 10;
        const rayAlpha = (0.04 + Math.sin(t * 0.01 + i) * 0.02) * opacity;

        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;

        const grd = ctx.createLinearGradient(cx, cy, x2, y2);
        grd.addColorStop(0,   `rgba(255, 240, 160, ${rayAlpha * 2.5})`);
        grd.addColorStop(0.3, `rgba(220, 185, 80, ${rayAlpha})`);
        grd.addColorStop(1,   'rgba(180, 130, 40, 0)');

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-width / 2, 0);
        ctx.lineTo(width / 2, 0);
        ctx.lineTo(width * 1.5, len);
        ctx.lineTo(-width * 1.5, len);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      }

      // Central glow
      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.height * 0.5);
      radial.addColorStop(0, `rgba(255, 245, 180, ${0.35 * opacity})`);
      radial.addColorStop(0.3, `rgba(220, 180, 60, ${0.1 * opacity})`);
      radial.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, c.height * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = radial;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  if (!visible) return null;
  return <canvas ref={canvasRef} style={{
    position: 'absolute', inset: 0,
    pointerEvents: 'none', zIndex: 2,
    mixBlendMode: 'screen',
  }} />;
}

/* ═══════════════════════════════════════════════
   WAX SEAL COMPONENT — Enhanced
═══════════════════════════════════════════════ */
function WaxSeal({ sealRef, ring1Ref, ring2Ref, ring3Ref, onClick }) {
  return (
    <div
      ref={sealRef}
      onClick={onClick}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(100px, 11vw, 136px)',
        height: 'clamp(100px, 11vw, 136px)',
        cursor: 'pointer', zIndex: 30,
      }}
    >
      {/* Outer halo pulse — 3 rings */}
      <div style={{
        position: 'absolute', inset: '-28px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,.18) 0%, transparent 70%)',
        animation: 'haloPulse 2.2s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '-18px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,.12) 0%, transparent 70%)',
        animation: 'haloPulse 2.2s ease-in-out infinite 0.4s',
      }} />

      {/* Ring 1 — slow CW dashed */}
      <div ref={ring1Ref} style={{
        position: 'absolute', inset: '-10px', borderRadius: '50%',
        border: '1px dashed rgba(212,175,55,.6)',
        transformOrigin: 'center center',
      }} />

      {/* Ring 2 — faster CCW solid */}
      <div ref={ring2Ref} style={{
        position: 'absolute', inset: '-3px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,.3)',
        transformOrigin: 'center center',
      }} />

      {/* Ring 3 — inner subtle */}
      <div ref={ring3Ref} style={{
        position: 'absolute', inset: '4px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,.15)',
        transformOrigin: 'center center',
      }} />

      {/* Seal body */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 26%, #FFF8E1 0%, #E8C97A 18%, #D4AF37 32%, #9B7412 55%, #5A3E00 78%, #2A1800 100%)',
        boxShadow: [
          '0 0 0 2px rgba(212,175,55,.8)',
          '0 0 0 6px rgba(212,175,55,.15)',
          '0 30px 80px rgba(0,0,0,.98)',
          '0 8px 24px rgba(0,0,0,.7)',
          'inset 0 3px 8px rgba(255,255,255,.7)',
          'inset 0 -5px 16px rgba(0,0,0,.8)',
        ].join(', '),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'sealPulse 2.8s ease-in-out infinite',
      }}>
        {/* Texture rings */}
        <div style={{
          position: 'absolute', inset: '7px', borderRadius: '50%',
          border: '1px solid rgba(139,101,8,.5)',
        }} />
        <div style={{
          position: 'absolute', inset: '14px', borderRadius: '50%',
          border: '0.5px solid rgba(212,175,55,.2)',
        }} />
        {/* Character */}
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
          color: '#1A0005',
          fontWeight: 700,
          textShadow: '0 1px 5px rgba(255,255,255,.6), 0 -1px 3px rgba(0,0,0,.5)',
          lineHeight: 1,
          position: 'relative', zIndex: 2,
          userSelect: 'none',
        }}>囍</span>
      </div>

      {/* Hover prompt text */}
      <div style={{
        position: 'absolute', top: '110%', left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '8px', letterSpacing: '.5em', textTransform: 'uppercase',
        color: 'rgba(212,175,55,.5)',
        animation: 'hintBlink 2.4s ease-in-out infinite',
        marginTop: '8px',
        pointerEvents: 'none',
      }}>
        Chạm để mở
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DOOR PANEL COMPONENT — Enhanced 3D + Dynamic Shadow
═══════════════════════════════════════════════ */
function DoorPanel({ side, name, panelRef, openProgress }) {
  const isLeft = side === 'left';
  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute', top: 0, height: '100%', width: '50%',
        [isLeft ? 'left' : 'right']: 0,
        transformOrigin: `${isLeft ? 'left' : 'right'} center`,
        transformStyle: 'preserve-3d',
        backgroundImage: `url("${import.meta.env.BASE_URL}gate-bg.png")`,
        backgroundSize: '200% 100%',
        backgroundPosition: `${isLeft ? 'left' : 'right'} center`,
        backgroundRepeat: 'no-repeat',
        [isLeft ? 'borderRight' : 'borderLeft']: '3px solid #D4AF37',
        boxShadow: isLeft
          ? 'inset -100px 0 200px rgba(0,0,0,.8), 24px 0 60px rgba(0,0,0,.98)'
          : 'inset 100px 0 200px rgba(0,0,0,.8), -24px 0 60px rgba(0,0,0,.98)',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Darkening gradient from hinge — depth illusion */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isLeft
          ? 'linear-gradient(to right, rgba(0,0,0,.6) 0%, rgba(0,0,0,.15) 55%, transparent 100%)'
          : 'linear-gradient(to left,  rgba(0,0,0,.6) 0%, rgba(0,0,0,.15) 55%, transparent 100%)',
      }} />

      {/* Edge light strip — bright rim when door is opening */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isLeft ? 'right' : 'left']: 0,
        width: '4px',
        background: 'linear-gradient(to bottom, transparent, rgba(255,235,160,.35) 20%, rgba(255,220,100,.6) 50%, rgba(255,235,160,.35) 80%, transparent)',
        pointerEvents: 'none', zIndex: 4,
      }} />

      {/* Worn texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        opacity: 0.6,
        mixBlendMode: 'overlay',
      }} />

      {/* Gold inner frame */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(212,175,55,.65)', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(212,175,55,.25)', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', inset: '30px', border: '0.5px solid rgba(212,175,55,.08)', pointerEvents: 'none', zIndex: 3 }} />

      {/* Corner ornaments */}
      {[
        { top: '16px',   left: '16px',  rot: '0deg'   },
        { top: '16px',   right: '16px', rot: '90deg'  },
        { bottom:'16px', left: '16px',  rot: '270deg' },
        { bottom:'16px', right:'16px',  rot: '180deg' },
      ].map((c, i) => (
        <svg key={i} style={{ position:'absolute', ...c, transform:`rotate(${c.rot})`, width:'24px', height:'24px', zIndex:4, pointerEvents:'none' }} viewBox="0 0 24 24" fill="none">
          <path d="M0 24 L0 0 L24 0" stroke="rgba(212,175,55,.8)" strokeWidth="1.5" fill="none"/>
          <circle cx="0" cy="0" r="3" fill="rgba(212,175,55,.65)"/>
          <circle cx="0" cy="0" r="1.2" fill="rgba(255,240,180,.5)"/>
        </svg>
      ))}

      {/* Dragon/Phoenix decorative motif at center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', aspectRatio: '1',
        opacity: 0.06,
        background: 'radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Name label at bottom */}
      <div style={{ position: 'absolute', bottom: '9%', left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <div style={{ display: 'inline-block' }}>
          <div style={{
            width: '100%', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,.7), transparent)',
            marginBottom: '10px',
          }} />
          <h2 style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
            color: '#F3E5AB',
            margin: 0,
            letterSpacing: '.04em',
            textShadow: [
              '0 0 50px rgba(212,175,55,1)',
              '0 0 100px rgba(212,175,55,.5)',
              '0 4px 20px rgba(0,0,0,.98)',
            ].join(', '),
          }}>
            {name}
          </h2>
          <div style={{
            width: '100%', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,.9), transparent)',
            marginTop: '10px',
          }} />
        </div>
      </div>

      {/* Metallic hinges — 3 hinges */}
      {[0.14, 0.5, 0.86].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `calc(${pos * 100}% - 26px)`,
          [isLeft ? 'right' : 'left']: '-1px',
          width: '22px', height: '52px',
          background: 'linear-gradient(180deg, #3A2700 0%, #8B6508 18%, #D4AF37 35%, #FFF8E1 50%, #D4AF37 65%, #8B6508 82%, #3A2700 100%)',
          borderRadius: '3px',
          boxShadow: '0 4px 14px rgba(0,0,0,.9), inset 0 1px 2px rgba(255,255,255,.2)',
          zIndex: 6,
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '10px', height: '10px', borderRadius: '50%',
            background: 'radial-gradient(circle at 33% 33%, #FFF8E1, #C8A020 55%, #5A3E00)',
            transform: 'translate(-50%, -50%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,.6)',
          }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN GATE INTRO
═══════════════════════════════════════════════ */
export default function GateIntro({ onOpen }) {
  const container  = useRef(null);
  const leftDoor   = useRef(null);
  const rightDoor  = useRef(null);
  const sealRef    = useRef(null);
  const ring1Ref   = useRef(null);
  const ring2Ref   = useRef(null);
  const ring3Ref   = useRef(null);
  const glowRef    = useRef(null);
  const seamRef    = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytContainerRef = useRef(null);
  const topBarRef  = useRef(null);
  const botBarRef  = useRef(null);
  const [interacted, setInteracted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [showRays, setShowRays] = useState(false);
  const [burst, setBurst] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Initial door set
    gsap.set([leftDoor.current, rightDoor.current], { rotateY: 0 });

    // Subtle breathing sway
    gsap.to(leftDoor.current,  { rotateY: -1.8, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to(rightDoor.current, { rotateY:  1.8, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.4 });

    // Seal animations
    gsap.to(sealRef.current, { scale: 1.07, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to(ring1Ref.current, { rotation:  360, duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 12, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to(ring3Ref.current, { rotation:  360, duration: 30, repeat: -1, ease: 'none', transformOrigin: 'center center' });

    // Glow pulse
    gsap.to('.gate-bg-glow', { opacity: 0.22, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Preload YouTube API
    loadYouTubeAPI().then((YT) => {
      if (!ytContainerRef.current) return;
      ytPlayerRef.current = new YT.Player(ytContainerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: YT_VIDEO_ID, rel: 0, modestbranding: 1, start: 0 },
        events: { onReady: () => setMusicReady(true) },
      });
    });

    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const toggleMusic = useCallback(() => {
    const player = ytPlayerRef.current;
    if (!player) return;
    if (musicPlaying) { player.pauseVideo(); setMusicPlaying(false); }
    else { player.playVideo(); setMusicPlaying(true); }
  }, [musicPlaying]);

  const handleOpen = () => {
    if (interacted) return;
    setInteracted(true);

    // Get seal position for burst origin
    const sealEl = sealRef.current;
    if (sealEl) {
      const rect = sealEl.getBoundingClientRect();
      setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setBurst(true);

    gsap.killTweensOf([leftDoor.current, rightDoor.current]);

    // Play music
    if (ytPlayerRef.current && musicReady) {
      ytPlayerRef.current.setVolume(52);
      ytPlayerRef.current.playVideo();
      setMusicPlaying(true);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onOpen?.();
      },
    });

    // 1. Seal cracks: expand + shatter out
    tl.to(sealRef.current, {
      scale: 0, opacity: 0, duration: 0.45,
      ease: 'back.in(4)',
    }, 0);

    // 2. Cinematic screen shake — very slight, organic
    tl.to(container.current, {
      x: -4, duration: 0.06, ease: 'none',
    }, 0.3);
    tl.to(container.current, {
      x: 5, duration: 0.07, ease: 'none',
    }, 0.36);
    tl.to(container.current, {
      x: -3, duration: 0.06, ease: 'none',
    }, 0.43);
    tl.to(container.current, {
      x: 0, duration: 0.1, ease: 'power2.out',
    }, 0.49);

    // 3. Doors swing open — weighted, cinematic
    tl.to(leftDoor.current, {
      rotateY: -122,
      duration: 3.6,
      ease: 'power3.inOut',
    }, 0.38);
    tl.to(rightDoor.current, {
      rotateY: 122,
      duration: 3.6,
      ease: 'power3.inOut',
    }, 0.38);

    // 4. Gold seam brightens
    tl.to(seamRef.current, {
      boxShadow: '0 0 80px 30px rgba(212,175,55,1)',
      width: '4px',
      duration: 1.6, ease: 'power2.out',
    }, 0.5);

    // 5. Light rays appear
    tl.add(() => setShowRays(true), 1.2);

    // 6. Glow burst from behind doors
    tl.fromTo(glowRef.current,
      { scale: 0.2, opacity: 0 },
      { scale: 10, opacity: 1, duration: 2.2, ease: 'power2.out' },
      1.8
    );

    // 7. Top/bottom bars slide out
    tl.to(topBarRef.current, { y: '-100%', duration: 1.1, ease: 'power2.inOut' }, 2.3);
    tl.to(botBarRef.current, { y: '100%',  duration: 1.1, ease: 'power2.inOut' }, 2.3);

    // 8. Fade whole screen
    tl.to(container.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 2.9);
    tl.set(container.current, { display: 'none' });
  };

  return (
    <div
      ref={container}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        perspective: '3200px',
        perspectiveOrigin: '50% 50%',
        background: 'radial-gradient(ellipse 120% 110% at 50% 60%, #2A0408 0%, #120002 45%, #060001 80%, #030000 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes haloPulse {
          0%,100% { transform: scale(1);   opacity: .65; }
          50%      { transform: scale(1.5); opacity: .15; }
        }
        @keyframes hintBlink {
          0%,100% { opacity: 0; }
          50%      { opacity: .75; }
        }
        @keyframes musicPulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212,175,55,.4); }
          50%      { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(212,175,55,0); }
        }
        @keyframes sealPulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(212,175,55,.8), 0 0 0 6px rgba(212,175,55,.15), 0 30px 80px rgba(0,0,0,.98), 0 8px 24px rgba(0,0,0,.7), inset 0 3px 8px rgba(255,255,255,.7), inset 0 -5px 16px rgba(0,0,0,.8); }
          50%      { box-shadow: 0 0 0 2px rgba(212,175,55,.8), 0 0 0 10px rgba(212,175,55,.08), 0 30px 80px rgba(0,0,0,.98), 0 8px 24px rgba(0,0,0,.7), inset 0 3px 8px rgba(255,255,255,.7), inset 0 -5px 16px rgba(0,0,0,.8), 0 0 60px rgba(212,175,55,.55); }
        }
      `}</style>

      {/* Hidden YouTube Player */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
        <div ref={ytContainerRef} />
      </div>

      {/* Music toggle button */}
      {interacted && (
        <button
          onClick={toggleMusic}
          title={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          style={{
            position: 'fixed', bottom: '28px', right: '28px',
            zIndex: 99999,
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1.5px solid rgba(212,175,55,.7)',
            background: 'rgba(10,0,0,.75)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,.5)',
            animation: musicPlaying ? 'musicPulse 1.8s ease-in-out infinite' : 'none',
            transition: 'border-color .3s',
          }}
        >
          {musicPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(212,175,55,.9)">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(212,175,55,.9)">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}

      {/* Canvas gold dust + burst */}
      <GoldDust burst={burst} burstOrigin={burstOrigin} />

      {/* Light rays — appear on door open */}
      <LightRays visible={showRays} />

      {/* Ambient radial glow */}
      <div className="gate-bg-glow" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65%', height: '85%', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(170,35,35,.38) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1, opacity: 0.1,
      }} />

      {/* Gold burst revealed on open */}
      <div ref={glowRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100px', height: '100px', borderRadius: '50%',
        transform: 'translate(-50%, -50%) scale(0.2)',
        background: 'radial-gradient(circle, rgba(255,253,220,1) 0%, rgba(230,195,90,.7) 30%, rgba(212,175,55,.2) 55%, transparent 70%)',
        opacity: 0, pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Door panels */}
      <DoorPanel side="left"  name="Đại Nghĩa" panelRef={leftDoor}  />
      <DoorPanel side="right" name="Thị Nhung"  panelRef={rightDoor} />

      {/* Center gold seam */}
      <div ref={seamRef} className="gate-seam" style={{
        position: 'absolute', top: 0, left: '50%', width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, transparent 1%, #6A4A00 6%, #D4AF37 22%, #FFF3A0 50%, #D4AF37 78%, #6A4A00 94%, transparent 99%)',
        transform: 'translateX(-50%)',
        zIndex: 10, pointerEvents: 'none',
        boxShadow: '0 0 20px 5px rgba(212,175,55,.65)',
      }} />

      {/* TOP cinematic letterbox bar */}
      <div ref={topBarRef} style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(0,0,0,.9)',
        backdropFilter: 'blur(2px)',
        padding: '18px 0 14px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polygon points="5,0 10,5 5,10 0,5" fill="rgba(212,175,55,.5)"/>
          </svg>
          <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: '9px', letterSpacing: '.7em', color: '#D4AF37', textTransform: 'uppercase' }}>
            Lễ Thành Hôn
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polygon points="5,0 10,5 5,10 0,5" fill="rgba(212,175,55,.5)"/>
          </svg>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </div>
        <span style={{ fontFamily: '"Playfair Display",serif', fontSize: '10px', letterSpacing: '.35em', color: 'rgba(243,229,171,.55)', fontStyle: 'italic' }}>
          20 · 10 · 2026
        </span>
      </div>

      {/* BOTTOM bar */}
      <div ref={botBarRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(0,0,0,.9)',
        backdropFilter: 'blur(2px)',
        padding: '16px 0 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
      }}>
        {!interacted && (
          <p style={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: '9px', letterSpacing: '.6em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,.7)', margin: 0,
            animation: 'hintBlink 2.4s 1.2s ease-in-out infinite',
          }}>
            Chạm phong ấn để mở cổng
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,.5))' }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polygon points="6,0 12,6 6,12 0,6" stroke="rgba(212,175,55,.5)" strokeWidth=".8" fill="rgba(212,175,55,.08)" />
          </svg>
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,.5))' }} />
        </div>
      </div>

      {/* Wax Seal */}
      <WaxSeal
        sealRef={sealRef}
        ring1Ref={ring1Ref}
        ring2Ref={ring2Ref}
        ring3Ref={ring3Ref}
        onClick={handleOpen}
      />
    </div>
  );
}
