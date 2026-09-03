/*
  GIFTS — Discreet mừng cưới
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  The gift section should be tasteful and secondary.
  It is a service — not a prominent feature.
  
  Layout:
  - Short intro message
  - Two accordion items (Chú Rể / Cô Dâu)
  - Tap to expand: bank info + QR
  - Default: both collapsed
  - Section bg: same cream as page
*/
import { useState } from 'react';
import { BANK_ACCOUNTS } from '../weddingData';

function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el);
      el.select(); document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      aria-label={`Sao chép ${label}`}
      style={{
        padding: '6px 12px',
        background: 'transparent',
        border: `1px solid ${copied ? 'rgba(124,29,33,0.30)' : 'rgba(30,20,16,0.15)'}`,
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.62rem', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: copied ? '#7C1D21' : '#6B5D52',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderRadius: '1px',
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        flexShrink: 0,
      }}
    >
      {copied ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <polyline points="1 5 4 8 9 2"/>
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="6" height="6" rx="0.5"/>
          <path d="M1 7V1h6"/>
        </svg>
      )}
      {copied ? 'Đã sao chép' : 'Sao chép'}
    </button>
  );
}

function AccountAccordion({ account }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: '0.5px solid rgba(160,120,50,0.18)' }}>
      {/* Toggle header */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 'clamp(14px, 3vw, 18px) 0',
          background: 'transparent', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#7C1D21',
          }}>{account.role}</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.05rem, 2.2vw, 1.30rem)',
            fontWeight: 500, color: '#1A1008',
          }}>{account.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}</span>
        </span>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          stroke="#9E8E82" strokeWidth="1.5" strokeLinecap="round"
          aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flexShrink: 0 }}
        >
          <path d="M3 5l4 4 4-4"/>
        </svg>
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{
          paddingBottom: 'clamp(18px, 3.5vw, 24px)',
          display: 'flex',
          gap: 'clamp(16px, 3vw, 28px)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          {/* Account details */}
          <div style={{ flex: '1 1 180px' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}>
              {[
                ['Ngân hàng', account.bank],
                ['Số tài khoản', account.accountNumber],
                ['Chi nhánh', account.branch],
                ['Chủ tài khoản', account.name],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '0.5px solid rgba(30,20,16,0.06)' }}>
                  <td style={{
                    fontSize: '0.70rem', color: 'rgba(80,54,16,0.45)',
                    padding: '7px 0', verticalAlign: 'top', width: '40%',
                    paddingRight: '12px',
                  }}>{k}</td>
                  <td style={{
                    fontSize: '0.84rem', color: '#1A1008',
                    padding: '7px 0', verticalAlign: 'top', fontWeight: k === 'Số tài khoản' ? 600 : 400,
                  }}>{v}</td>
                </tr>
              ))}
            </table>
            <div style={{ marginTop: '10px' }}>
              <CopyBtn text={account.accountNumber} label="số tài khoản" />
            </div>
          </div>

          {/* QR code */}
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <img
              src={account.qrUrl}
              alt={`Mã QR thanh toán cho ${account.role}`}
              width="100" height="100"
              loading="lazy"
              style={{ display: 'block', width: '100px', height: '100px', border: '1px solid rgba(30,20,16,0.10)' }}
              onError={e => { e.currentTarget.src = account.qrFallback; }}
            />
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.58rem', color: 'rgba(80,54,16,0.35)',
              marginTop: '5px',
            }}>Quét mã QR</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Gifts() {
  return (
    <section
      id="gifts"
      aria-label="Mừng cưới"
      style={{
        backgroundColor: '#F5EFE3',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 5vw, 48px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 40px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
            fontStyle: 'italic', color: 'rgba(80,54,16,0.44)',
            marginBottom: '6px',
          }}>
            Mừng Cưới
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.65rem, 4.2vw, 2.3rem)',
            fontWeight: 500, color: '#1A1008',
            lineHeight: 1.1, letterSpacing: '0.01em',
            marginBottom: 'clamp(8px, 1.5vw, 12px)',
          }}>
            Những lời chúc phúc
          </h2>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.76rem, 1.3vw, 0.86rem)',
            color: 'rgba(80,54,16,0.42)',
            lineHeight: 1.75,
            maxWidth: '380px', margin: '0 auto',
          }}>
            Sự có mặt của bạn là món quà quý giá nhất.
            Nếu muốn gửi thêm yêu thương, đây là thông tin của chúng mình.
          </p>
        </div>

        {/* Accordion accounts */}
        <div>
          {BANK_ACCOUNTS.map(account => (
            <AccountAccordion key={account.id} account={account} />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '0.5px solid rgba(160,120,50,0.18)' }} />
        </div>
      </div>
    </section>
  );
}
