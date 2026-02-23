export default function ExperienceSection() {
  const experiences = [
    {
      title: "Rensselaer Motorsport (FSAE)",
      date: "Aug 2025 – Present",
      location: "Troy, NY",
      bullets: [
        "Designing and building a new pit cart for competition",
        "Performed FEA on rear wing truss increasing FoS by 1.4",
        "Manufactured jigs, suspension tabs, and support components",
      ],
      tags: ["SolidWorks", "FEA", "CNC Machining", "Manufacturing"],
    },
    {
      title: "Director of IT — Sen Engineering Solutions",
      date: "June 2024 – Present",
      location: "Pittsburgh, PA",
      bullets: [
        "Built and deployed a modern Next.js website",
        "Resolved hardware, software, and security systems",
        "Participated in planning and contract discussions",
      ],
      tags: ["Next.js", "IT Systems", "Security", "Leadership"],
    },
    {
      title: "Dining Room Server — Juniper Communities",
      date: "Feb 2024 – Aug 2025",
      location: "Pittsburgh, PA",
      bullets: [
        "Delivered high-level customer service in fast-paced environment",
        "Coordinated with kitchen and management staff",
        "Maintained professionalism under high-volume shifts",
      ],
      tags: ["Customer Service", "Teamwork", "Communication"],
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-md tracking-[0.35em] uppercase text-black/80 mb-8">
            Experience
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative space-y-10">

          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300" />

          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="relative pl-16"
            >
              {/* Dot */}
              <div className="absolute left-[16.5px] top-10 w-4 h-4 rounded-full bg-black border-4 border-white z-10" />

              {/* Card */}
              <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition bg-white">

                <div className="grid md:grid-cols-[1fr_auto] gap-8">

                  {/* LEFT SIDE */}
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {exp.title}
                    </h3>

                    <ul className="mt-6 space-y-3">
                      {exp.bullets.map((point, i) => (
                        <li
                          key={`${exp.title}-bullet-${i}`}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={`${exp.title}-tag-${i}`}
                          className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE — Details */}
                  <div className="text-sm text-gray-500 md:text-right whitespace-nowrap">
                    <p className="font-medium text-gray-700">{exp.date}</p>
                    <p className="mt-1">{exp.location}</p>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}