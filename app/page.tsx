import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

const Experience = dynamic(() => import("./components/Experience"));
const Testimonials = dynamic(() => import("./components/Testimonials"));

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Footer />
    </main>
  );
}
