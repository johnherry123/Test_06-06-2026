import React, { useState, useEffect } from 'react';
import './index.css';
import EnvelopePortal from './components/EnvelopePortal';
import Hero       from './components/Hero';
import Invitation from './components/Invitation';
import Couple     from './components/Couple';
import Events     from './components/Events';
import Gallery    from './components/Gallery';
import RSVP       from './components/RSVP';
import Gifts      from './components/Gifts';

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    // Use rAF to wait for DOM to fully paint
    const raf = requestAnimationFrame(() => {
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('on');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0, rootMargin: '0px 0px 0px 0px' }
      );
      document.querySelectorAll('.fu').forEach(el => io.observe(el));
    });

    return () => cancelAnimationFrame(raf);
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

          {/* Footer */}
          <footer className="sec s-dark" style={{ textAlign: 'center', padding: 'clamp(72px,10vw,120px) 24px' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Top ornament */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
                <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, rgba(201,168,76,.5), transparent)' }} />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0 L9.5 5.5 L15 5.5 L10.5 9 L12 15 L8 11.5 L4 15 L5.5 9 L1 5.5 L6.5 5.5 Z" fill="rgba(201,168,76,.5)" />
                </svg>
                <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, rgba(201,168,76,.5), transparent)' }} />
              </div>

              {/* Names */}
              <h2 className="f-script" style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--ivory)',
                lineHeight: .88,
                marginBottom: '8px',
                textShadow: '0 4px 40px rgba(201,168,76,.2)',
              }}>
                Đại Nghĩa
              </h2>
              <p className="f-serif" style={{ fontStyle: 'italic', color: 'rgba(201,168,76,.7)', fontSize: '1.6rem', margin: '4px 0' }}>
                &amp;
              </p>
              <h2 className="f-script" style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--ivory)',
                lineHeight: .88,
                marginBottom: '32px',
                textShadow: '0 4px 40px rgba(201,168,76,.2)',
              }}>
                Thị Nhung
              </h2>

              <div className="rule" style={{ width: '100px', margin: '0 auto 24px', opacity: .35 }} />

              <span className="eyebrow" style={{ color: 'rgba(201,168,76,.45)', display: 'block', marginBottom: '14px', letterSpacing: '.7em' }}>
                20 · 10 · 2026 · Thứ Ba
              </span>

              <p className="f-serif" style={{
                fontStyle: 'italic',
                color: 'rgba(245,236,216,.25)',
                fontSize: '1.05rem',
                marginBottom: '48px',
              }}>
                "Trăm năm viên mãn cậy nhờ ba sinh."
              </p>

              <span className="eyebrow" style={{ color: 'rgba(201,168,76,.22)', fontSize: '7px', letterSpacing: '.65em' }}>
                Gia đình hai họ kính báo
              </span>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
