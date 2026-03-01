"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const REVIEWS = [
    {
        name: "Alex Johnson",
        role: "SDE at Google",
        text: "Decoupling syntax thinking from logic has completely changed how I code. My WPM on LeetCode went from 50 to 110.",
        avatar: "AJ"
    },
    {
        name: "Sarah Chen",
        role: "Frontend Lead",
        text: "The visual keyboard perfectly highlighted my poor finger placement for brackets. Truly a game-changer.",
        avatar: "SC"
    },
    {
        name: "Michael Torres",
        role: "CS Student",
        text: "Finally, I can type out my algorithmic thoughts without stumbling over C++ syntax. Aced my technical interviews!",
        avatar: "MT"
    },
    {
        name: "Emily Davis",
        role: "Senior Engineer",
        text: "The heatmap consistency matrix is incredibly addicting. It feels like you're actually training for a marathon.",
        avatar: "ED"
    },
    {
        name: "David Kim",
        role: "Fullstack Dev",
        text: "I didn't realize how much time I wasted fixing typos until I used CodeType-DSA. My accuracy is up to 99%.",
        avatar: "DK"
    },
];

// Duplicate for seamless infinite scrolling
const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS];

export default function TestimonialsMarquee() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="testimonials" className="relative py-32 bg-primary overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                    Loved by <span className="text-accent-cyan">Developers</span>
                </h2>
                <p className="text-neutral text-lg max-w-2xl mx-auto">
                    Join thousands of engineers who have transformed their coding workflow from bottlenecked to blazing fast.
                </p>
            </div>

            <div
                className="w-full relative flex items-center overflow-x-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

                <motion.div
                    animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                    className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
                >
                    {MARQUEE_ITEMS.map((review, i) => (
                        <div
                            key={i}
                            className="glass-heavy w-[350px] sm:w-[400px] h-[220px] shrink-0 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:border-accent-cyan/40 transition-colors duration-300 group hover:shadow-[0_0_30px_rgba(135,245,251,0.15)]"
                        >
                            <div className="flex gap-1 text-accent-cyan mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-neutral text-base italic mb-6 line-clamp-3">
                                &quot;{review.text}&quot;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center font-bold text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary transition-colors duration-300">
                                    {review.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-sm">{review.name}</span>
                                    <span className="text-xs text-neutral/70 font-mono">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
