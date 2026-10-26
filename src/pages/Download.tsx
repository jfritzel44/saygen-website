import { useEffect, useRef, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { HeartIcon } from "../components/DownloadButtons";
import { instruments, site } from "../site";
import NotFound from "./NotFound";

type Platform = "mac" | "windows";
const platformNames: Record<Platform, string> = { mac: "Mac", windows: "Windows" };

// Where the download buttons lead (/download/<slug>/<platform>): starts the
// download, asks for a donation while it runs, and says how to open the installer.
export default function Download() {
  const { slug, platform } = useParams();
  const instrument = instruments.find((i) => i.slug === slug);
  const started = useRef(false);
  const valid = instrument && (platform === "mac" || platform === "windows");
  const url = valid ? instrument.downloads[platform as Platform] : "";

  useEffect(() => {
    if (!valid) return;
    document.title = `Download ${instrument.name} · Saygen`;
    // The installer is served as an attachment, so this downloads it and the
    // page stays. Once only: React runs effects twice in development.
    if (!started.current) {
      started.current = true;
      const timer = window.setTimeout(() => window.location.assign(url), 600);
      return () => { window.clearTimeout(timer); document.title = "Saygen"; };
    }
    return () => { document.title = "Saygen"; };
  }, [valid, instrument, url]);

  if (!valid) return <NotFound />;
  const p = platform as Platform;

  return (
    <section className="section page download-page" style={{ "--product": instrument.colour } as CSSProperties}>
      <div className="section-inner narrow">
        <h1>Thanks for downloading {instrument.name}</h1>
        <p className="section-lead">
          Your download for {platformNames[p]} is starting. If it doesn't, <a href={url} download>download it here</a>.
        </p>

        {site.donateUrl && (
          <div className="donate-card">
            <h2>Keep it free</h2>
            <p>
              {instrument.name} is free, with no account or license key. If you enjoy it, a donation of any amount helps fund
              the next Saygen instrument.
            </p>
            <p className="donate-how">
              Donations go through Stripe's secure checkout: choose an amount, then pay by card, Apple Pay or Google Pay.
              No account needed, and Saygen never sees your card details.
            </p>
            <a className="button donate" href={site.donateUrl} target="_blank" rel="noreferrer">
              <HeartIcon /> Donate with Stripe
            </a>
          </div>
        )}

        <h2>Installing</h2>
        {p === "mac" ? (
          <ol className="install-steps">
            <li>Open <code>{installerName(url)}</code> from your Downloads folder.</li>
            {!instrument.macNotarized && (
              <li>
                If macOS says it “could not verify” the installer, click <strong>Done</strong>, then go to{" "}
                <strong>System Settings → Privacy & Security</strong>, scroll down and click <strong>Open Anyway</strong>.
              </li>
            )}
            <li>Follow the steps. It installs the AU, the VST3 and the standalone app; untick any you don't want.</li>
            <li>Restart your DAW and look for <strong>Saygen → Saygen {instrument.name}</strong>.</li>
          </ol>
        ) : (
          <ol className="install-steps">
            <li>Run <code>{installerName(url)}</code> from your Downloads folder.</li>
            <li>
              If Windows says it “protected your PC”, click <strong>More info</strong>, then <strong>Run anyway</strong>.
            </li>
            <li>Follow the steps. It installs the VST3 and the standalone app.</li>
            <li>Rescan plug-ins in your DAW and look for <strong>Saygen {instrument.name}</strong>.</li>
          </ol>
        )}
        <p className="small-print">
          Can't find it in your DAW? See <Link to="/support">Support</Link> for each host. Need the {p === "mac" ? "Windows" : "Mac"} version?{" "}
          <Link to={`/download/${instrument.slug}/${p === "mac" ? "windows" : "mac"}`}>Download for {p === "mac" ? "Windows" : "Mac"}</Link>.
        </p>
      </div>
    </section>
  );
}

function installerName(url: string) {
  return url.slice(url.lastIndexOf("/") + 1);
}
