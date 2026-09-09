"use client";

import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { VscAzure } from "react-icons/vsc";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const stats = [
  { label: "Certifications", value: "11 MS + 2 Claude", icon: VscAzure },
  { label: "Years Experience", value: "7+", icon: HiOutlineShieldCheck },
  { label: "Research Publications", value: "5", icon: HiOutlineAcademicCap },
  { label: "Security Frameworks", value: "OWASP ASI · CIS · MCSB", icon: GoLock },
];

const techAreas = [
  {
    title: "Cloud Security Architecture",
    description:
      "Designing secure Azure and hybrid architectures with strong tenant controls, secure ingress, network boundaries, and resilient identity-aware access.",
    color: "azure",
  },
  {
    title: "Identity Modernization",
    description:
      "Migrating enterprise applications from Okta to Entra ID and Entra External ID with SSO, MFA, HRD, JIT user migration, hybrid identity patterns, and accelerator-led onboarding.",
    color: "teal",
  },
  {
    title: "AI Security & Governance",
    description:
      "Designing enterprise AI security frameworks aligned to the OWASP Top 10 for Agentic Applications and MITRE ATLAS, plus Azure Policy and AI configuration controls for Copilot Studio, Microsoft Foundry, Purview, Agent365, and Agent ID.",
    color: "azure",
  },
  {
    title: "Agentic Systems & Automation",
    description:
      "Building multi-agent systems on the Microsoft Agent Framework and Azure AI Foundry Agent Service — SecOps threat detection, SIEM remediation, and MCP-based automation — alongside executive reporting and operational coordination.",
    color: "teal",
  },
];

export default function About() {
  useScrollTracking("about", "about");

  return (
    <SectionWrapper id="about">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        About
      </h2>

      <p className="mt-8 text-lg text-slate-mid leading-relaxed max-w-2xl">
        Engineering Manager 2 and Enterprise AI Program Architect at Deloitte,
        specializing in AI security & governance, agentic systems, and
        Microsoft Entra ID identity modernization. I work across agentic
        threat detection, OWASP Agentic-AI-aligned governance frameworks,
        large-scale migration accelerators, and hybrid identity architecture
        for complex Azure estates.
      </p>

      {/* Stats row */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-5 text-center"
          >
            <stat.icon className="w-6 h-6 text-azure mx-auto mb-2" />
            <p className="font-heading font-bold text-2xl text-slate-dark">
              {stat.value}
            </p>
            <p className="text-xs text-slate-mid mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Focus areas */}
      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {techAreas.map((area) => (
          <div key={area.title} className="glass-card p-6 group">
            <div
              className={`w-2 h-2 rounded-full mb-3 ${
                area.color === "azure" ? "bg-azure" : "bg-teal"
              }`}
            />
            <h3 className="font-heading font-semibold text-lg text-slate-dark mb-2">
              {area.title}
            </h3>
            <p className="text-sm text-slate-mid leading-relaxed">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
