import { useEffect } from "react";

const PAUSE_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function atEnd() {
  return window.scrollY >= maxScroll() - 1;
}

export default function AutoScroll({ active }) {
  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    let running = false;
    let last = 0;
    let pixelsPerSecond = 90;

    function tick(now) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const max = maxScroll();
      const next = Math.min(max, window.scrollY + pixelsPerSecond * dt);
      window.scrollTo(0, next);
      if (next >= max - 1) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (atEnd()) window.scrollTo(0, 0);
      pixelsPerSecond = Math.min(160, Math.max(70, maxScroll() / 42));
      running = true;
      last = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onClick(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button, a, .rsvp, .locale-toggle")) return;
      if (running) stop();
      else start();
    }

    function onWheel() {
      if (running) stop();
    }

    function onTouchMove() {
      if (running) stop();
    }

    function onKey(event) {
      if (!PAUSE_KEYS.has(event.key)) return;
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (running) stop();
    }

    window.scrollTo(0, 0);
    const startTimer = window.setTimeout(start, 400);
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      stop();
      window.clearTimeout(startTimer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return null;
}
