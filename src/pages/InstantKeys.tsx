import { usePageMeta } from "../meta";
import DownloadButtons from "../components/DownloadButtons";
import { instantkeys } from "../site";

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

export default function InstantKeys() {
  usePageMeta("/instruments/instantkeys");

  return (
    <div>
      <section id="download" className="product-hero">
        <div className="product-hero-inner">
          <div className="product-hero-text">
            <p className="eyebrow">For Content Creators, Music Teachers</p>
            <h1>InstantKeys</h1>
            <p className="lead">
              {instantkeys.tagline} Play, and InstantKeys films you with an on-screen piano, chord names and sheet music, ready to
              post.
            </p>
            <DownloadButtons instrument={instantkeys} />
            <p className="hero-note requirements">macOS 11 or later, Apple silicon and Intel</p>
            <a className="text-link" href="#overview">What it does →</a>
          </div>
          <div className="device">
            <img src="/media/instantkeys/main.png" alt="Saygen InstantKeys: create beautiful piano videos with customizable keyboards, illuminated notes, chords and sheet music" />
          </div>
        </div>
      </section>

      <section id="overview" className="section">
        <div className="section-inner">
          <h2>Create Beautiful Piano Videos in One Take</h2>
          <p className="section-lead">
            Play your piano. InstantKeys handles the visuals.
          </p>
          <p className="section-lead">
            Turn your piano performance into a professional-looking video—all in a single recording.
          </p>
          <p className="section-lead">
            Show your hands, your face, illuminated piano keys, detected chords, and sheet music together in one beautifully customized frame.
          </p>
          <p className="section-lead">
            No complicated video editing. No green screen. No separate screen recording software.
          </p>
          <p className="section-lead">
            Finalize your video with a built-in editor before publishing. Video and audio is automatically optimized for Instagram or Youtube.
          </p>
          <div className="instantkeys-videos">
            {["Jbr0LngKS6g", "kD2RUZW5K_k", "_Rctx001k0c", "sPQhfzD_dBA"].map((videoId, index) => (
              <figure key={videoId}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title={`InstantKeys video ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <figcaption>
                  <a className="text-link" href={`https://www.youtube.com/shorts/${videoId}`} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube →
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="feature-grid">
            {features.map((f) => (
              <article key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
          <p className="small-print">
            {instantkeys.price}, once. InstantKeys is for Mac for now. Payment goes through Stripe, and your download link appears
            right after.
          </p>
        </div>
      </section>
    </div>
  );
}
