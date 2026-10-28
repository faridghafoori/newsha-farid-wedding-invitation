import { useEffect, useState } from "react";

const SRC = "/music/music1.mp3";

let audio;

function ensureAudio() {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
  }
  return audio;
}

export function playInviteMusic() {
  return ensureAudio().play();
}

export default function MusicButton() {
  const [playing, setPlaying] = useState(() => Boolean(audio && !audio.paused));
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const track = ensureAudio();

    function sync() {
      setPlaying(!track.paused);
    }
    function markMissing() {
      setMissing(true);
      setPlaying(false);
    }

    track.addEventListener("play", sync);
    track.addEventListener("pause", sync);
    track.addEventListener("error", markMissing);
    if (track.error) markMissing();
    else sync();

    return () => {
      track.removeEventListener("play", sync);
      track.removeEventListener("pause", sync);
      track.removeEventListener("error", markMissing);
    };
  }, []);

  async function toggle() {
    const track = ensureAudio();
    if (missing || track.error) return;
    if (!track.paused) {
      track.pause();
      setPlaying(false);
      return;
    }
    try {
      await track.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  const muted = !playing;

  return (
    <button
      type="button"
      className={`music ${playing ? "is-playing" : ""}`}
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      aria-pressed={playing}
      title={missing ? "Music file is missing" : muted ? "Unmute" : "Mute"}
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
