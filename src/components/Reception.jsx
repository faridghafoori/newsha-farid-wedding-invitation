import { useEffect, useState } from "react";
import { calendarUrl, wedding } from "../data.js";
import { formatDigits } from "../i18n/format.js";
import { jalaliMonthOf } from "../i18n/jalali.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

function remainingParts(target) {
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    done: diff <= 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function monthCells(firstWeekday, daysInMonth, weekStartsOn) {
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const cells = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function Calendar() {
  const { locale, t } = useI18n();
  const jalali = locale === "fa" ? jalaliMonthOf(wedding.year, wedding.monthIndex, wedding.day) : null;
  const firstWeekday = jalali
    ? jalali.firstWeekday
    : new Date(wedding.year, wedding.monthIndex, 1).getDay();
  const daysInMonth = jalali
    ? jalali.daysInMonth
    : new Date(wedding.year, wedding.monthIndex + 1, 0).getDate();
  const highlight = jalali ? jalali.day : wedding.day;
  const cells = monthCells(firstWeekday, daysInMonth, t.weekStartsOn);
  const title = jalali
    ? `${formatDigits(jalali.day, locale)} ${t.month} ${formatDigits(jalali.year, locale)}`
    : `${t.month} ${formatDigits(wedding.year, locale)}`;

  return (
    <div className="calendar">
      <p className="calendar-title">{title}</p>
      <div className="calendar-week" aria-hidden="true">
        {t.weekdays.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => (
          <span key={day ?? `empty-${index}`} className="calendar-cell">
            {day == null ? null : day === highlight ? (
              <span className="calendar-heart">
                <img src="/theme/calendar-heart.svg" alt="" />
                <span>{formatDigits(day, locale)}</span>
              </span>
            ) : (
              formatDigits(day, locale)
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Reception() {
  const { locale, t } = useI18n();
  const target = new Date(wedding.target).getTime();
  const [parts, setParts] = useState(() => remainingParts(target));

  useEffect(() => {
    const timer = window.setInterval(
      () => setParts(remainingParts(target)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <section className="reception">
      <h2>{t.receptionTitle}</h2>
      <h3>{t.receptionAt}</h3>
      <p className="when-row">
        <span>{formatDigits(wedding.time, locale)}</span>
        <span>{t.weekday}</span>
      </p>
      <div className="when-date">
        <span className="when-day">{formatDigits(t.whenDay, locale)}</span>
        <span className="when-bar" />
        <span className="when-month">
          <span>{t.month}</span>
          <span>{formatDigits(t.whenYear, locale)}</span>
        </span>
      </div>

      <div className="countdown">
        <h2>{t.countdownTitle}</h2>
        <p>{parts.done ? t.dayIsHere : t.countdown(parts)}</p>
      </div>

      <div className="reception-time">
        <span>{t.receptionLabel}</span>
        <strong>{formatDigits(wedding.time, locale)}</strong>
      </div>

      <Calendar />

      <a
        className="calendar-link"
        href={calendarUrl({
          title: t.calendarTitle,
          details: t.calendarDetails,
        })}
        target="_blank"
        rel="noreferrer">
        {t.addToCalendar}
      </a>
    </section>
  );
}
