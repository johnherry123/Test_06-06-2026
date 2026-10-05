import { useEffect, useRef } from 'react';

const COLORS = {
  white: '242, 240, 255',
  warm: '255, 228, 184',
  cool: '184, 202, 255',
};

/** Fixed full-page starfield: twinkling stars with depth parallax + occasional shooting stars. */
export default function SkyCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let stars = [];
    const shooters = [];
    let raf = 0;
    let last = performance.now();
    let nextShoot = 2600;

    const build = () => {
      const count = Math.min(900, Math.round((w * h) / 2400));
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          r: Math.random() ** 3 * 1.45 + 0.25,
          tw: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 1.6,
          c: roll < 0.12 ? COLORS.warm : roll < 0.3 ? COLORS.cool : COLORS.white,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const rebuild = Math.abs(nw - w) > 2 || Math.abs(nh - h) > 140;
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (rebuild || !stars.length) build();
    };

    const SHOWER_TINTS = ['255, 245, 220', '255, 214, 236', '200, 222, 255', '240, 221, 174'];

    const spawnShooter = (opts = {}) => {
      const dir = opts.dir ?? (Math.random() < 0.5 ? -1 : 1);
      const boost = opts.boost ?? 1;
      shooters.push({
        x: opts.x ?? (dir < 0 ? w * (0.45 + Math.random() * 0.5) : w * (0.05 + Math.random() * 0.5)),
        y: opts.y ?? h * Math.random() * 0.45,
        vx: dir * (5 + Math.random() * 4) * boost,
        vy: (2.2 + Math.random() * 2) * boost,
        life: 0,
        max: 55 + Math.random() * 35,
        tint: opts.tint ?? SHOWER_TINTS[0],
        width: opts.width ?? 1.2,
        tail: opts.tail ?? 16,
      });
    };

    const showerTimers = [];
    const onShower = (e) => {
      if (reduce) return;
      const count = e.detail?.count ?? 16;
      const dir = Math.random() < 0.5 ? -1 : 1;
      for (let i = 0; i < count; i += 1) {
        showerTimers.push(
          setTimeout(() => {
            spawnShooter({
              dir,
              boost: 1.15 + Math.random() * 0.5,
              x: dir < 0 ? w * (0.3 + Math.random() * 0.8) : w * (-0.1 + Math.random() * 0.8),
              y: -20 + Math.random() * h * 0.5,
              tint: SHOWER_TINTS[(Math.random() * SHOWER_TINTS.length) | 0],
              width: 1.4 + Math.random() * 1.3,
              tail: 18 + Math.random() * 10,
            });
          }, i * (90 + Math.random() * 140)),
        );
      }
    };
    window.addEventListener('celestial:meteors', onShower);

    const draw = (t) => {
      const dt = Math.min(64, t - last);
      last = t;
      const k = dt / 16.67;
      const scroll = window.scrollY || 0;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        let y = (s.y - scroll * (0.015 + s.z * 0.07)) % h;
        if (y < 0) y += h;
        const flicker = reduce ? 0.75 : 0.45 + 0.55 * Math.abs(Math.sin(s.tw + t * 0.0006 * s.sp));
        const a = flicker * (0.3 + s.z * 0.7);
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${s.c})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.3) {
          ctx.globalAlpha = a * 0.3;
          ctx.fillRect(s.x - s.r * 3.4, y - 0.25, s.r * 6.8, 0.5);
          ctx.fillRect(s.x - 0.25, y - s.r * 3.4, 0.5, s.r * 6.8);
        }
      }

      if (!reduce) {
        nextShoot -= dt;
        if (nextShoot <= 0) {
          spawnShooter();
          nextShoot = 4200 + Math.random() * 6500;
        }
        for (let i = shooters.length - 1; i >= 0; i -= 1) {
          const m = shooters[i];
          m.life += k;
          m.x += m.vx * k;
          m.y += m.vy * k;
          const p = m.life / m.max;
          const fade = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
          const { tail } = m;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
          grad.addColorStop(0, `rgba(${m.tint}, ${0.95 * fade})`);
          grad.addColorStop(1, `rgba(${m.tint}, 0)`);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = m.width;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
          ctx.stroke();
          if (m.width > 1.3) {
            ctx.globalAlpha = fade;
            ctx.fillStyle = `rgb(${m.tint})`;
            ctx.shadowColor = `rgba(${m.tint}, 1)`;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.width * 0.9, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          if (m.life >= m.max) shooters.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('celestial:meteors', onShower);
      showerTimers.forEach(clearTimeout);
    };
  }, []);

  return <canvas ref={ref} className="sky-canvas" aria-hidden="true" />;
}
