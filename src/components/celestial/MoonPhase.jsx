import { useId } from 'react';
import { moonPath } from '../../celestial/utils';

/** A realistic moon disc rendered for any phase (0 = new, 0.5 = full). */
export default function MoonPhase({ phase, size = 64, glow = true, craters = true, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const d = moonPath(phase, 46, 50, 50);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`moon ${className}`}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={`lit-${uid}`} cx="38%" cy="36%" r="72%">
          <stop offset="0%" stopColor="#fff7e2" />
          <stop offset="55%" stopColor="#ead5a3" />
          <stop offset="100%" stopColor="#a4864f" />
        </radialGradient>
        <radialGradient id={`dark-${uid}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a2348" />
          <stop offset="100%" stopColor="#090e24" />
        </radialGradient>
        <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(240,221,174,0.28)" />
          <stop offset="100%" stopColor="rgba(240,221,174,0)" />
        </radialGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={d} />
        </clipPath>
      </defs>

      {glow && phase > 0.08 && phase < 0.92 && (
        <circle cx="50" cy="50" r={70} fill={`url(#halo-${uid})`} opacity={Math.sin(Math.PI * phase)} />
      )}
      <circle cx="50" cy="50" r="46" fill={`url(#dark-${uid})`} stroke="rgba(201,168,106,0.35)" strokeWidth="0.6" />
      <path d={d} fill={`url(#lit-${uid})`} />
      {craters && (
        <g clipPath={`url(#clip-${uid})`} fill="#7d6236" opacity="0.2">
          <circle cx="38" cy="35" r="7" />
          <circle cx="61" cy="58" r="10" />
          <circle cx="43" cy="67" r="4.5" />
          <circle cx="67" cy="31" r="4" />
          <circle cx="27" cy="55" r="3.6" />
          <circle cx="54" cy="22" r="2.6" />
          <circle cx="75" cy="68" r="3" />
        </g>
      )}
    </svg>
  );
}
