"use client";

import { Linkedin, FileDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { siteConfig } from "@/data/site";
import LaserCutText, { NAME_CUT_MS } from "../ui/LaserCutText";
import LaserCutButton from "../ui/LaserCutButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-off-white overflow-hidden">
      {/* Brushed aluminum background */}
      <div className="metal-plate absolute inset-0 z-0" style={{ filter: "brightness(0.62)" }} />

      {/* Vignette so the plate reads as a lit sheet on the cutting bed */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Name laser-cut through the plate */}
        <h1 className="sr-only">{siteConfig.name}</h1>
        <LaserCutText />

        {/* Visible from the first paint with the longest phrase server-rendered: the
            browser counts the largest text it has painted as the page's main content,
            and skips text painted at zero opacity, so a fade-in or a later, longer
            phrase would push that measurement out to whenever it got typed */}
        <div className="mt-6">
          <TypeAnimation
            sequence={[
              "Problem Solver...",
              2000,
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
              "Creator...",
              2000,
            ]}
            preRenderFirstString
            wrapper="span"
            speed={45}
            deletionSpeed={35}
            repeat={Infinity}
            cursor={true}
            className="laser-text font-mono font-semibold text-xl md:text-3xl tracking-wide"
          />
        </div>

        {/* Buttons cut by the same laser, right after the name */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <LaserCutButton href={siteConfig.resumeHref} icon={<FileDown size={16} />} delay={NAME_CUT_MS}>
            Resume
          </LaserCutButton>
          <LaserCutButton href={siteConfig.linkedinUrl} icon={<Linkedin size={16} />} delay={NAME_CUT_MS + 420}>
            LinkedIn
          </LaserCutButton>
        </div>
      </div>

      {/* Bottom fade into the light section below */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-cream z-20" />
    </section>
  );
}
