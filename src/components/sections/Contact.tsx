"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Linkedin, FileDown } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import Eyebrow from "../ui/Eyebrow";

export default function Contact() {
  const [state, handleSubmit] = useForm("mqedbzop");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact"
      className="relative py-32 px-6 bg-cream text-ink"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-start">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Contact</Eyebrow>

          <h2 className="font-display mt-6 text-4xl md:text-5xl leading-tight mb-6 text-ink">
            Let&apos;s build something exceptional.
          </h2>

          <p className="text-ink/70 leading-relaxed mb-12 max-w-150">
            I am open to engineering opportunities, internships, and design
            projects.
          </p>

          <div className="space-y-3 text-ink/60 font-mono text-sm">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.email}</p>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <a
              href={siteConfig.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-ink/80 hover:text-sky transition"
            >
              <FileDown size={18} />
              Resume
            </a>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-ink/80 hover:text-sky transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {showSuccess ? (
            <div className="border border-ink/15 rounded-md p-10">
              <p className="text-xl font-medium mb-4">
                Message sent successfully.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="font-mono text-xs uppercase tracking-[0.15em] underline hover:text-sky transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full border-b border-ink/20 py-3 text-lg bg-transparent focus:outline-none focus:border-sky transition placeholder:text-ink/40"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full border-b border-ink/20 py-3 text-lg bg-transparent focus:outline-none focus:border-sky transition placeholder:text-ink/40"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full border-b border-ink/20 py-3 text-lg bg-transparent focus:outline-none focus:border-sky transition placeholder:text-ink/40"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full border-b border-ink/20 py-3 text-lg bg-transparent focus:outline-none focus:border-sky transition resize-none placeholder:text-ink/40"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="mt-6 px-8 py-3 border border-ink/25 rounded-sm font-mono text-xs tracking-[0.15em] uppercase hover:border-sky hover:text-sky transition"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
