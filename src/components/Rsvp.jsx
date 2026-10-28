import { useEffect, useState } from "react";
import { SCRIPT_URL } from "../api/config.js";
import { formatDigits } from "../i18n/format.js";
import { useI18n } from "../i18n/LocaleContext.jsx";

const STORAGE_KEY = "nf-wedding-rsvp";
const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

export default function Rsvp() {
  const { locale, t } = useI18n();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [guests, setGuests] = useState(MIN_GUESTS);
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setSaved(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (!name.trim() || !attending || loading) return;

    setLoading(true);
    setError(false);

    const party = attending === "yes" ? guests : 0;
    const entry = {
      name: name.trim(),
      attending,
      guestCount: party,
      at: new Date().toISOString(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: entry.name,
          attendance: attending === "yes" ? "attending" : "not_attending",
          guestCount: party,
        }),
      });

      // no-cors responses are opaque, so this does not
      // verify that Google Sheets saved the submission.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      setSaved(entry);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rsvp">
      <form className="rsvp-card" onSubmit={submit}>
        <h2>{t.rsvpTitle}</h2>
        <p>{t.rsvpIntro}</p>

        {saved ? (
          <div className="rsvp-thanks">
            <p>{t.thanks(saved.name)}</p>
            <p>{saved.attending === "yes" ? t.attendingYes : t.attendingNo}</p>
            {saved.attending === "yes" && (
              <p>{t.partySize(saved.guests || MIN_GUESTS)}</p>
            )}
            <button
              type="button"
              className="rsvp-edit"
              onClick={() => {
                setName(saved.name);
                setAttending(saved.attending);
                setGuests(
                  saved.attending === "yes"
                    ? Math.min(
                        MAX_GUESTS,
                        Math.max(MIN_GUESTS, saved.guests || MIN_GUESTS),
                      )
                    : MIN_GUESTS,
                );
                setError(false);
                setSaved(null);
              }}>
              {t.changeResponse}
            </button>
          </div>
        ) : (
          <>
            <label className="field">
              <span>{t.yourName}</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.namePlaceholder}
                required
                maxLength={100}
                disabled={loading}
              />
            </label>

            <fieldset disabled={loading}>
              <legend>{t.willYouAttend}</legend>
              <label
                className={
                  attending === "yes" ? "choice is-selected" : "choice"
                }>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                  required
                />
                <span className="choice-icon" aria-hidden="true">
                  ✓
                </span>
                {t.willAttend}
              </label>
              <label
                className={
                  attending === "no" ? "choice is-selected" : "choice"
                }>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                <span className="choice-icon" aria-hidden="true">
                  ×
                </span>
                {t.cannotAttend}
              </label>
            </fieldset>

            {attending === "yes" && (
              <div className="guest-count">
                <span id="guest-count-label">{t.guestCount}</span>
                <div
                  className="guest-stepper"
                  role="group"
                  aria-labelledby="guest-count-label">
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((count) => Math.max(MIN_GUESTS, count - 1))
                    }
                    disabled={loading || guests <= MIN_GUESTS}
                    aria-label={t.decreaseGuests}>
                    −
                  </button>
                  <span className="guest-count-value" aria-live="polite">
                    {formatDigits(guests, locale)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((count) => Math.min(MAX_GUESTS, count + 1))
                    }
                    disabled={loading || guests >= MAX_GUESTS}
                    aria-label={t.increaseGuests}>
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              className="confirm-btn"
              type="submit"
              disabled={loading || !name.trim() || !attending}>
              {loading ? t.submitting : t.confirm}
            </button>

            {error && (
              <p className="rsvp-error" role="alert">
                {t.rsvpError}
              </p>
            )}
          </>
        )}
      </form>
    </section>
  );
}
