"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
          ? "bg-black/70 border-b border-white/10 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div className="flex items-center gap-4 text-white">
          <div className="font-semibold tracking-[0.3em] text-base">
            JS
          </div>
          <div className="hidden md:block text-[10px] tracking-[4px] text-white/40 uppercase">
            ENGINEERING SYSTEMS
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-14 text-white/70 text-xs tracking-[0.25em] uppercase">
          <a href="#about" className="hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors duration-200">
            Portfolio
          </a>
          <a href="#experience" className="hover:text-white transition-colors duration-200">
            Experience
          </a>
          <a href="#education" className="hover:text-white transition-colors duration-200">
            Education
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-xs tracking-[0.25em] uppercase px-6 py-2 border border-white/20 hover:border-white hover:text-white transition-all duration-300"
        >
          Contact
        </a>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-6 text-white uppercase tracking-[0.2em] text-xs"
          >
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setOpen(false)}>Portfolio</a>
            <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
            <a href="#education" onClick={() => setOpen(false)}>Education</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}