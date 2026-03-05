"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import CADCard from "./CADCard";
import ArrowButton from "../ui/ArrowButton";
import ModelSelector from "./ModelSelector";
import DrawingPreview from "./DrawingPreview";

/* -------------------- SLIDES -------------------- */

const slides = [
  {
    id: "about",
    title: "About My Engineering Work",
    description: (
      <>
        <p>
          I am experienced in Siemens NX and SolidWorks
          through academic coursework, Rensselaer Motorsport, and personal design projects.
        </p>
        <p>
          My focus lies in purposeful design, manufacturability, and
          validation through FEA.
        </p>
        <p>
          My current projects include the design and fabrication of a new pit cart for Rensselaer Motorsport and
          a fully modeled V12 engine recreation.
        </p>
      </>
    ),
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
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
      <>
      <p>
        This is a recreation of a toilet fill valve assembly in Siemens NX.
      </p>
      <p>
        The objective of this project is to demonstrate various modeling techniques, assembly creation, and part
        relationships.
      </p>
      </>
    ),
    content: (
  <div className="relative w-full flex items-center justify-center">

    <ModelSelector
      name="Silent Float Assembly"
      path="/models/silent_float_assy1.glb"
    />

  </div>
),
  },

  {
    id: "box",
    title: "Rensselaer Motorsport Check-In Box",
    description: (
      <>
      <p>
        This box is a custom enclosure made in SolidWorks for a ID check in system at Rensselaer Motorsport. 
      </p>
      <p>It  houses a breadboard, three LEDs, and ID reader.
        It is designed for easy storage and removal of components and quick iteration for design changes.
        </p>
      </>
    ),
    content: (
      <ModelSelector
        name="Box"
        path="/models/box_assy1.glb"
      />
    ),
  },

  {
    id: "truss-analysis",
    title: "Truss Structural Analysis",
    description: (
      <>
      <p>
        This study is a structural optimization project using SolidWorks Simulation.
      </p>
      <p>I increased this rear wing truss FOS by 1.4
        through geometry refinement and stress redistribution. This work aided aero development for Rensselaer
        Motorsport's '25-26 car.</p>
      </>
    ),
    content: "TRUSS_CONTENT",
  },

  {
    id: "machined-lightsaber",
    title: "Machining & Manufacturing",
    description: (
      <>
      <p>
        This is a machined replica of a lightsaber from Star Wars built in an engineering processes class. 
        The replica in the image was manually machined, but another was made in a CNC.
      </p>
      <p>
        This project has an emphasis on tolerances, surface finish, and mastery of various manufacturing techniques. 
      </p>
      </>
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
  const [drawingIndex, setDrawingIndex] = useState(0);

  const drawingImages = [
  "/drawings/silent_float_assy_dwg_p1.png",
  "/drawings/silent_float_assy_dwg_p2.png",
  "/drawings/silent_float_assy_dwg_p3.png",
  "/drawings/silent_float_assy_dwg_p4.png",
  "/drawings/silent_float_assy_dwg_p5.png",
  "/drawings/silent_float_assy_dwg_p6.png",
  "/drawings/silent_float_assy_dwg_p7.png",
  "/drawings/silent_float_assy_dwg_p8.png",
];

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

  /* ---------- Close Modal With ESC ---------- */

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setExpandedImage(null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
    <div className="relative w-full flex justify-center items-center pb-16">

      {/* Counter */}
      <div className="absolute -top-10 right-[7%] text-[11px] tracking-[0.35em] uppercase text-white/40">
        ({(index % baseLength) + 1} / {baseLength})
      </div>

      {/* Left Arrow 
      <div className="absolute left-3 md:left-[6%] top-[52%] md:top-1/2 md:-translate-y-1/2 z-20">
        <ArrowButton direction="left" onClick={() => goTo(index - 1)} />
      </div>*/}

      {/* Viewport */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1050px] overflow-hidden min-h-[650px] md:min-h-[650px] h-auto"
      >
        <motion.div
          drag={dragEnabled && !expandedImage ? "x" : false}
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
                className="translate-x-2 md:translate-x-0"
              >
                <motion.div
  animate={{
    scale: isActive ? 1 : 0.96,
    opacity: isActive ? 1 : 0.75,
  }}
  transition={{ duration: 0.3 }}
  style={{ width: "100%" }}
>
  <div className="relative">

    <CADCard
  title={slide.title}
  description={slide.description}
>
  {isActive && (
    <div
      className="relative"
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
      ) : slide.id === "silent-float" ? (
        <>
          {slide.content}

          <div
            className="
              absolute bottom-6 right-6
              bg-white
              border border-black/10
              rounded-xl
              px-4 py-2
              text-sm font-medium
              text-black
              cursor-pointer
              hover:bg-gray-100
              transition
              shadow-md
            "
            onClick={() => {
              setDrawingIndex(0);
              setExpandedImage(drawingImages[0]);
            }}
          >
            View Drawing
          </div>
        </>
      ) : (
        slide.content
      )}
    </div>
  )}
</CADCard>

{/* {isActive && slide.id === "silent-float" && (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-[8%] bottom-10 pointer-events-auto">
      <div
        className="
        bg-white/95
        border border-black/10
        rounded-xl
        px-4 py-2
        text-sm font-medium
        cursor-pointer
        hover:bg-white
        transition
        shadow-md
        "
        onClick={() => {
          setDrawingIndex(0);
          setExpandedImage(drawingImages[0]);
        }}
      >
        View Drawing
      </div>
    </div>
  </div>
)}
  */}

    {/* Arrows anchored to card */}
    {isActive && (
      <>
        <div className="absolute bottom-6 left-6 z-30">
          <ArrowButton
            direction="left"
            onClick={() => goTo(index - 1)}
          />
        </div>

        <div className="absolute bottom-6 right-6 z-30">
          <ArrowButton
            direction="right"
            onClick={() => goTo(index + 1)}
          />
        </div>
      </>
    )}

  </div>
</motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Right Arrow 
      <div className="absolute right-3 md:right-[6%] top-[52%] md:top-1/2 md:-translate-y-1/2 z-20">
        <ArrowButton direction="right" onClick={() => goTo(index + 1)} />
      </div>*/}

      {/* Modal */}
      {expandedImage && (
  <div
    className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
    onClick={() => setExpandedImage(null)}
  >
    <div
      className="relative w-full h-full flex items-center justify-center p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
  className="absolute top-6 right-6 text-white text-3xl"
  onClick={() => setExpandedImage(null)}
>
  ×
</button>
      <img
        src={expandedImage}
        alt="Drawing"
        className="max-w-full max-h-full rounded-xl"
      />

      {/* Left */}
      <button
        className="absolute left-6 text-white text-3xl"
        onClick={() => {
          const newIndex =
            (drawingIndex - 1 + drawingImages.length) %
            drawingImages.length;
          setDrawingIndex(newIndex);
          setExpandedImage(drawingImages[newIndex]);
        }}
      >
        ‹
      </button>

      {/* Right */}
      <button
        className="absolute right-6 text-white text-3xl"
        onClick={() => {
          const newIndex =
            (drawingIndex + 1) % drawingImages.length;
          setDrawingIndex(newIndex);
          setExpandedImage(drawingImages[newIndex]);
        }}
      >
        ›
      </button>
    </div>
  </div>
)}
    </div>
  );
}