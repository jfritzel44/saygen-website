import { useEffect, useState } from "react";
import DownloadButtons from "../components/DownloadButtons";
import FormulaBackdrop from "../components/FormulaBackdrop";
import { mathsynth } from "../site";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "videos", label: "Videos" },
  { id: "download", label: "Download" },
];

const features = [
  {
    title: "The function wheel",
    text: "Thirteen functions from analysis, fractals, number theory and chaos theory. Related functions sit side by side and share a colour, and each slice shows the mathematician behind it.",
  },
  {
    title: "A scope that holds still",
    text: "The oscilloscope locks to each cycle, so the waveform stands still while you play. The window is 9:16, the shape of a Reel, ready to screen-record.",
  },
  {
    title: "Math and Smooth",
    text: "Math changes each function's constants: the logistic map's r, Weierstrass's a and b, the base of a sequence. Smooth rounds off the hard edges.",
  },
  {
    title: "True pitch or rhythm",
    text: "At 1x one cycle of the function plays per note, in tune. Slow it down in octave steps and the numbers turn into rhythms and textures.",
  },
  {
    title: "Filter, delay, reverb",
    text: "A resonant filter, envelope and glide. The mod wheel can sweep Math, Smooth or the cutoff, and Learn maps it to any controller.",
  },
  {
    title: "21 presets, and yours",
    text: "Keys, leads, funk and soul, plucks, bass and rhythm to start from. Save your own sounds as presets with one click.",
  },
];

const videos = [
  { title: "Fibonacci sounds hot", src: "/media/mathsynth-1.mp4", poster: "/media/mathsynth-1.jpg" },
  { title: "Whose math vibes the hardest? Gaussian", src: "/media/mathsynth-2.mp4", poster: "/media/mathsynth-2.jpg" },
];

// Highlights the sub-nav link of the section under the sub-nav.
function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function MathSynth() {
  const active = useActiveSection();

  useEffect(() => {
    document.title = "MathSynth · Saygen";
    return () => { document.title = "Saygen"; };
  }, []);

  return (
    <div className="formula-page">
      <FormulaBackdrop />
      <section id="download" className="product-hero">
        <div className="product-hero-inner">
          <div className="product-hero-text">
            <p className="eyebrow">Synthesizer · AU · VST3 · Standalone</p>
            <h1>MathSynth</h1>
            <p className="lead">{mathsynth.tagline} Pick a function on the wheel, from Fibonacci to the logistic map, and its values become the waveform you hear.</p>
            <DownloadButtons instrument={mathsynth} />
            <p className="hero-note requirements">macOS 11 or later, Apple silicon and Intel · Windows 10 or 11, 64-bit</p>
            <a className="text-link" href="#videos">Watch it play →</a>
          </div>
          <div className="device">
            <video src="/media/mathsynth-2.mp4" poster="/media/mathsynth-2.jpg" autoPlay muted loop playsInline aria-label="MathSynth playing the Gaussian function" />
          </div>
        </div>
      </section>

      <nav className="product-nav" aria-label="MathSynth">
        <div className="product-nav-inner">
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : undefined}>{label}</a>
          ))}
        </div>
      </nav>

      <section id="overview" className="section">
        <div className="section-inner">
          <h2>Synthesis by numbers</h2>
          <p className="section-lead">
            Most synths start from a sine, a saw or a square. MathSynth starts from mathematics: prime gaps, the Cantor
            staircase, Gödel numbers, the Collatz sequence. Each one has its own voice, and the wheel lets you move
            between them while you play.
          </p>
          <div className="feature-grid">
            {features.map((f) => (
              <article key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
          <div className="screenshots">
            <figure>
              <img src="/media/mathsynth/wheel.png" alt="MathSynth's Wheel page: the function wheel, scope and formula" loading="lazy" />
              <figcaption>Wheel page: pick a function, watch its wave and formula</figcaption>
            </figure>
            <figure>
              <img src="/media/mathsynth/synth.png" alt="MathSynth's Synth page: oscillator, filter, envelope and wheel controls" loading="lazy" />
              <figcaption>Synth page: oscillator, filter, envelope and presets</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="videos" className="section alt">
        <div className="section-inner">
          <h2>Videos</h2>
          <p className="section-lead">More on Instagram at <a href="https://www.instagram.com/saygen.audio/" target="_blank" rel="noreferrer">@saygen.audio</a>.</p>
          <div className="video-grid">
            {videos.map((v) => (
              <figure key={v.src}>
                <video src={v.src} poster={v.poster} controls preload="none" playsInline aria-label={v.title} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="credits">
        <div className="section-inner">
          <p className="credits-note">
            Portraits from Wikimedia Commons. Toussaint (Godfried Toussaint), Collatz (Konrad Jacobs) and May (NBeale)
            are adapted from CC BY-SA photographs, Erdős (Kmhkmh) from a CC BY photograph; the rest are public domain.
          </p>
        </div>
      </section>
    </div>
  );
}
