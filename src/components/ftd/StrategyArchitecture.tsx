"use client";

import {
  HiOutlineMap,
  HiOutlineEye,
  HiOutlineSparkles,
  HiOutlineLockClosed,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import { Cite, TechDetail, Reveal } from "./FtdPrimitives";

const domains = [
  {
    id: "D1",
    icon: HiOutlineMap,
    title: "Exposure management",
    benefit: "Validate control efficacy against attacks; simulate real-world approaches.",
    doWhat: [
      "Enumerate the AI estate — discovery first, self-declaration last",
      "Prove controls by exercise, not inspection",
      "Map blast radius before we need it, not during an incident",
    ],
    outcomes: [
      "% of AI assets and machine identities discovered and reconciled",
      "% of priority controls validated by simulated attack",
      "% of crown-jewel repositories with a mapped blast radius",
    ],
    tech: "Adversarial exposure validation (AEV) against the agentic technique set, an identity graph over machine identities, and automated IT/OT/cloud inventory pulled from the exposure platform. Discovery precedes the registry because a self-declared inventory misses exactly the assets an adversary looks for.",
    citeIds: ["coverage"],
  },
  {
    id: "D2",
    icon: HiOutlineEye,
    title: "Adversary management & threat intelligence",
    benefit: "Understand adversary tactics; anticipate attacks against the organisation.",
    doWhat: [
      "Anchor the technique scope externally — four adversary classes, not internal opinion",
      "Convert every scenario into a detection requirement with a named owner",
      "Harden the processes deepfakes actually target — password reset, suppliers, payments",
    ],
    outcomes: [
      "% of high-risk processes hardened against deepfake impersonation",
      "% of priority scenarios converted to a requirement with an owner",
      "% of AI-relevant techniques with a named telemetry source",
    ],
    tech: "Deepfake-enabled social engineering is the highest-prevalence real AI attack — 41% of organisations on audio calls, 35% on video — so the SOP-hardening work is the counterweight to an otherwise infrastructure-heavy programme.",
    citeIds: ["deepfake"],
  },
  {
    id: "D3",
    icon: HiOutlineSparkles,
    title: "Adversary disruption",
    benefit: "Misdirect and delay the adversary; raise attacker cost; increase detection.",
    doWhat: [
      "Place deception where an agent reaches it first — buy paid or self-hosted tokens",
      "Make a stolen machine identity worthless in ten minutes — named authority, rehearsed",
      "Sell it on signal, not delay — the delay benefit does not hold against agents",
    ],
    outcomes: [
      "% of crown-jewel environments with deception coverage",
      "% of machine-identity classes revocable within ten minutes",
      "% of incidents first surfaced by a disruption control",
    ],
    tech: "Deception is the one control that works better against agents than people: across 21 models every one took the bait at ~78% versus 37% for humans. So the strategy shifts from misdirection-and-delay to detection — a decoy that pages on first touch.",
    citeIds: ["deception"],
  },
  {
    id: "D4",
    icon: HiOutlineLockClosed,
    title: "Posture & policy management",
    benefit: "Validate correct configurations; harden devices and reduce attack surface.",
    doWhat: [
      "Bind declared agent scope to runtime enforcement — no product supplies this",
      "Isolate untrusted-input workloads by default — an isolation problem, not a filtering one",
      "Assess IT, OT and cloud posture continuously; begin macro- to microsegmentation",
    ],
    outcomes: [
      "% of production agents with declared scope enforced at runtime",
      "% of critical IT, OT and cloud assets under continuous posture assessment",
      "% of untrusted-input workloads under deny-by-default egress",
    ],
    tech: "The registry records which tools each agent may use, but nothing binds that record to enforcement — runtime scope enforcement is currently 0%. Deny-by-default egress must sit at a layer a compromised workload cannot edit.",
    citeIds: ["registry"],
  },
];

export default function StrategyArchitecture() {
  return (
    <div className="mt-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {domains.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.06}>
            <div className="glass-card p-5 h-full flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-teal/15 text-teal-700 flex items-center justify-center">
                  <d.icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm text-azure">{d.id}</span>
              </div>
              <h4 className="mt-3 font-heading font-semibold text-slate-dark leading-snug">
                {d.title}
              </h4>
              <p className="mt-2 text-xs text-slate-mid leading-relaxed">
                {d.benefit}
                <Cite ids={d.citeIds} />
              </p>
              <p className="mt-3 text-[11px] font-semibold tracking-wide uppercase text-slate-400">
                What we do
              </p>
              <ul className="mt-1 space-y-1">
                {d.doWhat.map((w) => (
                  <li key={w} className="text-xs text-slate-mid leading-snug flex gap-1.5">
                    <span className="text-teal-700">›</span>
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] font-semibold tracking-wide uppercase text-slate-400">
                Outcomes we measure
              </p>
              <ul className="mt-1 space-y-1">
                {d.outcomes.map((o) => (
                  <li key={o} className="text-xs text-slate-mid leading-snug flex gap-1.5">
                    <span className="text-azure">%</span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <TechDetail>
                  <p>{d.tech}</p>
                </TechDetail>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Foundation base bar — the temple's plinth */}
      <Reveal delay={0.1}>
        <div className="mt-4 glass-card p-5 border-t-4 border-t-azure/50">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-azure/10 text-azure flex items-center justify-center">
              <HiOutlineCpuChip className="w-5 h-5" />
            </div>
            <span className="font-mono text-sm text-azure">F</span>
            <h4 className="font-heading font-semibold text-slate-dark">
              Foundation — managed services & capabilities
            </h4>
          </div>
          <p className="mt-2 text-sm text-slate-mid leading-relaxed">
            Establish detection-engineering capacity and a lifecycle · stand up forensic
            capability independent of hosted guardrails · name accountable resolvers outside the
            defence team. This is the layer where the capability gaps sit — a temple is only as
            good as what holds it up — and the four domains are strictly additive to the
            prevention, detection and response already in place.
            <Cite ids={["additive", "notSub"]} />
          </p>
        </div>
      </Reveal>
    </div>
  );
}
