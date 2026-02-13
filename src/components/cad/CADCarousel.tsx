"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CADCard from "./CADCard";
import ArrowButton from "../ui/ArrowButton";
import ModelSelector from "./ModelSelector";
import DrawingPreview from "./DrawingPreview";


const slides = [
  {
    id: "about",
    title: "About My CAD Work",
    description: (
      <p>
        I focus on mechanical CAD, assemblies, and design-for-manufacturing with
        real-world constraints in mind.
      </p>
    ),
    content: null,
  },
  {
    id: "silent-float",
    title: "Silent Float Assembly",
    description: (
      <p>
        Assembly designed in Siemens NX with emphasis on manufacturability and
        clean interfaces.
      </p>
    ),
    content: (
      <ModelSelector
        name="Silent Float Assembly"
        path="/models/silent_float_assy.glb"
      />
    ),
  },
  {
    id: "cube-test",
    title: "Cube Test",
    description: (
      <p>
        Simple test geometry used to validate lighting and interaction.
      </p>
    ),
    content: (
      <ModelSelector
        name="Cube Test"
        path="/models/cube_test.glb"
      />
    ),
  },
];


export default function CADCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % slides.length);
  const prev = () =>
    setIndex((index - 1 + slides.length) % slides.length);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <ArrowButton direction="left" onClick={prev} />

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CADCard
            title={slides[index].title}
            description={slides[index].description}
          >
            {slides[index].content}
          </CADCard>
        </motion.div>
      </AnimatePresence>

      <ArrowButton direction="right" onClick={next} />
    </div>
  );
}
