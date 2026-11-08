"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/data/site"
import LaserCutButton from "../ui/LaserCutButton"

const links = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#extracurriculars", label: "Extracurriculars" },
]

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

  // Once off the hero, the bar becomes a strip of the same brushed plate
  const solid = scrolled || open

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "metal-strip border-b border-black/70 shadow-[0_1px_0_rgba(255,255,255,0.08),0_6px_16px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      {/* Same container width and gutter as the page sections, so edges line up */}
      <div className="px-6">
      <div className="relative max-w-6xl mx-auto flex items-center py-4">

        {/* Left - Logo */}
        <a
          href="#"
          className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-off-white hover:text-accent-bright transition-colors duration-200"
        >
          {siteConfig.monogram}
        </a>

        {/* Center - Desktop Links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-9 text-off-white/75 font-mono text-xs tracking-[0.2em] uppercase">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-accent-bright transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right - CTA, cut into the plate like the hero buttons */}
        <div className="ml-auto hidden lg:block">
          <LaserCutButton href="#contact" size="sm">
            Contact
          </LaserCutButton>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden ml-auto text-off-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-black/60 px-6 py-6 flex flex-col gap-6 text-off-white font-mono uppercase tracking-[0.2em] text-xs"
          >
            {[...links, { href: "#contact", label: "Contact" }].map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-accent-bright">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
