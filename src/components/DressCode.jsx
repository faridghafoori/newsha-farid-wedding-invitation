import { wedding } from "../data.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

export default function DressCode() {
  const { t } = useI18n();

  return (
    <section className="dress">
      <h2>{t.dressTitle}</h2>
      <p>{t.dressCode}</p>
      <div className="swatches">
        {wedding.colors.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
    </section>
  );
}
