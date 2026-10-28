import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { wedding } from "../data.js";
import { formatDigits } from "../i18n/format.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

function offsetOf(index, current, total) {
  let delta = index - current;
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}

export default function Gallery() {
  const { locale, t } = useI18n();
  const photos = wedding.photos.map((photo, index) => ({
    ...photo,
    alt: t.photoAlts[index],
  }));
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const previousGlyph = locale === "fa" ? "›" : "‹";
  const nextGlyph = locale === "fa" ? "‹" : "›";

  function step(direction) {
    setCurrent((value) => (value + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    if (lightbox || photos.length < 2) return undefined;
    const timer = window.setInterval(() => step(1), 5000);
    return () => window.clearInterval(timer);
  }, [lightbox, photos.length, current]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const forwardKey = locale === "fa" ? "ArrowLeft" : "ArrowRight";
    const backwardKey = locale === "fa" ? "ArrowRight" : "ArrowLeft";
    function onKey(event) {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === forwardKey) step(1);
      if (event.key === backwardKey) step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length, locale]);

  return (
    <section className="gallery" aria-label={t.galleryLabel}>
      <h2>{t.galleryTitle}</h2>
      <div className="stack">
        {photos.map((photo, index) => {
          const delta = offsetOf(index, current, photos.length);
          if (Math.abs(delta) > 1) return null;
          const visualDelta = locale === "fa" ? -delta : delta;
          return (
            <button
              key={photo.src}
              type="button"
              className={`stack-card delta-${visualDelta}`}
              onClick={() => {
                if (delta === 0) setLightbox(true);
                else step(delta);
              }}
              aria-label={delta === 0 ? t.openPhoto(photo.alt) : photo.alt}
            >
              <img src={photo.src} alt={photo.alt} />
            </button>
          );
        })}
        <button type="button" className="stack-arrow stack-prev" onClick={() => step(-1)} aria-label={t.previousPhoto}>
          {previousGlyph}
        </button>
        <button type="button" className="stack-arrow stack-next" onClick={() => step(1)} aria-label={t.nextPhoto}>
          {nextGlyph}
        </button>
      </div>
      <div className="dots" role="tablist" aria-label={t.galleryPages}>
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={index === current ? "dot is-active" : "dot"}
            aria-label={t.goToPhoto(formatDigits(index + 1, locale))}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {lightbox &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.photoDialog}>
            <button type="button" className="lightbox-close" onClick={() => setLightbox(false)} aria-label={t.closePhoto}>
              ×
            </button>
            <button type="button" className="lightbox-nav lightbox-prev" onClick={() => step(-1)} aria-label={t.previousPhoto}>
              {previousGlyph}
            </button>
            <img src={photos[current].src} alt={photos[current].alt} />
            <button type="button" className="lightbox-nav lightbox-next" onClick={() => step(1)} aria-label={t.nextPhoto}>
              {nextGlyph}
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
