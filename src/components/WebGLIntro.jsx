import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════
   CINEMATIC COVER SCREEN
   Philosophy: Real photography + elegant typography.
   No fake 3D. No SVG ornaments. Pure light and motion.

   Flow:
   1. Full-screen wedding photo — slow zoom-in (Ken Burns)
   2. Warm vignette + color grading overlay
   3. GSAP: lines + names reveal letter-by-letter, staggered
   4. "Bước vào" button pulses gently
   5. On click: shutter wipe (clip-path) → main UI
═══════════════════════════════════════════════════════ */

const COVER_IMG =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&q=95';

/* Elegant thin-line frame — CSS only */
function FrameLines() {
  return (
    <>
      {/* Top-left corner */}
      <div style={{ position:'absolute', top:'36px', left:'44px', zIndex:3, pointerEvents:'none' }}>
        <div style={{ width:'55px', height:'1px', background:'rgba(212,175,55,.65)', marginBottom:'0' }} />
        <div style={{ width:'1px', height:'55px', background:'rgba(212,175,55,.65)', marginLeft:'0', marginTop:'0' }} />
      </div>
      {/* Top-right corner */}
      <div style={{ position:'absolute', top:'36px', right:'44px', zIndex:3, pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'flex-end' }}>
        <div style={{ width:'55px', height:'1px', background:'rgba(212,175,55,.65)' }} />
        <div style={{ width:'1px', height:'55px', background:'rgba(212,175,55,.65)' }} />
      </div>
      {/* Bottom-left corner */}
      <div style={{ position:'absolute', bottom:'36px', left:'44px', zIndex:3, pointerEvents:'none', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
        <div style={{ width:'1px', height:'55px', background:'rgba(212,175,55,.65)' }} />
        <div style={{ width:'55px', height:'1px', background:'rgba(212,175,55,.65)' }} />
      </div>
      {/* Bottom-right corner */}
      <div style={{ position:'absolute', bottom:'36px', right:'44px', zIndex:3, pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-end' }}>
        <div style={{ width:'1px', height:'55px', background:'rgba(212,175,55,.65)' }} />
        <div style={{ width:'55px', height:'1px', background:'rgba(212,175,55,.65)' }} />
      </div>

      {/* Top centre tick */}
      <div style={{ position:'absolute', top:'36px', left:'50%', transform:'translateX(-50%)', zIndex:3, pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:'1px', height:'24px', background:'rgba(212,175,55,.4)' }} />
      </div>
      {/* Bottom centre tick */}
      <div style={{ position:'absolute', bottom:'36px', left:'50%', transform:'translateX(-50%)', zIndex:3, pointerEvents:'none' }}>
        <div style={{ width:'1px', height:'24px', background:'rgba(212,175,55,.4)' }} />
      </div>
    </>
  );
}

/* ── Animated line (horizontal rule that draws in) ── */
function DrawLine({ delay = 0, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { scaleX: 0 }, { scaleX: 1, duration: 1.6, delay, ease: 'power3.inOut', transformOrigin: 'left' });
  }, [delay]);
  return <div ref={ref} style={{ height: '1px', background: 'rgba(212,175,55,.55)', transformOrigin: 'left', ...style }} />;
}

/* ── Single character reveal ── */
function RevealText({ text, delay = 0, style, charDelay = 0.038 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const spans = ref.current.querySelectorAll('span');
    gsap.fromTo(spans,
      { opacity: 0, y: 24, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: charDelay, duration: 1.1, delay, ease: 'power3.out' }
    );
  }, [delay, charDelay]);
  return (
    <div ref={ref} style={{ lineHeight: 1, ...style }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>{ch}</span>
      ))}
    </div>
  );
}

/* ── Eye-blink shutter wipe (clip-path) ── */
function useShutterWipe(triggerRef, onDone) {
  const topRef    = useRef(null);
  const bottomRef = useRef(null);

  const fire = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onDone });
    // Two black panels close from top + bottom simultaneously
    tl.fromTo(topRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 0.55, ease: 'power4.in' }, 0);
    tl.fromTo(bottomRef.current,
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.55, ease: 'power4.in' }, 0);
    // Then both panels exit revealing the page
    tl.to([topRef.current, bottomRef.current], {
      opacity: 0, duration: 0.45, ease: 'power2.inOut',
    }, 0.72);
  }, [onDone]);

  return { topRef, bottomRef, fire };
}

export default function WebGLIntro({ onComplete }) {
  const bgRef       = useRef(null);
  const wrapRef     = useRef(null);
  const btnRef      = useRef(null);
  const [ready, setReady]   = useState(true);
  const [clicked, setClicked] = useState(false);
  const done = useRef(false);

  const handleDone = useCallback(() => {
    document.body.style.overflow = 'auto';
    onComplete?.();
  }, [onComplete]);

  const { topRef, bottomRef, fire } = useShutterWipe(btnRef, handleDone);

  /* Block scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  /* Ken Burns slow zoom on photo */
  useEffect(() => {
    if (!bgRef.current) return;
    gsap.fromTo(bgRef.current,
      { scale: 1.12 },
      { scale: 1.03, duration: 14, ease: 'none' }
    );
  }, []);

  /* Button pulse */
  useEffect(() => {
    if (!btnRef.current) return;
    const tl = gsap.timeline({ delay: 3.8, repeat: -1 });
    tl.to(btnRef.current, { scale: 1.04, duration: 1.5, ease: 'sine.inOut' });
    tl.to(btnRef.current, { scale: 1.0,  duration: 1.5, ease: 'sine.inOut' });
    return () => tl.kill();
  }, [ready]);

  const handleClick = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setClicked(true);
    fire();
  }, [fire]);

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 9990,
      cursor: clicked ? 'default' : 'pointer',
      overflow: 'hidden',
      /* Luxury gradient fallback — always renders, even without photo */
      background: 'linear-gradient(160deg, #1A0A06 0%, #0E0504 35%, #160C08 65%, #0A0304 100%)',
    }}
      onClick={!clicked ? handleClick : undefined}
    >
      {/* Photo — Ken Burns */}
      <img
        ref={bgRef}
        src={COVER_IMG}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 30%',
          zIndex: 0, display: 'block',
        }}
      />

      {/* Color-grade overlay — cinematic warm tone */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: [
          'linear-gradient(to bottom,',
          '  rgba(15,8,4,.72) 0%,',
          '  rgba(10,4,2,.28) 38%,',
          '  rgba(10,4,2,.22) 55%,',
          '  rgba(15,8,4,.88) 100%)',
        ].join(''),
      }} />

      {/* Subtle warm colour wash */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, mixBlendMode: 'multiply',
        background: 'linear-gradient(160deg,rgba(120,50,10,.3) 0%,rgba(60,10,5,.5) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%,transparent 15%,rgba(5,2,1,.82) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Corner frame lines */}
      <FrameLines />

      {/* Main content — always visible */}
      <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        }}>
          {/* Eyebrow — "Lễ Thành Hôn" */}
          <RevealText
            text="LỄ THÀNH HÔN"
            delay={0.2}
            charDelay={0.045}
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(9px,1.2vw,12px)',
              letterSpacing: '1.0em',
              color: 'rgba(212,175,55,.75)',
              marginBottom: 'clamp(22px,3vw,36px)',
              fontWeight: 500,
            }}
          />

          {/* Rule line */}
          <DrawLine delay={0.6} style={{ width: '64px', marginBottom: 'clamp(28px,4vw,44px)' }} />

          {/* Groom name */}
          <RevealText
            text="Đại Nghĩa"
            delay={0.85}
            charDelay={0.055}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(4rem,9.5vw,8.5rem)',
              color: '#F5ECD8',
              textShadow: '0 4px 40px rgba(0,0,0,.55), 0 0 80px rgba(212,175,55,.1)',
              marginBottom: 'clamp(10px,1.5vw,18px)',
            }}
          />

          {/* Ampersand */}
          <div style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
            fontSize: 'clamp(1.4rem,3vw,2.6rem)',
            color: 'rgba(212,175,55,.65)',
            lineHeight: 1, marginBottom: 'clamp(10px,1.5vw,18px)',
            opacity: 0,
            animation: 'ampFade 1.4s ease forwards 1.9s',
          }}>&</div>

          {/* Bride name */}
          <RevealText
            text="Thị Nhung"
            delay={2.2}
            charDelay={0.055}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(4rem,9.5vw,8.5rem)',
              color: '#F5ECD8',
              textShadow: '0 4px 40px rgba(0,0,0,.55), 0 0 80px rgba(212,175,55,.1)',
              marginBottom: 'clamp(28px,4vw,44px)',
            }}
          />

          {/* Rule line */}
          <DrawLine delay={3.0} style={{ width: '64px', marginBottom: 'clamp(20px,3vw,32px)' }} />

          {/* Date */}
          <RevealText
            text="20 · 10 · 2026"
            delay={3.1}
            charDelay={0.04}
            style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
              fontSize: 'clamp(1.0rem,2vw,1.5rem)',
              color: 'rgba(212,175,55,.65)',
              letterSpacing: '.25em',
              marginBottom: 'clamp(40px,6vw,72px)',
            }}
          />

          {/* CTA Button */}
          <button
            ref={btnRef}
            onClick={e => { e.stopPropagation(); handleClick(); }}
            style={{
              padding: '0', background: 'transparent', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px',
              cursor: 'pointer', outline: 'none',
              opacity: 0,
              animation: 'ampFade 1.8s ease forwards 3.8s',
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: '"Montserrat", sans-serif', fontWeight: 500,
              fontSize: 'clamp(8px,1vw,10px)',
              letterSpacing: '.75em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,.7)',
              transition: 'color .3s',
            }}>Bước vào</span>
            {/* Animated arrow */}
            <div style={{ position: 'relative', width: '40px', height: '40px' }}>
              {/* Pulse ring */}
              <div style={{
                position: 'absolute', inset: '-8px', borderRadius: '50%',
                border: '1px solid rgba(212,175,55,.3)',
                animation: 'ctaPulse 2.5s ease-out 4.2s infinite',
              }} />
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(212,175,55,.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(212,175,55,.06)',
                transition: 'all .4s ease',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v14M3 10l5 5 5-5" stroke="rgba(212,175,55,.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <span style={{
              fontFamily: '"Montserrat", sans-serif', fontWeight: 400,
              fontSize: 'clamp(7px,.9vw,9px)',
              letterSpacing: '.5em', textTransform: 'uppercase',
              color: 'rgba(245,236,216,.28)',
            }}>Chạm bất kỳ để tiếp tục</span>
          </button>
        </div>

      {/* Top letterbox bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
        height: 'clamp(30px,4vh,44px)',
        background: 'rgba(5,2,1,.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid rgba(212,175,55,.1)',
      }}>
        <span style={{
          fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic',
          fontSize: 'clamp(10px,1.2vw,12px)',
          color: 'rgba(212,175,55,.45)',
          letterSpacing: '.35em',
        }}>Gia đình hai họ trân trọng kính mời</span>
      </div>

      {/* Bottom letterbox bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        height: 'clamp(30px,4vh,44px)',
        background: 'rgba(5,2,1,.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderTop: '1px solid rgba(212,175,55,.1)',
      }}>
        <span style={{
          fontFamily: '"Montserrat",sans-serif',
          fontSize: 'clamp(7px,.9vw,9px)',
          color: 'rgba(212,175,55,.28)',
          letterSpacing: '.65em', textTransform: 'uppercase',
        }}>20 · 10 · 2026 · Gem Center · TP. HCM</span>
      </div>

      {/* Shutter wipe panels (black, appear on click) */}
      <div ref={topRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '50%',
        background: '#FAFAFA', zIndex: 9999,
        transformOrigin: 'top', scaleY: 0,
      }} />
      <div ref={bottomRef} style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '50%',
        background: '#FAFAFA', zIndex: 9999,
        transformOrigin: 'bottom', scaleY: 0,
      }} />

      <style>{`
        @keyframes ampFade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ctaPulse {
          0%   { transform:scale(1);   opacity:.55; }
          100% { transform:scale(1.8); opacity:0; }
        }
      `}</style>
    </div>
  );
}
