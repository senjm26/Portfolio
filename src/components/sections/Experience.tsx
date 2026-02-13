export default function Experience() {
  return (
    <section className="py-32 px-16 bg-white text-black border-t border-black/10">

      <h2 className="text-4xl mb-10">Experience</h2>

      <div className="space-y-12 max-w-4xl">
        <div>
          <h3 className="text-xl">
            Director of IT — Sen Engineering Solutions
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Pittsburgh, PA · June 2024 – Present
          </p>
          <ul className="list-disc ml-6 text-gray-400 space-y-2">
            <li>Built and deployed a fully dynamic Next.js website to modernize brand identity</li>
            <li>Resolved hardware, software, and security system issues</li>
            <li>Participated in contract and planning discussions with manufacturers and clients</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl">
            Dining Room Server — Juniper Communities
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Pittsburgh, PA · Feb 2024 – Aug 2025
          </p>
          <ul className="list-disc ml-6 text-gray-400 space-y-2">
            <li>Delivered meals in accordance with dietary and medical requirements</li>
            <li>Maintained a respectful, compassionate environment for residents</li>
            <li>Coordinated with nursing staff to address resident needs</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
