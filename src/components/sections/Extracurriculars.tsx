export default function Extracurriculars() {
  const activities = [
    {
      title: "Eagle Scout",
      items: [
        "Eagle Project: Designed and built a 10×3 ft trail bridge",
        "Senior Patrol Leader (Feb 2023 – Jun 2025)",
        "Patrol Leader (Feb 2022 – Feb 2023)",
        "12+ years of Scouting",
        "6 High Adventure Trips",
        "34 Merit Badges Earned",
      ],
    },
    {
      title: "Cello Performance",
      items: [
        "14+ years of performance experience",
        "PMEA Region 1 Finalist (2019)",
        "Pittsburgh Symphony Orchestra Side-by-Side Alternate Cellist",
        "Principal Cellist — Gateway HS Orchestra (Disney Springs Performance)",
      ],
    },
    {
      title: "Hobbies & Interests",
      items: [
        "Engineering research: fighter jets & racecars",
        "Top 1% in Clash Royale",
        "Photography",
      ],
    },
  ];

  return (
    <section
      id="extracurriculars"
      className="relative py-32 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-sm tracking-[0.2em] uppercase text-black/40">
            Beyond Engineering
          </p>
          <h2 className="mt-4 text-4xl font-bold">
            Leadership & Interests
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border border-black/10 rounded-2xl p-8 hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold mb-6">
                {activity.title}
              </h3>

              <ul className="space-y-4 list-none pl-0">
                {activity.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/70">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}