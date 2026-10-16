export function Store({ href, label }) {
  return (
    <a
      className="store"
      href={href || "#"}
      target="_blank"
      rel="noopener"
      aria-disabled={!href}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
    >
      <small>{label[0]}</small>
      <b>{label[1]}</b>
    </a>
  );
}

export default Store;
