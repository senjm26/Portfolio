"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import CADCard from "./CADCard";
import ArrowButton from "../ui/ArrowButton";
import ModelSelector from "./ModelSelector";

/* -------------------- SLIDES -------------------- */

const slides = [
  {
    id: "about",
    title: "About My Engineering Work",
    description: (
      <>
        <p>
          I develop parametric mechanical systems using Siemens NX and SolidWorks
          through academic coursework, Rensselaer Motorsport, and independent design studies.
        </p>

        <p>
          My focus lies in assembly design, tolerance considerations, and structural
          validation through FEA-driven iteration.
        </p>

        <p>
          Current projects include the design and fabrication of a new pit cart for
          Rensselaer Motorsport and a fully modeled V12 engine recreation as a
          personal systems study.
        </p>
      </>
    ),
    content: (
      <div className="flex flex-col gap-6 items-center">
        <img
          src="/images/nx.svg"
          alt="NX Logo"
          className="w-full max-w-[250px] rounded-xl shadow-lg"
        />
        <img
          src="/images/solidworks.png"
          alt="SolidWorks Logo"
          className="w-full max-w-[250px] rounded-xl shadow-lg"
        />
      </div>
    ),
  },

  {
    id: "silent-float",
    title: "Toilet Fill Valve",
    description: (
      <p>
        This assembly is a recreation of a toilet fill valve created in CAD coursework,
        focusing on part relationships and assembly constraints.
      </p>
    ),
    content: (
      <ModelSelector
        name="Silent Float Assembly"
        path="/models/silent_float_assy1.glb"
      />
    ),
  },

  {
    id: "cube-test",
    title: "Rensselaer Motorsport Check In Box",
    description: (
      <p>
        Custom enclosure housing a breadboard with three LEDs and an ID reader.
        Designed for functionality, accessibility, and modular integration.
      </p>
    ),
    content: (
      <ModelSelector
        name="Cube Test"
        path="/models/box_assy.glb"
      />
    ),
  },

  {
    id: "truss-analysis",
    title: "Truss Structural Analysis",
    description: (
      <p>
        Conducted structural optimization to increase rear wing truss Factor of
        Safety by 1.4 through geometry refinement and stress distribution analysis.
      </p>
    ),
    content: "TRUSS_CONTENT", // handled dynamically below
  },

  {
    id: "machined-lightsaber",
    title: "Machining",
    description: (
      <p>
        Precision-machined replica built with attention to tolerances,
        surface finish, and dimensional control.
      </p>
    ),
    content: (
      <img
        src="/images/lightsaber.jpg"
        alt="Lightsaber"
        className="w-full max-w-[800px] rounded-xl shadow-lg"
      />
    ),
  },
];

/* -------------------- CAROUSEL -------------------- */

export default function CADCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const baseLength = slides.length;
  const extendedSlides = [...slides, ...slides, ...slides];

  const [index, setIndex] = useState(baseLength); // start in middle
  const [width, setWidth] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setWidth(containerRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slideWidth = width * 0.9;
  const sidePadding = (width - slideWidth) / 2;

  const goTo = (i: number) => {
    setIndex(i);
    x.set(-i * slideWidth);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = index;

    if (offset < -slideWidth / 4 || velocity < -500) {
      newIndex = index + 1;
    } else if (offset > slideWidth / 4 || velocity > 500) {
      newIndex = index - 1;
    }

    goTo(newIndex);
  };

  /* ---------- Infinite Snap Logic ---------- */

  useEffect(() => {
    if (!slideWidth) return;

    const min = baseLength;
    const max = baseLength * 2;

    if (index < min) {
      const newIndex = index + baseLength;
      setTimeout(() => {
        setIndex(newIndex);
        x.set(-newIndex * slideWidth);
      }, 0);
    }

    if (index >= max) {
      const newIndex = index - baseLength;
      setTimeout(() => {
        setIndex(newIndex);
        x.set(-newIndex * slideWidth);
      }, 0);
    }
  }, [index, slideWidth]);

  return (
    <div className="relative w-full flex justify-center pb-24">

      {/* Counter */}
      <div className="absolute -top-12 right-[8%] text-xs tracking-[0.3em] uppercase text-white/40">
        ({(index % baseLength) + 1} / {baseLength})
      </div>

      {/* Left Arrow */}
      <div className="absolute left-2 md:left-[5%] top-1/2 -translate-y-1/2 z-20">
        <ArrowButton direction="left" onClick={() => goTo(index - 1)} />
      </div>

      {/* Viewport */}
      <div
        ref={containerRef}
        className="w-full max-w-[1100px] overflow-hidden"
      >
        <motion.div
          drag={dragEnabled ? "x" : false}
          dragConstraints={{
            left: -slideWidth * (extendedSlides.length - 1),
            right: 0,
          }}
          style={{
            display: "flex",
            x,
            cursor: dragEnabled ? "grab" : "default",
          }}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {extendedSlides.map((slide, i) => {
            const isActive = i === index;

            return (
              <div
                key={i}
                style={{
                  minWidth: `${slideWidth}px`,
                  paddingLeft: i === 0 ? `${sidePadding}px` : 0,
                  paddingRight:
                    i === extendedSlides.length - 1 ? `${sidePadding}px` : 0,
                  display: "flex",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{ width: "100%" }}
                >
                  <CADCard
                    title={slide.title}
                    description={slide.description}
                  >
                    {isActive && (
                      <div
                        onPointerEnter={() => setDragEnabled(false)}
                        onPointerLeave={() => setDragEnabled(true)}
                      >
                        {slide.id === "truss-analysis" ? (
                          <div className="flex flex-col gap-6 items-center">
                            <img
                              src="/images/truss1.png"
                              alt="Truss Analysis 1"
                              className="cursor-zoom-in w-full max-w-[800px] rounded-xl shadow-lg"
                              onClick={() =>
                                setExpandedImage("/images/truss1.png")
                              }
                            />
                            <img
                              src="/images/truss1.1.png"
                              alt="Truss Analysis 2"
                              className="cursor-zoom-in w-full max-w-[800px] rounded-xl shadow-lg"
                              onClick={() =>
                                setExpandedImage("/images/truss1.1.png")
                              }
                            />
                          </div>
                        ) : (
                          slide.content
                        )}
                      </div>
                    )}
                  </CADCard>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-2 md:right-[5%] top-1/2 -translate-y-1/2 z-20">
        <ArrowButton direction="right" onClick={() => goTo(index + 1)} />
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-8"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}