/* ══════════════════════════════════════════════════════════════════════
   GIFTS — Final card in the envelope  [REDESIGNED]
   ART DIRECTION: Return to warmth. Stationery feel.
   Updated to new design tokens.
══════════════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { BANK_ACCOUNTS } from '../weddingData';

function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button
      onClick={copy}
      aria-label={`Sao chép ${label}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '7px 13px',
        background: 'transparent',
        border: `1px solid ${copied ? 'rgba(124,29,33,0.35)' : 'rgba(30,20,16,0.16)'}`,
        borderRadius: '1px',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.67rem', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: copied ? '#7C1D21' : '#6B5D52',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.30)'; e.currentTarget.style.color = '#3D3228'; }}}
      onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(30,20,16,0.16)'; e.currentTarget.style.color = '#6B5D52'; }}}
    >
      {copied ? (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <polyline points="1.5 5.5 4.5 8.5 9.5 2.5"/>
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
          <rect x="3.5" y="3.5" width="6" height="7" rx="1"/>
          <path d="M2.5 1.5h5a1 1 0 011 1v1.5"/>
        </svg>
      )}
      {copied ? 'Đã sao chép' : 'Sao chép'}
    </button>
  );
}

function AccountCard({ account }) {
  return (
    <article
      aria-label={`Thông tin chuyển khoản cho ${account.role}: ${account.name}`}
      style={{
        backgroundColor: '#FDFBF5',
        border: '1px solid rgba(30,20,16,0.07)',
        padding: 'clamp(28px, 5vw, 44px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Placeholder warning */}
      {account.accountNumber.startsWith('[') && (
        <div style={{
          backgroundColor: 'rgba(176,140,78,0.09)',
          border: '1px solid rgba(176,140,78,0.24)',
          borderRadius: '1px',
          padding: '8px 14px',
          marginBottom: '18px',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.67rem',
          color: 'rgba(110,74,24,0.65)',
          fontStyle: 'italic',
        }}>
          ⚠️ Số tài khoản chưa cập nhật — sửa trong <code>src/weddingData.js</code>
        </div>
      )}

      {/* Role */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.58rem', fontWeight: 600,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#7C1D21', marginBottom: '22px',
      }}>{account.role}</p>

      {/* QR */}
      <div style={{
        margin: '0 auto 26px',
        width: '148px', height: '148px',
        border: '1px solid rgba(30,20,16,0.10)',
        padding: '10px',
        backgroundColor: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={account.qrUrl}
          alt={`Mã QR chuyển khoản cho ${account.name} — ${account.bank} ${account.accountNumber}`}
          width="128" height="128"
          loading="lazy"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          onError={e => { if (e.target.src !== account.qrFallback) e.target.src = account.qrFallback; }}
        />
      </div>

      {/* Bank info */}
      <div style={{ borderTop: '1px solid rgba(30,20,16,0.07)', paddingTop: '20px' }}>
        {[
          { label: 'Ngân hàng',     value: account.bank,  serif: true },
          { label: 'Chủ tài khoản', value: account.name,  strong: true },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', gap: '8px', marginBottom: '10px',
          }}>
            <span style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem', fontWeight: 500,
              color: '#9E8E82', letterSpacing: '0.02em', flexShrink: 0,
            }}>{row.label}</span>
            <span style={{
              fontFamily: row.serif ? "'Playfair Display', serif" : "'Be Vietnam Pro', sans-serif",
              fontSize: row.serif ? '0.94rem' : '0.86rem',
              fontWeight: row.strong ? 600 : (row.serif ? 500 : 400),
              color: '#1E1410', textAlign: 'right',
            }}>{row.value}</span>
          </div>
        ))}

        {/* Account number + copy */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.68rem', fontWeight: 500,
            color: '#9E8E82', display: 'block', marginBottom: '7px',
          }}>Số tài khoản</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.08rem, 2.2vw, 1.30rem)',
              fontWeight: 500, color: '#1E1410', letterSpacing: '0.08em',
            }}>{account.accountNumber}</span>
            <CopyBtn text={account.accountNumber} label="số tài khoản" />
          </div>
        </div>

        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.72rem', color: '#9E8E82', marginTop: '5px',
        }}>{account.branch}</p>
      </div>
    </article>
  );
}

export default function Gifts() {
  return (
    <section
      id="gifts"
      aria-label="Mừng cưới — thông tin chuyển khoản"
      style={{
        padding: 'clamp(76px, 12vw, 116px) clamp(22px, 4vw, 48px)',
        backgroundColor: '#F5EFE3',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Header */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.95rem, 4.3vw, 2.9rem)',
            fontWeight: 500, color: '#1E1410',
            lineHeight: 1.1, letterSpacing: '-0.01em',
            marginBottom: 'clamp(22px, 3.8vw, 34px)',
          }}>
            Chúc Phúc
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              color: '#B08C4E', marginLeft: '14px',
            }}>&amp; Tình Cảm</span>
          </h2>

          {/* Quote card */}
          <div className="gsap-reveal" style={{
            display: 'flex', alignItems: 'flex-start',
            gap: 'clamp(14px, 2.8vw, 26px)',
            padding: 'clamp(18px, 3.2vw, 30px)',
            backgroundColor: '#FDFBF5',
            border: '1px solid rgba(30,20,16,0.07)',
            maxWidth: '560px',
          }}>
            <img
              src="/Test_06-06-2026/wax-seal.svg"
              alt=""
              aria-hidden="true"
              width="40" height="40"
              style={{ flexShrink: 0, opacity: 0.80, marginTop: '3px' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.98rem, 1.85vw, 1.15rem)',
              fontStyle: 'italic', color: '#3D3228',
              lineHeight: 1.85, margin: 0,
            }}>
              "Thay cho những món quà vật chất, chúng mình xin nhận
              những lời chúc yêu thương và tình cảm chân thành từ bạn."
            </p>
          </div>
        </div>

        {/* Account cards */}
        <div
          className="gsap-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 'clamp(14px, 2.8vw, 26px)',
            marginBottom: 'clamp(28px, 5vw, 44px)',
          }}
        >
          {BANK_ACCOUNTS.map(acc => <AccountCard key={acc.id} account={acc} />)}
        </div>

        {/* Footer note */}
        <p className="gsap-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.98rem, 1.75vw, 1.10rem)',
          fontStyle: 'italic',
          color: '#9E8E82',
          lineHeight: 1.72, textAlign: 'center',
        }}>
          Sự hiện diện của bạn trong ngày trọng đại là món quà quý giá nhất với chúng mình.
        </p>
      </div>
    </section>
  );
}
