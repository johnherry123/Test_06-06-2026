import { useMemo } from 'react';
import { MapPin, Navigation, CalendarPlus } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MoonPhase from './MoonPhase';
import { COUPLE, WEDDING, TRADITIONAL_PARTIES } from '../../weddingData';
import { googleCalendarUrl, moonPhase, moonPhaseName } from '../../celestial/utils';

const MONTHS = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];
const DOW = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const NUMERALS = ['I', 'II', 'III', 'IV'];

function Calendar() {
  const [Y, M, D] = WEDDING.dateISO.split('-').map(Number);

  const cells = useMemo(() => {
    const first = new Date(Y, M - 1, 1);
    const daysIn = new Date(Y, M, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    const out = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysIn; d += 1) {
      const date = new Date(Y, M - 1, d, 19, 30);
      out.push({ d, phase: moonPhase(date), sunday: date.getDay() === 0 });
    }
    return out;
  }, [Y, M]);

  const target = cells.find((c) => c && c.d === D);

  return (
    <aside className="cal" data-reveal aria-label={`Lịch ${MONTHS[M - 1]} ${Y}`}>
      <header className="cal__head">
        <p className="cal__month">{MONTHS[M - 1]}</p>
        <p className="mono">{Y}</p>
      </header>
      <div className="cal__grid">
        {DOW.map((d) => (
          <span key={d} className="cal__dow mono">
            {d}
          </span>
        ))}
        {cells.map((c, i) =>
          c ? (
            <span
              key={i}
              className={`cal__day${c.sunday ? ' cal__day--sun' : ''}${c.d === D ? ' cal__day--target' : ''}`}
              title={moonPhaseName(c.phase)}
            >
              <span className="cal__num">{c.d}</span>
              <MoonPhase phase={c.phase} size={14} glow={false} craters={false} />
            </span>
          ) : (
            <span key={i} aria-hidden="true" />
          ),
        )}
      </div>
      <footer className="cal__foot">
        <span className="mono">Ngày giao hội</span>
        <span className="cal__foot-v">
          {D}.{String(M).padStart(2, '0')} — {target ? moonPhaseName(target.phase) : ''}
        </span>
      </footer>
    </aside>
  );
}

function EventPlate({ ev, num, delay }) {
  const calUrl = googleCalendarUrl({
    title: `${ev.title} · ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`,
    dateISO: WEDDING.dateISO,
    start: ev.timeCeremony,
    end: ev.timeBanquet,
    endAddMinutes: 150,
    details: `${ev.subtitle}\n${ev.parents}\n${ev.brideGroomLine}`,
    location: ev.address,
  });

  return (
    <article className="event" data-num={num} data-reveal style={{ '--d': delay }}>
      <header className="event__head">
        <span className="mono brass">Quan trắc № {num}</span>
        <span className="event__badge mono">{ev.badge}</span>
      </header>
      <h3 className="event__title">{ev.title}</h3>
      <p className="event__sub">{ev.subtitle}</p>
      <p className="event__parents">{ev.parents}</p>

      <div className="event__times">
        <div className="event__time">
          <span className="event__clock">{ev.timeCeremony}</span>
          <span className="mono">{ev.labelCeremony}</span>
        </div>
        <div className="event__time">
          <span className="event__clock">{ev.timeBanquet}</span>
          <span className="mono">{ev.labelBanquet}</span>
        </div>
      </div>

      <p className="event__addr">
        <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
        <span>{ev.address}</span>
      </p>

      <div className="event__actions">
        <a id={`event-map-${ev.id}`} className="btn btn--ghost btn--sm" href={ev.mapUrl} target="_blank" rel="noopener noreferrer">
          <Navigation size={14} strokeWidth={1.6} /> Chỉ đường
        </a>
        <a id={`event-cal-${ev.id}`} className="btn btn--ghost btn--sm" href={calUrl} target="_blank" rel="noopener noreferrer">
          <CalendarPlus size={14} strokeWidth={1.6} /> Lưu vào lịch
        </a>
      </div>
    </article>
  );
}

export default function Almanac() {
  const events = [TRADITIONAL_PARTIES.nhaGai, TRADITIONAL_PARTIES.nhaTrai];

  return (
    <section id="toa-do" className="section" aria-labelledby="almanac-title">
      <SectionHeading
        index="V"
        kicker="Niên Giám Ngày Vui"
        id="almanac-title"
        title={
          <>
            Tọa độ <em>của hạnh phúc</em>
          </>
        }
        lede={`${WEDDING.dateDisplay} · ${WEDDING.lunarDate}`}
      />

      <div className="almanac">
        <Calendar />
        <div className="events">
          {events.map((ev, i) => (
            <EventPlate key={ev.id} ev={ev} num={NUMERALS[i]} delay={`${0.1 + i * 0.12}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}
