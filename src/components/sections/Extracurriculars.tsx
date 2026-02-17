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
              Rensselaer Motorsport
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>Redesigned cooling system for drivetrain changes</li>
              <li>Performed FEA on rear wing truss, improving FoS by 2%</li>
              <li>Manufactured jigs and fabricated suspension components</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Eagle Scout
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>Planned and built a 10×3 ft trail bridge</li>
              <li>14+ years of performance experience</li>
              <li>Leadership roles & regional recognition</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Eagle Scout · Cello Performance
            </h3>
            <ul className="space-y-3 text-black/70">
              <li>Planned and built a 10×3 ft trail bridge</li>
              <li>14+ years of performance experience</li>
              <li>Leadership roles & regional recognition</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
