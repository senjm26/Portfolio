"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-6 py-4">

        {/* Logo */}
        <div className="text-white font-medium tracking-wide text-lg justify-self-start">
          Name
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10 text-white text-sm tracking-wide justify-self-center">
          <a href="#about" className="hover:opacity-70 transition">About</a>
          <a href="#portfolio" className="hover:opacity-70 transition">Portfolio</a>
          <a href="#experience" className="hover:opacity-70 transition">Experience</a>
          <a href="#education" className="hover:opacity-70 transition">Education</a>
          <a href="#contact" className="hover:opacity-70 transition">Contact</a>
        </div>

        {/* CTA */}
        <div className="justify-self-end">
  <a
  href="#contact"
  className="hidden md:block text-sm px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
>
  Let’s Connect
</a>

</div>
      </div>
    </motion.nav>
  )
}
