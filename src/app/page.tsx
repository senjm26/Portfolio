import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import CADSection from "@/components/cad/CADSection";
import Skills from "@/components/sections/Skills";
import Extracurriculars from "@/components/sections/Extracurriculars";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <CADSection />
      <Experience />
      <Skills />
      <Education />
      <Extracurriculars />
      <Contact />
    </main>
  );
}
