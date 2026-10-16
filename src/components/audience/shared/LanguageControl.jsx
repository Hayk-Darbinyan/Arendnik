export function LanguageControl({ lang, onLanguageChange }) {
  return (
    <div className="experience-languages" aria-label="Change language">
      {["hy", "en", "ru"].map((language) => (
        <button
          key={language}
          type="button"
          className={language === lang ? "active" : ""}
          aria-pressed={language === lang}
          onClick={() => onLanguageChange(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default LanguageControl;
