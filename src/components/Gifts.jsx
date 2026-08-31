/* ══════════════════════════════════════════════════════════════════════
   GIFTS / MỪNG CƯỚI — Vietnamese Editorial Wedding
   Removed: holographic 3D card, gyroscope tilt, conic-gradient shimmer,
            fintech card UI, framer-motion dependency, gradient backgrounds.
   Design: Warm Vietnamese wedding aesthetic — cream paper, thin lines,
           champagne gold, deep burgundy. QR code centered. Clean transfer info.
   Preserved: QR functionality, copy-to-clipboard, toast notification.
══════════════════════════════════════════════════════════════════════ */
import { useState, useRef } from 'react';

const BANK_ACCOUNTS = [
  {
    id:            'groom',
    role:          'Chú Rể',
    name:          'NGUYỄN ĐẠI NGHĨA',
    bank:          'Vietcombank',
    accountNumber: '1234567890',
    branch:        'CN Tân Bình, TP.HCM',
    qrUrl:         'https://img.vietqr.io/image/VCB-1234567890-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Dai%20Nghia&accountName=NGUYEN%20DAI%20NGHIA',
  },
  {
    id:            'bride',
    role:          'Cô Dâu',
    name:          'LÊ THỊ NHUNG',
    bank:          'Techcombank',
    accountNumber: '0987654321',
    branch:        'CN Quận 3, TP.HCM',
    qrUrl:         'https://img.vietqr.io/image/TCB-0987654321-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Thi%20Nhung&accountName=LE%20THI%20NHUNG',
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback for older browsers */
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Sao chép số tài khoản"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 14px',
        background: 'transparent',
        border: `1px solid ${copied ? '#8B1E22' : 'rgba(35,27,21,0.2)'}`,
        borderRadius: '2px',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: copied ? '#8B1E22' : '#756B63',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = '#8B1E22'; e.currentTarget.style.color = '#8B1E22'; } }}
      onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(35,27,21,0.2)'; e.currentTarget.style.color = '#756B63'; } }}
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="2 6 5 9 10 3" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="8" rx="1"/>
          <path d="M3 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1"/>
        </svg>
      )}
      {copied ? 'Đã sao chép' : 'Sao chép'}
    </button>
  );
}

function AccountCard({ account }) {
  return (
    <div style={{
      padding: 'clamp(28px, 4vw, 40px)',
      backgroundColor: '#FDFBF7',
      border: '1px solid rgba(35,27,21,0.1)',
    }}>
      {/* Role label */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#8B1E22',
        marginBottom: '20px',
      }}>
        {account.role}
      </p>

      {/* QR code */}
      <div style={{
        margin: '0 auto 24px',
        maxWidth: '160px',
        aspectRatio: '1',
        overflow: 'hidden',
        border: '1px solid rgba(35,27,21,0.08)',
        padding: '8px',
        backgroundColor: '#FDFBF7',
      }}>
        <img
          src={account.qrUrl}
          alt={`QR chuyển khoản cho ${account.name}`}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Bank info */}
      <div style={{
        borderTop: '1px solid rgba(35,27,21,0.08)',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {/* Bank */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 500,
            color: '#756B63',
            letterSpacing: '0.04em',
          }}>Ngân hàng</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.95rem',
            fontWeight: 500,
            color: '#231B15',
          }}>
            {account.bank}
          </span>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 500,
            color: '#756B63',
            letterSpacing: '0.04em',
          }}>Chủ tài khoản</span>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#231B15',
          }}>
            {account.name}
          </span>
        </div>

        {/* Account number + copy */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <span style={{
              display: 'block',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              color: '#756B63',
              letterSpacing: '0.04em',
              marginBottom: '2px',
            }}>Số tài khoản</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.15rem',
              fontWeight: 500,
              color: '#231B15',
              letterSpacing: '0.06em',
            }}>
              {account.accountNumber}
            </span>
          </div>
          <CopyButton text={account.accountNumber} />
        </div>

        {/* Branch */}
        <div style={{ marginTop: '2px' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.78rem',
            color: '#756B63',
          }}>
            {account.branch}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gifts() {
  return (
    <section
      id="gifts"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Mừng Cưới
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Chúc Phúc &amp; Tình Cảm
          </h2>

          {/* Thin rule */}
          <div className="gsap-line" style={{
            width: '100%', height: '1px',
            backgroundColor: 'rgba(184,149,85,0.4)',
            marginBottom: '24px',
          }} />

          {/* Editorial message */}
          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#4A3F38',
              lineHeight: 1.85,
              maxWidth: '560px',
            }}
          >
            "Thay cho những món quà,<br />
            chúng mình xin nhận những lời chúc<br />
            yêu thương từ bạn."
          </p>
        </div>

        {/* Account cards */}
        <div
          className="gsap-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {BANK_ACCOUNTS.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        {/* Note */}
        <p
          className="gsap-reveal"
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.8rem',
            color: '#756B63',
            lineHeight: 1.6,
            textAlign: 'center',
            marginTop: '32px',
            fontStyle: 'italic',
          }}
        >
          Sự hiện diện của bạn trong ngày trọng đại là món quà quý giá nhất với chúng mình.
        </p>

      </div>
    </section>
  );
}
