export function AboutSection({ source }) {
  return (
    <section className="sec" id="about">
      <div className="w about">
        <div>
          <h2 className="rv">{source.aboutT}</h2>
          <p className="sub rv" style={{ "--i": 1 }}>
            {source.aboutP}
          </p>
        </div>
        <div className="hub rv in-hub" style={{ "--i": 1 }}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {[[50, 8], [90, 37], [75, 84], [25, 84], [10, 37]].map(([x, y], i) => (
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
                left: [50, 90, 75, 25, 10][i] + "%",
                top: [8, 37, 84, 84, 37][i] + "%",
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
