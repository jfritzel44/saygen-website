import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MathSynth from "./pages/MathSynth";
import TheVoid from "./pages/TheVoid";
import Support from "./pages/Support";
import About from "./pages/About";
import Download from "./pages/Download";
import Privacy from "./pages/Privacy";
import { Analytics } from "@vercel/analytics/react";
import NotFound from "./pages/NotFound";

// New pages start at the top, unless the link points at a section (#download).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instruments/mathsynth" element={<MathSynth />} />
          <Route path="/instruments/thevoid" element={<TheVoid />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/download/:slug/:platform" element={<Download />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
