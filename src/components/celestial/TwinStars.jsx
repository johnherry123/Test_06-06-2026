import { useMemo } from 'react';
import SectionHeading from './SectionHeading';
import { COUPLE } from '../../weddingData';
import { imgFallback } from '../../celestial/utils';

function EyepieceRing() {
  const ticks = useMemo(() => {
    let d = '';
    for (let i = 0; i < 72; i += 1) {
      const a = (i * 5 * Math.PI) / 180;
      const r2 = i % 6 === 0 ? 89 : 94;
      d += `M${(100 + 98 * Math.cos(a)).toFixed(2)} ${(100 + 98 * Math.sin(a)).toFixed(2)}L${(100 + r2 * Math.cos(a)).toFixed(2)} ${(100 + r2 * Math.sin(a)).toFixed(2)}`;
    }
    return d;
  }, []);

  return (
    <svg className="eyepiece__ring" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="99" fill="none" stroke="#c9a86a" strokeWidth="0.6" />
      <path d={ticks} stroke="#c9a86a" strokeWidth="0.6" />
      <g stroke="#f0ddae" strokeWidth="0.5" opacity="0.65">
        <line x1="100" y1="14" x2="100" y2="34" />
        <line x1="100" y1="166" x2="100" y2="186" />
        <line x1="14" y1="100" x2="34" y2="100" />
        <line x1="166" y1="100" x2="186" y2="100" />
      </g>
    </svg>
  );
}

function StarCard({ person, designation, delay }) {
  return (
    <article className="star-card" data-reveal style={{ '--d': delay }}>
      <div className="eyepiece">
        <img
          src={person.photo.src}
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          onError={imgFallback(person.photo.fallback)}
        />
        <EyepieceRing />
      </div>
      <p className="star-card__desig mono">{designation}</p>
      <h3 className="star-card__name">{person.fullName}</h3>
      <p className="star-card__title">
        {person.role} · {person.title}
      </p>
      <blockquote className="star-card__quote">{person.quote}</blockquote>
      <dl className="star-card__table">
        <div>
          <dt className="mono">Danh xưng</dt>
          <dd>{person.roleLabel}</dd>
        </div>
        {person.details.map((row) => (
          <div key={row.label}>
            <dt className="mono">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function TwinStars() {
  return (
    <section id="hai-vi-sao" className="section" aria-labelledby="twins-title">
      <SectionHeading
        index="II"
        kicker="Hồ Sơ Hai Vì Sao"
        id="twins-title"
        title={
          <>
            Hai quỹ đạo, <em>một định mệnh</em>
          </>
        }
        lede="Mỗi vì sao đều có ánh sáng riêng. Nhưng chỉ khi đứng cạnh nhau, chúng mới tạo thành một chòm sao có tên."
      />

      <div className="twins">
        <StarCard person={COUPLE.groom} designation="α · Sao chủ Nhà Trai" delay=".05s" />
        <div className="twins__bridge" data-reveal style={{ '--d': '.25s' }} aria-hidden="true">
          <span className="twins__line" />
          <span className="twins__dist brass-text">0</span>
          <span className="mono">năm ánh sáng</span>
          <span className="twins__line" />
        </div>
        <StarCard person={COUPLE.bride} designation="α · Sao chủ Nhà Gái" delay=".15s" />
      </div>
    </section>
  );
}
