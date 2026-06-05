import React, { useState } from 'react';

export default function RSVP() {
  const [form, setForm] = useState({ name: '', attend: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.attend) return alert('Vui lòng nhập tên và xác nhận tham dự.');
    setSubmitted(true);
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-pearl)' }}>
      <div className="fade-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{
          background: '#FFF',
          padding: '4rem 3rem',
          boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
          border: '1px solid rgba(212,175,55,0.2)',
          textAlign: 'center'
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <h2 className="font-script" style={{ fontSize: '3.5rem', color: 'var(--cherry-dark)', margin: '0 0 1rem' }}>Phúc Đáp</h2>
              <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '3rem' }}>Vui lòng phản hồi trước ngày 10/10/2026</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <input
                  type="text" placeholder="Tên khách mời" required
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  style={{
                    width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--gold-champagne)',
                    padding: '1rem 0', color: 'var(--text-dark)', fontFamily: '"Playfair Display", serif', fontSize: '1.2rem',
                    outline: 'none', textAlign: 'center'
                  }}
                />
                
                <div>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    {['Sẽ tham dự', 'Rất tiếc'].map(opt => (
                      <label key={opt} style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                        fontFamily: '"Montserrat", sans-serif', fontSize: '13px', color: 'var(--text-dark)'
                      }}>
                        <input type="radio" name="attend" value={opt} checked={form.attend === opt} onChange={e => setForm({...form, attend: e.target.value})} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Lời nhắn nhủ..." rows="2"
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  style={{
                    width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--gold-champagne)',
                    padding: '1rem 0', color: 'var(--text-dark)', fontFamily: '"Playfair Display", serif', fontSize: '1.1rem',
                    outline: 'none', resize: 'none', textAlign: 'center'
                  }}
                />

                <button type="submit" style={{
                  marginTop: '2rem', padding: '1rem 3rem', background: 'var(--cherry-primary)', color: '#FFF',
                  border: 'none', cursor: 'pointer', fontFamily: '"Montserrat", sans-serif', fontSize: '11px', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.2em', transition: 'background 0.3s'
                }}>Gửi Phúc Đáp</button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="font-script" style={{ fontSize: '4rem', color: 'var(--cherry-dark)', margin: '0 0 1rem' }}>Đa Tạ</h3>
              <p className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontStyle: 'italic' }}>Gia đình vô cùng trân trọng sự hồi âm của quý vị.<br/>Kính chúc vạn sự như ý!</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
