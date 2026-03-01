"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#0f0008] pt-20 pb-10 border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

                    {/* Brand Col */}
                    <div className="flex flex-col items-start">
                        <div className="text-2xl font-black font-heading tracking-tighter text-white mb-6">
                            Code<span className="text-accent-red">Type</span>
                            <span className="text-accent-cyan bg-white/5 px-2 py-0.5 rounded-md ml-1 text-sm align-middle tracking-widest border border-white/5">DSA</span>
                        </div>
                        <p className="text-neutral/60 text-sm leading-relaxed max-w-xs mb-8">
                            The premier platform for decoupling algorithmic logic from syntactic hesitation. Train your muscle memory.
                        </p>
                        <div className="flex gap-4">
                            {['Twitter', 'GitHub', 'Discord'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral/70 hover:text-accent-cyan hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:shadow-[0_0_15px_rgba(135,245,251,0.3)] transition-all duration-300"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current" style={{ maskImage: social === 'Twitter' ? 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"%3E%3Cpath d=\\"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z\\"%3E%3C/path%3E%3C/svg%3E")' : social === 'GitHub' ? 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"%3E%3Cpath d=\\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\\"%3E%3C/path%3E%3C/svg%3E")' : 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"%3E%3Cpath d=\\"M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44a1.003 1.003 0 0 1-.53-.88V7.5c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z\\"%3E%3C/path%3E%3C/svg%3E")', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Col 1 */}
                    <div className="flex flex-col items-start md:items-center">
                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Product</h4>
                            <ul className="space-y-4">
                                {['Features', 'How It Works', 'Analytics', 'Testimonials'].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-neutral/60 hover:text-accent-cyan transition-colors duration-200 text-sm">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Links Col 2 */}
                    <div className="flex flex-col items-start md:items-end">
                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
                            <ul className="space-y-4">
                                {['Documentation', 'Blog', 'Changelog', 'Contact'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-neutral/60 hover:text-accent-cyan transition-colors duration-200 text-sm">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral/40 text-sm">
                        © {new Date().getFullYear()} CodeType-DSA. All rights reserved.
                    </p>

                    <p className="text-neutral/50 text-sm font-medium">
                        Built with ❤️ for <span className="text-white tracking-widest uppercase text-xs ml-1 font-bold">AWWWARDS</span>
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-accent-cyan/50 hover:text-accent-cyan transition-all duration-300 group"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
