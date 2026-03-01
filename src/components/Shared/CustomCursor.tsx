"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const target = document.elementFromPoint(mousePosition.x, mousePosition.y);
            if (target) {
                const style = window.getComputedStyle(target);
                setIsPointer(style.cursor === "pointer" || target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button");
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", updateCursorType);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", updateCursorType);
        };
    }, [mousePosition.x, mousePosition.y]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent-cyan rounded-full pointer-events-none z-[100] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-accent-cyan rounded-full pointer-events-none z-[99] opacity-50"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
            />
        </>
    );
}
