import { useEffect, useState } from "react";
import { Ic } from "../shared/Icons.jsx";
import { ToolContentPreview } from "./ToolContentPreview.jsx";

const TOOL_ICON = ["chat", "bell", "camera", "tool", "doc", "link", "pay", "chart"];
const TOOL_MOCK = ["chat", "remind", "maint", "tasks", "doc", "link", "card", "chart"];

export function ToolPreview({ tools, ids, s, lang, inline = false }) {
  const id = ids[s];
  return (
    <div className={`tp ${inline ? "tp-inline" : "tp-desktop"}`}>
      <div className="tph">
        <span className="ib">
          <Ic n={TOOL_ICON[id]} />
        </span>
        <b>{tools[id]}</b>
      </div>
      <div className="tpb" key={s}>
        <ToolContentPreview index={id} lang={lang} />
      </div>
    </div>
  );
}

export function ToolsInteractive({ tools, ids = tools.map((_, i) => i), lang }) {
  const [s, setS] = useState(0);
  const [stacked, setStacked] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const update = () => setStacked(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (stacked) return;
    const i = setTimeout(() => setS((x) => (x + 1) % ids.length), 5200);
    return () => clearTimeout(i);
  }, [s, stacked]);

  return (
    <div className="tools">
      <div className="tl">
        {ids.map((id, i) => (
          <div key={id} className="tool-item">
            <button
              className={i === s ? "on" : ""}
              aria-pressed={i === s}
              onClick={() => setS(i)}
            >
              <span className="ib">
                <Ic n={TOOL_ICON[id]} />
              </span>
              {tools[id]}
            </button>
            {i === s && <ToolPreview tools={tools} ids={ids} s={s} lang={lang} inline />}
          </div>
        ))}
      </div>
      <ToolPreview tools={tools} ids={ids} s={s} lang={lang} />
    </div>
  );
}

export function ToolsSection({ source, lang }) {
  return (
    <section className="sec" id="tools">
      <div className="w">
        <div className="hd2">
          <h2 className="rv">{source.toolsT}</h2>
          <p className="sub rv" style={{ "--i": 1 }}>
            {source.toolsS}
          </p>
        </div>
        <div className="rv" style={{ "--i": 2 }}>
          <ToolsInteractive tools={source.tools} ids={source.toolIds} lang={lang} />
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
