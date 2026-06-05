import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ═══ FLOATING SPARKLE PARTICLES ═══ */
const Sparks = () => (
  <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:2 }}>
    {[...Array(70)].map((_, i) => {
      const size  = Math.random() * 3 + 1;
      const left  = Math.random() * 100;
      const delay = Math.random() * 10;
      const dur   = Math.random() * 8 + 6;
      const drift = (Math.random() - 0.5) * 60;
      return (
        <div key={i} style={{
          position:'absolute',
          left:`${left}%`, bottom:'-5px',
          width:`${size}px`, height:`${size}px`,
          borderRadius:'50%',
          background: i%4===0 ? '#FFF8E1' : i%4===1 ? '#D4AF37' : i%4===2 ? '#F3E5AB' : '#FFD700',
          boxShadow: `0 0 ${size*4}px ${size*2}px rgba(212,175,55,0.6)`,
          animation: `sparkUp${i%5} ${dur}s ${delay}s infinite ease-in-out`,
          opacity:0,
        }}/>
      );
    })}
    <style>{`
      @keyframes sparkUp0 { 0%{opacity:0;transform:translateY(0) translateX(0) scale(0)} 10%{opacity:1;transform:translateY(-15vh) translateX(10px) scale(1)} 90%{opacity:.3} 100%{opacity:0;transform:translateY(-100vh) translateX(30px) scale(0)} }
      @keyframes sparkUp1 { 0%{opacity:0;transform:translateY(0) translateX(0) scale(0)} 10%{opacity:.9;transform:translateY(-12vh) translateX(-20px) scale(1)} 90%{opacity:.2} 100%{opacity:0;transform:translateY(-95vh) translateX(-40px) scale(0)} }
      @keyframes sparkUp2 { 0%{opacity:0;transform:translateY(0) scale(0)} 15%{opacity:.8;transform:translateY(-10vh) scale(1)} 85%{opacity:.4} 100%{opacity:0;transform:translateY(-90vh) scale(0.3)} }
      @keyframes sparkUp3 { 0%{opacity:0;transform:translateY(0) translateX(0) scale(0)} 12%{opacity:.7;transform:translateY(-8vh) translateX(15px) scale(1)} 88%{opacity:.3} 100%{opacity:0;transform:translateY(-85vh) translateX(25px) scale(0)} }
      @keyframes sparkUp4 { 0%{opacity:0;transform:translateY(0) translateX(0) scale(0)} 8%{opacity:1;transform:translateY(-20vh) translateX(-10px) scale(1)} 92%{opacity:.2} 100%{opacity:0;transform:translateY(-100vh) translateX(-20px) scale(0)} }
    `}</style>
  </div>
);

/* ═══ INTRICATE DOOR ORNAMENT SVG ═══ */
const Ornament = () => (
  <svg viewBox="0 0 160 500" width="80%" height="90%" style={{position:'absolute',top:'5%',left:'10%',right:'10%'}}>
    <defs>
      <linearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#FFF8E1" stopOpacity="1"/>
        <stop offset="30%" stopColor="#D4AF37" stopOpacity="1"/>
        <stop offset="60%" stopColor="#F3E5AB" stopOpacity="1"/>
        <stop offset="100%" stopColor="#8B6508" stopOpacity="1"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g stroke="url(#gf)" fill="none" filter="url(#glow)" strokeLinecap="round">
      {/* SPINE */}
      <line x1="80" y1="10" x2="80" y2="490" strokeWidth="1" strokeOpacity=".4"/>
      {/* TOP FLAME */}
      <path d="M80,15 Q68,25 70,40 Q80,30 90,40 Q92,25 80,15" strokeWidth="1.5" fill="url(#gf)" fillOpacity=".3"/>
      <circle cx="80" cy="12" r="4" fill="url(#gf)" strokeWidth="0"/>
      {/* UPPER LOTUS */}
      <ellipse cx="80" cy="58" rx="16" ry="22" strokeWidth="1.4"/>
      <ellipse cx="80" cy="61" rx="10" ry="14" strokeWidth="1" strokeOpacity=".7"/>
      <ellipse cx="60" cy="66" rx="11" ry="7" strokeWidth="1.2" transform="rotate(-45 60 66)"/>
      <ellipse cx="100" cy="66" rx="11" ry="7" strokeWidth="1.2" transform="rotate(45 100 66)"/>
      <ellipse cx="44" cy="76" rx="9" ry="5" strokeWidth="1" transform="rotate(-60 44 76)"/>
      <ellipse cx="116" cy="76" rx="9" ry="5" strokeWidth="1" transform="rotate(60 116 76)"/>
      <circle cx="80" cy="48" r="4" fill="url(#gf)" strokeWidth="0"/>
      {/* SCROLLS L */}
      <path d="M80,100 C62,91 40,96 20,86" strokeWidth="1.3"/>
      <path d="M20,86 C12,80 11,68 19,62" strokeWidth="1.1"/>
      <ellipse cx="18" cy="59" rx="9" ry="6" strokeWidth="1.2" transform="rotate(-20 18 59)"/>
      <circle cx="18" cy="59" r="3" fill="url(#gf)" strokeWidth="0"/>
      {/* SCROLLS R */}
      <path d="M80,100 C98,91 120,96 140,86" strokeWidth="1.3"/>
      <path d="M140,86 C148,80 149,68 141,62" strokeWidth="1.1"/>
      <ellipse cx="142" cy="59" rx="9" ry="6" strokeWidth="1.2" transform="rotate(20 142 59)"/>
      <circle cx="142" cy="59" r="3" fill="url(#gf)" strokeWidth="0"/>
      {/* INNER SCROLLS */}
      <path d="M80,100 Q62,108 50,100 Q45,92 52,87" strokeWidth="1.1"/>
      <path d="M80,100 Q98,108 110,100 Q115,92 108,87" strokeWidth="1.1"/>
      {/* UPPER DIAMOND */}
      <polygon points="80,128 97,148 80,168 63,148" strokeWidth="1.6"/>
      <polygon points="80,136 91,148 80,160 69,148" strokeWidth="1" strokeOpacity=".6"/>
      <circle cx="80" cy="148" r="8" fill="url(#gf)" fillOpacity=".5" strokeWidth="0"/>
      <circle cx="80" cy="148" r="4" fill="#FFF8E1" strokeWidth="0"/>
      {/* MID MEDALLION */}
      <circle cx="80" cy="248" r="38" strokeWidth="1.8"/>
      <circle cx="80" cy="248" r="30" strokeWidth="1" strokeOpacity=".5"/>
      <circle cx="80" cy="248" r="20" strokeWidth="1.4"/>
      <circle cx="80" cy="248" r="10" fill="url(#gf)" fillOpacity=".6" strokeWidth="0"/>
      <circle cx="80" cy="248" r="5" fill="#FFF8E1" strokeWidth="0"/>
      {[0,45,90,135,180,225,270,315].map(a=>(
        <g key={a}>
          <line x1={80+23*Math.cos(a*Math.PI/180)} y1={248+23*Math.sin(a*Math.PI/180)} x2={80+32*Math.cos(a*Math.PI/180)} y2={248+32*Math.sin(a*Math.PI/180)} strokeWidth="1.5"/>
          <circle cx={80+38*Math.cos(a*Math.PI/180)} cy={248+38*Math.sin(a*Math.PI/180)} r="3.5" strokeWidth="1"/>
        </g>
      ))}
      {/* MID-LOW BRANCHES */}
      <path d="M80,295 C58,285 32,290 10,278" strokeWidth="1.3"/>
      <path d="M80,295 C102,285 128,290 150,278" strokeWidth="1.3"/>
      <ellipse cx="9" cy="275" rx="11" ry="7" strokeWidth="1.2" transform="rotate(-15 9 275)"/>
      <ellipse cx="151" cy="275" rx="11" ry="7" strokeWidth="1.2" transform="rotate(15 151 275)"/>
      <circle cx="9" cy="275" r="4" fill="url(#gf)" strokeWidth="0"/>
      <circle cx="151" cy="275" r="4" fill="url(#gf)" strokeWidth="0"/>
      {/* LOWER DIAMOND */}
      <polygon points="80,325 95,342 80,359 65,342" strokeWidth="1.5"/>
      <circle cx="80" cy="342" r="5" fill="url(#gf)" fillOpacity=".7" strokeWidth="0"/>
      {/* PHOENIX TAIL */}
      <path d="M80,385 Q60,398 44,418 Q52,424 62,414 Q65,430 72,437" strokeWidth="1.3"/>
      <path d="M80,385 Q100,398 116,418 Q108,424 98,414 Q95,430 88,437" strokeWidth="1.3"/>
      <path d="M80,385 Q74,405 76,425" strokeWidth="1.1"/>
      <path d="M80,385 Q86,405 84,425" strokeWidth="1.1"/>
      <ellipse cx="72" cy="440" rx="9" ry="5" strokeWidth="1.3" transform="rotate(-10 72 440)"/>
      <ellipse cx="88" cy="440" rx="9" ry="5" strokeWidth="1.3" transform="rotate(10 88 440)"/>
      <circle cx="80" cy="478" r="7" strokeWidth="1.6"/>
      <circle cx="80" cy="478" r="3.5" fill="url(#gf)" strokeWidth="0"/>
    </g>
  </svg>
);

/* ═══ MAIN COMPONENT ═══ */
export default function GateIntro({ onOpen }) {
  const container = useRef(null);
  const leftDoor  = useRef(null);
  const rightDoor = useRef(null);
  const seal      = useRef(null);
  const ring      = useRef(null);
  const glow      = useRef(null);
  const audio     = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Seal breathe + ring spin
    gsap.to(seal.current,  { scale:1.08, duration:1.8, repeat:-1, yoyo:true, ease:'sine.inOut' });
    gsap.to(ring.current,  { rotation:360, duration:18, repeat:-1, ease:'none', transformOrigin:'center center' });
    // Ambient glow pulse
    gsap.to('.door-ambient', { opacity:.18, duration:2.5, repeat:-1, yoyo:true, ease:'sine.inOut' });
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    if (audio.current) { audio.current.volume = .35; audio.current.play().catch(()=>{}); }

    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = 'auto'; onOpen?.(); } });
    tl.to(seal.current,  { scale:0, opacity:0, duration:.4, ease:'back.in(3)' }, 0)
      .to(leftDoor.current,  { rotateY:-115, duration:3.2, ease:'power3.inOut' }, .3)
      .to(rightDoor.current, { rotateY: 115, duration:3.2, ease:'power3.inOut' }, .3)
      .fromTo(glow.current, { opacity:0, scale:.3 }, { opacity:1, scale:8, duration:1.8, ease:'power2.out' }, 1.8)
      .to(container.current, { opacity:0, duration:.9, ease:'power2.inOut' }, 2.6)
      .set(container.current, { display:'none' });
  };

  const doorBase = {
    position:'absolute', top:0, height:'100%', width:'50%',
    transformStyle:'preserve-3d',
    overflow:'hidden',
  };

  return (
    <div ref={container} style={{
      position:'fixed', inset:0, zIndex:9999,
      perspective:'3000px', perspectiveOrigin:'50% 50%',
      background:'radial-gradient(ellipse 90% 90% at 50% 50%, #1E0307 0%, #0A0002 60%, #000 100%)',
      overflow:'hidden',
    }}>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes hintFade { 0%{opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{opacity:.3} }
      `}</style>

      <audio ref={audio} loop>
        <source src="https://cdn.pixabay.com/audio/2022/10/16/audio_12a5d4e93f.mp3" type="audio/mpeg"/>
      </audio>

      <Sparks />

      {/* Gold burst on open */}
      <div ref={glow} style={{
        position:'absolute', top:'50%', left:'50%',
        width:'120px', height:'120px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,248,225,.95) 0%, rgba(212,175,55,.4) 50%, transparent 70%)',
        transform:'translate(-50%,-50%) scale(.3)', opacity:0,
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* TOP ORNATE HEADER */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'60px', zIndex:15, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(0,0,0,.8), transparent)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37)' }}/>
          <span className="font-sans" style={{ fontSize:'9px', letterSpacing:'.6em', color:'#D4AF37', textTransform:'uppercase' }}>Lễ Thành Hôn 2026</span>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(to left, transparent, #D4AF37)' }}/>
        </div>
      </div>

      {/* LEFT DOOR */}
      <div ref={leftDoor} style={{
        ...doorBase, left:0,
        transformOrigin:'left center',
        background:'linear-gradient(108deg, #3D0812 0%, #6B1020 20%, #8B1A28 40%, #6B1020 65%, #3A0810 85%, #1E0307 100%)',
        borderRight:'2px solid #D4AF37',
        boxShadow:'inset -60px 0 120px rgba(0,0,0,.85), 15px 0 40px rgba(0,0,0,.95)',
      }}>
        {/* Ambient glow strip */}
        <div className="door-ambient" style={{ position:'absolute', top:0, right:0, bottom:0, width:'30%', background:'linear-gradient(to left, rgba(212,175,55,.12), transparent)', opacity:.1, pointerEvents:'none' }}/>
        {/* Frames */}
        <div style={{ position:'absolute', inset:'14px', border:'1.5px solid rgba(212,175,55,.65)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', inset:'26px', border:'1px solid rgba(212,175,55,.25)', pointerEvents:'none', zIndex:3 }}/>
        {/* Wood grain */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, backgroundImage:'repeating-linear-gradient(172deg, transparent 0, transparent 10px, rgba(0,0,0,.05) 10px, rgba(0,0,0,.05) 11px)' }}/>
        {/* Ornament */}
        <div style={{ position:'absolute', inset:'30px', zIndex:2, pointerEvents:'none' }}><Ornament /></div>
        {/* Name */}
        <div style={{ position:'absolute', bottom:'9%', left:0, right:0, textAlign:'center', zIndex:5 }}>
          <h2 className="font-script" style={{ fontSize:'clamp(2.2rem,4vw,3.8rem)', color:'#F3E5AB', margin:0, textShadow:'0 0 25px rgba(212,175,55,.7), 0 3px 10px rgba(0,0,0,.9)', letterSpacing:'.04em' }}>Đại Nghĩa</h2>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37, transparent)', margin:'8px auto 0' }}/>
        </div>
        {/* Hinges */}
        {[.15,.5,.85].map((p,i)=>(
          <div key={i} style={{ position:'absolute', top:`calc(${p*100}% - 22px)`, right:'-2px', width:'16px', height:'44px', background:'linear-gradient(180deg, #5A3E00, #D4AF37 35%, #FFF8E1 50%, #D4AF37 65%, #5A3E00)', borderRadius:'3px', boxShadow:'0 3px 8px rgba(0,0,0,.8)', zIndex:6 }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', width:'8px', height:'8px', borderRadius:'50%', background:'radial-gradient(circle, #FFF8E1, #8B6508)', transform:'translate(-50%,-50%)' }}/>
          </div>
        ))}
      </div>

      {/* RIGHT DOOR */}
      <div ref={rightDoor} style={{
        ...doorBase, right:0,
        transformOrigin:'right center',
        background:'linear-gradient(72deg, #1E0307 0%, #3A0810 15%, #6B1020 40%, #8B1A28 60%, #6B1020 80%, #3D0812 100%)',
        borderLeft:'2px solid #D4AF37',
        boxShadow:'inset 60px 0 120px rgba(0,0,0,.85), -15px 0 40px rgba(0,0,0,.95)',
      }}>
        <div className="door-ambient" style={{ position:'absolute', top:0, left:0, bottom:0, width:'30%', background:'linear-gradient(to right, rgba(212,175,55,.12), transparent)', opacity:.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:'14px', border:'1.5px solid rgba(212,175,55,.65)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', inset:'26px', border:'1px solid rgba(212,175,55,.25)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, backgroundImage:'repeating-linear-gradient(172deg, transparent 0, transparent 10px, rgba(0,0,0,.05) 10px, rgba(0,0,0,.05) 11px)' }}/>
        <div style={{ position:'absolute', inset:'30px', zIndex:2, pointerEvents:'none' }}><Ornament /></div>
        <div style={{ position:'absolute', bottom:'9%', left:0, right:0, textAlign:'center', zIndex:5 }}>
          <h2 className="font-script" style={{ fontSize:'clamp(2.2rem,4vw,3.8rem)', color:'#F3E5AB', margin:0, textShadow:'0 0 25px rgba(212,175,55,.7), 0 3px 10px rgba(0,0,0,.9)', letterSpacing:'.04em' }}>Thị Nhung</h2>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37, transparent)', margin:'8px auto 0' }}/>
        </div>
        {[.15,.5,.85].map((p,i)=>(
          <div key={i} style={{ position:'absolute', top:`calc(${p*100}% - 22px)`, left:'-2px', width:'16px', height:'44px', background:'linear-gradient(180deg, #5A3E00, #D4AF37 35%, #FFF8E1 50%, #D4AF37 65%, #5A3E00)', borderRadius:'3px', boxShadow:'0 3px 8px rgba(0,0,0,.8)', zIndex:6 }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', width:'8px', height:'8px', borderRadius:'50%', background:'radial-gradient(circle, #FFF8E1, #8B6508)', transform:'translate(-50%,-50%)' }}/>
          </div>
        ))}
      </div>

      {/* CENTER GOLD SEAM */}
      <div style={{ position:'absolute', top:0, left:'50%', width:'2px', height:'100%', background:'linear-gradient(to bottom, transparent 3%, #8B6508 10%, #D4AF37 30%, #F3E5AB 50%, #D4AF37 70%, #8B6508 90%, transparent 97%)', transform:'translateX(-50%)', zIndex:10, pointerEvents:'none', boxShadow:'0 0 12px rgba(212,175,55,.6)' }}/>

      {/* WAX SEAL */}
      <div ref={seal} onClick={handleOpen} style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:'clamp(88px,10vw,120px)', height:'clamp(88px,10vw,120px)',
        cursor:'pointer', zIndex:20,
      }}>
        {/* Outer halo */}
        <div style={{ position:'absolute', inset:'-18px', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,.2) 0%, transparent 70%)', animation:'hintFade 3s 2s ease-in-out forwards' }}/>
        {/* Rotating ring */}
        <div ref={ring} style={{ position:'absolute', inset:'-5px', borderRadius:'50%', border:'1px dashed rgba(212,175,55,.55)', transformOrigin:'center center' }}/>
        <div style={{ position:'absolute', inset:'-9px', borderRadius:'50%', border:'1px solid rgba(212,175,55,.15)' }}/>
        {/* Seal body */}
        <div style={{
          position:'absolute', inset:0, borderRadius:'50%',
          background:'radial-gradient(circle at 32% 28%, #FFF8E1 0%, #D4AF37 28%, #8B6508 58%, #4A2E00 80%, #2A1800 100%)',
          boxShadow:'0 0 0 2px rgba(212,175,55,.7), 0 0 0 5px rgba(212,175,55,.15), 0 25px 60px rgba(0,0,0,.98), inset 0 3px 6px rgba(255,255,255,.55), inset 0 -3px 12px rgba(0,0,0,.7)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{ position:'absolute', inset:'7px', border:'1px solid rgba(139,101,8,.5)', borderRadius:'50%' }}/>
          <span className="font-serif" style={{ fontSize:'clamp(2rem,3.5vw,2.8rem)', color:'#2D0409', fontWeight:700, textShadow:'0 1px 3px rgba(255,255,255,.5)', position:'relative', zIndex:2 }}>囍</span>
        </div>
      </div>

      {/* BOTTOM HINT */}
      <p className="font-sans" style={{ position:'absolute', bottom:'6%', left:0, right:0, textAlign:'center', zIndex:15, pointerEvents:'none', fontSize:'10px', letterSpacing:'.5em', textTransform:'uppercase', color:'rgba(212,175,55,.65)', animation:'hintFade 4s 1.5s ease-in-out forwards' }}>
        Chạm ấn phong ấn để khai tiệc
      </p>
      {/* BOTTOM HEADER */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50px', zIndex:15, pointerEvents:'none', background:'linear-gradient(to top, rgba(0,0,0,.7), transparent)', display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:'14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37)' }}/>
          <span className="font-sans" style={{ fontSize:'8px', letterSpacing:'.5em', color:'rgba(212,175,55,.5)', textTransform:'uppercase' }}>20 · 10 · 2026</span>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to left, transparent, #D4AF37)' }}/>
        </div>
      </div>
    </div>
  );
}
