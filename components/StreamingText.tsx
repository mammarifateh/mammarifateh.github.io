'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Reveals its content word by word, like a streamed chat answer, when it scrolls into view.
 * The full text is in the HTML from the start (search engines and screen readers see it all);
 * only the visual reveal is animated. Blocks on the same page stream one after another.
 * Equations (KaTeX) appear as a whole. Respects prefers-reduced-motion.
 */
let queue: Promise<void> = Promise.resolve();

function wrapWords(root: HTMLElement): HTMLElement[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest('.katex, .stream-skip') || !n.textContent?.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of (n.textContent ?? '').split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
      else {
        const s = document.createElement('span');
        s.className = 'stream-word';
        s.textContent = part;
        frag.appendChild(s);
      }
    }
    n.replaceWith(frag);
  }
  root.querySelectorAll<HTMLElement>('.katex, .stream-skip').forEach((k) => k.classList.add('stream-word'));
  return [...root.querySelectorAll<HTMLElement>('.stream-word')];
}

export default function StreamingText({ children, className = '', wordMs = 28 }: { children: ReactNode; className?: string; wordMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = wrapWords(el);
    if (!words.length) return;
    el.classList.add('streaming');

    const play = () =>
      new Promise<void>((resolve) => {
        const caret = document.createElement('span');
        caret.className = 'stream-caret';
        caret.setAttribute('aria-hidden', 'true');
        const t0 = performance.now();
        let i = 0;
        const step = () => {
          const now = performance.now();
          const goal = Math.min(words.length, Math.max(1, Math.floor((now - t0) / wordMs) + 1));
          while (i < goal) words[i++].classList.add('on');
          words[i - 1].after(caret);
          if (i < words.length) setTimeout(step, 16);
          else {
            caret.remove();
            el.classList.remove('streaming');
            resolve();
          }
        };
        step();
      });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          queue = queue.then(play).catch(() => el.classList.remove('streaming'));
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wordMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
