import React, { useState } from 'react';
import { Copy, Check, Gift } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   WEDDING GIFT & QR PAY (HỘP MỪNG CƯỚI)
   100% Native Vietnamese Typography & 1-Click Copy Number
══════════════════════════════════════════════════════════════════════ */

const BANK_ACCOUNTS = [
  {
    id: 'groom',
    role: 'Mừng Chú Rể',
    name: 'NGUYỄN ĐẠI NGHĨA',
    bank: 'Vietcombank (VCB)',
    accountNumber: '1234567890',
    displayNumber: '1234 5678 90',
    branch: 'Chi nhánh Tân Bình, TP.HCM',
    qrUrl: 'https://img.vietqr.io/image/VCB-1234567890-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Dai%20Nghia&accountName=NGUYEN%20DAI%20NGHIA',
    badgeColor: '#8B1E22',
  },
  {
    id: 'bride',
    role: 'Mừng Cô Dâu',
    name: 'LÊ THỊ NHUNG',
    bank: 'Techcombank (TCB)',
    accountNumber: '0987654321',
    displayNumber: '0987 6543 21',
    branch: 'Chi nhánh Quận 3, TP.HCM',
    qrUrl: 'https://img.vietqr.io/image/TCB-0987654321-compact2.png?amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi%20Thi%20Nhung&accountName=LE%20THI%20NHUNG',
    badgeColor: '#C5A059',
  },
];

export default function Gifts() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (account) => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopiedId(account.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="gifts"
      style={{
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <div className="eyebrow-luxury">Hộp Mừng Cưới</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Gửi Trao <span style={{ color: '#8B1E22' }}>Chúc Phúc</span>
          </h2>
          <div className="divider-luxury">
            <span style={{ color: '#C5A059' }}>✦</span>
          </div>
          <p
            className="font-serif"
            style={{
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: '#584A40',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Sự hiện diện và lời chúc của bạn là món quà ý nghĩa nhất.
            Nếu bạn muốn gửi quà mừng từ xa, xin vui lòng quét mã QR bên dưới.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 4vw, 36px)',
          }}
        >
          {BANK_ACCOUNTS.map((acc) => (
            <div
              key={acc.id}
              className="glass-luxury-card corner-ornament"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px 28px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(139, 30, 34, 0.08)',
                  color: '#8B1E22',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  marginBottom: '24px',
                }}
              >
                <Gift size={14} />
                {acc.role}
              </div>

              {/* VietQR Code Frame */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 24px',
                  padding: '10px',
                  backgroundColor: '#FFFDF9',
                  borderRadius: '6px',
                  border: '1.5px solid rgba(197, 160, 89, 0.35)',
                  boxShadow: '0 8px 24px rgba(35, 27, 21, 0.06)',
                }}
              >
                <img
                  src={acc.qrUrl}
                  alt={`QR ${acc.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Bank Details */}
              <h3
                className="font-display"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#231B15',
                  margin: '0 0 4px',
                }}
              >
                {acc.name}
              </h3>

              <p
                className="font-display"
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#8B1E22',
                  margin: '0 0 12px',
                }}
              >
                {acc.bank}
              </p>

              {/* Account Number Display */}
              <div
                style={{
                  backgroundColor: '#FAF7F2',
                  padding: '12px 18px',
                  borderRadius: '4px',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.76rem',
                    color: '#8F7E73',
                    fontFamily: "'Playfair Display', serif",
                    display: 'block',
                    marginBottom: '2px',
                    fontWeight: 600,
                  }}
                >
                  Số Tài Khoản
                </span>
                <span
                  className="font-display text-gold-luxury"
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  {acc.displayNumber}
                </span>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(acc)}
                className="btn-luxury-crimson"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '0.84rem',
                }}
              >
                {copiedId === acc.id ? (
                  <>
                    <Check size={16} />
                    Đã Sao Chép Số Tài Khoản!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Sao Chép Số Tài Khoản
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
