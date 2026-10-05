import { useState } from 'react';
import { Check, Copy, Gift } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { BANK_ACCOUNTS } from '../../weddingData';
import { imgFallback } from '../../celestial/utils';

export default function GiftVault({ notify }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  const copy = (acc) => {
    navigator.clipboard
      ?.writeText(acc.accountNumber)
      .then(() => {
        setCopied(acc.id);
        notify?.(`Đã sao chép số tài khoản ${acc.bankShort}`);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {});
  };

  return (
    <section id="qua-mung" className="section" aria-labelledby="gift-title">
      <SectionHeading
        index="VIII"
        kicker="Quà Mừng"
        id="gift-title"
        title={
          <>
            Gửi gắm <em>yêu thương</em>
          </>
        }
        lede="Sự hiện diện của Quý khách đã là món quà quý giá nhất. Nếu muốn gửi thêm chút yêu thương từ xa, xin mời mở hộp bên dưới."
      />

      <div className={`vault${open ? ' vault--open' : ''}`} data-reveal>
        <button
          id="gift-toggle"
          type="button"
          className="btn btn--ghost vault__toggle"
          aria-expanded={open}
          aria-controls="gift-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <Gift size={16} strokeWidth={1.5} />
          {open ? 'Đóng hộp quà' : 'Mở hộp quà'}
        </button>

        <div id="gift-panel" className="vault__panel" aria-hidden={!open}>
          <div className="vault__inner">
            <div className="vault__cards">
              {BANK_ACCOUNTS.map((acc) => (
                <article key={acc.id} className="gift">
                  <div className="gift__info">
                    <p className="mono brass">Gửi {acc.role}</p>
                    <p className="gift__name">{acc.name}</p>
                    <p className="gift__bank">
                      {acc.bank} · {acc.branch}
                    </p>
                    <div className="gift__acct-row">
                      <span className="gift__acct">{acc.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</span>
                      <button
                        id={`gift-copy-${acc.id}`}
                        type="button"
                        className="gift__copy"
                        onClick={() => copy(acc)}
                        tabIndex={open ? 0 : -1}
                        aria-label={`Sao chép số tài khoản ${acc.bank}`}
                      >
                        {copied === acc.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <img
                    className="gift__qr"
                    src={acc.qrUrl}
                    alt={`Mã QR chuyển khoản ${acc.bank} — ${acc.name}`}
                    loading="lazy"
                    onError={imgFallback(acc.qrFallback)}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
