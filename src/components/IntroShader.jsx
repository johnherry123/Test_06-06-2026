/* ══════════════════════════════════════════════════════════════════════
   INTRO — Physical Wedding Invitation Experience v3 (Refinement)
   Art Direction: PORTRAIT invitation card (like real wedding stationery)
                  on warm ivory surface with dramatic botanical framing
   
   FIXED from v1:
   - Invitation is now PORTRAIT not landscape (correct physical proportion)
   - CTA moved BELOW the composition (not inside the card)  
   - Composition is significantly LARGER — fills the screen with presence
   - Botanical branches are LARGER, higher contrast, compositionally meaningful
   - Background has warm LIGHT, no digital blue edges
   - Envelope is deeper burgundy with realistic lighting gradient
   - Typography hierarchy on card is clean (no CTA interrupting names)
   - Mobile: invitation occupies 72% viewport width and centered vertically
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect } from 'react';

/* Replace src with real couple photograph.
   Recommended: warm natural light, 3:2 landscape, intimate/editorial. */
const COUPLE_PHOTO = {
  src:      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=90&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
  alt:      'Ảnh đôi uyên ương',
};

/* ── Botanical SVG — left-side strong composition element ── */
const LeftBotanical = () => (
  <svg viewBox="0 0 180 420" fill="none" stroke="#B89555" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: '100%', height: '100%' }} aria-hidden="true">
    {/* Main vertical stem */}
    <path d="M90 400 C88 360 86 320 88 280 C90 240 92 200 89 160 C86 120 84 80 88 40"
      strokeWidth="1.2" opacity="0.55"/>
    {/* Branch left upper */}
    <path d="M88 80 C72 70 55 62 38 56" strokeWidth="0.9" opacity="0.50"/>
    <path d="M88 120 C68 108 48 100 30 96" strokeWidth="0.85" opacity="0.46"/>
    <path d="M88 165 C70 154 52 148 36 144" strokeWidth="0.8" opacity="0.42"/>
    {/* Branch right */}
    <path d="M89 100 C106 88 122 80 140 74" strokeWidth="0.85" opacity="0.44"/>
    <path d="M89 145 C108 134 126 128 144 125" strokeWidth="0.8" opacity="0.40"/>
    <path d="M89 200 C110 190 128 184 146 182" strokeWidth="0.75" opacity="0.36"/>
    {/* Leaves on left branches */}
    <path d="M56 62 C50 55 54 48 60 51 C58 57 56 63 56 62Z" strokeWidth="0.8" opacity="0.52"/>
    <path d="M38 57 C33 50 37 43 43 46 C41 52 39 57 38 57Z" strokeWidth="0.75" opacity="0.48"/>
    <path d="M48 103 C43 96 47 89 53 92 C51 98 49 103 48 103Z" strokeWidth="0.75" opacity="0.45"/>
    <path d="M30 97 C25 90 29 83 35 86 C33 92 31 97 30 97Z" strokeWidth="0.70" opacity="0.42"/>
    <path d="M50 149 C45 142 49 135 55 138 C53 144 51 149 50 149Z" strokeWidth="0.70" opacity="0.40"/>
    <path d="M36 145 C31 138 35 131 41 134 C39 140 37 145 36 145Z" strokeWidth="0.65" opacity="0.38"/>
    {/* Leaves on right branches */}
    <path d="M122 82 C126 74 133 74 134 80 C128 83 122 83 122 82Z" strokeWidth="0.75" opacity="0.44"/>
    <path d="M140 75 C144 67 151 67 152 73 C146 76 140 76 140 75Z" strokeWidth="0.70" opacity="0.40"/>
    <path d="M128 132 C132 124 139 124 140 130 C134 133 128 133 128 132Z" strokeWidth="0.70" opacity="0.38"/>
    <path d="M144 126 C148 118 155 118 156 124 C150 127 144 127 144 126Z" strokeWidth="0.65" opacity="0.35"/>
    {/* Berries */}
    <circle cx="39" cy="57" r="1.8" fill="#B89555" stroke="none" opacity="0.44"/>
    <circle cx="58" cy="62" r="1.5" fill="#B89555" stroke="none" opacity="0.40"/>
    <circle cx="31" cy="97" r="1.5" fill="#B89555" stroke="none" opacity="0.38"/>
    <circle cx="141" cy="75" r="1.4" fill="#B89555" stroke="none" opacity="0.36"/>
    <circle cx="145" cy="126" r="1.2" fill="#B89555" stroke="none" opacity="0.32"/>
    {/* Lotus bud at top */}
    <path d="M88 42 C84 34 80 26 86 18 C92 26 90 34 88 42Z" strokeWidth="1.0" opacity="0.55"/>
    <path d="M88 40 C82 32 78 23 82 16 C87 23 88 32 88 40Z" strokeWidth="0.9" opacity="0.50"/>
    <path d="M88 40 C94 32 98 23 94 16 C89 23 88 32 88 40Z" strokeWidth="0.9" opacity="0.50"/>
    <path d="M88 44 C87 52 86 58 84 64" strokeWidth="0.85" opacity="0.48"/>
    <circle cx="88" cy="15" r="2.0" fill="#B89555" stroke="none" opacity="0.50"/>
    {/* Lower tendrils */}
    <path d="M88 240 C72 232 58 228 44 226" strokeWidth="0.75" opacity="0.34"/>
    <path d="M89 290 C106 280 122 275 138 273" strokeWidth="0.70" opacity="0.30"/>
    <path d="M88 340 C74 330 60 326 46 324" strokeWidth="0.65" opacity="0.26"/>
    <path d="M44 227 C40 220 44 213 50 216 C48 222 45 227 44 227Z" strokeWidth="0.65" opacity="0.32"/>
    <path d="M138 274 C142 266 149 266 150 272 C144 275 138 275 138 274Z" strokeWidth="0.60" opacity="0.28"/>
  </svg>
);

/* ── Lotus ornament inside the card ── */
const LotusCard = () => (
  <svg viewBox="0 0 56 40" fill="none" stroke="#B89555" strokeLinecap="round" strokeLinejoin="round"
    width="44" height="32" aria-hidden="true">
    <path d="M28 36 C24 29 22 21 28 12 C34 21 32 29 28 36Z" strokeWidth="1.0" opacity="0.80"/>
    <path d="M28 34 C20 27 17 18 21 10 C26 18 28 27 28 34Z" strokeWidth="0.85" opacity="0.72"/>
    <path d="M28 34 C36 27 39 18 35 10 C30 18 28 27 28 34Z" strokeWidth="0.85" opacity="0.72"/>
    <path d="M28 32 C13 25 8 14 12 5 C20 13 26 24 28 32Z" strokeWidth="0.75" opacity="0.58"/>
    <path d="M28 32 C43 25 48 14 44 5 C36 13 30 24 28 32Z" strokeWidth="0.75" opacity="0.58"/>
    <line x1="28" y1="21" x2="28" y2="15" strokeWidth="0.65" opacity="0.65"/>
    <line x1="25" y1="22" x2="23" y2="17" strokeWidth="0.60" opacity="0.60"/>
    <line x1="31" y1="22" x2="33" y2="17" strokeWidth="0.60" opacity="0.60"/>
    <circle cx="28" cy="14" r="1.1" fill="#B89555" stroke="none" opacity="0.58"/>
    <circle cx="23" cy="16" r="0.9" fill="#B89555" stroke="none" opacity="0.50"/>
    <circle cx="33" cy="16" r="0.9" fill="#B89555" stroke="none" opacity="0.50"/>
    <path d="M16 38 Q28 36 40 38" strokeWidth="0.5" opacity="0.35"/>
  </svg>
);

/* ── Wax seal ── */
const WaxSeal = ({ size = 56 }) => (
  <svg viewBox="0 0 88 88" width={size} height={size} aria-hidden="true">
    {/* Shadow */}
    <ellipse cx="44" cy="50" rx="32" ry="8" fill="rgba(35,27,21,0.18)"/>
    {/* Outer drip — organic shape */}
    <path d="M44 78 C34 78 20 70 14 58 C8 46 10 32 18 22 C26 12 36 8 44 8 C52 8 62 12 70 22 C78 32 80 46 74 58 C68 70 54 78 44 78Z"
      fill="#6F171B" opacity="0.95"/>
    {/* Main wax body */}
    <circle cx="44" cy="42" r="30" fill="#8B1E22"/>
    {/* Highlight — top left light catch */}
    <ellipse cx="36" cy="30" rx="9" ry="6" fill="rgba(255,255,255,0.07)" transform="rotate(-20 36 30)"/>
    {/* Inner decorative ring */}
    <circle cx="44" cy="42" r="26" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" fill="none"/>
    <circle cx="44" cy="42" r="22" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none" strokeDasharray="2.5 3"/>
    {/* Monogram */}
    <text x="44" y="50" fontFamily="'Playfair Display',Georgia,serif" fontSize="18" fontStyle="italic"
      fontWeight="400" fill="#F8F4EC" textAnchor="middle" opacity="0.94" letterSpacing="0.5">ĐN</text>
    {/* Gold dots */}
    <circle cx="44" cy="14" r="1.8" fill="#B89555" opacity="0.70"/>
    <circle cx="44" cy="70" r="1.8" fill="#B89555" opacity="0.70"/>
    <circle cx="16" cy="42" r="1.8" fill="#B89555" opacity="0.70"/>
    <circle cx="72" cy="42" r="1.8" fill="#B89555" opacity="0.70"/>
  </svg>
);

export default function IntroShader({ onComplete }) {
  const [entered, setEntered] = useState(false);
  const [phase,   setPhase]   = useState('idle'); // idle | lifting | revealing | exit
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = e => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* Entrance stagger */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* Preload couple photo */
  useEffect(() => {
    const img = new Image();
    img.src = COUPLE_PHOTO.src;
    img.onerror = () => { img.src = COUPLE_PHOTO.fallback; };
  }, []);

  const handleOpen = () => {
    if (phase !== 'idle') return;
    if (reducedMotion) {
      setPhase('exit');
      setTimeout(onComplete, 450);
      return;
    }
    /*
     * Animation timeline:
     *   lifting    0ms   — card nudges forward (scale + shadow)
     *   revealing  320ms — text fades, couple photo fades in inside card
     *   fullscreen 850ms — card/photo EXPANDS to fill entire viewport
     *   exit       1250ms — whole screen fades to ivory
     *   onComplete 1700ms
     */
    setPhase('lifting');
    setTimeout(() => setPhase('revealing'),  320);
    setTimeout(() => setPhase('fullscreen'), 850);
    setTimeout(() => setPhase('exit'),       1250);
    setTimeout(() => onComplete(),           1700);
  };

  const isLifting    = phase === 'lifting';
  const isRevealing  = phase === 'revealing' || phase === 'fullscreen' || phase === 'exit';
  const isFullscreen = phase === 'fullscreen' || phase === 'exit';
  const isExit       = phase === 'exit';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp cưới Đại Nghĩa & Thị Nhung — bấm bất kỳ đâu để mở"
      /* ── Click ANYWHERE to open ── */
      onClick={handleOpen}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      tabIndex={phase === 'idle' ? 0 : -1}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        /* Pointer so user knows it's interactive */
        cursor: phase === 'idle' ? 'pointer' : 'default',
        /* ── Warm ivory background ── */
        background: `
          radial-gradient(ellipse 70% 65% at 50% 40%,
            #FFF8E8 0%,
            #F9F0D8 45%,
            #F0E4C4 100%
          )
        `,
        backgroundColor: '#F0E4C4',
        /* Fade-out on exit */
        opacity: isExit ? 0 : 1,
        transition: isExit ? 'opacity 0.45s cubic-bezier(0.65,0,0.35,1)' : 'none',
      }}
    >
      {/* ── Very subtle warm vignette at edges (not blue — warm brown) ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 100% 100% at 50% 50%,
          transparent 42%,
          rgba(180,148,100,0.10) 75%,
          rgba(140,108,60,0.18) 100%
        )`,
      }}/>

      {/* ── Paper grain texture ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)' opacity='0.030'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '220px 220px',
      }}/>

      {/* ── Warm light source — top center glow ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '55%',
        background: 'radial-gradient(ellipse, rgba(255,235,180,0.22) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* ═══════════════════════════════════════════════════
          LEFT BOTANICAL — large, strong, compositional
      ═══════════════════════════════════════════════════ */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: 'clamp(-12px, -0.8vw, -4px)',
        top: '50%',
        transform: 'translateY(-50%)',
        /* Mobile: 68px (17% of 390px) — frames without competing
           Desktop: 170px (12% of 1440px) — elegant presence */
        width: 'clamp(68px, 11vw, 170px)',
        height: 'clamp(260px, 46vh, 480px)',
        zIndex: 2,
        opacity: entered ? 0.72 : 0,
        transition: 'opacity 1.4s 0.5s ease',
        pointerEvents: 'none',
      }}>
        <LeftBotanical />
      </div>

      {/* ── Mirrored botanical on right (subtle, lower contrast) ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: 'clamp(-12px, -0.8vw, -4px)',
        top: '50%',
        transform: 'translateY(-52%) scaleX(-1)',
        /* Right botanical is secondary — smaller and more transparent */
        width: 'clamp(54px, 9vw, 136px)',
        height: 'clamp(220px, 38vh, 400px)',
        zIndex: 2,
        opacity: entered ? 0.50 : 0,
        transition: 'opacity 1.4s 0.8s ease',
        pointerEvents: 'none',
      }}>
        <LeftBotanical />
      </div>

      {/* ═══════════════════════════════════════════════════
          INVITATION COMPOSITION — the hero object
          Portrait orientation: like a real wedding invitation
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        zIndex: 10,
        /*
         * Fullscreen phase: card expands to fill viewport.
         * This creates the 'opening the invitation reveals the couple' moment.
         */
        transform: isFullscreen
          ? 'translateY(0) scale(1)'
          : (isLifting || isRevealing)
            ? 'translateY(-10px) scale(1.022)'
            : entered ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
        width:  isFullscreen ? '100vw' : 'auto',
        height: isFullscreen ? '100vh' : 'auto',
        display: isFullscreen ? 'flex' : 'relative',
        alignItems: isFullscreen ? 'center' : undefined,
        justifyContent: isFullscreen ? 'center' : undefined,
        opacity: entered ? 1 : 0,
        transition: entered
          ? (isLifting || isRevealing
              ? 'transform 0.5s cubic-bezier(0.34,1.3,0.64,1)'
              : 'opacity 1.1s 0.15s ease, transform 1.1s 0.15s cubic-bezier(0.16,1,0.3,1)')
          : 'none',
      }}>
        {/* ── ENVELOPE FLAP — triangle at top for visual reading as envelope ── */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 'clamp(-48px,-6vw,-36px)',
          left: 'clamp(-16px,-2.5vw,-12px)',
          right: 'clamp(-16px,-2.5vw,-12px)',
          height: 'clamp(52px,8vw,68px)',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          {/* The triangle flap shape */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #9E2328 0%, #7A1A1E 100%)',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          }}/>
          {/* Shadow below flap */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
            background: 'rgba(18,10,6,0.20)',
          }}/>
        </div>

        {/* ── ENVELOPE BODY — behind card ── */}
        <div style={{
          position: 'absolute',
          top: 'clamp(-14px,-2vw,-10px)',
          left: 'clamp(-16px,-2.5vw,-12px)',
          right: 'clamp(-16px,-2.5vw,-12px)',
          bottom: 'clamp(-20px,-3.5vw,-14px)',
          borderRadius: '3px',
          background: `linear-gradient(155deg,
            #9E2328 0%,
            #8B1E22 28%,
            #7A1A1E 58%,
            #6F171B 100%
          )`,
          boxShadow: isRevealing
            ? '0 36px 90px rgba(18,10,6,0.36), 0 10px 30px rgba(111,23,27,0.30)'
            : '0 22px 64px rgba(18,10,6,0.26), 0 6px 18px rgba(111,23,27,0.22)',
          transition: 'box-shadow 0.45s ease',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
            background: 'linear-gradient(to top, rgba(18,10,6,0.18) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '160px 160px',
            pointerEvents: 'none',
          }}/>

          {/* ── WAX SEAL ── */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(4px,0.7vw,7px)',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 5px 12px rgba(18,10,6,0.50))',
            opacity: isRevealing ? 0.35 : 1,
            transition: 'opacity 0.3s ease',
            zIndex: 5,
          }}>
            <WaxSeal size={58} />
          </div>
        </div>

        {/* ── INVITATION CARD — PORTRAIT, ivory ── */}
        <div style={{
          position: 'relative',
          zIndex: 8,
          /*
           * Scale target:
           *   390px mobile  → 62vw = ~242px  (elegant, not giant)
           *   1440px desktop → max 348px     (luxury stationery proportion)
           * min 228px ensures legibility on 360px viewport
           */
          width: 'clamp(228px, 62vw, 348px)',
          borderRadius: '2px',
          overflow: 'hidden',
          background: '#FDFBF7',
          boxShadow: [
            '0 1px 2px rgba(35,27,21,0.05)',
            '0 4px 12px rgba(35,27,21,0.10)',
            '0 16px 40px rgba(35,27,21,0.12)',
            'inset 0 0 0 1px rgba(255,255,255,0.7)',
          ].join(', '),
        }}>
          {/* Paper grain on card */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.76' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.024'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '180px 180px',
          }}/>

          {/* ── Champagne foil inner border ── */}
          <div style={{
            position: 'absolute',
            inset: 'clamp(8px,1.8vw,12px)',
            border: '0.8px solid rgba(184,149,85,0.42)',
            borderRadius: '1px',
            zIndex: 2, pointerEvents: 'none',
          }}/>
          {/* Corner dot ornaments */}
          {[
            { top:'clamp(4px,.9vw,6px)',  left:'clamp(4px,.9vw,6px)'  },
            { top:'clamp(4px,.9vw,6px)',  right:'clamp(4px,.9vw,6px)' },
            { bottom:'clamp(4px,.9vw,6px)', left:'clamp(4px,.9vw,6px)'  },
            { bottom:'clamp(4px,.9vw,6px)', right:'clamp(4px,.9vw,6px)' },
          ].map((p, i) => (
            <div key={i} aria-hidden="true" style={{
              position: 'absolute', width: '6px', height: '6px',
              borderRadius: '50%', backgroundColor: 'rgba(184,149,85,0.32)',
              zIndex: 3, ...p,
            }}/>
          ))}

          {/* ── CARD CONTENT — typography ── */}
          <div style={{
            position: 'relative', zIndex: 4,
            padding: 'clamp(28px,5.5vw,44px) clamp(24px,4.5vw,36px)',
            textAlign: 'center',
            opacity: isRevealing ? 0 : 1,
            transition: 'opacity 0.30s ease',
          }}>

            {/* Lotus ornament */}
            <div style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(12px,2.2vw,18px)' }}>
              <LotusCard />
            </div>

            {/* ĐN Monogram — champagne gold */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem,5vw,3.2rem)',
              fontStyle: 'italic', fontWeight: 400,
              color: '#B89555',
              lineHeight: 1, letterSpacing: '0.04em',
              marginBottom: 'clamp(6px,1.2vw,10px)',
            }}>
              ĐN
            </div>

            {/* Champagne rule */}
            <div style={{
              width: '32px', height: '0.8px',
              background: 'linear-gradient(to right, transparent, #B89555, transparent)',
              margin: '0 auto clamp(10px,2vw,16px)',
            }}/>

            {/* TRÂN TRỌNG KÍNH MỜI */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.55rem,1.3vw,0.65rem)',
              fontWeight: 500, letterSpacing: '0.20em',
              textTransform: 'uppercase', color: '#9E8E7E',
              marginBottom: 'clamp(12px,2.2vw,18px)',
            }}>
              Trân trọng kính mời
            </p>

            {/* Groom name */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.7rem,3.8vw,2.4rem)',
              fontWeight: 500, color: '#231B15',
              lineHeight: 1.05, margin: '0 0 clamp(2px,.4vw,4px)',
              letterSpacing: '-0.01em',
            }}>
              Đại Nghĩa
            </h1>

            {/* Ampersand */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem,2.4vw,1.5rem)',
              fontStyle: 'italic', fontWeight: 300,
              color: '#8B1E22',
              margin: 'clamp(1px,.3vw,3px) 0',
              lineHeight: 1,
            }}>
              &amp;
            </div>

            {/* Bride name */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.7rem,3.8vw,2.4rem)',
              fontWeight: 500, color: '#231B15',
              lineHeight: 1.05, margin: '0 0 clamp(14px,2.8vw,22px)',
              letterSpacing: '-0.01em',
            }}>
              Thị Nhung
            </h1>

            {/* Second champagne rule */}
            <div style={{
              width: '28px', height: '0.7px',
              background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.6), transparent)',
              margin: '0 auto clamp(10px,2vw,15px)',
            }}/>

            {/* Date */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.60rem,1.4vw,0.72rem)',
              fontWeight: 500, letterSpacing: '0.22em',
              color: '#9E8E7E', margin: '0 0 clamp(16px,3vw,24px)',
            }}>
              20 &nbsp;·&nbsp; 10 &nbsp;·&nbsp; 2026
            </p>

            {/* Venue — last line, smallest */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.75rem,1.6vw,0.88rem)',
              fontStyle: 'italic', fontWeight: 400,
              color: '#B0A090', margin: 0,
            }}>
              Gem Center, TP. Hồ Chí Minh
            </p>
          </div>

          {/* ── Couple photo inside card (revealing phase) ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 6,
            opacity: isRevealing && !isFullscreen ? 1 : 0,
            transition: 'opacity 0.45s 0.15s ease',
          }}>
            <img src={COUPLE_PHOTO.src} alt={COUPLE_PHOTO.alt}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 20%', display:'block' }}
              onError={e => { if (e.target.src !== COUPLE_PHOTO.fallback) e.target.src = COUPLE_PHOTO.fallback; }}
            />
          </div>
        </div>
      </div>

      {/* ── PHOTO REVEAL ──
          Narrative: invitation opens → couple appears in the invitation's visual language
          Design rules:
            • Background stays WARM (ivory), not dark — connected to stationery
            • Photo keeps its natural 3:2 ratio — height:auto, no forced crop
            • Max width 86vw mobile / 600px desktop — elegant, not cinematic
            • Breathing room: photo floats centered with space above and below
            • Transition: fade + gentle scale → leads naturally into Hero's warm palette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        /* ── Warm ivory background — same palette as invitation ── */
        background: `
          radial-gradient(ellipse 80% 70% at 50% 42%,
            #FFF8E8 0%,
            #F5EDD8 50%,
            #EDE0C4 100%
          )
        `,
        backgroundColor: '#F0E4C4',
        opacity: isFullscreen ? 1 : 0,
        pointerEvents: 'none',
        transition: isFullscreen
          ? 'opacity 0.40s cubic-bezier(0.4,0,0.2,1)'
          : 'opacity 0.16s ease',
      }}>

        {/* Warm vignette — same as main intro background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(140,108,60,0.12) 100%)',
        }}/>

        {/* ── Photo frame — editorial stationery aesthetic ── */}
        <div style={{
          position: 'relative',
          /*
           * Width: 86vw on mobile (390px → ~335px), max 600px on desktop
           * NO fixed height — image determines its own height from natural 3:2 ratio
           * Result at 390px: 335 × 223px — full couple visible, faces never cropped
           */
          width: 'min(86vw, 600px)',
          transform: isFullscreen ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(8px)',
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
          /* Soft paper shadow — editorial print aesthetic */
          boxShadow: '0 8px 40px rgba(35,27,21,0.16), 0 2px 8px rgba(35,27,21,0.08)',
        }}>
          {/* Thin champagne frame line */}
          <div style={{
            position: 'absolute', inset: '-1px',
            border: '0.8px solid rgba(184,149,85,0.30)',
            pointerEvents: 'none', zIndex: 2,
          }}/>

          {/* The actual photo — height:auto preserves natural 3:2 ratio */}
          <img
            src={COUPLE_PHOTO.src}
            alt={COUPLE_PHOTO.alt}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',           /* ← critical: no height force, no crop */
              objectFit: 'unset',       /* not needed when height:auto */
              verticalAlign: 'bottom',  /* removes inline baseline gap */
            }}
            onError={e => { if (e.target.src !== COUPLE_PHOTO.fallback) e.target.src = COUPLE_PHOTO.fallback; }}
          />

          {/* Very subtle bottom gradient on the photo itself */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '25%',
            background: 'linear-gradient(to top, rgba(35,27,21,0.12) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 1,
          }}/>
        </div>

        {/* Date caption below photo — keeps warm editorial tone */}
        <p style={{
          marginTop: '14px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)',
          fontStyle: 'italic',
          color: 'rgba(90,78,68,0.75)',
          letterSpacing: '0.06em',
          opacity: isFullscreen ? 1 : 0,
          transition: 'opacity 0.4s 0.25s ease',
        }}>
          Đại Nghĩa &amp; Thị Nhung — 20.10.2026
        </p>

        {/* Warm fade-to-ivory at bottom edges — bridges to Hero */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
          background: 'linear-gradient(to top, #F0E4C4 0%, transparent 100%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '12%',
          background: 'linear-gradient(to bottom, #FFF8E8 0%, transparent 100%)',
          pointerEvents: 'none',
        }}/>
      </div>

      {/* ═══════════════════════════════════════════════════
          CTA — BELOW the composition (NOT inside the card)
          Integrated, understated, clearly separate
      ═══════════════════════════════════════════════════ */}
      <button
        onClick={e => { e.stopPropagation(); handleOpen(); }}
        aria-label="Mở thiệp cưới và xem toàn bộ nội dung"
        style={{
          position: 'relative', zIndex: 10,
          marginTop: 'clamp(22px,3.5vw,32px)',
          background: 'transparent', border: 'none',
          cursor: 'pointer', padding: '14px 24px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '7px',
          minWidth: '88px', minHeight: '52px',
          opacity: entered && phase === 'idle' ? 1 : 0,
          transform: entered && phase === 'idle' ? 'translateY(0)' : 'translateY(6px)',
          transition: phase === 'idle'
            ? 'opacity 0.9s 1.3s ease, transform 0.9s 1.3s ease'
            : 'opacity 0.18s ease, transform 0.18s ease',
          pointerEvents: phase === 'idle' ? 'auto' : 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.querySelector('.cta-text').style.color = '#8B1E22';
          e.currentTarget.querySelector('.cta-text').style.letterSpacing = '0.28em';
          e.currentTarget.querySelector('.cta-line').style.opacity = '1';
          e.currentTarget.querySelector('.cta-line').style.width = '52px';
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('.cta-text').style.color = '#5A4E44';
          e.currentTarget.querySelector('.cta-text').style.letterSpacing = '0.22em';
          e.currentTarget.querySelector('.cta-line').style.opacity = '0.55';
          e.currentTarget.querySelector('.cta-line').style.width = '40px';
        }}
      >
        <span className="cta-text" style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.62rem,1.5vw,0.72rem)',
          fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#5A4E44',
          transition: 'color 0.25s ease, letter-spacing 0.3s ease',
        }}>
          Mở Thiệp
        </span>
        {/* Champagne underline — grows on hover */}
        <span className="cta-line" aria-hidden="true" style={{
          display: 'block', width: '40px', height: '1px',
          background: 'linear-gradient(to right, transparent, #B89555, transparent)',
          opacity: 0.55, alignSelf: 'center',
          transition: 'opacity 0.3s ease, width 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}/>
        {/* Down chevron */}
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
          stroke="#B89555" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"
          style={{ opacity: 0.65 }}>
          <path d="M1 1.5l4 4 4-4"/>
        </svg>
      </button>

      {/* ── Top date label ── */}
      <p aria-hidden="true" style={{
        position: 'absolute', top: 'clamp(16px,2.5vw,26px)', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 'clamp(0.52rem,1.2vw,0.60rem)',
        fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#A09080',
        margin: 0, zIndex: 8, pointerEvents: 'none',
        whiteSpace: 'nowrap',
        opacity: entered && phase === 'idle' ? 1 : 0,
        transition: 'opacity 0.9s 0.9s ease',
      }}>
        Lễ Thành Hôn &nbsp;·&nbsp; 20 . 10 . 2026
      </p>

      {/* ── Champagne frame lines ── */}
      {['top','bottom'].map(side => (
        <div key={side} aria-hidden="true" style={{
          position: 'absolute',
          [side]: 'clamp(12px,2vw,20px)',
          left: 'clamp(18px,3.5vw,40px)', right: 'clamp(18px,3.5vw,40px)',
          height: '1px', zIndex: 8, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.30) 25%, rgba(184,149,85,0.30) 75%, transparent)',
          opacity: entered ? 1 : 0,
          transition: 'opacity 1.2s 0.7s ease',
        }}/>
      ))}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

/* Tiny helper — clamp for seal size without CSS clamp in JSX numbers */
function clamp(preferred, vwFactor, max) {
  if (typeof window === 'undefined') return preferred;
  const vw = Math.min(window.innerWidth * vwFactor / 100, max);
  return Math.max(preferred, vw);
}
