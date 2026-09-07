import { useState } from 'react';
import { BANK_ACCOUNTS } from '../weddingData';
import { Gift, Copy, Check, QrCode } from 'lucide-react';

function BankCard({ account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
    } catch {
      const el = document.createElement('textarea');
      el.value = account.accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="gsap-reveal"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid rgba(197, 160, 89, 0.4)',
        boxShadow: '0 12px 36px -6px rgba(50, 30, 15, 0.08)',
        padding: 'clamp(20px, 4vw, 32px) clamp(14px, 3.5vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        width: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth > 640) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 18px 45px -8px rgba(128, 29, 36, 0.14)';
        }
      }}
      onMouseLeave={(e) => {
        if (window.innerWidth > 640) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 12px 36px -6px rgba(50, 30, 15, 0.08)';
        }
      }}
    >
      {/* Role Pill */}
      <div
        style={{
          display: 'inline-block',
          padding: '4px 16px',
          borderRadius: '999px',
          background: 'rgba(128, 29, 36, 0.08)',
          color: '#801D24',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.66rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Mừng Cưới · {account.role}
      </div>

      {/* Account Holder Name */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)',
          fontWeight: 600,
          color: '#1E1612',
          marginBottom: '4px',
          wordBreak: 'break-word',
        }}
      >
        {account.name}
      </h3>

      <p
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.78rem',
          color: '#9A7836',
          fontWeight: 600,
          marginBottom: '16px',
          wordBreak: 'break-word',
        }}
      >
        {account.bank} ({account.bankShort})
      </p>

      {/* QR Code Frame with Gold Hairline */}
      <div
        style={{
          width: 'min(160px, 48vw)',
          height: 'min(160px, 48vw)',
          padding: '8px',
          borderRadius: '16px',
          backgroundColor: '#FAF6EE',
          border: '2px dashed rgba(197, 160, 89, 0.5)',
          boxShadow: '0 4px 14px rgba(50, 30, 15, 0.05)',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={account.qrUrl}
          alt={`Mã QR mừng cưới ${account.role} ${account.name}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
          onError={(e) => {
            e.currentTarget.src = account.qrFallback;
          }}
        />
      </div>

      {/* Account Number Box */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FAF7F2',
          borderRadius: '12px',
          border: '1px solid rgba(197, 160, 89, 0.25)',
          padding: '10px 12px',
          marginBottom: '14px',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.64rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#7C6E66',
            margin: '0 0 2px 0',
          }}
        >
          Số tài khoản
        </p>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(1.1rem, 3.8vw, 1.35rem)',
            fontWeight: 700,
            color: '#801D24',
            letterSpacing: '0.08em',
            margin: 0,
            wordBreak: 'break-all',
          }}
        >
          {account.accountNumber}
        </p>
        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.68rem',
            color: '#A59890',
            margin: '3px 0 0 0',
            wordBreak: 'break-word',
          }}
        >
          {account.branch}
        </p>
      </div>

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '11px 14px',
          borderRadius: '999px',
          backgroundColor: copied ? '#801D24' : 'rgba(197, 160, 89, 0.15)',
          color: copied ? '#FFFFFF' : '#801D24',
          border: copied ? '1px solid #801D24' : '1px solid rgba(197, 160, 89, 0.4)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.74rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? 'Đã sao chép số tài khoản!' : 'Sao chép số tài khoản'}
      </button>
    </div>
  );
}

export default function Gifts() {
  return (
    <section
      id="gifts"
      aria-label="Hộp mừng cưới và chúc phúc"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 80% at 50% 20%, #FFFDF9 0%, #F5EDE0 100%)',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Gift size={13} />
            Hộp Mừng Cưới
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Gửi Trao Chúc Phúc
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Sự hiện diện của bạn là món quà quý giá nhất đối với chúng mình. Nếu bạn muốn gửi lời chúc phúc từ xa, xin
            vui lòng sử dụng thông tin bên dưới:
          </p>
        </div>

        {/* ── 2 GIFTS CARDS FOR GROOM & BRIDE ── */}
        <div
          className="gifts-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: 'clamp(18px, 4vw, 36px)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {BANK_ACCOUNTS.map((acc) => (
            <BankCard key={acc.id} account={acc} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .gifts-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
