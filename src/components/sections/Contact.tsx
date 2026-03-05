"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Linkedin, FileDown } from "lucide-react";
import { useState, useEffect } from "react";

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
      className="relative py-32 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-start">

        {/* LEFT SIDE */}
        <div>
          <p className="text-md tracking-[0.35em] uppercase text-black/80 mb-8">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Let’s build something exceptional.
          </h2>

          <p className="text-black/70 leading-relaxed mb-12 max-w-150">
            I am open to engineering opportunities, internships, 
            and design projects.
          </p>

          <div className="space-y-3 text-black/60 text-sm">
            <p>Pennsylvania, United States</p>
            <p>senjm26@gmail.com</p>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition"
            >
              <FileDown size={18} />
              Resume
            </a>

            <a
              href="https://www.linkedin.com/in/jaymsen/"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          {showSuccess ? (
            <div className="border border-black/20 rounded-2xl p-10">
              <p className="text-xl font-medium mb-4">
                Message sent successfully.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="text-sm underline hover:opacity-70 transition"
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
                    className="w-full border-b border-black/20 py-3 text-lg bg-transparent focus:outline-none focus:border-black transition"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full border-b border-black/20 py-3 text-lg bg-transparent focus:outline-none focus:border-black transition"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full border-b border-black/20 py-3 text-lg bg-transparent focus:outline-none focus:border-black transition"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full border-b border-black/20 py-3 text-lg bg-transparent focus:outline-none focus:border-black transition resize-none"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="mt-6 px-8 py-3 border border-black rounded-full text-sm tracking-wide hover:bg-black hover:text-white transition"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}