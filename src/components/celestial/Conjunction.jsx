import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { COUPLE, WEDDING } from '../../weddingData';
import { pad2, sparkle } from '../../celestial/utils';

const R_IN = 92;
const R_OUT = 158;

export default function Conjunction() {
  const target = useMemo(() => new Date(WEDDING.calendarTarget).getTime(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Surprise: a meteor shower the first time this section comes into view */
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.querySelector('.app.is-open')) {
          window.dispatchEvent(new CustomEvent('celestial:meteors', { detail: { count: 26 } }));
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const diff = Math.max(0, target - now);
  const done = diff === 0;
  const remDays = diff / 86400000;

  const parts = [
    { v: Math.floor(diff / 86400000), l: 'Ngày' },
    { v: Math.floor(diff / 3600000) % 24, l: 'Giờ' },
    { v: Math.floor(diff / 60000) % 60, l: 'Phút' },
    { v: Math.floor(diff / 1000) % 60, l: 'Giây' },
  ];

  // Both planets reach the top (-90°) exactly at the wedding moment.
  const aIn = ((-90 - remDays * 33) * Math.PI) / 180;
  const aOut = ((-90 - remDays * 11) * Math.PI) / 180;
  const pIn = [200 + R_IN * Math.cos(aIn), 200 + R_IN * Math.sin(aIn)];
  const pOut = [200 + R_OUT * Math.cos(aOut), 200 + R_OUT * Math.sin(aOut)];

  return (
    <section id="giao-hoi" className="section" aria-labelledby="conj-title" ref={sectionRef}>
      <SectionHeading
        index="IV"
        kicker="Dự Báo Thiên Văn"
        id="conj-title"
        title={
          <>
            Thời khắc <em>giao hội</em>
          </>
        }
      />

      <div className="conj">
        <div className="conj__orrery" data-reveal>
          <svg viewBox="0 0 400 400" role="img" aria-label="Mô hình hai hành tinh tiến dần về điểm giao hội">
            <defs>
              <radialGradient id="sunCore">
                <stop offset="0" stopColor="#fff7e0" />
                <stop offset="0.35" stopColor="#f0ddae" />
                <stop offset="1" stopColor="rgba(201,168,106,0)" />
              </radialGradient>
              <radialGradient id="planetA" cx="35%" cy="35%">
                <stop offset="0" stopColor="#e6ecff" />
                <stop offset="1" stopColor="#5a6cc0" />
              </radialGradient>
              <radialGradient id="planetB" cx="35%" cy="35%">
                <stop offset="0" stopColor="#fff1d6" />
                <stop offset="1" stopColor="#b9874d" />
              </radialGradient>
            </defs>

            <circle cx="200" cy="200" r="192" fill="none" stroke="#c9a86a" strokeWidth="0.4" opacity="0.35" />
            <circle className="conj__orbit" cx="200" cy="200" r={R_OUT} fill="none" stroke="#c9a86a" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.7" />
            <circle className="conj__orbit conj__orbit--rev" cx="200" cy="200" r={R_IN} fill="none" stroke="#afc2ff" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.6" />
            <circle cx="200" cy="200" r="34" fill="none" stroke="#c9a86a" strokeWidth="0.4" opacity="0.4" />

            {/* conjunction marker */}
            <line x1="200" y1="8" x2="200" y2="30" stroke="#f0ddae" strokeWidth="1" />
            <path d={sparkle(200, 18, 6)} fill="#f0ddae" className="conj__mark" />

            {/* sun */}
            <circle cx="200" cy="200" r="46" fill="url(#sunCore)" opacity="0.55" />
            <circle cx="200" cy="200" r="10" fill="#fff4d8" />

            {/* alignment line */}
            <line
              className="conj__beam"
              x1={pIn[0]}
              y1={pIn[1]}
              x2={pOut[0]}
              y2={pOut[1]}
              stroke="#f0ddae"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />

            {/* planets */}
            <g>
              <circle cx={pIn[0]} cy={pIn[1]} r="16" fill="rgba(175,194,255,0.18)" className="conj__halo" />
              <circle cx={pIn[0]} cy={pIn[1]} r="7.5" fill="url(#planetA)" />
              <text x={pIn[0]} y={pIn[1] + 26} textAnchor="middle" fill="#afc2ff" fontSize="10" letterSpacing="2" fontFamily="'IBM Plex Mono', monospace">
                {COUPLE.groom.firstName.toUpperCase()}
              </text>
            </g>
            <g>
              <circle cx={pOut[0]} cy={pOut[1]} r="18" fill="rgba(240,221,174,0.16)" className="conj__halo" />
              <circle cx={pOut[0]} cy={pOut[1]} r="9" fill="url(#planetB)" />
              <text x={pOut[0]} y={pOut[1] + 28} textAnchor="middle" fill="#f0ddae" fontSize="10" letterSpacing="2" fontFamily="'IBM Plex Mono', monospace">
                {COUPLE.bride.firstName.toUpperCase()}
              </text>
            </g>
          </svg>
        </div>

        <div className="conj__text" data-reveal style={{ '--d': '.15s' }}>
          <p className="mono brass">{done ? 'Đã giao hội' : 'Quỹ đạo đang hội tụ'}</p>
          <h3 className="conj__title">
            {done ? (
              <>
                Hai vì sao <em>đã về chung một bầu trời</em>
              </>
            ) : (
              <>
                Hai quỹ đạo sẽ gặp nhau tại <em>một điểm duy nhất</em>
              </>
            )}
          </h3>
          <p className="conj__when">
            {WEDDING.dateDisplay} · {new Date(WEDDING.calendarTarget).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' })}
          </p>

          <div className="conj__counter" role="timer" aria-label="Thời gian còn lại đến ngày cưới">
            {parts.map((p) => (
              <div key={p.l} className="conj__cell">
                <span className="conj__num">{pad2(p.v)}</span>
                <span className="conj__lbl mono">{p.l}</span>
              </div>
            ))}
          </div>

          <p className="conj__note">
            Như những hành tinh đi trên những quỹ đạo riêng, rồi một ngày gặp nhau ở cùng một điểm trên bầu trời —
            chúng mình đã đi một chặng dài để chờ khoảnh khắc ấy.
          </p>
        </div>
      </div>
    </section>
  );
}
