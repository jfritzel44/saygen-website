// Everything that changes per release or per account lives here.

export const site = {
  name: "Saygen",
  instagram: { handle: "@saygen.audio", url: "https://www.instagram.com/saygen.audio/" },
  contactEmail: "jafritzel@gmail.com",
  // Donate button, shown next to every download button; hidden while empty.
  // Stripe Payment Link "Support Saygen" (customer chooses the amount).
  donateUrl: "https://buy.stripe.com/00w6oA0AgadafHcdNv67S01",
};

export type Instrument = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  version: string;
  colour: string;  // its download buttons; the site's chrome stays Saygen silver
  macNotarized: boolean;  // false: the download page explains Gatekeeper's "Open Anyway"
  downloads: { mac: string; windows: string };
};

// The newest installers, which MathSynth/.github/workflows/release.yml keeps
// under fixed names in the public releases repo's "<slug>-latest" release, so
// these links never change. Bump each instrument's version after a release
// (it's only the label under the buttons).
function releaseDownloads(slug: string, product: string) {
  const base = `https://github.com/jfritzel44/saygen-releases/releases/download/${slug}-latest/Saygen-${product}`;
  return { mac: `${base}-mac.pkg`, windows: `${base}-windows.exe` };
}

export const mathsynth: Instrument = {
  slug: "mathsynth",
  name: "MathSynth",
  tagline: "A synthesizer that plays math.",
  price: "Free",
  image: "/media/mathsynth/wheel.png",
  version: "0.1.2",
  colour: "#d64fff",  // the fractal purple it opens with (Weierstrass)
  macNotarized: false,  // true once the release workflow signs and notarizes
  downloads: releaseDownloads("mathsynth", "MathSynth"),
};

export const instruments: Instrument[] = [mathsynth];

// Shown on the home page as "coming soon".
export const upcoming: { name: string; kind: string; tagline: string; image: string }[] = [];

// The functions on MathSynth's wheel, in wheel order, with the colours the
// plugin gives each family (MathSynth/Source/UI/Theme.h).
export const families = {
  analytic: { label: "Analytic", colour: "#3fd0ff" },
  fractal: { label: "Fractal", colour: "#d64fff" },
  binary: { label: "Binary sequences", colour: "#9cff57" },
  numberTheory: { label: "Number theory", colour: "#ffb340" },
  dynamics: { label: "Chaos", colour: "#ff5a6e" },
} as const;

export type MathFunction = {
  name: string;
  formula: string;
  family: keyof typeof families;
  credit: string;
  portrait: string;
  about: string;  // what the formula means and how MathSynth plays it
};

export const functions: MathFunction[] = [
  { name: "Sinc", formula: "sinc(x) = sin(x) / x", family: "analytic", credit: "E. T. Whittaker, 1915", portrait: "whittaker",
    about: "A sine wave divided by x: one tall peak with ripples fading out on both sides. It's the shape of a perfect click, the building block of digital audio." },
  { name: "Gaussian", formula: "f(x) = e^(−x² / 2σ²)", family: "analytic", credit: "Carl Friedrich Gauss, 1809", portrait: "gauss",
    about: "The bell curve from statistics. As a wave it's one smooth pulse per cycle, mellow when wide and buzzy when narrow." },
  { name: "Weierstrass", formula: "W(x) = Σ aⁿ cos(bⁿπx)", family: "fractal", credit: "Karl Weierstrass, 1872", portrait: "weierstrass",
    about: "A stack of cosines, each faster and quieter than the last. It's continuous everywhere but has a corner at every point, so it sounds bright and jagged." },
  { name: "Cantor", formula: "C(x/3) = C(x) / 2", family: "fractal", credit: "Georg Cantor, 1884", portrait: "cantor",
    about: "The devil's staircase: a ramp that climbs from 0 to 1 while staying flat almost everywhere. Each step of the Math knob adds another level of stairs." },
  { name: "Thue-Morse", formula: "t(n) = popcount(n) mod 2", family: "binary", credit: "Axel Thue, 1906", portrait: "thue",
    about: "Count the 1s in n written in binary: even gives +1, odd gives −1. The pattern never repeats itself three times in a row, so it sounds balanced but restless." },
  { name: "Erdős", formula: "|x(d) + x(2d) + … + x(kd)| > C", family: "binary", credit: "Paul Erdős, c. 1932", portrait: "erdos",
    about: "A sequence of +1s and −1s built so its sums along every stride stay as small as possible. Erdős asked whether they could stay bounded forever; Terence Tao proved in 2015 they can't." },
  { name: "Euclid", formula: "onset(j) = ( j·k mod n ) < k", family: "binary", credit: "Godfried Toussaint, 2005", portrait: "toussaint",
    about: "k beats spread as evenly as possible over n steps, the rhythms Toussaint found in music worldwide. Slow it down with Speed and the wave becomes a drum pattern." },
  { name: "Fibonacci", formula: "F(n) = F(n−1) + F(n−2) mod m", family: "numberTheory", credit: "Fibonacci, 1202", portrait: "fibonacci",
    about: "Each number is the sum of the two before it, keeping only the remainder after dividing by m. That makes the sequence loop, and MathSynth plays one loop per cycle." },
  { name: "Primes", formula: "g(n) = p(n+1) − p(n)", family: "numberTheory", credit: "Eratosthenes, 3rd c. BC", portrait: "eratosthenes",
    about: "The gaps between consecutive prime numbers. Nobody can predict the next one, so the wave is irregular without being random." },
  { name: "Euler", formula: "φ(n) = #{ k ≤ n : gcd(k, n) = 1 }", family: "numberTheory", credit: "Leonhard Euler, 1763", portrait: "euler",
    about: "φ(n) counts the numbers up to n that share no factor with it. It spikes at every prime, so the wave is a jagged climb." },
  { name: "Gödel", formula: "G = 2^a · 3^b · 5^c · 7^d …", family: "numberTheory", credit: "Kurt Gödel, 1931", portrait: "godel",
    about: "Gödel turned every formula into one number by raising successive primes to each symbol's code. MathSynth plays the codes for the number n, a pulse that narrows as n grows." },
  { name: "Collatz", formula: "n → n/2  or  3n + 1", family: "numberTheory", credit: "Lothar Collatz, 1937", portrait: "collatz",
    about: "Halve n if it's even, otherwise triple it and add 1, and repeat until you reach 1. Nobody has proved every number gets there; the wave is the whole trip." },
  { name: "Logistic", formula: "x → r x (1 − x)", family: "dynamics", credit: "Robert May, 1976", portrait: "may",
    about: "Robert May's model of a population that grows until crowding holds it back. As r rises it settles on 2, 4, then 8 values before breaking into chaos." },
];
