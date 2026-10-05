import { useEffect, useRef } from 'react';

const HUES = ['255, 236, 196', '240, 221, 174', '255, 200, 220', '190, 210, 255'];

/** Golden stardust that trails the cursor and bursts on every click / tap. */
export default function Stardust() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const parts = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let last = performance.now();
    let lastX = null;
    let lastY = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const add = (x, y, vx, vy, size, life, star = false) => {
      if (parts.length > 260) parts.shift();
      parts.push({ x, y, vx, vy, size, life, max: life, star, c: HUES[(Math.random() * HUES.length) | 0], rot: Math.random() * Math.PI });
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    const sparkle = (x, y, r, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 8; i += 1) {
        const a = (i * Math.PI) / 4;
        const rad = i % 2 === 0 ? r : r * 0.28;
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    function draw(t) {
      const dt = Math.min(48, t - last) / 16.67;
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i -= 1) {
        const p = parts[i];
        p.life -= dt;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + 0.025 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += 0.04 * dt;
        const a = p.life / p.max;
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${p.c})`;
        ctx.shadowColor = `rgba(${p.c}, 0.9)`;
        ctx.shadowBlur = 8;
        if (p.star) sparkle(p.x, p.y, p.size * (0.6 + a * 0.6), p.rot);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (parts.length) raf = requestAnimationFrame(draw);
      else {
        running = false;
        ctx.clearRect(0, 0, w, h);
      }
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      if (lastX !== null) {
        const d = Math.hypot(x - lastX, y - lastY);
        const n = Math.min(3, Math.floor(d / 14));
        for (let i = 0; i < n; i += 1) {
          add(
            x + (Math.random() - 0.5) * 8,
            y + (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            0.8 + Math.random() * 1.6,
            28 + Math.random() * 26,
            Math.random() < 0.18,
          );
        }
      }
      lastX = x;
      lastY = y;
    };

    const onDown = (e) => {
      const { clientX: x, clientY: y } = e;
      const n = 22;
      for (let i = 0; i < n; i += 1) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.3;
        const s = 2 + Math.random() * 4.2;
        add(x, y, Math.cos(a) * s, Math.sin(a) * s, 1 + Math.random() * 2, 40 + Math.random() * 30, i % 3 === 0);
      }
      add(x, y, 0, 0, 9, 26, true);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} className="stardust" aria-hidden="true" />;
}
