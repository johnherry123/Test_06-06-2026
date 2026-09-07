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
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '840px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 60px)' }}>
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
              marginBottom: '12px',
            }}
          >
            <Heart size={12} fill="currentColor" />
            Câu Chuyện Tình Yêu
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Hành Trình Yêu Thương
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '540px',
              margin: '0 auto',
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
            width: '100%',
            boxSizing: 'border-box',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vw, 56px)', width: '100%', boxSizing: 'border-box' }}>
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
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Content Card Side */}
                  <div
                    className="story-card-wrapper"
                    style={{
                      width: '45%',
                      textAlign: isEven ? 'right' : 'left',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '16px',
                        padding: 'clamp(18px, 3.5vw, 26px)',
                        boxShadow: '0 10px 30px -6px rgba(45, 30, 20, 0.07)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        width: '100%',
                        boxSizing: 'border-box',
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
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          marginBottom: '8px',
                        }}
                      >
                        {item.year}
                      </span>

                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 'clamp(1.2rem, 2.3vw, 1.55rem)',
                          fontWeight: 600,
                          color: '#1E1612',
                          lineHeight: 1.25,
                          marginBottom: '6px',
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '0.80rem',
                          color: '#584A42',
                          lineHeight: 1.6,
                          margin: 0,
                          wordBreak: 'break-word',
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
                      width: '30px',
                      height: '30px',
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
                    <Heart size={13} fill="#801D24" />
                  </div>

                  {/* Photo Side */}
                  <div
                    className="story-photo-wrapper"
                    style={{
                      width: '45%',
                      boxSizing: 'border-box',
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
                          width: '100%',
                          boxSizing: 'border-box',
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
            marginTop: 'clamp(36px, 6vw, 56px)',
            paddingTop: '20px',
            borderTop: '1px dashed rgba(197, 160, 89, 0.35)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
              color: '#801D24',
              margin: '0 0 4px 0',
              wordBreak: 'break-word',
            }}
          >
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
          </p>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem',
              color: '#9A7836',
              letterSpacing: '0.10em',
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
            left: 15px !important;
            top: 10px !important;
            bottom: 20px !important;
            width: 2px !important;
            transform: none !important;
          }
          .story-node {
            position: absolute !important;
            left: 4px !important;
            top: 16px !important;
            transform: none !important;
            width: 24px !important;
            height: 24px !important;
          }
          .story-item-row {
            flex-direction: column !important;
            align-items: stretch !important;
            padding-left: 38px !important;
            padding-right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            gap: 12px !important;
            position: relative !important;
          }
          .story-card-wrapper,
          .story-photo-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            text-align: left !important;
            box-sizing: border-box !important;
          }
          .story-card-wrapper > div {
            padding: 16px 14px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}
