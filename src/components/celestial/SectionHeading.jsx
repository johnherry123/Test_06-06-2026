export default function SectionHeading({ index, kicker, title, lede, id }) {
  return (
    <header className="sh" data-reveal>
      <p className="sh__kicker">
        <span className="sh__idx">§ {index}</span>
        <span className="sh__rule" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <h2 className="sh__title" id={id}>
        {title}
      </h2>
      {lede && <p className="sh__lede">{lede}</p>}
    </header>
  );
}
