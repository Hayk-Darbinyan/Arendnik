import { Ic } from "../shared/Icons.jsx";
import { BrandText } from "../shared/BrandText.jsx";

const TEN_ICON = ["chat", "camera", "pay", "bell"];

export function TenantsSection({ source }) {
  return (
    <section className="sec tn" id="tenants">
      <div className="w tnw">
        <div>
          <h2 className="rv"><BrandText>{source.tenT}</BrandText></h2>
          {source.tenS && (
            <p className="sub rv" style={{ "--i": 1 }}>
              <BrandText>{source.tenS}</BrandText>
            </p>
          )}
        </div>
        <div className="tenants-grid">
          {source.ten.map(([h, p], i) => (
            <article key={i} className="tc rv" style={{ "--i": i }}>
              <span className="ib">
                <Ic n={TEN_ICON[i]} />
              </span>
              <h3><BrandText>{h}</BrandText></h3>
              <p><BrandText>{p}</BrandText></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TenantsSection;
