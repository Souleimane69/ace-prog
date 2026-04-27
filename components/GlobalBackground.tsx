"use client";

import ParticleCanvas from "@/components/ParticleCanvas";

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
      <ParticleCanvas />
    </div>
  );
}
