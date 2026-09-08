import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import ProjectGrid from "@/components/projects/ProjectGrid";
import Extracurriculars from "@/components/sections/Extracurriculars";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <ProjectGrid />
      <Experience />
      <Education />
      <Extracurriculars />
      <Contact />
      <Footer />
    </main>
  );
}
