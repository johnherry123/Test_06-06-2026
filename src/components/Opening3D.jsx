import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Heart, Sparkles } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   JOYFUL & FESTIVE 3D WEDDING CELEBRATION INTRO
   Theme: "Vườn Hoa Hạnh Phúc & Cặp Nhẫn Cưới Ánh Kim"
   - 3D Sparkling Interlocking Wedding Rings in WebGL with Diamond Glint
   - Joyful Swirling Cherry Blossom Petals & Golden Confetti Sparkles
   - Romantic Blossom Card + Confetti Fireworks Explosion on Open!
══════════════════════════════════════════════════════════════════════ */

export default function Opening3D({ onComplete }) {
  const mountRef = useRef(null);
  const cardRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ringsGroupRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  /* ── 1. Three.js 3D Interlocking Wedding Rings & Swirling Petals ── */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Vibrant Joyful Lighting
    const ambientLight = new THREE.AmbientLight(0xFFE8E8, 2.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFD700, 3.0);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xFF85A1, 2.0);
    dirLight2.position.set(-5, -3, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xFFFFFF, 4.0, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // ── 3D Golden Wedding Rings (Cặp Nhẫn Cưới Lồng Vào Nhau) ──
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    scene.add(ringsGroup);

    // Shiny Gold Material with high metalness & reflections
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 0.95,
      roughness: 0.12,
    });

    const ringRadius = 0.9;
    const tubeRadius = 0.09;
    const ringGeo = new THREE.TorusGeometry(ringRadius, tubeRadius, 24, 64);

    // Groom's Ring (Slightly larger, classic gold band)
    const groomRing = new THREE.Mesh(ringGeo, goldRingMat);
    groomRing.position.set(-0.55, 0.15, 0);
    groomRing.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    ringsGroup.add(groomRing);

    // Bride's Ring (With Sparkling Diamond Solitaire)
    const brideRing = new THREE.Mesh(ringGeo, goldRingMat);
    brideRing.position.set(0.55, -0.15, 0.2);
    brideRing.rotation.set(-Math.PI / 4, -Math.PI / 6, 0);
    ringsGroup.add(brideRing);

    // Diamond Gem on Bride's Ring
    const diamondGeo = new THREE.OctahedronGeometry(0.2, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      ior: 2.4,
      reflectivity: 0.9,
      clearcoat: 1.0,
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.position.set(0.55 + ringRadius * 0.9, -0.15 + ringRadius * 0.4, 0.2);
    ringsGroup.add(diamond);

    // ── Swirling Blossom & Gold Sparkles Vortex (600 Particles) ──
    const particleCount = 450;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColor = new Float32Array(particleCount * 3);

    const colors = [
      new THREE.Color(0xFFB7B2), // Blossom Pink
      new THREE.Color(0xFFD700), // Champagne Gold
      new THREE.Color(0xFF6B81), // Rose Coral
      new THREE.Color(0xFFE5EC), // Soft White
    ];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const c = colors[Math.floor(Math.random() * colors.length)];
      pColor[i * 3] = c.r;
      pColor[i * 3 + 1] = c.g;
      pColor[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColor, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Position rings above card
    ringsGroup.position.set(0, 1.35, 0);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth Gentle Ring Rotation
      ringsGroup.rotation.y = time * 0.45;
      ringsGroup.rotation.x = Math.sin(time * 0.6) * 0.15;
      ringsGroup.position.y = 1.35 + Math.sin(time * 1.2) * 0.08;

      // Swirl Particles
      particles.rotation.y = time * 0.08;
      particles.rotation.z = Math.sin(time * 0.05) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  /* ── 2. Joyful Confetti Cannon Fireworks Trigger ── */
  const fireConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 160 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 80,
      y: canvas.height / 2 + 50,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 1.2) * 20,
      size: Math.random() * 8 + 6,
      color: ['#FF4D6D', '#FFD700', '#FF758F', '#C5A059', '#70E000', '#FF9E00', '#FFFFFF'][Math.floor(Math.random() * 7)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.38,
      opacity: 1,
    }));

    let animId;
    const renderConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      confettiPieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(renderConfetti);
      }
    };
    renderConfetti();
  };

  /* ── 3. Joyful Open Action ── */
  const handleOpen = useCallback(() => {
    if (isOpened) return;
    setIsOpened(true);

    fireConfetti();

    // Joyful celebration chime sound
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.09);
          gain.gain.setValueAtTime(0.18, now + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.09);
          osc.stop(now + i * 0.09 + 1.8);
        });
      }
    } catch (_) {}

    const tl = gsap.timeline();

    // 1. Rings scale up and sparkle burst
    tl.to(ringsGroupRef.current.scale, {
      x: 1.4,
      y: 1.4,
      z: 1.4,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, 0);

    // 2. Card expands smoothly
    tl.to(cardRef.current, {
      scale: 1.08,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
    }, 0.5);

    // 3. Camera zoom in
    tl.to(cameraRef.current.position, {
      z: 4.0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0.2);

    // 4. Smooth dissolve to main wedding page
    tl.to(mountRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 1.2,
      onComplete: () => {
        onComplete?.();
      },
    });
  }, [isOpened, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FFF5F6',
        background: 'radial-gradient(ellipse at center, #FFF9FA 0%, #FFE8EC 60%, #FFD6DE 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
      }}
    >
      {/* Three.js 3D WebGL Rings Canvas */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Confetti Particle Canvas */}
      <canvas
        ref={confettiCanvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* Skip Button Top Right */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: '28px',
          right: '28px',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1.5px solid rgba(255, 77, 109, 0.3)',
          color: '#8B1E22',
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.82rem',
          fontWeight: 700,
          padding: '8px 18px',
          borderRadius: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(255, 77, 109, 0.12)',
          backdropFilter: 'blur(8px)',
        }}
      >
        Vào xem thiệp ✕
      </button>

      {/* ── Romantic Joyful Wedding Invitation Card ── */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'clamp(320px, 90vw, 520px)',
          marginTop: 'clamp(140px, 26vw, 180px)',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 40px) 24px',
          textAlign: 'center',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          boxShadow: '0 25px 60px -10px rgba(255, 77, 109, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Floating Joyful Floral Garland Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 77, 109, 0.1)',
            color: '#8B1E22',
            padding: '6px 18px',
            borderRadius: '20px',
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={15} color="#FF4D6D" />
          Happy Wedding · Lễ Thành Hôn
          <Sparkles size={15} color="#FF4D6D" />
        </div>

        {/* Happy Song Hỷ Symbol */}
        <div
          style={{
            fontSize: '2.4rem',
            color: '#8B1E22',
            lineHeight: 1,
            marginBottom: '8px',
            fontWeight: 700,
          }}
        >
          囍
        </div>

        {/* Couple Names - Radiant, Vibrant, Joyful */}
        <h2
          className="font-display text-gold-luxury"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            margin: '0 0 8px',
          }}
        >
          Đại Nghĩa & Thị Nhung
        </h2>

        <p
          className="font-serif"
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: '#584A40',
            margin: '0 0 16px',
          }}
        >
          Trân trọng kính mời Quý khách đến chung vui ngày hạnh phúc!
        </p>

        {/* Date & Location Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#FFF8F8',
            border: '1px solid rgba(255, 77, 109, 0.25)',
            padding: '8px 20px',
            borderRadius: '20px',
            marginBottom: '28px',
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#8B1E22',
              letterSpacing: '0.08em',
            }}
          >
            Thứ Ba · 20.10.2026 · Gem Center TP.HCM
          </span>
        </div>

        {/* Big Joyful Glowing "MỞ THIỆP CƯỚI" Button */}
        <div>
          <button
            onClick={handleOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px 40px',
              backgroundColor: '#8B1E22',
              background: 'linear-gradient(135deg, #FF4D6D 0%, #C9184A 50%, #800F2F 100%)',
              color: '#FFFFFF',
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '30px',
              border: '2px solid #FFD700',
              boxShadow: '0 10px 30px rgba(255, 77, 109, 0.45), 0 0 20px rgba(255, 215, 0, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(255, 77, 109, 0.6), 0 0 30px rgba(255, 215, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 77, 109, 0.45), 0 0 20px rgba(255, 215, 0, 0.4)';
            }}
          >
            <Heart size={20} fill="#FFFFFF" />
            MỞ THIỆP CƯỚI
            <Sparkles size={20} color="#FFD700" />
          </button>
        </div>
      </div>
    </div>
  );
}
