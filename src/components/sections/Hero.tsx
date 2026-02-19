"use client";

import { motion } from "framer-motion";
import { Linkedin, FileDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      style={{
        color: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.55)",
          zIndex: 0,
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          padding: "0 40px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "clamp(72px, 6vw, 100px)",
            fontWeight: 600,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
          }}
        >
          Jay Sen
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            marginTop: "28px",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          <TypeAnimation
            sequence={[
              "Student...",
              2000,
              "",
              800,
              "Engineer...",
              2000,
              "",
              800,
              "Builder...",
              2000,
              "",
              800,
              "Creator...",
              2000,
              "",
              800,
            ]}
            speed={50}
            deletionSpeed={40}
            repeat={Infinity}
          />
        </motion.div>

        {/* Icons */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/resume.pdf"
            target="_blank"
            className="hover:opacity-70 transition"
          >
            <FileDown size={30} />
          </a>

          <a
            href="https://www.linkedin.com/in/jaymsen/"
            target="_blank"
            className="hover:opacity-70 transition"
          >
            <Linkedin size={30} />
          </a>
        </div>
      </div>

      {/* Fade to white */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, white 100%)",
          zIndex: 3,
        }}
      />
    </section>
  );
}
