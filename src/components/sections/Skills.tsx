export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-12">
          Skills
        </p>

        <div className="grid md:grid-cols-3 gap-16">

          <div>
            <h3 className="text-xl font-semibold mb-4">Design & CAD</h3>
            <p className="text-black/70 leading-relaxed">
              Siemens NX, SolidWorks, SolidWorks FEA
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Manufacturing</h3>
            <p className="text-black/70 leading-relaxed">
              Mastercam, CNC Machining, Manual Machining,
              Product Development & Launch
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Technical & Tools</h3>
            <p className="text-black/70 leading-relaxed">
              Google Workspace, Microsoft Office,
              Systems Troubleshooting
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
