/* ══════════════════════════════════════════════════════════════════════
   AUDIO PLAYER — Floating luxury vinyl controller
   Upgraded with better UI and cursor-hover support
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef   = useRef(null);
  const runRef   = useRef(false);
  const stepRef  = useRef(0);

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
        const now = ctx.currentTime;
        const note = melody[stepRef.current % melody.length];
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';      osc1.frequency.value = note.f;
        osc2.type = 'triangle';  osc2.frequency.value = note.f / 2;
        gain.gain.setValueAtTime(0.07, now);
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
    if (autoPlay) { const t = setTimeout(start, 800); return () => clearTimeout(t); }
  }, [autoPlay]);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9000 }}>
      <button
        onClick={isPlaying ? stop : start}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        data-cursor-hover
        style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, #9B2226, #741518)',
          border: '1.5px solid rgba(229,195,120,0.55)',
          boxShadow: `0 6px 20px rgba(139,30,34,0.4)${isPlaying ? ', 0 0 0 6px rgba(139,30,34,0.12)' : ''}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#E5C378', cursor: 'none',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          animation: isPlaying ? 'pulse-gold 1.8s ease-in-out infinite' : 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying
          ? <Volume2 size={20} style={{ animation: 'spin-slow 4s linear infinite' }} />
          : <VolumeX size={20} />
        }
      </button>
    </div>
  );
}
