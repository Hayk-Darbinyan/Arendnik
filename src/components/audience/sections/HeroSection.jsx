import { Counter } from "../shared/Counter.jsx";
import { Ic } from "../shared/Icons.jsx";
import { Mock } from "../shared/Mock.jsx";
import { Photos } from "../shared/Photos.jsx";

export function HeroSection({ role, source, b1Ref, b2Ref }) {
  return (
    <section className="persona-hero">
      <div className="blob b1" ref={b1Ref} />
      <div className="blob b2" ref={b2Ref} />
      <div className="w hg">
        <div className="hc">
          <h1 className="rv" style={{ "--i": 1 }}>
            {role.title}
          </h1>
          <p className="lead rv" style={{ "--i": 2 }}>
            {role.intro}
          </p>
          <div className="ctas rv" style={{ "--i": 3 }}>
            <a className="btn" href="#how">
              {role.primary} <Ic n="arrow" />
            </a>
            <a className="btn ghost" href="#pricing">
              {source.cta[1]}
            </a>
          </div>
          <div className="facts rv" style={{ "--i": 4 }}>
            {source.stats.map(([n, s, l], i) => (
              <div key={i}>
                <Counter to={n} suffix={s} />
                <span>{l}</span>
              </div>
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
              {["pay", "chat", "tool", "chart"].map((n) => (
                <span key={n}>
                  <Ic n={n} />
                </span>
              ))}
            </div>
            <div className="dm">
              <div className="dtabs">
                {source.badges.map((b, i) => (
                  <span key={i} className={i === 0 ? "on" : ""}>
                    {b}
                  </span>
                ))}
              </div>
              <Mock kind="chart" />
            </div>
          </div>
          <span className="fc f1">
            <Ic n="pay" />
            {source.tools[5]}
          </span>
          <span className="fc f2">
            <Ic n="doc" />
            {source.why[2][0]}
          </span>
          <span className="fc f3">
            <Ic n="bell" />
            {source.why[5][0]}
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
