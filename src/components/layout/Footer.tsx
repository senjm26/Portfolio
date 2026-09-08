import { Linkedin, FileDown, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative text-off-white px-6 overflow-hidden">
      {/* Brushed aluminum background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />
      <div className="absolute inset-0 z-0 bg-charcoal/40" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          <p className="font-display text-lg tracking-tight text-center md:text-left justify-self-center md:justify-self-start">
            {siteConfig.monogram}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-xs tracking-[0.15em] uppercase text-off-white/80 justify-self-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 hover:text-sky transition"
            >
              <Mail size={14} />
              Email
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sky transition"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href={siteConfig.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sky transition"
            >
              <FileDown size={14} />
              Resume
            </a>
          </div>

          <p className="font-mono text-xs text-off-white/50 text-center md:text-right justify-self-center md:justify-self-end">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
