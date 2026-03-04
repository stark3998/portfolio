"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  status: "current" | "completed";
}

const timeline: TimelineItem[] = [
  {
    period: "Aug 2020 — Present",
    title: "Advisory Associate Solution Advisor",
    company: "Deloitte USI",
    description:
      "Azure Cloud Solutions Architect leading DevSecOps for Fortune 500 clients.",
    highlights: [
      "Compliance Framework Automation — Defined governance & compliance process flows for cloud migration with SOP and RACI segregation",
      "CIS 1.5 Security Assessment — Assessed Azure environments against CIS 1.5 and Azure Security Benchmark v3",
      "IAM Automation — Automated Azure AD group-to-role mappings for PaaS databases and Kubernetes namespaces",
      "Cloud Assessment Tool — Built a dynamic tool scanning tenant resources against NIST, CIS, and other frameworks",
      "Identity Risk Management — Migrated client apps to authenticate/authorize via Azure AD",
      "ETL Pipeline & Dashboard — Created ETL workflows with Azure PaaS to power Power BI analytics",
      "Security Config Automation — Ensured continuous compliance with desired-state configuration tooling",
    ],
    status: "current",
  },
  {
    period: "Jul — Aug 2020",
    title: "Azure Architect Intern",
    company: "IIT Bombay",
    description:
      "Designed and deployed cloud solutions for IIT-incubated startups.",
    highlights: [
      "Architected & deployed JITSI/BBB video conferencing on Azure",
      "Built SSO proof-of-concept for IIT Bombay applications",
      "Implemented CDN & storage account integrations for Lokavidya apps",
    ],
    status: "completed",
  },
  {
    period: "Jan — Apr 2020",
    title: "Advisory Analyst Intern",
    company: "Deloitte India (Offices of the US)",
    description: "Python & C# automation development.",
    highlights: [
      "Built Azure resource security configuration automation tool",
      "Developed PoC for workload migration to comply with China data regulations",
    ],
    status: "completed",
  },
  {
    period: "Jun — Aug 2019",
    title: "Django Backend Intern",
    company: "Delhi Government (AAP)",
    description: "Backend development for government digital services.",
    highlights: [
      "Built social media scraping tool aggregating complaints from Facebook, WhatsApp & Twitter",
      "Developed backend models and database management for internal systems",
    ],
    status: "completed",
  },
  {
    period: "Apr — Jul 2018",
    title: "SAP HANA/ABAP Intern",
    company: "HPCL-Mittal Energy",
    description: "Enterprise resource planning and Industry 4.0.",
    highlights: [
      "Developed the Product Management module in SAP",
      "Gained hands-on experience with Industry 4.0 infrastructure and ERP systems",
    ],
    status: "completed",
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Experience
      </h2>

      <div className="mt-12 relative">
        {/* Pipeline line */}
        <div className="absolute left-[17px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-azure via-teal to-azure/20 hidden md:block" />

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Pipeline node */}
              <div className="hidden md:flex flex-col items-center pt-1.5">
                <div
                  className={`pipeline-node ${
                    item.status === "current"
                      ? "!bg-azure shadow-[0_0_12px_rgba(0,120,212,0.4)]"
                      : ""
                  }`}
                />
              </div>

              {/* Card */}
              <div className="glass-card p-6 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "current"
                        ? "bg-azure-light text-azure"
                        : "bg-slate-100 text-slate-mid"
                    }`}
                  >
                    {item.period}
                  </span>
                  {item.status === "current" && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-semibold text-lg text-slate-dark">
                  {item.title}
                </h3>
                <p className="text-sm text-azure font-medium mt-0.5">
                  {item.company}
                </p>
                <p className="text-sm text-slate-mid mt-2">{item.description}</p>

                <ul className="mt-3 space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-mid flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-azure mt-2 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
