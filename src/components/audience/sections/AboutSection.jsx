export function AboutSection({ source }) {
  const n = source.domains.length;
  const points = source.domains.map((_, i) => {
    const a = ((-90 + (n % 2 ? 0 : 180 / n) + (i * 360) / n) * Math.PI) / 180;
    return [+(50 + 42 * Math.cos(a)).toFixed(1), +(50 + 42 * Math.sin(a)).toFixed(1)];
  });
  return (
    <section className="sec" id="about">
      <div className="w about">
        <div>
          <h2 className="rv">{source.aboutT}</h2>
          <ul className="about-domains rv" style={{ "--i": 1 }}>
            {source.domains.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </ul>
          <p className="sub rv" style={{ "--i": 1 }}>
            {source.aboutP}
          </p>
        </div>
        <div className="hub rv in-hub" style={{ "--i": 1 }}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {points.map(([x, y], i) => (
              <path
                key={i}
                d={`M50 50L${x} ${y}`}
                pathLength="100"
                style={{ transitionDelay: 300 + i * 120 + "ms" }}
              />
            ))}
          </svg>
          <div className="core">
            <i />
          </div>
          {source.domains.map((d, i) => (
            <span
              key={i}
              className="node"
              style={{
                left: points[i][0] + "%",
                top: points[i][1] + "%",
                "--i": i,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
