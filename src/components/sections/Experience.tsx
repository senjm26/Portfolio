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
        "Conducted 180+ time studies across press brakes, saws, CNC mills, CNC lathes, and cabinet assembly, timing 30+ operators and breaking each job into setup, per-part run time, and cleanup to capture cycle times and process variables",
        "Audited standard job times against actual time to flag discrepancies, surfacing opportunities for process improvement and part cost savings",
        "Built two job time calculators that estimate production time from part characteristics and process parameters, replacing judgment-based estimates to support more reliable routing and quoting",
        "Developed two AI agents in Microsoft Copilot AI Builder to standardize individual time-study files into one dataset and run trend analysis linking part and process variables (material, thickness) to job time",
        "Documented shop-floor inefficiencies and operator feedback that fed facility planning for a new building and shop floor layout decisions",
        "Applied lean manufacturing principles including 5S and the 8 wastes",
      ],
      tags: ["Lean Manufacturing", "Process Improvement", "Automation"],
    },
    {
      title: "Full Member — Rensselaer Motorsport (FSAE)",
      date: "Aug 2025 – Present",
      location: "Troy, NY",
      bullets: [
        "Leading a 5-person aerodynamics sub-team working to optimize a multi-element wing design",
        "Machined chassis jigs and fabricated suspension components and carbon fiber aero components",
        "Conducted Finite Element Analysis on rear wing truss using SolidWorks Simulation, improving Factor of Safety by 1.4",
        "Served as race marshal, monitoring track conditions and clearing debris to protect drivers and team members",
      ],
      tags: ["SolidWorks", "SolidWorks Simulation", "Manufacturing"],
    },
    {
      title: "Director of IT — Sen Engineering Solutions",
      date: "Jun 2024 – Present",
      location: "Pittsburgh, PA",
      bullets: [
        "Participated in contract and planning discussions with manufacturers and customers",
        "Built and launched a fully dynamic Next.js website to repair site functionality and modernize brand identity (sentransformer.com)",
        "Diagnosed and resolved hardware and software issues regarding computers, security systems, and online meetings",
      ],
      tags: ["Next.js", "IT Systems", "Leadership"],
    },
    {
      title: "Dining Room Server — Juniper Communities",
      date: "Feb 2024 – Aug 2025",
      location: "Monroeville, PA",
      bullets: [
        "Delivered meals to 60+ residents promptly and accurately according to dietary restrictions and resident preferences",
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
