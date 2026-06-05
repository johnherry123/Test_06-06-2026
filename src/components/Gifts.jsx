import React, { useState } from 'react';

const ACCOUNTS = [
  {
    bank: 'VIETCOMBANK',
    name: 'NGUYỄN ĐẠI NGHĨA',
    number: '1234 5678 90',
    color: '#006a4e',
    logo: 'VCB',
    qr: `https://img.vietqr.io/image/VCB-1234567890-print.png?amount=0&addInfo=Dam%20cuoi&accountName=NGUYEN%20DAI%20NGHIA`,
  },
  {
    bank: 'TECHCOMBANK',
    name: 'LÊ THỊ NHUNG',
    number: '0987 6543 21',
    color: '#d62828',
    logo: 'TCB',
    qr: `https://img.vietqr.io/image/TCB-0987654321-print.png?amount=0&addInfo=Dam%20cuoi&accountName=LE%20THI%20NHUNG`,
  },
];

export default function Gifts() {
  const [flipped, setFlipped] = useState(false);
  const [active, setActive]   = useState(0);
  const [copied, setCopied]   = useState(false);

  const copy = txt => {
    navigator.clipboard.writeText(txt.replace(/\s/g, '')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const acc = ACCOUNTS[active];

  return (
    <section className="sec s-dark" id="gifts" style={{ textAlign: 'center' }}>
      {/* Gold top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,.6) 30%, rgba(201,168,76,.6) 70%, transparent 95%)',
      }} />

      {/* Background ornament */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: 'Great Vibes, cursive',
        fontSize: 'clamp(10rem, 25vw, 22rem)',
        color: 'rgba(201,168,76,.04)',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1, whiteSpace: 'nowrap',
      }}>
        Phúc
      </div>

      <div className="wrap-xs fu">
        <span className="eyebrow" style={{ color: 'rgba(232,201,122,.55)', marginBottom: '16px' }}>
          Phúc Bảo
        </span>
        <h2 className="f-script" style={{
          fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
          color: 'var(--gold-lt)',
          lineHeight: 1,
          marginBottom: '20px',
        }}>
          Gửi Lời Chúc Phúc
        </h2>
        <p className="f-sans" style={{
          fontSize: '11px', color: 'rgba(201,168,76,.55)',
          letterSpacing: '.04em', marginBottom: '12px',
        }}>
          Chạm thẻ để xem thông tin chuyển khoản
        </p>
        <div className="rule" style={{ width: '80px', margin: '0 auto 44px', opacity: .4 }} />

        {/* ── Flip Card ── */}
        <div
          style={{ perspective: '1400px', cursor: 'pointer', marginBottom: '32px' }}
          onClick={() => setFlipped(f => !f)}
        >
          <div style={{
            position: 'relative',
            width: '100%', maxWidth: '380px', height: '460px',
            margin: '0 auto',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform .75s cubic-bezier(.4,0,.2,1)',
          }}>

            {/* FRONT */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'linear-gradient(150deg, #8B0000 0%, #5A0000 40%, #380000 100%)',
              border: '1px solid rgba(201,168,76,.35)',
              boxShadow: '0 30px 100px rgba(0,0,0,.5)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2.5rem',
              overflow: 'hidden',
            }}>
              {/* Decorative rings */}
              <div style={{
                position: 'absolute', width: '260px', height: '260px', borderRadius: '50%',
                border: '1px solid rgba(201,168,76,.12)', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
              }} />
              <div style={{
                position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
                border: '1px solid rgba(201,168,76,.07)', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
              }} />

              {/* 囍 character */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                border: '1.5px solid rgba(201,168,76,.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px',
                background: 'rgba(201,168,76,.08)',
              }}>
                <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>囍</span>
              </div>

              <h3 className="f-script" style={{
                fontSize: '3.2rem',
                color: '#F5ECD8',
                marginBottom: '12px',
                textShadow: '0 2px 20px rgba(0,0,0,.5)',
              }}>
                Hồng Bao
              </h3>

              <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.6), transparent)', margin: '0 auto 16px' }} />

              <p className="eyebrow" style={{ color: 'rgba(201,168,76,.6)', marginBottom: '24px', letterSpacing: '.5em' }}>
                Đại Nghĩa &amp; Thị Nhung
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: 'rgba(201,168,76,.45)', fontFamily: 'Montserrat', letterSpacing: '.25em' }}>
                  CHẠM ĐỂ LẬT
                </span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="rgba(201,168,76,.45)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* BACK */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: '#fdfaf3',
              border: '1px solid rgba(201,168,76,.25)',
              boxShadow: '0 30px 100px rgba(0,0,0,.25)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem 1.8rem',
            }}>
              {/* Bank tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', width: '100%' }}>
                {ACCOUNTS.map((a, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); setActive(i); }}
                    style={{
                      flex: 1,
                      padding: '9px 4px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '8px',
                      fontWeight: 600,
                      letterSpacing: '.3em',
                      textTransform: 'uppercase',
                      border: `1.5px solid ${active === i ? a.color : 'rgba(0,0,0,.12)'}`,
                      background: active === i ? a.color : 'transparent',
                      color: active === i ? '#fff' : 'var(--text-muted)',
                      transition: 'all .22s',
                    }}
                  >
                    {a.logo}
                  </button>
                ))}
              </div>

              {/* QR code */}
              <div style={{
                width: '150px', height: '150px',
                border: '1px solid rgba(0,0,0,.08)',
                marginBottom: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff',
                padding: '6px',
              }}>
                <img
                  src={acc.qr}
                  alt="QR"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.parentNode.innerHTML = '<span style="color:var(--text-faint);font-size:11px;font-family:Montserrat">QR Code</span>'; }}
                />
              </div>

              {/* Account info */}
              <p className="f-display" style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '4px', letterSpacing: '.02em' }}>
                {acc.name}
              </p>
              <span className="eyebrow" style={{ color: 'var(--text-faint)', marginBottom: '6px', fontSize: '7px', letterSpacing: '.5em' }}>
                {acc.bank}
              </span>
              <p className="f-serif" style={{ fontSize: '1.4rem', color: 'var(--text)', marginBottom: '20px', letterSpacing: '.08em' }}>
                {acc.number}
              </p>

              {/* Copy button */}
              <button
                onClick={e => { e.stopPropagation(); copy(acc.number); }}
                style={{
                  padding: '10px 28px',
                  border: `1.5px solid ${copied ? 'var(--crimson)' : 'rgba(139,0,0,.3)'}`,
                  background: copied ? 'var(--crimson)' : 'transparent',
                  color: copied ? '#fff' : 'var(--crimson)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '8px',
                  fontWeight: 600,
                  letterSpacing: '.3em',
                  textTransform: 'uppercase',
                  transition: 'all .25s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                {copied ? (
                  <>
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Đã Sao Chép
                  </>
                ) : 'Sao Chép STK'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
