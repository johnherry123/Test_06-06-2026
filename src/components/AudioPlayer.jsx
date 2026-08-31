/* ══════════════════════════════════
   AUDIO PLAYER — Minimal floating control
   A tiny discreet button, not a UI component.
══════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef  = useRef(null);
  const runRef  = useRef(false);
  const stepRef = useRef(0);

  const melody = [
    { f: 587.33, d: 1.2 }, { f: 523.25, d: 1.2 },
    { f: 493.88, d: 1.2 }, { f: 440.00, d: 1.2 },
    { f: 392.00, d: 1.2 }, { f: 349.23, d: 1.2 },
    { f: 392.00, d: 1.2 }, { f: 440.00, d: 1.2 },
  ];

  const start = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!ctxRef.current) ctxRef.current = new AC();
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      runRef.current = true;
      const play = () => {
        if (!runRef.current) return;
        const now  = ctx.currentTime;
        const note = melody[stepRef.current % melody.length];
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';     osc1.frequency.value = note.f;
        osc2.type = 'triangle'; osc2.frequency.value = note.f / 2;
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 0.9);
        [osc1, osc2].forEach(o => { o.connect(gain); o.start(now); o.stop(now + note.d); });
        gain.connect(ctx.destination);
        stepRef.current++;
        setTimeout(play, note.d * 880);
      };
      play();
      setIsPlaying(true);
    } catch {}
  };

  const stop = () => {
    runRef.current = false;
    if (ctxRef.current?.state === 'running') ctxRef.current.suspend();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(start, 1000);
      return () => clearTimeout(t);
    }
  }, [autoPlay]);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9000 }}>
      <button
        onClick={isPlaying ? stop : start}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(253,251,247,0.95)',
          border: '1px solid rgba(35,27,21,0.15)',
          boxShadow: '0 2px 12px rgba(35,27,21,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isPlaying ? '#8B1E22' : '#756B63',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '16px',
          lineHeight: 1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#8B1E22';
          e.currentTarget.style.color = '#8B1E22';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(35,27,21,0.15)';
          e.currentTarget.style.color = isPlaying ? '#8B1E22' : '#756B63';
        }}
      >
        {/* Simple music note or pause bars — pure SVG, no library */}
        {isPlaying ? (
          /* Pause bars */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="3.5" height="12" rx="1"/>
            <rect x="8.5" y="1" width="3.5" height="12" rx="1"/>
          </svg>
        ) : (
          /* Music note */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M10.5 1.5v7.25a2.25 2.25 0 1 1-1.5-.82V4.5l-5 1v5.75a2.25 2.25 0 1 1-1.5-.82V3.5L10.5 1.5z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
