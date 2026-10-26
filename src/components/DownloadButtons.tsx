import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { site, type Instrument } from "../site";

type Platform = "mac" | "windows";
const platformNames: Record<Platform, string> = { mac: "Mac", windows: "Windows" };

// A download button for each platform, then Donate. The download buttons go
// to the download page (pages/Download.tsx), which starts the download.
export default function DownloadButtons({ instrument }: { instrument: Instrument }) {
  const platforms: Platform[] = ["mac", "windows"];

  return (
    <div className="download-buttons" style={{ "--product": instrument.colour } as CSSProperties}>
      <div className="download-row">
        {platforms.map((p) => (
          <Link key={p} className="button download" to={`/download/${instrument.slug}/${p}`}>
            <DownloadIcon /> Download for {platformNames[p]}
          </Link>
        ))}
        {site.donateUrl && (
          <a className="button donate" href={site.donateUrl} target="_blank" rel="noreferrer">
            <HeartIcon /> Donate
          </a>
        )}
      </div>
      <p className="hero-note">Free · version {instrument.version}</p>
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

export function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" fill="currentColor" />
    </svg>
  );
}
