"use client";

import { motion } from "framer-motion";

export default function LineChart() {
    const points = "0,100 20,80 40,85 60,60 80,40 100,50 120,20 140,10";

    return (
        <div className="glass-heavy p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col w-full h-full mt-6 lg:mt-0 lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white font-heading">WPM Growth Velocity</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                    <span className="text-xs text-neutral tracking-wide uppercase font-semibold">Speed vs Time</span>
                </div>
            </div>

            <div className="flex-1 relative w-full h-full min-h-[160px] pb-6 px-4">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-8 pr-4">
                    {[120, 90, 60, 30, 0].map((val, i) => (
                        <div key={i} className="w-full flex items-center justify-between border-b border-white/5 relative h-0">
                            <span className="absolute -left-4 text-[10px] text-neutral/40 font-mono -translate-y-1/2">{val}</span>
                        </div>
                    ))}
                </div>

                {/* Chart SVG */}
                <div className="absolute inset-0 pt-4 pb-8 pl-4 pr-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 140 100" preserveAspectRatio="none">
                        {/* Area Fill Gradient */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#87F5FB" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#87F5FB" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Filled Area */}
                        <motion.path
                            d={`M0,100 L${points} L140,100 Z`}
                            fill="url(#lineGradient)"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1 }}
                        />

                        {/* Main Line */}
                        <motion.polyline
                            points={points}
                            fill="none"
                            stroke="#87F5FB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_8px_rgba(135,245,251,0.6)]"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        />

                        {/* End Point Dot */}
                        <motion.circle
                            cx="140"
                            cy="10"
                            r="3"
                            fill="#fff"
                            stroke="#87F5FB"
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.7, type: "spring" }}
                            className="drop-shadow-[0_0_10px_#87F5FB]"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
