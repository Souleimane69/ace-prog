"use client";

import CircuitCanvas from "@/components/CircuitCanvas";

export default function GlobalBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <CircuitCanvas />
    </div>
  );
}
