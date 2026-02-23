export default function Skills() {
  const skillGroups = [
    {
      title: "Design & CAD",
      skills: [
        "Siemens NX",
        "SolidWorks",
        "SolidWorks FEA",
      ],
    },
    {
      title: "Manufacturing",
      skills: [
        "Mastercam",
        "CNC Machining",
        "Manual Machining",
        "Product Development & Launch",
      ],
    },
    {
      title: "Technical & Tools",
      skills: [
        "Google Workspace",
        "Microsoft Office",
        "Systems Troubleshooting",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-32 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-md tracking-[0.35em] uppercase text-black/80 mb-6">
            Skills
          </p>
        
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {skillGroups.map((group, index) => (
            <div
              key={index}
              className="border border-black/10 rounded-2xl p-8 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-6">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-md border border-black/10 bg-black/[0.03]"
                  >
                    {skill}
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