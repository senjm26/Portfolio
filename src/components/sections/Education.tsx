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
          <p className="text-sm tracking-[0.2em] uppercase text-black/40">
            Education
          </p>
          <h2 className="mt-4 text-4xl font-bold">
            Academic Background
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-12">
          {education.map((edu, index) => (
            <div
              key={index}
              className="border border-black/10 rounded-2xl p-8 hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {edu.school}
                  </h3>
                  <p className="text-black/50 mt-1">
                    {edu.location}
                  </p>
                </div>

                <div className="text-black/70 md:text-right">
                  <p className="font-medium">{edu.degree}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap gap-3">
                {edu.highlights.map((item, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-md border border-black/10 bg-black/[0.03]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Coursework (Only if exists) */}
              {edu.coursework.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm uppercase tracking-wide text-black/40 mb-4">
                    Relevant Coursework
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {edu.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="text-sm px-3 py-1 rounded-md border border-black/10"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}