"use client";

import { motion } from "framer-motion";
import { Linkedin, FileDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* Brushed Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
        }}
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* Name */}
        <div className="relative inline-block">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(70px,7vw,120px)] font-semibold tracking-tight"
          >
            Jay Sen
          </motion.h1>

          {/* Precision Corners */}
          <div className="absolute -left-8 -top-8 w-8 h-8 border-l-[1.5px] border-t-[1.5px] border-white/50" />
          <div className="absolute -right-8 -top-8 w-8 h-8 border-r-[1.5px] border-t-[1.5px] border-white/50" />
          <div className="absolute -left-8 -bottom-8 w-8 h-8 border-l-[1.5px] border-b-[1.5px] border-white/50" />
          <div className="absolute -right-8 -bottom-8 w-8 h-8 border-r-[1.5px] border-b-[1.5px] border-white/50" />
        </div>

        {/* Animated Identity */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  className="mt-10 sm:mt-20"
>
  <TypeAnimation
    sequence={[
      "Student...",
      2000,
      "Designer...",
      2000,
      "Builder...",
      2000,
      "Creator...",
      2000,
    ]}
    wrapper="span"
    speed={45}
    deletionSpeed={35}
    repeat={Infinity}
    cursor={true}
    className="block text-[clamp(18px,2vw,28px)] font-semibold tracking-tight text-white/80"
  />
</motion.div>

{/* Strong Static Statement */}
       {/* <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 0.85, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="mt-12 max-w-5xl mx-auto text-center"
>
  <p className="text-xl md:text-2xl font-light italic leading-relaxed">
    “Live as if you were to die tomorrow. Learn as if you were to live forever.”
  </p>

  <p className="mt-6 text-sm tracking-[0.2em] uppercase">
    - Albert Einstein -
  </p>
</motion.div> */}


        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-14 flex justify-center gap-6 flex-wrap"
        >
          <a
            href="/resume.pdf"
            className="px-8 py-3 border border-white/30 text-white tracking-wide text-sm uppercase rounded-md hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
          >
            <FileDown size={16} />
            Resume
          </a>

          <a
            href="https://www.linkedin.com/in/jaymsen/"
            target="_blank"
            className="px-8 py-3 border border-white/30 text-white tracking-wide text-sm uppercase rounded-md hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-neutral-100 z-20" />
    </section>
  );
}