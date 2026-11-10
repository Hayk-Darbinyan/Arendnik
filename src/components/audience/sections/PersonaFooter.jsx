import logo from "../../../assets/arendnik.png";
import { BrandText } from "../shared/BrandText.jsx";

const ANCHORS = ["", "about", "why", "tools", "how", "tenants", "app", "pricing"];

export function PersonaFooter({ source }) {
  return (
    <footer className="ft">
      <div className="w">
        <a href="#top" className="logo">
          <img src={logo} alt="Arendnik" />
        </a>
        <nav>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <a key={i} href={"#" + ANCHORS[i]}>
              <BrandText>{source.rooms[i]}</BrandText>
            </a>
          ))}
        </nav>
        <small>© <BrandText>Arendnik</BrandText></small>
      </div>
    </footer>
  );
}

export default PersonaFooter;
