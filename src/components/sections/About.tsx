export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 bg-neutral-100 text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT — Image */}
<div className="flex justify-center md:justify-start">
  <div className="relative w-92 h-92">

    {/* Grid squares behind */}
    <div className="absolute -top-6 -left-6 w-full h-full -z-10 opacity-40">
      <div className="w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>

    {/* Outer metallic ring */}
    <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#e5e7eb,#f3f4f6,#d1d5db)] shadow-xl" />

    {/* Inner border ring */}
    <div className="absolute inset-2 rounded-full border border-black/10" />

    {/* Image */}
    <div className="absolute inset-4 rounded-full overflow-hidden shadow-lg">
      <img
        src="/images/portrait1.jpg"
        alt="Portrait"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>

        {/* RIGHT — Content */}
        <div className="max-w-xl">

          <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-8">
            About
          </p>

          <p className="text-lg leading-relaxed text-black/80">
            I am a mechanical engineering student focused on CAD design,
            finite element analysis, and manufacturing. I love the process of designing a purposeful, usable product,
            and I am especially interested in manufacturing it to become a real product.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-black/70">
            Outside of studies and professional work, I study the cello, workout at the gym, and expand my skillset. 
            Whether it is origami, photography, web design, content creation, or another skill, I strive to always learn more.
            
          </p>

        </div>
      </div>
    </section>
  );
}