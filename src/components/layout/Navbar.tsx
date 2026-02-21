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
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-black/40 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-white font-medium tracking-wide text-lg">
          JS
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-white text-sm tracking-wide">
          <a href="#about" className="hover:opacity-70 transition">About</a>
          <a href="#portfolio" className="hover:opacity-70 transition">Portfolio</a>
          <a href="#experience" className="hover:opacity-70 transition">Experience</a>
          <a href="#education" className="hover:opacity-70 transition">Education</a>
          <a href="#contact" className="hover:opacity-70 transition">Contact</a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-sm px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
        >
          Let’s Connect
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
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
            className="md:hidden bg-black/90 backdrop-blur-md px-6 pb-6 flex flex-col gap-6 text-white"
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
