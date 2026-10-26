import { useMemo, type CSSProperties } from "react";
import { site, type Instrument } from "../site";

type Platform = "mac" | "windows";
const platformNames: Record<Platform, string> = { mac: "Mac", windows: "Windows" };

function detectPlatform(): Platform {
  return /Win/i.test(navigator.userAgent) ? "windows" : "mac";
}

// Download and Donate side by side. "auto" offers the visitor's own platform
// first with a link to the other; "both" shows a button for each.
export default function DownloadButtons({ instrument, layout = "auto" }: { instrument: Instrument; layout?: "auto" | "both" }) {
  const platform = useMemo(detectPlatform, []);
  const other: Platform = platform === "mac" ? "windows" : "mac";
  const platforms: Platform[] = layout === "both" ? ["mac", "windows"] : [platform];

  return (
    <div className="download-buttons" style={{ "--product": instrument.colour } as CSSProperties}>
      <div className="download-row">
        {platforms.map((p) => (
          <a key={p} className="button download" href={instrument.downloads[p]} download>
            <DownloadIcon /> Download for {platformNames[p]}
          </a>
        ))}
        {site.donateUrl && (
          <a className="button donate" href={site.donateUrl} target="_blank" rel="noreferrer">
            <HeartIcon /> Donate
          </a>
        )}
      </div>
      <p className="hero-note">
        Free · version {instrument.version}
        {layout === "auto" && (
          <> · also for <a href={instrument.downloads[other]} download>{platformNames[other]}</a></>
        )}
      </p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" fill="currentColor" />
    </svg>
  );
}
