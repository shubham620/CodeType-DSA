"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js";

gsap.registerPlugin(ScrollTrigger);

interface TimelineBlockProps {
    step: {
        title: string;
        description: string;
        codeSnippet: string;
    };
    index: number;
    isLeft: boolean;
}

export default function TimelineBlock({ step, index, isLeft }: TimelineBlockProps) {
    const blockRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLSpanElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ["start end", "center center"],
    });

    const tiltX = useTransform(scrollYProgress, [0, 1], isLeft ? [20, 0] : [-20, 0]);
    const tiltY = useTransform(scrollYProgress, [0, 1], [30, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

    useEffect(() => {
        let typed: Typed;

        const ctx = gsap.context(() => {
            // Dot animation
            gsap.fromTo(
                dotRef.current,
                { scale: 0 },
                {
                    scale: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: blockRef.current,
                        start: "top center+=100",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Typing simulation on scroll
            ScrollTrigger.create({
                trigger: blockRef.current,
                start: "top center",
                onEnter: () => {
                    if (codeRef.current && !typed) {
                        typed = new Typed(codeRef.current, {
                            strings: [step.codeSnippet],
                            typeSpeed: 30,
                            showCursor: false,
                        });
                    }
                },
            });
        }, blockRef);

        return () => {
            ctx.revert();
            if (typed) typed.destroy();
        };
    }, [step.codeSnippet]);

    return (
        <div ref={blockRef} className="relative w-full flex justify-center md:justify-between items-center group perspective-1000 pl-12 md:pl-0">

            {/* Central Animated Dot */}
            <div
                ref={dotRef}
                className="absolute left-[16px] md:left-1/2 w-4 h-4 bg-accent-cyan rounded-full -translate-x-1/2 md:translate-x-[-1px] shadow-[0_0_15px_#87F5FB] z-20"
            >
                <div className="absolute inset-[-4px] rounded-full border border-accent-cyan animate-ping opacity-70" />
            </div>

            <motion.div
                style={{
                    rotateX: tiltY,
                    rotateY: tiltX,
                    scale,
                    opacity,
                    transformPerspective: 1200,
                }}
                className={`w-full md:w-[45%] flex flex-col ${isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
            >
                <div
                    ref={cardRef}
                    className="glass-heavy rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                >
                    {/* Parallax inner background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-start gap-4">
                        <span className="text-4xl font-black text-white/5 font-heading absolute -top-4 -right-2 select-none pointer-events-none">
                            {(index + 1).toString().padStart(2, '0')}
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                            {step.title}
                        </h3>

                        <p className="text-neutral text-base sm:text-lg leading-relaxed mb-4">
                            {step.description}
                        </p>

                        <div className="w-full bg-[#1a0c14] rounded-xl p-4 border border-white/5 relative overflow-hidden">
                            {/* Fake window buttons */}
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-red/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan/80" />
                            </div>
                            <pre className="font-mono text-xs sm:text-sm text-accent-cyan/90 min-h-[4rem] whitespace-pre-wrap">
                                <span ref={codeRef} />
                            </pre>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
