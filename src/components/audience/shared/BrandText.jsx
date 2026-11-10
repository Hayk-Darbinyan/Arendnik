import logo from "../../../assets/arendnik.png";

const BRAND_PARTS = /(Arendnik|Արենդնիկ|Арендник)/gi;
const BRAND_WORD = /^(Arendnik|Արենդնիկ|Арендник)$/i;

export function BrandText({ children }) {
  if (typeof children !== "string") return children;

  return children.split(BRAND_PARTS).map((part, index) =>
    BRAND_WORD.test(part) ? (
      <img key={index} className="brand-wordmark" src={logo} alt={part} />
    ) : (
      part
    ),
  );
}

export default BrandText;