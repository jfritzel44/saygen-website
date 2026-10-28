# Saygen website

React + TypeScript + Vite. Dark theme in MathSynth's colours (`src/styles.css`).

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
```

- `src/site.ts`: links, contact email, donate link, MathSynth's version and download links, its functions
  and presets. Most edits start here.
- `src/pages/`: Home, MathSynth (`/instruments/mathsynth`), Support, About.
- `src/components/Header.tsx`: the Instruments dropdown lists `instruments` from `site.ts`, so a
  new product is one entry there plus its page and route (`src/App.tsx`).
- `public/media/`: logo, screenshots, portraits, cropped videos and audio demos.
- Downloads link to the newest installers in the public
  [saygen-releases](https://github.com/jfritzel44/saygen-releases) repo (`mathsynth-latest`), so
  they never need changing; bump `version` in `site.ts` after each release (it's only the label).
  The Donate button next to each download (`src/components/DownloadButtons.tsx`) opens
  `donateUrl`, and is hidden while it's empty.
- The home page hero's animated background is `src/components/WaveField.tsx`.

Deployed on Vercel (project `saygen`) at https://saygenaudio.com (www and saygen.vercel.app
redirect there, in `vercel.json`), connected to
[jfritzel44/saygen-website](https://github.com/jfritzel44/saygen-website): every push to `main`
deploys to production, and other branches get preview links. `vercel.json` sends every page route
to `app.html` (an empty page the browser fills in) so deep links work.
- SEO: `npm run build` prerenders the pages listed in `src/meta.ts` to real HTML
  (`scripts/prerender.mjs`), with each page's title, description, link-preview tags and structured
  data, and writes `sitemap.xml`. A new page needs an entry there to be prerendered and in the
  sitemap; `public/robots.txt` keeps crawlers off `/download/` and `/api/`.
- Downloads ask for an email first (`emailGate` in `site.ts`): `api/subscribe.ts` adds it to the
  product's MailerLite group, whose automation emails the links. It needs `MAILERLITE_API_KEY` and
  `MAILERLITE_GROUP_<PRODUCT>` in the Vercel project's environment variables. If MailerLite fails,
  the download starts anyway.
