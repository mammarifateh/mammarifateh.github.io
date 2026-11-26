'use client';

import { useMemo, useState } from 'react';
import Plot from './Plot';

/**
 * Two-bar (von Mises) truss under a vertical apex load — a classical textbook model of snap-through.
 * Bars of initial length L0 = 1, rise angle α, linear elastic axial behaviour, exact (large-rotation) kinematics.
 * Load in units of EA, displacement in units of the initial rise h.
 */
function curve(alphaDeg: number, n = 400) {
  const a = Math.cos((alphaDeg * Math.PI) / 180); // half span
  const h = Math.sin((alphaDeg * Math.PI) / 180); // initial rise
  const xs: number[] = [];
  const ps: number[] = [];
  for (let i = 0; i <= n; i++) {
    const w = (2.2 * h * i) / n;
    const L = Math.sqrt(a * a + (h - w) ** 2);
    const P = (2 * (1 - L) * (h - w)) / L; // P / EA, positive downwards
    xs.push(w / h);
    ps.push(P);
  }
  // limit points: sign changes of the discrete slope
  const limits: { x: number; y: number }[] = [];
  for (let i = 1; i < n; i++) {
    const s1 = ps[i] - ps[i - 1];
    const s2 = ps[i + 1] - ps[i];
    if (s1 * s2 < 0) limits.push({ x: xs[i], y: ps[i] });
  }
  return { a, h, xs, ps, limits };
}

export default function VonMisesTruss() {
  const [alpha, setAlpha] = useState(15);
  const [wr, setWr] = useState(0.4);
  const c = useMemo(() => curve(alpha), [alpha]);

  const L = Math.sqrt(c.a ** 2 + (c.h - wr * c.h) ** 2);
  const P = (2 * (1 - L) * (c.h - wr * c.h)) / L;

  const data = useMemo(
    () => [
      { x: c.xs, y: c.ps, mode: 'lines', name: 'Equilibrium path', line: { color: '#35598a', width: 2.5 } },
      {
        x: c.limits.map((l) => l.x),
        y: c.limits.map((l) => l.y),
        mode: 'markers',
        name: 'Limit points (dP/dw = 0)',
        marker: { color: '#b5475b', size: 9 },
      },
      { x: [wr], y: [P], mode: 'markers', name: 'Current state', marker: { color: '#c08a2a', size: 11, symbol: 'diamond' } },
    ],
    [c, wr, P],
  );
  const layout = useMemo(
    () => ({
      xaxis: { title: { text: 'Apex displacement  w / h' }, range: [0, 2.2] },
      yaxis: { title: { text: 'Load  P / EA' } },
    }),
    [],
  );

  // SVG geometry
  const W = 320;
  const scale = 130 / c.a;
  const cx = W / 2;
  const base = 40 + c.h * scale;
  const apexY = base - (c.h - wr * c.h) * scale;

  return (
    <div className="not-prose my-8 rounded-xl border rule p-4 sm:p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <Plot data={data} layout={layout} height={360} ariaLabel="Load-displacement curve of the two-bar truss" />
        <div className="flex flex-col gap-5">
          <svg viewBox={`0 0 ${W} ${base + 70 + c.h * scale}`} className="w-full" role="img" aria-label="Truss geometry at the current displacement">
            <line x1={cx - c.a * scale} y1={base} x2={cx + c.a * scale} y2={base} stroke="currentColor" opacity=".25" strokeDasharray="4 4" />
            <line x1={cx - c.a * scale} y1={base} x2={cx} y2={40} stroke="currentColor" opacity=".18" />
            <line x1={cx + c.a * scale} y1={base} x2={cx} y2={40} stroke="currentColor" opacity=".18" />
            <line x1={cx - c.a * scale} y1={base} x2={cx} y2={apexY} stroke="#35598a" strokeWidth="3" />
            <line x1={cx + c.a * scale} y1={base} x2={cx} y2={apexY} stroke="#35598a" strokeWidth="3" />
            <circle cx={cx} cy={apexY} r="5" fill="#c08a2a" />
            <path d={`M${cx} ${apexY - 34} V${apexY - 9} M${cx - 5} ${apexY - 15} L${cx} ${apexY - 9} L${cx + 5} ${apexY - 15}`} stroke="currentColor" strokeWidth="1.6" fill="none" />
            {[-1, 1].map((s) => (
              <path key={s} d={`M${cx + s * c.a * scale - 9} ${base + 10} L${cx + s * c.a * scale} ${base} L${cx + s * c.a * scale + 9} ${base + 10} Z`} fill="none" stroke="currentColor" opacity=".6" />
            ))}
          </svg>
          <label className="grid gap-1.5 text-sm">
            <span className="flex justify-between">
              <span>Rise angle α</span>
              <span className="font-mono">{alpha}°</span>
            </span>
            <input type="range" min={5} max={45} step={1} value={alpha} onChange={(e) => setAlpha(+e.target.value)} className="accent-[#35598a]" />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="flex justify-between">
              <span>Displacement w / h</span>
              <span className="font-mono">{wr.toFixed(2)}</span>
            </span>
            <input type="range" min={0} max={2.2} step={0.01} value={wr} onChange={(e) => setWr(+e.target.value)} className="accent-[#35598a]" />
          </label>
          <p className="text-sm muted">
            P / EA = <span className="font-mono">{P.toExponential(3)}</span>
            {c.limits[0] && (
              <>
                <br />
                Upper limit load: <span className="font-mono">{c.limits[0].y.toExponential(3)}</span> at w/h ≈ <span className="font-mono">{c.limits[0].x.toFixed(2)}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
