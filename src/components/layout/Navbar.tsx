"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/data/site"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/80 border-b border-off-white/10 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto flex items-center px-8 py-5">

        {/* Left - Logo */}
        <div className="text-off-white font-mono text-sm tracking-[0.2em]">
          {siteConfig.monogram}
        </div>

        {/* Center - Desktop Links */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-off-white/70 font-mono text-xs tracking-[0.2em] uppercase">
          <a href="#about" className="hover:text-sky transition-colors duration-200">
            About
          </a>
          <a href="#portfolio" className="hover:text-sky transition-colors duration-200">
            Portfolio
          </a>
          <a href="#experience" className="hover:text-sky transition-colors duration-200">
            Experience
          </a>
          <a href="#education" className="hover:text-sky transition-colors duration-200">
            Education
          </a>
          <a href="#extracurriculars" className="hover:text-sky transition-colors duration-200">
            Extracurriculars
          </a>
        </div>

        {/* Right - CTA */}
        <div className="ml-auto hidden md:block">
          <a
            href="#contact"
            className="font-mono text-xs tracking-[0.25em] uppercase px-6 py-2 border border-off-white/20 text-off-white hover:border-sky hover:text-sky transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto text-off-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-off-white/10 px-6 py-6 flex flex-col gap-6 text-off-white font-mono uppercase tracking-[0.2em] text-xs"
          >
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setOpen(false)}>Portfolio</a>
            <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
            <a href="#education" onClick={() => setOpen(false)}>Education</a>
            <a href="#extracurriculars" onClick={() => setOpen(false)}>Extracurriculars</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
