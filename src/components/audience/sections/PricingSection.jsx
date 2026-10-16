import { Ic } from "../shared/Icons.jsx";

export function PricingSection({ source }) {
  return (
    <section className="sec tint" id="pricing">
      <div className="w">
        <h2 className="rv c">{source.priceT}</h2>
        <div className="pcs">
          {source.price.map(([tag, big, per, sub, note, incl], i) => (
            <article
              key={i}
              className={"pc rv" + (i === 1 ? " hot" : "")}
              style={{ "--i": i }}
            >
              <small>{tag}</small>
              <b>{big}</b>
              {per && <span className="per">{per}</span>}
              {sub && <h3>{sub}</h3>}
              {note && <p>{note}</p>}
              {incl.length > 0 && (
                <ul>
                  {incl.map((x) => (
                    <li key={x}>
                      <Ic n="check" />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
