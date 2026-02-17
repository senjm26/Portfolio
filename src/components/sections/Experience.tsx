export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-10">
          Experience
        </p>

        <div className="space-y-20">

          {/* FSAE */}
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                 <h3 className="text-2xl font-semibold">
                   Rensselaer Motorsport (FSAE)
                </h3>
               <span className="text-sm text-black/50">
                  August 2025 – Present · Troy, NY
               </span>
              </div>

                <ul className="mt-6 space-y-3 text-black/70 leading-relaxed">
                 <li>Redesigned cooling system to accommodate drivetrain changes</li>
                 <li>Performed FEA on rear wing truss improving structural factor of safety</li>
                 <li>Manufactured jigs and fabricated suspension components</li>
               </ul>

                   <p className="mt-6 text-sm text-black/50">
                     Tools: Siemens NX · FEA · CNC Machining · Manufacturing Processes
                  </p>
               </div>


          {/* Role 1 */}
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <h3 className="text-2xl font-semibold">
                Director of IT — Sen Engineering Solutions
              </h3>
              <span className="text-sm text-black/50">
                June 2024 – Present · Pittsburgh, PA
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-black/70 leading-relaxed">
              <li>Built and deployed a dynamic Next.js website modernizing brand identity</li>
              <li>Resolved hardware, software, and security system issues</li>
              <li>Participated in contract and manufacturer planning discussions</li>
            </ul>
          </div>

          {/* Role 2 */}
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <h3 className="text-2xl font-semibold">
                Dining Room Server — Juniper Communities
              </h3>
              <span className="text-sm text-black/50">
                Feb 2024 – Aug 2025 · Pittsburgh, PA
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-black/70 leading-relaxed">
              <li>Delivered meals according to medical and dietary requirements</li>
              <li>Maintained a respectful, high-standard service environment</li>
              <li>Coordinated with nursing staff to address resident needs</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
