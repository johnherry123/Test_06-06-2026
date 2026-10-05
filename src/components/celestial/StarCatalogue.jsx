import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GALLERY } from '../../weddingData';
import { imgFallback, lenisRef, pad2 } from '../../celestial/utils';

const coordOf = (i) => `RA ${pad2(2 + i * 3)}ʰ${pad2((i * 17) % 60)}ᵐ · Dec +${pad2(10 + i * 4)}°`;

function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = GALLERY[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.title} onClick={onClose}>
      <button id="lightbox-close" type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Đóng">
        <X size={20} strokeWidth={1.4} />
      </button>
      <button
        id="lightbox-prev"
        type="button"
        className="lightbox__btn lightbox__prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Ảnh trước"
      >
        <ChevronLeft size={22} strokeWidth={1.4} />
      </button>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()} key={photo.id + '-' + index}>
        <img className="lightbox__img" src={photo.src} alt={photo.alt} onError={imgFallback(photo.fallback)} />
        <figcaption className="lightbox__cap">
          <span className="lightbox__title">{photo.title}</span>
          <span className="mono">
            Pl. {pad2(index + 1)} / {pad2(GALLERY.length)} · {coordOf(index)}
          </span>
        </figcaption>
      </figure>
      <button
        id="lightbox-next"
        type="button"
        className="lightbox__btn lightbox__next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Ảnh kế tiếp"
      >
        <ChevronRight size={22} strokeWidth={1.4} />
      </button>
    </div>,
    document.body,
  );
}

export default function StarCatalogue() {
  const [idx, setIdx] = useState(-1);
  const open = idx >= 0;

  useEffect(() => {
    if (!open) return undefined;
    lenisRef.current?.stop();
    document.documentElement.classList.add('is-locked');
    return () => {
      lenisRef.current?.start();
      document.documentElement.classList.remove('is-locked');
    };
  }, [open]);

  const close = useCallback(() => setIdx(-1), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % GALLERY.length), []);

  return (
    <section id="tinh-tu" className="section" aria-labelledby="catalogue-title">
      <SectionHeading
        index="VI"
        kicker="Danh Mục Tinh Tú"
        id="catalogue-title"
        title={
          <>
            Những khoảnh khắc <em>phát sáng</em>
          </>
        }
        lede="Mỗi tấm ảnh là một vì sao được lưu vào danh mục riêng của chúng mình. Chạm để quan sát gần hơn."
      />

      <div className="catalogue">
        {GALLERY.map((photo, i) => (
          <button
            key={photo.id + '-' + i}
            id={`catalogue-plate-${i + 1}`}
            type="button"
            className="cat-item"
            onClick={() => setIdx(i)}
            aria-label={`Xem ảnh: ${photo.title}`}
            data-reveal
            style={{ '--d': `${(i % 4) * 0.08}s` }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" onError={imgFallback(photo.fallback)} />
            <svg className="cat-item__reticle" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#f0ddae" strokeWidth="0.6" />
              <path d="M50 10V30M50 70V90M10 50H30M70 50H90" stroke="#f0ddae" strokeWidth="0.6" />
            </svg>
            <span className="cat-item__cap">
              <span className="cat-item__no mono">Pl. {pad2(i + 1)}</span>
              <span className="cat-item__title">{photo.title}</span>
            </span>
          </button>
        ))}
      </div>

      {open && <Lightbox index={idx} onClose={close} onPrev={prev} onNext={next} />}
    </section>
  );
}
