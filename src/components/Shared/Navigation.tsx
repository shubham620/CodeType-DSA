"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const { scrollY } = useScroll();

    // Dynamic styling based on scroll
    const navHeight = useTransform(scrollY, [0, 100], ["100px", "70px"]);
    const blurValue = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
    const bgOpacity = useTransform(scrollY, [0, 100], ["rgba(36, 1, 21, 0)", "rgba(36, 1, 21, 0.6)"]);
    const borderColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

    const NavLinks = [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Analytics", href: "#analytics" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <motion.header
            style={{
                height: navHeight,
                backdropFilter: blurValue,
                backgroundColor: bgOpacity,
                borderBottom: "1px solid",
                borderBottomColor: borderColor,
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        >
            <div className="flex items-center gap-2 group cursor-pointer z-50">
                <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 10 }}
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-red to-accent-cyan flex items-center justify-center p-0.5"
                >
                    <div className="w-full h-full bg-primary rounded-[6px] flex items-center justify-center">
                        <span className="text-white font-bold font-mono text-sm group-hover:text-accent-cyan transition-colors">/^</span>
                    </div>
                </motion.div>
                <span className="text-xl font-bold font-heading text-white tracking-tight">Code<span className="text-accent-red">Type</span></span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {NavLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-neutral hover:text-white transition-colors relative group py-2"
                    >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </a>
                ))}
                <button className="ml-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 hover:border-accent-cyan/50 transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10 group-hover:text-accent-cyan transition-colors">Start Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-red/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </nav>

            {/* Mobile Toggle */}
            <button
                className="md:hidden z-50 flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[2px] bg-white block rounded-full"
                />
                <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-6 h-[2px] bg-white block rounded-full"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[2px] bg-white block rounded-full"
                />
            </button>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 bg-primary/95 backdrop-blur-3xl z-40 flex flex-col justify-center items-center gap-8"
            >
                {NavLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 * i + 0.2 }}
                        className="text-3xl font-heading font-bold text-white hover:text-accent-cyan mix-blend-difference"
                    >
                        {link.name}
                    </motion.a>
                ))}
            </motion.div>
        </motion.header>
    );
}
