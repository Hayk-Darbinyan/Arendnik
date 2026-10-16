import { useEffect, useRef } from "react";
import copy from "../../experiences.js";
import T from "../../i18n.js";
import { PHONE } from "../../links.js";

import { AboutSection } from "./sections/AboutSection.jsx";
import { AppSection } from "./sections/AppSection.jsx";
import { CtaSection } from "./sections/CtaSection.jsx";
import { HeroSection } from "./sections/HeroSection.jsx";
import { HowSection } from "./sections/HowSection.jsx";
import { PersonaFooter } from "./sections/PersonaFooter.jsx";
import { PersonaHeader } from "./sections/PersonaHeader.jsx";
import { PricingSection } from "./sections/PricingSection.jsx";
import { TenantsSection } from "./sections/TenantsSection.jsx";
import { ToolsSection } from "./sections/ToolsSection.jsx";
import { WhySection } from "./sections/WhySection.jsx";

/* ════════════════════════════════════════════════════════
   PERSONA PAGE — full integrated experience
════════════════════════════════════════════════════════ */
export function PersonaPage({ lang, index, onChoose, onLanguageChange }) {
  const t = copy[lang];
  const source = T[lang];
  const role = t.roles[index];
  const phone = PHONE;
  const TEL = "tel:" + phone.replace(/\s/g, "");

  const bar = useRef();
  const head = useRef();
  const b1 = useRef();
  const b2 = useRef();

  /* scroll effects */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    let raf = 0;
    const on = () => {
      raf = 0;
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      if (head.current) {
        head.current.classList.toggle("sc", y > 8);
      }
      if (b1.current && y < 1000) {
        b1.current.style.transform = `translate3d(0,${y * 0.12}px,0)`;
      }
      if (b2.current && y < 1000) {
        b2.current.style.transform = `translate3d(0,${y * -0.08}px,0)`;
      }
    };

    const tick = () => {
      if (!raf) raf = requestAnimationFrame(on);
    };

    on();
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", tick);
      removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div className={`persona-page persona-${index}`}>
      {/* progress bar */}
      <div className="bar" ref={bar} />

      {/* header */}
      <PersonaHeader
        lang={lang}
        source={source}
        t={t}
        onChoose={onChoose}
        onLanguageChange={onLanguageChange}
        headRef={head}
      />

      <main id="top">
        {/* ── HERO ── */}
        <HeroSection role={role} source={source} b1Ref={b1} b2Ref={b2} />

        {/* ── ABOUT ── */}
        <AboutSection source={source} />

        {/* ── WHY ── */}
        <WhySection source={source} />

        {/* ── TOOLS ── */}
        <ToolsSection source={source} />

        {/* ── HOW IT WORKS ── */}
        <HowSection source={source} />

        {/* ── TENANTS SECTION ── */}
        <TenantsSection source={source} />

        {/* ── APP SECTION ── */}
        <AppSection source={source} />

        {/* ── PRICING ── */}
        <PricingSection source={source} />

        {/* ── CTA ── */}
        <CtaSection role={role} t={t} tel={TEL} />
      </main>

      {/* footer */}
      <PersonaFooter source={source} />
    </div>
  );
}

export default PersonaPage;
