import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Lenis from 'lenis';
import { Share2, Sparkles } from 'lucide-react';
import './index.css';
import './styles/celestial.css';

/* Components — "Thiên Văn Định Mệnh" */
import Observatory from './components/celestial/Observatory';
import SkyCanvas from './components/celestial/SkyCanvas';
import CosmicDepth from './components/celestial/CosmicDepth';
import Stardust from './components/celestial/Stardust';
import Hero from './components/celestial/Hero';
import Invitation from './components/celestial/Invitation';
import TwinStars from './components/celestial/TwinStars';
import MoonStory from './components/celestial/MoonStory';
import Conjunction from './components/celestial/Conjunction';
import Almanac from './components/celestial/Almanac';
import StarCatalogue from './components/celestial/StarCatalogue';
import SignalSky from './components/celestial/SignalSky';
import GiftVault from './components/celestial/GiftVault';
import Finale from './components/celestial/Finale';
import ConstellationNav from './components/celestial/ConstellationNav';
import AudioPlayer from './components/AudioPlayer';

import { COUPLE, WEDDING } from './weddingData';
import { getGuestName, initialOf, lenisRef } from './celestial/utils';

export default function App() {
  const [opened, setOpened] = useState(false); // main content revealed
  const [introGone, setIntroGone] = useState(false); // intro overlay unmounted
  const [toast, setToast] = useState('');
  const audioRef = useRef(null);
  const toastTimer = useRef(0);
  const guest = useMemo(getGuestName, []);

  /* Smooth scrolling */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: !reduce, anchors: true });
    lenisRef.current = lenis;
    lenis.stop();
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Lock scrolling while the intro is on screen */
  useEffect(() => {
    const html = document.documentElement;
    if (!opened) {
      html.classList.add('is-locked');
      lenisRef.current?.stop();
    } else {
      html.classList.remove('is-locked');
      window.scrollTo(0, 0);
      lenisRef.current?.start();
    }
  }, [opened]);

  /* Scroll-reveal observer */
  useEffect(() => {
    if (!opened) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [opened]);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  const handleShare = useCallback(() => {
    const shareData = {
      title: `Thiệp Cưới | ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`,
      text: 'Trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc của chúng mình!',
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard
        ?.writeText(window.location.href)
        .then(() => notify('Đã sao chép liên kết thiệp cưới'))
        .catch(() => {});
    }
  }, [notify]);

  return (
    <>
      <CosmicDepth active={opened} />
      <SkyCanvas />
      <Stardust />

      {!introGone && (
        <Observatory
          guest={guest}
          onBegin={() => audioRef.current?.play()}
          onReveal={() => {
            setOpened(true);
            setTimeout(() => window.dispatchEvent(new CustomEvent('celestial:meteors', { detail: { count: 22 } })), 900);
          }}
          onDone={() => {
            setOpened(true);
            setIntroGone(true);
          }}
        />
      )}

      <div className={`app${opened ? ' is-open' : ''}`} aria-hidden={!opened}>
        <header className="topbar">
          <span className="topbar__mark mono">
            {initialOf(COUPLE.groom.firstName)} ✦ {initialOf(COUPLE.bride.firstName)}
            <span className="topbar__date"> · {WEDDING.date}</span>
          </span>
          <button id="topbar-share" type="button" className="topbar__share" onClick={handleShare} aria-label="Chia sẻ thiệp cưới">
            <Share2 size={14} strokeWidth={1.6} />
            <span>Chia sẻ</span>
          </button>
        </header>

        <ConstellationNav />

        <main id="main-content">
          <Hero />
          <Invitation />
          <TwinStars />
          <MoonStory />
          <Conjunction />
          <Almanac />
          <StarCatalogue />
          <SignalSky notify={notify} />
          <GiftVault notify={notify} />
        </main>

        <Finale />
      </div>

      <AudioPlayer ref={audioRef} visible={opened} />

      {toast && (
        <div className="toast" role="status">
          <Sparkles size={14} color="#f0ddae" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
