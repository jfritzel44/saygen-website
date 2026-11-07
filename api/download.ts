// Downloads for paid products. Stripe sends a buyer back to
// /thanks/<product>?session_id=cs_..., and that page calls:
//   GET /api/download?product=keycam&session_id=cs_...
//       → { ok: true, email } if that checkout was paid for this product
//   GET /api/download?product=keycam&session_id=cs_...&platform=mac|windows
//       → a redirect to the installer
// The installers are releases of the product's private GitHub repo; GitHub
// answers an authorised request for one with a signed link to the file that
// works for a few minutes, which is where the buyer is sent.
//
// Environment variables (Vercel project settings):
//   STRIPE_SECRET_KEY        a restricted key with Checkout Sessions: Read is enough
//   STRIPE_LINK_<PRODUCT>    the product's Payment Link ID (plink_...), so a
//                            donation's checkout can't unlock it
//   GITHUB_RELEASES_TOKEN    fine-grained token, Contents: Read on the private repos

type Product = { repo: string; tag: string; files: Record<"mac" | "windows", string> };

const products: Record<string, Product> = {
  keycam: {
    repo: "jfritzel44/saygen-keycam",
    tag: "keycam-latest",
    files: { mac: "Saygen-KeyCam-mac.pkg", windows: "Saygen-KeyCam-windows.exe" },
  },
};

const sessionPattern = /^cs_(live|test)_[A-Za-z0-9]{10,200}$/;

function fail(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const slug = params.get("product") ?? "";
  const product = Object.prototype.hasOwnProperty.call(products, slug) ? products[slug] : undefined;
  const session = params.get("session_id") ?? "";
  const platform = params.get("platform");
  if (!product || !sessionPattern.test(session) || (platform !== null && platform !== "mac" && platform !== "windows")) {
    return fail(400, "That isn't a download link.");
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const link = process.env[`STRIPE_LINK_${slug.toUpperCase()}`];
  const githubToken = process.env.GITHUB_RELEASES_TOKEN;
  if (!stripeKey || !link || !githubToken) {
    console.error(`download: STRIPE_SECRET_KEY, STRIPE_LINK_${slug.toUpperCase()} or GITHUB_RELEASES_TOKEN isn't set`);
    return fail(503, "Downloads aren't set up yet. Please email us and we'll send your copy.");
  }

  // Was this checkout paid, and for this product?
  const stripe = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session}`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });
  if (stripe.status === 404) return fail(404, "We couldn't find that purchase.");
  if (!stripe.ok) {
    console.error(`download: Stripe answered ${stripe.status}: ${await stripe.text()}`);
    return fail(502, "We couldn't check your purchase just now. Please try again in a minute.");
  }
  const checkout = (await stripe.json()) as {
    status?: string;
    payment_status?: string;
    payment_link?: string | null;
    customer_details?: { email?: string | null } | null;
  };
  const paid = checkout.status === "complete" && (checkout.payment_status === "paid" || checkout.payment_status === "no_payment_required");
  if (checkout.payment_link !== link) return fail(403, "That purchase isn't for this product.");
  if (!paid) return fail(402, "That payment hasn't gone through yet. Refresh this page in a minute.");

  if (platform === null) {
    return Response.json({ ok: true, email: checkout.customer_details?.email ?? "" }, { headers: { "Cache-Control": "no-store" } });
  }

  // The file in the private release, then GitHub's short-lived link to it.
  const github = { Authorization: `Bearer ${githubToken}`, "X-GitHub-Api-Version": "2022-11-28" };
  const release = await fetch(`https://api.github.com/repos/${product.repo}/releases/tags/${product.tag}`, {
    headers: { ...github, Accept: "application/vnd.github+json" },
  });
  if (!release.ok) {
    console.error(`download: GitHub release ${product.repo}@${product.tag}: ${release.status} ${await release.text()}`);
    return fail(502, "The download isn't available just now. Please email us and we'll send your copy.");
  }
  const assets = ((await release.json()) as { assets?: { name: string; url: string }[] }).assets ?? [];
  const asset = assets.find((a) => a.name === product.files[platform]);
  if (!asset) {
    console.error(`download: ${product.files[platform]} isn't in ${product.repo}@${product.tag}`);
    return fail(502, "The download isn't available just now. Please email us and we'll send your copy.");
  }
  const file = await fetch(asset.url, { headers: { ...github, Accept: "application/octet-stream" }, redirect: "manual" });
  const location = file.headers.get("location");
  if (file.status < 300 || file.status >= 400 || !location) {
    console.error(`download: GitHub asset ${asset.url}: ${file.status}`);
    return fail(502, "The download isn't available just now. Please email us and we'll send your copy.");
  }
  return new Response(null, { status: 302, headers: { Location: location, "Cache-Control": "no-store" } });
}
