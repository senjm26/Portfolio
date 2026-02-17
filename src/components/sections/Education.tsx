export default function Education() {
  return (
    <section
      id="education"
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-10">
          Education
        </p>

        <div className="space-y-16">

          {/* RPI */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-semibold">
                Rensselaer Polytechnic Institute
              </h3>
              <p className="text-black/50 mt-2">
                B.S. Mechanical Engineering
              </p>
            </div>

            <div className="md:col-span-2 text-black/70 leading-relaxed">
              <p>
                GPA 3.62 · Rensselaer Medalist
              </p>
              <p className="mt-4 text-sm text-black/50">
                Calculus I–III, Differential Equations, Linear Algebra,
                Statics, Materials Science, Physics I, CAD,
                Engineering Processes, Applied Statistics
              </p>
            </div>
          </div>

          {/* High School */}
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold">
                Gateway High School
              </h3>
              <p className="text-black/50 mt-2">
                GPA 3.81 · Rank 5 / 289
              </p>
            </div>

            <div className="text-black/70 leading-relaxed">
              Distinguished Honor Roll · National Honor Society · AP Scholar
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
