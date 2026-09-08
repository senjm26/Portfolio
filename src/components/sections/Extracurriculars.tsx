"use client";

import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

export default function Extracurriculars() {
  const activities = [
    {
      title: "Cello Performance",
      items: [
        "Rana's Music Studio — 14+ years of private and group lessons and performances",
        "Rensselaer Orchestra member; Lead Cello Ensemblist",
        "Performed in local nursing homes, malls, and seasonal recitals",
        "PMEA Region 1 Finalist (2019)",
        "Pittsburgh Symphony Orchestra Side-by-Side Alternate Cellist",
        "Principal Cellist — Gateway High School Orchestra performance at Disney Springs, Lake Buena Vista, FL",
      ],
    },
    {
      title: "Eagle Scout",
      items: [
        "12+ years of Scouting experience; 34 Merit Badges earned",
        "Eagle Project: designed and built a 10×3 ft trail bridge in Boyce Park, Monroeville, PA, used by hikers, mountain bikers, and horse riders",
        "Senior Patrol Leader (Feb 2023 – Jun 2025), Patrol Leader (Feb 2022 – Feb 2023) — led Troop 220 to 3rd place in the 2025 Klondike for Lackawanna District",
        "Eagle Scout project featured in Allegheny County Parks Foundation's June 2025 newsletter",
      ],
    },
    {
      title: "Volunteering",
      items: [
        "50+ hours of community service with Boy Scouts of America — cleanups in Monroeville and Pitcairn, PA; trail maintenance in Boyce Park; campsite work at Laurel Highlands",
        "National Honor Society (Gateway Senior High School) — packed 170+ food bags weekly and distributed food monthly to 600+ families",
        "Interact Club — Holiday Brunch at Forbes Hospital, Monroeville Park Cleanup, and Rotary Club events",
      ],
    },
    {
      title: "Hobbies & Interests",
      items: [
        "Engineering research: combustion engines and aspirations, racecar aero package design, and rocket engines ",
        "Photography",
        "Website Design",
      ],
    },
  ];

  return (
    <section id="extracurriculars" className="relative py-32 px-6 bg-cream-raised text-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Beyond Engineering</Eyebrow>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border border-ink/10 rounded-md p-8 hover:border-sky/50 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 bg-cream"
            >
              <h3 className="font-display text-xl mb-6 text-ink">
                {activity.title}
              </h3>

              <ul className="space-y-4 list-none pl-0">
                {activity.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/70">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
