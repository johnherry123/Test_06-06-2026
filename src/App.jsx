import React, { useState, useEffect } from 'react';
import './index.css';

import EnvelopePortal from './components/EnvelopePortal';
import Hero        from './components/Hero';
import Invitation  from './components/Invitation';
import Couple      from './components/Couple';
import Events      from './components/Events';
import Gallery     from './components/Gallery';
import RSVP        from './components/RSVP';
import Gifts       from './components/Gifts';

export default function App() {
  const [open, setOpen] = useState(false);

  /* ── Scroll-based fade-up for .fade-up elements ── */
  useEffect(() => {
    if (!open) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: .14 });
    const els = document.querySelectorAll('.fade-up');
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [open]);

  return (
    <>
      {!open && <EnvelopePortal onOpenComplete={() => setOpen(true)} />}

      {open && (
        <main>
          <Hero />
          <Invitation />
          <Couple />
          <Events />
          <Gallery />
          <RSVP />
          <Gifts />

          {/* ── FOOTER ── */}
          <footer style={{
            background: 'var(--ink)',
            padding: '6rem 2rem 4rem',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Ambient glow */}
            <div style={{
              position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
              width:'600px', height:'300px',
              background:'radial-gradient(ellipse,rgba(120,20,20,.2),transparent 70%)',
              filter:'blur(30px)', pointerEvents:'none',
            }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              {/* Rule */}
              <div style={{ height:'1px', width:'200px', margin:'0 auto 3rem', background:'linear-gradient(90deg,transparent,rgba(201,169,110,.6),transparent)' }}/>

              {/* Names */}
              <h2 className="f-script" style={{
                fontSize:'clamp(3.5rem,10vw,7rem)', color:'var(--ivory)', lineHeight:.9, marginBottom:'1.5rem',
              }}>
                Đại Nghĩa &amp; Thị Nhung
              </h2>

              <div style={{ height:'1px', width:'200px', margin:'0 auto 2rem', background:'linear-gradient(90deg,transparent,rgba(201,169,110,.6),transparent)' }}/>

              <p className="eyebrow" style={{ color:'rgba(201,169,110,.6)', marginBottom:'.5rem' }}>
                20 · 10 · 2026 · Thứ Ba
              </p>
              <p className="f-cormorant" style={{
                fontSize:'1.1rem', fontStyle:'italic',
                color:'rgba(248,237,213,.35)', marginBottom:'4rem',
              }}>
                "Trăm năm viên mãn cậy nhờ ba sinh."
              </p>

              <div style={{ height:'1px', width:'80px', margin:'0 auto 2.5rem', background:'linear-gradient(90deg,transparent,rgba(201,169,110,.3),transparent)' }}/>

              <p className="f-sans" style={{ fontSize:'9px', letterSpacing:'.35em', color:'rgba(201,169,110,.35)', textTransform:'uppercase' }}>
                Gia đình hai họ kính báo
              </p>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
