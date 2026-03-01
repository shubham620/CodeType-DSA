"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
    feature: {
        title: string;
        description: string;
        icon: string;
        stats: string;
    };
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * i,
            duration: 0.8,
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    }),
};

export default function FeatureCard({ feature, index }: FeatureCardProps) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className="feature-card glass-heavy relative w-full lg:w-[400px] h-[350px] shrink-0 rounded-3xl p-8 flex flex-col border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group perspective-1000"
        >
            {/* Dynamic Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Animated Border Reveal on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-cyan/30 rounded-3xl transition-colors duration-500 pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-secondary/80 flex items-center justify-center text-3xl shadow-inner border border-white/5 mb-6 relative z-10">
                <span className="relative z-10">{feature.icon}</span>
                {/* Sub-icon glow on hover */}
                <div className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-white mb-3 cursor-default tracking-tight relative z-10">
                {feature.title}
            </h3>

            <p className="text-neutral text-base leading-relaxed mb-auto cursor-default relative z-10 group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 relative z-10 group-hover:border-accent-cyan/20 transition-colors duration-300">
                <span className="text-sm font-mono text-accent-cyan tracking-wider font-semibold">
                    {feature.stats}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-primary text-neutral transition-all duration-300 transform group-hover:translate-x-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}
