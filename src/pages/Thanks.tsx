import { useEffect, useState, type CSSProperties } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import InstallSteps from "../components/InstallSteps";
import { instruments, site } from "../site";
import NotFound from "./NotFound";

type Platform = "mac" | "windows";
const platformNames: Record<Platform, string> = { mac: "Mac", windows: "Windows" };
const files: Record<Platform, (product: string) => string> = {
  mac: (product) => `Saygen-${product}-mac.pkg`,
  windows: (product) => `Saygen-${product}-windows.exe`,
};

// Where Stripe sends a buyer after paying (/thanks/<slug>?session_id=cs_...;
// the Payment Link's confirmation page is set to redirect here). It asks
// api/download.ts whether that checkout was paid, then links each installer
// through it. The address keeps working, so it's the buyer's download page.
// /thanks/<slug>?code=... is a free copy instead (a gift code, see api/download.ts).
export default function Thanks() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const instrument = instruments.find((i) => i.slug === slug && i.buyUrl !== undefined);
  const session = params.get("session_id") ?? "";
  const code = params.get("code");
  const proof = code !== null ? `code=${encodeURIComponent(code)}` : `session_id=${encodeURIComponent(session)}`;
  const [state, setState] = useState<{ step: "checking" } | { step: "paid"; email: string } | { step: "failed"; message: string }>({ step: "checking" });

  useEffect(() => {
    if (!instrument) return;
    document.title = `Thank you · ${instrument.name} · Saygen`;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`/api/download?product=${instrument.slug}&${proof}`);
        const body = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (response.ok && body.ok) setState({ step: "paid", email: body.email ?? "" });
        else setState({ step: "failed", message: body.error ?? "We couldn't check your purchase." });
      } catch {
        if (!cancelled) setState({ step: "failed", message: "We couldn't reach the server. Check your connection and refresh this page." });
      }
    })();
    return () => {
      cancelled = true;
      document.title = "Saygen";
    };
  }, [instrument, proof]);

  if (!instrument) return <NotFound />;
  const product = instrument.name.replace(/\s+/g, "");
  const link = (p: Platform) => `/api/download?product=${instrument.slug}&${proof}&platform=${p}`;
  const mine: Platform = typeof navigator !== "undefined" && /Windows/i.test(navigator.userAgent) ? "windows" : "mac";
  const order: Platform[] = instrument.macOnly ? ["mac"] : mine === "mac" ? ["mac", "windows"] : ["windows", "mac"];
  const help = (
    <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${instrument.name} download`)}`}>{site.contactEmail}</a>
  );

  return (
    <section className="section page download-page" style={{ "--product": instrument.colour } as CSSProperties}>
      <div className="section-inner narrow">
        {state.step === "checking" && (
          <>
            <h1>{code !== null ? instrument.name : "Thank you!"}</h1>
            <p className="section-lead">{code !== null ? "Getting your download…" : "Checking your purchase…"}</p>
          </>
        )}

        {state.step === "failed" && (
          <>
            <h1>We couldn't find your download</h1>
            <p className="section-lead">{state.message}</p>
            <p>
              {code !== null ? <>Email {help} and we'll sort it out.</> : <>If you've paid and this keeps happening, email {help} with the address on your receipt and we'll send your
              copy of {instrument.name} straight away.</>}
            </p>
          </>
        )}

        {state.step === "paid" && (
          <>
            <h1>{code !== null ? <>Here's your copy of {instrument.name}!</> : <>Thank you for buying {instrument.name}!</>}</h1>
            <p className="section-lead">
              {instrument.macOnly
                ? "Download it for your Mac below."
                : "Download it for your computer below. Your purchase includes both versions."}
            </p>
            <div className="download-buttons">
              <div className="download-row">
                {order.map((p) => (
                  <a key={p} className={p === order[0] ? "button download" : "button ghost"} href={link(p)}>
                    Download for {platformNames[p]}
                  </a>
                ))}
              </div>
              <p className="hero-note">Version {instrument.version}</p>
            </div>
            <p className="small-print">
              <strong>Bookmark this page:</strong> it's your download link, for reinstalling or another computer.
              {state.email && <> Stripe has emailed your receipt to {state.email}.</>}{code === null && <> Lost it? Email {help}.</>}
            </p>

            {order.map((p) => (
              <div key={p}>
                <h2>Installing on {p === "mac" ? "a Mac" : "Windows"}</h2>
                <InstallSteps instrument={instrument} platform={p} file={files[p](product)} />
              </div>
            ))}
            <p className="small-print">
              The first time you turn the camera on, your Mac asks whether “Saygen {instrument.name} Camera” may use it: allow it.
              {order.includes("windows") && (
                <> On Windows, “Let desktop apps access your camera” must be on in Settings → Privacy & security → Camera.</>
              )}{" "}
              Can't find {instrument.name} in your DAW? See{" "}
              <Link to="/support">Support</Link> for each host.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

