import { useEffect, useRef } from "react";

// The home hero's background: ribbons of glowing strands, each tracing one of
// MathSynth's function families in its wheel colour, drifting slowly.

type Ribbon = { colour: string; f: (x: number) => number; amplitude: number; speed: number; rise: number; offset: number };

// Weierstrass: W(x) = Σ aⁿ cos(bⁿπx), a few terms.
const weierstrass = (x: number) => {
  let sum = 0;
  for (let n = 0, a = 1, b = 1; n < 5; n++, a *= 0.5, b *= 3) sum += a * Math.cos(b * Math.PI * x);
  return sum / 1.9;
};
const smooth = (x: number) => Math.sin(Math.PI * x) * 0.7 + Math.sin(2.3 * Math.PI * x + 1) * 0.3;
const gaussians = (x: number) => Math.exp(-((Math.sin(0.8 * Math.PI * x) * 2) ** 2)) * 2 - 1;
const beats = (x: number) => Math.sin(Math.PI * x) * Math.cos(0.37 * Math.PI * x);

const ribbons: Ribbon[] = [
  { colour: "63 208 255", f: smooth, amplitude: 0.13, speed: 0.05, rise: 0.45, offset: 0.62 },
  { colour: "214 79 255", f: weierstrass, amplitude: 0.11, speed: 0.035, rise: 0.38, offset: 0.7 },
  { colour: "156 255 87", f: beats, amplitude: 0.09, speed: 0.06, rise: 0.3, offset: 0.82 },
  { colour: "255 179 64", f: gaussians, amplitude: 0.06, speed: 0.04, rise: 0.5, offset: 0.55 },
  { colour: "255 90 110", f: smooth, amplitude: 0.08, speed: 0.07, rise: 0.25, offset: 0.9 },
];
const strands = 12;

export default function WaveField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const w = el.clientWidth, h = el.clientHeight, t = time / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1;
      for (const r of ribbons) {
        for (let s = 0; s < strands; s++) {
          const spread = (s - strands / 2) / strands;
          ctx.strokeStyle = `rgb(${r.colour} / ${0.3 - Math.abs(spread) * 0.35})`;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 4) {
            const u = x / w;
            const y = h * (r.offset - r.rise * u + r.amplitude * r.f(u * 2.2 + t * r.speed + spread * 0.08)) + spread * h * 0.05;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    // Only animate while the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(draw);
    });
    const onResize = () => { resize(); if (still) draw(0); };

    resize();
    observer.observe(el);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvas} className="wave-field" aria-hidden="true" />;
}
