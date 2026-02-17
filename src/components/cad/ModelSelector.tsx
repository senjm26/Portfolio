"use client";

import { useState } from "react";
import CADViewer from "./CADViewer";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  name: string;
  path: string;
  explodedPath?: string;
  drawingPath?: string;
}

export default function ModelSelector({
  name,
  path,
  explodedPath,
  drawingPath,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: "100%",
      }}
    >
      {/* 3D MODELS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: explodedPath ? "1fr 1fr" : "1fr",
          gap: "32px",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            
          </h3>
          <div style={{ height: "400px" }}>
            <CADViewer modelPath={path} />
          </div>
        </div>

        {explodedPath && (
          <div>
            <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Exploded View
            </h3>
            <div style={{ height: "400px" }}>
              <CADViewer modelPath={explodedPath} />
            </div>
          </div>
        )}
      </div>

      {/* DRAWING PREVIEW */}
      {drawingPath && (
        <>
          <div
            onClick={() => setOpen(true)}
            style={{
              cursor: "pointer",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              Manufacturing Drawing (GD&T)
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              Click to view full drawing
            </p>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  style={{
                    width: "90%",
                    height: "90%",
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={drawingPath}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
