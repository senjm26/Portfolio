"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Linkedin, FileDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const [state, handleSubmit] = useForm("mqedbzop");
  const [showSuccess, setShowSuccess] = useState(false);

  // Show temporary success state
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
      className="relative py-40 px-6 bg-white text-black border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* Left Column */}
        <div>
          <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Let’s build something intentional.
          </h2>

          <p className="text-black/70 leading-relaxed mb-10">
            I’m open to engineering opportunities, internships,
            and design focused projects.
          </p>

          <div className="space-y-4 text-black/70">
            <p>Pennsylvania, United States</p>
            <p>email</p>
          </div>

          <div className="mt-10 flex gap-6">
            <a
              href="/resume.pdf"
              target="_blank"
              className="hover:opacity-70 transition"
            >
              <FileDown size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/jaymsen/"
              target="_blank"
              className="hover:opacity-70 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        {/* Right Column — Form or Success */}
        <div>
          {showSuccess ? (
            <div className="border border-black/20 p-8 rounded-xl">
              <p className="text-lg mb-4">
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
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full border-b border-black/20 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full border-b border-black/20 py-3 focus:outline-none focus:border-black transition"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full border-b border-black/20 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full border-b border-black/20 py-3 focus:outline-none focus:border-black transition resize-none"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition"
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
