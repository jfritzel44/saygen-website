import { functions } from "../site";

// Where each wheel formula sits behind the page: top and left as % of the window, size in rem.
const spots = [
  [5, 4, 1.6], [9, 58, 1.2], [18, 30, 1.0], [25, 74, 1.5], [33, 6, 1.1], [41, 44, 1.7], [49, 80, 1.0],
  [57, 16, 1.4], [64, 56, 1.1], [72, 2, 1.0], [79, 34, 1.5], [87, 68, 1.2], [94, 10, 1.1],
];

// The wheel's formulas in faint grey, fixed behind the MathSynth page.
export default function FormulaBackdrop() {
  return (
    <div className="formula-backdrop" aria-hidden="true">
      {functions.map((fn, i) => {
        const [top, left, size] = spots[i % spots.length];
        return <span key={fn.name} style={{ top: `${top}%`, left: `${left}%`, fontSize: `${size}rem` }}>{fn.formula}</span>;
      })}
    </div>
  );
}
