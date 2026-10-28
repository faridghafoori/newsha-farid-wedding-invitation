import {
  directionsUrl,
  directionsUrlInNeshan,
  mapEmbedUrl,
  wedding,
} from "../data.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

export default function Venue() {
  const { locale, t } = useI18n();

  return (
    <section className="venue">
      <h2>{t.venue}</h2>
      <p className="venue-address" lang="fa" dir="rtl">
        {wedding.address}
      </p>
      <img
        className="venue-illustration"
        src="/photos/4.jpg"
        alt={t.venueImageAlt}
      />
      <iframe
        key={locale}
        title={t.mapTitle(t.venue)}
        src={mapEmbedUrl(locale)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <a
          className="directions"
          href={directionsUrl}
          target="_blank"
          rel="noreferrer">
          <span aria-hidden="true">⌖</span> {t.directionsGoogle}
        </a>
        <a
          className="directions"
          href={directionsUrlInNeshan}
          target="_blank"
          rel="noreferrer">
          <span aria-hidden="true">⌖</span> {t.directionsNeshan}
        </a>
      </div>
    </section>
  );
}
