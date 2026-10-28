import { useI18n } from "../i18n/LocaleContext.jsx";
import AutoScroll from "./AutoScroll.jsx";
import Gallery from "./Gallery.jsx";
import MusicButton from "./MusicButton.jsx";
import Reception from "./Reception.jsx";
import Rsvp from "./Rsvp.jsx";
import Schedule from "./Schedule.jsx";
import Venue from "./Venue.jsx";

const sprigs = [
  { src: "/theme/leaf.webp", className: "sprig sprig-a" },
  { src: "/theme/flower3.webp", className: "sprig sprig-b" },
  { src: "/theme/flower2.webp", className: "sprig sprig-c" },
  { src: "/theme/flower4.webp", className: "sprig sprig-d" },
  { src: "/theme/leaf.webp", className: "sprig sprig-e" },
  { src: "/theme/flower3.webp", className: "sprig sprig-f" },
  { src: "/theme/flower2.webp", className: "sprig sprig-g" },
  { src: "/theme/flower4.webp", className: "sprig sprig-h" },
];

export default function Invitation({ autoScroll = false }) {
  const { t } = useI18n();

  return (
    <main className="page">
      <AutoScroll active={autoScroll} />
      <article className="sheet">
        <div className="paper" aria-hidden="true" />
        {sprigs.map((sprig) => (
          <img
            key={sprig.className}
            className={sprig.className}
            src={sprig.src}
            alt=""
          />
        ))}

        <header className="hero">
          <p className="save-date">{t.saveTheDate}</p>
          <div className="wreath">
            <img src="/theme/flower.webp" alt="" />
            <div className="mono">
              <span>{t.monogram[0]}</span>
              <span className="mono-amp">{t.amp}</span>
              <span>{t.monogram[1]}</span>
            </div>
          </div>
        </header>

        <section className="names">
          <p>{t.inviteLine}</p>
          <h1>{t.bride}</h1>
          <span className="names-amp">{t.ampNames}</span>
          <h1>{t.groom}</h1>
        </section>

        <Gallery />
        <Reception />
        <Rsvp />
        <Venue />
        {/* <DressCode /> */}
        <Schedule />
        {/* <Guestbook /> */}

        <footer className="closing">
          <p>{t.closing}</p>
          <img src="/theme/flower6.webp" alt="" />
        </footer>
      </article>
      <MusicButton />
    </main>
  );
}
