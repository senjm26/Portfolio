"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DrawingPreview({
  file,
  title,
}: {
  file: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Preview Tile */}
      <div
        onClick={() => setOpen(true)}
        className="
        cursor-pointer
        w-full
        rounded-2xl
        border border-black/10
        bg-black/[0.03]
        p-6
        text-center
        transition
        hover:bg-black/[0.06]
        "
      >
        <h4 className="text-base md:text-lg font-medium">
          {title}
        </h4>
        <p className="text-sm text-black/60 mt-2">
          Click to expand drawing
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
            fixed inset-0
            bg-black/80 backdrop-blur-md
            flex items-center justify-center
            z-50 p-6
            "
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
              w-full max-w-6xl
              h-[90vh]
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-2xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={file}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}