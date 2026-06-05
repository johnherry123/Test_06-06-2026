import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/* ══════════════════════════════════════════════════
   WEB AUDIO SOUND ENGINE — no CDN, no files
══════════════════════════════════════════════════ */
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

// Paper rustle — gentle noise burst on hover/move
function playRustle() {
  try {
    const ctx = getAudioCtx();
    const bufLen = ctx.sampleRate * 0.18;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++)
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2.5);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass'; bpf.frequency.value = 3800; bpf.Q.value = 0.6;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    src.connect(bpf); bpf.connect(gain); gain.connect(ctx.destination);
    src.start(); src.stop(ctx.currentTime + 0.2);
  } catch (_) {}
}

// Wax seal crack — deep thud + crack snap
function playSealCrack() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.22);
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.7, ctx.currentTime);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(g1); g1.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.25);

    const snapLen = ctx.sampleRate * 0.05;
    const snapBuf = ctx.createBuffer(1, snapLen, ctx.sampleRate);
    const snapData = snapBuf.getChannelData(0);
    for (let i = 0; i < snapLen; i++)
      snapData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / snapLen, 1.5);
    const snap = ctx.createBufferSource(); snap.buffer = snapBuf;
    const hpf = ctx.createBiquadFilter(); hpf.type = 'highpass'; hpf.frequency.value = 1200;
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.5, ctx.currentTime);
    snap.connect(hpf); hpf.connect(g2); g2.connect(ctx.destination);
    snap.start(); snap.stop(ctx.currentTime + 0.06);
  } catch (_) {}
}

// Flap whoosh — breathy upward sweep
function playFlapWhoosh() {
  try {
    const ctx = getAudioCtx();
    const bufLen = ctx.sampleRate * 0.55;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++)
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufLen);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bpf = ctx.createBiquadFilter(); bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(400, ctx.currentTime);
    bpf.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.55);
    bpf.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    src.connect(bpf); bpf.connect(gain); gain.connect(ctx.destination);
    src.start(); src.stop(ctx.currentTime + 0.6);
  } catch (_) {}
}

// Card shimmer — delicate ascending chime
function playCardShimmer() {
  try {
    const ctx = getAudioCtx();
    [880, 1320, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + i * 0.07;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.12, t0 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.55);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t0); osc.stop(t0 + 0.6);
    });
  } catch (_) {}
}

/* ─── Canvas Gold Particles ─── */
function GoldDust() {
  const canvas = useRef(null);
  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.4, vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.35 + 0.06),
      phase: Math.random() * Math.PI * 2, spd: 0.005 + Math.random() * 0.006,
      hue: 38 + Math.random() * 18,
    }));
    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx + Math.sin(t * 0.008 + p.phase) * 0.12; p.y += p.vy;
        if (p.y < -8) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        if (p.x < -5 || p.x > c.width + 5) p.x = Math.random() * c.width;
        const a = ((Math.sin(t * p.spd + p.phase) + 1) / 2) * 0.7;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue},90%,85%,${a})`);
        g.addColorStop(0.4, `hsla(${p.hue},75%,60%,${a * 0.5})`);
        g.addColorStop(1, `hsla(${p.hue},60%,38%,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(50,100%,95%,${a * 0.9})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvas} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2 }}/>;
}

/* ─── Main Component ─── */
export default function EnvelopePortal({ onOpenComplete, guestName, onSealClick }) {
  const [opened, setOpened]     = useState(false);
  const [sealHovered, setSealHovered] = useState(false);
  const containerRef = useRef(null);
  const envelopeRef  = useRef(null);
  const flapRef      = useRef(null);
  const cardRef      = useRef(null);
  const sealRef      = useRef(null);
  const ring1Ref     = useRef(null);
  const ring2Ref     = useRef(null);
  const hintRef      = useRef(null);
  const rustleTimer  = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Floating envelope
    gsap.to(envelopeRef.current, { y: -14, duration: 3, ease:'sine.inOut', yoyo:true, repeat:-1 });
    // Spinning rings
    gsap.to(ring1Ref.current, { rotation: 360,  duration:24, repeat:-1, ease:'none', transformOrigin:'center center' });
    gsap.to(ring2Ref.current, { rotation:-360,  duration:16, repeat:-1, ease:'none', transformOrigin:'center center' });
    // Seal pulse
    gsap.to(sealRef.current,  { scale:1.06, duration:2.2, yoyo:true, repeat:-1, ease:'sine.inOut' });
    // Hint fade in
    gsap.fromTo(hintRef.current, { opacity:0, y:8 }, { opacity:1, y:0, duration:1.8, delay:1.8 });

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(rustleTimer.current);
    };
  }, []);

  // Throttled rustle on envelope hover
  const handleEnvelopeMove = useCallback(() => {
    if (opened) return;
    if (rustleTimer.current) return;
    playRustle();
    rustleTimer.current = setTimeout(() => { rustleTimer.current = null; }, 280);
  }, [opened]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // 🎵 Trigger music at the exact user gesture moment
    onSealClick?.();

    // Wax seal crack — first tactile response
    playSealCrack();

    gsap.killTweensOf([envelopeRef.current, ring1Ref.current, ring2Ref.current, sealRef.current]);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0, duration: 1.4, ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = 'auto';
            onOpenComplete?.();
          }
        });
      }
    });

    // Seal breaks
    tl.to(sealRef.current, { scale:1.4, opacity:0, duration:0.45, ease:'power3.in' }, 0);

    // Flap opens — with whoosh halfway
    tl.to(flapRef.current, {
      rotateX: -192, duration: 1.7, ease: 'back.out(1.05)',
      onStart: () => setTimeout(playFlapWhoosh, 90),
      onUpdate() { if (this.progress() > 0.42) flapRef.current.style.zIndex = '2'; }
    }, 0.12);

    // Card rises out
    tl.set(cardRef.current, { opacity:1 }, 0.38);
    tl.to(cardRef.current, {
      y: '-68%', duration: 1.9, ease: 'power2.out',
      onStart: () => setTimeout(playCardShimmer, 120),
    }, 0.72);

    // Envelope scales away
    tl.to(envelopeRef.current, { scale: 4.5, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 1.6);
  };

  const name = guestName?.trim() || null;

  return (
    <div ref={containerRef} style={{
      position:'fixed', inset:0, zIndex:9999,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse 140% 120% at 50% 115%, #3A1A08 0%, #251008 25%, #180A05 50%, #100604 75%, #0C0402 100%)',
      overflow:'hidden',
    }}>
      <style>{`
        @keyframes hintBlink { 0%,100%{opacity:.35} 50%{opacity:.9} }
        @keyframes sealPulse {
          0%,100% { box-shadow: 0 6px 28px rgba(0,0,0,.6), 0 0 0 2px rgba(212,175,55,.55), 0 0 18px rgba(212,175,55,.25), inset 0 2px 5px rgba(255,255,255,.55); }
          50%      { box-shadow: 0 6px 28px rgba(0,0,0,.6), 0 0 0 2px rgba(212,175,55,.55), 0 0 55px rgba(212,175,55,.65), inset 0 2px 5px rgba(255,255,255,.55); }
        }
      `}</style>

      <GoldDust />

      {/* Ambient glow */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:'radial-gradient(ellipse 55% 45% at 50% 62%, rgba(220,170,55,.14) 0%, transparent 70%)' }}/>

      {/* Top/bottom golden rule */}
      {['top','bottom'].map(s => (
        <div key={s} style={{
          position:'absolute', [s]:0, left:0, right:0, height:'2px', zIndex:8,
          background:'linear-gradient(90deg, transparent 5%, rgba(201,168,76,.45) 25%, rgba(255,240,150,1) 50%, rgba(201,168,76,.45) 75%, transparent 95%)',
        }}/>
      ))}

      {/* Corner accents */}
      <div style={{ position:'absolute', inset:'20px', border:'1px solid rgba(201,168,76,.18)', zIndex:3, pointerEvents:'none' }}>
        {[{ t:'-1px',l:'-1px' }, { t:'-1px',r:'-1px',rot:'90' }, { b:'-1px',l:'-1px',rot:'270' }, { b:'-1px',r:'-1px',rot:'180' }].map((p,i)=>(
          <svg key={i} style={{ position:'absolute', width:'28px', height:'28px', top:p.t, bottom:p.b, left:p.l, right:p.r, transform:`rotate(${p.rot||0}deg)` }} viewBox="0 0 28 28" fill="none">
            <path d="M1 27L1 1L27 1" stroke="rgba(201,168,76,.55)" strokeWidth="1.5"/>
            <circle cx="1" cy="1" r="2" fill="rgba(201,168,76,.4)"/>
          </svg>
        ))}
      </div>

      {/* Guest name */}
      {name && (
        <div style={{ position:'relative', zIndex:10, textAlign:'center', marginBottom:'2rem' }}>
          <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:300, fontSize:'9px', letterSpacing:'.65em', textTransform:'uppercase', color:'rgba(255,235,175,.6)', margin:'0 0 .5rem' }}>Trân trọng kính mời</p>
          <div style={{ width:'90px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,168,76,.7),transparent)', margin:'0 auto .6rem' }}/>
          <p style={{ fontFamily:'"Great Vibes",cursive', fontWeight:700, fontSize:'clamp(2.2rem,6vw,3.2rem)', color:'#FFF2C0', textShadow:'0 2px 35px rgba(220,175,50,.55)', lineHeight:1.1 }}>{name}</p>
          <div style={{ width:'90px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,168,76,.7),transparent)', margin:'.6rem auto 0' }}/>
        </div>
      )}

      {/* ── ENVELOPE ── */}
      <div
        ref={envelopeRef}
        onMouseMove={handleEnvelopeMove}
        style={{
          position:'relative',
          width:'clamp(280px, 50vw, 370px)',
          aspectRatio:'5 / 7',
          perspective:'2000px',
          perspectiveOrigin:'50% 50%',
          zIndex:10,
        }}
      >
        {/* Glow ring behind */}
        <div style={{
          position:'absolute', inset:'-22px', borderRadius:'1.6rem',
          boxShadow:'0 0 90px rgba(180,50,20,.4), 0 60px 130px rgba(0,0,0,.6), 0 0 0 1px rgba(201,168,76,.2)',
          pointerEvents:'none',
        }}/>

        {/* Body */}
        <div style={{
          position:'absolute', inset:0, borderRadius:'1.3rem', overflow:'hidden',
          backgroundImage:`url("${import.meta.env.BASE_URL}envelope_front_velvet.png")`,
          backgroundSize:'cover', backgroundPosition:'center',
          border:'1px solid rgba(201,168,76,.45)',
          zIndex:1,
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'50%', background:'linear-gradient(to bottom, rgba(255,255,255,.08), transparent)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.3) 0%, transparent 55%)', pointerEvents:'none' }}/>
        </div>

        {/* Inner card */}
        <div ref={cardRef} style={{
          position:'absolute', left:'8px', right:'8px', top:'8px', bottom:'8px',
          backgroundImage:`url("${import.meta.env.BASE_URL}envelope_back.png")`,
          backgroundSize:'cover', backgroundPosition:'center',
          borderRadius:'1rem',
          border:'1px solid rgba(201,168,76,.45)',
          boxShadow:'0 12px 50px rgba(30,10,0,.35)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          overflow:'hidden', zIndex:3, opacity:0,
        }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(253,249,238,.82)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:'10px', border:'0.5px solid rgba(180,130,40,.35)', borderRadius:'.7rem', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:'18px', border:'0.5px solid rgba(180,130,40,.15)', borderRadius:'.35rem', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 2rem', width:'100%' }}>
            <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:600, fontSize:'7px', letterSpacing:'.55em', textTransform:'uppercase', color:'#B8870B', margin:'0 0 .7rem' }}>Thiệp Hồng</p>
            <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(180,130,40,.7),transparent)', margin:'0 auto .8rem' }}/>
            <h2 style={{ fontFamily:'"Great Vibes",cursive', fontWeight:700, fontSize:'clamp(1.9rem,7vw,2.8rem)', color:'#7B1A1A', lineHeight:1, margin:'0 0 .1rem' }}>Đại Nghĩa</h2>
            <p style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic', fontSize:'1.1rem', color:'#B8870B', margin:'.1rem 0', lineHeight:1 }}>&amp;</p>
            <h2 style={{ fontFamily:'"Great Vibes",cursive', fontWeight:700, fontSize:'clamp(1.9rem,7vw,2.8rem)', color:'#7B1A1A', lineHeight:1, margin:'0 0 .9rem' }}>Thị Nhung</h2>
            <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:400, fontSize:'8px', letterSpacing:'.3em', color:'#8B5E3C', opacity:.85, margin:'0 0 .3rem' }}>Trân Trọng Kính Mời</p>
            <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:300, fontSize:'8px', letterSpacing:'.3em', color:'#8B5E3C', opacity:.7, margin:0 }}>20 · 10 · 2026</p>
          </div>
        </div>

        {/* Lower pocket */}
        <div style={{ position:'absolute', inset:0, zIndex:4, pointerEvents:'none', borderRadius:'1.3rem', overflow:'hidden' }}>
          <svg style={{ position:'absolute', bottom:0, left:0, width:'100%', height:'42%' }} viewBox="0 0 380 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6A0A0A"/>
                <stop offset="100%" stopColor="#3D0505"/>
              </linearGradient>
            </defs>
            <path d="M0,180 L380,180 L380,0 L0,60 Z" fill="url(#pocketGrad)" fillOpacity=".94"/>
            <path d="M0,180 L380,180 L380,0 L0,60 Z" fill="none" stroke="rgba(201,168,76,.35)" strokeWidth="1"/>
          </svg>
        </div>

        {/* Flap */}
        <div ref={flapRef} style={{
          position:'absolute', top:0, left:0, right:0, height:'65%',
          transformOrigin:'top center', transformStyle:'preserve-3d',
          zIndex:5,
        }}>
          <div style={{ width:'100%', height:'100%', position:'relative', backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden' }}>
            <svg style={{ width:'100%', height:'100%' }} viewBox="0 0 380 270" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D04030"/>
                  <stop offset="45%" stopColor="#A01C1C"/>
                  <stop offset="100%" stopColor="#6B0A0A"/>
                </linearGradient>
              </defs>
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="url(#flapGrad)"/>
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="none" stroke="rgba(201,168,76,.6)" strokeWidth="1.2"/>
              <path d="M18,16 L362,16 L362,170 Q190,258 18,170 Z" fill="none" stroke="rgba(201,168,76,.14)" strokeWidth=".7"/>
              <polygon points="190,48 206,72 190,96 174,72" fill="none" stroke="rgba(230,195,100,.22)" strokeWidth="1"/>
              <circle cx="190" cy="72" r="2.5" fill="rgba(230,195,100,.25)"/>
            </svg>

            {/* Wax Seal */}
            <div
              ref={sealRef}
              onClick={handleOpen}
              onMouseEnter={() => { setSealHovered(true); playRustle(); }}
              onMouseLeave={() => setSealHovered(false)}
              style={{
                position:'absolute', bottom:'14%', left:'50%', transform:'translateX(-50%)',
                width:'clamp(76px,13vw,96px)', height:'clamp(76px,13vw,96px)',
                cursor:'pointer',
                filter: sealHovered ? 'brightness(1.3) drop-shadow(0 0 18px rgba(212,175,55,.9))' : 'none',
                transition: 'filter .35s ease',
              }}
            >
              <div ref={ring1Ref} style={{ position:'absolute', inset:'-9px', borderRadius:'50%', border:'1px dashed rgba(201,168,76,.6)', transformOrigin:'center center' }}/>
              <div ref={ring2Ref} style={{ position:'absolute', inset:'-3px', borderRadius:'50%', border:'1px solid rgba(201,168,76,.25)', transformOrigin:'center center' }}/>
              <div style={{
                position:'absolute', inset:0, borderRadius:'50%',
                background:'radial-gradient(circle at 30% 28%, #FFF8E1 0%, #D4AF37 28%, #9B7412 55%, #5A3E00 78%, #2A1800 100%)',
                boxShadow:'0 6px 28px rgba(0,0,0,.6), 0 0 0 2px rgba(212,175,55,.55), 0 0 30px rgba(212,175,55,.3), inset 0 2px 5px rgba(255,255,255,.6), inset 0 -2px 8px rgba(0,0,0,.7)',
                display:'flex', alignItems:'center', justifyContent:'center',
                animation:'sealPulse 2.5s ease-in-out infinite',
              }}>
                <div style={{ position:'absolute', inset:'8px', border:'1px solid rgba(139,101,8,.4)', borderRadius:'50%' }}/>
                <span style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.7rem,3vw,2.2rem)', color:'#2D0308', fontWeight:700, textShadow:'0 1px 3px rgba(255,255,255,.5)', userSelect:'none' }}>囍</span>
              </div>
            </div>
          </div>
          {/* Flap back face */}
          <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', transform:'rotateX(180deg)' }}>
            <svg style={{ width:'100%', height:'100%' }} viewBox="0 0 380 270" preserveAspectRatio="none">
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="#5C0808" fillOpacity=".9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p ref={hintRef} style={{
        position:'relative', zIndex:10, marginTop:'2.4rem',
        fontFamily:'"Montserrat",sans-serif', fontWeight:300,
        fontSize:'9px', letterSpacing:'.55em', textTransform:'uppercase',
        color:'rgba(255,225,145,.55)', opacity:0,
        animation: opened ? 'none' : 'hintBlink 2.5s ease-in-out infinite',
      }}>
        {opened ? '' : 'Nhấn ấn ký để mở thiệp'}
      </p>
    </div>
  );
}
