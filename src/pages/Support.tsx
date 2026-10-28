import { usePageMeta } from "../meta";
import { site } from "../site";

const hostTips = [
  { host: "Logic Pro and GarageBand", tip: "Use the AU. It's under Instrument → AU Instruments → Saygen. If it's missing, restart Logic: it checks new plugins at launch." },
  { host: "Ableton Live", tip: "Settings → Plug-Ins: turn on “Use VST3 Plug-In System Folders” (and Audio Units on a Mac), then Rescan." },
  { host: "FL Studio", tip: "Options → Manage plugins → Find installed plugins. MathSynth is listed under Saygen." },
  { host: "Reaper", tip: "Preferences → Plug-ins → VST → Re-scan. On a Mac the AU is under Audio Units." },
  { host: "Cubase and Studio One", tip: "Both scan the standard VST3 folder at launch; restart them after installing." },
];

export default function Support() {
  usePageMeta("/support");

  return (
    <section className="section page">
      <div className="section-inner narrow">
        <h1>Support</h1>

        <h2>Installing</h2>
        <div className="platforms">
          <article className="platform">
            <h3>Mac</h3>
            <p>Open the <code>.pkg</code> and follow the steps. You can untick any part. It installs:</p>
            <ul>
              <li>AU: <code>/Library/Audio/Plug-Ins/Components</code></li>
              <li>VST3: <code>/Library/Audio/Plug-Ins/VST3</code></li>
              <li>App: <code>/Applications</code></li>
            </ul>
          </article>
          <article className="platform">
            <h3>Windows</h3>
            <p>Run the <code>.exe</code> installer. It installs:</p>
            <ul>
              <li>VST3: <code>C:\Program Files\Common Files\VST3</code></li>
              <li>App: <code>C:\Program Files\Saygen</code>, with a Start menu entry</li>
            </ul>
            <p className="small-print">Windows may say it “protected your PC” while MathSynth is new. Click More info → Run anyway.</p>
          </article>
        </div>

        <h2>My DAW doesn't show it</h2>
        <dl className="tips">
          {hostTips.map(({ host, tip }) => (
            <div key={host}>
              <dt>{host}</dt>
              <dd>{tip}</dd>
            </div>
          ))}
        </dl>

        <h2>Updates</h2>
        <p>
          When a new version is out, an <strong>UPDATE</strong> button appears at the top of MathSynth. Download the new
          installer and run it over the old one. Your saved presets are kept.
        </p>

        <h2>Your presets</h2>
        <p>
          Saved presets are files you can back up or share: <code>~/Library/Audio/Presets/Saygen/Saygen MathSynth</code> on
          a Mac, <code>Documents\Saygen\Saygen MathSynth Presets</code> on Windows. Delete a file to remove its preset.
        </p>

        <h2>Uninstalling</h2>
        <p>
          On a Mac, delete <code>Saygen MathSynth</code> from the three folders above. On Windows, use Settings → Apps →
          Saygen MathSynth → Uninstall.
        </p>

        <h2>Still stuck?</h2>
        <p>
          Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> with your computer, operating system and DAW,
          or message <a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a>.
        </p>
      </div>
    </section>
  );
}
