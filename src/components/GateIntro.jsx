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
   CANVAS PARTICLE ENGINE — Gold Dust (60fps)
═══════════════════════════════════════════════ */
function GoldDust() {
  const canvas = useRef(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let raf;

    const resize = () => {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 80 gold particles
    const pts = Array.from({ length: 80 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.8 + 0.3,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(Math.random() * 0.4 + 0.06),
      phase: Math.random() * Math.PI * 2,
      spd:   0.006 + Math.random() * 0.006,
      hue:   40 + Math.random() * 20,   // gold family
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        // drift + float
        p.x += p.vx + Math.sin(t * 0.008 + p.phase) * 0.12;
        p.y += p.vy;
        if (p.y < -8)  { p.y = c.height + 5; p.x = Math.random() * c.width; }
        if (p.x < -5 || p.x > c.width + 5) p.x = Math.random() * c.width;

        const alpha = ((Math.sin(t * p.spd + p.phase) + 1) / 2) * 0.7;
        // Draw glowing orb
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0,   `hsla(${p.hue}, 85%, 80%, ${alpha})`);
        grd.addColorStop(0.4, `hsla(${p.hue}, 70%, 60%, ${alpha * 0.6})`);
        grd.addColorStop(1,   `hsla(${p.hue}, 60%, 40%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(50, 100%, 90%, ${alpha * 0.9})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvas} style={{
    position: 'absolute', inset: 0,
    pointerEvents: 'none', zIndex: 3,
  }} />;
}

/* ═══════════════════════════════════════════════
   WAX SEAL COMPONENT
═══════════════════════════════════════════════ */
function WaxSeal({ sealRef, ring1Ref, ring2Ref, onClick }) {
  return (
    <div
      ref={sealRef}
      onClick={onClick}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(96px, 11vw, 130px)',
        height: 'clamp(96px, 11vw, 130px)',
        cursor: 'pointer', zIndex: 30,
      }}
    >
      {/* Outer halo pulse */}
      <div style={{
        position: 'absolute', inset: '-20px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,.22) 0%, transparent 70%)',
        animation: 'haloPulse 2.2s ease-in-out infinite',
      }} />

      {/* Ring 1 — slow CW */}
      <div ref={ring1Ref} style={{
        position: 'absolute', inset: '-8px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,.55)',
        borderStyle: 'dashed',
        transformOrigin: 'center center',
      }} />

      {/* Ring 2 — faster CCW */}
      <div ref={ring2Ref} style={{
        position: 'absolute', inset: '-2px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,.25)',
        transformOrigin: 'center center',
      }} />

      {/* Seal body */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 32% 28%, #FFF8E1 0%, #D4AF37 25%, #9B7412 55%, #5A3E00 78%, #2A1800 100%)',
        boxShadow: [
          '0 0 0 2px rgba(212,175,55,.75)',
          '0 0 0 5px rgba(212,175,55,.18)',
          '0 28px 70px rgba(0,0,0,.98)',
          '0 8px 20px rgba(0,0,0,.7)',
          'inset 0 3px 7px rgba(255,255,255,.6)',
          'inset 0 -4px 14px rgba(0,0,0,.75)',
        ].join(', '),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Inner ring groove */}
        <div style={{
          position: 'absolute', inset: '8px', borderRadius: '50%',
          border: '1px solid rgba(139,101,8,.45)',
        }} />
        {/* Character */}
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          color: '#1A0005',
          fontWeight: 700,
          textShadow: '0 1px 4px rgba(255,255,255,.5)',
          lineHeight: 1,
          position: 'relative', zIndex: 2,
          userSelect: 'none',
        }}>囍</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DOOR PANEL COMPONENT
═══════════════════════════════════════════════ */
function DoorPanel({ side, name, panelRef }) {
  const isLeft = side === 'left';
  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute', top: 0, height: '100%', width: '50%',
        [isLeft ? 'left' : 'right']: 0,
        transformOrigin: `${isLeft ? 'left' : 'right'} center`,
        transformStyle: 'preserve-3d',
        // ── Real gate image, sliced in half ──
        backgroundImage: `url("${import.meta.env.BASE_URL}gate-bg.png")`,
        backgroundSize: '200% 100%',
        backgroundPosition: `${isLeft ? 'left' : 'right'} center`,
        backgroundRepeat: 'no-repeat',
        [isLeft ? 'borderRight' : 'borderLeft']: '3px solid #D4AF37',
        // Depth shadows
        boxShadow: isLeft
          ? 'inset -80px 0 160px rgba(0,0,0,.75), 20px 0 50px rgba(0,0,0,.98)'
          : 'inset 80px 0 160px rgba(0,0,0,.75), -20px 0 50px rgba(0,0,0,.98)',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Darkening gradient from the hinge side — creates depth illusion */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isLeft
          ? 'linear-gradient(to right, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 60%, transparent 100%)'
          : 'linear-gradient(to left,  rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 60%, transparent 100%)',
      }} />

      {/* Gold inner frame */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(212,175,55,.6)', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(212,175,55,.22)', pointerEvents: 'none', zIndex: 3 }} />

      {/* Corner ornaments */}
      {[
        { top: '16px',  left: '16px',  rot: '0deg'   },
        { top: '16px',  right: '16px', rot: '90deg'  },
        { bottom:'16px',left: '16px',  rot: '270deg' },
        { bottom:'16px',right:'16px',  rot: '180deg' },
      ].map((c, i) => (
        <svg key={i} style={{ position:'absolute', ...c, transform:`rotate(${c.rot})`, width:'20px', height:'20px', zIndex:4, pointerEvents:'none' }} viewBox="0 0 20 20" fill="none">
          <path d="M0 20 L0 0 L20 0" stroke="rgba(212,175,55,.75)" strokeWidth="1.5" fill="none"/>
          <circle cx="0" cy="0" r="2.5" fill="rgba(212,175,55,.6)"/>
        </svg>
      ))}

      {/* Name label at bottom */}
      <div style={{ position: 'absolute', bottom: '9%', left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <div style={{ display: 'inline-block' }}>
          <h2 style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            color: '#F3E5AB',
            margin: 0,
            letterSpacing: '.04em',
            textShadow: [
              '0 0 40px rgba(212,175,55,.9)',
              '0 0 80px rgba(212,175,55,.4)',
              '0 4px 15px rgba(0,0,0,.98)',
            ].join(', '),
          }}>
            {name}
          </h2>
          <div style={{
            width: '100%', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,.9), transparent)',
            marginTop: '6px',
          }} />
        </div>
      </div>

      {/* Metallic hinges */}
      {[0.14, 0.5, 0.86].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `calc(${pos * 100}% - 24px)`,
          [isLeft ? 'right' : 'left']: '-1px',
          width: '20px', height: '48px',
          background: 'linear-gradient(180deg, #3A2700 0%, #8B6508 20%, #D4AF37 38%, #FFF8E1 50%, #D4AF37 62%, #8B6508 80%, #3A2700 100%)',
          borderRadius: '3px',
          boxShadow: '0 4px 12px rgba(0,0,0,.9)',
          zIndex: 6,
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '9px', height: '9px', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #FFF8E1, #B8860B 60%, #5A3E00)',
            transform: 'translate(-50%, -50%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,.5)',
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
  const glowRef    = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytContainerRef = useRef(null);
  const topBarRef  = useRef(null);
  const botBarRef  = useRef(null);
  const [interacted, setInteracted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Entrance: doors start slightly ajar (like they just settled)
    gsap.set([leftDoor.current, rightDoor.current], { rotateY: 0 });

    // Subtle door breathing (very slight sway)
    gsap.to(leftDoor.current,  { rotateY: -1.5, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to(rightDoor.current, { rotateY:  1.5, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.3 });

    // Seal animations
    gsap.to(sealRef.current, { scale: 1.06, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to(ring1Ref.current, { rotation:  360, duration: 22, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 14, repeat: -1, ease: 'none', transformOrigin: 'center center' });

    // Glow pulse behind doors
    gsap.to('.gate-bg-glow', { opacity: 0.18, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Preload YouTube API silently
    loadYouTubeAPI().then((YT) => {
      if (!ytContainerRef.current) return;
      ytPlayerRef.current = new YT.Player(ytContainerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          rel: 0,
          modestbranding: 1,
          start: 0,
        },
        events: {
          onReady: () => setMusicReady(true),
        },
      });
    });

    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const toggleMusic = useCallback(() => {
    const player = ytPlayerRef.current;
    if (!player) return;
    if (musicPlaying) {
      player.pauseVideo();
      setMusicPlaying(false);
    } else {
      player.playVideo();
      setMusicPlaying(true);
    }
  }, [musicPlaying]);

  const handleOpen = () => {
    if (interacted) return;
    setInteracted(true);

    // Kill the subtle sway loops
    gsap.killTweensOf([leftDoor.current, rightDoor.current]);

    // Play music via YouTube player
    if (ytPlayerRef.current && musicReady) {
      ytPlayerRef.current.setVolume(50);
      ytPlayerRef.current.playVideo();
      setMusicPlaying(true);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onOpen?.();
      },
    });

    // 1. Seal vanishes with impact
    tl.to(sealRef.current, {
      scale: 0, opacity: 0, duration: 0.5,
      ease: 'back.in(3)',
    }, 0);

    // 2. Doors begin to open — weighted, cinematic
    tl.to(leftDoor.current, {
      rotateY: -118,
      duration: 3.4,
      ease: 'power3.inOut',
    }, 0.35);
    tl.to(rightDoor.current, {
      rotateY: 118,
      duration: 3.4,
      ease: 'power3.inOut',
    }, 0.35);

    // 3. Gold seam line brightens as doors open
    tl.to('.gate-seam', {
      boxShadow: '0 0 60px 20px rgba(212,175,55,.9)',
      duration: 1.5, ease: 'power2.out',
    }, 0.5);

    // 4. Light burst from behind
    tl.fromTo(glowRef.current,
      { scale: 0.2, opacity: 0 },
      { scale: 8, opacity: 1, duration: 2.0, ease: 'power2.out' },
      1.8
    );

    // 5. Top/bottom bars slide out
    tl.to(topBarRef.current, { y: '-100%', duration: 1, ease: 'power2.inOut' }, 2.2);
    tl.to(botBarRef.current, { y: '100%',  duration: 1, ease: 'power2.inOut' }, 2.2);

    // 6. Fade whole screen
    tl.to(container.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.6);
    tl.set(container.current, { display: 'none' });
  };

  return (
    <div
      ref={container}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        perspective: '3200px',
        perspectiveOrigin: '50% 50%',
        // Deep cinematic background — not pitch black, has rich dark-red warmth
        background: 'radial-gradient(ellipse 110% 110% at 50% 60%, #2A0408 0%, #120002 50%, #050001 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes haloPulse {
          0%,100% { transform: scale(1);   opacity: .7; }
          50%      { transform: scale(1.4); opacity: .2; }
        }
        @keyframes hintBlink {
          0%,100% { opacity: 0; }
          50%      { opacity: .7; }
        }
        @keyframes musicPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.12); }
        }
      `}</style>

      {/* Hidden YouTube Player */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
        <div ref={ytContainerRef} />
      </div>

      {/* Music toggle button — shown after gate opens */}
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
            boxShadow: '0 4px 20px rgba(0,0,0,.5), 0 0 12px rgba(212,175,55,.2)',
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

      {/* Canvas gold dust */}
      <GoldDust />

      {/* Ambient radial glow behind center */}
      <div className="gate-bg-glow" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(160,30,30,.35) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1, opacity: 0.08,
      }} />

      {/* Gold burst revealed on open */}
      <div ref={glowRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100px', height: '100px', borderRadius: '50%',
        transform: 'translate(-50%, -50%) scale(0.2)',
        background: 'radial-gradient(circle, rgba(255,253,230,.98) 0%, rgba(230,195,90,.6) 35%, transparent 70%)',
        opacity: 0, pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Door panels */}
      <DoorPanel side="left"  name="Đại Nghĩa" panelRef={leftDoor}  />
      <DoorPanel side="right" name="Thị Nhung"  panelRef={rightDoor} />

      {/* Center gold seam */}
      <div className="gate-seam" style={{
        position: 'absolute', top: 0, left: '50%', width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, transparent 2%, #7A5800 8%, #D4AF37 25%, #FFF3A0 50%, #D4AF37 75%, #7A5800 92%, transparent 98%)',
        transform: 'translateX(-50%)',
        zIndex: 10, pointerEvents: 'none',
        boxShadow: '0 0 16px 4px rgba(212,175,55,.55)',
      }} />

      {/* TOP cinematic letterbox bar */}
      <div ref={topBarRef} style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(0,0,0,.88)',
        padding: '18px 0 14px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '70px', height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: '9px', letterSpacing: '.65em', color: '#D4AF37', textTransform: 'uppercase' }}>
            Lễ Thành Hôn
          </span>
          <div style={{ width: '70px', height: '1px', background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </div>
        <span style={{ fontFamily: '"Playfair Display",serif', fontSize: '10px', letterSpacing: '.3em', color: 'rgba(243,229,171,.5)', fontStyle: 'italic' }}>
          20 · 10 · 2026
        </span>
      </div>

      {/* BOTTOM bar */}
      <div ref={botBarRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(0,0,0,.88)',
        padding: '14px 0 18px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      }}>
        {/* Hint */}
        {!interacted && (
          <p style={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: '9px', letterSpacing: '.55em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,.65)', margin: 0,
            animation: 'hintBlink 2.4s 1.5s ease-in-out infinite',
          }}>
            Chạm phong ấn để mở cổng
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,.5))' }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polygon points="6,0 12,6 6,12 0,6" stroke="rgba(212,175,55,.5)" strokeWidth=".8" fill="rgba(212,175,55,.08)" />
          </svg>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,.5))' }} />
        </div>
      </div>

      {/* Wax Seal */}
      <WaxSeal
        sealRef={sealRef}
        ring1Ref={ring1Ref}
        ring2Ref={ring2Ref}
        onClick={handleOpen}
      />
    </div>
  );
}
