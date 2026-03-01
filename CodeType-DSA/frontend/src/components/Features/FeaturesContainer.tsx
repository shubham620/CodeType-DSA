"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "@/components/Features/FeatureCard";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🗺️",
    title: "Automated Learning Paths",
    description: "Personalized syllabus mapping exactly what you need to learn. Skips the basics you already know and targets your weakest topics.",
    stats: "300+ Curated Problems",
  },
  {
    icon: "🧠",
    title: "AI-Powered Reports",
    description: "Get detailed insights on where your typing speed fails you versus where your algorithmic thinking slows you down.",
    stats: "Real-time AI Feedback",
  },
  {
    icon: "⌨️",
    title: "Visual Keyboard Guide",
    description: "Interactive visual keyboard highlights the optimal finger placement for special characters and brackets crucial for coding.",
    stats: "15% Less Typos",
  },
  {
    icon: "📊",
    title: "Comprehensive Analytics",
    description: "Track your WPM, accuracy, syntax errors, and topic mastery all in one beautifully visualized dashboard.",
    stats: "Track 20+ Metrics",
  },
  {
    icon: "🖥️",
    title: "Developer-First UI",
    description: "A gorgeous, distraction-free environment built to feel like your favorite IDE, complete with syntax highlighting.",
    stats: "Dark Mode Native",
  },
];

export default function FeaturesContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return; // Only horizontal scroll on desktop

    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative min-h-screen bg-primary overflow-hidden py-24 lg:py-0 flex flex-col justify-center"
    >
      <div className="container mx-auto px-6 lg:px-12 mb-12 lg:mb-20 shrink-0">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
          Built for <span className="text-accent-cyan">Developers</span>
        </h2>
        <p className="text-neutral text-lg max-w-2xl">
          Everything you need to master your coding fundamentals, from typing speed to algorithmic intuition.
        </p>
      </div>

      <div className="w-full relative lg:h-[450px]">
        <div
          ref={scrollWrapperRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 lg:px-12 w-full lg:w-max lg:absolute lg:top-0 lg:left-0"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} index={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
