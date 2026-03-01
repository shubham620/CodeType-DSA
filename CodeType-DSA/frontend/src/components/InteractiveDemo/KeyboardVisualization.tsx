"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ROW_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
const ROW_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
const ROW_3 = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

interface KeyboardVisualizationProps {
    targetKey?: string;
}

export default function KeyboardVisualization({ targetKey }: KeyboardVisualizationProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [pressedKey] = useState<string | null>(null);

    // In a real implementation, we would tie this to window window.addEventListener("keydown")
    // but for the demo, we rely on the parent or just visual display.

    const renderKey = (keyChar: string) => {
        const isTarget = targetKey === keyChar;
        const isPressed = pressedKey === keyChar;

        return (
            <motion.div
                key={keyChar}
                initial={{ scale: 1 }}
                animate={{
                    scale: isPressed ? 0.9 : 1,
                    backgroundColor: isTarget
                        ? "rgba(135, 245, 251, 0.2)"
                        : isPressed
                            ? "rgba(222, 60, 75, 0.4)"
                            : "rgba(255, 255, 255, 0.05)",
                    borderColor: isTarget
                        ? "rgba(135, 245, 251, 0.5)"
                        : "rgba(255, 255, 255, 0.1)",
                }}
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-xs sm:text-sm font-mono transition-colors duration-150 relative ${isTarget ? "shadow-[0_0_15px_rgba(135,245,251,0.3)] z-10" : "z-0"
                    }`}
            >
                <span className={`${isTarget ? "text-accent-cyan font-bold" : "text-neutral/60"}`}>
                    {keyChar}
                </span>
                {isTarget && (
                    <motion.div
                        layoutId="target-glow"
                        className="absolute inset-0 rounded-lg shadow-[inset_0_0_10px_rgba(135,245,251,0.5)]"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                )}
            </motion.div>
        );
    };

    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center border-t border-white/5 bg-black/20 mt-4 md:mt-0 pt-6 pb-6 shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-2">
                    {ROW_1.map(renderKey)}
                </div>
                <div className="flex justify-center gap-2 ml-4">
                    {ROW_2.map(renderKey)}
                </div>
                <div className="flex justify-center gap-2 ml-10">
                    {ROW_3.map(renderKey)}
                </div>
            </div>

            {/* Spacebar */}
            <div className="mt-2 flex justify-center w-full">
                <motion.div
                    animate={{
                        backgroundColor: targetKey === " " ? "rgba(135, 245, 251, 0.2)" : "rgba(255, 255, 255, 0.05)",
                        borderColor: targetKey === " " ? "rgba(135, 245, 251, 0.5)" : "rgba(255, 255, 255, 0.1)",
                    }}
                    className="h-8 sm:h-10 md:h-12 w-[200px] sm:w-[300px] rounded-lg border flex items-center justify-center transition-colors duration-150"
                >
                    {targetKey === " " && (
                        <motion.div
                            layoutId="target-glow"
                            className="absolute w-[200px] sm:w-[300px] h-8 sm:h-10 md:h-12 rounded-lg shadow-[inset_0_0_10px_rgba(135,245,251,0.5)] z-20"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
