import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const contentRef  = useRef(null);

  useEffect(() => {
    // Scroll parallax on bg
    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });

    // Stagger text reveal on load
    const els = contentRef.current.querySelectorAll('.hero-line');
    gsap.fromTo(els,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
    );

    // Mouse parallax on content
    const handleMouse = (e) => {
      const xP = (e.clientX / window.innerWidth  - 0.5) * 18;
      const yP = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(bgRef.current,      { x: xP * 1.5, y: yP * 1.5, duration: 1.2, ease: 'power2.out' });
      gsap.to(contentRef.current, { x: xP * -0.5, y: yP * -0.5, duration: 1.2, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section ref={sectionRef} style={{ position:'relative', height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', overflow:'hidden' }}>

      {/* Background */}
      <div ref={bgRef} style={{ position:'absolute', top:'-10%', left:'-5%', right:'-5%', bottom:'-10%', backgroundImage:'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=90&w=1920")', backgroundSize:'cover', backgroundPosition:'center 30%', zIndex:1 }}/>

      {/* Cinematic overlays */}
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to bottom, rgba(250,250,250,.55) 0%, rgba(250,250,250,.7) 100%)' }}/>
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(245,242,235,.6) 100%)' }}/>
      {/* Top & bottom vignette */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'30%', zIndex:3, background:'linear-gradient(to bottom, rgba(245,242,235,.8), transparent)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', zIndex:3, background:'linear-gradient(to top, rgba(245,242,235,.9), transparent)', pointerEvents:'none' }}/>

      {/* Content */}
      <div ref={contentRef} style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 2rem' }}>
        <p className="hero-line font-sans" style={{ fontSize:'11px', letterSpacing:'.55em', textTransform:'uppercase', color:'var(--cherry-primary)', marginBottom:'1.5rem', fontWeight:600 }}>
          Lễ Thành Hôn
        </p>

        <h1 className="hero-line font-script" style={{ fontSize:'clamp(5rem,14vw,9rem)', color:'var(--cherry-dark)', lineHeight:.9, margin:0, textShadow:'0 4px 16px rgba(0,0,0,.06)' }}>
          Đại Nghĩa
        </h1>

        <div className="hero-line" style={{ margin:'.6rem 0' }}>
          <span className="font-serif" style={{ fontSize:'clamp(1.8rem,4vw,2.5rem)', fontStyle:'italic', color:'var(--gold-champagne)' }}>&amp;</span>
        </div>

        <h1 className="hero-line font-script" style={{ fontSize:'clamp(5rem,14vw,9rem)', color:'var(--cherry-dark)', lineHeight:.9, margin:'0 0 2.5rem', textShadow:'0 4px 16px rgba(0,0,0,.06)' }}>
          Thị Nhung
        </h1>

        {/* Date badge */}
        <div className="hero-line" style={{ display:'inline-flex', alignItems:'center', gap:'1rem' }}>
          <div style={{ width:'40px', height:'1px', background:'var(--gold-champagne)' }}/>
          <div style={{ border:'1px solid rgba(212,175,55,.5)', padding:'.8rem 2rem', display:'inline-block' }}>
            <p className="font-sans" style={{ fontSize:'12px', letterSpacing:'.4em', color:'var(--cherry-dark)', textTransform:'uppercase', margin:0, fontWeight:500 }}>
              20 · 10 · 2026
            </p>
          </div>
          <div style={{ width:'40px', height:'1px', background:'var(--gold-champagne)' }}/>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position:'absolute', bottom:'5%', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem', opacity:.6 }}>
        <p className="font-sans" style={{ fontSize:'9px', letterSpacing:'.4em', color:'var(--cherry-primary)', textTransform:'uppercase', margin:0 }}>Cuộn xuống</p>
        <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--gold-champagne), transparent)', animation:'scrollLine 1.5s ease-in-out infinite' }}/>
        <style>{`@keyframes scrollLine { 0%,100%{transform:scaleY(1);opacity:.6} 50%{transform:scaleY(1.3);opacity:1} }`}</style>
      </div>
    </section>
  );
}
