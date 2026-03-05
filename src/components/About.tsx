"use client";

import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { VscAzure } from "react-icons/vsc";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const stats = [
  { label: "Microsoft Certifications", value: "11", icon: VscAzure },
  { label: "Years Experience", value: "5+", icon: HiOutlineShieldCheck },
  { label: "Research Publications", value: "5", icon: HiOutlineAcademicCap },
  { label: "Security Frameworks", value: "CIS · NIST", icon: GoLock },
];

const techAreas = [
  {
    title: "Cloud Architecture",
    description:
      "Designing and deploying scalable Azure solutions — App Services, Functions, Container Apps, Kubernetes, and multi-region architectures.",
    color: "azure",
  },
  {
    title: "Identity & Security",
    description:
      "Implementing Zero Trust with Entra ID, Entra External ID, Conditional Access, RBAC, and compliance frameworks (CIS, NIST).",
    color: "teal",
  },
  {
    title: "AI & Copilot",
    description:
      "Building intelligent solutions with Microsoft AI Foundry, Copilot Studio, and MCP Servers for enterprise automation.",
    color: "azure",
  },
  {
    title: "DevSecOps",
    description:
      "CI/CD pipelines with Azure DevOps, Terraform IaC, Docker containers, security automation, and desired-state configuration.",
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
        Azure Cloud Solutions Architect at Deloitte, specializing in secure
        cloud-native architectures for Fortune 500 clients. I bridge the gap
        between identity management, AI platforms, and enterprise cloud
        infrastructure.
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
