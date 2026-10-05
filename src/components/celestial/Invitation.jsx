import SectionHeading from './SectionHeading';
import { COUPLE, FAMILY } from '../../weddingData';
import { sparkle } from '../../celestial/utils';

function Corner({ pos }) {
  return (
    <svg className={`corner corner--${pos}`} viewBox="0 0 60 60" aria-hidden="true">
      <path d="M2 34 V2 H34" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <path d="M9 24 V9 H24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path d={sparkle(9, 9, 6.5, 1.5)} fill="currentColor" />
      <circle cx="34" cy="2" r="1.4" fill="currentColor" />
      <circle cx="2" cy="34" r="1.4" fill="currentColor" />
    </svg>
  );
}

function Family({ side, data, delay }) {
  return (
    <article className="family" data-reveal style={{ '--d': delay }}>
      <p className="family__side mono">{side}</p>
      <p className="family__parent">{data.father}</p>
      <p className="family__parent">{data.mother}</p>
      <p className="family__addr">{data.address}</p>
    </article>
  );
}

export default function Invitation() {
  return (
    <section id="loi-moi" className="section" aria-labelledby="invite-title">
      <SectionHeading
        index="I"
        kicker="Lời Mời"
        id="invite-title"
        title={
          <>
            Dưới cùng <em>một bầu trời</em>
          </>
        }
      />

      <div className="invite-card" data-reveal>
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        <div className="families">
          <Family side="Nhà Trai" data={FAMILY.groom} delay=".1s" />
          <div className="families__axis" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d={sparkle(10, 10, 9, 2.2)} fill="currentColor" />
            </svg>
          </div>
          <Family side="Nhà Gái" data={FAMILY.bride} delay=".2s" />
        </div>

        <p className="invite__announce" data-reveal>
          Trân trọng báo tin lễ thành hôn của con chúng tôi
        </p>

        <div className="invite__couple" data-reveal style={{ '--d': '.15s' }}>
          <div className="invite__person">
            <span className="invite__name">{COUPLE.groom.fullName}</span>
            <span className="mono">{COUPLE.groom.roleLabel}</span>
          </div>
          <span className="invite__amp" aria-hidden="true">
            &amp;
          </span>
          <div className="invite__person">
            <span className="invite__name">{COUPLE.bride.fullName}</span>
            <span className="mono">{COUPLE.bride.roleLabel}</span>
          </div>
        </div>

        <div className="ornament-rule invite__rule" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 20 20">
            <path d={sparkle(10, 10, 9, 2.2)} fill="currentColor" />
          </svg>
        </div>

        <p className="invite__note" data-reveal style={{ '--d': '.2s' }}>
          Giữa hàng tỉ vì sao, chúng tôi đã tìm thấy nhau. Sự hiện diện của Quý khách sẽ là ánh sáng rực rỡ nhất
          trong ngày trọng đại này của gia đình chúng tôi.
        </p>
      </div>
    </section>
  );
}
