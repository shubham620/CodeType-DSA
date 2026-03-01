"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magneticRadius?: number;
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  magneticRadius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    if (
      Math.abs(middleX) < magneticRadius &&
      Math.abs(middleY) < magneticRadius
    ) {
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500); // Ripple duration
    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group transition-all duration-300 ${className} ${isHovered ? "w-[260px]" : "w-[220px]"
        } h-[60px] rounded-full flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-accent-red transition-colors duration-500 group-hover:bg-accent-cyan z-0" />

      {/* Ripple Effect */}
      {isClicked && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white rounded-full pointer-events-none z-10"
        />
      )}

      <span className="relative z-20 font-bold text-white text-lg tracking-wide flex items-center justify-center w-full h-full pointer-events-none">
        {children}
      </span>
    </motion.button>
  );
}
