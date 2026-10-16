import { useEffect, useState } from "react";

export const IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1500&q=85",
];

export function Photos({ images = IMAGES }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 6000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="photos">
      {images.map((src, k) => (
        <img
          key={src}
          src={src}
          alt=""
          width="900"
          height="900"
          className={k === i ? "on" : ""}
          loading={k ? "lazy" : "eager"}
          decoding="async"
        />
      ))}
    </div>
  );
}

export default Photos;
