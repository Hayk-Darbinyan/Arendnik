import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/arendnik.png";

const ANCHORS = ["", "about", "why", "tools", "how", "tenants", "app", "pricing"];
const navLinks = [1, 3, 4, 5, 6, 7];

export function PersonaHeader({ lang, source, t, onChoose, onLanguageChange, headRef }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef();

  useEffect(() => {
    if (!langOpen) return;
    const closeOutside = (e) => {
      if (!langRef.current?.contains(e.target)) setLangOpen(false);
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [langOpen]);

  return (
    <header className="hd platform-hd persona-full-hd" ref={headRef}>
      <div
        className="w"
        style={{
          width: "min(1320px, 96%)",
          display: "flex",
          alignItems: "center",
          gap: ".8rem",
          height: "68px",
        }}
      >
        <a href="#top" className="logo">
          <img src={logo} alt="Arendnik" />
        </a>
        <button
          className="platform-back hide-m"
          type="button"
          onClick={() => {
            onChoose(undefined);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span aria-hidden="true">←</span> {t.changeRole}
        </button>
        <nav
          className="nav"
          style={{
            flex: 1,
            justifyContent: "center",
            gap: "clamp(.45rem,.85vw,.85rem)",
            marginLeft: 0,
            whiteSpace: "nowrap",
          }}
        >
          {navLinks.map((i) => (
            <a
              key={i}
              href={"#" + ANCHORS[i]}
              style={{ fontSize: ".8rem", whiteSpace: "nowrap" }}
            >
              {source.rooms[i]}
            </a>
          ))}
        </nav>
        <div className="lang" ref={langRef}>
          <button
            className="lang-current"
            aria-label="Change language"
            aria-expanded={langOpen}
            aria-controls="persona-lang-menu"
            onClick={() => setLangOpen((o) => !o)}
          >
            {lang.toUpperCase()}
            <span className="lang-chevron" aria-hidden="true" />
          </button>
          <div className="lang-menu" id="persona-lang-menu" hidden={!langOpen}>
            {["hy", "ru", "en"].map((l) => (
              <button
                key={l}
                className={l === lang ? "on" : ""}
                aria-pressed={l === lang}
                onClick={() => {
                  onLanguageChange(l);
                  setLangOpen(false);
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <a className="btn sm hide-m" href="/auth-preview">
          {source.login}
        </a>
        <button
          className={"burger" + (open ? " open" : "")}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={"mnav" + (open ? " open" : "")}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <a key={i} href={"#" + ANCHORS[i]} onClick={() => setOpen(false)}>
            {source.rooms[i]}
          </a>
        ))}
        <button
          className="platform-back"
          type="button"
          onClick={() => {
            onChoose(undefined);
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span aria-hidden="true">←</span> {t.changeRole}
        </button>
        <a href="/auth-preview" onClick={() => setOpen(false)}>
          {source.login}
        </a>
      </div>
    </header>
  );
}

export default PersonaHeader;
