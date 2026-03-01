"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineBlock from "@/components/HowItWorks/TimelineBlock";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        title: "Select Language & Track",
        description: "Choose from Python, C++, Java, or JS. Pick a track like DSA, OOP, or Web Dev fundamentals to set your target.",
        codeSnippet: "const track = await ai.generate('DSA');",
    },
    {
        title: "AI Generates Custom Roadmap",
        description: "Our agent maps out 100+ micro-drills skipping what you know and isolating the syntax or concepts slowing you down.",
        codeSnippet: "// Computing optimal path...\nconsole.log('Ready');",
    },
    {
        title: "Practice with Visual Guide",
        description: "Type through exercises while the visual keyboard highlights optimal fingering for brackets, operators, and special chars.",
        codeSnippet: "function sum(a, b) {\n  return a + b;\n}",
    },
    {
        title: "Receive Real-Time Analytics",
        description: "Every keystroke is cataloged. Discover exactly which characters or algorithmic patterns cause the most delays.",
        codeSnippet: "metrics.wpm === 120;\nmetrics.accuracy === 99;",
    },
    {
        title: "Master Syntax & Speed",
        description: "With muscle memory decoupled from logical thinking, pass technical interviews effortlessly.",
        codeSnippet: "while (success) {\n  keepCoding();\n}",
    }
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Draw actual SVG line based on scroll
            gsap.fromTo(
                lineRef.current,
                { strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={containerRef} className="relative py-32 bg-secondary overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                        How It <span className="text-accent-red">Works</span>
                    </h2>
                    <p className="text-neutral text-lg max-w-2xl mx-auto">
                        A seamless five-step journey from slow typing to blazing fast algorithmic execution.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line SVG */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 overflow-hidden flex justify-center">
                        <svg className="h-full w-[4px]" preserveAspectRatio="none">
                            <line
                                x1="2" y1="0" x2="2" y2="100%"
                                stroke="rgba(206, 195, 193, 0.2)"
                                strokeWidth="2"
                            />
                            <path
                                ref={lineRef}
                                d="M 2 0 L 2 5000"
                                stroke="#87F5FB"
                                strokeWidth="4"
                                strokeDasharray="1000"
                                className="drop-shadow-[0_0_8px_rgba(135,245,251,0.8)]"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-16 md:gap-32">
                        {STEPS.map((step, i) => (
                            <TimelineBlock
                                key={i}
                                step={step}
                                index={i}
                                isLeft={i % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Gradient Blurs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-red/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
