"use client";

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="orb-drift absolute rounded-full blur-3xl"
        style={{
          width: 420,
          height: 420,
          left: "8%",
          top: "18%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          animationDuration: "22s",
        }}
      />
      <div
        className="orb-drift absolute rounded-full blur-3xl"
        style={{
          width: 320,
          height: 320,
          left: "68%",
          top: "8%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
          animationDuration: "26s",
          animationDelay: "-6s",
        }}
      />
      <div
        className="orb-drift absolute rounded-full blur-3xl"
        style={{
          width: 460,
          height: 460,
          left: "42%",
          top: "55%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          animationDuration: "30s",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
