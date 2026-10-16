import { Ic } from "../shared/Icons.jsx";

const TEN_ICON = ["chat", "camera", "pay", "bell"];

export function TenantsSection({ source }) {
  return (
    <section className="sec tn" id="tenants">
      <div className="w tnw">
        <div>
          <h2 className="rv">{source.tenT}</h2>
          <p className="sub rv" style={{ "--i": 1 }}>
            {source.tenS}
          </p>
        </div>
        <div className="tenants-grid">
          {source.ten.map(([h, p], i) => (
            <article key={i} className="tc rv" style={{ "--i": i }}>
              <span className="ib">
                <Ic n={TEN_ICON[i]} />
              </span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TenantsSection;
