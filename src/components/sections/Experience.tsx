"use client";

import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Production Engineering Intern — Cleaveland/Price Inc.",
      date: "May 2026 – Aug 2026",
      location:"Trafford, PA",
      bullets: [
        "Conducted 180+ time studies of machining operations on the manufacturing floor, capturing cycle times, setup times, and process variables to support facility planning, inform equipment layout decisions, and optimize part workflow using lean manufacturing principles",
        "Developed 10+ templates and 2 AI agents to streamline and standardize the time study process, improving data consistency and repeatability across operators, machines, and parts to better translate findings into process and layout recommendations for production and engineering teams",
        "Built 2 calculators to estimate job times based on part characteristics and process parameters, enabling more reliable quoting and scheduling",
        "Audited job times to identify discrepancies between standard and actual times, discovering opportunities for process improvement and part cost savings",
      ],
      tags: ["Lean Manufacturing", "Process Improvement", "Automation"],
    },
    {
      title: "Full Member — Rensselaer Motorsport (FSAE)",
      date: "Aug 2025 – Present",
      location: "Troy, NY",
      bullets: [
        "Currently part of the aero team leading a group working to optimize multi-element wing design",
        "Conducted Finite Element Analysis on the rear wing truss using SolidWorks Simulation, improving Factor of Safety by 1.4",
        "Manufactured jigs, suspension components, and aero package components",
        "Served as race marshal, monitoring race conditions and responding to track debris to ensure driver and team safety",
      ],
      tags: ["SolidWorks", "SolidWorks Simulation", "Manufacturing"],
    },
    {
      title: "Director of IT — Sen Engineering Solutions",
      date: "Jun 2024 – Present",
      location: "Pittsburgh, PA",
      bullets: [
        "Built and launched a fully dynamic Next.js website to repair site functionality and modernize brand identity (sentransformer.com)",
        "Diagnosed and resolved hardware, software, security system, and online-meeting issues",
        "Mediated contract and planning discussions with manufacturers and customers",
      ],
      tags: ["Next.js", "IT Systems", "Leadership"],
    },
    {
      title: "Dining Room Server — Juniper Communities",
      date: "Feb 2024 – Aug 2025",
      location: "Monroeville, PA",
      bullets: [
        "Delivered meals promptly and accurately in accordance with dietary restrictions and resident preferences",
        "Fostered a compassionate, positive, and respectful environment for residents during meal times",
        "Maintained a clean and organized dining room following health and safety protocols",
        "Communicated regularly with nursing staff to address resident needs or concerns",
        "Conducted table setup, food prep, and kitchen support",
      ],
      tags: ["Customer Service", "Teamwork", "Communication"],
    },
  ];

  return (
    <section id="experience" className="bg-cream-raised text-ink py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Experience</Eyebrow>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="space-y-10 mt-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-16"
            >
              {/* Connector to next dot (only between items, never trailing past the last) */}
              {idx < experiences.length - 1 && (
                <div className="absolute left-3 md:left-6 -translate-x-1/2 top-10 h-[calc(100%+2.5rem)] w-px bg-ink/15" />
              )}

              {/* Dot */}
              <div className="absolute left-3 md:left-6 -translate-x-1/2 top-10 w-3 h-3 rounded-full bg-sky border-4 border-cream-raised z-10" />

              {/* Card */}
              <div className="group border border-ink/10 rounded-md p-5 md:p-8 hover:border-sky/50 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 bg-cream">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 md:gap-8">
                  {/* LEFT SIDE */}
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-ink">
                      {exp.title}
                    </h3>

                    <ul className="mt-6 space-y-3">
                      {exp.bullets.map((point, i) => (
                        <li
                          key={`${exp.title}-bullet-${i}`}
                          className="flex items-start gap-3 text-ink/70"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={`${exp.title}-tag-${i}`}
                          className="font-mono text-xs px-3 py-1 rounded-sm border border-ink/15 text-ink/60 transition-colors group-hover:border-sky/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE — Details */}
                  <div className="font-mono text-xs text-ink/50 md:text-right md:whitespace-nowrap">
                    <p className="text-ink/70">{exp.date}</p>
                    {exp.location && <p className="mt-1">{exp.location}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
