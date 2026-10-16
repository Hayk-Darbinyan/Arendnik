import logo from "../../../assets/arendnik.png";

export const SYMBOLS = ["⌂", "▦", "◌", "✓"];

const images = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1500&q=85",
];

export function ProductWindow({ role, index }) {
  return (
    <div className={`product-window product-window-${index}`}>
      <div className="product-window-bar">
        <span className="product-window-brand">
          <i /> Arendnik
        </span>
        <div className="product-window-tools">
          <i />
          <i />
          <b>{role.visualTitle.slice(0, 1)}</b>
        </div>
      </div>
      <div className="product-window-body">
        <aside className="product-sidebar">
          {SYMBOLS.map((symbol, i) => (
            <i className={i === 0 ? "selected" : ""} key={symbol}>
              {symbol}
            </i>
          ))}
        </aside>
        <div className="product-content">
          <div className="product-title-row">
            <div>
              <span>{role.visualNote}</span>
              <b>{role.visualTitle}</b>
            </div>
            <i>•••</i>
          </div>
          {index === 0 && (
            <div className="product-metrics">
              {role.visualLabels.map((label, i) => (
                <div className="product-metric" key={label}>
                  <span>{label}</span>
                  <b className={`metric-mark metric-mark-${i}`} />
                </div>
              ))}
            </div>
          )}
          {index === 1 && (
            <div className="portfolio-preview">
              <div
                className="portfolio-image"
                style={{ backgroundImage: `url(${images[1]})` }}
              />
              <div>
                <b>{role.mock[1]}</b>
                <span>{role.mock[2]}</span>
                <i>{role.mock[3]}</i>
              </div>
            </div>
          )}
          <div className="product-rows">
            {role.mock.slice(4, 7).map((label, i) => (
              <div className="product-row" key={label}>
                <span className={`product-row-icon row-tone-${i}`}>
                  {SYMBOLS[(i + index + 1) % SYMBOLS.length]}
                </span>
                <span className="product-row-label">
                  <b>{label}</b>
                  <i />
                </span>
                <span className={`product-status product-status-${i}`}>
                  {i === 0 ? "•" : "✓"}
                </span>
              </div>
            ))}
          </div>
          <div className="product-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="product-float">
        <span>{SYMBOLS[index]}</span>
        <div>
          <b>{role.mock[7]}</b>
          <i />
        </div>
        <span className="float-dot" />
      </div>
    </div>
  );
}

export function PhonePreview({ role, index }) {
  return (
    <div className={`experience-phone experience-phone-${index}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-app-bar">
          <img src={logo} alt="" />
          <span>•••</span>
        </div>
        <div className="phone-greeting">
          <span>{role.visualNote}</span>
          <b>{role.visualTitle}</b>
        </div>
        <div className="phone-summary">
          <span className="phone-summary-icon">{SYMBOLS[index]}</span>
          <i />
          <i />
        </div>
        {role.mobileItems.map((item, i) => (
          <div className="phone-list-item" key={item}>
            <span>{SYMBOLS[(i + index) % SYMBOLS.length]}</span>
            <b>{item}</b>
            <i>›</i>
          </div>
        ))}
        <div className="phone-bottom-nav">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export default PhonePreview;
