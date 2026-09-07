import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, ChevronUp, Menu, X, Heart } from 'lucide-react';
import './index.css';

/* Components */
import IntroShader from './components/IntroShader';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Story from './components/Story';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';
import AudioPlayer from './components/AudioPlayer';
import PetalsCanvas from './components/PetalsCanvas';
import { COUPLE, WEDDING } from './weddingData';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: '#loi-ngo', label: 'Lời Ngỏ' },
  { href: '#story',   label: 'Chuyện Tình Yêu' },
  { href: '#couple',  label: 'Đôi Uyên Ương' },
  { href: '#events',  label: 'Lịch Trình' },
  { href: '#gallery', label: 'Album' },
  { href: '#rsvp',    label: 'Xác Nhận' },
  { href: '#gifts',   label: 'Mừng Cưới' },
];

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const lenisRef = useRef(null);
  const tickerFnRef = useRef(null);
  const audioPlayerRef = useRef(null);

  /* ── Lenis smooth scroll (desktop only) ── */
  useEffect(() => {
    if (!hasOpened) return;

    // On mobile / small screens, use native momentum scrolling for 100% stability and zero horizontal jitter
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const handleNativeScroll = () => {
        const scroll = window.scrollY;
        setScrolled(scroll > 40);
        setShowScrollTop(scroll > 450);
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleNativeScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    tickerFnRef.current = tickerFn;
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    lenis.on('scroll', ({ scroll }) => {
      setScrolled(scroll > 60);
      setShowScrollTop(scroll > 600);
    });

    return () => {
      lenis.destroy();
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        tickerFnRef.current = null;
      }
    };
  }, [hasOpened]);

  /* ── GSAP scroll reveals ── */
  useEffect(() => {
    if (!hasOpened) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [hasOpened]);

  const handleStartMusic = useCallback(() => {
    audioPlayerRef.current?.play();
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: `Thiệp Cưới | ${COUPLE.groom.fullName} & ${COUPLE.bride.fullName}`,
          text: 'Trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc của chúng mình!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2400);
      }).catch(() => {});
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    setMobileMenu(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    setHasOpened(true);
    setTimeout(() => setIntroDone(true), 1200);
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', position: 'relative', width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* 1. Intro 3D Envelope Screen */}
      {!introDone && (
        <IntroShader
          onComplete={handleIntroComplete}
          onStartMusic={handleStartMusic}
        />
      )}

      {/* 2. Floating Petals Canvas for Celebratory Romance */}
      {hasOpened && <PetalsCanvas />}

      {/* 3. Main Content Container */}
      <div
        aria-hidden={!hasOpened}
        style={{
          opacity: hasOpened ? 1 : 0,
          transition: hasOpened ? 'opacity 0.6s ease 0.15s' : 'none',
          pointerEvents: hasOpened ? 'auto' : 'none',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Navigation Header */}
        {hasOpened && (
          <header
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxWidth: '100vw',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              zIndex: 8000,
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(250, 247, 242, 0.85)',
              backdropFilter: 'blur(16px)',
              borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.28)' : '1px solid transparent',
              boxShadow: scrolled ? '0 4px 20px rgba(50, 30, 15, 0.05)' : 'none',
              padding: scrolled ? '8px clamp(12px, 3vw, 24px)' : '10px clamp(12px, 3vw, 24px)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Logo / Monogram */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#hero');
                }}
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: 'clamp(1.15rem, 4vw, 1.6rem)',
                  color: '#801D24',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 'calc(100% - 44px)',
                }}
              >
                <span>{COUPLE.groom.firstName}</span>
                <span style={{ color: '#C5A059', fontSize: '0.9rem', fontFamily: 'serif' }}>&amp;</span>
                <span>{COUPLE.bride.firstName}</span>
              </a>

              {/* Desktop Nav Links */}
              <nav
                className="desktop-nav"
                aria-label="Điều hướng thiệp cưới"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#4A3B32',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#801D24';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#4A3B32';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="mobile-hamburger"
                aria-label={mobileMenu ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={mobileMenu}
                style={{
                  display: 'none',
                  background: 'transparent',
                  border: 'none',
                  color: '#801D24',
                  cursor: 'pointer',
                  padding: '6px',
                }}
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenu && (
              <nav
                aria-label="Menu di động"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
                  boxShadow: '0 12px 30px rgba(50, 30, 15, 0.1)',
                  padding: '16px 28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#2C221C',
                      textDecoration: 'none',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(197, 160, 89, 0.15)',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </header>
        )}

        {/* Main Sections */}
        {hasOpened && (
          <main>
            <Hero />
            <Invitation />
            <Story />
            <Couple />
            <Events />
            <Gallery />
            <RSVP />
            <Gifts />

            {/* ── LUXURY ROYAL WEDDING FOOTER ── */}
            <footer
              role="contentinfo"
              style={{
                background: 'radial-gradient(ellipse at 50% 20%, #3D1016 0%, #24070B 55%, #140306 100%)',
                color: '#FAF7F2',
                padding: 'clamp(56px, 9vw, 90px) 20px 44px',
                textAlign: 'center',
                position: 'relative',
                borderTop: '2px solid #C5A059',
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                overflowX: 'hidden',
              }}
            >
              {/* Ambient Gold Glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'min(600px, 90vw)',
                  height: '240px',
                  background: 'radial-gradient(ellipse at top, rgba(197, 160, 89, 0.22) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
                {/* Ornate Gold Filigree Top Divider */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
                  <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                    <path d="M18 3L21 9L27 10L22.5 14L24 20L18 16.5L12 20L13.5 14L9 10L15 9L18 3Z" fill="#C5A059" opacity="0.85" />
                    <circle cx="5" cy="10" r="2" fill="#C5A059" opacity="0.6" />
                    <circle cx="31" cy="10" r="2" fill="#C5A059" opacity="0.6" />
                  </svg>
                  <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
                </div>

                {/* Royal Monogram Crest Badge */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 18px auto',
                    borderRadius: '50%',
                    border: '1.5px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle, rgba(197, 160, 89, 0.2) 0%, rgba(128, 29, 36, 0.4) 100%)',
                    boxShadow: '0 0 25px rgba(197, 160, 89, 0.35)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.45rem',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      color: '#F3DEC2',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Đ &amp; N
                  </span>
                </div>

                {/* Calligraphy Names */}
                <h3
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    fontSize: 'clamp(2.2rem, 6.5vw, 3.8rem)',
                    color: '#F5E4CE',
                    margin: '0 0 10px 0',
                    fontWeight: 400,
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.5)',
                    wordBreak: 'break-word',
                  }}
                >
                  {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
                </h3>

                {/* Heartfelt Thank You Message */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                    fontStyle: 'italic',
                    color: 'rgba(250, 247, 242, 0.92)',
                    lineHeight: 1.7,
                    margin: '0 auto 20px auto',
                    maxWidth: '480px',
                  }}
                >
                  Chân thành cảm ơn sự hiện diện, tình cảm và những lời chúc phúc quý báu từ toàn thể Quý khách và Người thân thương!
                </p>

                {/* Date & Venue Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    borderRadius: '999px',
                    border: '1px solid rgba(197, 160, 89, 0.45)',
                    background: 'rgba(197, 160, 89, 0.08)',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
                      letterSpacing: '0.18em',
                      color: '#E6CA85',
                      fontWeight: 600,
                    }}
                  >
                    20 · 10 · 2026 — GEM CENTER TP.HCM
                  </span>
                </div>

                {/* Share Button */}
                <div style={{ marginBottom: '36px' }}>
                  <button
                    type="button"
                    onClick={handleShare}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 28px',
                      borderRadius: '999px',
                      backgroundColor: '#801D24',
                      background: 'linear-gradient(135deg, #99232C 0%, #70161C 100%)',
                      border: '1.5px solid #C5A059',
                      color: '#FFF8F0',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35), 0 0 16px rgba(197, 160, 89, 0.25)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 24px rgba(197, 160, 89, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35), 0 0 16px rgba(197, 160, 89, 0.25)';
                    }}
                  >
                    <Share2 size={16} color="#E6CA85" />
                    Chia sẻ thiệp cưới
                  </button>
                </div>

                {/* Formal Invitation Line */}
                <div
                  style={{
                    borderTop: '1px solid rgba(197, 160, 89, 0.25)',
                    paddingTop: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.74rem',
                      color: 'rgba(250, 247, 242, 0.72)',
                      letterSpacing: '0.08em',
                      margin: 0,
                    }}
                  >
                    Họ Nhà Trai &amp; Họ Nhà Gái đồng trân trọng kính báo &amp; kính mời
                  </p>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.86rem',
                      fontStyle: 'italic',
                      color: '#C5A059',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Forever &amp; Always</span>
                    <Heart size={11} fill="#C5A059" color="#C5A059" />
                    <span>Đại Nghĩa &amp; Trịnh Nhung</span>
                  </p>
                </div>
              </div>
            </footer>
          </main>
        )}

        {/* Audio Player Component — Controlled via Ref */}
        <AudioPlayer ref={audioPlayerRef} shouldPlay={hasOpened} />

        {/* Toast Notification for Link Copy */}
        {copiedToast && (
          <div
            style={{
              position: 'fixed',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              backgroundColor: '#801D24',
              color: '#FFFFFF',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.80rem',
              fontWeight: 600,
              padding: '10px 24px',
              borderRadius: '999px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              border: '1px solid #C5A059',
            }}
          >
            Đã sao chép liên kết thiệp cưới!
          </div>
        )}

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            title="Lên đầu trang"
            aria-label="Lên đầu trang"
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '24px',
              zIndex: 8900,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #C5A059',
              boxShadow: '0 4px 16px rgba(50, 30, 15, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#801D24',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronUp size={20} />
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </div>
  );
}
