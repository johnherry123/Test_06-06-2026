/* ══════════════════════════════════════════════════════════════════════
   APP.JSX — Vietnamese Editorial Wedding
   Architecture: Lenis smooth scroll + GSAP ScrollTrigger
   Custom cursor: REMOVED (native cursor restored)
   Navigation: Minimal transparent → solid on scroll
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, ChevronUp, Menu, X } from 'lucide-react';
import './index.css';

/* Components */
import IntroShader from './components/IntroShader';
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
  { href: '#invitation', label: 'Câu Chuyện'  },
  { href: '#events',     label: 'Lịch Trình'  },
  { href: '#gallery',    label: 'Album'        },
  { href: '#rsvp',       label: 'RSVP'         },
  { href: '#gifts',      label: 'Mừng Cưới'   },
];

export default function App() {
  const [hasOpened, setHasOpened]         = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenu, setMobileMenu]       = useState(false);
  const lenisRef = useRef(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    if (!hasOpened) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', () => { ScrollTrigger.update(); });
    lenis.on('scroll', ({ scroll }) => {
      setScrolled(scroll > 80);
      setShowScrollTop(scroll > 600);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [hasOpened]);

  /* ── GSAP scroll reveals ── */
  useEffect(() => {
    if (!hasOpened) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.gsap-stagger').forEach((el) => {
        gsap.fromTo(el.children,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.gsap-line').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
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

  const scrollToTop = () => lenisRef.current?.scrollTo(0, { duration: 1.4 });
  const scrollTo    = (href) => {
    const el = document.querySelector(href);
    if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -72, duration: 1.3 });
    setMobileMenu(false);
  };

  /* ── NAV styles ── */
  const navBg     = scrolled ? 'rgba(253,251,247,0.97)' : 'transparent';
  const navBorder = scrolled ? '1px solid rgba(35,27,21,0.1)' : '1px solid transparent';
  const navPad    = scrolled ? '10px 32px' : '20px 32px';

  return (
    <div style={{ backgroundColor: '#F8F4EC', color: '#231B15', minHeight: '100vh' }}>

      {/* 1. Intro */}
      {!hasOpened && (
        <IntroShader onComplete={() => setHasOpened(true)} />
      )}

      {/* 2. Navigation */}
      {hasOpened && (
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8000,
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: navBorder,
          padding: navPad,
          transition: 'all 0.4s var(--ease-out)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Logo — simple text mark */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                fontWeight: 500,
                fontStyle: 'italic',
                color: '#231B15',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              ĐN &amp; TN
            </a>

            {/* Desktop nav */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#4A3F38',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.target.style.color = '#8B1E22'; }}
                  onMouseLeave={e => { e.target.style.color = '#4A3F38'; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="mobile-hamburger"
              aria-label="Menu"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: '#231B15',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenu && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              backgroundColor: 'rgba(253,251,247,0.99)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(35,27,21,0.1)',
              padding: '16px 32px 24px',
              display: 'flex', flexDirection: 'column', gap: '0',
            }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#231B15',
                    textDecoration: 'none',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(35,27,21,0.08)',
                    letterSpacing: '0.04em',
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

          {/* Footer — elevated with monogram */}
          <footer
            role="contentinfo"
            style={{
              backgroundColor: '#1A120D',
              color: '#F8F4EC',
              padding: 'clamp(72px, 10vw, 100px) 24px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle botanical bg — envelope_back at very low opacity */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/Test_06-06-2026/envelope_back.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.025,
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

              {/* Monogram SVG — premium brand mark */}
              <div style={{ marginBottom: '28px' }}>
                <img
                  src="/Test_06-06-2026/monogram.svg"
                  alt="Monogram ĐN — Đại Nghĩa & Thị Nhung"
                  width="120"
                  height="80"
                  style={{
                    display: 'inline-block',
                    filter: 'invert(1) sepia(1) saturate(0.5) brightness(0.85)',
                    opacity: 0.9,
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Couple names — italic serif */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(248,244,236,0.88)',
                lineHeight: 1.2,
                marginBottom: '20px',
                letterSpacing: '0.01em',
              }}>
                Đại Nghĩa &amp; Thị Nhung
              </p>

              {/* Champagne thin rule */}
              <div style={{
                width: '32px', height: '1px',
                background: 'linear-gradient(to right, transparent, #B89555, transparent)',
                margin: '0 auto 20px',
              }} />

              {/* Quote */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                fontStyle: 'italic',
                color: 'rgba(248,244,236,0.5)',
                lineHeight: 1.85,
                marginBottom: '28px',
              }}>
                Cảm ơn bạn đã đến chung vui<br />
                trong ngày hạnh phúc nhất của chúng tôi.
              </p>

              {/* Date + venue */}
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B89555',
                marginBottom: '28px',
                opacity: 0.85,
              }}>
                20 &nbsp;·&nbsp; 10 &nbsp;·&nbsp; 2026 &nbsp;·&nbsp; Gem Center TP.HCM
              </p>

              {/* Share button */}
              <button
                onClick={handleShare}
                aria-label="Chia sẻ thiệp cưới"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(248,244,236,0.18)',
                  color: 'rgba(248,244,236,0.6)',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.72rem', fontWeight: 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  borderRadius: '1px',
                  cursor: 'pointer', marginBottom: '44px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,149,85,0.5)'; e.currentTarget.style.color = '#B89555'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,244,236,0.18)'; e.currentTarget.style.color = 'rgba(248,244,236,0.6)'; }}
              >
                <Share2 size={13} aria-hidden="true" />
                Chia sẻ thiệp cưới
              </button>

              {/* Credit line */}
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.65rem',
                color: 'rgba(248,244,236,0.2)',
                borderTop: '1px solid rgba(248,244,236,0.07)',
                paddingTop: '20px',
                letterSpacing: '0.04em',
              }}>
                Hai họ trân trọng kính báo
              </p>
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
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
          style={{
            position: 'fixed', bottom: '88px', right: '24px', zIndex: 9000,
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: 'rgba(253,251,247,0.95)',
            border: '1px solid rgba(35,27,21,0.15)',
            boxShadow: '0 4px 16px rgba(35,27,21,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#231B15', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#8B1E22'; e.currentTarget.style.color = '#8B1E22'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(35,27,21,0.15)'; e.currentTarget.style.color = '#231B15'; }}
        >
          <ChevronUp size={18} />
        </button>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
