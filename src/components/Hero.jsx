import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll parallax
    gsap.to(bgRef.current, {
      yPercent: 28, ease:'none',
      scrollTrigger: { trigger: sectionRef.current, start:'top top', end:'bottom top', scrub:true },
    });

    // Stagger entrance
    gsap.fromTo(
      contentRef.current.querySelectorAll('.hl'),
      { opacity:0, y:45 },
      { opacity:1, y:0, duration:1.8, stagger:.18, ease:'power3.out', delay:.5 }
    );

    // Mouse parallax
    const onMove = e => {
      const xP = (e.clientX / window.innerWidth  - .5) * 20;
      const yP = (e.clientY / window.innerHeight - .5) * 14;
      gsap.to(bgRef.current,      { x: xP * 1.6, y: yP * 1.6, duration:1.4, ease:'power2.out' });
      gsap.to(contentRef.current, { x: xP * -.5, y: yP * -.5, duration:1.4, ease:'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={sectionRef} style={{ position:'relative', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>

      {/* BG photo */}
      <div ref={bgRef} style={{
        position:'absolute', top:'-12%', left:'-6%', right:'-6%', bottom:'-12%',
        backgroundImage:'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=90&w=1920")',
        backgroundSize:'cover', backgroundPosition:'center 35%',
        zIndex:1,
      }}/>

      {/* Multi-layer atmospheric overlays */}
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to bottom, rgba(248,245,240,.65) 0%, rgba(248,245,240,.45) 50%, rgba(248,245,240,.72) 100%)' }}/>
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'radial-gradient(ellipse 65% 70% at 50% 50%, transparent 20%, rgba(245,240,232,.65) 100%)' }}/>
      {/* Top vignette */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'28%', zIndex:3, background:'linear-gradient(to bottom, rgba(248,244,238,.85), transparent)', pointerEvents:'none' }}/>
      {/* Bottom vignette */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', zIndex:3, background:'linear-gradient(to top, rgba(248,244,238,.92), transparent)', pointerEvents:'none' }}/>

      {/* CONTENT */}
      <div ref={contentRef} style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 1.5rem', width:'100%', maxWidth:'800px' }}>

        <p className="hl font-sans" style={{ fontSize:'10px', letterSpacing:'.6em', textTransform:'uppercase', color:'var(--cherry-primary)', fontWeight:700, margin:'0 0 1.8rem', opacity:0 }}>
          Lễ Thành Hôn
        </p>

        <h1 className="hl font-script" style={{ fontSize:'clamp(5.5rem,16vw,10rem)', color:'var(--cherry-dark)', lineHeight:.85, margin:0, textShadow:'0 6px 20px rgba(0,0,0,.05)', opacity:0 }}>
          Đại Nghĩa
        </h1>

        <p className="hl" style={{ opacity:0 }}>
          <span className="font-serif" style={{ fontSize:'clamp(2rem,5vw,3rem)', fontStyle:'italic', color:'var(--gold-champagne)' }}>&amp;</span>
        </p>

        <h1 className="hl font-script" style={{ fontSize:'clamp(5.5rem,16vw,10rem)', color:'var(--cherry-dark)', lineHeight:.85, margin:'0 0 3rem', textShadow:'0 6px 20px rgba(0,0,0,.05)', opacity:0 }}>
          Thị Nhung
        </h1>

        {/* Date badge */}
        <div className="hl" style={{ display:'inline-flex', alignItems:'center', gap:'1.2rem', opacity:0 }}>
          <div style={{ width:'50px', height:'1px', background:'var(--gold-champagne)' }}/>
          <div style={{ border:'1px solid rgba(212,175,55,.55)', padding:'.9rem 2.5rem' }}>
            <p className="font-sans" style={{ fontSize:'12px', letterSpacing:'.45em', color:'var(--cherry-dark)', textTransform:'uppercase', margin:0, fontWeight:500 }}>
              20 · 10 · 2026
            </p>
          </div>
          <div style={{ width:'50px', height:'1px', background:'var(--gold-champagne)' }}/>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position:'absolute', bottom:'5%', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem' }}>
        <p className="font-sans" style={{ fontSize:'8px', letterSpacing:'.4em', color:'rgba(139,26,40,.5)', textTransform:'uppercase', margin:0 }}>Cuộn xuống</p>
        <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, rgba(212,175,55,.7), transparent)', animation:'scrollCue 1.6s ease-in-out infinite' }}/>
      </div>
      <style>{`@keyframes scrollCue { 0%,100%{opacity:.5;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.4)} }`}</style>
    </section>
  );
}
