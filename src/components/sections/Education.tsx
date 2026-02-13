export default function Education() {
  return (
    <section className="py-32 px-16 bg-white text-black border-t border-black/10">

      <h2 className="text-4xl mb-10">Education</h2>

      <div className="space-y-10 max-w-4xl">
        <div>
          <h3 className="text-xl">
            Rensselaer Polytechnic Institute — Troy, NY
          </h3>
          <p className="text-gray-400">
            B.S. Mechanical Engineering · GPA 3.62 · Rensselaer Medalist
          </p>
          <p className="mt-3 text-gray-500 text-sm">
            Calculus I–III, Differential Equations, Linear Algebra, Statics,
            Materials Science, Physics I, CAD, Engineering Processes,
            Applied Statistics
          </p>
        </div>

        <div>
          <h3 className="text-xl">
            Gateway High School — Louisville, KY
          </h3>
          <p className="text-gray-400">
            GPA 3.81 · Rank 5 / 289
          </p>
          <p className="mt-3 text-gray-500 text-sm">
            Distinguished Honor Roll · National Honor Society · AP Scholar
          </p>
        </div>
      </div>
    </section>
  );
}
