import { useEffect, useState } from "react";
import logo from "../../../assets/arendnik.png";
import { LINKS } from "../../../links.js";
import { Ic } from "../shared/Icons.jsx";
import { Mock } from "../shared/Mock.jsx";
import { Store } from "../shared/Store.jsx";

const PHONE_KINDS = ["pay", "maint", "tasks", "chat"];

export function PhoneDemo({ badges }) {
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
          <a href="#top" className="logo">
            <img src={logo} alt="Arendnik" />
          </a>
        </div>
        <div className="seg">
          {badges.map((b, i) => (
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
        {badges[1]}
      </span>
      <span className="fc f2">
        <Ic n="chat" />
        {badges[3]}
      </span>
    </div>
  );
}

export function AppSection({ source }) {
  return (
    <section className="sec" id="app">
      <div className="w appw">
        <div>
          <h2 className="rv">{source.appT}</h2>
          <p className="sub rv" style={{ "--i": 1 }}>
            {source.appS}
          </p>
          <ul className="al">
            {source.app.map((x, i) => (
              <li key={i} className="rv" style={{ "--i": i + 2 }}>
                <span>
                  <Ic n="check" />
                </span>
                {x}
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
  );
}

export default AppSection;
