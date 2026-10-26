import { Link } from "react-router-dom";
import DownloadButtons from "../components/DownloadButtons";
import WaveField from "../components/WaveField";
import { functions, mathsynth, site, upcoming } from "../site";

// The cards that overlap the bottom of the hero.
const stories = [
  {
    title: "Fibonacci sounds hot",
    date: "October 2026",
    text: "Check out this video to hear the creator play a synth solo using MathSynth.",
    image: "/media/mathsynth-1.jpg",
    imageClass: "scope",
    to: "/instruments/mathsynth#videos",
  },
  {
    title: "Thirteen functions, thirteen mathematicians",
    date: "October 2026",
    text: "Fibonacci, Collatz, Gödel, Erdős and more on one wheel, each with its inventor's portrait.",
    portraits: true,
    to: "/instruments/mathsynth#functions",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <WaveField />
        <div className="home-hero-inner">
          <div className="home-hero-text">
            <p className="eyebrow">New instrument · free for Mac and Windows</p>
            <h1>MathSynth</h1>
            <p className="lead">
              Get ready to vibe. This math is hot. 🔥 Fibonacci is on fire and Euler rips. Download MathSynth today.
            </p>
            <DownloadButtons instrument={mathsynth} />
            <Link className="text-link" to="/instruments/mathsynth">Learn more about MathSynth →</Link>
          </div>
          <div className="device small">
            <video src="/media/mathsynth-1.mp4" poster="/media/mathsynth-1.jpg" autoPlay muted loop playsInline aria-label="MathSynth playing the Fibonacci function" />
          </div>
        </div>
      </section>

      <section className="stories" aria-label="News">
        <div className="story-grid">
          {stories.map((story) => {
            const body = (
              <>
                {story.portraits ? (
                  <div className="portrait-mosaic" aria-hidden="true">
                    {functions.slice(0, 12).map((fn) => <img key={fn.portrait} src={`/media/portraits/${fn.portrait}.png`} alt="" loading="lazy" />)}
                  </div>
                ) : (
                  <img src={story.image} className={story.imageClass} alt="" loading="lazy" />
                )}
                <div className="story-text">
                  <h3>{story.title}</h3>
                  <p className="story-date">{story.date}</p>
                  <p>{story.text}</p>
                </div>
              </>
            );
            return <Link key={story.title} to={story.to} className="story">{body}</Link>;
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="section-bar">Featured instruments</h2>
          <div className="featured-grid">
            <Link to="/instruments/mathsynth" className="featured featured-live">
              <img src={mathsynth.image} alt="MathSynth's function wheel" loading="lazy" />
              <div className="featured-text">
                <span className="tag">Synthesizer · free</span>
                <h3>MathSynth</h3>
                <p>{mathsynth.tagline}</p>
              </div>
            </Link>
            {upcoming.map((item) => (
              <article key={item.name} className="featured">
                <img src={item.image} alt="" loading="lazy" />
                <div className="featured-text">
                  <span className="tag soon">{item.kind} · coming soon</span>
                  <h3>{item.name}</h3>
                  <p>{item.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt support-band">
        <div className="section-inner narrow">
          <h2>Free to download. Kept going by you.</h2>
          <p className="section-lead">
            MathSynth is free, with no account or license key. If it ends up in your music, a donation of any size helps
            fund the next Saygen instrument.
          </p>
          <DownloadButtons instrument={mathsynth} />
          <p className="small-print">
            Mac: macOS 11 or later, Apple silicon and Intel, AU, VST3 and standalone. Windows: 10 or 11, 64-bit, VST3 and
            standalone. Help installing: <Link to="/support">Support</Link>.
          </p>
        </div>
      </section>

      <section className="section follow">
        <div className="section-inner narrow">
          <h2>See it played</h2>
          <p className="section-lead">New instruments, demos and the math behind them, every week on Instagram.</p>
          <a className="button ghost" href={site.instagram.url} target="_blank" rel="noreferrer">Follow {site.instagram.handle}</a>
        </div>
      </section>
    </>
  );
}
