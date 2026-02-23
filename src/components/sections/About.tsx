export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 bg-neutral-100 text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT — Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">

            <div className="w-80 md:w-[400px] aspect-[3/4] overflow-hidden border border-black/20 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <img
                src="/images/"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Offset frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-black/10 -z-10" />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div>

          <p className="text-md tracking-[0.35em] uppercase text-black/80 mb-6">
            About
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-10">
            Engineering is both discipline and craft.
          </h2>

          <p className="text-lg leading-relaxed text-black/70">
            I am a mechanical engineering student specializing in CAD-driven
            design, finite element analysis, and manufacturing optimization.
            My approach blends analytical rigor with an appreciation for
            precision and execution.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-black/70">
            Beyond engineering, I study the cello and pursue creative and
            technical disciplines that demand patience and refinement.
            Whether designing mechanical systems or interpreting complex
            compositions, I value structure, iteration, and mastery.
          </p>

        </div>
      </div>
    </section>
  );
}