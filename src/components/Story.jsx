import { STORY, COUPLE } from '../weddingData';
import { Heart } from 'lucide-react';

export default function Story() {
  return (
    <section
      id="story"
      aria-label="Câu chuyện tình yêu của chúng mình"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EDE1 50%, #FAF7F2 100%)',
        padding: 'clamp(70px, 10vw, 110px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 7vw, 68px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Heart size={12} fill="currentColor" />
            Câu Chuyện Tình Yêu
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.8rem, 6.5vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.1,
              margin: '0 0 8px 0',
              fontWeight: 400,
            }}
          >
            Hành Trình Yêu Thương
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
            }}
          >
            "Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng."
          </p>
        </div>

        {/* ── VERTICAL TIMELINE CONTAINER ── */}
        <div
          style={{
            position: 'relative',
            padding: '20px 0',
          }}
        >
          {/* Central Timeline Golden Line */}
          <div
            aria-hidden="true"
            className="timeline-line"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, transparent, #C5A059 10%, #C5A059 90%, transparent)',
            }}
          />

          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 6vw, 60px)' }}>
            {STORY.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="gsap-reveal story-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    position: 'relative',
                  }}
                >
                  {/* Content Card Side */}
                  <div
                    className="story-card-wrapper"
                    style={{
                      width: '45%',
                      textAlign: isEven ? 'right' : 'left',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '16px',
                        padding: 'clamp(20px, 4vw, 28px)',
                        boxShadow: '0 10px 30px -6px rgba(45, 30, 20, 0.07)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 16px 36px -6px rgba(45, 30, 20, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px -6px rgba(45, 30, 20, 0.07)';
                      }}
                    >
                      {/* Year badge */}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 12px',
                          borderRadius: '999px',
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          color: '#9A7836',
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          marginBottom: '10px',
                        }}
                      >
                        {item.year}
                      </span>

                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
                          fontWeight: 600,
                          color: '#1E1612',
                          lineHeight: 1.25,
                          marginBottom: '8px',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '0.82rem',
                          color: '#584A42',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Dot with Heart */}
                  <div
                    aria-hidden="true"
                    className="story-node"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#801D24',
                      boxShadow: '0 0 14px rgba(197, 160, 89, 0.4)',
                      zIndex: 3,
                    }}
                  >
                    <Heart size={14} fill="#801D24" />
                  </div>

                  {/* Photo Side */}
                  <div
                    className="story-photo-wrapper"
                    style={{
                      width: '45%',
                    }}
                  >
                    {item.photo?.src && (
                      <div
                        style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          aspectRatio: '4 / 3',
                          border: '2px solid rgba(197, 160, 89, 0.3)',
                          boxShadow: '0 12px 28px -6px rgba(45, 30, 20, 0.10)',
                        }}
                      >
                        <img
                          src={item.photo.src}
                          alt={item.photo.alt || item.title}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.8s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.06)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Loving Quote */}
        <div
          className="gsap-reveal"
          style={{
            textAlign: 'center',
            marginTop: 'clamp(40px, 7vw, 64px)',
            paddingTop: '24px',
            borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
          }}
        >
          <p
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.0rem, 4.5vw, 2.8rem)',
              color: '#801D24',
              margin: '0 0 6px 0',
            }}
          >
            Đại Nghĩa &amp; Thị Nhung
          </p>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.74rem',
              color: '#9A7836',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            20 · 10 · 2026 — Hẹn ước trăm năm
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .timeline-line {
            left: 20px !important;
          }
          .story-node {
            left: 20px !important;
          }
          .story-item-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-left: 46px !important;
            gap: 16px !important;
          }
          .story-card-wrapper,
          .story-photo-wrapper {
            width: 100% !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
