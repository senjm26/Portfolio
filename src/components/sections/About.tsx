export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT — Image */}
        <div className="flex justify-center md:justify-start">

          <div className="relative">

            {/* Image */}
            <div className="w-80 md:w-[380px] aspect-[3/4] border border-black/10 rounded-full
aspect-square overflow-hidden shadow-xl">

              <img
                src="/images/"
                alt="Portrait"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Subtle offset frame */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-black/10 rounded-2xl -z-10" />

          </div>

        </div>

        {/* RIGHT — Content */}
        <div>

          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
            About
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
            “Intellectual growth should commence at birth and cease only at death.”
            <br />
            <span className="text-lg font-normal text-black/50">
              — Albert Einstein
            </span>
          </h2>

          <p className="text-lg leading-relaxed text-black/70">
            I am a mechanical engineering student focused on CAD-driven design,
            FEA analysis, and manufacturing optimization. I approach engineering
            as both a technical discipline and a craft.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-black/70">
            Outside of academics and professional work, I play the cello and
            pursue continuous skill expansion. I have studied the cello for over
            14 years and am currently working on the first movement of Dvořák’s
            Cello Concerto in B Minor. I also explore photography, origami,
            website development, stock trading, and content creation — always
            pushing intellectual and creative growth.
          </p>

        </div>
      </div>
    </section>
  );
}