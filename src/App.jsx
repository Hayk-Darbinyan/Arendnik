import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import AudienceExperience from "./AudienceExperience.jsx";


const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=60`;
const PHOTOS = [
  "1545324418-cc1a3fa10c00",
  "1502672260266-1c1ef2d93688",
  "1560448204-e02f11c3d0e2",
];
const PHONE = "+1 800 123 4567";
const TEL = "tel:" + PHONE.replace(/\s/g, "");
const ANCHORS = [
  "",
  "about",
  "why",
  "tools",
  "how",
  "tenants",
  "app",
  "pricing",
  "contact",
];
const WHY_ICON = ["pay", "trend", "doc", "tool", "chat", "bell", "chart"];
const TOOL_ICON = ["chat", "bell", "tool", "doc", "link", "pay", "chart"];
const TOOL_MOCK = ["chat", "remind", "maint", "doc", "link", "card", "chart"];
const TEN_ICON = ["chat", "camera", "pay", "bell"];
const WHY_ORDER = [0, 1, 3, 2, 4, 5, 6],
  WHY_SPAN = [1, 1, 1, 2, 1, 2, 1];
const PHONE_KINDS = ["pay", "maint", "tasks", "chat"];

const P = {
  pay: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10.5h18M7 15h3" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </>
  ),
  tool: <path d="M14.5 6.5a4 4 0 005 5L10 21a2.1 2.1 0 01-3-3z" />,
  chat: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15z" />
      <path d="M10 21h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  phone: (
    <path d="M6 3h4l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2L21 14.5V18a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M2 21h20" />
      <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M11 21v-3h2v3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5M5 9v12h14V9M9 21v-7h6v7" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};
const Ic = ({ n }) => (
  <svg
    className="ic"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {P[n]}
  </svg>
);

// Abstract UI previews built from skeleton shapes (no invented data).
const S = ({ w = 100, c = "" }) => (
  <i className={"sk " + c} style={{ width: w + "%" }} />
);
function Mock({ kind }) {
  const r3 = [0, 1, 2];
  switch (kind) {
    case "chat":
      return (
        <div className="mock">
          <div className="bub l">
            <S w={85} />
            <S w={55} />
          </div>
          <div className="bub r">
            <S w={70} />
          </div>
          <div className="bub l">
            <S w={60} />
          </div>
          <div className="bub r">
            <S w={90} />
            <S w={45} />
          </div>
          <div className="inp">
            <S w={55} />
            <b />
          </div>
        </div>
      );
    case "remind":
      return (
        <div className="mock">
          {r3.map((i) => (
            <div key={i} className="row">
              <span className="dot">
                <Ic n="bell" />
              </span>
              <div className="grow">
                <S w={80 - i * 12} />
                <S w={42} c="s" />
              </div>
              <span className={"tg" + (i !== 1 ? " on" : "")} />
            </div>
          ))}
        </div>
      );
    case "maint":
      return (
        <div className="mock">
          {[78, 46, 22].map((w, i) => (
            <div key={i} className="row">
              <span className="th">
                <Ic n="camera" />
              </span>
              <div className="grow">
                <S w={70 - i * 10} />
                <div className="pr">
                  <u style={{ width: w + "%" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "doc":
      return (
        <div className="mock">
          <div className="paper">
            {[92, 80, 96, 64].map((w, i) => (
              <S key={i} w={w} />
            ))}
            <svg className="sign" viewBox="0 0 90 26">
              <path
                d="M2 20c8-20 12 4 20-6s9 8 17 0 10-9 16-2 9 5 17 1"
                pathLength="100"
              />
            </svg>
          </div>
          <div className="row ok">
            <span className="dot">
              <Ic n="check" />
            </span>
            <div className="grow">
              <S w={45} />
            </div>
          </div>
        </div>
      );
    case "link":
      return (
        <div className="mock nodes">
          <b />
          <em />
          <b />
          <em />
          <b />
        </div>
      );
    case "card":
      return (
        <div className="mock">
          <div className="cc">
            <S w={35} c="w" />
            <S w={70} c="w" />
          </div>
          <div className="row">
            <div className="grow">
              <S w={60} />
            </div>
            <span className="tg on" />
          </div>
          <div className="pbtn">
            <S w={30} c="w" />
          </div>
        </div>
      );
    case "chart":
      return (
        <div className="mock">
          <div className="bars">
            {[42, 66, 52, 80, 62, 94].map((h, i) => (
              <u
                key={i}
                style={{ height: h + "%", animationDelay: i * 70 + "ms" }}
              />
            ))}
          </div>
          <div className="row">
            <div className="grow">
              <S w={50} />
            </div>
            <S w={20} />
          </div>
        </div>
      );
    case "tasks":
      return (
        <div className="mock">
          {[1, 1, 0, 0].map((d, i) => (
            <div key={i} className="row">
              <span className={"cb" + (d ? " on" : "")}>
                {d ? <Ic n="check" /> : null}
              </span>
              <div className="grow">
                <S w={78 - i * 9} />
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="mock">
          {[
            ["in", 70],
            ["out", 55],
            ["in", 80],
          ].map(([d, w], i) => (
            <div key={i} className="row">
              <span className={"arr " + d}>
                <Ic n="arrow" />
              </span>
              <div className="grow">
                <S w={w} />
                <S w={35} c="s" />
              </div>
              <S w={18} />
            </div>
          ))}
        </div>
      );
  }
}

function Counter({ to, suffix }) {
  const [n, setN] = useState(0),
    ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now(),
          end = +to;
        const tick = (t) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
          p < 1 && requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <b ref={ref}>
      {n}
      {suffix}
    </b>
  );
}

function Photos() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PHOTOS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="photos">
      {PHOTOS.map((id, k) => (
        <img
          key={id}
          src={img(id, 900)}
          alt=""
          width="900"
          height="900"
          className={k === i ? "on" : ""}
          loading={k ? "lazy" : "eager"}
          decoding="async"
        />
      ))}
    </div>
  );
}

const Logo = () => (
  <a href="#top" className="logo">
    <img src={logo} alt="Arendnik" />
  </a>
);
const Store = ({ href, label }) => (
  <a
    className="store"
    href={href || "#"}
    target="_blank"
    rel="noopener"
    aria-disabled={!href}
    onClick={(e) => {
      if (!href) e.preventDefault();
    }}
  >
    <small>{label[0]}</small>
    <b>{label[1]}</b>
  </a>
);

function ToolPreview({ t, s, inline = false }) {
  return (
    <div className={`tp ${inline ? "tp-inline" : "tp-desktop"}`}>
      <div className="tph">
        <span className="ib">
          <Ic n={TOOL_ICON[s]} />
        </span>
        <b>{t.tools[s]}</b>
      </div>
      <div className="tpb" key={s}>
        <Mock kind={TOOL_MOCK[s]} />
      </div>
    </div>
  );
}

function Tools({ t }) {
  const [s, setS] = useState(0);
  const [stacked, setStacked] = useState(() =>
    window.matchMedia("(max-width: 1024px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const update = () => setStacked(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (stacked) return;
    const i = setTimeout(() => setS((x) => (x + 1) % 7), 5200);
    return () => clearTimeout(i);
  }, [s, stacked]);
  return (
    <div className="tools">
      <div className="tl">
        {t.tools.map((x, i) => (
          <div key={i} className="tool-item">
            <button
              className={i === s ? "on" : ""}
              aria-pressed={i === s}
              onClick={() => setS(i)}
            >
              <span className="ib">
                <Ic n={TOOL_ICON[i]} />
              </span>
              {x}
            </button>
            {i === s && <ToolPreview t={t} s={s} inline />}
          </div>
        ))}
      </div>
      <ToolPreview t={t} s={s} />
    </div>
  );
}

function UserTypeSelector({ t }) {
  const [selected, setSelected] = useState(0);
  const icons = ["building", "briefcase", "home"];
  const audience = t.audiences[selected];
  return (
    <div className="audience-selector">
      <div className="audience-options" aria-label={t.audienceNav}>
        {t.audiences.map((item, i) => (
          <button
            key={item.label}
            className={i === selected ? "audience-option on" : "audience-option"}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            <span className="audience-option-icon"><Ic n={icons[i]} /></span>
            <span>{item.label}</span>
            <span className="audience-option-number">0{i + 1}</span>
          </button>
        ))}
      </div>
      <article className="audience-panel" key={selected} aria-live="polite">
        <div className="audience-copy">
          <span className="audience-kicker">0{selected + 1} / 03</span>
          <h3>{audience.title}</h3>
          <p>{audience.description}</p>
        </div>
        <div className="audience-visual" aria-hidden="true">
          <div className="audience-orbit audience-orbit-outer" />
          <div className="audience-orbit audience-orbit-inner" />
          <span className="audience-mark"><Ic n={icons[selected]} /></span>
          <span className="audience-spark audience-spark-one" />
          <span className="audience-spark audience-spark-two" />
        </div>
      </article>
    </div>
  );
}

function How({ t }) {
  const [a, setA] = useState(0),
    [shown, setShown] = useState(() => new Set()),
    refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setA(+e.target.dataset.i);
        }),
      { rootMargin: "-42% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const index = +e.target.dataset.i;
          setShown((current) => {
            if (current.has(index)) return current;
            const next = new Set(current);
            next.add(index);
            return next;
          });
          io.unobserve(e.target);
        }),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="how">
      <div className="hl">
        <h2 className="rv">{t.howT}</h2>
        <div className="big" aria-hidden="true">
          {String(a + 1).padStart(2, "0")}
          <small>/ 08</small>
        </div>
        <div className="prog">
          <i style={{ transform: `scaleX(${(a + 1) / 8})` }} />
        </div>
        <p className="cur">{t.steps[a][0]}</p>
      </div>
      <ol className="stl">
        {t.steps.map(([h, p], i) => (
          <li
            key={i}
            data-i={i}
            ref={(el) => (refs.current[i] = el)}
            className={
              "stp" + (shown.has(i) ? " in" : "") + (i === a ? " act" : "")
            }
          >
            <span className="n">{i + 1}</span>
            <div>
              <h3>{h}</h3>
              <p>{p}</p>
              {LINKS.tutorials[i] && (
                <a
                  className="lnk"
                  href={LINKS.tutorials[i]}
                  target="_blank"
                  rel="noopener"
                >
                  {t.watch} <Ic n="arrow" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PhoneDemo({ t }) {
  const [s, setS] = useState(0);
  useEffect(() => {
    const i = setTimeout(() => setS((x) => (x + 1) % 4), 3200);
    return () => clearTimeout(i);
  }, [s]);
  return (
    <div className="pw">
      <div className="phone">
        <div className="notch" />
        <div className="ph-h">
          <Logo />
        </div>
        <div className="seg">
          {t.badges.map((b, i) => (
            <button
              key={i}
              className={i === s ? "on" : ""}
              onClick={() => setS(i)}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="pb" key={s}>
          <Mock kind={PHONE_KINDS[s]} />
        </div>
      </div>
      <span className="fc f1">
        <Ic n="camera" />
        {t.badges[1]}
      </span>
      <span className="fc f2">
        <Ic n="chat" />
        {t.badges[3]}
      </span>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const location = useLocation();
  const navigate = useNavigate();
  const rolePaths = ["/community", "/broker", "/tenant"];
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Redirect legacy /platform/* routes
  const platformMatch = pathname.match(/^\/platform\/(community|broker|tenant)$/);
  if (platformMatch) {
    return <Navigate to={"/" + platformMatch[1]} replace />;
  }

  const routeRole = rolePaths.indexOf(pathname);
  const role = pathname === "/" ? null : routeRole;
  const validPath = pathname === "/" || role >= 0;

  const chooseRole = (nextRole) => {
    if (nextRole === undefined) {
      navigate("/");
    } else {
      navigate(rolePaths[nextRole] || "/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!validPath) return <Navigate to="/" replace />;

  return (
    <AudienceExperience
      lang={lang}
      role={role}
      onChoose={chooseRole}
      onLanguageChange={setLang}
    />
  );
}

