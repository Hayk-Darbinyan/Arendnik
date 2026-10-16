import { useEffect, useRef, useState } from "react";
import { LINKS } from "../../../links.js";
import { Ic } from "../shared/Icons.jsx";

export function HowItWorks({ steps, howT, watch }) {
  const [a, setA] = useState(0);
  const [shown, setShown] = useState(() => new Set());
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setA(+e.target.dataset.i);
        }),
      { rootMargin: "-42% 0px -50% 0px" }
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
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="how">
      <div className="hl">
        <h2 className="rv">{howT}</h2>
        <div className="big" aria-hidden="true">
          {String(a + 1).padStart(2, "0")}
          <small>/ 08</small>
        </div>
        <div className="prog">
          <i style={{ transform: `scaleX(${(a + 1) / 8})` }} />
        </div>
        <p className="cur">{steps[a][0]}</p>
      </div>
      <ol className="stl">
        {steps.map(([h, p], i) => (
          <li
            key={i}
            data-i={i}
            ref={(el) => (refs.current[i] = el)}
            className={"stp" + (shown.has(i) ? " in" : "") + (i === a ? " act" : "")}
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

export function HowSection({ source }) {
  return (
    <section className="sec tint" id="how">
      <div className="w">
        <HowItWorks
          steps={source.steps}
          howT={source.howT}
          watch={source.watch}
        />
      </div>
    </section>
  );
}

export default HowSection;
