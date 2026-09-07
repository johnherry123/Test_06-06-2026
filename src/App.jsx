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

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    if (!hasOpened) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
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
    lenisRef.current?.scrollTo(0, { duration: 1.4 });
  }, []);

  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -70, duration: 1.3 });
    }
    setMobileMenu(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setHasOpened(true);
    setTimeout(() => setIntroDone(true), 1200);
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', position: 'relative' }}>
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
              zIndex: 8000,
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(250, 247, 242, 0.65)',
              backdropFilter: 'blur(16px)',
              borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.28)' : '1px solid transparent',
              boxShadow: scrolled ? '0 4px 20px rgba(50, 30, 15, 0.05)' : 'none',
              padding: scrolled ? '12px 28px' : '18px 28px',
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
                  fontSize: '1.75rem',
                  color: '#801D24',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{COUPLE.groom.firstName}</span>
                <span style={{ color: '#C5A059', fontSize: '1.2rem', fontFamily: 'serif' }}>&amp;</span>
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
                backgroundColor: '#1C1510',
                background: 'radial-gradient(circle at 50% 30%, #2A1E17 0%, #150E0A 100%)',
                color: '#FAF7F2',
                padding: 'clamp(70px, 10vw, 100px) 24px 50px',
                textAlign: 'center',
                position: 'relative',
                borderTop: '2px solid #C5A059',
              }}
            >
              <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Monogram Badge */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 24px auto',
                    borderRadius: '50%',
                    border: '1.5px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(197, 160, 89, 0.12)',
                    boxShadow: '0 0 20px rgba(197, 160, 89, 0.25)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.6rem',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      color: '#E6CA85',
                    }}
                  >
                    Đ &amp; N
                  </span>
                </div>

                {/* Calligraphy Names */}
                <h3
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    fontSize: 'clamp(2.6rem, 6.5vw, 3.8rem)',
                    color: '#E6CA85',
                    margin: '0 0 10px 0',
                    fontWeight: 400,
                  }}
                >
                  {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
                </h3>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                    fontStyle: 'italic',
                    color: 'rgba(250, 247, 242, 0.85)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  Chân thành cảm ơn sự hiện diện và những lời chúc phúc quý báu<br />
                  từ toàn thể Quý khách và Người thân thương!
                </p>

                {/* Golden Line */}
                <div
                  style={{
                    width: '60px',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, #C5A059, transparent)',
                    margin: '0 auto 22px auto',
                  }}
                />

                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.82rem',
                    letterSpacing: '0.2em',
                    color: '#C5A059',
                    marginBottom: '32px',
                    fontWeight: 600,
                  }}
                >
                  20 · 10 · 2026 — GEM CENTER TP.HCM
                </p>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-luxury btn-luxury-outline"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#E6CA85',
                    borderColor: 'rgba(197, 160, 89, 0.5)',
                    marginBottom: '36px',
                  }}
                >
                  <Share2 size={16} />
                  Chia sẻ thiệp cưới
                </button>

                {/* Copyright Line */}
                <p
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.68rem',
                    color: 'rgba(250, 247, 242, 0.4)',
                    borderTop: '1px solid rgba(197, 160, 89, 0.2)',
                    paddingTop: '20px',
                    letterSpacing: '0.06em',
                  }}
                >
                  Hai họ trân trọng kính báo &amp; kính mời
                </p>
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
