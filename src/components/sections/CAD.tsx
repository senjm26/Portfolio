"use client";

import ModelSelector from "../cad/ModelSelector";

export default function CAD() {
  return (
    <section
      id="cad"
      style={{
        width: "100%",
        padding: "6rem 0",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        CAD Portfolio
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "600px", // 👈 KEY LINE
        }}
      >
        <ModelSelector />
      </div>
    </section>
  );
}
