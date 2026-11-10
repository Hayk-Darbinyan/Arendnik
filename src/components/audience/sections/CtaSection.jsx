import { BrandText } from "../shared/BrandText.jsx";

export function CtaSection({ role, t, tel }) {
  return (
    <section className="experience-cta" id="experience-contact">
      <div>
        <span className="experience-eyebrow">
          <i />
          <BrandText>Arendnik</BrandText>
        </span>
        <h2><BrandText>{role.ctaTitle}</BrandText></h2>
        <p><BrandText>{role.ctaCopy}</BrandText></p>
      </div>
      <a className="experience-button experience-button-light" href={tel}>
        {t.contact}
        <span>↗</span>
      </a>
    </section>
  );
}

export default CtaSection;
