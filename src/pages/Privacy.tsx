import { usePageMeta } from "../meta";
import { site } from "../site";

export default function Privacy() {
  usePageMeta("/privacy");

  return (
    <section className="section page">
      <div className="section-inner narrow">
        <h1>Privacy</h1>
        <p>Last updated October 2026.</p>

        <h2>Your email</h2>
        <p>
          When you download an instrument, we ask for your email address. We use it to send you the download links and
          occasional news about new Saygen instruments. Every email has an unsubscribe link, and unsubscribing removes you
          from future emails. The list is kept with our email service, MailerLite, and we never sell or share it.
        </p>

        <h2>Donations</h2>
        <p>
          Donations are handled by Stripe. Your card details go straight to Stripe; we see only the amount, your email and
          your name if you give it.
        </p>

        <h2>Visits</h2>
        <p>
          We count page visits with Vercel Web Analytics, which uses no cookies and doesn't identify you. The plugins check
          once per launch whether a newer version is out; that request sends nothing about you.
        </p>

        <h2>Questions</h2>
        <p>
          To see or delete what we hold about you, email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
