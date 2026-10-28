import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { metaImage, pages, siteUrl } from "./meta";

// Used by scripts/prerender.mjs to write each page's HTML at build time.
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
