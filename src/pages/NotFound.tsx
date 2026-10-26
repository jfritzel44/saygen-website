import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section page">
      <div className="section-inner narrow">
        <h1>Page not found</h1>
        <p>That page doesn't exist. <Link to="/">Back to the home page</Link>.</p>
      </div>
    </section>
  );
}
