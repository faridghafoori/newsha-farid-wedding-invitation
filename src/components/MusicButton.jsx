import { useEffect, useRef, useState } from "react";

export default function MusicButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    function markReady() {
      setReady(true);
    }
    function markMissing() {
      setReady(false);
    }

    audio.addEventListener("canplay", markReady);
    audio.addEventListener("error", markMissing);

    function playFromInvite() {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }

    window.addEventListener("invite-open", playFromInvite);
    return () => {
      audio.pause();
      audio.removeEventListener("canplay", markReady);
      audio.removeEventListener("error", markMissing);
      window.removeEventListener("invite-open", playFromInvite);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      className={`music ${playing ? "is-playing" : ""}`}
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={ready ? "Music" : "Add public/music.mp3 to enable music"}
    >
      <span className="music-disc" aria-hidden="true" />
      <span className="music-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
