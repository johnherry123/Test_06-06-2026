/* ══════════════════════════════════════════════════════════════════════
   GIFTS 3D CARD — Holographic Bank Card with Gyroscope Physics
   Features:
   - CSS 3D perspective transforms
   - MouseMove on desktop / DeviceOrientation (Gyroscope) on mobile
   - Holographic conic-gradient shimmer that reacts to tilt
   - Spring physics (lerp) for smooth motion
   - Copy STK button: morphing animation + toast notification
   - Framer Motion for icon swap animation
══════════════════════════════════════════════════════════════════════ */
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Bank data ── */
const BANK_ACCOUNTS = [
  {
    id: 'groom',
    role: 'Chú Rể',
    name: 'NGUYỄN ĐẠI NGHĨA',
    bank: 'Vietcombank',
    bankShort: 'VCB',
    accountNumber: '1234567890',
    displayNumber: '1234 5678 90',
    branch: 'CN Tân Bình, TP.HCM',
    qrUrl: 'https://img.vietqr.io/image/VCB-1234567890-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Dai%20Nghia&accountName=NGUYEN%20DAI%20NGHIA',
    gradientFrom: '#1a0a00',
    gradientTo: '#2d1810',
    accentColor: '#C5A059',
    chipColor: '#D4AF37',
  },
  {
    id: 'bride',
    role: 'Cô Dâu',
    name: 'LÊ THỊ NHUNG',
    bank: 'Techcombank',
    bankShort: 'TCB',
    accountNumber: '0987654321',
    displayNumber: '0987 6543 21',
    branch: 'CN Quận 3, TP.HCM',
    qrUrl: 'https://img.vietqr.io/image/TCB-0987654321-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Thi%20Nhung&accountName=LE%20THI%20NHUNG',
    gradientFrom: '#0a0012',
    gradientTo: '#180820',
    accentColor: '#E5B4CC',
    chipColor: '#C0A0B8',
  },
];

/* ── Toast notification ── */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            background: 'rgba(24,17,14,0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(197,160,89,0.35)',
            borderRadius: '100px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#E5C378',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════
   HOLOGRAPHIC 3D CARD
══════════════════════════ */
function HoloCard({ account }) {
  const cardRef      = useRef(null);
  const wrapRef      = useRef(null);
  const rafRef       = useRef(null);
  const targetRot    = useRef({ rx: 0, ry: 0 });
  const currentRot   = useRef({ rx: 0, ry: 0 });
  const [hovered, setHovered]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [toast, setToast]       = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [gyroEnabled, setGyroEnabled] = useState(false);

  /* ── Gyroscope (mobile) ── */
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) return;

    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') setGyroEnabled(true);
        } catch {}
      } else {
        setGyroEnabled(true);
      }
    };

    const onOrient = (e) => {
      if (!gyroEnabled) return;
      // beta: -90 to 90 (front/back tilt), gamma: -90 to 90 (left/right)
      const beta  = Math.max(-30, Math.min(30, e.beta  || 0));
      const gamma = Math.max(-30, Math.min(30, e.gamma || 0));
      targetRot.current = {
        rx:  (beta  / 30) * 18,  // max 18deg tilt
        ry: -(gamma / 30) * 18,
      };
    };

    window.addEventListener('deviceorientation', onOrient, { passive: true });
    requestPermission();
    return () => window.removeEventListener('deviceorientation', onOrient);
  }, [gyroEnabled]);

  /* ── Mouse (desktop) ── */
  const onMouseMove = useCallback((e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width;   // 0–1
    const y    = (e.clientY - rect.top)  / rect.height;  // 0–1
    setMousePos({ x: x * 100, y: y * 100 });
    targetRot.current = {
      rx:  (0.5 - y) * 28,   // -14 to +14 deg
      ry: -(0.5 - x) * 28,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    targetRot.current = { rx: 0, ry: 0 };
    setMousePos({ x: 50, y: 50 });
    setHovered(false);
  }, []);

  /* ── Spring animation loop ── */
  useEffect(() => {
    const animate = () => {
      currentRot.current.rx += (targetRot.current.rx - currentRot.current.rx) * 0.1;
      currentRot.current.ry += (targetRot.current.ry - currentRot.current.ry) * 0.1;
      if (cardRef.current) {
        const { rx, ry } = currentRot.current;
        const intensity = Math.sqrt(rx * rx + ry * ry) / 20; // 0–1
        cardRef.current.style.setProperty('--rx', `${rx}deg`);
        cardRef.current.style.setProperty('--ry', `${ry}deg`);
        cardRef.current.style.setProperty('--o', `${Math.min(intensity * 1.5, 1)}`);
        cardRef.current.style.setProperty('--mx', `${mousePos.x}%`);
        cardRef.current.style.setProperty('--my', `${mousePos.y}%`);
        cardRef.current.style.setProperty('--posx', `${mousePos.x}%`);
        cardRef.current.style.setProperty('--posy', `${mousePos.y}%`);
        // Holo angle rotates with tilt
        const angle = (Math.atan2(ry, rx) * 180 / Math.PI) + 90;
        cardRef.current.style.setProperty('--holo-angle', `${angle}deg`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos]);

  /* ── Copy handler ── */
  const handleCopy = useCallback(async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(account.accountNumber);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = account.accountNumber;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setToast(true);
    setTimeout(() => { setCopied(false); setToast(false); }, 2800);
  }, [account.accountNumber, copied]);

  return (
    <>
      {/* Card wrapper — perspective */}
      <div
        ref={wrapRef}
        style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
      >
        {/* 3D Card */}
        <div
          ref={cardRef}
          className="holo-card"
          style={{
            '--rx': '0deg',
            '--ry': '0deg',
            '--o': '0',
            '--mx': '50%',
            '--my': '50%',
            '--posx': '50%',
            '--posy': '50%',
            '--holo-angle': '0deg',
            width: '100%',
            maxWidth: '420px',
            aspectRatio: '1.586 / 1',
            margin: '0 auto',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: hovered
              ? '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(197,160,89,0.25)'
              : '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,160,89,0.2)',
            transition: 'box-shadow 0.4s ease',
            cursor: 'none',
          }}
        >
          {/* Card base gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(197,160,89,0.18) 0%, transparent 60%),
              linear-gradient(135deg, ${account.gradientFrom} 0%, ${account.gradientTo} 100%)
            `,
            borderRadius: '16px',
          }} />

          {/* Holographic spectrum layer */}
          <div className="holo-spectrum" style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
          }} />

          {/* Holographic shine lines */}
          <div className="holo-shine" style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
          }} />

          {/* Holographic glare */}
          <div className="holo-glare" style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
          }} />

          {/* Border highlight */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)',
            pointerEvents: 'none',
          }} />

          {/* Card content */}
          <div style={{
            position: 'relative', zIndex: 5,
            padding: '24px 28px',
            height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {/* TOP ROW: Role label + Bank */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem', letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '4px',
                }}>Mừng Cưới · {account.role}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  color: account.accentColor,
                  letterSpacing: '0.05em',
                }}>囍 Đại Nghĩa &amp; Thị Nhung</div>
              </div>

              {/* Chip */}
              <div style={{
                width: '42px', height: '32px',
                background: `linear-gradient(135deg, ${account.chipColor}55 0%, ${account.chipColor} 50%, ${account.chipColor}88 100%)`,
                borderRadius: '5px',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px',
                padding: '4px',
              }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '1px',
                  }} />
                ))}
              </div>
            </div>

            {/* Account Number */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.55rem', letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '6px',
              }}>Số Tài Khoản</div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(1.2rem, 3.5vw, 1.65rem)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#FFF',
                textShadow: `0 0 30px ${account.accentColor}88`,
              }}>
                {account.displayNumber}
              </div>
            </div>

            {/* BOTTOM ROW: Name + Bank */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.55rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '3px',
                }}>Chủ Tài Khoản</div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.82rem', fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.92)',
                }}>{account.name}</div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.58rem',
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: '2px',
                }}>{account.branch}</div>
              </div>

              {/* Bank logo placeholder */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem', fontWeight: 800,
                letterSpacing: '0.05em',
                color: account.accentColor,
                textShadow: `0 0 20px ${account.accentColor}66`,
                opacity: 0.85,
              }}>{account.bankShort}</div>
            </div>
          </div>
        </div>

        {/* QR Code (below card) */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '12px',
            background: '#FFFDF9',
            borderRadius: '8px',
            border: '1px solid rgba(197,160,89,0.3)',
            boxShadow: '0 8px 24px rgba(35,27,21,0.08)',
          }}>
            <img
              src={account.qrUrl}
              alt={`QR ${account.name}`}
              width={140} height={140}
              style={{ display: 'block', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginTop: '10px',
          }}>Quét mã VietQR</p>
        </div>

        {/* Copy Button — morphing */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <motion.button
            layout
            onClick={handleCopy}
            data-cursor-hover
            style={{
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              padding: copied ? '12px' : '12px 32px',
              width: copied ? '48px' : 'auto',
              height: '48px',
              borderRadius: copied ? '50%' : '4px',
              background: copied
                ? 'linear-gradient(135deg, #1a6e2e, #0e4a1f)'
                : 'linear-gradient(135deg, #18110E, #2d1810)',
              border: `1px solid ${copied ? 'rgba(74,222,128,0.4)' : 'rgba(197,160,89,0.35)'}`,
              color: copied ? '#4ade80' : 'rgba(197,160,89,0.9)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'none',
              overflow: 'hidden',
              transition: 'background 0.4s, border 0.4s',
            }}
            animate={{ scale: copied ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check"
                  initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }} transition={{ duration: 0.25 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.span>
              ) : (
                <motion.span key="copy"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy STK · {account.bank}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Toast */}
      <Toast message={`Đã sao chép STK · ${account.bankShort}`} visible={toast} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   GIFTS SECTION
══════════════════════════════════════════════════════════════════════ */
export default function Gifts() {
  return (
    <section
      id="gifts"
      style={{
        padding: 'clamp(80px, 12vw, 130px) 24px',
        backgroundColor: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.08) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className="eyebrow-luxury">Hộp Mừng Cưới</div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            color: '#231B15', fontWeight: 700, margin: '0 0 14px',
          }}>
            Gửi Trao <span style={{ color: '#8B1E22' }}>Chúc Phúc</span>
          </h2>
          <div className="divider-luxury"><span style={{ color: '#C5A059' }}>✦</span></div>
          <p className="font-serif" style={{
            fontSize: '1.15rem', fontStyle: 'italic', color: '#584A40',
            maxWidth: '520px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Sự hiện diện của bạn là món quà vô giá nhất.<br />
            Nghiêng điện thoại để cảm nhận tấm thiệp đặc biệt này.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>
          {BANK_ACCOUNTS.map((acc) => (
            <HoloCard key={acc.id} account={acc} />
          ))}
        </div>
      </div>
    </section>
  );
}
