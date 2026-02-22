export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-gradient-to-b from-black to-neutral-950 text-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Label */}
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Engineering & Leadership Journey
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-12">

          {/* Vertical Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 hidden md:block" />

          {/* Experience Card */}
          {[
            {
              title: "Rensselaer Motorsport (FSAE)",
              date: "August 2025 – Present · Troy, NY",
              bullets: [
                "Designing and building a new pit cart for competition",
                "Conducted FEA on rear wing truss improving FoS by 1.4",
                "Manufactured jigs, support tabs, and suspension components",
              ],
              tools:
                "SolidWorks · SolidWorks FEA · CNC Machining · Manufacturing",
            },
            {
              title: "Director of IT — Sen Engineering Solutions",
              date: "June 2024 – Present · Pittsburgh, PA",
              bullets: [
                "Built and deployed dynamic Next.js website modernizing brand identity",
                "Resolved hardware, software, and security system issues",
                "Participated in contract and planning discussions",
              ],
            },
            {
              title: "Dining Room Server — Juniper Communities",
              date: "Feb 2024 – Aug 2025 · Pittsburgh, PA",
              bullets: [
                "Delivered meals under strict medical requirements",
                "Maintained high-standard service environment",
                "Coordinated with nursing staff to support residents",
              ],
            },
          ].map((role, index) => (
            <div
              key={index}
              className="relative md:pl-12 bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 hover:border-white/30 transition-all duration-300"
            >
              {/* Dot */}
              <div className="hidden md:block absolute -left-[9px] top-10 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/40" />

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {role.title}
                </h3>
                <span className="text-sm text-white/50 whitespace-nowrap">
                  {role.date}
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-white/70 leading-relaxed">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-white/40">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {role.tools && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {role.tools.split(" · ").map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}