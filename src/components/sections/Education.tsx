"use client";

import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

export default function Education() {
  const education = [
    {
      school: "Rensselaer Polytechnic Institute",
      location: "Troy, NY",
      degree: "B.S. Mechanical Engineering",
      highlights: ["GPA: 3.5", "Rensselaer Medalist", "Junior Standing"],
      coursework: [
        "Basic Applied Statistics",
        "Calculus I",
        "Calculus II",
        "Chemistry I",
        "Chemistry II",
        "Engineering Graphics & CAD",
        "Engineering Processes",
        "Essence of Engineering Mechanics (Statics)",
        "Intro to Differential Equations",
        "Material Science for Engineers",
        "Multivariable Calculus & Matrix Algebra",
        "Numerical Methods and Programming For Engineers",
        "Physics I",
        "Physics II",
        "Principles of Economics",
        "Professional Development - Tech Issues & Solutions",
        "Science, Tech, & Society",
        "Solid Mechanics",
        "Thermodynamics",
      ],
    },
    {
      school: "Gateway High School",
      location: "Pittsburgh, PA",
      degree: "High School Diploma",
      highlights: [
        "GPA: 3.81",
        "Rank: 5 / 289",
        "Distinguished Honor Roll",
        "National Honor Society",
        "AP Scholar",
      ],
      coursework: [],
    },
  ];

  return (
    <section id="education" className="relative py-32 px-6 bg-cream text-ink">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Education</Eyebrow>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="space-y-12 mt-16">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-16"
            >
              {/* Connector to next dot (only between items, never trailing past the last) */}
              {idx < education.length - 1 && (
                <div className="absolute left-3 md:left-6 -translate-x-1/2 top-10 h-[calc(100%+3rem)] w-px bg-ink/15" />
              )}

              {/* Dot */}
              <div className="absolute left-3 md:left-6 -translate-x-1/2 top-10 w-3 h-3 rounded-full bg-sky border-4 border-cream z-10" />

              {/* Card */}
              <div className="group border border-ink/10 rounded-md p-5 md:p-8 hover:border-sky/50 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 bg-cream-raised">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl tracking-tight text-ink">
                      {edu.school}
                    </h3>
                    <p className="text-ink/50 mt-1">{edu.location}</p>
                  </div>

                  <div className="text-ink/70 md:text-right">
                    <p className="font-medium">{edu.degree}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {edu.highlights.map((item, i) => (
                    <span
                      key={`${edu.school}-highlight-${i}`}
                      className="font-mono text-xs px-3 py-1 rounded-sm border border-ink/15 text-ink/70 transition-colors group-hover:border-sky/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div className="mt-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/40 mb-4">
                      Relevant Coursework
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={`${edu.school}-course-${i}`}
                          className="font-mono text-xs px-3 py-1 rounded-sm border border-ink/15 text-ink/60 transition-colors group-hover:border-sky/30"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
