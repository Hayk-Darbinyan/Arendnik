import { useEffect, useRef, useState } from "react";
import logo from "./assets/arendnik.png";
import copy from "./experiences.js";
import T from "./i18n.js";
import { LINKS, PHONE } from "./links.js";

/* ─── shared helpers ─── */
const images = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1500&q=85",
];

const symbols = ["⌂", "▦", "◌", "✓"];

/* SVG icon paths */
const IC = {
  pay: (<><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10.5h18M7 15h3" /></>),
  trend: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  doc: (<><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h4" /></>),
  tool: <path d="M14.5 6.5a4 4 0 005 5L10 21a2.1 2.1 0 01-3-3z" />,
  chat: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
  bell: (<><path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15z" /><path d="M10 21h4" /></>),
  chart: (<><path d="M4 4v16h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></>),
  link: (<><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></>),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  camera: (<><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>),
  phone: <path d="M6 3h4l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2L21 14.5V18a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />,
  building: (<><path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M2 21h20" /><path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M11 21v-3h2v3" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" /></>),
  home: (<><path d="M3 10.5L12 3l9 7.5M5 9v12h14V9M9 21v-7h6v7" /></>),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

function Ic({ n }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {IC[n]}
    </svg>
  );
}

/* skeleton shapes */
const S = ({ w = 100, c = "" }) => <i className={"sk " + c} style={{ width: w + "%" }} />;

/* Mock UI previews */
function Mock({ kind }) {
  const r3 = [0, 1, 2];
  switch (kind) {
    case "chat": return (
      <div className="mock">
        <div className="bub l"><S w={85} /><S w={55} /></div>
        <div className="bub r"><S w={70} /></div>
        <div className="bub l"><S w={60} /></div>
        <div className="bub r"><S w={90} /><S w={45} /></div>
        <div className="inp"><S w={55} /><b /></div>
      </div>
    );
    case "remind": return (
      <div className="mock">
        {r3.map(i => (
          <div key={i} className="row">
            <span className="dot"><Ic n="bell" /></span>
            <div className="grow"><S w={80 - i * 12} /><S w={42} c="s" /></div>
            <span className={"tg" + (i !== 1 ? " on" : "")} />
          </div>
        ))}
      </div>
    );
    case "maint": return (
      <div className="mock">
        {[78, 46, 22].map((w, i) => (
          <div key={i} className="row">
            <span className="th"><Ic n="camera" /></span>
            <div className="grow"><S w={70 - i * 10} /><div className="pr"><u style={{ width: w + "%" }} /></div></div>
          </div>
        ))}
      </div>
    );
    case "doc": return (
      <div className="mock">
        <div className="paper">
          {[92, 80, 96, 64].map((w, i) => <S key={i} w={w} />)}
          <svg className="sign" viewBox="0 0 90 26">
            <path d="M2 20c8-20 12 4 20-6s9 8 17 0 10-9 16-2 9 5 17 1" pathLength="100" />
          </svg>
        </div>
        <div className="row ok">
          <span className="dot"><Ic n="check" /></span>
          <div className="grow"><S w={45} /></div>
        </div>
      </div>
    );
    case "link": return (
      <div className="mock nodes">
        <b /><em /><b /><em /><b />
      </div>
    );
    case "card": return (
      <div className="mock">
        <div className="cc"><S w={35} c="w" /><S w={70} c="w" /></div>
        <div className="row">
          <div className="grow"><S w={60} /></div>
          <span className="tg on" />
        </div>
        <div className="pbtn"><S w={30} c="w" /></div>
      </div>
    );
    case "chart": return (
      <div className="mock">
        <div className="bars">
          {[42, 66, 52, 80, 62, 94].map((h, i) => (
            <u key={i} style={{ height: h + "%", animationDelay: i * 70 + "ms" }} />
          ))}
        </div>
        <div className="row">
          <div className="grow"><S w={50} /></div>
          <S w={20} />
        </div>
      </div>
    );
    case "tasks": return (
      <div className="mock">
        {[1, 1, 0, 0].map((d, i) => (
          <div key={i} className="row">
            <span className={"cb" + (d ? " on" : "")}>{d ? <Ic n="check" /> : null}</span>
            <div className="grow"><S w={78 - i * 9} /></div>
          </div>
        ))}
      </div>
    );
    default: return (
      <div className="mock">
        {[["in", 70], ["out", 55], ["in", 80]].map(([d, w], i) => (
          <div key={i} className="row">
            <span className={"arr " + d}><Ic n="arrow" /></span>
            <div className="grow"><S w={w} /><S w={35} c="s" /></div>
            <S w={18} />
          </div>
        ))}
      </div>
    );
  }
}

/* counter animation */
function Counter({ to, suffix }) {
  const [n, setN] = useState(0), ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), end = +to;
      const tick = t => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
        p < 1 && requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <b ref={ref}>{n}{suffix}</b>;
}

/* photo carousel */
function Photos() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % images.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="photos">
      {images.map((src, k) => (
        <img key={src} src={src} alt="" width="900" height="900"
          className={k === i ? "on" : ""} loading={k ? "lazy" : "eager"} decoding="async" />
      ))}
    </div>
  );
}

/* Language selector */
function LanguageControl({ lang, onLanguageChange }) {
  return (
    <div className="experience-languages" aria-label="Change language">
      {["hy", "en", "ru"].map(language => (
        <button key={language} type="button"
          className={language === lang ? "active" : ""}
          aria-pressed={language === lang}
          onClick={() => onLanguageChange(language)}>
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   WELCOME SCREEN — premium redesign
════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════
   WELCOME SCREEN — Fullscreen Split-Screen Panels
════════════════════════════════════════════════════════ */
function Welcome({ lang, onChoose, onLanguageChange }) {
  const t = copy[lang];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const roleIcons = ["building", "briefcase", "home"];

  // Highlights or preview badges for each role panel to make them feel rich and product-focused
  const roleHighlights = [
    {
      badge: lang === "hy" ? "Շենքի կառավարում" : lang === "ru" ? "Управление зданием" : "Building Ops",
      metrics: [
        { label: lang === "hy" ? "Բնակիչներ" : lang === "ru" ? "Жильцы" : "Residents", val: "100%" },
        { label: lang === "hy" ? "Վճարումներ" : lang === "ru" ? "Платежи" : "Payments", val: "Online" },
        { label: lang === "hy" ? "Սպասարկում" : lang === "ru" ? "Заявки" : "Tickets", val: "24/7" },
      ],
      features: lang === "hy"
        ? ["Բնակիչների կապ և համայնք", "Կոմունալ և ընթացիկ վճարումներ", "Սպասարկման հայտերի հսկողություն"]
        : lang === "ru"
        ? ["Связь с жильцами и сообщество", "Контроль платежей и сборов", "Заявки на ремонт и обслуживание"]
        : ["Resident communication & directory", "Building fees & online collection", "Maintenance ticket coordination"],
    },
    {
      badge: lang === "hy" ? "Գույքերի պորտֆել" : lang === "ru" ? "Портфель объектов" : "Portfolio Ops",
      metrics: [
        { label: lang === "hy" ? "Գույքեր" : lang === "ru" ? "Объекты" : "Properties", val: "Multi" },
        { label: lang === "hy" ? "Պայմանագրեր" : lang === "ru" ? "Договоры" : "Leases", val: "Digital" },
        { label: lang === "hy" ? "Եկամուտ" : lang === "ru" ? "Доходность" : "Reports", val: "Auto" },
      ],
      features: lang === "hy"
        ? ["Բազմակի գույքերի կենտրոնացում", "Թվային պայմանագրեր և ստորագրում", "Ավտոմատացված ֆինանսական հաշվետվություն"]
        : lang === "ru"
        ? ["Единый реестр всех объектов", "Цифровые договоры аренды", "Автоматические финансовые отчеты"]
        : ["Unified multi-property overview", "Digital lease contracts & signing", "Automated revenue & payment tracking"],
    },
    {
      badge: lang === "hy" ? "Վարձակալի տարածք" : lang === "ru" ? "Кабинет жильца" : "Tenant Space",
      metrics: [
        { label: lang === "hy" ? "Վարձավճար" : lang === "ru" ? "Оплата" : "Rent", val: "1-Click" },
        { label: lang === "hy" ? "Հայտեր" : lang === "ru" ? "Заявки" : "Issues", val: "+Photo" },
        { label: lang === "hy" ? "Չատ" : lang === "ru" ? "Чат" : "Chat", val: "Direct" },
      ],
      features: lang === "hy"
        ? ["Վարձավճարի արագ առցանց վճարում", "Հայտի ուղարկում լուսանկարով", "Անմիջական կապ կառավարչի հետ"]
        : lang === "ru"
        ? ["Быстрая онлайн-оплата аренды", "Отправка заявок с фотографиями", "Прямая связь с управляющим"]
        : ["Fast one-touch rent payments", "Photo maintenance issue reporting", "Direct messenger with landlord"],
    },
  ];

  return (
    <main className="welcome-screen-fullscreen">
      {/* Top compact bar */}
      <header className="ws-topbar">
        <a className="ws-logo" href="#top" aria-label="Arendnik">
          <img src={logo} alt="Arendnik" />
        </a>

        <div className="ws-topbar-center">
          <span className="ws-kicker-dot" />
          <span className="ws-kicker-text">{t.welcomeKicker}</span>
        </div>

        <div className="ws-topbar-right">
          <LanguageControl lang={lang} onLanguageChange={onLanguageChange} />
          <a className="ws-login-btn" href="/auth-preview">
            {copy[lang].login || (lang === "hy" ? "Մուտք" : lang === "ru" ? "Войти" : "Log in")}
          </a>
        </div>
      </header>

      {/* Main split-screen panel container */}
      <section
        className={`ws-split-container ${hoveredIndex !== null ? `hovered-panel-${hoveredIndex}` : ""}`}
        aria-label={t.chooseLabel}
      >
        {t.roles.map((role, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
          const hls = roleHighlights[index];

          return (
            <article
              key={role.name}
              tabIndex={0}
              role="button"
              className={`ws-panel ws-panel-${index} ${isHovered ? "is-expanded" : ""} ${isDimmed ? "is-dimmed" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => onChoose(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChoose(index);
                }
              }}
            >
              {/* Background gradient lighting & pattern */}
              <div className="ws-panel-bg" aria-hidden="true">
                <div className="ws-panel-glow" />
                <div className="ws-panel-grid-lines" />
              </div>

              {/* Top header row inside panel */}
              <div className="ws-panel-header">
                <span className="ws-panel-num">0{index + 1}</span>
                <span className="ws-panel-badge">{hls.badge}</span>
                <span className="ws-panel-icon-wrap" aria-hidden="true">
                  <Ic n={roleIcons[index]} />
                </span>
              </div>

              {/* Main title & persona info */}
              <div className="ws-panel-main">
                <span className="ws-panel-audience-tag">{role.kicker}</span>
                <h2 className="ws-panel-title">{role.name}</h2>
                <p className="ws-panel-desc">{role.descriptor}</p>

                {/* Key value propositions list */}
                <div className="ws-panel-features">
                  {hls.features.map((item, fIdx) => (
                    <div key={fIdx} className="ws-feature-pill">
                      <span className="ws-feature-bullet" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Micro preview metrics row */}
                <div className="ws-panel-metrics">
                  {hls.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="ws-metric-item">
                      <span className="ws-metric-val">{m.val}</span>
                      <span className="ws-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA trigger */}
              <div className="ws-panel-footer">
                <div className="ws-cta-button">
                  <span className="ws-cta-text">{t.enter}</span>
                  <span className="ws-cta-arrow" aria-hidden="true">
                    <Ic n="arrow" />
                  </span>
                </div>
                <span className="ws-panel-hint">
                  {lang === "hy"
                    ? "Սեղմեք մուտք գործելու համար"
                    : lang === "ru"
                    ? "Нажмите для входа"
                    : "Click to explore path"}
                </span>
              </div>

              {/* Bottom active edge bar indicator */}
              <div className="ws-panel-active-bar" aria-hidden="true" />
            </article>
          );
        })}
      </section>

      {/* Bottom compact status bar */}
      <footer className="ws-bottombar">
        <div className="ws-bottombar-left">
          <span className="ws-brand-mark">Arendnik</span>
          <span className="ws-brand-sep" />
          <span className="ws-tagline-text">{t.welcomeTitle}</span>
        </div>
        <div className="ws-bottombar-right">
          <span>{t.welcomeFooterPlace}</span>
          <span className="ws-brand-sep" />
          <span>{t.welcomeFooterLine}</span>
        </div>
      </footer>
    </main>
  );
}

/* ────────────────────────────────────────────────────────
   Product window mock (desktop UI preview)
──────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────
   Tools section (from main page)
──────────────────────────────────────────────────────── */
const TOOL_ICON = ["chat", "bell", "tool", "doc", "link", "pay", "chart"];
const TOOL_MOCK = ["chat", "remind", "maint", "doc", "link", "card", "chart"];

function ToolPreview({ tools, s, inline = false }) {
  return (
    <div className={`tp ${inline ? "tp-inline" : "tp-desktop"}`}>
      <div className="tph">
        <span className="ib"><Ic n={TOOL_ICON[s]} /></span>
        <b>{tools[s]}</b>
      </div>
      <div className="tpb" key={s}><Mock kind={TOOL_MOCK[s]} /></div>
    </div>
  );
}

function ToolsSection({ tools }) {
  const [s, setS] = useState(0);
  const [stacked, setStacked] = useState(() => window.matchMedia("(max-width: 1024px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const update = () => setStacked(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (stacked) return;
    const i = setTimeout(() => setS(x => (x + 1) % 7), 5200);
    return () => clearTimeout(i);
  }, [s, stacked]);
  return (
    <div className="tools">
      <div className="tl">
        {tools.map((x, i) => (
          <div key={i} className="tool-item">
            <button className={i === s ? "on" : ""} aria-pressed={i === s} onClick={() => setS(i)}>
              <span className="ib"><Ic n={TOOL_ICON[i]} /></span>
              {x}
            </button>
            {i === s && <ToolPreview tools={tools} s={s} inline />}
          </div>
        ))}
      </div>
      <ToolPreview tools={tools} s={s} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   How it works (from main page)
──────────────────────────────────────────────────────── */
function HowSection({ steps, howT, watch }) {
  const [a, setA] = useState(0), [shown, setShown] = useState(() => new Set()), refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setA(+e.target.dataset.i); }), { rootMargin: "-42% 0px -50% 0px" });
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const index = +e.target.dataset.i;
      setShown(current => {
        if (current.has(index)) return current;
        const next = new Set(current); next.add(index); return next;
      });
      io.unobserve(e.target);
    }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="how">
      <div className="hl">
        <h2 className="rv">{howT}</h2>
        <div className="big" aria-hidden="true">{String(a + 1).padStart(2, "0")}<small>/ 08</small></div>
        <div className="prog"><i style={{ transform: `scaleX(${(a + 1) / 8})` }} /></div>
        <p className="cur">{steps[a][0]}</p>
      </div>
      <ol className="stl">
        {steps.map(([h, p], i) => (
          <li key={i} data-i={i} ref={el => (refs.current[i] = el)}
            className={"stp" + (shown.has(i) ? " in" : "") + (i === a ? " act" : "")}>
            <span className="n">{i + 1}</span>
            <div>
              <h3>{h}</h3>
              <p>{p}</p>
              {LINKS.tutorials[i] && (
                <a className="lnk" href={LINKS.tutorials[i]} target="_blank" rel="noopener">
                  {watch} <Ic n="arrow" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Phone Demo (from main page)
──────────────────────────────────────────────────────── */
const PHONE_KINDS = ["pay", "maint", "tasks", "chat"];
function PhoneDemo({ badges }) {
  const [s, setS] = useState(0);
  useEffect(() => { const i = setTimeout(() => setS(x => (x + 1) % 4), 3200); return () => clearTimeout(i); }, [s]);
  return (
    <div className="pw">
      <div className="phone">
        <div className="notch" />
        <div className="ph-h"><a href="#top" className="logo"><img src={logo} alt="Arendnik" /></a></div>
        <div className="seg">
          {badges.map((b, i) => <button key={i} className={i === s ? "on" : ""} onClick={() => setS(i)}>{b}</button>)}
        </div>
        <div className="pb" key={s}><Mock kind={PHONE_KINDS[s]} /></div>
      </div>
      <span className="fc f1"><Ic n="camera" />{badges[1]}</span>
      <span className="fc f2"><Ic n="chat" />{badges[3]}</span>
    </div>
  );
}

/* Store button */
function Store({ href, label }) {
  return (
    <a className="store" href={href || "#"} target="_blank" rel="noopener"
      aria-disabled={!href} onClick={e => { if (!href) e.preventDefault(); }}>
      <small>{label[0]}</small>
      <b>{label[1]}</b>
    </a>
  );
}

/* ════════════════════════════════════════════════════════
   PERSONA PAGE — full integrated experience
════════════════════════════════════════════════════════ */
const WHY_ICON = ["pay", "trend", "doc", "tool", "chat", "bell", "chart"];
const WHY_ORDER = [0, 1, 3, 2, 4, 5, 6], WHY_SPAN = [1, 1, 1, 2, 1, 2, 1];
const TEN_ICON = ["chat", "camera", "pay", "bell"];
const ANCHORS = ["", "about", "why", "tools", "how", "tenants", "app", "pricing", "contact"];

function PersonaPage({ lang, index, onChoose, onLanguageChange }) {
  const t = copy[lang];
  const source = T[lang];
  const role = t.roles[index];
  const phone = PHONE;
  const TEL = "tel:" + phone.replace(/\s/g, "");
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const bar = useRef(), head = useRef(), b1 = useRef(), b2 = useRef(), langRef = useRef();

  /* scroll effects */
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
    let raf = 0;
    const on = () => {
      raf = 0;
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (head.current) head.current.classList.toggle("sc", y > 8);
      if (b1.current && y < 1000) b1.current.style.transform = `translate3d(0,${y * 0.12}px,0)`;
      if (b2.current && y < 1000) b2.current.style.transform = `translate3d(0,${y * -0.08}px,0)`;
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(on); };
    on();
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener("scroll", tick); removeEventListener("resize", tick); };
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const closeOutside = e => { if (!langRef.current?.contains(e.target)) setLangOpen(false); };
    const closeOnEscape = e => { if (e.key === "Escape") setLangOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [langOpen]);

  const navLinks = [1, 3, 4, 5, 6, 7];

  return (
    <div className={`persona-page persona-${index}`}>
      {/* progress bar */}
      <div className="bar" ref={bar} />

      {/* header */}
      <header className="hd platform-hd persona-full-hd" ref={head}>
        <div className="w" style={{ width: "min(1320px, 96%)", display: "flex", alignItems: "center", gap: ".8rem", height: "68px" }}>
          <a href="#top" className="logo"><img src={logo} alt="Arendnik" /></a>
          <button className="platform-back hide-m" type="button" onClick={() => { onChoose(undefined); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span aria-hidden="true">←</span> {t.changeRole}
          </button>
          <nav className="nav" style={{ flex: 1, justifyContent: "center", gap: "clamp(.45rem,.85vw,.85rem)", marginLeft: 0, whiteSpace: "nowrap" }}>
            {navLinks.map(i => <a key={i} href={"#" + ANCHORS[i]} style={{ fontSize: ".8rem", whiteSpace: "nowrap" }}>{source.rooms[i]}</a>)}
          </nav>
          <div className="lang" ref={langRef}>
            <button className="lang-current" aria-label="Change language" aria-expanded={langOpen}
              aria-controls="persona-lang-menu" onClick={() => setLangOpen(o => !o)}>
              {lang.toUpperCase()}
              <span className="lang-chevron" aria-hidden="true" />
            </button>
            <div className="lang-menu" id="persona-lang-menu" hidden={!langOpen}>
              {["hy", "ru", "en"].map(l => (
                <button key={l} className={l === lang ? "on" : ""} aria-pressed={l === lang}
                  onClick={() => { onLanguageChange(l); setLangOpen(false); }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <a className="btn sm hide-m" href="/auth-preview">{source.login}</a>
          <button className={"burger" + (open ? " open" : "")} aria-label="Menu" aria-expanded={open}
            onClick={() => setOpen(o => !o)}>
            <span /><span />
          </button>
        </div>
        <div className={"mnav" + (open ? " open" : "")}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <a key={i} href={"#" + ANCHORS[i]} onClick={() => setOpen(false)}>{source.rooms[i]}</a>
          ))}
          <button className="platform-back" type="button" onClick={() => { onChoose(undefined); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span aria-hidden="true">←</span> {t.changeRole}
          </button>
          <a href="/auth-preview" onClick={() => setOpen(false)}>{source.login}</a>
        </div>
      </header>

      <main id="top">
        {/* ── HERO ── */}
        <section className="persona-hero">
          <div className="blob b1" ref={b1} />
          <div className="blob b2" ref={b2} />
          <div className="w hg">
            <div className="hc">
              <span className="eyebrow rv">{role.kicker}</span>
              <h1 className="rv" style={{ "--i": 1 }}>{role.title}</h1>
              <p className="lead rv" style={{ "--i": 2 }}>{role.intro}</p>
              <div className="ctas rv" style={{ "--i": 3 }}>
                <a className="btn" href="#how">{role.primary} <Ic n="arrow" /></a>
                <a className="btn ghost" href="#pricing">{source.cta[1]}</a>
              </div>
              <div className="facts rv" style={{ "--i": 4 }}>
                {source.stats.map(([n, s, l], i) => (
                  <div key={i}><Counter to={n} suffix={s} /><span>{l}</span></div>
                ))}
              </div>
              <p className="note rv" style={{ "--i": 5 }}>
                <Ic n="check" />
                {source.price[0][4]}
              </p>
            </div>
            <div className="hv rv" style={{ "--i": 2 }}>
              <Photos />
              <div className="dash">
                <div className="side">
                  {["pay", "chat", "tool", "chart"].map(n => <span key={n}><Ic n={n} /></span>)}
                </div>
                <div className="dm">
                  <div className="dtabs">
                    {source.badges.map((b, i) => <span key={i} className={i === 0 ? "on" : ""}>{b}</span>)}
                  </div>
                  <Mock kind="chart" />
                </div>
              </div>
              <span className="fc f1"><Ic n="pay" />{source.tools[5]}</span>
              <span className="fc f2"><Ic n="doc" />{source.why[2][0]}</span>
              <span className="fc f3"><Ic n="bell" />{source.why[5][0]}</span>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="sec" id="about">
          <div className="w about">
            <div>
              <h2 className="rv">{source.aboutT}</h2>
              <p className="sub rv" style={{ "--i": 1 }}>{source.aboutP}</p>
            </div>
            <div className="hub rv in-hub" style={{ "--i": 1 }}>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                {[[50, 8], [90, 37], [75, 84], [25, 84], [10, 37]].map(([x, y], i) => (
                  <path key={i} d={`M50 50L${x} ${y}`} pathLength="100" style={{ transitionDelay: 300 + i * 120 + "ms" }} />
                ))}
              </svg>
              <div className="core"><i /></div>
              {source.domains.map((d, i) => (
                <span key={i} className="node" style={{ left: [50, 90, 75, 25, 10][i] + "%", top: [8, 37, 84, 84, 37][i] + "%", "--i": i }}>{d}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section className="sec tint" id="why">
          <div className="w">
            <h2 className="rv c">{source.whyT}</h2>
            <div className="why">
              {WHY_ORDER.map((idx, k) => {
                const [h, p] = source.why[idx];
                return (
                  <article key={idx} className="wc rv" style={{ "--i": k, "--sp": WHY_SPAN[k] }}>
                    <span className="ib"><Ic n={WHY_ICON[idx]} /></span>
                    <h3>{h}</h3>
                    {p && <p>{p}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="sec" id="tools">
          <div className="w">
            <div className="hd2">
              <h2 className="rv">{source.toolsT}</h2>
              <p className="sub rv" style={{ "--i": 1 }}>{source.toolsS}</p>
            </div>
            <div className="rv" style={{ "--i": 2 }}>
              <ToolsSection tools={source.tools} />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="sec tint" id="how">
          <div className="w">
            <HowSection steps={source.steps} howT={source.howT} watch={source.watch} />
          </div>
        </section>

        {/* ── ROLE-SPECIFIC FEATURES ── */}
        <section className="experience-features" id="experience-features">
          <div className="experience-section-heading">
            <span className="experience-eyebrow"><i />{role.kicker}</span>
            <h2>{role.featureTitle}</h2>
            <p>{role.featureIntro}</p>
          </div>
          <div className="experience-feature-grid">
            {role.features.map(([title, text], i) => (
              <article className="experience-feature" key={title}>
                <span className="feature-number">0{i + 1}</span>
                <span className="feature-symbol">{symbols[(i + index) % symbols.length]}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="feature-rule" />
              </article>
            ))}
          </div>
        </section>

        {/* ── WORKFLOW ── */}
        <section className="experience-flow">
          <div className="experience-flow-heading">
            <span className="experience-eyebrow"><i />{t.workflowLabel}</span>
            <h2>{role.workflowTitle}</h2>
          </div>
          <ol className="experience-flow-list">
            {role.workflow.map((step, i) => <li key={step}><span>0{i + 1}</span><b>{step}</b></li>)}
          </ol>
        </section>

        {/* ── TENANTS SECTION ── */}
        <section className="sec tn" id="tenants">
          <div className="w tnw">
            <div>
              <h2 className="rv">{source.tenT}</h2>
              <p className="sub rv" style={{ "--i": 1 }}>{source.tenS}</p>
            </div>
            <div className="tenants-grid">
              {source.ten.map(([h, p], i) => (
                <article key={i} className="tc rv" style={{ "--i": i }}>
                  <span className="ib"><Ic n={TEN_ICON[i]} /></span>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOBILE APP ── */}
        <section className="experience-mobile" id="experience-mobile">
          <div className="experience-mobile-copy">
            <span className="experience-eyebrow"><i />{role.visualTitle}</span>
            <h2>{role.mobileTitle}</h2>
            <p>{role.mobileCopy}</p>
            <ul>{role.mobileItems.map(item => <li key={item}><span>✓</span>{item}</li>)}</ul>
          </div>
          <PhonePreview role={role} index={index} />
        </section>

        {/* ── APP SECTION ── */}
        <section className="sec" id="app">
          <div className="w appw">
            <div>
              <h2 className="rv">{source.appT}</h2>
              <p className="sub rv" style={{ "--i": 1 }}>{source.appS}</p>
              <ul className="al">
                {source.app.map((x, i) => (
                  <li key={i} className="rv" style={{ "--i": i + 2 }}>
                    <span><Ic n="check" /></span>{x}
                  </li>
                ))}
              </ul>
              <div className="stores rv" style={{ "--i": 7 }}>
                <Store href={LINKS.appStore} label={source.stores[0]} />
                <Store href={LINKS.googlePlay} label={source.stores[1]} />
              </div>
            </div>
            <div className="rv" style={{ "--i": 2 }}>
              <PhoneDemo badges={source.badges} />
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="sec tint" id="pricing">
          <div className="w">
            <h2 className="rv c">{source.priceT}</h2>
            <div className="pcs">
              {source.price.map(([tag, big, per, sub, note, incl], i) => (
                <article key={i} className={"pc rv" + (i === 1 ? " hot" : "")} style={{ "--i": i }}>
                  <small>{tag}</small>
                  <b>{big}</b>
                  {per && <span className="per">{per}</span>}
                  {sub && <h3>{sub}</h3>}
                  {note && <p>{note}</p>}
                  {incl.length > 0 && (
                    <ul>
                      {incl.map(x => <li key={x}><Ic n="check" />{x}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="experience-cta" id="experience-contact">
          <div>
            <span className="experience-eyebrow"><i />Arendnik</span>
            <h2>{role.ctaTitle}</h2>
            <p>{role.ctaCopy}</p>
          </div>
          <a className="experience-button experience-button-light" href={TEL}>
            {t.contact}<span>↗</span>
          </a>
        </section>

        {/* ── CONTACT BANNER ── */}
        <section className="sec" id="contact">
          <div className="w">
            <div className="ban rv">
              <div>
                <h2>{source.agentsT}</h2>
                <p>{source.agentsP}</p>
              </div>
              <a className="btn wh" href={TEL}>
                <Ic n="phone" />
                {phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ft">
        <div className="w">
          <a href="#top" className="logo"><img src={logo} alt="Arendnik" /></a>
          <nav>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <a key={i} href={"#" + ANCHORS[i]}>{source.rooms[i]}</a>
            ))}
          </nav>
          <small>© Arendnik</small>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ROOT EXPORT
════════════════════════════════════════════════════════ */
export default function AudienceExperience({ lang, role, onChoose, onLanguageChange }) {
  const validRole = Number.isInteger(role) && role >= 0 && role < copy[lang].roles.length ? role : null;
  return validRole === null
    ? <Welcome lang={lang} onChoose={onChoose} onLanguageChange={onLanguageChange} />
    : <PersonaPage lang={lang} index={validRole} onChoose={onChoose} onLanguageChange={onLanguageChange} />;
}