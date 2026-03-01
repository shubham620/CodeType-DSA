"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";

const CODE_SNIPPETS = [
  "function binarySearch(arr, target) {\\n  let left = 0;\\n  let right = arr.length - 1;\\n\\n  while (left <= right) {\\n    const mid = Math.floor((left + right) / 2);\\n    if (arr[mid] === target) return mid;\\n    if (arr[mid] < target) left = mid + 1;\\n    else right = mid - 1;\\n  }\\n  return -1;\\n}",
];

export default function TypingSimulation() {
  const codeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!codeRef.current) return;

    const typed = new Typed(codeRef.current, {
      strings: CODE_SNIPPETS,
      typeSpeed: 40,
      backSpeed: 20,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
      onStringTyped: () => {
        const cursor = document.querySelector(".typed-cursor");
        if (cursor) {
          cursor.classList.add("text-glow-cyan");
          (cursor as HTMLElement).style.color = "#87F5FB";
        }
      },
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="glass-heavy rounded-2xl p-6 sm:p-8 w-full max-w-2xl mx-auto shadow-2xl border border-white/10 relative overflow-hidden group perspective-1000"
    >
      <div className="absolute top-0 left-0 right-0 h-10 bg-primary/40 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-accent-red/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="text-xs text-neutral/70 font-mono ml-4">binarySearch.js</span>
      </div>

      <div className="mt-8 font-mono text-sm sm:text-base leading-loose whitespace-pre-wrap overflow-x-auto text-neutral">
        <div className="flex">
          <div className="flex flex-col text-neutral/30 select-none pr-4 border-r border-white/10 mr-4 text-right min-w-[2rem]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#CEC3C1] relative"
          >
            <span ref={codeRef} className="text-white" />
            <style jsx global>{`
              .typed-cursor {
                color: #87F5FB;
                animation: blink 1s infinite;
              }
              @keyframes blink {
                0% { opacity: 1; text-shadow: 0 0 10px rgba(135, 245, 251, 0.6); }
                50% { opacity: 0; text-shadow: none; }
                100% { opacity: 1; text-shadow: 0 0 10px rgba(135, 245, 251, 0.6); }
              }
            `}</style>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
    </motion.div>
  );
}
