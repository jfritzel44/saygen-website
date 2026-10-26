// POST /api/subscribe { email, product, platform }: adds the email to the
// product's MailerLite group, whose automation emails the download links.
// Runs on Vercel, so the API key stays off the public site. Environment
// variables (Vercel project settings):
//   MAILERLITE_API_KEY           MailerLite → Integrations → API
//   MAILERLITE_GROUP_<PRODUCT>   the group's ID, e.g. MAILERLITE_GROUP_MATHSYNTH

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<Response> {
  let body: { email?: unknown; product?: unknown; platform?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const product = typeof body.product === "string" ? body.product.replace(/[^a-z0-9]/gi, "").toUpperCase() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return Response.json({ error: "That doesn't look like an email address." }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const group = process.env[`MAILERLITE_GROUP_${product}`];
  if (!apiKey || !group) {
    console.error(`subscribe: MAILERLITE_API_KEY or MAILERLITE_GROUP_${product} isn't set`);
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, groups: [group] }),
  });
  if (response.status === 422) {
    return Response.json({ error: "That doesn't look like an email address." }, { status: 400 });
  }
  if (!response.ok) {
    console.error(`subscribe: MailerLite answered ${response.status}: ${await response.text()}`);
    return Response.json({ error: "Couldn't sign up" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
