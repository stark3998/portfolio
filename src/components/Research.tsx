"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiOutlineAcademicCap, HiArrowTopRightOnSquare } from "react-icons/hi2";

interface Paper {
  id: number;
  title: string;
  venue: string;
  status: string;
  abstract: string;
}

const papers: Paper[] = [
  {
    id: 1,
    title:
      "HCS: A Hybrid Data Security Enhancing Model Based on Cryptography Algorithms",
    venue: "Springer LNSS — 4th AICT&C 2022",
    status: "Accepted",
    abstract:
      "Enhances data security at scale using cryptographic algorithms, Pan-Tompkins for QRS detection, and MLP for cardiac arrhythmia classification.",
  },
  {
    id: 2,
    title: "Critical Analysis of Digital Forensics in Offense Investigation",
    venue: "Springer LNEE — 8th NCCS 2022",
    status: "Accepted",
    abstract:
      "Analyzes the digital forensics process and reviews the OSForensics tool, covering its features, implementation, and future directions.",
  },
  {
    id: 3,
    title:
      "Intelligent and Personalized Factoid Question & Answer System",
    venue: "IEEE ICRITO 2022",
    status: "Presented",
    abstract:
      "Proposes a face-recognition-based chatbot using NLP and ML (Local Binary Patterns, HAAR) for personalized question-answering with biometric identification.",
  },
  {
    id: 4,
    title: "Integrating Big Data and Cloud Computing",
    venue: "Taylor & Francis (CRC Press)",
    status: "Chapter Accepted",
    abstract:
      "Surveys big data implementation in cloud computing, covering analytics, integration technologies, security considerations, and Hadoop.",
  },
  {
    id: 5,
    title: "Analyzing and Evaluating IoT Platforms for Smart Cities",
    venue: "Taylor & Francis (CRC Press)",
    status: "Chapter Accepted",
    abstract:
      "Evaluates IoT applications in smart city contexts including transportation, healthcare, waste management, and defense.",
  },
];

const statusColors: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Presented: "bg-azure-light text-azure",
  "Chapter Accepted": "bg-amber/15 text-amber-700",
};

export default function Research() {
  return (
    <SectionWrapper id="research">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Research &amp; Publications
      </h2>
      <p className="mt-4 text-slate-mid">
        Published across Springer, IEEE, and CRC Press — covering cryptography,
        digital forensics, NLP, cloud computing, and IoT.
      </p>

      <div className="mt-10 space-y-4">
        {papers.map((paper, index) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-azure-light text-azure items-center justify-center flex-shrink-0 mt-0.5">
                <HiOutlineAcademicCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      statusColors[paper.status] || "bg-slate-100 text-slate-mid"
                    }`}
                  >
                    {paper.status}
                  </span>
                  <span className="text-[11px] text-slate-mid/60">
                    {paper.venue}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-base text-slate-dark">
                  {paper.title}
                </h3>
                <p className="text-sm text-slate-mid mt-2 leading-relaxed">
                  {paper.abstract}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
