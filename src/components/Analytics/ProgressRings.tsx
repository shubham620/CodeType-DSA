"use client";

import { motion } from "framer-motion";

interface ProgressRingsProps {
    label: string;
    value: number;
    max: number;
    color: "cyan" | "red";
    suffix?: string;
}

export default function ProgressRings({ label, value, max, color, suffix = "" }: ProgressRingsProps) {
    const percentage = (value / max) * 100;
    const dashOffset = 100 - percentage;

    const strokeColor = color === "cyan" ? "#87F5FB" : "#DE3C4B";
    const glowClass = color === "cyan" ? "drop-shadow-[0_0_12px_rgba(135,245,251,0.6)]" : "drop-shadow-[0_0_12px_rgba(222,60,75,0.6)]";

    return (
        <div className="glass-heavy p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center justify-center w-full h-full">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                {/* Background Track */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2.5"
                    />
                    <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                        strokeDasharray="100 100"
                        initial={{ strokeDashoffset: 100 }}
                        whileInView={{ strokeDashoffset: dashOffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className={glowClass}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Value Text */}
                <div className="flex items-baseline gap-1 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="text-3xl font-bold text-white font-mono"
                    >
                        {value}
                    </motion.span>
                    <span className="text-sm font-bold text-[#CEC3C1]">{suffix}</span>
                </div>
            </div>

            <h3 className="text-sm font-bold text-neutral uppercase tracking-widest text-center">{label}</h3>
        </div>
    );
}
