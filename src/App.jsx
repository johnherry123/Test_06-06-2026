/* ══════════════════════════════════════════════════════════════════════
   APP.JSX — Root application with Lenis Smooth Scroll + GSAP integration
   Architecture:
   - Lenis (v1) smooth scroll with GSAP ticker sync
   - IntroShader (WebGL) → main content reveal
   - CustomCursor (mix-blend-mode: difference)
   - All sections: Hero, Invitation, Couple, Events, Gallery, RSVP, Gifts
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, ChevronUp, Menu, X } from 'lucide-react';
import './index.css';

/* Components */
import IntroShader from './components/IntroShader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';
import AudioPlayer from './components/AudioPlayer';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: '#hero',       label: 'Trang Chủ'       },
  { href: '#invitation', label: 'Lời Ngỏ'          },
  { href: '#couple',     label: 'Cô Dâu & Chú Rể'  },
  { href: '#events',     label: 'Lịch Trình'        },
  { href: '#gallery',    label: 'Album Ảnh'         },
  { href: '#rsvp',       label: 'Phúc Đáp'          },
  { href: '#gifts',      label: 'Mừng Cưới'         },
];

export default function App() {
  const [hasOpened, setHasOpened]         = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenu, setMobileMenu]       = useState(false);
  const lenisRef = useRef(null);

  /* ── Lenis smooth scroll init ── */
  useEffect(() => {
    if (!hasOpened) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ticker (critical for ScrollTrigger accuracy)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Scroll state for header
    lenis.on('scroll', ({ scroll }) => {
      setScrolled(scroll > 60);
      setShowScrollTop(scroll > 600);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [hasOpened]);

  /* ── GSAP ScrollTrigger reveal animations (after intro) ── */
  useEffect(() => {
    if (!hasOpened) return;

    const ctx = gsap.context(() => {
      // Generic fade-up reveals
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      // Stagger children reveals
      gsap.utils.toArray('.gsap-stagger').forEach((el) => {
        gsap.fromTo(el.children,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Horizontal line reveals
      gsap.utils.toArray('.gsap-line').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [hasOpened]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Thiệp Cưới Đại Nghĩa & Thị Nhung — 20.10.2026',
        text: 'Trân trọng kính mời bạn đến chung vui!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.6 });
  };

  return (
    <div style={{ backgroundColor: '#FDFBF7', color: '#231B15', minHeight: '100vh', position: 'relative' }}>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* 1. WebGL Intro Screen */}
      {!hasOpened && (
        <IntroShader onComplete={() => setHasOpened(true)} />
      )}

      {/* 2. Navigation Header */}
      {hasOpened && (
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8000,
          backgroundColor: scrolled ? 'rgba(253,251,247,0.96)' : 'rgba(253,251,247,0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled ? '1px solid rgba(197,160,89,0.22)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(35,27,21,0.07)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          padding: scrolled ? '12px 32px' : '18px 32px',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <a href="#hero" data-cursor-hover style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.5rem', fontWeight: 700,
              textDecoration: 'none', color: '#8B1E22',
              textShadow: '0 0 30px rgba(139,30,34,0.15)',
              lineHeight: 1,
            }}>
              Đại Nghĩa &amp; Thị Nhung
            </a>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target && lenisRef.current) {
                      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.4 });
                    }
                  }}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.75rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#584A40', textDecoration: 'none',
                    transition: 'color 0.25s, opacity 0.25s',
                    opacity: 0.85,
                  }}
                  onMouseEnter={e => { e.target.style.color = '#8B1E22'; e.target.style.opacity = 1; }}
                  onMouseLeave={e => { e.target.style.color = '#584A40'; e.target.style.opacity = 0.85; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="mobile-hamburger"
              data-cursor-hover
              style={{
                display: 'none', background: 'transparent', border: 'none',
                color: '#8B1E22', cursor: 'none', padding: '6px',
              }}
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenu && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              backgroundColor: 'rgba(253,251,247,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(197,160,89,0.2)',
              padding: '20px 32px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 16px 40px rgba(35,27,21,0.1)',
            }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.88rem', fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#8B1E22', textDecoration: 'none',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(197,160,89,0.1)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 3. Main content */}
      {hasOpened && (
        <main>
          <Hero />
          <Invitation />
          <Couple />
          <Events />
          <Gallery />
          <RSVP />
          <Gifts />

          {/* Footer */}
          <footer style={{
            backgroundColor: '#18110E',
            color: '#FAF7F2',
            padding: 'clamp(80px, 12vw, 120px) 24px 64px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* BG glow */}
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '700px', height: '350px',
              background: 'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div className="font-script" style={{
                fontSize: '3.5rem', color: '#C5A059', marginBottom: '16px', lineHeight: 1,
              }}>囍</div>

              <h2 className="font-script text-gold-luxury" style={{
                fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                margin: '0 0 18px', lineHeight: 1.1, fontWeight: 700,
              }}>
                Đại Nghĩa &amp; Thị Nhung
              </h2>

              <p className="font-serif" style={{
                fontSize: '1.2rem', fontStyle: 'italic',
                color: 'rgba(250,247,242,0.7)',
                margin: '0 0 32px', lineHeight: 1.8,
              }}>
                "Cảm ơn bạn đã luôn là một phần ý nghĩa<br />trong ngày hạnh phúc nhất của chúng tôi."
              </p>

              <div className="divider-luxury" style={{ marginBottom: '32px' }}>
                <span style={{ color: '#C5A059' }}>✦</span>
              </div>

              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.72rem', letterSpacing: '0.35em',
                color: '#C5A059', textTransform: 'uppercase',
                marginBottom: '36px', fontWeight: 600,
              }}>
                20 · 10 · 2026 · Gem Center TP.HCM
              </p>

              <button
                onClick={handleShare}
                data-cursor-hover
                className="btn-gold-outline"
                style={{ marginBottom: '52px' }}
              >
                <Share2 size={16} />
                Chia Sẻ Thiệp Cưới
              </button>

              <div style={{
                paddingTop: '24px',
                borderTop: '1px solid rgba(197,160,89,0.12)',
                fontSize: '0.72rem',
                color: 'rgba(250,247,242,0.35)',
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '0.05em',
              }}>
                Hai họ trân trọng kính báo · Thiết kế riêng cho Đám cưới Đại Nghĩa &amp; Thị Nhung
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* Audio player */}
      <AudioPlayer autoPlay={hasOpened} />

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          data-cursor-hover
          title="Lên đầu trang"
          style={{
            position: 'fixed', bottom: '88px', right: '24px', zIndex: 9000,
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: 'rgba(253,251,247,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197,160,89,0.35)',
            boxShadow: '0 8px 24px rgba(35,27,21,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#8B1E22', cursor: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronUp size={20} />
        </button>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        /* Force pointer: coarse to show cursor */
        @media (pointer: coarse) {
          *, *::before, *::after { cursor: auto !important; }
        }
      `}</style>
    </div>
  );
}
