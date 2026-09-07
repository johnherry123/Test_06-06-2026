import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AUDIO_LOCAL = `${import.meta.env.BASE_URL}wedding-music.mp3`;
const AUDIO_FALLBACK = 'https://archive.org/download/westlifebeautifulinwhite_201911/Westlife%20-%20Beautiful%20in%20White.mp3';

const AudioPlayer = forwardRef(function AudioPlayer({ shouldPlay }, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const startPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.65;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay policy prevented playback, user can tap the button manually
        setIsPlaying(false);
      });
  };

  const pausePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlay();
    } else {
      startPlay();
    }
  };

  useImperativeHandle(ref, () => ({
    play: startPlay,
    pause: pausePlay,
    toggle: togglePlay,
  }));

  useEffect(() => {
    if (shouldPlay) {
      startPlay();
    }
  }, [shouldPlay]);

  return (
    <div
      className="audio-player-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          // If local fails, switch to fallback
          if (e.currentTarget.src !== AUDIO_FALLBACK) {
            e.currentTarget.src = AUDIO_FALLBACK;
            e.currentTarget.play().catch(() => {});
          }
        }}
      >
        <source src={AUDIO_LOCAL} type="audio/mp3" />
        <source src={AUDIO_FALLBACK} type="audio/mp3" />
      </audio>

      {/* Floating Animated Music Badge */}
      <button
        type="button"
        onClick={togglePlay}
        className="audio-toggle-btn"
        title={isPlaying ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền lãng mạn (Beautiful in White)'}
        aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền lãng mạn'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '999px',
          background: isPlaying
            ? 'linear-gradient(135deg, #801D24 0%, #5A1217 100%)'
            : 'rgba(255, 255, 255, 0.95)',
          color: isPlaying ? '#FFFFFF' : '#801D24',
          border: '1.5px solid #C5A059',
          boxShadow: '0 8px 25px rgba(50, 30, 15, 0.18)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Animated Soundwave Equalizer Bars */}
        {isPlaying ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '14px' }}>
            <span style={{ width: '2.5px', backgroundColor: '#E6CA85', borderRadius: '2px', animation: 'barWave 1.0s ease-in-out infinite' }} />
            <span style={{ width: '2.5px', backgroundColor: '#E6CA85', borderRadius: '2px', animation: 'barWave 0.7s ease-in-out infinite 0.2s' }} />
            <span style={{ width: '2.5px', backgroundColor: '#E6CA85', borderRadius: '2px', animation: 'barWave 1.2s ease-in-out infinite 0.4s' }} />
          </div>
        ) : (
          <Music size={15} color="#801D24" />
        )}

        <span
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.70rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {isPlaying ? 'Beautiful in White' : 'Bật Nhạc'}
        </span>

        {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>

      <style>{`
        @keyframes barWave {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        @media (max-width: 640px) {
          .audio-player-container {
            bottom: 16px !important;
            right: 14px !important;
          }
          .audio-toggle-btn {
            padding: 6px 12px !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  );
});

export default AudioPlayer;
