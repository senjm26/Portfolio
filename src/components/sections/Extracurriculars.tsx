export default function Extracurriculars() {
  return (
    <section className="py-32 px-16 bg-white text-black border-t border-black/10">

      <h2 className="text-4xl mb-10">Extracurriculars</h2>

      <div className="space-y-10 max-w-4xl text-gray-400">
        <div>
          <h3 className="text-xl text-white">Rensselaer Motorsport</h3>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Redesigning cooling system for drivetrain changes</li>
            <li>Performed FEA on rear wing truss, improving FoS by 2%</li>
            <li>Manufactured jigs and fabricated suspension components</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-white">Eagle Scout — Scouting America</h3>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Planned and built a 10×3 ft trail bridge</li>
            <li>Senior Patrol Leader and Patrol Leader</li>
            <li>50+ hours of community service</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-white">Cello Performance</h3>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>14+ years of private and ensemble performance</li>
            <li>PMEA Region 1 finalist</li>
            <li>Pittsburgh Symphony Orchestra side-by-side alternate</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
