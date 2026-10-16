import { useEffect, useRef, useState } from "react";

export function Counter({ to, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const end = +to;
        const tick = (t) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, [to]);

  return (
    <b ref={ref}>
      {n}
      {suffix}
    </b>
  );
}

export default Counter;
