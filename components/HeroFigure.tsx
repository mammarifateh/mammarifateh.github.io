import Tex from './Tex';

/**
 * Decorative scientific illustration for the homepage:
 * qualitative deflection profiles of a clamped circular plate and a generic limit-point curve.
 * Shapes are schematic (no data), drawn from w(r) ∝ (1 − r²)² and a cubic equilibrium path.
 */
export default function HeroFigure() {
  const profile = (amp: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const r = -1 + (2 * i) / 60;
      const w = amp * (1 - r * r) ** 2;
      pts.push(`${(170 + r * 140).toFixed(1)},${(70 + w).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  const path = () => {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const x = (2 * i) / 80;
      const y = x * (x - 1) * (x - 2);
      pts.push(`${(40 + x * 130).toFixed(1)},${(300 - y * 150).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <figure className="relative overflow-hidden rounded-2xl border rule bg-white/50 dark:bg-night-2/50" aria-hidden="true">
      <div className="grid-paper absolute inset-0" />
      <svg viewBox="0 0 340 380" className="relative w-full text-ink dark:text-night-ink">
        <text x="20" y="28" className="fill-current" fontSize="10" letterSpacing="1.5" opacity=".55">
          PLATE · BENDING
        </text>
        <line x1="30" y1="70" x2="310" y2="70" stroke="currentColor" opacity=".25" strokeDasharray="3 4" />
        {[18, 36, 54, 72].map((a, i) => (
          <polyline key={a} points={profile(a)} fill="none" stroke="#35598a" strokeWidth={1.2 + i * 0.35} opacity={0.35 + i * 0.2} />
        ))}
        {[30, 310].map((x) => (
          <g key={x} stroke="currentColor" opacity=".55">
            <line x1={x} y1="58" x2={x} y2="82" strokeWidth="2" />
            {[0, 1, 2, 3].map((k) => (
              <line key={k} x1={x === 30 ? x - 8 : x} y1={60 + k * 6} x2={x === 30 ? x : x + 8} y2={56 + k * 6} strokeWidth="1" />
            ))}
          </g>
        ))}
        {[90, 130, 170, 210, 250].map((x) => (
          <path key={x} d={`M${x} 40 V58 M${x - 3} 54 L${x} 58 L${x + 3} 54`} stroke="currentColor" opacity=".45" fill="none" />
        ))}

        <text x="20" y="200" className="fill-current" fontSize="10" letterSpacing="1.5" opacity=".55">
          STABILITY · LIMIT POINTS
        </text>
        <line x1="40" y1="300" x2="310" y2="300" stroke="currentColor" opacity=".25" />
        <line x1="40" y1="215" x2="40" y2="360" stroke="currentColor" opacity=".25" />
        <polyline points={path()} fill="none" stroke="#35598a" strokeWidth="2" />
        <circle cx={40 + (1 - 1 / Math.sqrt(3)) * 130} cy={300 - 0.3849 * 150} r="4" fill="#b5475b" />
        <circle cx={40 + (1 + 1 / Math.sqrt(3)) * 130} cy={300 + 0.3849 * 150} r="4" fill="#b5475b" />
        <path d={`M${40 + (1 - 1 / Math.sqrt(3)) * 130 + 6} ${300 - 0.3849 * 150} H 300`} stroke="#b5475b" strokeDasharray="3 3" opacity=".7" />
      </svg>
      <figcaption className="relative border-t rule px-5 py-3 text-xs faint">
        <Tex>{String.raw`D\,\nabla^4 w = q + N_{\alpha\beta}\,w_{,\alpha\beta}`}</Tex>
        <span className="ml-2">schematic</span>
      </figcaption>
    </figure>
  );
}
