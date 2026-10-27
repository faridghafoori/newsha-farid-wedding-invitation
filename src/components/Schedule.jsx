import { wedding } from "../data.js";

export default function Schedule() {
  return (
    <section className="schedule">
      <h2>Wedding Day Schedule</h2>
      <ol>
        {wedding.schedule.map((item) => (
          <li key={item.time}>
            <span className="sched-icon-cell">
              {item.icon ? <img src={item.icon} alt="" /> : null}
            </span>
            <span className="sched-time">{item.time}</span>
            <span className="sched-dot" aria-hidden="true" />
            <span className="sched-title">{item.title}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
