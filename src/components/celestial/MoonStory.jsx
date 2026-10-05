import SectionHeading from './SectionHeading';
import MoonPhase from './MoonPhase';
import { STORY, STORY_MOONS, GALLERY } from '../../weddingData';
import { imgFallback, pad2 } from '../../celestial/utils';

export default function MoonStory() {
  return (
    <section id="tuan-trang" className="section" aria-labelledby="story-title">
      <SectionHeading
        index="III"
        kicker="Bốn Tuần Trăng"
        id="story-title"
        title={
          <>
            Từ trăng non <em>đến trăng rằm</em>
          </>
        }
        lede="Mỗi chặng đường của chúng mình là một pha trăng — lớn dần, sáng dần, cho đến ngày tròn đầy."
      />

      <div className="story">
        <div className="story__axis" aria-hidden="true" />
        {STORY.map((chapter, i) => {
          const moon = STORY_MOONS[i] ?? STORY_MOONS[STORY_MOONS.length - 1];
          return (
            <article key={chapter.title} className={`chapter${i % 2 ? ' chapter--rev' : ''}`}>
              <figure className="chapter__media plate" data-reveal>
                <img
                  className="plate__img"
                  src={chapter.photo.src}
                  alt={chapter.photo.alt}
                  loading="lazy"
                  decoding="async"
                  onError={imgFallback(GALLERY[0]?.fallback)}
                />
                <span className="plate__mark plate__mark--tl" aria-hidden="true" />
                <span className="plate__mark plate__mark--tr" aria-hidden="true" />
                <span className="plate__mark plate__mark--bl" aria-hidden="true" />
                <span className="plate__mark plate__mark--br" aria-hidden="true" />
                <figcaption className="plate__cap mono">
                  Pl. {pad2(i + 1)} — {chapter.year}
                </figcaption>
              </figure>

              <div className="chapter__moon" data-reveal style={{ '--d': '.2s' }}>
                <MoonPhase phase={moon.phase} size={84} />
              </div>

              <div className="chapter__text" data-reveal style={{ '--d': '.35s' }}>
                <p className="chapter__phase mono">{moon.name}</p>
                <p className="chapter__year">{chapter.year}</p>
                <h3 className="chapter__title">{chapter.title}</h3>
                <p className="chapter__body">{chapter.content}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
