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
          Current projects include the design and fabrication of a new pit cart and
          a fully modeled V12 engine recreation as a systems study.
        </p>
      </>
    ),
    content: (
      <div className="flex gap-8 items-center justify-center">
        <img
          src="/images/nx.svg"
          alt="NX Logo"
          className="w-[160px] rounded-xl object-contain"
        />
        <img
          src="/images/solidworks.png"
          alt="SolidWorks Logo"
          className="w-[160px] object-contain rounded-xl"
        />
      </div>
    ),
  },

  {
    id: "silent-float",
    title: "Toilet Fill Valve",
    description: (
      <p>
        Recreation of a toilet fill valve assembly focused on part relationships
        and constraint-driven modeling.
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
    id: "box",
    title: "Rensselaer Motorsport Check-In Box",
    description: (
      <p>
        Custom enclosure housing a breadboard, three LEDs, and ID reader.
        Designed for accessibility and modular integration.
      </p>
    ),
    content: (
      <ModelSelector
        name="Box"
        path="/models/box_assy.glb"
      />
    ),
  },

  {
    id: "truss-analysis",
    title: "Truss Structural Analysis",
    description: (
      <p>
        Structural optimization increased rear wing truss FOS by 1.4
        through geometry refinement and stress redistribution.
      </p>
    ),
    content: "TRUSS_CONTENT",
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
        className="w-full max-w-[650px] rounded-xl object-contain"
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

  const [index, setIndex] = useState(baseLength);
  const [width, setWidth] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  /* ---------- Measure Width ---------- */

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setWidth(containerRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slideWidth = width * 0.86; // slightly tighter than before
  const sidePadding = (width - slideWidth) / 2;

  /* ---------- Fix Initial Alignment ---------- */

  useEffect(() => {
    if (slideWidth > 0) {
      x.set(-index * slideWidth);
    }
  }, [slideWidth]);

  /* ---------- Navigation ---------- */

  const goTo = (i: number) => {
    setIndex(i);
    x.set(-i * slideWidth);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = index;

    if (offset < -slideWidth / 5 || velocity < -500) {
      newIndex = index + 1;
    } else if (offset > slideWidth / 5 || velocity > 500) {
      newIndex = index - 1;
    }

    goTo(newIndex);
  };

  /* ---------- Infinite Snap ---------- */

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
    <div className="relative w-full flex justify-center pb-16">

      {/* Counter */}
      <div className="absolute -top-10 right-[7%] text-[11px] tracking-[0.35em] uppercase text-white/40">
        ({(index % baseLength) + 1} / {baseLength})
      </div>

      {/* Left Arrow */}
      <div className="absolute left-3 md:left-[6%] top-1/2 -translate-y-1/2 z-20">
        <ArrowButton direction="left" onClick={() => goTo(index - 1)} />
      </div>

      {/* Viewport */}
      <div
        ref={containerRef}
        className="w-full max-w-[1050px] overflow-hidden"
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
          transition={{ type: "spring", stiffness: 180, damping: 30 }}
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
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.3 }}
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
                          <div className="flex flex-col gap-5 items-center">
                            <img
                              src="/images/truss1.png"
                              alt="Truss Analysis 1"
                              className="cursor-zoom-in w-full max-w-[650px] rounded-xl"
                              onClick={() =>
                                setExpandedImage("/images/truss1.png")
                              }
                            />
                            <img
                              src="/images/truss1.1.png"
                              alt="Truss Analysis 2"
                              className="cursor-zoom-in w-full max-w-[650px] rounded-xl"
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
      <div className="absolute right-3 md:right-[6%] top-1/2 -translate-y-1/2 z-20">
        <ArrowButton direction="right" onClick={() => goTo(index + 1)} />
      </div>

      {/* Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-6"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className="max-w-full max-h-full rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}