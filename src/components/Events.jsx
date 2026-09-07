import { Clock, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { EVENTS, WEDDING, COUPLE } from '../weddingData';

function createCalendarUrl(event) {
  const title = encodeURIComponent(`${event.title} | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`);
  const details = encodeURIComponent(`${event.subtitle}. ${event.description}`);
  const location = encodeURIComponent(event.address);
  // Default date: 2026-10-20
  let startTime = '103000Z';
  let endTime = '123000Z';
  if (event.time.startsWith('07')) {
    startTime = '003000Z'; endTime = '023000Z';
  } else if (event.time.startsWith('10')) {
    startTime = '033000Z'; endTime = '053000Z';
  } else if (event.time.startsWith('17')) {
    startTime = '103000Z'; endTime = '143000Z';
  }
  const dates = `20261020T${startTime}/20261020T${endTime}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export default function Events() {
  return (
    <section
      id="events"
      aria-label="Lịch trình lễ cưới và tiệc mừng"
      style={{
        backgroundColor: '#F5EDE1',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EDE1 50%, #FAF7F2 100%)',
        padding: 'clamp(70px, 10vw, 110px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '920px',
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
              marginBottom: '12px',
            }}
          >
            <Calendar size={13} />
            Lịch Trình Hôn Lễ
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
            Thời Gian &amp; Địa Điểm
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
            {WEDDING.dateDisplay} — {WEDDING.lunarDate}
          </p>
        </div>

        {/* ── 3 LUXURY EVENT CARDS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 4vw, 32px)',
          }}
        >
          {EVENTS.map((event) => {
            const calUrl = createCalendarUrl(event);

            return (
              <div
                key={event.id}
                className="gsap-reveal"
                style={{
                  backgroundColor: event.isMain ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                  border: event.isMain ? '2px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.35)',
                  borderRadius: '20px',
                  padding: 'clamp(28px, 5vw, 36px) clamp(20px, 4vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: event.isMain
                    ? '0 16px 40px -8px rgba(128, 29, 36, 0.15)'
                    : '0 8px 24px -4px rgba(50, 30, 15, 0.06)',
                  transform: event.isMain ? 'scale(1.02)' : 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = event.isMain ? 'scale(1.04)' : 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px -8px rgba(128, 29, 36, 0.20)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = event.isMain ? 'scale(1.02)' : 'none';
                  e.currentTarget.style.boxShadow = event.isMain
                    ? '0 16px 40px -8px rgba(128, 29, 36, 0.15)'
                    : '0 8px 24px -4px rgba(50, 30, 15, 0.06)';
                }}
              >
                {/* Main Event Gold Ribbon */}
                {event.isMain && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #C5A059 0%, #E6CA85 50%, #A88135 100%)',
                      color: '#1E1612',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '4px 18px',
                      borderRadius: '999px',
                      boxShadow: '0 4px 12px rgba(197, 160, 89, 0.35)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✦ Sự Kiện Chính ✦
                  </div>
                )}

                {/* Time Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#801D24',
                    marginBottom: '14px',
                  }}
                >
                  <Clock size={16} color="#801D24" />
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {event.time}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      background: 'rgba(128, 29, 36, 0.08)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {event.period}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1.4rem, 2.8vw, 1.8rem)',
                    fontWeight: 600,
                    color: '#1E1612',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                  }}
                >
                  {event.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.98rem',
                    fontStyle: 'italic',
                    color: '#C5A059',
                    fontWeight: 500,
                    marginBottom: '14px',
                  }}
                >
                  {event.subtitle}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '0.80rem',
                    color: '#584A42',
                    lineHeight: 1.65,
                    marginBottom: '18px',
                    flex: 1,
                  }}
                >
                  {event.description}
                </p>

                {/* Location */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(245, 237, 225, 0.6)',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    marginBottom: '18px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MapPin size={14} color="#801D24" />
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#1E1612',
                      }}
                    >
                      {event.locationName}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      color: '#7C6E66',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {event.address}
                  </p>
                </div>

                {/* Action Buttons: Maps & Calendar */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: event.isMain ? '#801D24' : '#FFFFFF',
                      color: event.isMain ? '#FFFFFF' : '#801D24',
                      border: '1px solid #801D24',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <ExternalLink size={13} />
                    Chỉ đường
                  </a>

                  <a
                    href={calUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(197, 160, 89, 0.15)',
                      color: '#9A7836',
                      border: '1px solid rgba(197, 160, 89, 0.4)',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.15)';
                    }}
                  >
                    <Calendar size={13} />
                    Thêm vào lịch
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
