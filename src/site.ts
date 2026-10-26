// Everything that changes per release or per account lives here.

export const site = {
  name: "Saygen",
  instagram: { handle: "@saygen.audio", url: "https://www.instagram.com/saygen.audio/" },
  contactEmail: "jafritzel@gmail.com",
  // Donate button, shown next to every download button; hidden while empty.
  // TODO: the real link (a Stripe Payment Link with "customer chooses amount",
  // Ko-fi, or PayPal).
  donateUrl: "",
};

export type Instrument = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  version: string;
  colour: string;  // its download buttons; the site's chrome stays Saygen silver
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
    about: "The sine wave divided by x: a big central peak with ripples that die away on both sides. It's the shape of a perfect band-limited click, the building block of digital audio. The Math knob widens or narrows it, from a soft hump to a long ringing tail." },
  { name: "Gaussian", formula: "f(x) = e^(−x² / 2σ²)", family: "analytic", credit: "Carl Friedrich Gauss, 1809", portrait: "gauss",
    about: "The bell curve of statistics, the shape of measurement errors and heights in a crowd. As a waveform it's one smooth pulse per cycle: mellow and round when wide, buzzy when narrow. The Math knob sets its width σ." },
  { name: "Weierstrass", formula: "W(x) = Σ aⁿ cos(bⁿπx)", family: "fractal", credit: "Karl Weierstrass, 1872", portrait: "weierstrass",
    about: "A sum of cosines, each b times faster and a times quieter than the one before (MathSynth uses b = 3). Weierstrass used it to show a curve can be continuous everywhere yet have a corner at every point. The Math knob sets a, from almost a sine to bright and jagged." },
  { name: "Cantor", formula: "C(x/3) = C(x) / 2", family: "fractal", credit: "Georg Cantor, 1884", portrait: "cantor",
    about: "The devil's staircase: a ramp that climbs from 0 to 1 but is flat almost everywhere, rising only on the Cantor set, the dust left after you keep deleting the middle third of every line. At depth 0 it's a plain saw; each step of the Math knob adds another level of stairs." },
  { name: "Thue-Morse", formula: "t(n) = popcount(n) mod 2", family: "binary", credit: "Axel Thue, 1906", portrait: "thue",
    about: "Write n in binary and count the 1s: even gives +1, odd gives −1. The sequence never repeats a block three times in a row, so it's balanced and restless. MathSynth plays it as a square wave with irregular steps; the Math knob sets how many terms make one cycle." },
  { name: "Erdős", formula: "|x(d) + x(2d) + … + x(kd)| > C", family: "binary", credit: "Paul Erdős, c. 1932", portrait: "erdos",
    about: "Erdős asked whether any sequence of +1s and −1s could keep every sum x(d) + x(2d) + … + x(kd) small, for every step d. None can (Terence Tao proved it in 2015), but this one comes close: its sums grow only very slowly. It sounds like a pulse wave that never quite settles. The Math knob picks the base p it's built from." },
  { name: "Euclid", formula: "onset(j) = ( j·k mod n ) < k", family: "binary", credit: "Godfried Toussaint, 2005", portrait: "toussaint",
    about: "Spread k beats as evenly as possible over n steps. Toussaint found these Euclidean rhythms all over traditional music: E(3,8) is the tresillo, E(5,8) the Cuban cinquillo. At 1x they're pulse waves; slowed down with Speed they become drum patterns. The Math knob steps through 23 of them." },
  { name: "Fibonacci", formula: "F(n) = F(n−1) + F(n−2) mod m", family: "numberTheory", credit: "Fibonacci, 1202", portrait: "fibonacci",
    about: "Each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8… Keep only the remainder after dividing by m and the sequence loops, a Pisano period. MathSynth plays one full loop per cycle as a stepped wave. The Math knob sets m, from 2 to 22." },
  { name: "Primes", formula: "g(n) = p(n+1) − p(n)", family: "numberTheory", credit: "Eratosthenes, 3rd c. BC", portrait: "eratosthenes",
    about: "The gaps between consecutive primes: 1, 2, 2, 4, 2, 4, 2, 4, 6… No one can predict the next one, so the wave is irregular but never quite random. MathSynth plays 32 gaps per cycle (as square roots, so a rare big gap doesn't flatten the rest). The Math knob moves the starting point up to the 5000th prime." },
  { name: "Euler", formula: "φ(n) = #{ k ≤ n : gcd(k, n) = 1 }", family: "numberTheory", credit: "Leonhard Euler, 1763", portrait: "euler",
    about: "φ(n) counts the numbers up to n that share no factor with it. For a prime it's n − 1; for numbers with many factors it drops. So the wave is a jagged climb with a spike at every prime. The Math knob sets how far it counts, from 8 to 128." },
  { name: "Gödel", formula: "G = 2^a · 3^b · 5^c · 7^d …", family: "numberTheory", credit: "Kurt Gödel, 1931", portrait: "godel",
    about: "Gödel turned logic into arithmetic by giving every symbol a code and every formula one number: 2 to the first code, times 3 to the second, times 5 to the third, and so on. In his 1931 system the number n is written as n “successor” signs (code 3) then a zero (code 1). MathSynth plays those codes: a pulse that narrows as the Math knob raises n." },
  { name: "Collatz", formula: "n → n/2  or  3n + 1", family: "numberTheory", credit: "Lothar Collatz, 1937", portrait: "collatz",
    about: "Halve n if it's even, otherwise triple it and add 1. Every start ever tried falls back to 1, but nobody has proved it always will. The wave is the whole trip, on a log scale: 27 takes 111 steps and climbs to 9,232 on the way. The Math knob picks the starting number." },
  { name: "Logistic", formula: "x → r x (1 − x)", family: "dynamics", credit: "Robert May, 1976", portrait: "may",
    about: "x → r·x·(1 − x) is Robert May's model of a population that grows until crowding holds it back. As r rises the orbit settles on 2 values, then 4, then 8, then breaks into chaos, with calm windows inside it. The Math knob sweeps r from 3.4 to 4: steady tones turn into noise." },
];
