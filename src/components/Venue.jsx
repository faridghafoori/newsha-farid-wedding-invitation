import {
  directionsUrl,
  directionsUrlInNeshan,
  mapEmbedUrl,
  wedding,
} from "../data.js";

export default function Venue() {
  return (
    <section className="venue">
      <h2>{wedding.venue}</h2>
      <p className="venue-address" dir="rtl">
        {wedding.address}
      </p>
      <img
        className="venue-illustration"
        src="/photos/4.jpg"
        alt="Illustration of Sadra Garden Hall"
      />
      <iframe
        title={`Map of ${wedding.venue}`}
        src={mapEmbedUrl}
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
          <span aria-hidden="true">⌖</span> Get directions In Google Maps
        </a>
        <a
          className="directions"
          href={directionsUrlInNeshan}
          target="_blank"
          rel="noreferrer">
          <span aria-hidden="true">⌖</span> Get directions In Neshan
        </a>
      </div>
    </section>
  );
}
