export default function About() {
  return (
    <section
      id="about"
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        
        {/* Left Column — Section Title */}
        <div>
          <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
            About
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Designing with intent.
            <br />
            Engineering with clarity.
          </h2>
        </div>

        {/* Right Column — Narrative */}
        <div>
          <p className="text-lg leading-relaxed text-black/70">
            Replace this with your raw narrative. Focus on how you approach
            design, what problems you enjoy solving, and what separates your
            thinking from standard execution.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-black/70">
            Add a second paragraph that speaks to long-term vision,
            technical depth, or the environments you thrive in.
          </p>
        </div>
      </div>
    </section>
  );
}
