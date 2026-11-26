'use client';

import { useEffect, useRef, useState } from 'react';

type Trace = Record<string, unknown>;

/**
 * Thin wrapper around Plotly (loaded only in the browser, only on pages that use it).
 * Usage in MDX: <Plot data={[{ x: [0, 1, 2], y: [0, 1, 4], mode: 'lines' }]} layout={{ xaxis: { title: { text: 'x' } } }} />
 */
export default function Plot({ data, layout = {}, height = 380, ariaLabel = 'Plot' }: { data: Trace[]; layout?: Record<string, unknown>; height?: number; ariaLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let plotly: any;
    (async () => {
      const mod = await import('plotly.js-dist-min');
      plotly = mod.default ?? mod;
      if (cancelled || !ref.current) return;
      const ink = dark ? '#e6e4df' : '#1f2328';
      const grid = dark ? '#2b2f36' : '#e2dfd6';
      const L = layout as any;
      const axisStyle = { gridcolor: grid, zerolinecolor: grid, linecolor: grid, automargin: true };
      await plotly.react(
        ref.current,
        data,
        {
          height,
          margin: { l: 16, r: 12, t: data.length > 1 ? 56 : 16, b: 16 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { family: 'Inter, system-ui, sans-serif', color: ink, size: 13 },
          showlegend: data.length > 1,
          legend: { orientation: 'h', x: 0, y: 1.02, yanchor: 'bottom', font: { size: 12 } },
          ...L,
          xaxis: { ...axisStyle, ...(L.xaxis ?? {}) },
          yaxis: { ...axisStyle, ...(L.yaxis ?? {}) },
        },
        { displaylogo: false, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] },
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [data, layout, height, dark]);

  useEffect(() => {
    const el = ref.current;
    return () => {
      import('plotly.js-dist-min').then((m) => el && (m.default ?? m).purge(el)).catch(() => {});
    };
  }, []);

  return <div ref={ref} role="img" aria-label={ariaLabel} className="w-full" style={{ minHeight: height }} />;
}
