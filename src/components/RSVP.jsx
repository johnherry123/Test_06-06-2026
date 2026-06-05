import React, { useState } from 'react';

export default function RSVP() {
  const [form, setForm] = useState({ name:'', attend:'yes', guests:'1', note:'' });
  const [sent, setSent] = useState(false);

  const submit = e => { e.preventDefault(); setSent(true); };
  const inp = { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(201,169,110,.35)', padding:'.8rem 0', fontFamily:'Cormorant Garamond,serif', fontSize:'1.1rem', color:'var(--charcoal)', outline:'none', textAlign:'center', transition:'border-color .25s' };

  return (
    <section className="section section--paper" id="rsvp" style={{ textAlign:'center' }}>
      <div className="fade-up" style={{ maxWidth:'560px', margin:'0 auto' }}>
        <span className="eyebrow" style={{ marginBottom:'1rem' }}>Xác Nhận Tham Dự</span>
        <h2 className="f-script" style={{ fontSize:'clamp(3rem,7vw,5rem)', color:'var(--ruby)', lineHeight:1, marginBottom:'1rem' }}>Phúc Đáp</h2>
        <p className="f-sans" style={{ fontSize:'11px', color:'var(--muted)', letterSpacing:'.04em', marginBottom:'3rem' }}>
          Vui lòng phản hồi trước ngày <strong>10 · 10 · 2026</strong>
        </p>
        <div className="rule-gold" style={{ width:'80px', margin:'0 auto 3rem' }} />

        {sent ? (
          <div style={{ padding:'4rem 2rem' }}>
            <div style={{ width:'60px',height:'60px',borderRadius:'50%',border:'1px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 2rem' }}>
              <span style={{ fontSize:'1.5rem',color:'var(--gold)' }}>✓</span>
            </div>
            <h3 className="f-script" style={{ fontSize:'2.5rem',color:'var(--ruby)',marginBottom:'1rem' }}>Cảm ơn bạn!</h3>
            <p className="f-cormorant" style={{ fontSize:'1.2rem',fontStyle:'italic',color:'var(--muted)' }}>Chúng tôi rất mong được gặp bạn.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background:'#fff', padding:'3.5rem 3rem', border:'1px solid rgba(201,169,110,.15)', boxShadow:'0 16px 50px rgba(0,0,0,.06)' }}>

            <div style={{ marginBottom:'2.5rem' }}>
              <label className="eyebrow" style={{ display:'block',marginBottom:'.8rem',textAlign:'left' }}>Tên Khách Mời</label>
              <input style={inp} placeholder="Họ và tên đầy đủ" value={form.name}
                onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--ruby)'}
                onBlur={e=>e.target.style.borderColor='rgba(201,169,110,.35)'}
              />
            </div>

            <div style={{ marginBottom:'2.5rem' }}>
              <label className="eyebrow" style={{ display:'block',marginBottom:'.8rem',textAlign:'left' }}>Xác Nhận Tham Dự</label>
              <div style={{ display:'flex',gap:'1rem' }}>
                {[['yes','Có mặt'],['no','Vắng mặt']].map(([v,l])=>(
                  <button key={v} type="button" onClick={()=>setForm(f=>({...f,attend:v}))}
                    style={{ flex:1,padding:'.8rem',border:`1px solid ${form.attend===v?'var(--ruby)':'rgba(201,169,110,.2)'}`,
                      background:form.attend===v?'var(--ruby)':'transparent',
                      color:form.attend===v?'#fff':'var(--muted)',
                      fontFamily:'Montserrat',fontSize:'9px',letterSpacing:'.3em',textTransform:'uppercase',cursor:'pointer',
                      transition:'all .2s',
                    }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:'2.5rem' }}>
              <label className="eyebrow" style={{ display:'block',marginBottom:'.8rem',textAlign:'left' }}>Số Người</label>
              <input type="number" min="1" max="10" style={inp} value={form.guests}
                onChange={e=>setForm(f=>({...f,guests:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--ruby)'}
                onBlur={e=>e.target.style.borderColor='rgba(201,169,110,.35)'}
              />
            </div>

            <div style={{ marginBottom:'3rem' }}>
              <label className="eyebrow" style={{ display:'block',marginBottom:'.8rem',textAlign:'left' }}>Lời Chúc</label>
              <textarea rows={3} style={{ ...inp, resize:'none', textAlign:'left', paddingLeft:'.2rem' }}
                placeholder="Gửi đến cô dâu chú rể…"
                value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--ruby)'}
                onBlur={e=>e.target.style.borderColor='rgba(201,169,110,.35)'}
              />
            </div>

            <button type="submit" className="btn btn--filled" style={{ width:'100%', padding:'1.1rem' }}>
              Gửi Xác Nhận
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
