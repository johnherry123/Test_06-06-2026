import React, { useState } from 'react';

const ACCOUNTS = [
  { bank:'VIETCOMBANK', name:'NGUYỄN ĐẠI NGHĨA', number:'1234567890', qr:'https://img.vietqr.io/image/VCB-1234567890-print.png?amount=0&addInfo=Dam%20cuoi&accountName=NGUYEN%20DAI%20NGHIA' },
  { bank:'TECHCOMBANK',  name:'LÊ THỊ NHUNG',     number:'0987654321', qr:'https://img.vietqr.io/image/TCB-0987654321-print.png?amount=0&addInfo=Dam%20cuoi&accountName=LE%20THI%20NHUNG' },
];

export default function Gifts() {
  const [flipped, setFlipped] = useState(false);
  const [active,  setActive]  = useState(0);
  const [copied,  setCopied]  = useState(false);

  const copy = txt => {
    navigator.clipboard.writeText(txt).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  };

  const acc = ACCOUNTS[active];

  return (
    <section className="section section--warm" id="gifts" style={{ textAlign:'center' }}>
      <div className="fade-up" style={{ maxWidth:'520px', margin:'0 auto' }}>
        <span className="eyebrow" style={{ marginBottom:'1rem' }}>Phúc Bảo</span>
        <h2 className="f-script" style={{ fontSize:'clamp(3rem,7vw,5rem)', color:'var(--ruby)', lineHeight:1 }}>Gửi Lời Chúc Phúc</h2>
        <p className="f-sans" style={{ fontSize:'11px', color:'var(--muted)', letterSpacing:'.04em', margin:'1.5rem 0 3rem' }}>
          Chạm thẻ để xem thông tin chuyển khoản
        </p>
        <div className="rule-gold" style={{ width:'80px', margin:'0 auto 3rem' }} />

        {/* Flip card */}
        <div style={{ perspective:'1200px', cursor:'pointer', marginBottom:'2rem' }} onClick={()=>setFlipped(f=>!f)}>
          <div style={{
            position:'relative', width:'100%', maxWidth:'380px', height:'480px', margin:'0 auto',
            transformStyle:'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition:'transform .7s cubic-bezier(.4,0,.2,1)',
          }}>

            {/* FRONT — red hồng bao */}
            <div style={{
              position:'absolute', inset:0, backfaceVisibility:'hidden',
              background:'linear-gradient(160deg,#B52525 0%,#7B0E0E 60%,#5C0808 100%)',
              border:'2px solid rgba(201,169,110,.4)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              padding:'2rem', boxShadow:'0 30px 80px rgba(0,0,0,.2)',
            }}>
              <div style={{ width:'70px', height:'70px', borderRadius:'50%', border:'2px solid rgba(201,169,110,.5)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'2rem' }}>
                <span style={{ fontSize:'2.2rem' }}>🌸</span>
              </div>
              <h3 className="f-script" style={{ fontSize:'3rem', color:'#F8EDD5', marginBottom:'1rem' }}>Hồng Bao</h3>
              <p className="eyebrow" style={{ color:'rgba(201,169,110,.7)', marginBottom:'2rem' }}>Đại Nghĩa &amp; Thị Nhung</p>
              <p className="f-cormorant" style={{ fontStyle:'italic', color:'rgba(248,237,213,.6)', fontSize:'1rem' }}>Chạm để lật →</p>
            </div>

            {/* BACK — banking info */}
            <div style={{
              position:'absolute', inset:0, backfaceVisibility:'hidden',
              transform:'rotateY(180deg)',
              background:'#fff', border:'1px solid rgba(201,169,110,.2)',
              display:'flex', flexDirection:'column', alignItems:'center',
              padding:'2.5rem 2rem', boxShadow:'0 30px 80px rgba(0,0,0,.12)',
            }}>

              {/* Tab switch */}
              <div style={{ display:'flex', gap:'.5rem', marginBottom:'2rem', width:'100%' }}>
                {ACCOUNTS.map((a,i)=>(
                  <button key={i} onClick={e=>{e.stopPropagation();setActive(i);}} style={{
                    flex:1, padding:'.5rem', fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'.25em', textTransform:'uppercase',
                    border:`1px solid ${active===i?'var(--ruby)':'rgba(201,169,110,.25)'}`,
                    background: active===i?'var(--ruby)':'transparent',
                    color: active===i?'#fff':'var(--muted)', cursor:'pointer', transition:'all .2s',
                  }}>{a.bank}</button>
                ))}
              </div>

              {/* QR */}
              <img src={acc.qr} alt="QR" style={{ width:'160px', height:'160px', objectFit:'contain', border:'1px solid rgba(0,0,0,.08)', marginBottom:'1.5rem' }}
                onError={e=>{e.target.style.display='none';}}/>

              <p className="f-serif" style={{ fontWeight:600, color:'var(--charcoal)', marginBottom:'.3rem' }}>{acc.name}</p>
              <p className="eyebrow" style={{ marginBottom:'.3rem' }}>{acc.bank}</p>
              <p className="f-cormorant" style={{ fontSize:'1.2rem', color:'var(--charcoal)', marginBottom:'1.5rem', letterSpacing:'.05em' }}>{acc.number}</p>

              <button onClick={e=>{e.stopPropagation();copy(acc.number);}} style={{
                padding:'.7rem 2rem', border:'1px solid rgba(201,169,110,.4)',
                background: copied?'var(--ruby)':'transparent',
                color: copied?'#fff':'var(--gold)',
                fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'.3em', textTransform:'uppercase',
                cursor:'pointer', transition:'all .25s',
              }}>
                {copied ? '✓ Đã Sao Chép' : 'Sao Chép STK'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
