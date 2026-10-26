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
};

export const functions: MathFunction[] = [
  { name: "Sinc", formula: "sinc(x) = sin(x) / x", family: "analytic", credit: "E. T. Whittaker, 1915", portrait: "whittaker" },
  { name: "Gaussian", formula: "f(x) = e^(−x² / 2σ²)", family: "analytic", credit: "Carl Friedrich Gauss, 1809", portrait: "gauss" },
  { name: "Weierstrass", formula: "W(x) = Σ aⁿ cos(bⁿπx)", family: "fractal", credit: "Karl Weierstrass, 1872", portrait: "weierstrass" },
  { name: "Cantor", formula: "C(x/3) = C(x) / 2", family: "fractal", credit: "Georg Cantor, 1884", portrait: "cantor" },
  { name: "Thue-Morse", formula: "t(n) = popcount(n) mod 2", family: "binary", credit: "Axel Thue, 1906", portrait: "thue" },
  { name: "Erdős", formula: "|x(d) + x(2d) + … + x(kd)| > C", family: "binary", credit: "Paul Erdős, c. 1932", portrait: "erdos" },
  { name: "Euclid", formula: "onset(j) = ( j·k mod n ) < k", family: "binary", credit: "Godfried Toussaint, 2005", portrait: "toussaint" },
  { name: "Fibonacci", formula: "F(n) = F(n−1) + F(n−2) mod m", family: "numberTheory", credit: "Fibonacci, 1202", portrait: "fibonacci" },
  { name: "Primes", formula: "g(n) = p(n+1) − p(n)", family: "numberTheory", credit: "Eratosthenes, 3rd c. BC", portrait: "eratosthenes" },
  { name: "Euler", formula: "φ(n) = #{ k ≤ n : gcd(k, n) = 1 }", family: "numberTheory", credit: "Leonhard Euler, 1763", portrait: "euler" },
  { name: "Gödel", formula: "G = 2^a · 3^b · 5^c · 7^d …", family: "numberTheory", credit: "Kurt Gödel, 1931", portrait: "godel" },
  { name: "Collatz", formula: "n → n/2  or  3n + 1", family: "numberTheory", credit: "Lothar Collatz, 1937", portrait: "collatz" },
  { name: "Logistic", formula: "x → r x (1 − x)", family: "dynamics", credit: "Robert May, 1976", portrait: "may" },
];
