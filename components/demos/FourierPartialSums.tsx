'use client';

import { useMemo, useState } from 'react';
import Plot from './Plot';

/** Partial sums of the Fourier series of the 2π-periodic square wave (±1). */
export default function FourierPartialSums() {
  const [N, setN] = useState(5);
  const { xs, sq, sn, peak } = useMemo(() => {
    const n = 1200;
    const xs: number[] = [];
    const sq: number[] = [];
    const sn: number[] = [];
    let peak = -Infinity;
    for (let i = 0; i <= n; i++) {
      const x = -Math.PI + (2 * Math.PI * i) / n;
      let s = 0;
      for (let k = 0; k < N; k++) s += Math.sin((2 * k + 1) * x) / (2 * k + 1);
      s *= 4 / Math.PI;
      xs.push(x);
      sq.push(x === 0 || Math.abs(x) === Math.PI ? 0 : x > 0 ? 1 : -1);
      sn.push(s);
      if (s > peak) peak = s;
    }
    return { xs, sq, sn, peak };
  }, [N]);

  const data = useMemo(
    () => [
      { x: xs, y: sq, mode: 'lines', name: 'Square wave f(x)', line: { color: '#7a808c', width: 1.5, dash: 'dot' } },
      { x: xs, y: sn, mode: 'lines', name: `Partial sum with ${N} term${N > 1 ? 's' : ''}`, line: { color: '#35598a', width: 2.2 } },
    ],
    [xs, sq, sn, N],
  );
  const layout = useMemo(() => ({ xaxis: { title: { text: 'x' }, range: [-Math.PI, Math.PI] }, yaxis: { range: [-1.4, 1.4] } }), []);

  return (
    <div className="not-prose my-8 rounded-xl border rule p-4 sm:p-6">
      <Plot data={data} layout={layout} height={340} ariaLabel="Fourier partial sums of a square wave" />
      <label className="mt-4 grid gap-1.5 text-sm">
        <span className="flex justify-between">
          <span>Number of non-zero terms</span>
          <span className="font-mono">{N}</span>
        </span>
        <input type="range" min={1} max={60} value={N} onChange={(e) => setN(+e.target.value)} className="accent-[#35598a]" />
      </label>
      <p className="mt-3 text-sm muted">
        Computed maximum of the partial sum: <span className="font-mono">{peak.toFixed(4)}</span> (the function itself never exceeds 1).
      </p>
    </div>
  );
}
