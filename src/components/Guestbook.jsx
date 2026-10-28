import { useEffect, useState } from "react";
import { useI18n } from "../i18n/LocaleContext.jsx";

const STORAGE_KEY = "nf-wedding-wishes";

export default function Guestbook() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setWishes(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function persist(next) {
    setWishes(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function submit(event) {
    event.preventDefault();
    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      at: new Date().toISOString(),
    };
    persist([entry, ...wishes]);
    setName("");
    setMessage("");
  }

  function inspire() {
    const idea = t.wishIdeas[Math.floor(Math.random() * t.wishIdeas.length)];
    setMessage(idea);
  }

  return (
    <section className="guestbook">
      <h2>{t.guestbookTitle}</h2>
      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.guestNamePlaceholder}
          required
          maxLength={80}
          aria-label={t.guestNameLabel}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.wishesPlaceholder}
          required
          rows={4}
          maxLength={1000}
          aria-label={t.wishesLabel}
        />
        <div className="guest-actions">
          <button type="button" className="magic" onClick={inspire} title={t.suggestWish}>
            <span aria-hidden="true">🪄</span>
            <span className="sr-only">{t.suggestWish}</span>
          </button>
          <button type="submit" className="send" disabled={!name.trim() || !message.trim()}>
            {t.sendWishes}
          </button>
        </div>
      </form>

      {wishes.length === 0 ? (
        <p className="empty-wishes">{t.emptyWishes}</p>
      ) : (
        <ul className="wishes">
          {wishes.map((wish) => (
            <li key={wish.id}>
              <strong>{wish.name}</strong>
              <p>{wish.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
