import { useEffect, useState } from "react";

const STORAGE_KEY = "nf-wedding-rsvp";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setSaved(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function submit(event) {
    event.preventDefault();
    const entry = { name: name.trim(), attending, at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    setSaved(entry);
  }

  return (
    <section className="rsvp">
      <form className="rsvp-card" onSubmit={submit}>
        <h2>Confirm your attendance</h2>
        <p>
          Your presence would be an honor. Please RSVP so we can prepare the warmest welcome for you.
        </p>

        {saved ? (
          <div className="rsvp-thanks">
            <p>Thank you, {saved.name}.</p>
            <p>
              {saved.attending === "yes"
                ? "We can't wait to celebrate with you."
                : "We'll miss you, and we're grateful you let us know."}
            </p>
            <button
              type="button"
              className="rsvp-edit"
              onClick={() => {
                setName(saved.name);
                setAttending(saved.attending);
                setSaved(null);
              }}
            >
              Change response
            </button>
          </div>
        ) : (
          <>
            <label className="field">
              <span>Your name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                required
                maxLength={80}
              />
            </label>

            <fieldset>
              <legend>Will you attend?</legend>
              <label className={attending === "yes" ? "choice is-selected" : "choice"}>
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
                I will attend
              </label>
              <label className={attending === "no" ? "choice is-selected" : "choice"}>
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
                Sorry, I can&apos;t make it
              </label>
            </fieldset>

            <button className="confirm-btn" type="submit" disabled={!name.trim() || !attending}>
              Confirm
            </button>
          </>
        )}
      </form>
    </section>
  );
}
