import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   FLOATING LUXURY WEDDING MUSIC PLAYER
   Rotating Golden Vinyl Disk + Smooth Ambient Audio Synthesizer
══════════════════════════════════════════════════════════════════════ */

export default function AudioPlayer({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const isRunningRef = useRef(false);
  const audioElemRef = useRef(null);

  // Background romantic melody notes (Canon in D / Wedding Waltz motif)
  const melody = [
    { note: 587.33, dur: 1.2 }, // D5
    { note: 523.25, dur: 1.2 }, // C5
    { note: 493.88, dur: 1.2 }, // B4
    { note: 440.00, dur: 1.2 }, // A4
    { note: 392.00, dur: 1.2 }, // G4
    { note: 349.23, dur: 1.2 }, // F4
    { note: 392.00, dur: 1.2 }, // G4
    { note: 440.00, dur: 1.2 }, // A4
  ];

  const startSynthesizedMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isRunningRef.current = true;
      let step = 0;

      const playNextChord = () => {
        if (!isRunningRef.current) return;
        const now = ctx.currentTime;
        const current = melody[step % melody.length];

        // Soft bell/piano synthesizer sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(current.note, now);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(current.note / 2, now); // 1 octave lower

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + current.dur * 0.95);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + current.dur);
        osc2.stop(now + current.dur);

        step++;
        setTimeout(playNextChord, current.dur * 900);
      };

      playNextChord();
      setIsPlaying(true);
    } catch (_) {}
  };

  const stopSynthesizedMusic = () => {
    isRunningRef.current = false;
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopSynthesizedMusic();
    } else {
      startSynthesizedMusic();
    }
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        startSynthesizedMusic();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9000,
      }}
    >
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Tắt âm nhạc' : 'Bật âm nhạc'}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#8B1E22',
          background: 'linear-gradient(135deg, #9B2226 0%, #741518 100%)',
          border: '1.5px solid rgba(229, 195, 120, 0.6)',
          boxShadow: '0 6px 20px rgba(139, 30, 34, 0.4), 0 0 15px rgba(229, 195, 120, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E5C378',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isPlaying ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spinDisc 6s linear infinite' }}>
            <Volume2 size={20} />
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </button>

      <style>{`
        @keyframes spinDisc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
