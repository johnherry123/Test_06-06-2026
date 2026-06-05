import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ─── Sparks (stable array, no Math.random in render) ─── */
const SPARKS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: (i * 0.17 % 3) + 1,
  left: (i * 1.618 * 10) % 100,
  delay: (i * 0.3) % 10,
  dur: ((i * 0.47) % 8) + 6,
  key: i % 5,
  color: ['#FFF8E1','#D4AF37','#F3E5AB','#FFD700'][i % 4],
}));

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
    gsap.to(seal.current,  { scale: 1.08, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(ring.current,  { rotation: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    if (audio.current) { audio.current.volume = 0.35; audio.current.play().catch(() => {}); }

    const tl = gsap.timeline({
      onComplete: () => { document.body.style.overflow = 'auto'; onOpen?.(); }
    });
    tl.to(seal.current,      { scale: 0, opacity: 0, duration: 0.45, ease: 'back.in(3)' }, 0)
      .to(leftDoor.current,  { rotateY: -115, duration: 3.0, ease: 'power3.inOut' }, 0.3)
      .to(rightDoor.current, { rotateY:  115, duration: 3.0, ease: 'power3.inOut' }, 0.3)
      .fromTo(glow.current, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 7, duration: 1.6, ease: 'power2.out' }, 1.8)
      .to(container.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 2.4)
      .set(container.current, { display: 'none' });
  };

  return (
    <div ref={container} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      perspective: '3000px', perspectiveOrigin: '50% 50%',
      background: 'radial-gradient(ellipse 90% 90% at 50% 50%, #1E0307 0%, #0A0002 60%, #000 100%)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes sparkUp0{0%{opacity:0;transform:translateY(0) scale(0)}10%{opacity:1;transform:translateY(-15vh) translateX(10px) scale(1)}90%{opacity:.3}100%{opacity:0;transform:translateY(-100vh) translateX(30px) scale(0)}}
        @keyframes sparkUp1{0%{opacity:0;transform:translateY(0) scale(0)}10%{opacity:.9;transform:translateY(-12vh) translateX(-20px) scale(1)}90%{opacity:.2}100%{opacity:0;transform:translateY(-95vh) translateX(-40px) scale(0)}}
        @keyframes sparkUp2{0%{opacity:0;transform:translateY(0) scale(0)}15%{opacity:.8;transform:translateY(-10vh) scale(1)}85%{opacity:.4}100%{opacity:0;transform:translateY(-90vh) scale(0.3)}}
        @keyframes sparkUp3{0%{opacity:0;transform:translateY(0) scale(0)}12%{opacity:.7;transform:translateY(-8vh) translateX(15px) scale(1)}88%{opacity:.3}100%{opacity:0;transform:translateY(-85vh) translateX(25px) scale(0)}}
        @keyframes sparkUp4{0%{opacity:0;transform:translateY(0) scale(0)}8%{opacity:1;transform:translateY(-20vh) translateX(-10px) scale(1)}92%{opacity:.2}100%{opacity:0;transform:translateY(-100vh) translateX(-20px) scale(0)}}
        @keyframes hintFade{0%{opacity:0}20%{opacity:1}80%{opacity:1}100%{opacity:.3}}
      `}</style>

      <audio ref={audio} loop>
        <source src="https://cdn.pixabay.com/audio/2022/10/16/audio_12a5d4e93f.mp3" type="audio/mpeg"/>
      </audio>

      {/* Particles */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:2 }}>
        {SPARKS.map(p => (
          <div key={p.id} style={{
            position:'absolute', left:`${p.left}%`, bottom:'-5px',
            width:`${p.size}px`, height:`${p.size}px`, borderRadius:'50%',
            background: p.color,
            boxShadow:`0 0 ${p.size*4}px ${p.size*2}px rgba(212,175,55,0.5)`,
            animation:`sparkUp${p.key} ${p.dur}s ${p.delay}s infinite ease-in-out`,
            opacity:0,
          }}/>
        ))}
      </div>

      {/* Gold light burst */}
      <div ref={glow} style={{
        position:'absolute', top:'50%', left:'50%',
        width:'150px', height:'150px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,248,225,.95) 0%, rgba(212,175,55,.4) 50%, transparent 70%)',
        transform:'translate(-50%,-50%) scale(0.3)', opacity:0,
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* TOP HEADER */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'56px', zIndex:15, pointerEvents:'none', background:'linear-gradient(to bottom, rgba(0,0,0,.85), transparent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37)' }}/>
          <span style={{ fontFamily:'"Montserrat",sans-serif', fontSize:'9px', letterSpacing:'.6em', color:'#D4AF37', textTransform:'uppercase' }}>Lễ Thành Hôn 2026</span>
          <div style={{ width:'80px', height:'1px', background:'linear-gradient(to left, transparent, #D4AF37)' }}/>
        </div>
      </div>

      {/* ── LEFT DOOR: real image, left half ── */}
      <div ref={leftDoor} style={{
        position:'absolute', top:0, left:0, width:'50%', height:'100%',
        transformOrigin:'left center', transformStyle:'preserve-3d',
        backgroundImage:'url("/gate-bg.png")',
        backgroundSize:'200% 100%',
        backgroundPosition:'left center',
        borderRight:'2px solid #D4AF37',
        boxShadow:'inset -60px 0 120px rgba(0,0,0,.75), 15px 0 40px rgba(0,0,0,.95)',
        overflow:'hidden',
      }}>
        {/* Cinematic shadow overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 80%)', pointerEvents:'none' }}/>
        {/* Gold frame */}
        <div style={{ position:'absolute', inset:'14px', border:'1.5px solid rgba(212,175,55,.55)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', inset:'24px', border:'1px solid rgba(212,175,55,.2)', pointerEvents:'none', zIndex:3 }}/>
        {/* Name label */}
        <div style={{ position:'absolute', bottom:'8%', left:0, right:0, textAlign:'center', zIndex:5 }}>
          <h2 style={{ fontFamily:'"Dancing Script",cursive', fontSize:'clamp(2.5rem,5vw,4rem)', color:'#FFF8E1', margin:0, textShadow:'0 0 30px rgba(212,175,55,.8), 0 3px 12px rgba(0,0,0,.95)' }}>Đại Nghĩa</h2>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37, transparent)', margin:'8px auto 0' }}/>
        </div>
        {/* Hinges */}
        {[0.15, 0.5, 0.85].map((p, i) => (
          <div key={i} style={{ position:'absolute', top:`calc(${p*100}% - 22px)`, right:'-2px', width:'18px', height:'44px', background:'linear-gradient(180deg, #5A3E00, #D4AF37 35%, #FFF8E1 50%, #D4AF37 65%, #5A3E00)', borderRadius:'3px', boxShadow:'0 3px 8px rgba(0,0,0,.9)', zIndex:6 }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', width:'8px', height:'8px', borderRadius:'50%', background:'radial-gradient(circle, #FFF8E1, #8B6508)', transform:'translate(-50%,-50%)' }}/>
          </div>
        ))}
      </div>

      {/* ── RIGHT DOOR: real image, right half ── */}
      <div ref={rightDoor} style={{
        position:'absolute', top:0, right:0, width:'50%', height:'100%',
        transformOrigin:'right center', transformStyle:'preserve-3d',
        backgroundImage:'url("/gate-bg.png")',
        backgroundSize:'200% 100%',
        backgroundPosition:'right center',
        borderLeft:'2px solid #D4AF37',
        boxShadow:'inset 60px 0 120px rgba(0,0,0,.75), -15px 0 40px rgba(0,0,0,.95)',
        overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to left, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 80%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:'14px', border:'1.5px solid rgba(212,175,55,.55)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', inset:'24px', border:'1px solid rgba(212,175,55,.2)', pointerEvents:'none', zIndex:3 }}/>
        <div style={{ position:'absolute', bottom:'8%', left:0, right:0, textAlign:'center', zIndex:5 }}>
          <h2 style={{ fontFamily:'"Dancing Script",cursive', fontSize:'clamp(2.5rem,5vw,4rem)', color:'#FFF8E1', margin:0, textShadow:'0 0 30px rgba(212,175,55,.8), 0 3px 12px rgba(0,0,0,.95)' }}>Thị Nhung</h2>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37, transparent)', margin:'8px auto 0' }}/>
        </div>
        {[0.15, 0.5, 0.85].map((p, i) => (
          <div key={i} style={{ position:'absolute', top:`calc(${p*100}% - 22px)`, left:'-2px', width:'18px', height:'44px', background:'linear-gradient(180deg, #5A3E00, #D4AF37 35%, #FFF8E1 50%, #D4AF37 65%, #5A3E00)', borderRadius:'3px', boxShadow:'0 3px 8px rgba(0,0,0,.9)', zIndex:6 }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', width:'8px', height:'8px', borderRadius:'50%', background:'radial-gradient(circle, #FFF8E1, #8B6508)', transform:'translate(-50%,-50%)' }}/>
          </div>
        ))}
      </div>

      {/* CENTER SEAM */}
      <div style={{ position:'absolute', top:0, left:'50%', width:'2px', height:'100%', background:'linear-gradient(to bottom, transparent 3%, #8B6508 10%, #D4AF37 30%, #F3E5AB 50%, #D4AF37 70%, #8B6508 90%, transparent 97%)', transform:'translateX(-50%)', zIndex:10, pointerEvents:'none', boxShadow:'0 0 14px rgba(212,175,55,.7)' }}/>

      {/* WAX SEAL */}
      <div ref={seal} onClick={handleOpen} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'clamp(88px,10vw,118px)', height:'clamp(88px,10vw,118px)', cursor:'pointer', zIndex:20 }}>
        <div style={{ position:'absolute', inset:'-16px', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,.25) 0%, transparent 70%)' }}/>
        <div ref={ring} style={{ position:'absolute', inset:'-5px', borderRadius:'50%', border:'1px dashed rgba(212,175,55,.6)', transformOrigin:'center center' }}/>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle at 32% 28%, #FFF8E1 0%, #D4AF37 28%, #8B6508 58%, #4A2E00 80%, #2A1800 100%)', boxShadow:'0 0 0 2px rgba(212,175,55,.7), 0 0 0 5px rgba(212,175,55,.15), 0 25px 60px rgba(0,0,0,.98), inset 0 3px 6px rgba(255,255,255,.55), inset 0 -3px 12px rgba(0,0,0,.7)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'absolute', inset:'7px', border:'1px solid rgba(139,101,8,.5)', borderRadius:'50%' }}/>
          <span style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(2rem,3.5vw,2.8rem)', color:'#2D0409', fontWeight:700, textShadow:'0 1px 3px rgba(255,255,255,.5)', position:'relative', zIndex:2 }}>囍</span>
        </div>
      </div>

      {/* HINT */}
      <p style={{ position:'absolute', bottom:'6%', left:0, right:0, textAlign:'center', zIndex:15, pointerEvents:'none', fontFamily:'"Montserrat",sans-serif', fontSize:'10px', letterSpacing:'.5em', textTransform:'uppercase', color:'rgba(212,175,55,.65)', animation:'hintFade 4s 1.5s ease-in-out forwards', opacity:0 }}>
        Chạm ấn phong ấn để khai tiệc
      </p>

      {/* BOTTOM FOOTER */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50px', zIndex:15, pointerEvents:'none', background:'linear-gradient(to top, rgba(0,0,0,.75), transparent)', display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:'14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to right, transparent, #D4AF37)' }}/>
          <span style={{ fontFamily:'"Montserrat",sans-serif', fontSize:'8px', letterSpacing:'.5em', color:'rgba(212,175,55,.5)', textTransform:'uppercase' }}>20 · 10 · 2026</span>
          <div style={{ width:'50px', height:'1px', background:'linear-gradient(to left, transparent, #D4AF37)' }}/>
        </div>
      </div>
    </div>
  );
}
