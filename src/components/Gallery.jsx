import { useEffect, useState } from "react";
import { wedding } from "../data.js";

function offsetOf(index, current, total) {
  let delta = index - current;
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}

export default function Gallery() {
  const photos = wedding.photos;
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function step(direction) {
    setCurrent((value) => (value + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!lightbox) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  return (
    <section className="gallery" aria-label="Photo gallery">
      <h2>Photo Gallery</h2>
      <div className="stack">
        {photos.map((photo, index) => {
          const delta = offsetOf(index, current, photos.length);
          if (Math.abs(delta) > 1) return null;
          return (
            <button
              key={photo.src}
              type="button"
              className={`stack-card delta-${delta}`}
              onClick={() => {
                if (delta === 0) setLightbox(true);
                else step(delta);
              }}
              aria-label={delta === 0 ? `Open ${photo.alt}` : photo.alt}
            >
              <img src={photo.src} alt={photo.alt} />
            </button>
          );
        })}
        <button type="button" className="stack-arrow stack-prev" onClick={() => step(-1)} aria-label="Previous photo">
          ‹
        </button>
        <button type="button" className="stack-arrow stack-next" onClick={() => step(1)} aria-label="Next photo">
          ›
        </button>
      </div>
      <div className="dots" role="tablist" aria-label="Gallery pages">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={index === current ? "dot is-active" : "dot"}
            aria-label={`Go to photo ${index + 1}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo">
          <button type="button" className="lightbox-close" onClick={() => setLightbox(false)} aria-label="Close photo">
            ×
          </button>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
            ‹
          </button>
          <img src={photos[current].src} alt={photos[current].alt} />
          <button type="button" className="lightbox-nav lightbox-next" onClick={() => step(1)} aria-label="Next photo">
            ›
          </button>
        </div>
      )}
    </section>
  );
}
