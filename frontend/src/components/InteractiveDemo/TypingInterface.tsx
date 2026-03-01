"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingInterfaceProps {
    isActive: boolean;
    onComplete: () => void;
}

const SNIPPET = "const quicksort = (arr) => {";

export default function TypingInterface({ isActive, onComplete }: TypingInterfaceProps) {
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [mistakes, setMistakes] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isActive && !isFinished && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActive, isFinished]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isFinished) return;

        if (!startTime) setStartTime(Date.now());

        // Allow backspace
        if (e.key === "Backspace") {
            setInput((prev) => prev.slice(0, -1));
            return;
        }

        // Ignore special keys
        if (e.key.length > 1) return;

        // Check correct/wrong
        const targetChar = SNIPPET[input.length];

        if (e.key === targetChar) {
            const newInput = input + e.key;
            setInput(newInput);

            if (newInput === SNIPPET) {
                setIsFinished(true);
                onComplete();
                // Calculate final WPM
                if (startTime) {
                    const timeElapsedMin = (Date.now() - startTime) / 60000;
                    const words = SNIPPET.length / 5;
                    setWpm(Math.round(words / timeElapsedMin));
                }
            }
        } else {
            setMistakes((m) => m + 1);
            // Trigger error shake on container via DOM
            const container = document.getElementById("typing-container");
            if (container) {
                container.classList.remove("shake-error");
                void container.offsetWidth; // trigger reflow
                container.classList.add("shake-error");
            }
        }
    };

    // Real-time WPM
    useEffect(() => {
        if (!startTime || isFinished) return;

        const interval = setInterval(() => {
            const timeElapsedMin = (Date.now() - startTime) / 60000;
            const words = input.length / 5;
            setWpm(Math.round(words / timeElapsedMin) || 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, input, isFinished]);

    const accuracy = Math.max(0, Math.round(((input.length - mistakes) / Math.max(1, input.length)) * 100));
    const dashOffset = 100 - (input.length / SNIPPET.length) * 100;

    return (
        <div className="flex flex-col w-full px-6 sm:px-12 h-full justify-between">
            {/* Top Stats Bar */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral/50 uppercase tracking-widest font-bold">WPM</span>
                        <motion.span
                            key={wpm}
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-2xl font-mono font-bold text-accent-cyan"
                        >
                            {wpm}
                        </motion.span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral/50 uppercase tracking-widest font-bold">Mistakes</span>
                        <motion.span
                            key={mistakes}
                            initial={{ x: 5, color: "#fff" }}
                            animate={{ x: 0, color: mistakes > 0 ? "#DE3C4B" : "#fff" }}
                            className="text-2xl font-mono font-bold"
                        >
                            {mistakes}
                        </motion.span>
                    </div>
                </div>

                {/* Circular SVG Progress */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="3"
                        />
                        <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#87F5FB"
                            strokeWidth="3"
                            strokeDasharray="100 100"
                            animate={{ strokeDashoffset: dashOffset }}
                            transition={{ ease: "easeOut" }}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-mono text-white/80">{Math.round(100 - dashOffset)}%</span>
                </div>
            </div>

            {/* Typing Area */}
            <div
                id="typing-container"
                className="flex-1 flex flex-col items-center justify-center transition-transform"
            >
                <div className="relative font-mono text-2xl sm:text-4xl md:text-5xl leading-relaxed tracking-tight select-none">
                    {SNIPPET.split("").map((char, i) => {
                        let stateClass = "text-neutral/30"; // default un-typed
                        if (i < input.length) {
                            stateClass = "text-accent-cyan text-glow-cyan";
                        } else if (i === input.length && isActive) {
                            stateClass = "text-white border-b-2 border-accent-cyan bg-white/10 animate-pulse";
                        }
                        return (
                            <span key={i} className={`transition-colors duration-100 ${stateClass}`}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Hidden Input Layer */}
                <input
                    ref={inputRef}
                    type="text"
                    className="opacity-0 absolute w-0 h-0 p-0 m-0 cursor-default"
                    value={input}
                    onChange={() => { }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />

                <AnimatePresence>
                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="mt-12 glass px-8 py-4 rounded-2xl flex flex-col flex-wrap border border-accent-cyan/30 bg-accent-cyan/5 items-center justify-center gap-2"
                        >
                            <h3 className="text-xl font-bold text-white">Nailed it! 🚀</h3>
                            <p className="text-neutral text-sm font-mono">Accuracy: {accuracy}% | WPM: {wpm}</p>
                            <button
                                onClick={() => {
                                    setInput("");
                                    setIsFinished(false);
                                    setStartTime(null);
                                    setMistakes(0);
                                    setWpm(0);
                                    setTimeout(() => inputRef.current?.focus(), 100);
                                }}
                                className="mt-2 text-xs uppercase tracking-wider text-accent-cyan hover:text-white transition-colors"
                                style={{ cursor: 'none' }}
                            >
                                Try Again [Enter]
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
        .shake-error {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
        </div>
    );
}
