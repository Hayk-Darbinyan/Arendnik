import { Ic } from "../shared/Icons.jsx";

const WHY_ICON = ["pay", "trend", "doc", "tool", "chat", "bell", "chart"];
const WHY_ORDER = [0, 1, 3, 2, 4, 5];
const WHY_SPAN = [1, 1, 1, 2, 1, 2, 1];

export function WhySection({ source }) {
  return (
    <section className="sec tint" id="why">
      <div className="w">
        <h2 className="rv c">{source.whyT}</h2>
        <div className="why">
          {WHY_ORDER.map((idx, k) => {
            const [h, p] = source.why[idx];
            return (
              <article
                key={idx}
                className="wc rv"
                style={{ "--i": k, "--sp": WHY_SPAN[k] }}
              >
                <span className="ib">
                  <Ic n={WHY_ICON[idx]} />
                </span>
                <h3>{h}</h3>
                {p && <p>{p}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
