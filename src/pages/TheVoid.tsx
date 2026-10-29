import { usePageMeta } from "../meta";
import DownloadButtons from "../components/DownloadButtons";
import { thevoid } from "../site";

const features = [
  {
    title: "One loop, feeding on itself",
    text: "Every note is a sine that hears its own past: y = sin(ωt + β·F(y(t − τ))). At Loop 0 it's a pure tone; turn it up and it howls, sings and finally comes apart into chaos.",
  },
  {
    title: "Voices in the dark",
    text: "Voice sends the loop through slowly drifting vowels, oo, oh, ah, a different one on each side, so it sounds like a choir. Breath adds whispered air, and past halfway it becomes ghosts whispering all around you.",
  },
  {
    title: "A globe that rewires itself",
    text: "The wheel round the glass globe spins faster the more notes you play, reshuffling the feedback chain as it goes. Play slowly and the sound settles; play fast and it storms.",
  },
  {
    title: "Haunt and Bloom",
    text: "Haunt adds copies of the loop either side and an octave down, each drifting on its own, into a pad. Bloom lets the loop grow with the envelope, so notes open up as they swell.",
  },
  {
    title: "Ten presets, and yours",
    text: "Howling Forest, Choir of the Lost, Whispers, Siren in the Dark, Event Horizon and more. Save your own sounds as presets with one click.",
  },
  {
    title: "Made for Reels",
    text: "The window is 9:16. On a Mac, the round button in the header films it with exactly what you play, ready to post to Instagram.",
  },
];

export default function TheVoid() {
  usePageMeta("/instruments/thevoid");

  return (
    <div>
      <section id="download" className="product-hero">
        <div className="product-hero-inner">
          <div className="product-hero-text">
            <p className="eyebrow">Synthesizer · AU · VST3 · Standalone</p>
            <h1>The Void</h1>
            <p className="lead">
              {thevoid.tagline} One formula sings back into itself, through dark vowels and ghostly whispers, in a large,
              dark hall.
            </p>
            <DownloadButtons instrument={thevoid} />
            <p className="hero-note requirements">macOS 11 or later, Apple silicon and Intel · Windows 10 or 11, 64-bit</p>
            <a className="text-link" href="#overview">How it works →</a>
          </div>
          <div className="device">
            <img src="/media/thevoid/globe.png" alt="The Void's Globe page: the glass globe, its relics and the Loop knob, over the scope" />
          </div>
        </div>
      </section>

      <section id="overview" className="section">
        <div className="section-inner">
          <h2>A strange loop</h2>
          <p className="section-lead">
            Douglas Hofstadter called it a strange loop: something that, followed far enough, arrives back at itself. The
            Void is built on one. Each note listens to what it just played and bends itself by it, and the result sounds
            less like an oscillator than like voices calling from somewhere far away.
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
              <img src="/media/thevoid/globe.png" alt="The Void's Globe page" loading="lazy" />
              <figcaption>Globe page: the wheel, a relic for each function, and Loop</figcaption>
            </figure>
            <figure>
              <img src="/media/thevoid/synth.png" alt="The Void's Synth page: Loop, Feedback, Envelope, Voice, Reverb and Wheel controls" loading="lazy" />
              <figcaption>Synth page: every control, in sections</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
