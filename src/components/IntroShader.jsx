/* ══════════════════════════════════════════════════════════════════════
   INTRO CINEMATIC — Ultra-Luxury Wedding Screen v3
   FIXES:
   - Tên hiển thị rõ với text-shadow mạnh + solid color fallback
   - Xóa letterbox bars (gây ra viền đen 2 bên xấu)
   - Overlay tối hơn để contrast đủ đọc
   - Vignette mạnh hơn từ trên/dưới và cạnh
   - Ảnh được tối đi trong shader (exposure -0.4)
   - Glass blur card phía sau text
══════════════════════════════════════════════════════════════════════ */
import { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── WebGL detector ── */
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

/* ── Vertex Shader ── */
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* ── Fragment Shader ── */
const fragmentShader = /* glsl */`
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2      uMouse;
  uniform float     uTime;
  uniform float     uStrength;
  uniform float     uDissipate;
  uniform vec2      uResolution;
  varying vec2      vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  vec2 hash2(vec2 p) {
    return fract(sin(mat2(127.1,311.7,269.5,183.3) * p) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;

    // ── Ripple distortion ──
    vec2 delta = uv - uMouse;
    delta.x   *= uResolution.x / uResolution.y;
    float dist = length(delta);

    float wave1 = sin(dist * 30.0 - uTime * 3.5) / (dist * 26.0 + 1.0);
    float wave2 = sin(dist * 15.0 - uTime * 2.2) / (dist * 13.0 + 1.5);
    float ripple = (wave1 * 0.6 + wave2 * 0.4) * uStrength;
    float n = noise(uv * 4.5 + uTime * 0.1) * 0.004;
    vec2 distortedUV = uv + normalize(delta + 0.001) * ripple * 0.026 + n;

    // ── Dissipation ──
    if (uDissipate > 0.0) {
      float cellSize = 0.035 + uDissipate * 0.07;
      vec2 cell = floor(uv / cellSize) * cellSize;
      vec2 h    = hash2(cell * 99.7);
      float delay    = h.x * 0.55;
      float progress = clamp((uDissipate - delay) / (1.0 - delay + 0.001), 0.0, 1.0);
      float ease     = progress * progress * (3.0 - 2.0 * progress);
      vec2 scatter   = (h - 0.5) * 2.0 * ease * 0.55;
      scatter       += vec2(sin(h.x * 6.28) * ease * 0.15, -ease * 0.35);
      distortedUV   += scatter;
      float alpha    = 1.0 - ease;
      vec4 color     = texture2D(uTexture, distortedUV);
      float shimmer  = hash(cell + uTime * 0.08);
      color.rgb     += vec3(1.0, 0.88, 0.35) * shimmer * ease * 1.0;
      gl_FragColor   = vec4(color.rgb, color.a * alpha);
      return;
    }

    // ── Sample + darken exposure + cinematic grade ──
    vec4 raw = texture2D(uTexture, distortedUV);
    vec3 col = raw.rgb;

    // Reduce overall exposure (darken bright wedding photo)
    col *= 0.62;

    // Warm-shadow / cool-highlight cinematic grade
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(col * vec3(0.82, 0.80, 0.92),   // cool midtones
              col * vec3(1.06, 0.98, 0.84),   // warm highlights
              luma);

    // Saturation boost
    float grey = dot(col, vec3(0.3, 0.59, 0.11));
    col = mix(vec3(grey), col, 1.22);

    // Radial vignette (strong, neutral dark)
    vec2 vig = uv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vig * 0.65, vig * 0.65);
    vignette = pow(max(vignette, 0.0), 0.55);
    col *= (0.20 + 0.80 * vignette);

    gl_FragColor = vec4(col, raw.a);
  }
`;

/* ── Shader Plane ── */
function ShaderPlane({ textureUrl, mouse, dissipate, isActive }) {
  const meshRef  = useRef();
  const matRef   = useRef();
  const { size } = useThree();
  const texture  = useTexture(textureUrl);
  const strengthRef = useRef(0);
  const targetStr   = useRef(0);

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }, [texture]);

  useFrame(({ clock }) => {
    if (!matRef.current || !isActive) return;
    const t = clock.getElapsedTime();
    strengthRef.current += (targetStr.current - strengthRef.current) * 0.07;
    matRef.current.uniforms.uTime.value       = t;
    matRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    matRef.current.uniforms.uStrength.value   = strengthRef.current;
    matRef.current.uniforms.uDissipate.value  = dissipate.current;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  useEffect(() => {
    const onMove = () => { targetStr.current = 1.0; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    const timer = setInterval(() => {
      if (targetStr.current > 0.12) targetStr.current *= 0.96;
    }, 16);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      clearInterval(timer);
    };
  }, []);

  const uniforms = useRef({
    uTexture:    { value: texture },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uTime:       { value: 0 },
    uStrength:   { value: 0 },
    uDissipate:  { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  );
}

/* ── Golden Dust Particles ── */
function GoldenDustCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;

    const count = Math.min(Math.floor(W * H / 7000), 200);
    const particles = Array.from({ length: count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 2.0 + 0.5,
      dx:    (Math.random() - 0.5) * 0.22,
      dy:    -(Math.random() * 0.5 + 0.1),
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.01,
    }));

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      for (const p of particles) {
        p.x += p.dx + Math.sin(t * 0.5 + p.pulse) * 0.2;
        p.y += p.dy;
        p.pulse += p.speed;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.pulse * 2));
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0,   `rgba(255,228,130,${a})`);
        grd.addColorStop(0.4, `rgba(197,160,89,${a * 0.5})`);
        grd.addColorStop(1,   'rgba(197,160,89,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,200,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, zIndex: 5,
      pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.9,
    }} />
  );
}

/* ── Rose Petals ── */
const PETAL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32"><ellipse cx="12" cy="16" rx="7" ry="12" fill="rgba(255,182,193,0.8)" transform="rotate(-8 12 16)"/><ellipse cx="12" cy="16" rx="4" ry="8" fill="rgba(255,200,210,0.4)" transform="rotate(-8 12 16)"/></svg>`;
const PETAL_URL = `data:image/svg+xml;base64,${btoa(PETAL_SVG)}`;

function RosePetals() {
  const [petals] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:  Math.random() * 105 - 2,
      size:  Math.random() * 18 + 10,
      delay: Math.random() * 16,
      dur:   Math.random() * 10 + 12,
      swing: Math.random() * 90 - 45,
      rotate: Math.random() * 360,
      rotateDelta: Math.random() * 400 - 200,
    }))
  );
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', overflow: 'hidden' }}>
      {petals.map(p => (
        <img key={p.id} src={PETAL_URL} alt="" style={{
          position: 'absolute', top: '-50px', left: `${p.left}%`,
          width: `${p.size}px`, height: `${p.size * 1.4}px`,
          opacity: 0,
          animation: `petalFall ${p.dur}s ${p.delay}s ease-in infinite`,
          '--swing': `${p.swing}px`,
          '--rotate': `${p.rotate}deg`,
          '--rotateDelta': `${p.rotateDelta}deg`,
        }} />
      ))}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateX(0) translateY(-50px) rotate(var(--rotate)); opacity: 0; }
          6%   { opacity: 0.75; }
          88%  { opacity: 0.45; }
          100% { transform: translateX(var(--swing)) translateY(110vh) rotate(calc(var(--rotate) + var(--rotateDelta))); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Rotating Ornament ── */
function Ornament({ visible }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scaleX(1)' : 'scaleX(0.3)',
      transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s',
      margin: '10px 0',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #E5C378)' }} />
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ animation: 'spin-slow 20s linear infinite', flexShrink: 0 }}>
        <g transform="translate(16,16)" fill="none">
          <polygon points="0,-13 4.5,-4.5 13,0 4.5,4.5 0,13 -4.5,4.5 -13,0 -4.5,-4.5"
            stroke="#E5C378" strokeWidth="0.9" opacity="0.9"/>
          <polygon points="0,-7.5 2.8,-2.8 7.5,0 2.8,2.8 0,7.5 -2.8,2.8 -7.5,0 -2.8,-2.8"
            stroke="#C5A059" strokeWidth="0.6" opacity="0.7"/>
          <circle r="2.5" fill="#F3D389" opacity="0.95"/>
          {[0,-13,0,13,-13,0,13,0].reduce((acc, v, i, arr) => {
            if (i % 2 === 0) acc.push({ x: arr[i], y: arr[i+1] });
            return acc;
          }, []).map((pt, j) => (
            <circle key={j} cx={pt.x} cy={pt.y} r="1.3" fill="#F3D389" opacity="0.8"/>
          ))}
        </g>
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #E5C378)' }} />
    </div>
  );
}

/* ── Character reveal name ── */
function AnimatedName({ text, delay = 0, size }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ position: 'relative', textAlign: 'center', lineHeight: 1 }}>
      {/* Glow backdrop — always renders so layout is stable */}
      <div style={{
        position: 'absolute',
        inset: '-20px -40px',
        background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.22) 0%, transparent 70%)',
        filter: 'blur(18px)',
        opacity: show ? 1 : 0,
        transition: `opacity 1s ${delay / 1000 + 0.5}s ease`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <h1 style={{
        position: 'relative', zIndex: 1,
        fontFamily: "'Great Vibes', 'Dancing Script', cursive",
        fontSize: size || 'clamp(3rem, 8.5vw, 6.8rem)',
        lineHeight: 1.05,
        margin: 0, padding: 0,
        color: '#F3D389',
        textShadow: show
          ? '0 0 40px rgba(243,211,137,0.9), 0 0 80px rgba(197,160,89,0.6), 0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)'
          : '0 2px 8px rgba(0,0,0,0.9)',
        transition: `text-shadow 1.5s ${delay / 1000 + 0.4}s ease`,
        whiteSpace: 'nowrap',
      }}>
        {text.split('').map((ch, i) => (
          <span key={i} style={{
            display: 'inline-block',
            opacity:   show ? 1 : 0,
            transform: show ? 'translateY(0) rotateY(0deg)' : 'translateY(22px) rotateY(15deg)',
            transition: `opacity 0.65s ${delay / 1000 + i * 0.055}s ease,
                         transform 0.65s ${delay / 1000 + i * 0.055}s cubic-bezier(0.16,1,0.3,1)`,
          }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h1>
    </div>
  );
}

/* ── Magnetic CTA Button ── */
function MagneticButton({ onClick, children, visible }) {
  const btnRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hover, setHover]   = useState(false);

  const onMove = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    posRef.current = dist < 130
      ? { x: dx * (1 - dist / 130) * 0.38, y: dy * (1 - dist / 130) * 0.38 }
      : { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const tick = () => {
      setOffset(prev => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.15,
        y: prev.y + (posRef.current.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove); };
  }, [onMove]);

  return (
    <div style={{
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: 'opacity 1s 2s ease, transform 1s 2s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Pulse rings on hover */}
      {hover && [0, 0.45].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          inset: `${-10 - i * 10}px`,
          borderRadius: '4px',
          border: `1px solid rgba(197,160,89,${0.5 - i * 0.2})`,
          animation: `pulse-ring 1.5s ${d}s ease-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}
      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); posRef.current = { x: 0, y: 0 }; }}
        data-cursor-hover
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          willChange: 'transform',
          position: 'relative',
          padding: '18px 60px',
          background: hover
            ? 'linear-gradient(135deg, rgba(197,160,89,0.2) 0%, rgba(197,160,89,0.08) 100%)'
            : 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${hover ? 'rgba(243,211,137,0.9)' : 'rgba(197,160,89,0.65)'}`,
          borderRadius: '3px',
          cursor: 'none',
          overflow: 'hidden',
          boxShadow: hover
            ? '0 0 30px rgba(197,160,89,0.4), inset 0 0 20px rgba(197,160,89,0.08)'
            : '0 0 12px rgba(197,160,89,0.15)',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Shimmer sweep */}
        <span style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 35%, rgba(243,211,137,0.28) 50%, transparent 65%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.5s infinite',
        }} />
        <span style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          fontWeight: 500,
          fontStyle: 'italic',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: hover ? '#F3D389' : '#D4AF62',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          transition: 'color 0.3s ease',
        }}>
          {children}
        </span>
      </button>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.9; }
          100% { transform: scale(1.5);  opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Film Grain ── */
function FilmGrain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 300, H = 300;
    canvas.width = W; canvas.height = H;
    let raf;
    const draw = () => {
      const img = ctx.createImageData(W, H);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() - 0.5) * 50;
        img.data[i] = img.data[i+1] = img.data[i+2] = 128 + v;
        img.data[i+3] = 16;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      zIndex: 7, pointerEvents: 'none',
      mixBlendMode: 'overlay', opacity: 0.35,
      imageRendering: 'pixelated',
    }} />
  );
}

/* ── Static Fallback ── */
function StaticFallback({ bgUrl, onEnter }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: `url(${bgUrl}) center/cover no-repeat`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', letterSpacing: '0.45em',
          textTransform: 'uppercase', color: 'rgba(197,160,89,0.8)', marginBottom: '18px' }}>
          Lễ Thành Hôn · 20.10.2026</p>
        <h1 style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive",
          fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#F3D389', marginBottom: '40px',
          textShadow: '0 0 40px rgba(197,160,89,0.8)', lineHeight: 1.1 }}>
          Đại Nghĩa &amp; Thị Nhung</h1>
        <button onClick={onEnter} className="btn-gold-outline">Mở Thiệp Cưới</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function IntroShader({ onComplete }) {
  const mouse        = useRef({ x: 0.5, y: 0.5 });
  const dissipate    = useRef(0);
  const [phase, setPhase]             = useState('idle');
  const [webglOk]                     = useState(() => hasWebGL());
  const containerRef                  = useRef(null);
  const [isVisible, setIsVisible]     = useState(true);
  const [ytReady, setYtReady]         = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const ytRef    = useRef(null);
  const ytDivRef = useRef(null);

  const BG_URL = `${import.meta.env.BASE_URL}wedding-bg.jpg`;

  /* Text animation trigger after short delay */
  useEffect(() => {
    const t = setTimeout(() => setTextAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      mouse.current.x = t.clientX / window.innerWidth;
      mouse.current.y = 1 - t.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  /* Visibility observer */
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), { threshold: 0 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  /* YouTube */
  useEffect(() => {
    const load = () => new Promise(res => {
      if (window.YT?.Player) { res(window.YT); return; }
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
      window.onYouTubeIframeAPIReady = () => res(window.YT);
    });
    load().then(YT => {
      if (!ytDivRef.current) return;
      ytRef.current = new YT.Player(ytDivRef.current, {
        videoId: 'IOe0tNoUGv8',
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: 'IOe0tNoUGv8', rel: 0 },
        events: { onReady: () => setYtReady(true) },
      });
    });
  }, []);

  /* Enter */
  const handleEnter = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('dissolving');
    if (ytRef.current && ytReady) { ytRef.current.setVolume(55); ytRef.current.playVideo(); }
    let start = null;
    const duration = 2400;
    const anim = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      dissipate.current = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
      if (p < 1) requestAnimationFrame(anim);
      else { dissipate.current = 1; setTimeout(() => { setPhase('done'); onComplete?.(); }, 500); }
    };
    requestAnimationFrame(anim);
  }, [phase, ytReady, onComplete]);

  if (phase === 'done') return null;
  if (!webglOk) return <StaticFallback bgUrl={BG_URL} onEnter={onComplete} />;

  const dissolving = phase === 'dissolving';

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080810', overflow: 'hidden',
    }}>
      {/* YouTube hidden */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
        <div ref={ytDivRef} />
      </div>

      {/* ── WebGL ── */}
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <Suspense fallback={null}>
          <ShaderPlane
            textureUrl={BG_URL}
            mouse={mouse}
            dissipate={dissipate}
            isActive={isVisible && phase !== 'done'}
          />
        </Suspense>
      </Canvas>

      {/* ── Golden dust ── */}
      <GoldenDustCanvas />
      {/* ── Rose petals ── */}
      <RosePetals />
      {/* ── Film grain ── */}
      <FilmGrain />

      {/* ── CSS Overlay — dark gradient layers ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(5,5,18,0.78) 100%),
          linear-gradient(to bottom,
            rgba(5,5,18,0.75) 0%,
            rgba(5,5,18,0.25) 18%,
            rgba(5,5,18,0.0)  40%,
            rgba(5,5,18,0.0)  60%,
            rgba(5,5,18,0.30) 82%,
            rgba(5,5,18,0.80) 100%
          )
        `,
      }} />

      {/* ── TOP bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        opacity: textAnimate ? 1 : 0,
        transform: textAnimate ? 'translateY(0)' : 'translateY(-16px)',
        transition: 'all 1s 0.2s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.8) 30%, #F3D389 50%, rgba(197,160,89,0.8) 70%, transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '12px 32px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.5))' }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem',
            letterSpacing: '0.58em', textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.85)',
            textShadow: '0 1px 6px rgba(0,0,0,0.8)',
          }}>Lễ Thành Hôn · 20.10.2026</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(197,160,89,0.5))' }} />
        </div>
      </div>

      {/* ── CENTER CONTENT ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 10,
        pointerEvents: dissolving ? 'none' : 'auto',
        opacity: dissolving ? 0 : 1,
        transform: dissolving ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        padding: '0 20px',
        gap: '0',
      }}>
        {/* Frosted glass backdrop for text */}
        <div style={{
          position: 'absolute',
          width: 'min(760px, 96vw)',
          height: 'min(560px, 88vh)',
          background: 'radial-gradient(ellipse at center, rgba(5,5,18,0.50) 0%, rgba(5,5,18,0.25) 100%)',
          backdropFilter: 'blur(1px)',
          borderRadius: '2px',
          border: '1px solid rgba(197,160,89,0.10)',
          boxShadow: '0 0 100px rgba(5,5,18,0.55), inset 0 0 60px rgba(5,5,18,0.15)',
          opacity: textAnimate ? 1 : 0,
          transition: 'opacity 1.5s 0.1s ease',
        }} />

        {/* Pre-title */}
        <p style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.8rem, 1.6vw, 1rem)',
          fontStyle: 'italic', letterSpacing: '0.3em',
          color: 'rgba(229,195,120,0.85)',
          textShadow: '0 1px 8px rgba(0,0,0,0.9)',
          marginBottom: '14px',
          opacity: textAnimate ? 1 : 0,
          transform: textAnimate ? 'translateY(0)' : 'translateY(14px)',
          transition: 'all 1s 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Trân trọng kính mời
        </p>

        {/* Name 1 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedName text="Đại Nghĩa" delay={500} />
        </div>

        {/* Ornament */}
        <div style={{ position: 'relative', zIndex: 1, width: 'min(300px, 80vw)' }}>
          <Ornament visible={textAnimate} />
        </div>

        {/* Name 2 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedName text="Thị Nhung" delay={950} />
        </div>

        {/* Date */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', gap: '14px',
          marginTop: '20px', marginBottom: '28px',
          opacity: textAnimate ? 1 : 0,
          transform: textAnimate ? 'translateY(0)' : 'translateY(14px)',
          transition: 'all 1s 1.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ width: '45px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.7))' }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '0.68rem',
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.75)',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}>20 · 10 · 2026</span>
          <div style={{ width: '45px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(197,160,89,0.7))' }} />
        </div>

        {/* CTA */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <MagneticButton onClick={handleEnter} visible={textAnimate}>
            Mở Thiệp Cưới
          </MagneticButton>
        </div>

        {/* Hint */}
        <p style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Montserrat', sans-serif", fontSize: '0.58rem',
          letterSpacing: '0.38em', textTransform: 'uppercase',
          color: 'rgba(197,160,89,0.4)', marginTop: '20px',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          opacity: textAnimate ? 1 : 0,
          transition: 'opacity 1.5s 2.4s ease',
        }}>
          Di chuyển chuột để cảm nhận
        </p>
      </div>

      {/* ── BOTTOM bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        opacity: textAnimate ? 1 : 0,
        transform: textAnimate ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 1s 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '12px 32px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.4))' }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '0.58rem',
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.55)',
            textShadow: '0 1px 6px rgba(0,0,0,0.8)',
          }}>Gem Center · TP.HCM</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(197,160,89,0.4))' }} />
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.7) 30%, #F3D389 50%, rgba(197,160,89,0.7) 70%, transparent)' }} />
      </div>

      {/* ── Corner ornaments ── */}
      {[
        { top: '16px', left: '16px',   borderStyle: { borderTop: '1px solid rgba(197,160,89,0.6)', borderLeft: '1px solid rgba(197,160,89,0.6)' } },
        { top: '16px', right: '16px',  borderStyle: { borderTop: '1px solid rgba(197,160,89,0.6)', borderRight: '1px solid rgba(197,160,89,0.6)' } },
        { bottom: '16px', left: '16px',  borderStyle: { borderBottom: '1px solid rgba(197,160,89,0.6)', borderLeft: '1px solid rgba(197,160,89,0.6)' } },
        { bottom: '16px', right: '16px', borderStyle: { borderBottom: '1px solid rgba(197,160,89,0.6)', borderRight: '1px solid rgba(197,160,89,0.6)' } },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', zIndex: 10, width: '26px', height: '26px',
          top: c.top, left: c.left, right: c.right, bottom: c.bottom,
          ...c.borderStyle, pointerEvents: 'none',
          opacity: textAnimate ? 1 : 0,
          transition: `opacity 1s ${0.4 + i * 0.1}s ease`,
        }} />
      ))}

      <style>{`
        @media (pointer: coarse) {
          [data-cursor-hover] { cursor: pointer !important; }
        }
      `}</style>
    </div>
  );
}
