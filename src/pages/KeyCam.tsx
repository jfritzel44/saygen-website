import { usePageMeta } from "../meta";
import DownloadButtons from "../components/DownloadButtons";
import { keycam } from "../site";

const features = [
  {
    title: "Your camera and the keys, together",
    text: "Your camera fills the stage, sits above the piano, or goes in a corner you drag anywhere. Built-in, USB or (on a Mac) your iPhone through Continuity Camera.",
  },
  {
    title: "A piano that lights up",
    text: "Every note you play lights up on screen, in the colour you choose. Classic, hand-drawn, 3D, or photographed Rhodes, Wurly, Clavinet and synth keyboards, from 25 keys to the full 88.",
  },
  {
    title: "Chord names and sheet music",
    text: "The chord you hold appears big on screen (C, Am, Cmaj7, G7/B…), and a staff shows the notes as you play them, with a metronome. Your students see exactly what you did.",
  },
  {
    title: "Ready for Reels, Shorts and TikTok",
    text: "Record 9:16 at 1080 × 1920, or 16:9 for YouTube. Loudness meters show when you're at the level Instagram and YouTube play at, so your video isn't too quiet.",
  },
  {
    title: "Backgrounds that move to the music",
    text: "Put a picture behind everything and let it flow, shimmer or ripple with what you play. Add falling notes that drop onto the keys in the finished video.",
  },
  {
    title: "Edit without leaving",
    text: "Trim, split and join takes, fix a chord name, then save. Record in Logic or any DAW as a plugin (with your tracks through the side chain), or on its own as an app.",
  },
];

export default function KeyCam() {
  usePageMeta("/instruments/keycam");

  return (
    <div>
      <section id="download" className="product-hero">
        <div className="product-hero-inner">
          <div className="product-hero-text">
            <p className="eyebrow">For music teachers · AU · VST3 · Standalone</p>
            <h1>KeyCam</h1>
            <p className="lead">
              {keycam.tagline} Play, and KeyCam films you with an on-screen piano, chord names and sheet music, ready to
              post.
            </p>
            <DownloadButtons instrument={keycam} />
            <p className="hero-note requirements">macOS 11 or later, Apple silicon and Intel</p>
            <a className="text-link" href="#overview">What it does →</a>
          </div>
          <div className="device">
            <img src={keycam.image} alt="KeyCam: the stage with the camera, a chord name and the lit-up piano, and the options beside it" />
          </div>
        </div>
      </section>

      <section id="overview" className="section">
        <div className="section-inner">
          <h2>Teach from the keyboard</h2>
          <p className="section-lead">
            KeyCam turns a lesson into a video people can follow: your hands and your face, the keys you press lit up,
            and the chord written out, all in one frame. No screen recording, no editing app, no green screen.
          </p>
          <div className="feature-grid">
            {features.map((f) => (
              <article key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
          <p className="small-print">
            {keycam.price}, once. KeyCam is for Mac for now. Payment goes through Stripe, and your download link appears
            right after.
          </p>
        </div>
      </section>
    </div>
  );
}
