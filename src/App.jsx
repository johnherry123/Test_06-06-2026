import React, { useEffect, useState } from 'react';
import GateIntro from './components/GateIntro';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';

export default function App() {
  
  const [isEntered, setIsEntered] = useState(false);

  // Simple intersection observer for fade-up animations
  useEffect(() => {
    if (!isEntered) return; // Only start observing after entering
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
      {!isEntered && <GateIntro onOpen={() => setIsEntered(true)} />}
      <Hero />
      <Invitation />
      <Couple />
      <Events />
      <Gallery />
      <RSVP />
      <Gifts />

      {/* Royal Footer */}
      <footer style={{
        padding: '4rem 1.5rem',
        textAlign: 'center',
        background: 'var(--bg-cream)',
        borderTop: '1px solid rgba(212,175,55,0.2)'
      }}>
        <h2 className="font-script" style={{ fontSize: '3rem', color: 'var(--cherry-dark)', margin: '0 0 1rem' }}>
          Đại Nghĩa & Thị Nhung
        </h2>
        <p className="font-serif" style={{ fontSize: '1rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '2rem' }}>
          "Trăm năm viên mãn cậy nhờ ba sinh."
        </p>
        <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-champagne)' }}>
          Xin Chân Thành Cảm Ơn
        </p>
      </footer>
    </>
  );
}
