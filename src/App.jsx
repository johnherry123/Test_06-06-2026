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
            id="tes_top_bar"
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
              id="tes_btn_share"
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
                color: '#82202B',
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
          <main id="tes_main_content">
            <StationerySuite />
          </main>
        )}
      </div>

      {/* Floating Audio Player (Fixed in corner) */}
      <AudioPlayer ref={audioPlayerRef} />

      {/* Copied Toast Notification */}
      {copiedToast && (
        <div
          id="tes_copied_toast"
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
