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

        {/* Experience Cards */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <h3 className="text-xl font-semibold text-black">
                  {exp.title}
                </h3>

                <div className="text-sm text-gray-500 md:text-right">
                  <p>{exp.date}</p>
                  <p>{exp.location}</p>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="mt-6 space-y-3 list-none pl-0">
                {exp.bullets.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-3">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}