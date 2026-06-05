import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import EnvelopePortal from './components/EnvelopePortal';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isEntered, setIsEntered] = useState(false);

  // Intersection observer for fade-up — runs AFTER gate opens
  useEffect(() => {
    if (!isEntered) return;

    // ── Critical fix: refresh ScrollTrigger so it recalculates
    //    positions now that overflow is restored and content is visible
    ScrollTrigger.refresh();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isEntered]);

  return (
    <>
      {!isEntered && (
        <EnvelopePortal onOpenComplete={() => setIsEntered(true)} />
      )}

      <div style={{
        opacity: isEntered ? 1 : 0,
        transition: 'opacity 0.8s ease',
        minHeight: '100vh',
      }}>
        <Hero />
        <Invitation />
        <Couple />
        <Events />
        <Gallery />
        <RSVP />
        <Gifts />

        {/* Footer */}
        <footer className="text-center py-20 px-6" style={{ background: 'var(--bg-cream)', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="font-script" style={{ fontSize: '3rem', color: 'var(--cherry-dark)', margin: '0 0 1rem' }}>
              Đại Nghĩa &amp; Thị Nhung
            </h2>
            <div className="divider-gold" />
            <p className="font-serif" style={{ fontSize: '1rem', color: 'var(--text-light)', fontStyle: 'italic', margin: '1.5rem 0' }}>
              "Trăm năm viên mãn cậy nhờ ba sinh."
            </p>
            <p className="font-sans" style={{ fontSize: '9px', letterSpacing: '.4em', textTransform: 'uppercase', color: 'var(--gold-champagne)' }}>
              Gia Đình Hai Họ Kính Báo · 20 · 10 · 2026
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
