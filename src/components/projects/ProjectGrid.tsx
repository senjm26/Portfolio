"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Eyebrow from "../ui/Eyebrow";

export default function ProjectGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 bg-cream text-ink"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Engineering Portfolio</Eyebrow>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <ProjectCard project={project} onClick={() => setOpenIndex(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((openIndex - 1 + projects.length) % projects.length)
          }
          onNext={() => setOpenIndex((openIndex + 1) % projects.length)}
        />
      )}
    </section>
  );
}
