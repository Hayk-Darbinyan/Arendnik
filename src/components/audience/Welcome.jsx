import { useEffect, useRef, useState } from "react";
import logo from "../../assets/arendnik.png";
import copy from "../../experiences.js";
import { Ic } from "./shared/Icons.jsx";
import { LanguageControl } from "./shared/LanguageControl.jsx";

/* ════════════════════════════════════════════════════════
   PARTICLE FIELD — brand-blue network that reacts to cursor
════════════════════════════════════════════════════════ */
function ParticleField({ pointerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, Math.max(28, (w * h) / 22000)));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.9,
      }));
    };

    const LINK = 130;
    const REACH = 190;
    const PUSH = 120;

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const m = pointerRef.current;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;

          if (m) {
            const dx = p.x - m.x;
            const dy = p.y - m.y;
            const d = Math.hypot(dx, dy);
            if (d < PUSH && d > 0.01) {
              const f = (1 - d / PUSH) * 1.6;
              p.x += (dx / d) * f;
              p.y += (dy / d) * f;
            }
          }
        }

        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(30,59,179,${(1 - d / LINK) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (m) {
          const d = Math.hypot(p.x - m.x, p.y - m.y);
          if (d < REACH) {
            ctx.strokeStyle = `rgba(30,59,179,${(1 - d / REACH) * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(30,59,179,.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [pointerRef]);

  return <canvas ref={canvasRef} className="ws-particles" aria-hidden="true" />;
}

/* ════════════════════════════════════════════════════════
   WELCOME SCREEN — Fullscreen Split-Screen Panels
   Audience selection page
════════════════════════════════════════════════════════ */
export function Welcome({ lang, onChoose, onLanguageChange }) {
  const t = copy[lang];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const rootRef = useRef(null);
  const pointerRef = useRef(null);
  const rafRef = useRef(0);
  const roleIcons = ["building", "briefcase"];

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
  ];

  /* Global cursor tracking → CSS variables (throttled via rAF) */
  const handlePointerMove = (e) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    pointerRef.current = { x, y };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--nx", ((x / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--ny", ((y / r.height) * 2 - 1).toFixed(3));
    });
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--nx", "0");
    el.style.setProperty("--ny", "0");
  };

  /* Per-panel spotlight + tilt variables */
  const handlePanelMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);
    el.style.setProperty("--tx", ((x / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--ty", ((y / r.height) * 2 - 1).toFixed(3));
  };

  const handlePanelLeave = (e) => {
    e.currentTarget.style.setProperty("--tx", "0");
    e.currentTarget.style.setProperty("--ty", "0");
    setHoveredIndex(null);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <main
      ref={rootRef}
      className={`welcome-screen-fullscreen ${hoveredIndex !== null ? "has-hover" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Ambient background: parallax layers + particle network */}
      <div className="ws-bg-canvas" aria-hidden="true">
        <div className="ws-layer" style={{ "--d": 18 }}>
          <div className="ws-ambient-blob ws-ambient-blob-1" />
        </div>
        <div className="ws-layer" style={{ "--d": -26 }}>
          <div className="ws-ambient-blob ws-ambient-blob-2" />
        </div>
        <div className="ws-layer" style={{ "--d": 10 }}>
          <div className="ws-ambient-blob ws-ambient-blob-3" />
        </div>
        <div className="ws-layer" style={{ "--d": 34 }}>
          <div className="ws-ambient-ring ws-ambient-ring-1" />
        </div>
        <div className="ws-layer" style={{ "--d": -40 }}>
          <div className="ws-ambient-ring ws-ambient-ring-2" />
        </div>
        <div className="ws-ambient-grid" />
        <ParticleField pointerRef={pointerRef} />
        <div className="ws-cursor-glow" />
        <div className="ws-cursor-ring" />
      </div>

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

      {/* Split-screen panels */}
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
              style={{ "--i": index }}
              className={`ws-panel ws-panel-${index} ${isHovered ? "is-expanded" : ""} ${isDimmed ? "is-dimmed" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={handlePanelMove}
              onMouseLeave={handlePanelLeave}
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
              {/* Cursor-following spotlight + grid */}
              <div className="ws-panel-bg" aria-hidden="true">
                <div className="ws-panel-spot" />
                <div className="ws-panel-grid-lines" />
              </div>

              <div className="ws-panel-header ws-rise" style={{ "--s": 0 }}>
                <span className="ws-panel-num">0{index + 1}</span>
                <span className="ws-panel-badge">{hls.badge}</span>
                <span className="ws-panel-icon-wrap" aria-hidden="true">
                  <Ic n={roleIcons[index]} />
                </span>
              </div>

              <div className="ws-panel-main">
                <span className="ws-panel-audience-tag ws-rise" style={{ "--s": 1 }}>{role.kicker}</span>
                <h2 className="ws-panel-title ws-rise" style={{ "--s": 2 }}>{role.name}</h2>
                <p className="ws-panel-desc ws-rise" style={{ "--s": 3 }}>{role.descriptor}</p>

                <div className="ws-panel-features">
                  {hls.features.map((item, fIdx) => (
                    <div
                      key={fIdx}
                      className="ws-feature-pill ws-rise"
                      style={{ "--s": 4 + fIdx }}
                    >
                      <span className="ws-feature-bullet" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="ws-panel-metrics ws-rise" style={{ "--s": 7 }}>
                  {hls.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="ws-metric-item">
                      <span className="ws-metric-val">{m.val}</span>
                      <span className="ws-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ws-panel-footer ws-rise" style={{ "--s": 8 }}>
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

export default Welcome;