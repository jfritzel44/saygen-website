import { Link } from "react-router-dom";
import { site } from "../site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <img src="/media/saygen-logo-chrome.png" alt="SayGen" className="footer-logo" />
        <nav aria-label="Footer">
          <Link to="/instruments/mathsynth">MathSynth</Link>
          <Link to="/support">Support</Link>
          <Link to="/about">About</Link>
          <a href={site.instagram.url} target="_blank" rel="noreferrer">Instagram</a>
          <a href={`mailto:${site.contactEmail}`}>Contact</a>
        </nav>
        <p className="fine-print">
          © {new Date().getFullYear()} SayGen. VST is a trademark of Steinberg Media Technologies GmbH.
          Audio Units is a trademark of Apple Inc.
        </p>
      </div>
    </footer>
  );
}
