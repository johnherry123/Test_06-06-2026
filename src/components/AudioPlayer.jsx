import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Music2 } from 'lucide-react';

const AUDIO_LOCAL = `${import.meta.env.BASE_URL}wedding-music.mp3`;
const AUDIO_FALLBACK = 'https://archive.org/download/westlifebeautifulinwhite_201911/Westlife%20-%20Beautiful%20in%20White.mp3';

/** Brass "orbit" music toggle. Exposes play / pause / toggle through ref. */
const AudioPlayer = forwardRef(function AudioPlayer({ visible = true }, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.6;
    a.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false)); // autoplay blocked — user can tap the button
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (audioRef.current && !audioRef.current.paused ? pause() : play());

  useImperativeHandle(ref, () => ({ play, pause, toggle }));

  return (
    <div className={`audio${isPlaying ? ' is-playing' : ''}${visible ? ' is-visible' : ''}`}>
      <audio
        ref={audioRef}
        src={AUDIO_LOCAL}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          const el = e.currentTarget;
          if (!el.dataset.fallback) {
            el.dataset.fallback = '1';
            el.src = AUDIO_FALLBACK;
            el.play().catch(() => {});
          }
        }}
      />
      <span className="audio__label mono">{isPlaying ? 'Beautiful in White' : 'Bật nhạc nền'}</span>
      <button
        id="audio-toggle"
        type="button"
        className="audio__btn"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền'}
      >
        <span className="audio__orbit" aria-hidden="true" />
        {isPlaying ? (
          <span className="audio__bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <Music2 size={18} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
});

export default AudioPlayer;
