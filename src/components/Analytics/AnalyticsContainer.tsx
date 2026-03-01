"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeatmapCalendar from "./HeatmapCalendar";
import ProgressRings from "./ProgressRings";
import LineChart from "./LineChart";

gsap.registerPlugin(ScrollTrigger);

export default function AnalyticsContainer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on the whole container
            gsap.fromTo(
                ".analytics-grid",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="analytics"
            ref={containerRef}
            className="relative py-32 bg-primary overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                        Track Everything. <span className="text-accent-cyan">Master Anything.</span>
                    </h2>
                    <p className="text-neutral text-lg max-w-2xl mx-auto">
                        Deep insights into your typing cadence, accuracy drop-offs, and algorithmic speed. Identify exactly which concepts or keystrokes need practice.
                    </p>
                </div>

                <div className="analytics-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

                    {/* Main Heatmap block */}
                    <div className="md:col-span-2 lg:col-span-2 h-[280px]">
                        <HeatmapCalendar />
                    </div>

                    {/* Progress Rings */}
                    <div className="h-[280px]">
                        <ProgressRings label="Overall Accuracy" value={98.5} max={100} color="cyan" suffix="%" />
                    </div>
                    <div className="h-[280px]">
                        <ProgressRings label="Avg Peak WPM" value={142} max={180} color="red" />
                    </div>

                    {/* Bottom Line Chart */}
                    <div className="md:col-span-2 lg:col-span-4 h-[320px]">
                        <LineChart />
                    </div>

                </div>
            </div>

            {/* Visual background flares */}
            <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent-red/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
