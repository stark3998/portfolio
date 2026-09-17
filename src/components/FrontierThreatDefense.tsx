"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiArrowRight,
} from "react-icons/hi2";

interface FeatureArtifact {
  slug: string;
  eyebrow: string;
  title: string;
  blurb: string;
}

const artifacts: FeatureArtifact[] = [
  {
    slug: "frontier-threat-defense-kill-chain",
    eyebrow: "Deep dive",
    title: "The AI Attack Kill Chain",
    blurb:
      "A real frontier-AI agent intrusion — ~700 autonomous agents, no human operator — broken into ten stages, with the control that stops it at each one.",
  },
  {
    slug: "frontier-threat-defense-program-strategy",
    eyebrow: "Deep dive",
    title: "The Program Strategy",
    blurb:
      "A full Frontier Threat Defense program: scope, controls, ownership, and a tight executive metric set that proves it is working.",
  },
];

export default function FrontierThreatDefense() {
  return (
    <SectionWrapper id="frontier-threat-defense">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal-700 text-sm font-medium">
        <HiOutlineShieldCheck className="w-4 h-4" />
        Frontier Threat Defense
      </span>
      <h2 className="mt-4 font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Defending against adversaries that attack with AI
      </h2>
      <p className="mt-4 text-slate-mid max-w-2xl leading-relaxed">
        A new class of attacker runs as a fleet of autonomous AI agents and
        moves at machine speed. I wrote the whole story as one section — the
        problem, the strategy, the defences, a real intrusion walked stage by
        stage, the pattern that connects it to a wave of other attacks, and the
        plan to close the gap. Two cited, fully-interactive documents sit
        underneath it.
      </p>

      <div className="mt-8">
        <Link
          href="/frontier-threat-defense"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-azure text-white hover:bg-azure-dark transition-colors"
        >
          Read the full story
          <HiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {artifacts.map((a, index) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Link
              href={`/ai/${a.slug}`}
              className="block glass-card p-6 group hover:border-azure/25 h-full"
            >
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-teal/15 text-teal-700">
                <HiOutlineSparkles className="w-3 h-3" />
                {a.eyebrow}
              </span>
              <h3 className="mt-3 font-heading font-semibold text-lg text-slate-dark group-hover:text-azure transition-colors">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                {a.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-azure opacity-0 group-hover:opacity-100 transition-opacity">
                Open artifact
                <HiArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
