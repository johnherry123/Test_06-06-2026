/* ══════════════════════════════════════════════════════════════════════
   HERO — Full-Bleed Editorial [REWORKED]
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION:
   The photograph IS the hero. Names emerge FROM within the photograph —
   not placed beside it. This creates cinema, not layout.

   Structure:
   [full-bleed photo — 100% wide, ~72vh tall, cover]
   [gradient overlay — bottom third, dark espresso → transparent]
   [names + date — absolute, overlaid on bottom of photo, large]
   [CTAs — below photo, on ivory background]
   [Countdown — typographic, no boxes]

   Previous version problems:
   • Photo was capped at 600px centered — felt like a thumbnail
   • Names were above the photo — disconnected from image
   • Countdown used generic dashboard boxes with borders
   • Section felt like a SaaS landing page with a wedding photo attached

   New version:
   • Photo: 100% width, clamp(58vh, 72vh, 720px) height
   • Names: absolute overlay, lower third, large Playfair Display
   • Text-shadow for photo legibility (not a card, not a box — just shadow)
   • Countdown: pure typography, colon separators, no unit containers
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE, WEDDING, INTRO_PHOTO } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

const HERO_PHOTO = INTRO_PHOTO;

/* ── Typographic Countdown — no boxes, pure numbers ── */
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING.calendarTarget).getTime();
    const update = () => {
      const dist = target - Date.now();
      if (dist > 0) {
        setTimeLeft({
          days:    Math.floor(dist / 86400000),
          hours:   Math.floor((dist % 86400000) / 3600000),
          minutes: Math.floor((dist % 3600000) / 60000),
          seconds: Math.floor((dist % 60000) / 1000),
        });
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Ngày',  value: timeLeft.days },
    { label: 'Giờ',   value: timeLeft.hours },
    { label: 'Phút',  value: timeLeft.minutes },
    { label: 'Giây',  value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Đếm ngược đến ngày cưới"
      style={{
        backgroundColor: '#F8F4EC',
        padding: 'clamp(48px, 7vw, 72px) 24px',
        borderTop: '1px solid rgba(35,27,21,0.06)',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>

        {/* Numbers — large, typographic, with colon separators */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 0,
        }}>
          {units.map((u, i) => (
            <Fragment key={i}>
              <div style={{ textAlign: 'center', padding: '0 clamp(6px, 1.5vw, 14px)' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
                  fontWeight: 400,
                  color: '#231B15',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: 'clamp(44px, 8vw, 80px)',
                }}>
                  {String(u.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.56rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#9E9188',
                  marginTop: '8px',
                }}>
                  {u.label}
                </div>
              </div>
              {i < 3 && (
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: 'rgba(184,149,85,0.40)',
                  lineHeight: 1,
                  /* Vertically align with numbers top, not bottom */
                  alignSelf: 'flex-start',
                  paddingTop: '2px',
                }}>
                  ·
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Single thin champagne rule — the only decoration */}
        <div style={{
          width: '28px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.55), transparent)',
          margin: 'clamp(20px, 3vw, 28px) auto 0',
        }} />

      </div>
    </section>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const sectionRef  = useRef(null);
  const photoRef    = useRef(null);
  const overlayRef  = useRef(null);
  const nameRef     = useRef(null);
  const belowRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Name reveal — staggered from bottom */
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
        );
      }

      /* CTA row below photo */
      if (belowRef.current) {
        gsap.fromTo(
          belowRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.55 }
        );
      }

      /* Very subtle parallax on the photo — adds depth while scrolling */
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToCalendar = () => {
    const t = encodeURIComponent('Lễ Thành Hôn: Đại Nghĩa & Thị Nhung');
    const l = encodeURIComponent(WEDDING.venueAddress);
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=20261020T103000Z/20261020T143000Z&location=${l}`,
      '_blank', 'noopener noreferrer'
    );
  };

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        aria-label="Thiệp cưới Đại Nghĩa và Thị Nhung"
        style={{
          position: 'relative',
          /* Dark base — photo is the first thing you see, edge to edge */
          backgroundColor: '#1A100A',
          overflow: 'hidden',
        }}
      >

        {/* ── Full-bleed hero photograph ──
             100% wide, tall enough to be cinematic.
             Photo scales down gracefully on mobile via clamp on height. */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(58vh, 72vh, 720px)',
            overflow: 'hidden',
          }}
        >
          <img
            ref={photoRef}
            src={HERO_PHOTO.src}
            alt={HERO_PHOTO.alt}
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 28%',
              display: 'block',
              /* Will-change for smooth parallax */
              willChange: 'transform',
            }}
            onError={e => { e.currentTarget.src = HERO_PHOTO.fallback; }}
          />

          {/* ── Gradient overlay — bottom 2/3 darkening ──
               Strong enough for white names to be legible,
               Soft enough that photo still reads as the subject. */}
          <div
            ref={overlayRef}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: `
                linear-gradient(
                  to top,
                  rgba(20,12,6,0.92) 0%,
                  rgba(20,12,6,0.70) 22%,
                  rgba(20,12,6,0.30) 45%,
                  rgba(20,12,6,0.08) 65%,
                  transparent 80%
                )
              `,
              pointerEvents: 'none',
            }}
          />

          {/* ── Names overlay — absolute, lower third of photo ──
               Large editorial serif. Names emerge FROM within the photograph.
               This is the hero typographic moment. */}
          <div
            ref={nameRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(20px, 4vw, 48px) clamp(20px, 5vw, 64px) clamp(28px, 5vw, 48px)',
              textAlign: 'center',
            }}
          >

            {/* Save the date eyebrow */}
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.60rem, 1.1vw, 0.68rem)',
              fontWeight: 500,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(196,168,100,0.80)',
              marginBottom: 'clamp(10px, 2vw, 16px)',
            }}>
              Save the Date
            </p>

            {/* Groom — large, warm white */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 9.5vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: 'rgba(253,248,240,0.97)',
              margin: 0,
              letterSpacing: '-0.025em',
              /* Subtle text shadow — photo legibility without hard border */
              textShadow: '0 2px 32px rgba(0,0,0,0.32), 0 1px 8px rgba(0,0,0,0.24)',
            }}>
              {COUPLE.groom.firstName}
            </h1>

            {/* Ampersand — champagne, italic, smaller */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(196,168,100,0.85)',
              lineHeight: 1,
              margin: 'clamp(2px, 0.5vw, 6px) 0',
            }}>
              &amp;
            </div>

            {/* Bride — same scale */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.2rem, 9.5vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: 'rgba(253,248,240,0.97)',
              margin: 0,
              letterSpacing: '-0.025em',
              textShadow: '0 2px 32px rgba(0,0,0,0.32), 0 1px 8px rgba(0,0,0,0.24)',
            }}>
              {COUPLE.bride.firstName}
            </h1>

          </div>
        </div>

        {/* ── Below photo: date + CTAs on ivory ──
             Ivory background immediately below photo — rhythm shift from dark to light.
             Clean transition. No decorative elements — just date, place, actions. */}
        <div
          ref={belowRef}
          style={{
            backgroundColor: '#F8F4EC',
            padding: 'clamp(28px, 4.5vw, 44px) clamp(20px, 5vw, 64px)',
            textAlign: 'center',
          }}
        >
          {/* Date + Venue */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#756B63',
            marginBottom: 'clamp(20px, 3.5vw, 30px)',
            letterSpacing: '0.02em',
          }}>
            {WEDDING.dateDisplay}&nbsp;·&nbsp;{WEDDING.venue}, TP. Hồ Chí Minh
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}>
            <a
              href="#rsvp"
              className="btn-primary"
              onClick={e => {
                e.preventDefault();
                document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Xác nhận tham dự đám cưới Đại Nghĩa và Thị Nhung"
            >
              Xác nhận tham dự
            </a>
            <button
              onClick={addToCalendar}
              className="btn-secondary"
              aria-label="Lưu ngày cưới vào Google Calendar"
            >
              Lưu vào lịch
            </button>
          </div>
        </div>

      </section>

      {/* Countdown — separate section, typographic redesign */}
      <CountdownSection />
    </>
  );
}
