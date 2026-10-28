import { useI18n } from "../i18n/LocaleContext.jsx";

export default function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="locale-toggle" role="group" aria-label={t.language}>
      <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
        EN
      </button>
      <button type="button" aria-pressed={locale === "fa"} onClick={() => setLocale("fa")}>
        فا
      </button>
    </div>
  );
}
