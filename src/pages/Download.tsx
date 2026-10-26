import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { HeartIcon } from "../components/DownloadButtons";
import { instruments, site, type Instrument } from "../site";
import NotFound from "./NotFound";

type Platform = "mac" | "windows";
const platformNames: Record<Platform, string> = { mac: "Mac", windows: "Windows" };
const signedUpKey = "saygen-signed-up";  // localStorage: this browser has given an email

// Where the download buttons lead (/download/<slug>/<platform>). With
// site.emailGate on, it asks for an email first (api/subscribe.ts adds it to
// MailerLite, which emails the links). Then it starts the download, asks for a
// donation and says how to open the installer. Phones can't install plugins,
// so there the email is how they get the links to their computer.
export default function Download() {
  const { slug, platform } = useParams();
  const instrument = instruments.find((i) => i.slug === slug);
  if (!instrument || (platform !== "mac" && platform !== "windows")) return <NotFound />;
  // Keyed, so switching platform starts afresh (and downloads again).
  return <DownloadPage key={`${slug}/${platform}`} instrument={instrument} platform={platform} />;
}

function DownloadPage({ instrument, platform }: { instrument: Instrument; platform: Platform }) {
  const url = instrument.downloads[platform];
  const phone = isPhone();
  const [step, setStep] = useState<"ask" | "done">(() => (site.emailGate && !readSignedUp() ? "ask" : "done"));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    document.title = `Download ${instrument.name} · Saygen`;
    return () => { document.title = "Saygen"; };
  }, [instrument]);

  // The installer is served as an attachment, so this downloads it and the
  // page stays. Once only: React runs effects twice in development.
  useEffect(() => {
    if (step !== "done" || phone || started.current) return;
    started.current = true;
    const timer = window.setTimeout(() => window.location.assign(url), 600);
    return () => window.clearTimeout(timer);
  }, [step, phone, url]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product: instrument.slug, platform }),
      });
      if (response.status === 400) {
        setError((await response.json()).error ?? "Please check your email address.");
        return;
      }
      // Any other failure is ours, not theirs: let them download anyway.
    } catch {
      // Offline or blocked: same.
    } finally {
      setSending(false);
    }
    writeSignedUp();
    setStep("done");
  }

  if (step === "ask") {
    return (
      <Page instrument={instrument}>
        <h1>Get {instrument.name} free</h1>
        <p className="section-lead">
          {phone
            ? `${instrument.name} runs on Mac and Windows computers. Enter your email and we'll send you the download links, ready for when you're at your computer.`
            : `Enter your email and your download for ${platformNames[platform]} starts right away. We'll email you the links too.`}
        </p>
        <form className="email-form" onSubmit={submit}>
          <input type="email" required autoComplete="email" placeholder="you@example.com" aria-label="Email address"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="button download" type="submit" disabled={sending}>
            {sending ? "Sending…" : phone ? "Email me the links" : `Download for ${platformNames[platform]}`}
          </button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
        <p className="small-print">
          You'll also get occasional emails about new Saygen instruments. Unsubscribe any time. <Link to="/privacy">Privacy</Link>.
        </p>
        <DonateCard instrument={instrument} />
      </Page>
    );
  }

  return (
    <Page instrument={instrument}>
      {phone && site.emailGate ? (
        <>
          <h1>Check your inbox</h1>
          <p className="section-lead">
            We've emailed you the Mac and Windows download links. Open the email on your computer to install {instrument.name}.
          </p>
        </>
      ) : (
        <>
          <h1>Thanks for downloading {instrument.name}</h1>
          <p className="section-lead">
            Your download for {platformNames[platform]} is starting. If it doesn't, <a href={url} download>download it here</a>.
          </p>
        </>
      )}

      <DonateCard instrument={instrument} />

      <h2>Installing</h2>
      {platform === "mac" ? (
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
        Can't find it in your DAW? See <Link to="/support">Support</Link> for each host. Need the {platform === "mac" ? "Windows" : "Mac"} version?{" "}
        <Link to={`/download/${instrument.slug}/${platform === "mac" ? "windows" : "mac"}`}>Download for {platform === "mac" ? "Windows" : "Mac"}</Link>.
      </p>
    </Page>
  );
}

// On both the email step and the thank-you page; hidden while donateUrl is empty.
function DonateCard({ instrument }: { instrument: Instrument }) {
  if (!site.donateUrl) return null;
  return (
    <div className="donate-card">
      <h2>Keep it free</h2>
      <p>
        {instrument.name} is free, with no license key. If you enjoy it, a donation of any amount helps fund the next
        Saygen instrument.
      </p>
      <p className="donate-how">
        Donations go through Stripe's secure checkout: choose an amount, then pay by card, Apple Pay or Google Pay.
        No account needed, and Saygen never sees your card details.
      </p>
      <a className="button donate" href={site.donateUrl} target="_blank" rel="noreferrer">
        <HeartIcon /> Donate with Stripe
      </a>
    </div>
  );
}

function Page({ instrument, children }: { instrument: Instrument; children: ReactNode }) {
  return (
    <section className="section page download-page" style={{ "--product": instrument.colour } as CSSProperties}>
      <div className="section-inner narrow">{children}</div>
    </section>
  );
}

function installerName(url: string) {
  return url.slice(url.lastIndexOf("/") + 1);
}

// Phones and tablets (iPadOS reports itself as a Mac, but has touch).
function isPhone() {
  const ua = navigator.userAgent;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

// Storage can be unavailable (private windows, blocked site data): then
// they're simply asked again.
function readSignedUp() {
  try { return localStorage.getItem(signedUpKey) === "1"; } catch { return false; }
}

function writeSignedUp() {
  try { localStorage.setItem(signedUpKey, "1"); } catch { /* asked again next time */ }
}
