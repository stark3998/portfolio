"use client";

import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { VscAzure } from "react-icons/vsc";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const stats = [
  { label: "Microsoft Certifications", value: "11", icon: VscAzure },
  { label: "Years Experience", value: "7+", icon: HiOutlineShieldCheck },
  { label: "Research Publications", value: "5", icon: HiOutlineAcademicCap },
  { label: "Security Frameworks", value: "CIS · MCSB · CISA", icon: GoLock },
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
      "Building Azure Policy and AI configuration controls for Copilot Studio, Microsoft Foundry, Purview, Agent365, and Agent ID to strengthen enterprise AI governance.",
    color: "azure",
  },
  {
    title: "Automation & Reporting",
    description:
      "Deploying agentic solutions for client communication workflows, executive reporting, remediation tracking, and operational coordination across Teams and Outlook.",
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
        Cloud Security Senior Consultant at Deloitte, specializing in identity
        modernization, enterprise AI security governance, and Microsoft Entra
        ID and External ID. I work across large-scale migration accelerators,
        hybrid identity architecture, AI control design, and agentic automation
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
