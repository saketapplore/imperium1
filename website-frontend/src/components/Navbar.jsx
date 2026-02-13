import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ transparent = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About us', href: '/about' },
    ];

    return (
        <header className={`w-full z-50 transition-all duration-300 ${transparent ? 'bg-transparent' : 'bg-[#001B2F]'}`}>
            <div className="mx-auto max-w-[1400px] sm:px-6">
                <div className="flex h-16 sm:h-20 md:h-24 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/">
                            <img
                                src={transparent ? "/images/imlogo.png" : "/images/ilogo.png"}
                                alt="Solved Imperium Ventures"
                                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        <div className="flex items-center gap-8 lg:gap-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm lg:text-base font-medium text-white hover:text-[#D9BB8E] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <a
                            href="/contact"
                            className="rounded bg-[#D9BB8E] px-6 py-2.5 text-sm lg:text-base font-bold text-slate-900 hover:bg-[#ceae7d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Contact us
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <a
                            href="/contact"
                            className="rounded-full bg-[#D9BB8E] px-4 py-1.5 text-xs font-bold text-slate-900 hover:bg-[#ceae7d] transition-colors"
                        >
                            Contact us
                        </a>
                        <button
                            onClick={toggleMenu}
                            className="text-white p-1 hover:text-[#D9BB8E] transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Sidebar */}
            <div
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'visible' : 'invisible'}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={`absolute right-0 top-0 h-full w-[280px] bg-[#001B2F] p-8 shadow-2xl transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-12">
                            <img src="/images/ilogo.png" alt="Logo" className="h-8 w-auto" />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white p-1 hover:text-[#D9BB8E]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-xl font-semibold text-white hover:text-[#D9BB8E] transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <span className="h-0.5 w-0 bg-[#D9BB8E] transition-all duration-300 group-hover:w-8" />
                                </a>
                            ))}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <a
                                    href="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex w-full items-center justify-center rounded-xl bg-[#D9BB8E] py-4 text-center text-lg font-bold text-slate-900 shadow-lg"
                                >
                                    Contact us
                                </a>
                            </div>
                        </nav>

                        <div className="mt-auto">
                            <p className="text-sm text-white/40">© 2026 Imperium Ventures</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
