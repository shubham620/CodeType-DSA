"use client";

import { motion } from "framer-motion";
import MagneticButton from "../Shared/MagneticButton";

export default function CTASection() {
    return (
        <section className="relative py-32 bg-primary overflow-hidden flex items-center justify-center min-h-[80vh]">
            {/* Animated Gradient Mesh Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(135,245,251,0.15)_0%,rgba(222,60,75,0.15)_40%,transparent_70%)] rounded-full blur-[60px]"
                />
            </div>

            {/* Floating Geometric Shape behind card */}
            <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 right-1/4 w-32 h-32 bg-secondary border border-accent-cyan/20 rounded-xl shadow-[0_0_40px_rgba(135,245,251,0.2)] opacity-60 backdrop-blur-3xl transform rotate-12 z-0"
            />
            <motion.div
                animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 left-1/4 w-24 h-24 rounded-full bg-accent-red/20 blur-xl z-0"
            />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="glass-heavy w-full max-w-4xl p-12 md:p-20 rounded-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden group"
                >
                    {/* Internal Glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <h2 className="text-5xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight">
                        Stop Typing. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-cyan">
                            Start Executing.
                        </span>
                    </h2>

                    <p className="text-neutral text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                        Join the elite developers who map logic to syntax seamlessly. Your next technical interview is waiting. Are you fast enough?
                    </p>

                    <MagneticButton className="shadow-[0_0_40px_rgba(222,60,75,0.4)] hover:shadow-[0_0_60px_rgba(135,245,251,0.6)] text-xl h-[70px]">
                        Start Your Journey
                    </MagneticButton>

                    <p className="mt-6 text-sm text-neutral/50 font-mono tracking-widest">
                        NO CREDIT CARD REQUIRED • FREE FOREVER
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
