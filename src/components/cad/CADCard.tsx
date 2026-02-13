"use client";

import { ReactNode } from "react";

export default function CADCard({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "white",
        color: "black",
        borderRadius: "18px",
        padding: "32px",
        width: "100%",
        maxWidth: "1200px",
        minHeight: "520px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      }}
    >
      <h3 style={{ marginBottom: "24px" }}>{title}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "32px",
        }}
        className="cad-card-grid"
      >
        {/* LEFT: Description */}
        <div style={{ fontSize: "1rem", lineHeight: 1.6 }}>
          {description}
        </div>

        {/* RIGHT: 3D Viewer */}
        <div
          style={{
            width: "100%",
            height: "380px",
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile support */}
      <style jsx>{`
        @media (max-width: 900px) {
          .cad-card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
