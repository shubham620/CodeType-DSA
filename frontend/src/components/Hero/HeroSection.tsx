"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingSimulation from "./TypingSimulation";
import FloatingShapes from "./FloatingShapes";
import MagneticButton from "../Shared/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end center"],
    });

    const bgGradientShift = useTransform(
        scrollYProgress,
        [0, 1],
        ["linear-gradient(135deg, #240115 0%, #2F131E 100%)", "linear-gradient(135deg, #0f0008 0%, #1c0911 100%)"]
    );

    useEffect(() => {
        // GSAP ScrollTrigger for pinning
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=50%",
                pin: true,
                pinSpacing: false,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headlineText = "Master Algorithms, Syntax, and Speed Simultaneously";
    const words = headlineText.split(" ");

    return (
        <motion.section
            ref={sectionRef}
            style={{ background: bgGradientShift }}
            className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden pt-20 px-6 sm:px-12 object-cover"
        >
            {/* Animated Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] animate-[grain_8s_steps(10)_infinite]" />

            <FloatingShapes />

            {/* Left: Typing Simulation */}
            <div className="w-full lg:w-[60%] z-10 hidden lg:flex items-center justify-center h-full p-12">
                <TypingSimulation />
            </div>

            {/* Right/Mobile: Headline and CTA */}
            <div className="w-full lg:w-[40%] z-20 flex flex-col items-start justify-center h-full sm:pt-0 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="inline-block px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(135,245,251,0.1)]">
                        <span className="text-sm font-semibold text-accent-cyan tracking-wider">
                            AI-DRIVEN TYPING PLATFORM
                        </span>
                    </div>

                    <h1 ref={headlineRef} className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-8 text-white">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="inline-block mr-3 lg:mr-4 drop-shadow-2xl"
                            >
                                {word === "Algorithms," || word === "Speed" ? (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-cyan pr-1">
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-lg sm:text-xl text-neutral font-medium max-w-lg leading-relaxed mb-12"
                    >
                        Enhance your coding speed and muscle memory with a curated roadmap of DSA problems, syntax drills, and real-time AI feedback.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
                    >
                        <MagneticButton>Start Practicing Free</MagneticButton>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile visible typing simulation */}
            <div className="w-full lg:hidden z-10 flex items-center justify-center mt-12 pb-24">
                <TypingSimulation />
            </div>

            {/* Dynamic grain keyframes */}
            <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(3%, 15%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
        </motion.section>
    );
}
