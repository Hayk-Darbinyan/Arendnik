import { Ic } from "../shared/Icons.jsx";
import { BrandText } from "../shared/BrandText.jsx";

const WHY_ICON = ["pay", "trend", "doc", "tool", "chat", "bell", "chart"];
const WHY_ORDER = [0, 1, 3, 2, 4, 5];

export function WhySection({ source }) {
  return (
    <section className="sec tint" id="why">
      <div className="w">
        <h2 className="rv c"><BrandText>{source.whyT}</BrandText></h2>
        <div className="why">
          {WHY_ORDER.filter((idx) => idx < source.why.length).map((idx, k) => {
            const [h, p] = source.why[idx];
            return (
              <article
                key={idx}
                className="wc rv"
                style={{ "--i": k }}
              >
                <span className="ib">
                  <Ic n={WHY_ICON[idx]} />
                </span>
                <h3><BrandText>{h}</BrandText></h3>
                {p && <p><BrandText>{p}</BrandText></p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
