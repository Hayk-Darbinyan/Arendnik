import { useState } from "react";
import logo from "../../assets/arendnik.png";
import copy from "../../experiences.js";
import { Ic } from "./shared/Icons.jsx";
import { LanguageControl } from "./shared/LanguageControl.jsx";
import "./welcome.css";

/* ════════════════════════════════════════════════════════
   ILLUSTRATED SCENES — little neighbourhoods whose windows
   light up warmly when a card is hovered / focused.
════════════════════════════════════════════════════════ */
function Windows({ x, y, cols, rows, w = 14, h = 18, gap = 10, lit = [] }) {
  const items = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      items.push(
        <rect
          key={`${x}-${y}-${i}`}
          className={`wm-win ${lit.includes(i) ? "is-on" : ""}`}
          style={{ "--w": `${(i % 5) * 70}ms` }}
          x={x + c * (w + gap)}
          y={y + r * (h + gap)}
          width={w}
          height={h}
          rx="3"
        />
      );
    }
  }
  return <>{items}</>;
}

function Scene({ variant }) {
  return (
    <svg className="wm-scene" viewBox="0 0 400 230" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="wm-sky-top" />
          <stop offset="1" className="wm-sky-bottom" />
        </linearGradient>
      </defs>
      <rect width="400" height="230" fill={`url(#sky-${variant})`} />
      <circle className="wm-sun" cx={variant === 0 ? 318 : 82} cy="62" r="30" />
      <path d="M0 170 Q100 130 200 165 T400 150 V230 H0Z" className="wm-hill-back" />

      {variant === 0 ? (
        <g>
          {/* side buildings */}
          <rect x="52" y="112" width="74" height="98" rx="6" className="wm-bld-soft" />
          <Windows x={66} y={126} cols={2} rows={3} w={12} h={14} gap={10} lit={[1, 4]} />
          <rect x="282" y="96" width="76" height="114" rx="6" className="wm-bld-soft" />
          <Windows x={296} y={110} cols={2} rows={3} w={12} h={14} gap={12} lit={[2]} />
          {/* main building */}
          <rect x="140" y="44" width="120" height="166" rx="8" className="wm-bld-main" />
          <rect x="132" y="38" width="136" height="12" rx="4" className="wm-bld-roof" />
          <Windows x={156} y={64} cols={3} rows={4} lit={[1, 5, 6, 10]} />
          <path d="M186 210 V184 a14 14 0 0 1 28 0 V210Z" className="wm-door" />
        </g>
      ) : (
        <g>
          {/* three homes */}
          <g>
            <rect x="48" y="128" width="90" height="82" className="wm-bld-main" />
            <path d="M40 130 L93 88 L146 130Z" className="wm-bld-roof" />
            <Windows x={62} y={146} cols={2} rows={1} w={16} h={20} gap={16} lit={[0]} />
            <rect x="96" y="176" width="22" height="34" rx="3" className="wm-door" />
          </g>
          <g>
            <rect x="158" y="96" width="92" height="114" className="wm-bld-main" />
            <path d="M150 98 L204 52 L258 98Z" className="wm-bld-roof" />
            <Windows x={174} y={116} cols={2} rows={2} w={16} h={18} gap={20} lit={[1, 2]} />
            <rect x="193" y="176" width="22" height="34" rx="3" className="wm-door" />
          </g>
          <g>
            <rect x="268" y="138" width="86" height="72" className="wm-bld-soft" />
            <path d="M260 140 L311 102 L362 140Z" className="wm-bld-roof" />
            <Windows x={282} y={154} cols={2} rows={1} w={16} h={18} gap={16} lit={[1]} />
            <rect x="326" y="180" width="20" height="30" rx="3" className="wm-door" />
          </g>
        </g>
      )}

      {/* trees + ground */}
      <circle cx="30" cy="188" r="20" className="wm-tree" />
      <rect x="28" y="196" width="4" height="16" className="wm-trunk" />
      <circle cx="372" cy="192" r="16" className="wm-tree" />
      <rect x="370" y="198" width="4" height="14" className="wm-trunk" />
      <rect x="0" y="208" width="400" height="22" className="wm-ground" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   WELCOME SCREEN — audience selection
════════════════════════════════════════════════════════ */
export function Welcome({ lang, onChoose, onLanguageChange }) {
  const t = copy[lang];
  const [active, setActive] = useState(null);
  const roleIcons = ["building", "briefcase"];
  const tr = (hy, ru, en) => (lang === "hy" ? hy : lang === "ru" ? ru : en);

  const highlights = [
    {
      badge: tr("Շենքի կառավարում", "Управление зданием", "For buildings"),
      features: lang === "hy"
        ? ["Բնակիչների կապ և համայնք", "Կոմունալ և ընթացիկ վճարումներ", "Սպասարկման հայտերի հսկողություն"]
        : lang === "ru"
        ? ["Связь с жильцами и сообщество", "Контроль платежей и сборов", "Заявки на ремонт и обслуживание"]
        : ["Resident communication & directory", "Building fees & online collection", "Maintenance ticket coordination"],
    },
    {
      badge: tr("Գույքերի պորտֆել", "Портфель объектов", "For owners"),
      features: lang === "hy"
        ? ["Բազմակի գույքերի կենտրոնացում", "Թվային պայմանագրեր և ստորագրում", "Ավտոմատացված ֆինանսական հաշվետվություն"]
        : lang === "ru"
        ? ["Единый реестр всех объектов", "Цифровые договоры аренды", "Автоматические финансовые отчеты"]
        : ["Unified multi-property overview", "Digital lease contracts & signing", "Automated revenue & payment tracking"],
    },
  ];

  return (
    <main className="wm-root">
      <div className="wm-glow wm-glow-1" aria-hidden="true" />
      <div className="wm-glow wm-glow-2" aria-hidden="true" />

      <header className="wm-top">
        <a className="wm-logo" href="#top" aria-label="Arendnik">
          <img src={logo} alt="Arendnik" />
        </a>
        <div className="wm-top-right">
          <LanguageControl lang={lang} onLanguageChange={onLanguageChange} />
          <a className="wm-login" href="/auth-preview">
            {copy[lang].login || tr("Մուտք", "Войти", "Log in")}
          </a>
        </div>
      </header>

      <section className="wm-hero">
        <h1 className="wm-title">{t.welcomeTitle}</h1>
        <p className="wm-sub">{t.chooseLabel}</p>
      </section>

      <section className="wm-cards" aria-label={t.chooseLabel}>
        {t.roles.map((role, index) => {
          const hl = highlights[index];
          return (
            <article
              key={role.name}
              tabIndex={0}
              role="button"
              className={`wm-card wm-card-${index} ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => onChoose(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChoose(index);
                }
              }}
            >
              <div className="wm-card-art">
                <Scene variant={index} />
                <span className="wm-card-badge">
                  <span className="wm-card-badge-icon" aria-hidden="true">
                    <Ic n={roleIcons[index]} />
                  </span>
                  {hl.badge}
                </span>
              </div>

              <div className="wm-card-body">
                <div className="wm-card-text">
                  <span className="wm-card-kicker">{role.kicker}</span>
                  <h2 className="wm-card-title">{role.name}</h2>
                  <p className="wm-card-desc">{role.descriptor}</p>

                  <ul className="wm-list">
                    {hl.features.map((item) => (
                      <li key={item}>
                        <span className="wm-check" aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="10" height="10">
                            <path d="M3 8.5l3.2 3L13 4.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="wm-cta">
                  {/* <span>{t.enter}</span> */}
                  <span className="wm-cta-arrow" aria-hidden="true">
                    <Ic n="arrow" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <footer className="wm-foot">
        <span>{t.welcomeFooterPlace}</span>
        <span className="wm-foot-dot" />
        <span>{t.welcomeFooterLine}</span>
      </footer>
    </main>
  );
}

export default Welcome;