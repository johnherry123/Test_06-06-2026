import { useState } from 'react';
import { BANK_ACCOUNTS, COUPLE } from '../weddingData';
import { Gift, Copy, Check, QrCode, ChevronDown, ChevronUp, Heart } from 'lucide-react';

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
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid rgba(197, 160, 89, 0.4)',
        boxShadow: '0 12px 36px -6px rgba(50, 30, 15, 0.08)',
        padding: 'clamp(20px, 4vw, 28px) clamp(14px, 3.5vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
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
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        Mừng Cưới · {account.role}
      </div>

      {/* Account Holder Name */}
      <h4
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)',
          fontWeight: 600,
          color: '#1E1612',
          margin: '0 0 4px 0',
        }}
      >
        {account.name}
      </h4>

      <p
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.78rem',
          color: '#9A7836',
          fontWeight: 600,
          margin: '0 0 14px 0',
        }}
      >
        {account.bank} ({account.bankShort})
      </p>

      {/* QR Code Container */}
      <div
        style={{
          position: 'relative',
          padding: '10px',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(197, 160, 89, 0.35)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
          marginBottom: '16px',
        }}
      >
        <img
          src={account.qrCode}
          alt={`Mã QR mừng cưới ${account.role} - ${account.name}`}
          style={{
            width: 'clamp(150px, 35vw, 180px)',
            height: 'clamp(150px, 35vw, 180px)',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '10px',
          }}
        />
      </div>

      {/* Account number badge */}
      <div
        style={{
          backgroundColor: '#F7F3EB',
          border: '1px dashed rgba(197, 160, 89, 0.6)',
          borderRadius: '10px',
          padding: '8px 16px',
          marginBottom: '14px',
          width: '100%',
          maxWidth: '240px',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.66rem',
            color: '#7D6A5D',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '2px',
          }}
        >
          Số tài khoản
        </span>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#801D24',
          }}
        >
          {account.accountNumber}
        </span>
      </div>

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Sao chép số tài khoản của ${account.name}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '9px 18px',
          borderRadius: '999px',
          backgroundColor: copied ? '#801D24' : '#F5ECE0',
          color: copied ? '#FFFDF9' : '#801D24',
          border: '1px solid rgba(197, 160, 89, 0.5)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.74rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Đã sao chép!' : 'Sao chép STK'}
      </button>
    </div>
  );
}

export default function Gifts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="gifts"
      aria-label="Hộp mừng cưới và gửi chúc phúc từ xa"
      style={{
        backgroundColor: '#F8F4EC',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5ECE0 100%)',
        padding: 'clamp(40px, 6vw, 70px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Compact luxury card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 16px 40px -10px rgba(50, 30, 15, 0.08)',
            padding: 'clamp(24px, 5vw, 36px) clamp(18px, 4vw, 32px)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
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
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Gift size={13} />
            Hộp Mừng Cưới
          </div>

          <h3
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.0rem, 5vw, 3.4rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
            }}
          >
            Gửi Trao Chúc Phúc
          </h3>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0rem, 2.2vw, 1.2rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '520px',
              margin: '0 auto 20px auto',
              lineHeight: 1.6,
            }}
          >
            Sự hiện diện của Quý khách là món quà quý giá nhất. Nếu Quý khách muốn gửi lời chúc phúc từ xa qua món quà mừng nhỏ, xin vui lòng nhấn mở thông tin bên dưới:
          </p>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 28px',
              borderRadius: '999px',
              background: isOpen
                ? 'rgba(128, 29, 36, 0.1)'
                : 'linear-gradient(135deg, #801D24 0%, #A62B34 100%)',
              color: isOpen ? '#801D24' : '#FFFDF9',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: isOpen
                ? 'none'
                : '0 8px 24px rgba(128, 29, 36, 0.25)',
              transition: 'all 0.3s ease',
            }}
          >
            <QrCode size={16} />
            {isOpen ? 'Thu gọn thông tin mừng cưới' : 'Mở Mã QR & Tài Khoản Mừng Cưới'}
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Collapsible Content */}
          {isOpen && (
            <div
              style={{
                marginTop: '32px',
                paddingTop: '28px',
                borderTop: '1px dashed rgba(197, 160, 89, 0.4)',
                animation: 'fadeIn 0.35s ease',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
                  gap: '20px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {BANK_ACCOUNTS.map((acc) => (
                  <BankCard key={acc.id} account={acc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
