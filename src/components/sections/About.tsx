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
            "Intellectual growth should commence at birth and cease only at death."
            <br />
            -Albert Einstein
          </h2>
        </div>

        {/* Right Column — Narrative */}
        <div>
          <p className="text-lg leading-relaxed text-black/70">
            I am a mechanical engineering student with a focus on design using CAD and FEA and a passion for manufacturing.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-black/70">
            Outside of academics and professional work, I play the cello and love learning new skills. I have been 
            playing the cello for 14+ years, and I still love it to this day. I am currently working on learning the 
            1st movement of Dvorak Cello Concerto in B Minor. Additionally, I love learning and experimenting with new
            skills. I have dabbled into origami, photography, and website creation, and I am now learning stock trading
            and content creation.  
          </p>
        </div>
      </div>
    </section>
  );
}
