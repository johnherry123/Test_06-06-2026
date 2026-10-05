import { useMemo, useState } from 'react';
import { Minus, Plus, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { WISHES_SEED } from '../../weddingData';
import { hashString, mulberry32 } from '../../celestial/utils';

const STORE_KEY = 'thienvan_wishes_v1';

function loadWishes() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function placeOf(w) {
  const r = mulberry32(hashString(`${w.id}|${w.name}`));
  return { x: 7 + r() * 86, y: 18 + r() * 60, s: 3 + r() * 3.5, tw: 2.6 + r() * 4, td: -r() * 5 };
}

export default function SignalSky({ notify }) {
  const [mine, setMine] = useState(loadWishes);
  const [form, setForm] = useState({ name: '', side: 'Nhà trai', attend: 'yes', guests: 1, message: '' });
  const [error, setError] = useState('');
  const [sentId, setSentId] = useState(null);
  const [active, setActive] = useState(null);

  const wishes = useMemo(
    () => [...WISHES_SEED, ...mine].sort((a, b) => a.ts - b.ts).map((w) => ({ ...w, pos: placeOf(w) })),
    [mine],
  );
  const activeWish = wishes.find((w) => w.id === active);
  const linePoints = wishes.map((w) => `${w.pos.x.toFixed(2)},${w.pos.y.toFixed(2)}`).join(' ');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    if (!name) {
      setError('Xin cho chúng mình biết tên của bạn nhé.');
      return;
    }
    if (!message) {
      setError('Hãy gửi một lời chúc để thắp sáng vì sao của bạn.');
      return;
    }
    const wish = {
      id: `w${Date.now()}`,
      name: name.slice(0, 40),
      message: message.slice(0, 280),
      side: form.side,
      attend: form.attend,
      guests: form.attend === 'yes' ? form.guests : 0,
      ts: Date.now(),
    };
    const next = [...mine, wish];
    setMine(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in memory */
    }
    setSentId(wish.id);
    setActive(null);
    setError('');
    setForm((f) => ({ ...f, message: '' }));
    notify?.('Tín hiệu của bạn đã bay lên bầu trời ✦');
    window.dispatchEvent(new CustomEvent('celestial:meteors', { detail: { count: 18 } }));
    setTimeout(() => setActive(wish.id), 2300);
  };

  const cardStyle = activeWish
    ? {
        ...(activeWish.pos.x > 55 ? { right: `calc(${100 - activeWish.pos.x}% + 16px)` } : { left: `calc(${activeWish.pos.x}% + 16px)` }),
        ...(activeWish.pos.y > 50 ? { bottom: `calc(${100 - activeWish.pos.y}% + 10px)` } : { top: `calc(${activeWish.pos.y}% + 10px)` }),
      }
    : undefined;

  return (
    <section id="tin-hieu" className="section" aria-labelledby="signal-title">
      <SectionHeading
        index="VII"
        kicker="Gửi Tín Hiệu"
        id="signal-title"
        title={
          <>
            Thắp một vì sao <em>cho chúng mình</em>
          </>
        }
        lede="Xác nhận tham dự và để lại lời chúc — mỗi lời chúc sẽ trở thành một vì sao trên bầu trời của ngày vui."
      />

      <div className="signal">
        <form className="rsvp" onSubmit={submit} noValidate data-reveal>
          <div className="field">
            <label className="field__label mono" htmlFor="rsvp-name">
              Tên của bạn
            </label>
            <input
              id="rsvp-name"
              className="input"
              type="text"
              autoComplete="name"
              placeholder="Ví dụ: Minh Anh & gia đình"
              value={form.name}
              onChange={set('name')}
              maxLength={40}
            />
          </div>

          <fieldset className="field">
            <legend className="field__label mono">Bạn là khách của</legend>
            <div className="choice">
              {['Nhà trai', 'Nhà gái'].map((o) => (
                <label key={o} className="choice__opt">
                  <input type="radio" name="rsvp-side" value={o} checked={form.side === o} onChange={set('side')} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="field">
            <legend className="field__label mono">Bạn sẽ</legend>
            <div className="choice">
              {[
                ['yes', 'Chắc chắn có mặt'],
                ['no', 'Gửi lời chúc từ xa'],
              ].map(([v, l]) => (
                <label key={v} className="choice__opt">
                  <input type="radio" name="rsvp-attend" value={v} checked={form.attend === v} onChange={set('attend')} />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {form.attend === 'yes' && (
            <div className="field">
              <span className="field__label mono" id="rsvp-guests-label">
                Số người tham dự
              </span>
              <div className="stepper" role="group" aria-labelledby="rsvp-guests-label">
                <button
                  id="rsvp-guests-minus"
                  type="button"
                  aria-label="Giảm"
                  onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                >
                  <Minus size={14} />
                </button>
                <output className="stepper__value" aria-live="polite">
                  {form.guests}
                </output>
                <button
                  id="rsvp-guests-plus"
                  type="button"
                  aria-label="Tăng"
                  onClick={() => setForm((f) => ({ ...f, guests: Math.min(6, f.guests + 1) }))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="field">
            <label className="field__label mono" htmlFor="rsvp-message">
              Lời chúc
            </label>
            <textarea
              id="rsvp-message"
              className="input textarea"
              rows={3}
              placeholder="Gửi đôi lời đến cô dâu chú rể…"
              value={form.message}
              onChange={set('message')}
              maxLength={280}
            />
          </div>

          {error && (
            <p className="rsvp__error" role="alert">
              {error}
            </p>
          )}

          <button id="rsvp-submit" type="submit" className="btn rsvp__submit">
            <Send size={15} strokeWidth={1.6} /> Gửi tín hiệu lên bầu trời
          </button>
        </form>

        <div className="wish-sky" data-reveal style={{ '--d': '.15s' }} onMouseLeave={() => setActive(null)}>
          <div className="wish-sky__head">
            <span className="mono brass">Bầu trời lời chúc</span>
            <span className="mono">{wishes.length} vì sao</span>
          </div>

          <svg className="wish-sky__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={linePoints} fill="none" stroke="#c9a86a" strokeWidth="0.6" vectorEffect="non-scaling-stroke" opacity="0.35" />
          </svg>

          {wishes.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`wish${active === w.id ? ' is-active' : ''}${sentId === w.id ? ' is-new' : ''}`}
              style={{ left: `${w.pos.x}%`, top: `${w.pos.y}%`, '--s': `${w.pos.s}px`, '--tw': `${w.pos.tw}s`, '--td': `${w.pos.td}s` }}
              onMouseEnter={() => setActive(w.id)}
              onFocus={() => setActive(w.id)}
              onClick={() => setActive((a) => (a === w.id ? null : w.id))}
              aria-label={`Lời chúc của ${w.name}`}
            >
              <span className="wish__core" />
            </button>
          ))}

          {activeWish && (
            <div className="wish-card" style={cardStyle} role="status" key={activeWish.id}>
              <p className="wish-card__name">{activeWish.name}</p>
              <p className="wish-card__msg">{activeWish.message}</p>
              <p className="wish-card__meta mono">{activeWish.side}</p>
            </div>
          )}

          <p className="wish-sky__foot mono">Chạm vào một vì sao để đọc lời chúc</p>
        </div>
      </div>
    </section>
  );
}
