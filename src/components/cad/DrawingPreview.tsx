"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DrawingPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Preview Card */}
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

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
              transition={{ duration: 0.2 }}
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
                src="/drawings/silent_float_assy_dwg.pdf"
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
  );
}
