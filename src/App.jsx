import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import EnvelopePortal from './components/EnvelopePortal';
import Hero       from './components/Hero';
import Invitation from './components/Invitation';
import Couple     from './components/Couple';
import Events     from './components/Events';
import Gallery    from './components/Gallery';
import RSVP       from './components/RSVP';
import Gifts      from './components/Gifts';

/* ══════════════════════════════════════════════
   PERSISTENT MUSIC PLAYER
   Lives at App level so it survives portal fade
══════════════════════════════════════════════ */
const YT_VIDEO_ID = 'IOe0tNoUGv8';

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) { resolve(window.YT); return; }
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      // Script already loading — wait for callback
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT); };
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
}

/* ══════════════════════════════════════════════
   FLOATING NAV
══════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Thiệp Mời', href: '#invitation' },
  { label: 'Chú Rể & Cô Dâu', href: '#couple' },
  { label: 'Sự Kiện', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Phúc Đáp', href: '#rsvp' },
  { label: 'Mừng Cưới', href: '#gifts' },
];

function FloatingNav({ visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8000,
        padding: scrolled ? '12px 32px' : '20px 32px',
        background: scrolled
          ? 'rgba(10,2,2,.85)'
          : 'linear-gradient(to bottom, rgba(10,2,2,.55), transparent)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,.12)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all .45s cubic-bezier(.16,1,.3,1)',
      }}>
        {/* Logo / Names */}
        <span style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: '1.7rem',
          color: 'rgba(232,201,122,.9)',
          textShadow: '0 2px 20px rgba(201,168,76,.3)',
          letterSpacing: '.02em',
        }}>
          Đại Nghĩa & Thị Nhung
        </span>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="nav-links">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '8px', fontWeight: 600,
              letterSpacing: '.45em', textTransform: 'uppercase',
              color: 'rgba(232,201,122,.7)',
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.target.style.color = 'rgba(232,201,122,1)'}
            onMouseLeave={e => e.target.style.color = 'rgba(232,201,122,.7)'}
            >{item.label}</a>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          className="nav-hamburger"
          style={{
            display: 'none',
            background: 'transparent', border: 'none',
            color: 'rgba(232,201,122,.8)', fontSize: '1.4rem',
            padding: '4px',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 7999,
          background: 'rgba(8,1,1,.96)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '32px',
          backdropFilter: 'blur(16px)',
        }}>
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: '2.4rem',
                color: 'rgba(232,201,122,.9)',
                transition: 'color .2s',
              }}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ══════════════════════════════════════════════
   MUTE BUTTON (discrete — auto-hides)
══════════════════════════════════════════════ */
function MuteButton({ muted, onToggle, visible }) {
  const [show, setShow] = useState(false);
  const hideTimer = useRef(null);

  // Show briefly after mount, then hide
  useEffect(() => {
    if (!visible) return;
    setShow(true);
    hideTimer.current = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(hideTimer.current);
  }, [visible]);

  const handleMouseEnter = () => {
    clearTimeout(hideTimer.current);
    setShow(true);
  };
  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setShow(false), 1800);
  };

  if (!visible) return null;

  return (
    // Invisible hover zone — always present so user can reveal the button
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed', bottom: '16px', right: '16px', zIndex: 9998,
        width: '72px', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        onClick={onToggle}
        title={muted ? 'Bật nhạc' : 'Tắt tiếng'}
        style={{
          width: '42px', height: '42px', borderRadius: '50%',
          border: '1px solid rgba(201,168,76,.4)',
          background: 'rgba(8,1,1,.7)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,.35)',
          opacity: show ? 1 : 0,
          transform: show ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity .4s ease, transform .4s ease',
          pointerEvents: show ? 'auto' : 'none',
        }}
      >
        {muted ? (
          // Muted icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,.7)" strokeWidth="2" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          // Sound on icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,.8)" strokeWidth="2" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SCROLL-TO-TOP
══════════════════════════════════════════════ */
function ScrollTop({ visible }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!visible || !show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Lên đầu trang"
      style={{
        position: 'fixed', bottom: '92px', right: '28px', zIndex: 9998,
        width: '52px', height: '52px', borderRadius: '50%',
        border: '1.5px solid rgba(212,175,55,.3)',
        background: 'rgba(8,1,1,.7)',
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,.4)',
        transition: 'opacity .3s, border-color .3s',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,.8)" strokeWidth="2" strokeLinecap="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
}

/* ══════════════════════════════════════════════
   COUNTDOWN BANNER (between Hero and Invitation)
══════════════════════════════════════════════ */
function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date('2026-10-20T07:30:00+07:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="fu" style={{
      background: 'linear-gradient(135deg, #1A0303 0%, #0E0101 100%)',
      padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,60px)',
      textAlign: 'center',
      borderTop: '1px solid rgba(201,168,76,.15)',
      borderBottom: '1px solid rgba(201,168,76,.15)',
    }}>
      <span className="eyebrow" style={{ color: 'rgba(232,201,122,.5)', marginBottom: '28px' }}>
        Đếm Ngược Đến Ngày Trọng Đại
      </span>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(12px, 3vw, 40px)', flexWrap: 'wrap',
      }}>
        {[['Ngày', time.d], ['Giờ', time.h], ['Phút', time.m], ['Giây', time.s]].map(([label, val], i) => (
          <React.Fragment key={label}>
            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <div style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 300,
                color: '#F5ECD8',
                lineHeight: 1,
                letterSpacing: '-.02em',
                textShadow: '0 0 40px rgba(201,168,76,.2)',
              }}>
                {pad(val)}
              </div>
              <span className="eyebrow" style={{
                color: 'rgba(201,168,76,.45)', marginTop: '10px',
                fontSize: '7px', letterSpacing: '.5em',
              }}>{label}</span>
            </div>
            {i < 3 && (
              <span style={{
                color: 'rgba(201,168,76,.35)',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1,
                marginTop: '-12px',
                animation: 'countdownColon 1s ease-in-out infinite',
              }}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{
        width: '60px', height: '1px', margin: '28px auto 0',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.4), transparent)',
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [open, setOpen]     = useState(false);
  const [muted, setMuted]   = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const ytPlayerRef = useRef(null);
  const ytContainer = useRef(null);
  const musicStarted = useRef(false);

  // Preload YouTube API on mount
  useEffect(() => {
    loadYouTubeAPI().then(YT => {
      if (!ytContainer.current) return;
      ytPlayerRef.current = new YT.Player(ytContainer.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0, controls: 0,
          loop: 1, playlist: YT_VIDEO_ID,
          rel: 0, modestbranding: 1,
          start: 0,
        },
        events: { onReady: () => setMusicReady(true) },
      });
    });
  }, []);

  // Scroll-based IntersectionObserver for .fu elements
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const io = new IntersectionObserver(
          entries => {
            entries.forEach(e => {
              if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
            });
          },
          { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.fu').forEach(el => io.observe(el));
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Called by EnvelopePortal at the exact moment user clicks seal (= user gesture)
  const handleSealClick = useCallback(() => {
    if (musicStarted.current) return;
    musicStarted.current = true;
    const tryPlay = () => {
      const p = ytPlayerRef.current;
      if (!p || typeof p.playVideo !== 'function') {
        setTimeout(tryPlay, 200); // Player not ready yet, retry
        return;
      }
      try { p.setVolume(55); p.playVideo(); } catch (_) {}
    };
    tryPlay();
  }, []);

  const toggleMute = useCallback(() => {
    const p = ytPlayerRef.current;
    if (!p) return;
    try {
      if (muted) { p.unMute(); p.setVolume(55); setMuted(false); }
      else        { p.mute();                     setMuted(true);  }
    } catch (_) {}
  }, [muted]);

  const handlePortalComplete = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      {/* Hidden YouTube Player — persists throughout session */}
      <div style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
        <div ref={ytContainer} />
      </div>

      {/* Envelope portal */}
      {!open && <EnvelopePortal onOpenComplete={handlePortalComplete} onSealClick={handleSealClick} />}

      {/* Main content */}
      {open && (
        <main>
          <FloatingNav visible={open} />
          <Hero />
          <Countdown />
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

              <h2 className="f-script" style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--ivory)', lineHeight: .88,
                marginBottom: '8px',
                textShadow: '0 4px 40px rgba(201,168,76,.2)',
              }}>Đại Nghĩa</h2>
              <p className="f-serif" style={{ fontStyle: 'italic', color: 'rgba(201,168,76,.7)', fontSize: '1.6rem', margin: '4px 0' }}>&amp;</p>
              <h2 className="f-script" style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--ivory)', lineHeight: .88,
                marginBottom: '32px',
                textShadow: '0 4px 40px rgba(201,168,76,.2)',
              }}>Thị Nhung</h2>

              <div className="rule" style={{ width: '100px', margin: '0 auto 24px', opacity: .35 }} />
              <span className="eyebrow" style={{ color: 'rgba(201,168,76,.45)', display: 'block', marginBottom: '14px', letterSpacing: '.7em' }}>
                20 · 10 · 2026 · Thứ Ba
              </span>
              <p className="f-serif" style={{
                fontStyle: 'italic',
                color: 'rgba(245,236,216,.25)',
                fontSize: '1.05rem', marginBottom: '48px',
              }}>
                "Trăm năm viên mãn cậy nhờ ba sinh."
              </p>

              {/* Social / share */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, rgba(201,168,76,.3), transparent)' }} />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '8px',
                  letterSpacing: '.5em', color: 'rgba(201,168,76,.3)',
                  textTransform: 'uppercase',
                }}>Chia sẻ thiệp</span>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, rgba(201,168,76,.3), transparent)' }} />
              </div>
              <button
                onClick={() => { if (navigator.share) navigator.share({ title: 'Thiệp Cưới Đại Nghĩa & Thị Nhung', url: window.location.href }); else navigator.clipboard.writeText(window.location.href); }}
                style={{
                  padding: '12px 36px',
                  border: '1px solid rgba(201,168,76,.3)',
                  background: 'transparent',
                  color: 'rgba(201,168,76,.6)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '8px', fontWeight: 600,
                  letterSpacing: '.45em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all .25s',
                  marginBottom: '48px',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,.1)'; e.target.style.color = 'rgba(201,168,76,.9)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'rgba(201,168,76,.6)'; }}
              >
                Sao chép link thiệp
              </button>

              <span className="eyebrow" style={{ color: 'rgba(201,168,76,.22)', fontSize: '7px', letterSpacing: '.65em' }}>
                Gia đình hai họ kính báo
              </span>
            </div>
          </footer>
        </main>
      )}

      {/* Persistent UI — visible after portal */}
      <MuteButton visible={open} muted={muted} onToggle={toggleMute} />
      <ScrollTop visible={open} />

      <style>{`
        @keyframes musicRipple {
          0%   { box-shadow: 0 0 0 0 rgba(212,175,55,.4), 0 8px 30px rgba(0,0,0,.5); }
          70%  { box-shadow: 0 0 0 12px rgba(212,175,55,0), 0 8px 30px rgba(0,0,0,.5); }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0), 0 8px 30px rgba(0,0,0,.5); }
        }
        @keyframes countdownColon {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </>
  );
}
