import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Gifts() {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    gsap.from('.gift-container', {
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      y: 60, opacity: 0, duration: 1.8, ease: 'power3.out',
    });
  }, []);

  return (
    <section ref={ref} className="section-padding" style={{ background: 'var(--bg-cream)', perspective: '1500px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>

        <div className="fade-up" style={{ marginBottom: '3rem' }}>
          <p className="font-sans" style={{ fontSize:'11px', letterSpacing:'.4em', color:'var(--cherry-primary)', textTransform:'uppercase', marginBottom:'.8rem', fontWeight:600 }}>Phúc Báo</p>
          <h2 className="font-script" style={{ fontSize:'4rem', color:'var(--cherry-dark)', margin:'0 0 .5rem' }}>Gửi Lời Chúc Phúc</h2>
          <div className="divider-gold" style={{ margin:'.8rem auto' }}/>
          <p className="font-sans" style={{ fontSize:'12px', color:'var(--text-light)', letterSpacing:'.15em' }}>
            {flipped ? '← Chạm để quay lại' : 'Chạm thẻ để xem số tài khoản →'}
          </p>
        </div>

        {/* 3-D flip card */}
        <div
          className="gift-container"
          onClick={() => setFlipped(f => !f)}
          style={{
            width:'100%', height:'560px',
            position:'relative', cursor:'pointer',
            transformStyle:'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition:'transform 1.1s cubic-bezier(.23,1,.32,1)',
          }}
        >

          {/* ── FRONT: Red card with QR visible ── */}
          <div style={{
            position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            background:'linear-gradient(145deg, #8B1A28 0%, #B22222 40%, #8B1A28 70%, #5A0F19 100%)',
            borderRadius:'16px',
            boxShadow:'0 30px 70px rgba(128,0,0,.35), 0 10px 20px rgba(0,0,0,.2)',
            border:'2px solid rgba(212,175,55,.3)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between',
            padding:'1.8rem 1.5rem',
            overflow:'hidden',
          }}>
            {/* Inner frames */}
            <div style={{ position:'absolute', inset:'12px', border:'1px solid rgba(212,175,55,.5)', borderRadius:'8px', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', inset:'20px', border:'1px solid rgba(212,175,55,.2)', borderRadius:'4px', pointerEvents:'none' }}/>

            {/* Corners */}
            {[['tl',0,0],['tr',0,'auto'],['bl','auto',0],['br','auto','auto']].map(([k,t,r])=>(
              <svg key={k} style={{ position:'absolute', top: t===0?'18px':'auto', bottom: t==='auto'?'18px':'auto', left: r===0?'18px':'auto', right: r==='auto'?'18px':'auto', width:'22px', height:'22px', transform: k==='tr'?'scaleX(-1)': k==='bl'?'scaleY(-1)': k==='br'?'scale(-1)':'none' }} viewBox="0 0 40 40" fill="none" stroke="rgba(212,175,55,.8)" strokeWidth="1.5">
                <path d="M0,0 L15,0 A25 25 0 0 1 40 25 L40,40"/>
              </svg>
            ))}

            {/* Top seal */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.4rem' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'radial-gradient(circle at 30% 30%, #FFF8E1, #D4AF37 50%, #8B6508)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px rgba(0,0,0,.5), inset 0 2px 4px rgba(255,255,255,.6)' }}>
                <span className="font-serif" style={{ fontSize:'1.6rem', color:'#4A0A10', fontWeight:700 }}>囍</span>
              </div>
              <h3 className="font-script" style={{ fontSize:'2.4rem', color:'#F3E5AB', margin:0, textShadow:'0 2px 8px rgba(0,0,0,.6)' }}>Hồng Bao</h3>
              <p className="font-sans" style={{ fontSize:'10px', letterSpacing:'.3em', color:'rgba(243,229,171,.7)', textTransform:'uppercase', margin:0 }}>Đại Nghĩa & Thị Nhung</p>
            </div>

            {/* QR Code — visible on front */}
            <div style={{ background:'#fff', padding:'14px', borderRadius:'10px', boxShadow:'0 15px 35px rgba(0,0,0,.4)' }}>
              <img
                src="https://api.vietqr.io/image/970436-123456789-n5Q3mPQ.jpg?accountName=NGUYEN%20DAI%20NGHIA&amount=0&addInfo=Chuc%20Mung%20Dam%20Cuoi"
                alt="QR Code"
                style={{ width:'200px', height:'200px', display:'block' }}
              />
            </div>

            {/* Bottom bank info */}
            <div style={{ textAlign:'center' }}>
              <p className="font-sans" style={{ fontSize:'11px', letterSpacing:'.25em', color:'rgba(243,229,171,.8)', textTransform:'uppercase', marginBottom:'.3rem' }}>Vietcombank</p>
              <p className="font-script" style={{ fontSize:'1.5rem', color:'#F3E5AB', margin:0, textShadow:'0 1px 4px rgba(0,0,0,.5)' }}>Nguyễn Đại Nghĩa</p>
            </div>
          </div>

          {/* ── BACK: envelope_back_qr.png ── */}
          <div style={{
            position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            transform:'rotateY(180deg)',
            backgroundImage:'url("/envelope_back_qr.png")',
            backgroundSize:'cover', backgroundPosition:'center',
            borderRadius:'16px',
            boxShadow:'0 30px 70px rgba(0,0,0,.15)',
            border:'1px solid rgba(212,175,55,.35)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:'2rem',
            gap:'1.5rem',
            overflow:'hidden',
          }}>
            {/* Overlay so content stays readable over the patterned background */}
            <div style={{ position:'absolute', inset:0, background:'rgba(253,251,240,0.78)', pointerEvents:'none' }}/>

            <h3 className="font-script" style={{ fontSize:'2.5rem', color:'var(--cherry-dark)', margin:0, position:'relative', zIndex:1 }}>Thông Tin Chuyển Khoản</h3>
            <div className="divider-gold" style={{ position:'relative', zIndex:1 }}/>

            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'1rem', position:'relative', zIndex:1 }}>
              {[
                { label:'Chủ tài khoản', value:'Nguyễn Đại Nghĩa' },
                { label:'Số tài khoản',  value:'123 456 789' },
                { label:'Ngân hàng',     value:'Vietcombank' },
                { label:'Nội dung',      value:'Chúc mừng đám cưới' },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(212,175,55,.2)', paddingBottom:'.8rem' }}>
                  <span className="font-sans" style={{ fontSize:'11px', letterSpacing:'.1em', color:'var(--text-light)', textTransform:'uppercase' }}>{row.label}</span>
                  <span className="font-serif" style={{ fontSize:'1.1rem', color:'var(--cherry-dark)', fontWeight:500 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
