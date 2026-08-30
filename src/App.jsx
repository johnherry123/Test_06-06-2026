import React, { useState, useEffect } from 'react';
import './index.css';
import Opening3D from './components/Opening3D';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Couple from './components/Couple';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';
import AudioPlayer from './components/AudioPlayer';
import { ChevronUp, Share2, Menu, X } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   NAVIGATION ITEMS
══════════════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { href: '#hero', label: 'Trang Chủ' },
  { href: '#invitation', label: 'Lời Ngỏ' },
  { href: '#couple', label: 'Cô Dâu & Chú Rể' },
  { href: '#events', label: 'Lịch Trình' },
  { href: '#gallery', label: 'Album Ảnh' },
  { href: '#rsvp', label: 'Phúc Đáp' },
  { href: '#gifts', label: 'Mừng Cưới' },
];

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShowScrollTop(y > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Thiệp Cưới Đại Nghĩa & Thị Nhung — 20.10.2026',
        text: 'Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link thiệp cưới vào bộ nhớ tạm!');
    }
  };

  return (
    <div style={{ backgroundColor: '#FDFBF7', color: '#231B15', minHeight: '100vh', position: 'relative' }}>
      {/* 1. True 3D WebGL Hardcover Invitation Book Opening */}
      {!hasOpened && (
        <Opening3D onComplete={() => setHasOpened(true)} />
      )}

      {/* 2. Floating Header Navigation */}
      {hasOpened && (
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 8000,
            backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.95)' : 'rgba(253, 251, 247, 0.8)',
            backdropFilter: 'blur(16px)',
            borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.25)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 20px rgba(35, 27, 21, 0.06)' : 'none',
            transition: 'all 0.35s ease',
            padding: scrolled ? '12px 24px' : '16px 32px',
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
            {/* Logo */}
            <a
              href="#hero"
              className="font-display text-gold-luxury"
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                lineHeight: 1,
                textDecoration: 'none',
              }}
            >
              Đại Nghĩa & Thị Nhung
            </a>

            {/* Desktop Nav Links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display"
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: '#584A40',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B1E22';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#584A40';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: '#8B1E22',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#FDFBF7',
                borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display"
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#8B1E22',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(197, 160, 89, 0.12)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 3. Main Content Sections */}
      {hasOpened && (
        <main>
          <Hero />
          <Invitation />
          <Couple />
          <Events />
          <Gallery />
          <RSVP />
          <Gifts />

          {/* 4. Luxury Footer */}
          <footer
            style={{
              backgroundColor: '#18110E',
              color: '#FAF7F2',
              padding: 'clamp(70px, 10vw, 100px) 24px 60px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  fontSize: '2.4rem',
                  color: '#C5A059',
                  marginBottom: '14px',
                  fontWeight: 700,
                }}
              >
                囍
              </div>

              <h2
                className="font-display text-gold-luxury"
                style={{
                  fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                  margin: '0 0 16px',
                  lineHeight: 1.15,
                  fontWeight: 700,
                }}
              >
                Đại Nghĩa & Thị Nhung
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'rgba(250, 247, 242, 0.75)',
                  margin: '0 0 28px',
                }}
              >
                "Cảm ơn bạn đã luôn là một phần ý nghĩa trong ngày hạnh phúc nhất của chúng tôi."
              </p>

              <div className="divider-luxury" style={{ marginBottom: '32px' }}>
                <span style={{ color: '#C5A059' }}>✦</span>
              </div>

              <p
                className="font-display"
                style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.25em',
                  color: '#C5A059',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  fontWeight: 600,
                }}
              >
                20 · 10 · 2026 · GEM CENTER TP.HCM
              </p>

              <button
                onClick={handleShare}
                className="btn-luxury-gold"
                style={{
                  color: '#E5C378',
                  borderColor: 'rgba(229, 195, 120, 0.5)',
                  marginBottom: '48px',
                }}
              >
                <Share2 size={16} />
                Chia Sẻ Thiệp Cưới
              </button>

              <div
                style={{
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(197, 160, 89, 0.15)',
                  fontSize: '0.8rem',
                  color: 'rgba(250, 247, 242, 0.45)',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                Hai họ trân trọng kính báo · Thiết kế riêng cho Đám cưới Đại Nghĩa & Thị Nhung
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* 5. Music Controller */}
      <AudioPlayer autoPlay={hasOpened} />

      {/* 6. Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Lên đầu trang"
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            zIndex: 9000,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#FFFDF9',
            border: '1.5px solid rgba(197, 160, 89, 0.4)',
            boxShadow: '0 6px 20px rgba(35, 27, 21, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8B1E22',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronUp size={20} />
        </button>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
