/* ══════════════════════════════════════════════════════════════════════
   Celestial utilities — moon phases, seeded randomness, small helpers
══════════════════════════════════════════════════════════════════════ */

/** Shared Lenis instance (set in App) so any component can stop/start smooth scroll. */
export const lenisRef = { current: null };

/* ── Moon ── */
export const SYNODIC_MONTH = 29.530588853;
const NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14); // a known new moon

/** Returns the moon phase for a date: 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter. */
export function moonPhase(date) {
  const days = (date.getTime() - NEW_MOON_REF) / 86400000;
  return (((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH) / SYNODIC_MONTH;
}

/** Vietnamese name of a moon phase. */
export function moonPhaseName(p) {
  if (p < 0.03 || p > 0.97) return 'Trăng non';
  if (p < 0.22) return 'Trăng lưỡi liềm đầu tháng';
  if (p < 0.28) return 'Trăng thượng huyền';
  if (p < 0.47) return 'Trăng khuyết đầu tháng';
  if (p < 0.53) return 'Trăng rằm';
  if (p < 0.72) return 'Trăng khuyết cuối tháng';
  if (p < 0.78) return 'Trăng hạ huyền';
  return 'Trăng lưỡi liềm cuối tháng';
}

/** SVG path of the illuminated part of the moon disc. */
export function moonPath(phase, r = 46, cx = 50, cy = 50) {
  const p = ((phase % 1) + 1) % 1;
  const waxing = p <= 0.5;
  const k = Math.cos(2 * Math.PI * p); // 1 at new moon, -1 at full moon
  const rx = Math.max(0.001, Math.abs(k) * r);
  const outer = waxing ? 1 : 0;
  const term = waxing ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
  return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outer} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${term} ${cx} ${cy - r} Z`;
}

/* ── Geometry ── */
/** Four-pointed star (sparkle) path. */
export function sparkle(cx, cy, R, r = R * 0.26) {
  let d = '';
  for (let i = 0; i < 8; i += 1) {
    const a = -Math.PI / 2 + (i * Math.PI) / 4;
    const rad = i % 2 === 0 ? R : r;
    d += `${i ? 'L' : 'M'}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
}

/* ── Randomness ── */
export function mulberry32(seed) {
  let s = seed >>> 0;
  return function rand() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ── Formatting ── */
export const pad2 = (n) => String(n).padStart(2, '0');

/** "Đại Nghĩa" -> "N" (initial of the given name). */
export const initialOf = (name) => name.trim().split(/\s+/).pop().charAt(0).toUpperCase();

/** Guest name from `?to=` URL param, e.g. ?to=Anh%20Minh%20%26%20Gia%20%C4%91%C3%ACnh */
export function getGuestName() {
  try {
    const to = new URLSearchParams(window.location.search).get('to');
    return to && to.trim() ? to.trim().slice(0, 60) : 'Quý khách';
  } catch {
    return 'Quý khách';
  }
}

/* ── Calendar ── */
function toUtcStamp(dateISO, hhmm, addMinutes = 0) {
  const d = new Date(`${dateISO}T${hhmm}:00+07:00`);
  d.setMinutes(d.getMinutes() + addMinutes);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function googleCalendarUrl({ title, dateISO, start, end, endAddMinutes = 0, details, location }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toUtcStamp(dateISO, start)}/${toUtcStamp(dateISO, end, endAddMinutes)}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** onError handler that swaps an <img> to a fallback source once. */
export const imgFallback = (fallback) => (e) => {
  const img = e.currentTarget;
  if (fallback && !img.dataset.fallback) {
    img.dataset.fallback = '1';
    img.src = fallback;
  }
};
