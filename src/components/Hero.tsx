"use client";

import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiArrowDown } from "react-icons/hi2";
import { VscAzure } from "react-icons/vsc";
import { GoLock } from "react-icons/go";
import ParticleBackground from "./ParticleBackground";
import { trackCTAClick } from "@/lib/analytics";

const titles = [
  "Cloud Security Senior Consultant",
  "Enterprise AI Security & Identity Governance",
  "11x Microsoft Certified",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden blueprint-grid">
      <ParticleBackground />

      {/* Floating security icons */}
      <motion.div
        className="absolute top-24 right-[15%] text-azure/10"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <HiOutlineShieldCheck className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[12%] text-teal/10"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <GoLock className="w-12 h-12" />
      </motion.div>
      <motion.div
        className="absolute top-[40%] left-[8%] text-azure/8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <VscAzure className="w-10 h-10" />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azure-light/60 text-azure text-sm font-medium border border-azure/15">
            <HiOutlineShieldCheck className="w-4 h-4" />
            Identity · Security · Azure
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-slate-dark tracking-tight leading-tight"
        >
          Jatin Madan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 space-y-2"
        >
          {titles.map((title, i) => (
            <motion.p
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.12 }}
              className="text-lg md:text-xl text-slate-mid font-body"
            >
              {title}
            </motion.p>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-base md:text-lg text-slate-mid/80 max-w-xl mx-auto leading-relaxed"
        >
          Leading Entra ID modernization, enterprise AI security governance,
          and agentic solution delivery across Azure, Copilot Studio,
          Microsoft Foundry, and hybrid identity programs at Deloitte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={() => trackCTAClick("hero", "view_work")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-azure text-white font-medium text-sm hover:bg-azure-dark transition-colors shadow-lg shadow-azure/20"
          >
            View My Work
          </a>
          <a
            href="/contact"
            onClick={() => trackCTAClick("hero", "contact")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/70 backdrop-blur text-slate-dark font-medium text-sm border border-azure/15 hover:border-azure/30 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HiArrowDown className="w-5 h-5 text-azure/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
