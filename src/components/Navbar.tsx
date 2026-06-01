"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShieldCheck, HiArrowDownTray } from "react-icons/hi2";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#github", label: "GitHub" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-azure/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <HiOutlineShieldCheck className="w-6 h-6 text-azure shield-glow group-hover:scale-110 transition-transform" />
            <span className="font-heading font-bold text-slate-dark text-lg tracking-tight">
              JM
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-mid hover:text-azure transition-colors rounded-lg hover:bg-azure-light/50 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-azure text-white hover:bg-azure-dark transition-colors"
            >
              <HiArrowDownTray className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-mid hover:text-azure transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiXMark className="w-6 h-6" />
            ) : (
              <HiBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-azure/10"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-mid hover:text-azure hover:bg-azure-light/50 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-azure hover:bg-azure-light/50 rounded-lg transition-colors"
              >
                <HiArrowDownTray className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
