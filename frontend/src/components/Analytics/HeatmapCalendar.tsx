"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateData = () => {
    const data = [];
    for (let i = 0; i < 90; i++) { // 3 months
        data.push(Math.floor(Math.random() * 5)); // 0 to 4 intensity
    }
    return data;
};

export default function HeatmapCalendar() {
    const [data, setData] = useState<number[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        setData(generateData());
    }, []);

    const getIntensityColor = (intensity: number) => {
        switch (intensity) {
            case 0: return "bg-white/5";
            case 1: return "bg-accent-cyan/20";
            case 2: return "bg-accent-cyan/40";
            case 3: return "bg-accent-cyan/60";
            case 4: return "bg-[#87F5FB] box-glow-cyan";
            default: return "bg-white/5";
        }
    };

    return (
        <div className="glass-heavy p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col w-full h-full relative cursor-default">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white font-heading">Consistency Matrix</h3>
                <span className="text-sm text-neutral/70 font-mono tracking-wide">Last 90 Days</span>
            </div>

            <div className="flex-1 flex flex-col justify-end relative">
                <div className="flex flex-wrap gap-1.5 justify-start content-start max-h-[140px] overflow-hidden">
                    {data.map((intensity, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.01, type: "spring", stiffness: 200, damping: 20 }}
                            className={`w-4 h-4 rounded-sm ${getIntensityColor(intensity)} transition-transform duration-200 hover:scale-125 relative z-10`}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {hoveredIndex === i && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-md border border-white/10 text-xs text-white z-50 whitespace-nowrap shadow-xl">
                                    {intensity * 2} sessions
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary border-b border-r border-white/10 rotate-45" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral/50 font-mono">
                Less
                <div className="w-3 h-3 rounded-sm bg-white/5" />
                <div className="w-3 h-3 rounded-sm bg-accent-cyan/20" />
                <div className="w-3 h-3 rounded-sm bg-accent-cyan/40" />
                <div className="w-3 h-3 rounded-sm bg-accent-cyan/60" />
                <div className="w-3 h-3 rounded-sm bg-[#87F5FB]" />
                More
            </div>
        </div>
    );
}
