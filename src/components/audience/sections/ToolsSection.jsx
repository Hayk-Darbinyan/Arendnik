import { useEffect, useState } from "react";
import { Ic } from "../shared/Icons.jsx";
import { Mock } from "../shared/Mock.jsx";

const TOOL_ICON = ["chat", "bell", "tool", "doc", "link", "pay", "chart"];
const TOOL_MOCK = ["chat", "remind", "maint", "doc", "link", "card", "chart"];

export function ToolPreview({ tools, s, inline = false }) {
  return (
    <div className={`tp ${inline ? "tp-inline" : "tp-desktop"}`}>
      <div className="tph">
        <span className="ib">
          <Ic n={TOOL_ICON[s]} />
        </span>
        <b>{tools[s]}</b>
      </div>
      <div className="tpb" key={s}>
        <Mock kind={TOOL_MOCK[s]} />
      </div>
    </div>
  );
}

export function ToolsInteractive({ tools }) {
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
    const i = setTimeout(() => setS((x) => (x + 1) % 7), 5200);
    return () => clearTimeout(i);
  }, [s, stacked]);

  return (
    <div className="tools">
      <div className="tl">
        {tools.map((x, i) => (
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
            {i === s && <ToolPreview tools={tools} s={s} inline />}
          </div>
        ))}
      </div>
      <ToolPreview tools={tools} s={s} />
    </div>
  );
}

export function ToolsSection({ source }) {
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
          <ToolsInteractive tools={source.tools} />
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
