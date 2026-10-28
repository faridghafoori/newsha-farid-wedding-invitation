import { useEffect, useState } from "react";
import { SCRIPT_URL } from "../api/config.js";

const STORAGE_KEY = "nf-wedding-rsvp";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    const entry = {
      name: name.trim(),
      attending,
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
        }),
      });

      // no-cors responses are opaque, so this does not
      // verify that Google Sheets saved the submission.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      setSaved(entry);
    } catch {
      setError("Unable to submit your RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
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
                setError("");
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
                maxLength={100}
                disabled={loading}
              />
            </label>

            <fieldset disabled={loading}>
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

            <button
              className="confirm-btn"
              type="submit"
              disabled={loading || !name.trim() || !attending}
            >
              {loading ? "Submitting..." : "Confirm"}
            </button>

            {error && (
              <p className="rsvp-error" role="alert">
                {error}
              </p>
            )}
          </>
        )}
      </form>
    </section>
  );
}
