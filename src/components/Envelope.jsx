import { useState } from "react";
import { wedding } from "../data.js";
import { playInviteMusic } from "./MusicButton.jsx";

const sparks = [
  { className: "spark spark-a", glyph: "✦" },
  { className: "spark spark-b", glyph: "·" },
  { className: "spark spark-c", glyph: "✦" },
  { className: "spark spark-d", glyph: "·" },
  { className: "spark spark-e", glyph: "✦" },
  { className: "spark spark-f", glyph: "·" },
];

export default function Envelope({ onOpen }) {
  const [leaving, setLeaving] = useState(false);

  function handleOpen() {
    if (leaving) return;
    setLeaving(true);
    playInviteMusic().catch(() => {});
    window.setTimeout(onOpen, 520);
  }

  return (
    <main className={`envelope ${leaving ? "is-leaving" : ""}`}>
      {sparks.map((spark) => (
        <span
          key={spark.className}
          className={spark.className}
          aria-hidden="true">
          {spark.glyph}
        </span>
      ))}

      <section className="env-card" aria-label="Wedding invitation">
        <img
          className="env-flora env-flora-tl"
          src="/theme/flower3.webp"
          alt=""
        />
        <img
          className="env-flora env-flora-tr"
          src="/theme/flower2.webp"
          alt=""
        />
        <img
          className="env-flora env-flora-bl"
          src="/theme/flower6.webp"
          alt=""
        />

        <div className="env-heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="36" height="36">
            <path
              fill="currentColor"
              d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.2 9.1 6.2c1.3 0 2.4.6 2.9 1.6.5-1 1.6-1.6 2.9-1.6 2.3 0 4.1 1.8 4.1 4.7C19 15.6 12 20 12 20z"
            />
          </svg>
        </div>

        <p className="env-monogram">
          <span>N</span>
          <span className="env-amp">&</span>
          <span>F</span>
        </p>

        <div className="env-rule" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p className="env-date">{wedding.dateLabel}</p>
        <p className="env-line">Cordially Invites</p>

        <button type="button" className="open-btn" onClick={handleOpen}>
          Open
        </button>
      </section>
    </main>
  );
}
