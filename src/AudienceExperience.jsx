import copy from "./experiences.js";
import Welcome from "./components/audience/Welcome.jsx";
import PersonaPage from "./components/audience/PersonaPage.jsx";

export { Welcome, PersonaPage };

/* ════════════════════════════════════════════════════════
   AUDIENCE EXPERIENCE — ROOT DISPATCHER
   Switches between Welcome (Audience selection) and
   PersonaPage (Main audience page with all sections).
════════════════════════════════════════════════════════ */
export default function AudienceExperience({ lang, role, onChoose, onLanguageChange }) {
  const validRole =
    Number.isInteger(role) && role >= 0 && role < copy[lang].roles.length
      ? role
      : null;

  return validRole === null ? (
    <Welcome
      lang={lang}
      onChoose={onChoose}
      onLanguageChange={onLanguageChange}
    />
  ) : (
    <PersonaPage
      lang={lang}
      index={validRole}
      onChoose={onChoose}
      onLanguageChange={onLanguageChange}
    />
  );
}