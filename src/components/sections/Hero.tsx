"use client";

import { motion } from "framer-motion";
import { Linkedin, FileDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-off-white overflow-hidden">
      {/* Brushed aluminum background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)",
        }}
      />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(239,233,223,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(239,233,223,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(56px,8vw,120px)] tracking-tight leading-[0.95]"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8"
        >
          <TypeAnimation
            sequence={[
              "Student...",
              2000,
              "Engineer...",
              2000,
              "Designer...",
              2000,
              "Builder...",
              2000,
              "Machinist...",
              2000,
              "Problem Solver...",
              2000,
              "Creator...",
              2000,
            ]}
            wrapper="span"
            speed={45}
            deletionSpeed={35}
            repeat={Infinity}
            cursor={true}
            className="font-mono text-xl md:text-3xl tracking-wide text-off-white/80"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex justify-center gap-4 flex-wrap"
        >
          <a
            href={siteConfig.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-off-white/30 text-off-white font-mono text-xs tracking-[0.2em] uppercase rounded-md hover:bg-sky hover:border-sky hover:text-charcoal transition-all duration-300 flex items-center gap-3"
          >
            <FileDown size={16} />
            Resume
          </a>

          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-off-white/30 text-off-white font-mono text-xs tracking-[0.2em] uppercase rounded-md hover:bg-sky hover:border-sky hover:text-charcoal transition-all duration-300 flex items-center gap-3"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Bottom fade into the light section below */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-cream z-20" />
    </section>
  );
}
