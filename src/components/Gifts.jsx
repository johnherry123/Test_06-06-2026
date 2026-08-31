/* ══════════════════════════════════════════════════════════════════════
   GIFTS / MỪ̀NG CƯỚI — Premium Wedding Stationery
   ────────────────────────────────────────────────────────────
   Data: from weddingData.js (all bank info clearly marked as placeholder).
   ⚠️ Bank accounts are PLACEHOLDER until replaced in weddingData.js.
   QR: remains fully scannable — no visual decoration over QR zone.
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
      title={`Sao chép ${label}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '6px 12px',
        background: 'transparent',
        border: `1px solid ${copied ? 'rgba(139,30,34,0.4)' : 'rgba(35,27,21,0.18)'}`,
        borderRadius: '1px',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.68rem', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: copied ? '#8B1E22' : '#756B63',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(35,27,21,0.35)'; e.currentTarget.style.color = '#4A3F38'; }}}
      onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(35,27,21,0.18)'; e.currentTarget.style.color = '#756B63'; }}}
    >
      {copied ? (
        /* Checkmark */
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <polyline points="1.5 5.5 4.5 8.5 9.5 2.5"/>
        </svg>
      ) : (
        /* Copy icon */
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
          <rect x="3.5" y="3.5" width="6" height="7" rx="1"/>
          <path d="M2.5 1.5h5a1 1 0 011 1v1.5"/>
        </svg>
      )}
      {copied ? 'Đã sao chép' : 'Sao chép'}
    </button>
  );
}

/* Individual account card — premium stationery style */
function AccountCard({ account }) {
  return (
    <article
      aria-label={`Thông tin chuyển khoản cho ${account.role}: ${account.name}`}
      style={{
        backgroundColor: '#FDFBF7',
        border: '1px solid rgba(35,27,21,0.08)',
        padding: 'clamp(28px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle botanical corner — using envelope_back asset as bg ──
           The envelope_back.png has a beautiful letterpress frame.
           Use just the top-left corner area as a very subtle background accent. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '120px', height: '120px',
          backgroundImage: 'url(/Test_06-06-2026/envelope_back.png)',
          backgroundSize: '380px 380px',
          backgroundPosition: 'right top',
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      />
      {/* Placeholder warning banner */}
      {account.accountNumber.startsWith('[') && (
        <div style={{
          backgroundColor: 'rgba(184,149,85,0.12)',
          border: '1px solid rgba(184,149,85,0.3)',
          borderRadius: '2px',
          padding: '8px 14px',
          marginBottom: '16px',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.68rem',
          color: 'rgba(120,80,30,0.7)',
          fontStyle: 'italic',
        }}>
          ⚠️ Số tài khoản chưa cập nhật. Sửa trong <code>src/weddingData.js</code>
        </div>
      )}

      {/* Role */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.62rem', fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#8B1E22', marginBottom: '20px',
      }}>
        {account.role}
      </p>

      {/* QR code — clean, scannable, no decoration over QR area */}
      <div style={{
        margin: '0 auto 24px',
        width: '148px', height: '148px',
        border: '1px solid rgba(35,27,21,0.1)',
        padding: '10px',
        backgroundColor: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={account.qrUrl}
          alt={`Mã QR chuyển khoản cho ${account.name} — ${account.bank} ${account.accountNumber}`}
          width="128"
          height="128"
          loading="lazy"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          onError={e => {
            if (e.target.src !== account.qrFallback) e.target.src = account.qrFallback;
          }}
        />
      </div>

      {/* Bank info — editorial data table style */}
      <div style={{
        borderTop: '1px solid rgba(35,27,21,0.08)',
        paddingTop: '20px',
      }}>
        {[
          { label: 'Ngân hàng',      value: account.bank,          serif: true },
          { label: 'Chủ tài khoản',  value: account.name,          serif: false, strong: true },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', gap: '8px',
            marginBottom: '10px',
          }}>
            <span style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.7rem', fontWeight: 500,
              color: '#9E9188', letterSpacing: '0.02em',
              flexShrink: 0,
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: row.serif ? "'Playfair Display', serif" : "'Be Vietnam Pro', sans-serif",
              fontSize: row.serif ? '0.95rem' : '0.88rem',
              fontWeight: row.strong ? 600 : (row.serif ? 500 : 400),
              color: '#231B15',
              textAlign: 'right',
            }}>
              {row.value}
            </span>
          </div>
        ))}

        {/* Account number row — larger + copy button */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.7rem', fontWeight: 500,
            color: '#9E9188', display: 'block', marginBottom: '6px',
          }}>
            Số tài khoản
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              fontWeight: 500, color: '#231B15',
              letterSpacing: '0.08em',
            }}>
              {account.accountNumber}
            </span>
            <CopyBtn text={account.accountNumber} label="số tài khoản" />
          </div>
        </div>

        {/* Branch */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.76rem', color: '#9E9188',
          marginTop: '8px',
        }}>
          {account.branch}
        </p>
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
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 56px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Mừng Cưới
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500, color: '#231B15',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            Chúc Phúc &amp; Tình Cảm
          </h2>

          {/* Champagne rule */}
          <div className="gsap-line" style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5) 25%, rgba(184,149,85,0.5) 75%, transparent)',
            marginBottom: '24px',
          }} />

          {/* Wax seal + message */}
          <div className="gsap-reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            <img
              src="/Test_06-06-2026/wax-seal.svg"
              alt=""
              aria-hidden="true"
              width="52"
              height="52"
              style={{ flexShrink: 0, opacity: 0.85, marginTop: '4px' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              fontStyle: 'italic', color: '#4A3F38',
              lineHeight: 1.85, margin: 0,
            }}>
              "Thay cho những món quà vật chất,
              chúng mình xin nhận những lời chúc yêu thương
              và tình cảm chân thành từ bạn."
            </p>
          </div>
        </div>

        {/* ── Account cards ── */}
        <div
          className="gsap-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {BANK_ACCOUNTS.map(acc => <AccountCard key={acc.id} account={acc} />)}
        </div>

        {/* ── Botanical branch divider ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', margin: '12px 0', opacity: 0.55 }}>
          <img
            src="/Test_06-06-2026/branch-divider.svg"
            alt="" aria-hidden="true"
            style={{ width: '100%', maxWidth: '240px', height: '32px', display: 'inline-block' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* ── Footer note ── */}
        <p className="gsap-reveal" style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.78rem', color: '#9E9188',
          lineHeight: 1.65, textAlign: 'center',
          fontStyle: 'italic',
        }}>
          Sự hiện diện của bạn trong ngày trọng đại là món quà quý giá nhất với chúng mình.
        </p>

      </div>
    </section>
  );
}
