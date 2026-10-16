export function CtaSection({ role, t, tel }) {
  return (
    <section className="experience-cta" id="experience-contact">
      <div>
        <span className="experience-eyebrow">
          <i />
          Arendnik
        </span>
        <h2>{role.ctaTitle}</h2>
        <p>{role.ctaCopy}</p>
      </div>
      <a className="experience-button experience-button-light" href={tel}>
        {t.contact}
        <span>↗</span>
      </a>
    </section>
  );
}

export default CtaSection;
