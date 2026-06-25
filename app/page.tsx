import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundEffects from "./components/motion/BackgroundEffects";
import ScrollProgress from "./components/motion/ScrollProgress";
import ScrollToTop from "./components/motion/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <BackgroundEffects />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
