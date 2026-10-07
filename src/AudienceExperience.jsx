import logo from "./assets/arendnik.png";
import copy from "./experiences.js";
import T from "./i18n.js";

const images = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1500&q=85",
];

const symbols = ["⌂", "▦", "◌", "✓"];

function LanguageControl({ lang, onLanguageChange }) {
  return (
    <div className="experience-languages" aria-label="Change language">
      {["hy", "en", "ru"].map((language) => (
        <button
          key={language}
          type="button"
          className={language === lang ? "active" : ""}
          aria-pressed={language === lang}
          onClick={() => onLanguageChange(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Welcome({ lang, onChoose, onLanguageChange }) {
  const t = copy[lang];
  return (
    <main className="welcome-page">
      <header className="experience-header welcome-header">
        <a className="experience-brand" href="#top" aria-label="Arendnik">
          <img src={logo} alt="Arendnik" />
        </a>
        <LanguageControl lang={lang} onLanguageChange={onLanguageChange} />
      </header>
      <section className="welcome-content" id="top">
        <div className="welcome-intro">
          <span className="experience-eyebrow"><i />{t.welcomeKicker}</span>
          <h1>{t.welcomeTitle}</h1>
          <p>{t.welcomeCopy}</p>
        </div>
        <div className="role-picker" aria-labelledby="role-picker-title">
          <div className="role-picker-heading">
            <span id="role-picker-title">{t.chooseLabel}</span>
            <span>01 — 03</span>
          </div>
          <div className="role-picker-grid">
            {t.roles.map((role, index) => (
              <button className={`role-choice role-choice-${index}`} key={role.name} onClick={() => onChoose(index)}>
                <span className="role-choice-top">
                  <span className="role-choice-icon" aria-hidden="true">{symbols[index]}</span>
                  <span className="role-choice-index">0{index + 1}</span>
                </span>
                <span className="role-choice-name">{role.name}</span>
                <span className="role-choice-description">{role.descriptor}</span>
                <span className="role-choice-action">{t.enter}<span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="welcome-footer"><span>Arendnik</span><span>{t.welcomeFooterPlace}<i />{t.welcomeFooterLine}</span></div>
      </section>
      <div className="welcome-art" aria-hidden="true"><span /><span /><span /></div>
    </main>
  );
}

function ProductWindow({ role, index }) {
  return (
    <div className={`product-window product-window-${index}`}>
      <div className="product-window-bar">
        <span className="product-window-brand"><i /> Arendnik</span>
        <div className="product-window-tools"><i /><i /><b>{role.visualTitle.slice(0, 1)}</b></div>
      </div>
      <div className="product-window-body">
        <aside className="product-sidebar">
          {symbols.map((symbol, i) => <i className={i === 0 ? "selected" : ""} key={symbol}>{symbol}</i>)}
        </aside>
        <div className="product-content">
          <div className="product-title-row"><div><span>{role.visualNote}</span><b>{role.visualTitle}</b></div><i>•••</i></div>
          {index === 0 && <div className="product-metrics">{role.visualLabels.map((label, i) => <div className="product-metric" key={label}><span>{label}</span><b className={`metric-mark metric-mark-${i}`} /></div>)}</div>}
          {index === 1 && <div className="portfolio-preview"><div className="portfolio-image" style={{ backgroundImage: `url(${images[1]})` }} /><div><b>{role.mock[1]}</b><span>{role.mock[2]}</span><i>{role.mock[3]}</i></div></div>}
          {index === 2 && <div className="tenant-payment"><div className="tenant-payment-icon">✓</div><span>{role.mock[1]}</span><b>{role.mock[2]}</b><i>{role.mock[3]}</i></div>}
          <div className="product-rows">
            {role.mock.slice(4, 7).map((label, i) => (
              <div className="product-row" key={label}>
                <span className={`product-row-icon row-tone-${i}`}>{symbols[(i + index + 1) % symbols.length]}</span>
                <span className="product-row-label"><b>{label}</b><i /></span>
                <span className={`product-status product-status-${i}`}>{i === 0 ? "•" : "✓"}</span>
              </div>
            ))}
          </div>
          <div className="product-chart"><span /><span /><span /><span /><span /><span /><span /></div>
        </div>
      </div>
      <div className="product-float"><span>{symbols[index]}</span><div><b>{role.mock[7]}</b><i /></div><span className="float-dot" /></div>
    </div>
  );
}

function PhonePreview({ role, index }) {
  return (
    <div className={`experience-phone experience-phone-${index}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-app-bar"><img src={logo} alt="" /><span>•••</span></div>
        <div className="phone-greeting"><span>{role.visualNote}</span><b>{role.visualTitle}</b></div>
        <div className="phone-summary"><span className="phone-summary-icon">{symbols[index]}</span><i /><i /></div>
        {role.mobileItems.map((item, i) => <div className="phone-list-item" key={item}><span>{symbols[(i + index) % symbols.length]}</span><b>{item}</b><i>›</i></div>)}
        <div className="phone-bottom-nav"><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}

function PersonaPage({ lang, index, onChoose, onPlatform, onLanguageChange }) {
  const t = copy[lang];
  const role = t.roles[index];
  const source = T[lang];
  const phone = "+374 55 888 984";
  const featureSection = (
    <section className="experience-features" id="experience-features">
      <div className="experience-section-heading"><span className="experience-eyebrow"><i />{role.kicker}</span><h2>{role.featureTitle}</h2><p>{role.featureIntro}</p></div>
      <div className="experience-feature-grid">
        {role.features.map(([title, text], i) => <article className="experience-feature" key={title}><span className="feature-number">0{i + 1}</span><span className="feature-symbol">{symbols[(i + index) % symbols.length]}</span><h3>{title}</h3><p>{text}</p><span className="feature-rule" /></article>)}
      </div>
    </section>
  );
  const workflowSection = (
    <section className="experience-flow">
      <div className="experience-flow-heading"><span className="experience-eyebrow"><i />{t.workflowLabel}</span><h2>{role.workflowTitle}</h2></div>
      <ol className="experience-flow-list">{role.workflow.map((step, i) => <li key={step}><span>0{i + 1}</span><b>{step}</b><i>↗</i></li>)}</ol>
    </section>
  );
  const mobileSection = (
    <section className="experience-mobile" id="experience-mobile">
      <div className="experience-mobile-copy"><span className="experience-eyebrow"><i />{role.visualTitle}</span><h2>{role.mobileTitle}</h2><p>{role.mobileCopy}</p><ul>{role.mobileItems.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
      <PhonePreview role={role} index={index} />
    </section>
  );
  return (
    <div className={`persona-page persona-${index}`}>
      <header className="experience-header persona-header">
        <a className="experience-brand" href="#top" aria-label="Arendnik"><img src={logo} alt="Arendnik" /></a>
        {/* <nav className="persona-nav" aria-label="Main navigation">
          <a href="#experience-features">{role.featureTitle}</a>
          <a href="#experience-mobile">{role.mobileTitle}</a>
          <a href="#experience-pricing">{t.pricing}</a>
          <button type="button" onClick={onPlatform}>{t.platform}</button>
        </nav> */}
        <div className="persona-header-actions">
          <LanguageControl lang={lang} onLanguageChange={onLanguageChange} />
          <a className="experience-login" href="/auth-preview">{source.login}</a>
          <button className="persona-change" type="button" onClick={onChoose}>{t.changeRole}<span>↗</span></button>
        </div>
      </header>
      <main id="top">
        <section className="persona-hero">
          <div className="persona-hero-copy">
            <span className="experience-eyebrow"><i />{role.kicker}</span>
            <h1>{role.title}</h1>
            <p>{role.intro}</p>
            <div className="persona-hero-actions">
              <a className="experience-button" href="#experience-features">{role.primary}<span>↓</span></a>
              <button className="experience-text-button" type="button" onClick={onPlatform}>{role.secondary}<span>↗</span></button>
            </div>
            <div className="persona-proof"><span className="proof-symbol">✓</span><span>{role.features[0][0]}</span><i /> <span>{role.features[1][0]}</span></div>
          </div>
          <div className={`persona-hero-visual${index === 2 ? " persona-phone-hero" : ""}`}>
            {index === 2 ? <><div className="persona-photo" style={{ backgroundImage: `url(${images[index]})` }} /><PhonePreview role={role} index={index} /></> : <><div className="persona-photo" style={{ backgroundImage: `url(${images[index]})` }} /><ProductWindow role={role} index={index} /><span className="visual-caption">{role.visualNote}<i>↗</i></span></>}
          </div>
        </section>
        {index === 2 && mobileSection}
        {index === 1 && workflowSection}
        {featureSection}
        {index !== 1 && workflowSection}
        {index !== 2 && mobileSection}
        <section className="experience-pricing" id="experience-pricing">
          <div><span className="experience-eyebrow"><i />{source.priceT}</span><h2>{source.price[0][1]}</h2><p>{source.price[0][4]}</p></div>
          <div className="experience-pricing-detail"><span>{source.price[1][0]}</span><b>{source.price[1][1]} <small>{source.price[1][2]}</small></b><p>{source.price[1][5].join(" · ")}</p></div>
          <button className="experience-text-button" type="button" onClick={onPlatform}>{t.platform}<span>↗</span></button>
        </section>
        <section className="experience-cta" id="experience-contact">
          <div><span className="experience-eyebrow"><i />Arendnik</span><h2>{role.ctaTitle}</h2><p>{role.ctaCopy}</p></div>
          <a className="experience-button experience-button-light" href={`tel:${phone.replace(/\s/g, "")}`}>{t.contact}<span>↗</span></a>
        </section>
      </main>
      <footer className="experience-footer"><a href="#top"><img src={logo} alt="Arendnik" /></a><button type="button" onClick={onChoose}>{t.back}</button><span>© Arendnik</span></footer>
    </div>
  );
}

export default function AudienceExperience({ lang, role, onChoose, onPlatform, onLanguageChange }) {
  const validRole = Number.isInteger(role) && role >= 0 && role < copy[lang].roles.length
    ? role
    : null;
  return validRole === null
    ? <Welcome lang={lang} onChoose={onChoose} onLanguageChange={onLanguageChange} />
    : <PersonaPage lang={lang} index={validRole} onChoose={onChoose} onPlatform={onPlatform} onLanguageChange={onLanguageChange} />;
}