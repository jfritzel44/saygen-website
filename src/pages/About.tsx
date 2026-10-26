import { useEffect } from "react";
import { site } from "../site";

export default function About() {
  useEffect(() => {
    document.title = "About · Saygen";
    return () => { document.title = "Saygen"; };
  }, []);

  return (
    <section className="section page">
      <div className="section-inner narrow">
        <h1>About Saygen</h1>
        <p className="section-lead">
          Saygen is a small, independent audio company making instruments and effects plugins for Mac and Windows.
        </p>
        <p>
          MathSynth is the first one out: a synth built around a simple question, what does mathematics sound like?
          More instruments and effects are on the way.
        </p>
        <p>
          Follow along on Instagram at{" "}
          <a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a>, or say hello at{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
