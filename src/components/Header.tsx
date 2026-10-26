import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { instruments, mathsynth } from "../site";

export default function Header() {
  const [instrumentsOpen, setInstrumentsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // the phone-width menu
  const dropdown = useRef<HTMLLIElement>(null);
  const location = useLocation();

  // Close both menus on navigation, and the dropdown on a click outside it or Escape.
  useEffect(() => {
    setInstrumentsOpen(false);
    setMenuOpen(false);
  }, [location]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dropdown.current?.contains(e.target as Node)) setInstrumentsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setInstrumentsOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="SayGen home">
          <img src="/media/saygen-logo-chrome.png" alt="SayGen" />
        </Link>

        <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main">
          <ul>
            <li ref={dropdown} className={instrumentsOpen ? "has-dropdown open" : "has-dropdown"}>
              <button aria-expanded={instrumentsOpen} onClick={() => setInstrumentsOpen(!instrumentsOpen)}>
                Instruments <span className="caret" aria-hidden="true" />
              </button>
              <div className="dropdown">
                {instruments.map((instrument) => (
                  <Link key={instrument.slug} to={`/instruments/${instrument.slug}`} className="dropdown-item">
                    <img src={instrument.image} alt="" />
                    <span>
                      <strong>{instrument.name}</strong>
                      <small>{instrument.tagline}</small>
                      <em>Free</em>
                    </span>
                  </Link>
                ))}
                <p className="dropdown-note">More instruments and effects on the way.</p>
              </div>
            </li>
            <li><NavLink to="/support">Support</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <Link to={`/instruments/${mathsynth.slug}#download`} className="button small header-cta">
            Get MathSynth
          </Link>
        </nav>
      </div>
    </header>
  );
}
