import { useEffect, useState } from 'react';
import { lenisRef, sparkle } from '../../celestial/utils';

const ITEMS = [
  ['bau-troi', 'Bầu trời'],
  ['loi-moi', 'Lời mời'],
  ['hai-vi-sao', 'Hai vì sao'],
  ['tuan-trang', 'Tuần trăng'],
  ['giao-hoi', 'Giao hội'],
  ['toa-do', 'Tọa độ'],
  ['tinh-tu', 'Tinh tú'],
  ['tin-hieu', 'Tín hiệu'],
  ['qua-mung', 'Quà mừng'],
];

const STAR = sparkle(6, 6, 6, 1.4);

/** Desktop side navigation drawn as a vertical constellation. */
export default function ConstellationNav() {
  const [active, setActive] = useState(ITEMS[0][0]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ITEMS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    if (lenisRef.current) lenisRef.current.scrollTo(`#${id}`, { duration: 1.8 });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="cnav" aria-label="Điều hướng các phần thiệp">
      <ul>
        {ITEMS.map(([id, label]) => (
          <li key={id} className={active === id ? 'is-active' : undefined}>
            <a id={`nav-${id}`} href={`#${id}`} onClick={go(id)} aria-current={active === id ? 'true' : undefined}>
              <span className="cnav__label mono">{label}</span>
              <svg className="cnav__star" viewBox="0 0 12 12" aria-hidden="true">
                <path d={STAR} fill="currentColor" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
