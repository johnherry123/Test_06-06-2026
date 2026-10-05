import { ArrowUp } from 'lucide-react';
import MoonPhase from './MoonPhase';
import { COUPLE, WEDDING, SKY } from '../../weddingData';
import { lenisRef } from '../../celestial/utils';

export default function Finale() {
  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 2.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="finale">
      <div className="finale__moon" data-reveal>
        <MoonPhase phase={0.5} size={240} />
      </div>

      <blockquote className="finale__quote" data-reveal style={{ '--d': '.1s' }}>
        “Chúng ta đều được tạo nên từ bụi sao — và thật may mắn, bụi sao của anh đã tìm thấy em.”
      </blockquote>
      <p className="finale__cite mono" data-reveal style={{ '--d': '.2s' }}>
        Cảm ơn bạn đã là một phần trong bầu trời của chúng mình
      </p>

      <p className="finale__names" data-reveal style={{ '--d': '.3s' }}>
        <span className="brass-text">{COUPLE.groom.firstName}</span>
        <span className="finale__amp">&amp;</span>
        <span className="brass-text">{COUPLE.bride.firstName}</span>
      </p>
      <p className="finale__date mono brass" data-reveal style={{ '--d': '.4s' }}>
        {WEDDING.date.replace(/\./g, ' · ')}
      </p>

      <button id="finale-to-top" type="button" className="btn btn--ghost finale__top" onClick={toTop}>
        <ArrowUp size={14} strokeWidth={1.6} /> Về lại bầu trời
      </button>

      <div className="finale__foot">
        <span className="mono">
          {SKY.constellation} · {SKY.constellationLatin}
        </span>
        <span className="mono">
          {SKY.city} · {SKY.coords}
        </span>
      </div>
    </footer>
  );
}
