import { useEffect } from "react";
import { mathsynth, site, thevoid } from "./site";

// Search and link-preview text for each page. scripts/prerender.mjs writes it
// into each page's HTML at build time (and lists these pages in sitemap.xml);
// usePageMeta keeps it right as you move between pages in the browser.

export const siteUrl = "https://saygenaudio.com";

export type PageMeta = {
  title: string;
  description: string;
  image?: string;     // link-preview image; the site-wide one when missing
  jsonLd?: object;    // structured data for Google (schema.org)
};

const defaultImage = "/media/og-mathsynth.png";

export const pages: Record<string, PageMeta> = {
  "/": {
    title: "Saygen · MathSynth, a free synth plugin that plays math",
    description:
      "Saygen makes instruments and effects plugins. MathSynth, a synth that plays math (Fibonacci, Collatz, Weierstrass and more), is free for Mac and Windows: AU, VST3 and standalone.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
      logo: `${siteUrl}/media/saygen-logo.png`,
      sameAs: [site.instagram.url],
    },
  },
  "/instruments/mathsynth": {
    title: "MathSynth · free synth plugin that plays math (AU, VST3) · Saygen",
    description:
      "MathSynth is a free synthesizer plugin for Mac and Windows whose waveform is a math function: Fibonacci, Collatz, primes, Weierstrass, the logistic map and more. AU, VST3 and standalone.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: mathsynth.name,
      description: `${mathsynth.tagline} A free synthesizer plugin whose waveform is a math function.`,
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Audio plugin (AU, VST3)",
      operatingSystem: "macOS, Windows",
      softwareVersion: mathsynth.version,
      url: `${siteUrl}/instruments/mathsynth`,
      image: `${siteUrl}${defaultImage}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: site.name, url: siteUrl },
    },
  },
  "/instruments/thevoid": {
    title: "The Void · free haunting-voices synth plugin (AU, VST3) · Saygen",
    description:
      "The Void is a free synthesizer plugin for Mac and Windows: one formula that feeds back into itself, sung through dark vowels and whispered by ghosts. AU, VST3 and standalone.",
    image: "/media/thevoid/globe.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: thevoid.name,
      description: `${thevoid.tagline} A free synthesizer plugin built on a self-feeding formula.`,
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Audio plugin (AU, VST3)",
      operatingSystem: "macOS, Windows",
      softwareVersion: thevoid.version,
      url: `${siteUrl}/instruments/thevoid`,
      image: `${siteUrl}/media/thevoid/globe.png`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: site.name, url: siteUrl },
    },
  },
  "/support": {
    title: "Support · installing MathSynth in Logic, Ableton, FL Studio · Saygen",
    description:
      "How to install Saygen plugins on Mac and Windows and find them in Logic Pro, GarageBand, Ableton Live, FL Studio, Reaper, Cubase and Studio One.",
  },
  "/about": {
    title: "About · Saygen",
    description: "Saygen is a small, independent audio company making instruments and effects plugins for Mac and Windows.",
  },
  "/privacy": {
    title: "Privacy · Saygen",
    description: "What Saygen does with your email address, donations and visits.",
  },
};

export function metaImage(meta: PageMeta) {
  return `${siteUrl}${meta.image ?? defaultImage}`;
}

// Sets the title and description for the page at path while it's open.
export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = pages[path];
    if (!meta) return;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    return () => {
      document.title = pages["/"].title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", pages["/"].description);
    };
  }, [path]);
}
