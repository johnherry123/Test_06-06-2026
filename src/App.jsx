import { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Heart, Sparkles } from 'lucide-react';
import './index.css';

/* Components */
import IntroShader from './components/IntroShader';
import StationerySuite from './components/StationerySuite';
import AudioPlayer from './components/AudioPlayer';
import PetalsCanvas from './components/PetalsCanvas';
import { COUPLE, WEDDING } from './weddingData';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const audioPlayerRef = useRef(null);

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
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 2400);
        })
        .catch(() => {});
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setHasOpened(true);
    setTimeout(() => setIntroDone(true), 800);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#FAF7F2',
        minHeight: '100vh',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Intro 3D Envelope Screen */}
      {!introDone && (
        <IntroShader
          onComplete={handleIntroComplete}
          onStartMusic={handleStartMusic}
        />
      )}

      {/* 2. Floating Petals Canvas */}
      {hasOpened && <PetalsCanvas />}

      {/* 3. Main Luxury Experience */}
      <div
        aria-hidden={!hasOpened}
        style={{
          opacity: hasOpened ? 1 : 0,
          transition: hasOpened ? 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          pointerEvents: hasOpened ? 'auto' : 'none',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Floating Luxury Share Button (Top Right) */}
        {hasOpened && (
          <div
            style={{
              position: 'fixed',
              top: '18px',
              right: '18px',
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <button
              type="button"
              onClick={handleShare}
              aria-label="Chia sẻ thiệp cưới"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(197, 160, 89, 0.5)',
                boxShadow: '0 4px 16px rgba(50, 30, 15, 0.1)',
                color: '#801D24',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <Share2 size={14} />
              <span>Chia sẻ</span>
            </button>
          </div>
        )}

        {/* The Masterpiece Wedding Invitation */}
        {hasOpened && (
          <main>
            <StationerySuite />

            {/* ── REFINED LUXURY SIGN-OFF (ĐƠN GIẢN, SANG TRỌNG, KHÔNG RƯỜM RÀ) ── */}
            <footer
              role="contentinfo"
              style={{
                backgroundColor: '#FAF5EE',
                padding: '40px 20px 60px',
                textAlign: 'center',
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box',
                borderTop: '1px solid rgba(197, 160, 89, 0.25)',
              }}
            >
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                {/* Gold Filigree */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '14px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, #C5A059)',
                    }}
                  />
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(128, 29, 36, 0.08)',
                      border: '1px solid #C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#801D24',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                    }}
                  >
                    N&amp;N
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '1px',
                      background: 'linear-gradient(to left, transparent, #C5A059)',
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    fontSize: '2.0rem',
                    color: '#801D24',
                    margin: '0 0 6px 0',
                  }}
                >
                  {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
                </p>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: '#6E5D52',
                    margin: '0 0 10px 0',
                  }}
                >
                  Chân thành cảm ơn sự hiện diện và những lời chúc phúc quý báu của Quý khách!
                </p>

                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.68rem',
                    color: '#9A7836',
                    letterSpacing: '0.14em',
                    margin: 0,
                  }}
                >
                  20 · 10 · 2026 — TP. HỒ CHÍ MINH
                </p>
              </div>
            </footer>
          </main>
        )}
      </div>

      {/* Floating Audio Player (Fixed in corner) */}
      <AudioPlayer ref={audioPlayerRef} />

      {/* Copied Toast Notification */}
      {copiedToast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1E1612',
            color: '#FAF7F2',
            border: '1px solid #C5A059',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            borderRadius: '999px',
            padding: '10px 24px',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 600,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <Sparkles size={14} color="#C5A059" />
          <span>Đã sao chép liên kết thiệp cưới!</span>
        </div>
      )}
    </div>
  );
}
