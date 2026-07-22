"use client";

import FloatingOrbs from "./FloatingOrbs";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <FloatingOrbs />
    </div>
  );
}
