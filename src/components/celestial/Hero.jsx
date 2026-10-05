import { useMemo, useRef } from 'react';
import StarChart from './StarChart';
import { COUPLE, WEDDING, SKY } from '../../weddingData';
import { moonPhase, moonPhaseName } from '../../celestial/utils';

export default function Hero() {
  const stageRef = useRef(null);
  const [d, m, y] = WEDDING.date.split('.');

  const weddingMoon = useMemo(() => {
    const p = moonPhase(new Date(`${WEDDING.dateISO}T19:30:00+07:00`));
    return { p, name: moonPhaseName(p), lit: Math.round((1 - Math.cos(2 * Math.PI * p)) * 50) };
  }, []);

  const onMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const yy = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-yy * 12).toFixed(2)}deg`);
  };

  const onLeave = () => {
    stageRef.current?.style.setProperty('--rx', '0deg');
    stageRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="bau-troi" className="hero" onPointerMove={onMove} onPointerLeave={onLeave} aria-labelledby="hero-title">
      <div className="hero__meta" data-reveal>
        <span className="mono">Hồ sơ quan trắc № {SKY.catalogueNo}</span>
        <span className="mono hero__meta-right">{SKY.city} · {SKY.coords}</span>
      </div>

      <p className="hero__kicker" data-reveal style={{ '--d': '.15s' }}>
        Trân trọng báo tin Lễ Thành Hôn
      </p>

      <div className="hero__stage" ref={stageRef}>
        <aside className="hero__annot hero__annot--l" aria-hidden="true">
          <span className="hero__annot-k">Thời điểm</span>
          <span>{SKY.observedAt}</span>
          <span className="hero__annot-k">Hướng nhìn</span>
          <span>Thiên đỉnh</span>
          <span className="hero__annot-k">Chòm sao mới</span>
          <span>{SKY.constellationLatin}</span>
        </aside>

        <StarChart />

        <aside className="hero__annot hero__annot--r" aria-hidden="true">
          <span className="hero__annot-k">Pha trăng</span>
          <span>{weddingMoon.name}</span>
          <span className="hero__annot-k">Độ rọi</span>
          <span>{weddingMoon.lit}%</span>
          <span className="hero__annot-k">Khoảng cách</span>
          <span>0 năm ánh sáng</span>
        </aside>
      </div>

      <h1 id="hero-title" className="hero__names" data-reveal style={{ '--d': '.3s' }}>
        <span className="brass-text">{COUPLE.groom.firstName}</span>
        <span className="hero__amp">&amp;</span>
        <span className="brass-text">{COUPLE.bride.firstName}</span>
      </h1>

      <p className="hero__date" data-reveal style={{ '--d': '.45s' }}>
        <span>{d}</span>
        <i aria-hidden="true" />
        <span>{m}</span>
        <i aria-hidden="true" />
        <span>{y}</span>
      </p>
      <p className="hero__lunar" data-reveal style={{ '--d': '.55s' }}>
        {WEDDING.dateDisplay} — {WEDDING.lunarDate}
      </p>

      <a href="#loi-moi" className="hero__scroll" aria-label="Cuộn xuống lời mời">
        <span className="mono">Khám phá bầu trời</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
