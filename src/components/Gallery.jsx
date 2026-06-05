import React, { useState } from 'react';

const PHOTOS = [
  { src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1100&fit=crop&q=85', span:2 },
  { src:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=520&fit=crop&q=85', span:1 },
  { src:'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=520&fit=crop&q=85', span:1 },
  { src:'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=520&fit=crop&q=85', span:1 },
  { src:'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1100&fit=crop&q=85', span:2 },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="section section--dark" id="gallery">
      <div className="fade-up" style={{ textAlign:'center', marginBottom:'4rem' }}>
        <span className="eyebrow" style={{ color:'rgba(201,169,110,.7)', marginBottom:'1rem' }}>Khoảnh Khắc</span>
        <h2 className="f-script" style={{ fontSize:'clamp(3rem,7vw,5rem)', color:'var(--ivory)', lineHeight:1 }}>Bộ Sưu Tập</h2>
        <div className="rule-gold" style={{ width:'100px', margin:'1.5rem auto 0' }} />
      </div>

      {/* Grid */}
      <div style={{
        maxWidth:'980px', margin:'0 auto', padding:'0 1rem',
        display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem',
      }}>
        {PHOTOS.map((p,i) => (
          <div key={i} onClick={()=>setLightbox(i)} style={{
            gridColumn: p.span===2 ? 'span 2' : 'span 1',
            overflow:'hidden', cursor:'pointer', position:'relative',
          }}>
            <img src={p.src} alt="" style={{
              width:'100%', height: p.span===2 ? '420px' : '260px',
              objectFit:'cover', display:'block',
              transition:'transform .5s ease, filter .5s ease',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.filter='brightness(1.08)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.filter='brightness(1)';}}
            />
            <div style={{ position:'absolute',inset:0,background:'rgba(8,5,8,0)',transition:'background .3s',
              display:'flex',alignItems:'center',justifyContent:'center',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(8,5,8,.3)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(8,5,8,0)'}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={()=>setLightbox(null)} style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(8,5,8,.95)', display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer',
        }}>
          <img src={PHOTOS[lightbox].src} alt="" style={{ maxWidth:'90vw', maxHeight:'90vh', objectFit:'contain' }}/>
          {/* Nav */}
          {lightbox>0 && (
            <button onClick={e=>{e.stopPropagation();setLightbox(l=>l-1);}} style={{
              position:'absolute', left:'2rem', top:'50%', transform:'translateY(-50%)',
              background:'transparent', border:'1px solid rgba(201,169,110,.4)', color:'var(--gold)',
              fontSize:'1.5rem', padding:'.6rem 1rem', cursor:'pointer',
            }}>‹</button>
          )}
          {lightbox<PHOTOS.length-1 && (
            <button onClick={e=>{e.stopPropagation();setLightbox(l=>l+1);}} style={{
              position:'absolute', right:'2rem', top:'50%', transform:'translateY(-50%)',
              background:'transparent', border:'1px solid rgba(201,169,110,.4)', color:'var(--gold)',
              fontSize:'1.5rem', padding:'.6rem 1rem', cursor:'pointer',
            }}>›</button>
          )}
          <button onClick={()=>setLightbox(null)} style={{
            position:'absolute', top:'1.5rem', right:'1.5rem',
            background:'transparent', border:'none', color:'rgba(201,169,110,.6)',
            fontSize:'2rem', cursor:'pointer', lineHeight:1,
          }}>×</button>
        </div>
      )}
    </section>
  );
}
