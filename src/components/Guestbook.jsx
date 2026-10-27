import { useEffect, useState } from "react";
import { wishIdeas } from "../data.js";

const STORAGE_KEY = "nf-wedding-wishes";

export default function Guestbook() {
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
    const idea = wishIdeas[Math.floor(Math.random() * wishIdeas.length)];
    setMessage(idea);
  }

  return (
    <section className="guestbook">
      <h2>Guestbook</h2>
      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name*"
          required
          maxLength={80}
          aria-label="Your name"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your wishes*"
          required
          rows={4}
          maxLength={1000}
          aria-label="Your wishes"
        />
        <div className="guest-actions">
          <button type="button" className="magic" onClick={inspire} title="Suggest a wish">
            <span aria-hidden="true">🪄</span>
            <span className="sr-only">Suggest a wish</span>
          </button>
          <button type="submit" className="send" disabled={!name.trim() || !message.trim()}>
            Send Wishes
          </button>
        </div>
      </form>

      {wishes.length === 0 ? (
        <p className="empty-wishes">No wishes yet. Be the first!</p>
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
