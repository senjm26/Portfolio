export default function Extracurriculars() {
  return (
    <section
      id="extracurriculars"
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-12">
          Beyond Engineering
        </p>

        <div className="grid md:grid-cols-3 gap-16">

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Eagle Scout
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>· Eagle Project: Planned and built a 10×3 ft trail bridge</li>
              <li>· Leadership: Senior Patrol Leader (Feb 2023 - Jun 2025), Patrol Leader (Feb 2022 - Feb 2023)</li>
              <li>· 12+ years of Scouting experience, 6 High Adventure Excursions, 34 Merit Badges earned</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Cello Performance
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>· 14+ years of performance experience</li>
              <li>· Pennsylvania Music Educators Association Region 1 finalist (2019)</li>
              <li>· Pittsburgh Symphony Orchestra Side-by-Side alternate cellist</li>
              <li>· Principal Cellist for Gateway High School Orchestra Performance at Disney Springs, Lake Buena Vista, FL</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Hobbies
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>· Researching the engineering behind fighter jets and racecars</li>
              <li>· Top 1% in Clash Royale</li>
              <li>· Photography</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
