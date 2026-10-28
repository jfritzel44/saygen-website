// After `vite build`: writes each page in src/meta.ts as real HTML (with its
// title, description, link-preview tags and structured data) so search engines
// and link previews see the content without running JavaScript. Also writes
// sitemap.xml, and app.html: the empty page vercel.json serves for every other
// route (downloads, 404s), which the browser renders as before.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { render, pages, siteUrl, metaImage } = await import(join(root, "dist-ssr/entry-server.js"));

const template = readFileSync(join(dist, "index.html"), "utf8");
writeFileSync(join(dist, "app.html"), template);

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const [path, meta] of Object.entries(pages)) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const head = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Saygen" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:image" content="${metaImage(meta)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(meta.jsonLd ? [`<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>`] : []),
  ].join("\n    ");

  const html = template
    .replace(/<title>.*?<\/title>\s*<meta name="description"[^>]*>/s, head)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  if (html === template) throw new Error(`prerender: index.html no longer has the expected title/root for ${path}`);

  const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages)
  .map((path) => `  <url><loc>${siteUrl}${path === "/" ? "/" : path}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`,
);

console.log(`prerendered ${Object.keys(pages).length} pages, sitemap.xml and app.html`);
