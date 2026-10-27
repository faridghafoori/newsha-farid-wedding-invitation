import { useEffect, useState } from "react";
import { calendarUrl, wedding } from "../data.js";

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

function Calendar() {
  const firstWeekday = new Date(wedding.year, wedding.monthIndex, 1).getDay();
  const mondayOffset = (firstWeekday + 6) % 7;
  const daysInMonth = new Date(wedding.year, wedding.monthIndex + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div className="calendar">
      <p className="calendar-title">
        {wedding.month} {wedding.year}
      </p>
      <div className="calendar-week" aria-hidden="true">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => (
          <span key={day ?? `empty-${index}`} className="calendar-cell">
            {day === wedding.day ? (
              <span className="calendar-heart">
                <img src="/theme/calendar-heart.svg" alt="" />
                <span>{day}</span>
              </span>
            ) : (
              day
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Reception() {
  const target = new Date(wedding.target).getTime();
  const [parts, setParts] = useState(() => remainingParts(target));

  useEffect(() => {
    const timer = window.setInterval(() => setParts(remainingParts(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <section className="reception">
      <h2>Reception Info</h2>
      <h3>The reception will take place at:</h3>
      <p className="when-row">
        <span>{wedding.time}</span>
        <span>{wedding.weekday}</span>
      </p>
      <div className="when-date">
        <span className="when-day">{wedding.day}</span>
        <span className="when-bar" />
        <span className="when-month">
          <span>{wedding.month}</span>
          <span>{wedding.year}</span>
        </span>
      </div>

      <div className="countdown">
        <h2>Countdown</h2>
        <p>
          {parts.done
            ? "The day is here"
            : `${parts.days} days ${parts.hours} hours ${parts.minutes} min ${parts.seconds} sec`}
        </p>
      </div>

      <div className="reception-time">
        <span>Reception</span>
        <strong>{wedding.time}</strong>
      </div>

      <Calendar />

      <a className="calendar-link" href={calendarUrl} target="_blank" rel="noreferrer">
        Add to Calendar
      </a>
    </section>
  );
}
