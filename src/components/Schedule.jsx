import { wedding } from "../data.js";
import { formatDigits } from "../i18n/format.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

export default function Schedule() {
  const { locale, t } = useI18n();

  return (
    <section className="schedule">
      <h2>{t.scheduleTitle}</h2>
      <ol>
        {wedding.schedule.map((item, index) => (
          <li key={item.time}>
            <span className="sched-icon-cell">
              {item.icon ? <img src={item.icon} alt="" /> : null}
            </span>
            <span className="sched-time">{formatDigits(item.time, locale)}</span>
            <span className="sched-dot" aria-hidden="true" />
            <span className="sched-title">{t.schedule[index]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
