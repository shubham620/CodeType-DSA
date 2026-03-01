"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import KeyboardVisualization from "@/components/InteractiveDemo/KeyboardVisualization";
import TypingInterface from "@/components/InteractiveDemo/TypingInterface";

gsap.registerPlugin(ScrollTrigger);

export default function DemoWindow() {
    const containerRef = useRef<HTMLElement>(null);
    const browserRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "center center",
                end: "+=100%",
                pin: true,
                onEnter: () => {
                    // Auto-play hint after 2 seconds if user hasn't interacted
                    timeoutId = setTimeout(() => {
                        if (!isActive) {
                            const el = document.querySelector(".demo-hint-pulse");
                            if (el) gsap.to(el, { opacity: 1, yoyo: true, repeat: 3, duration: 0.5 });
                        }
                    }, 2000);
                }
            });
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timeoutId);
        };
    }, [isActive]);

    const handleComplete = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#87F5FB", "#DE3C4B", "#CEC3C1", "#ffffff"],
        });
    };

    return (
        <section
            id="demo"
            ref={containerRef}
            className="relative min-h-screen bg-primary flex flex-col items-center pt-24 pb-12 overflow-hidden perspective-2000"
        >
            <div className="container mx-auto px-4 lg:px-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-2 text-center">
                    Experience the <span className="text-accent-cyan">Flow</span>
                </h2>
                <p className="text-neutral text-lg text-center max-w-2xl mb-12">
                    Try a quick drill. Connect muscle memory with syntax.
                </p>

                <motion.div
                    ref={browserRef}
                    style={{ rotateX, rotateY, scale, opacity }}
                    className="w-full max-w-5xl glass-heavy rounded-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transform-style-3d"
                >
                    {/* Browser Chrome Header */}
                    <div className="h-12 bg-black/40 border-b border-white/10 flex items-center px-4 shrink-0 shadow-sm relative z-20">
                        <div className="flex gap-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-accent-red/90" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                            <div className="w-3 h-3 rounded-full bg-green-500/90" />
                        </div>
                        <div className="flex-1 max-w-xl mx-auto h-7 bg-black/50 rounded-md border border-white/5 flex items-center justify-center px-4 font-mono text-xs text-neutral/70">
                            <svg className="w-3 h-3 mr-2 text-neutral/50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            localhost:3000/demo
                        </div>
                    </div>

                    <div
                        className="w-full bg-[#11050c]/80 flex-1 relative flex flex-col pt-6 pb-2"
                        onClick={() => setIsActive(true)}
                    >
                        {/* Typing Component */}
                        <TypingInterface
                            isActive={isActive}
                            onComplete={handleComplete}
                        />

                        {/* Hint Overlay (fades out when active) */}
                        {!isActive && (
                            <div className="demo-hint-pulse absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-30">
                                <div className="glass px-6 py-3 rounded-full text-white font-medium shadow-2xl border border-accent-cyan/30 text-glow-cyan animate-pulse">
                                    Click to start typing
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="w-full max-w-4xl mt-8">
                    <KeyboardVisualization />
                </div>
            </div>

            {/* Dynamic Background Glow lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
