"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background parallax and slow rotation
    const ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray(".floating-shape") as HTMLElement[];

      shapes.forEach((shape: HTMLElement, i: number) => {
        gsap.to(shape, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // Mouse Parallax effect
      window.addEventListener("mousemove", (e) => {
        const xOffset = (e.clientX / window.innerWidth) - 0.5;
        const yOffset = (e.clientY / window.innerHeight) - 0.5;

        shapes.forEach((shape: HTMLElement, i: number) => {
          const depth = (i + 1) * 20;
          gsap.to(shape, {
            x: xOffset * depth,
            y: yOffset * depth,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Shape 1: Deep Violet Orb */}
      <div className="floating-shape absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/80 rounded-full blur-3xl opacity-50 mix-blend-screen" />

      {/* Shape 2: Aqua Geometric outline */}
      <div className="floating-shape absolute top-1/2 right-1/4 w-40 h-40 border border-accent-cyan/10 rounded-2xl rotate-45 backdrop-blur-md bg-white/5 opacity-60 flex items-center justify-center shadow-[0_0_50px_rgba(135,245,251,0.1)]">
        <div className="w-1/2 h-1/2 border border-accent-cyan/20 rounded-lg rotate-12" />
      </div>

      {/* Shape 3: Raspberry Glow */}
      <div className="floating-shape absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent-red/20 rounded-full blur-[100px] opacity-40 mix-blend-screen" />

      {/* Shape 4: Grid Pattern Box */}
      <div className="floating-shape absolute top-1/3 right-1/3 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30 rounded-xl transform -skew-x-12 rotate-12" />
    </div>
  );
}
