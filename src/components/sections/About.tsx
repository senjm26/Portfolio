"use client";

import { motion } from "framer-motion";
import { PenTool, Wrench, MonitorCog, Users } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import HairlineRule from "../ui/HairlineRule";

const skillGroups = [
  {
    title: "Design & CAD",
    icon: <PenTool size={16} strokeWidth={1.8} />,
    skills: [
      "Siemens NX",
      "SolidWorks",
      "SolidWorks Simulation",
      "Computer-Aided Design (CAD)",
      "Finite Element Analysis (FEA)",
      "GD&T",
    ],
  },
  {
    title: "Manufacturing",
    icon: <Wrench size={16} strokeWidth={1.8} />,
    skills: [
      "Manual Machining",
      "CNC Machining",
      "Mastercam",
      "Welding",
      "Brazing",
      "Lean Manufacturing",
      "Product Development & Launch",
    ],
  },
  {
    title: "Technical Tools",
    icon: <MonitorCog size={16} strokeWidth={1.8} />,
    skills: ["Google Workspace", "Microsoft Office", "Python", "TypeScript"],
  },
  {
    title: "Professional Skills",
    icon: <Users size={16} strokeWidth={1.8} />,
    skills: [
      "Leadership",
      "Public Speaking",
      "Customer Service",
      "Communication",
      "Teamwork",
      "Personal Care Services",
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 bg-cream text-ink"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow>About</Eyebrow>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 gap-16 items-start">
          {/* Portrait */}
          <motion.div
            {...fadeUp}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 group">
              <div className="absolute inset-0 rounded-full border border-sky/50 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-3 rounded-full overflow-hidden border border-ink/10">
                <img
                  src="/images/portrait1.jpg"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div {...fadeUp} className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink/80">
              I am a mechanical engineering student who enjoys solving
              real world problems through design, testing, and building.
              Whether it is a personal project or a team build, I like
              turning ideas into feasible, purposeful solutions. My focus
              areas are CAD design, finite element analysis, and
              manufacturing, and I am especially interested in seeing a
              design through to a real, manufactured product.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              I am currently growing my engineering skills through
              Rensselaer Motorsport (FSAE), expanding my experience with
              design and manufacturing, and looking for internships where I
              can contribute while continuing to learn, particularly in
              mechanical design, CAD, prototyping, and manufacturing.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Outside of studies and professional work, I study the cello,
              work out at the gym, and try to learn something new every day,
              whether it is photography, web design, marketing,
              or another new skill.
            </p>
          </motion.div>
        </div>

        <HairlineRule className="my-16" />

        {/* Skills */}
        <motion.div {...fadeUp}>
          <Eyebrow>Skills</Eyebrow>
        </motion.div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5 text-ink/70">
                {group.icon}
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 font-mono text-xs rounded-sm border border-ink/15 text-ink/70 transition-colors hover:border-sky hover:text-sky"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
