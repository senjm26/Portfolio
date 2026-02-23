export default function Education() {
  const education = [
    {
      school: "Rensselaer Polytechnic Institute",
      location: "Troy, NY",
      degree: "B.S. Mechanical Engineering",
      highlights: [
        "GPA: 3.62",
        "Rensselaer Medalist",
      ],
      coursework: [
        "Calculus I–III",
        "Differential Equations",
        "Linear Algebra",
        "Statics",
        "Materials Science",
        "Physics I",
        "CAD",
        "Engineering Processes",
        "Applied Statistics",
        "Chemistry I–II",
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
    <section
      id="education"
      className="relative py-32 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p className="text-md tracking-[0.35em] uppercase text-black/80 mb-8">
            Education
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative space-y-12">

          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-black/20" />

          {education.map((edu) => (
            <div
              key={edu.school}
              className="relative pl-16"
            >
              {/* Dot */}
              <div className="absolute left-[18px] top-10 w-4 h-4 rounded-full bg-black border-4 border-white z-10" />

              {/* Card */}
              <div className="border border-black/10 rounded-2xl p-8 hover:shadow-md transition bg-white">

                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {edu.school}
                    </h3>
                    <p className="text-black/50 mt-1">
                      {edu.location}
                    </p>
                  </div>

                  <div className="text-black/70 md:text-right">
                    <p className="font-medium">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {edu.highlights.map((item, i) => (
                    <span
                      key={`${edu.school}-highlight-${i}`}
                      className="text-sm px-3 py-1 rounded-md border border-black/10 bg-black/[0.03]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-4">
                      Relevant Coursework
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={`${edu.school}-course-${i}`}
                          className="text-sm px-3 py-1 rounded-md border border-black/10"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}