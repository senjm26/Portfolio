"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import CADCard from "./CADCard";
import ArrowButton from "../ui/ArrowButton";
import ModelSelector from "./ModelSelector";

const slides = [
  {
    id: "about",
    title: "About My Engineering Work",
    description: (
    <>
      <p>
        I am experienced using Siemens NX and SolidWorks through coursework,
        Rensselaer Motorsport, and personal projects with a passion for making
        a design a manufacturable reality.
      </p>

      <p style={{ marginTop: "12px" }}>
        I am currently working on designing and building a new pit cart for Rensselaer Motorsport
        and recreating a v12 engine as a personal project.
      </p>
    </>
  ),
    content: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <img
        src="/images/nx.svg"
        alt="NX Logo"
        style={{
          width: "100%",
          maxWidth: "250px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      />

      <img
        src="/images/solidworks.png"
        alt="SolidWorks Logo"
        style={{
          width: "100%",
          maxWidth: "250px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      />
    </div>
  ),
  },
  {
    id: "silent-float",
    title: "Toilet Fill Valve",
    description: (
      <p>
        This assembly is a recreation of a toilet fill valve that I made in my CAD class.
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
        This project is a simple box that I made for a new attendance system at Rensselaer Motorsport.
        The box is a custom design that houses a breadbord with 3 LEDs and a id reader.
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
      I did this study in Rensselaer Motorsport to improve the Factor of Safety for the rear wing truss.
      I slightly changed the geometry of the trusses and increased the Factor of Safety by 1.4.
    </p>
  ),
  content: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <img
        src="/images/truss1.png"
        alt="Truss Analysis 1"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      />

      <img
        src="/images/truss1.1.png"
        alt="Truss Analysis 2"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      />
    </div>
  ),
},

];

export default function CADCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setWidth(containerRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const totalSlides = slides.length;

  const slideWidth = width * 0.85; // 👈 KEY: smaller than container
  const sidePadding = (width - slideWidth) / 2;

  const clampIndex = (i: number) =>
    Math.max(0, Math.min(i, totalSlides - 1));

  const goTo = (i: number) => {
    const newIndex = clampIndex(i);
    setIndex(newIndex);
    x.set(-newIndex * slideWidth);
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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "10%",
          fontSize: "14px",
          opacity: 0.6,
        }}
      >
        ({index + 1} / {totalSlides})
      </div>

      {/* Left Arrow */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <ArrowButton direction="left" onClick={() => goTo(index - 1)} />
      </div>

      {/* Viewport */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "1100px",
          overflow: "hidden",
        }}
      >
        <motion.div
          drag={dragEnabled ? "x" : false}
          dragConstraints={{
            left: -slideWidth * (totalSlides - 1),
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
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              style={{
                minWidth: `${slideWidth}px`,
                paddingLeft: i === 0 ? `${sidePadding}px` : 0,
                paddingRight:
                  i === totalSlides - 1 ? `${sidePadding}px` : 0,
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <motion.div
                animate={{
                  scale: i === index ? 1 : 0.9,
                  opacity: i === index ? 1 : 0.45,
                }}
                transition={{ duration: 0.35 }}
                style={{ width: "100%" }}
              >
                <CADCard
                  title={slide.title}
                  description={slide.description}
                >
                  {/* DISABLE CAROUSEL DRAG WHEN INTERACTING WITH 3D */}
                  <div
                    onPointerEnter={() => setDragEnabled(false)}
                    onPointerLeave={() => setDragEnabled(true)}
                  >
                    {slide.content}
                  </div>
                </CADCard>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Arrow */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <ArrowButton direction="right" onClick={() => goTo(index + 1)} />
      </div>
    </div>
  );
}
