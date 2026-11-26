'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals paragraphs word by word, like a streamed answer.
 * The full text is in the HTML from the start (good for SEO and screen readers);
 * only the visual reveal is animated. Respects prefers-reduced-motion.
 */
export default function StreamingText({ paragraphs, wordMs = 38, className = '' }: { paragraphs: string[]; wordMs?: number; className?: string }) {
  const words = paragraphs.map((p) => p.split(/\s+/).filter(Boolean));
  const total = words.reduce((n, w) => n + w.length, 0);
  const [shown, setShown] = useState(total);
  const [running, setRunning] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(0);
    setRunning(true);
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const n = Math.min(total, Math.floor((now - t0) / wordMs));
      setShown(n);
      if (n < total) raf = requestAnimationFrame(step);
      else setRunning(false);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [total, wordMs]);

  let i = 0;
  return (
    <div className={className} aria-live="off">
      {words.map((ws, pi) => (
        <p key={pi}>
          {ws.map((w, wi) => {
            const idx = i++;
            const on = idx < shown;
            const last = running && idx === shown - 1;
            return (
              <span key={wi}>
                <span className={`stream-word${on ? ' on' : ''}`}>{w}</span>
                {last && <span className="stream-caret" aria-hidden="true" />}
                {wi < ws.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
