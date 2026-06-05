import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

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
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.3, vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.38 + 0.06),
      phase: Math.random() * Math.PI * 2, spd: 0.006 + Math.random() * 0.006,
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
        const a = ((Math.sin(t * p.spd + p.phase) + 1) / 2) * 0.65;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue},85%,82%,${a})`);
        g.addColorStop(0.4, `hsla(${p.hue},70%,58%,${a * 0.5})`);
        g.addColorStop(1, `hsla(${p.hue},60%,38%,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(50,100%,92%,${a * 0.9})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvas} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2 }}/>;
}

/* ─── Main Component ─── */
export default function EnvelopePortal({ onOpenComplete, guestName }) {
  const [opened, setOpened] = useState(false);
  const containerRef = useRef(null);
  const envelopeRef  = useRef(null);
  const flapRef      = useRef(null);
  const cardRef      = useRef(null);
  const sealRef      = useRef(null);
  const ring1Ref     = useRef(null);
  const ring2Ref     = useRef(null);
  const hintRef      = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Float envelope
    gsap.to(envelopeRef.current, { y: -12, duration: 2.8, ease:'sine.inOut', yoyo:true, repeat:-1 });
    // Seal rings rotate
    gsap.to(ring1Ref.current, { rotation: 360,  duration:22, repeat:-1, ease:'none', transformOrigin:'center center' });
    gsap.to(ring2Ref.current, { rotation:-360,  duration:14, repeat:-1, ease:'none', transformOrigin:'center center' });
    // Seal breathe
    gsap.to(sealRef.current,  { scale:1.07, duration:2, yoyo:true, repeat:-1, ease:'sine.inOut' });
    // Hint fade in
    gsap.fromTo(hintRef.current, { opacity:0, y:10 }, { opacity:1, y:0, duration:1.5, delay:1.2 });
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    gsap.killTweensOf([envelopeRef.current, ring1Ref.current, ring2Ref.current, sealRef.current]);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity:0, duration:1.2, ease:'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = 'auto';
            onOpenComplete?.();
          }
        });
      }
    });

    // 1. Seal out
    tl.to(sealRef.current, { scale:1.2, opacity:0, duration:0.35, ease:'power2.in' }, 0);
    // 2. Flap opens
    tl.to(flapRef.current, {
      rotateX:-190, duration:1.5, ease:'back.out(1.1)',
      onUpdate() { if (this.progress() > 0.42) flapRef.current.style.zIndex = '2'; }
    }, 0.1);
    // 3. Card slides up and reveals
    tl.set(cardRef.current, { opacity:1 }, 0.3); // make card visible
    tl.to(cardRef.current, { y:'-65%', duration:1.8, ease:'power2.out' }, 0.7);
    // 4. Envelope scales up and fades
    tl.to(envelopeRef.current, { scale:4, opacity:0, duration:1.4, ease:'power2.inOut' }, 1.4);
  };

  const name = guestName?.trim() || null;

  return (
    <div ref={containerRef} style={{
      position:'fixed', inset:0, zIndex:9999,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse 130% 110% at 50% 110%, #B22B1A 0%, #8B1A0F 22%, #6A1010 45%, #4A0808 68%, #220203 100%)',
      overflow:'hidden',
    }}>
      <style>{`
        @keyframes hintBlink { 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>

      <GoldDust />

      {/* Ambient radial glow */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(210,160,50,.18) 0%, transparent 70%)' }}/>

      {/* Top / bottom gold lines */}
      {['top','bottom'].map(side => (
        <div key={side} style={{
          position:'absolute', [side]:0, left:0, right:0, height:'3px',
          background:'linear-gradient(90deg, transparent 5%, rgba(212,175,55,.55) 30%, rgba(255,240,160,1) 50%, rgba(212,175,55,.55) 70%, transparent 95%)',
          zIndex:8,
        }}/>
      ))}

      {/* Corner frames */}
      <div style={{ position:'absolute', inset:'18px', border:'1px solid rgba(212,175,55,.2)', zIndex:3, pointerEvents:'none' }}>
        {[{ top:'-1px',left:'-1px',rot:'0' }, { top:'-1px',right:'-1px',rot:'90' }, { bottom:'-1px',left:'-1px',rot:'270' }, { bottom:'-1px',right:'-1px',rot:'180' }].map((p,i)=>(
          <svg key={i} style={{ position:'absolute', width:'24px', height:'24px', ...p, transform:`rotate(${p.rot}deg)` }} viewBox="0 0 24 24" fill="none">
            <path d="M1 23 L1 1 L23 1" stroke="rgba(212,175,55,.6)" strokeWidth="1.5"/>
          </svg>
        ))}
      </div>

      {/* Guest name */}
      {name && (
        <div style={{ position:'relative', zIndex:10, textAlign:'center', marginBottom:'1.5rem' }}>
          <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:300, fontSize:'9px', letterSpacing:'.6em', textTransform:'uppercase', color:'rgba(255,230,170,.65)', margin:'0 0 .4rem' }}>Trân trọng kính mời</p>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(212,175,55,.7),transparent)', margin:'0 auto .5rem' }}/>
          <p style={{ fontFamily:'"Dancing Script",cursive', fontWeight:700, fontSize:'clamp(2rem,6vw,3rem)', color:'#FFF0B0', textShadow:'0 2px 30px rgba(220,175,50,.5)', lineHeight:1.1 }}>{name}</p>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(90deg,transparent,rgba(212,175,55,.7),transparent)', margin:'.5rem auto 0' }}/>
        </div>
      )}

      {/* ─── ENVELOPE ASSEMBLY ─── */}
      <div ref={envelopeRef} style={{
        position:'relative',
        width:'clamp(280px, 55vw, 380px)',
        aspectRatio:'5 / 7',
        perspectiveOrigin:'50% 50%',
        perspective:'1800px',
        zIndex:10,
      }}>

        {/* Glow ring */}
        <div style={{
          position:'absolute', inset:'-18px', borderRadius:'1.6rem',
          boxShadow:'0 0 80px rgba(180,50,20,.5), 0 60px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(212,175,55,.22)',
          pointerEvents:'none',
        }}/>

        {/* ── ENVELOPE BODY (velvet image) ── */}
        <div style={{
          position:'absolute', inset:0, borderRadius:'1.3rem', overflow:'hidden',
          backgroundImage:`url("${import.meta.env.BASE_URL}envelope_front_velvet.png")`,
          backgroundSize:'cover', backgroundPosition:'center',
          border:'1px solid rgba(212,175,55,.4)',
          zIndex:1,
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'45%', background:'linear-gradient(to bottom, rgba(255,255,255,.07), transparent)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.28) 0%, transparent 55%)', pointerEvents:'none' }}/>
        </div>

        {/* ── INNER CARD (hidden until open, uses envelope_back.png) ── */}
        <div ref={cardRef} style={{
          position:'absolute', left:'8px', right:'8px', top:'8px', bottom:'8px',
          backgroundImage:`url("${import.meta.env.BASE_URL}envelope_back.png")`,
          backgroundSize:'cover', backgroundPosition:'center',
          borderRadius:'1rem',
          border:'1px solid rgba(212,175,55,.4)',
          boxShadow:'0 10px 40px rgba(30,10,0,.3)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          overflow:'hidden', zIndex:3,
          // CRITICAL: hidden by default, only shown when flap opens
          opacity: 0,
        }}>
          {/* Readable overlay */}
          <div style={{ position:'absolute', inset:0, background:'rgba(253,248,235,.78)', pointerEvents:'none' }}/>
          {/* Inner double frame */}
          <div style={{ position:'absolute', inset:'10px', border:'0.5px solid rgba(180,130,40,.3)', borderRadius:'.7rem', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:'18px', border:'0.5px solid rgba(180,130,40,.14)', borderRadius:'.35rem', pointerEvents:'none' }}/>

          {/* Card content */}
          <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 1.8rem', width:'100%' }}>
            <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:600, fontSize:'7px', letterSpacing:'.55em', textTransform:'uppercase', color:'#B8870B', margin:'0 0 .6rem' }}>Thiệp Hồng</p>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', justifyContent:'center', marginBottom:'.7rem' }}>
              <div style={{ flex:1, height:'.5px', background:'linear-gradient(90deg,transparent,rgba(180,130,40,.6))' }}/>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><polygon points="4.5,0 9,4.5 4.5,9 0,4.5" stroke="rgba(180,130,40,.8)" strokeWidth=".6" fill="rgba(180,130,40,.1)"/></svg>
              <div style={{ flex:1, height:'.5px', background:'linear-gradient(90deg,rgba(180,130,40,.6),transparent)' }}/>
            </div>
            <h2 style={{ fontFamily:'"Dancing Script",cursive', fontWeight:700, fontSize:'clamp(1.8rem,7vw,2.7rem)', color:'#7B1A1A', lineHeight:1, margin:'0 0 .1rem' }}>Đại Nghĩa</h2>
            <p style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic', fontSize:'1.1rem', color:'#B8870B', margin:'.1rem 0', lineHeight:1 }}>&amp;</p>
            <h2 style={{ fontFamily:'"Dancing Script",cursive', fontWeight:700, fontSize:'clamp(1.8rem,7vw,2.7rem)', color:'#7B1A1A', lineHeight:1, margin:'0 0 .8rem' }}>Thị Nhung</h2>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', justifyContent:'center', marginBottom:'.4rem' }}>
              <div style={{ flex:1, height:'.5px', background:'linear-gradient(90deg,transparent,rgba(180,130,40,.5))' }}/>
              <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:300, fontSize:'7px', letterSpacing:'.3em', textTransform:'uppercase', color:'#6B4226', opacity:.8, margin:0, whiteSpace:'nowrap' }}>Trân trọng kính mời</p>
              <div style={{ flex:1, height:'.5px', background:'linear-gradient(90deg,rgba(180,130,40,.5),transparent)' }}/>
            </div>
            <p style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:400, fontSize:'9px', letterSpacing:'.28em', color:'#8B5E3C', opacity:.8, margin:0 }}>20 · 10 · 2026</p>
          </div>
        </div>

        {/* ── LOWER POCKET ── */}
        <div style={{ position:'absolute', inset:0, zIndex:4, pointerEvents:'none', borderRadius:'1.3rem', overflow:'hidden' }}>
          <svg style={{ position:'absolute', bottom:0, left:0, width:'100%', height:'42%' }} viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M0,180 L380,180 L380,0 L0,60 Z" fill="url(#pocketGrad)" fillOpacity=".92"/>
            <path d="M0,180 L380,180 L380,0 L0,60 Z" fill="none" stroke="rgba(212,175,55,.3)" strokeWidth="1"/>
            <defs>
              <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5C0808"/>
                <stop offset="100%" stopColor="#3A0505"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── FLAP (top, opens up) ── */}
        <div ref={flapRef} style={{
          position:'absolute', top:0, left:0, right:0, height:'65%',
          transformOrigin:'top center', transformStyle:'preserve-3d',
          zIndex:5,
        }}>
          {/* Front face */}
          <div style={{ width:'100%', height:'100%', position:'relative', backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden' }}>
            <svg style={{ width:'100%', height:'100%' }} viewBox="0 0 380 270" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8392B"/>
                  <stop offset="45%" stopColor="#9C1C1C"/>
                  <stop offset="100%" stopColor="#6B0A0A"/>
                </linearGradient>
              </defs>
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="url(#flapGrad)"/>
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="none" stroke="rgba(212,175,55,.55)" strokeWidth="1.2"/>
              <path d="M18,16 L362,16 L362,170 Q190,258 18,170 Z" fill="none" stroke="rgba(212,175,55,.12)" strokeWidth=".7"/>
              {/* Subtle diamond motif */}
              <polygon points="190,55 204,75 190,95 176,75" fill="none" stroke="rgba(230,195,100,.2)" strokeWidth=".9"/>
              <circle cx="190" cy="75" r="2" fill="rgba(230,195,100,.2)"/>
            </svg>

            {/* Seal */}
            <div ref={sealRef} onClick={handleOpen} style={{
              position:'absolute', bottom:'14%', left:'50%', transform:'translateX(-50%)',
              width:'clamp(72px,12vw,90px)', height:'clamp(72px,12vw,90px)',
              cursor:'pointer',
            }}>
              {/* Rings */}
              <div ref={ring1Ref} style={{ position:'absolute', inset:'-7px', borderRadius:'50%', border:'1px dashed rgba(212,175,55,.55)', transformOrigin:'center center' }}/>
              <div ref={ring2Ref} style={{ position:'absolute', inset:'-2px', borderRadius:'50%', border:'1px solid rgba(212,175,55,.22)', transformOrigin:'center center' }}/>
              {/* Body */}
              <div style={{
                position:'absolute', inset:0, borderRadius:'50%',
                background:'radial-gradient(circle at 30% 28%, #FFF8E1 0%, #D4AF37 28%, #9B7412 55%, #5A3E00 78%, #2A1800 100%)',
                boxShadow:'0 6px 28px rgba(0,0,0,.55), 0 0 0 2px rgba(212,175,55,.5), 0 0 30px rgba(212,175,55,.3), inset 0 2px 5px rgba(255,255,255,.55), inset 0 -2px 8px rgba(0,0,0,.65)',
                display:'flex', alignItems:'center', justifyContent:'center',
                animation:'sealPulse 2.5s ease-in-out infinite',
              }}>
                <div style={{ position:'absolute', inset:'7px', border:'1px solid rgba(139,101,8,.4)', borderRadius:'50%' }}/>
                <span style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.7rem,3vw,2.2rem)', color:'#2D0308', fontWeight:700, textShadow:'0 1px 3px rgba(255,255,255,.5)', userSelect:'none' }}>囍</span>
              </div>
            </div>
          </div>

          {/* Back face (inside of flap) */}
          <div style={{
            position:'absolute', inset:0,
            backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            transform:'rotateX(180deg)',
          }}>
            <svg style={{ width:'100%', height:'100%' }} viewBox="0 0 380 270" preserveAspectRatio="none">
              <path d="M0,0 L380,0 L380,185 Q190,285 0,185 Z" fill="#5C0808" fillOpacity=".88"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p ref={hintRef} style={{
        position:'relative', zIndex:10, marginTop:'2rem',
        fontFamily:'"Montserrat",sans-serif', fontWeight:300,
        fontSize:'9px', letterSpacing:'.5em', textTransform:'uppercase',
        color:'rgba(255,220,140,.5)', opacity:0,
        animation: opened ? 'none' : 'hintBlink 2.5s 2s ease-in-out infinite',
      }}>
        {opened ? '' : 'Nhấn ấn ký để mở thiệp'}
      </p>

      <style>{`
        @keyframes sealPulse {
          0%,100% { box-shadow: 0 6px 28px rgba(0,0,0,.55), 0 0 0 2px rgba(212,175,55,.5), 0 0 15px rgba(212,175,55,.2), inset 0 2px 5px rgba(255,255,255,.55); }
          50%      { box-shadow: 0 6px 28px rgba(0,0,0,.55), 0 0 0 2px rgba(212,175,55,.5), 0 0 40px rgba(212,175,55,.5), inset 0 2px 5px rgba(255,255,255,.55); }
        }
      `}</style>
    </div>
  );
}
