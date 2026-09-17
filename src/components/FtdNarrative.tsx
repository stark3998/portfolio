"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiArrowRight,
  HiOutlineBolt,
  HiOutlineExclamationTriangle,
  HiOutlineCpuChip,
  HiOutlineArrowPath,
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineClock,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { Cite, TechDetail } from "./ftd/FtdPrimitives";
import StrategyArchitecture from "./ftd/StrategyArchitecture";
import KillChainSpine from "./ftd/KillChainSpine";
import IncidentTimeline from "./ftd/IncidentTimeline";
import MaturityMatrix from "./ftd/MaturityMatrix";
import FtdSectionNav, { type FtdSection } from "./ftd/FtdSectionNav";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: delay * 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ChapterHeader({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-teal-700">
        <span className="font-mono text-azure">{index}</span>
        {eyebrow}
      </span>
      <h2 className="mt-3 font-bold text-xl md:text-2xl text-slate-dark section-heading tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-slate-mid leading-relaxed text-[15px] md:text-base">
        {lede}
      </p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card p-5">
      <div className="font-heading font-bold text-2xl md:text-3xl text-azure">
        {value}
      </div>
      <p className="mt-1.5 text-sm text-slate-mid leading-snug">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: "~700", label: "autonomous agents attacked a production estate for two and a half days — no human directed any of it" },
  { value: "1 sec", label: "from one stolen broker credential to cluster-admin on two production clusters — faster than any human response" },
  { value: "~17,600", label: "discrete adversary actions to interpret, most of it reconnaissance and staging that went nowhere" },
  { value: "29 min", label: "average adversary breakout time today — down from 98 minutes across four reporting cycles" },
];

const realities = [
  { stat: "41% / 35%", title: "The dominant real vector", body: "Organisations hit by deepfake-enabled social engineering on an audio call and a video call respectively. Synthetic media now accounts for one in five biometric fraud attempts.", cite: ["deepfake"] },
  { stat: "days → minutes", title: "The structural change", body: "The gap between a vulnerability being disclosed and actively exploited — now that frontier models can autonomously reverse-engineer a patch into a working exploit.", cite: ["longstanding"] },
  { stat: "scale, not novelty", title: "What AI is mostly used for", body: "Threat actors abuse widely-available AI tools to scale and enhance existing tactics — not to invent net-new attack methods. The tradecraft is familiar; the economics are not.", cite: ["scale"] },
];

const honestFacts = [
  { stat: "31%", title: "Most breaches still don't exploit vulnerabilities", body: "Vulnerability exploitation is the initial access vector in 31% of breaches; credential abuse 13%, phishing 16%. Top threats are cyclical.", cite: ["dbir31"] },
  { stat: "emerging", title: "Autonomous attack is not yet established", body: "LLM-orchestrated attacks are emerging with unclear impact so far, and malware integrating LLMs shows a lack of sophistication — more experimental than mature.", cite: ["experimental"] },
  { stat: "still holds", title: "Foundational controls still work", body: "Attackers still need to be right multiple times. Foundational cybersecurity controls provide adequate protection and resilience. This is not a repeat of Y2K.", cite: ["multiple"] },
];

const scopeGates = [
  { tag: "G1", title: "Novel target", body: "The thing being defended did not exist in the estate two years ago — a model endpoint, an agent, a Model Context Protocol server, an agent's machine identity, a retrieval corpus, a fine-tuned weight artefact. There is no established practice to fall back on, so if we don't build it, nobody does.", cite: [] as string[] },
  { tag: "G2", title: "Broken control", body: "An existing, funded control was adequate and frontier-AI capability makes it inadequate — through speed (disclosure to exploit in minutes), scale (breadth of simultaneous targets), or fidelity (synthetic voice and video defeating human verification). The requirement itself moved.", cite: [] as string[] },
  { tag: "G3", title: "Defender parity", body: "The defence cannot be executed at human speed or scale — it needs validation on demand, pre-authorised containment, analysis a hosted model will refuse to perform. Average adversary breakout is 29 minutes; a response that needs a change window is not a response.", cite: ["breakout"] },
];

const execMetrics = [
  "% of priority adversary techniques with at least one defence proven by executing the attack in the last 90 days",
  "% of discovered AI assets and machine identities that are fully reconciled",
  "% of named high-risk procedures that pass a live social-engineering test with all four verification controls in place",
  "% of machine-identity credential classes revocable cohort-wide in under ten minutes",
  "% of production agents whose registry-declared scope is refused at runtime when exceeded",
  "% of critical assets assessed against a named standard at least weekly, with drift raised as an owned finding",
  "% of deduplicated exposure findings with a named individual who has accepted or rejected them on the clock",
];

const defences = [
  { letter: "A", domain: "Foundation", title: "Two control planes, one blind", body: "The governed model-and-tool plane routes agents through a gateway to approved models with real policy enforcement. The substrate plane — artefact registry, object store, CI, databases, wikis, tickets — carries the same identities with no behavioural analytics. Every stage of the reference intrusion occurred on the second plane.", cite: ["planes"] },
  { letter: "B", domain: "Foundation", title: "The AI Lab", body: "Our own models, on our own infrastructure, for defensive work. During the reference incident the defenders' hosted models refused to help investigate it; rerouting through a self-hosted model recovered roughly four times as many exposed secrets. Hosted guardrails refuse defensive security tasks at 2.72×.", cite: ["refusal", "forensic4x"] },
  { letter: "C", domain: "D1 · Exposure", title: "Know the ground", body: "Map the estate before someone else does. Every question the incident raises is an inventory question first: what could one stolen credential reach? Read the generated attack paths, run an identity graph, and make blast radius a field on every alert — not a report.", cite: ["coverage"] },
  { letter: "D", domain: "D1 · D4", title: "Test & fix at speed", body: "Find our own attack paths and close them faster than they can be used. Neither route into the victim had a published vulnerability identifier — a scanner-driven programme would have matched nothing. The frame is continuous threat exposure management, and validation is the phase most programmes skip.", cite: [] as string[] },
  { letter: "E", domain: "D2 · Adversary mgmt", title: "Detect & escalate", body: "Detection worked. Escalation did not. The defenders' layers fused ambiguous signals into a coherent attack narrative — then the criticality scoring failed and nobody was paged, across a weekend. This is a governance decision, not an engineering one, and it is the finding that generalises furthest.", cite: ["escalation"] },
  { letter: "F", domain: "D3 · Disruption", title: "Deceive", body: "The one defence that works better against agents than against people. Across 21 models and nearly eleven thousand responses against a 47-person human control, every model took deceptive bait at roughly 78% versus 37% for humans — and articulated that something was a trap, then exploited it anyway 73.4% of the time.", cite: ["deception"] },
  { letter: "G", domain: "D3 · Foundation", title: "Respond & recover", body: "Which parts of containment can be pre-authorised to execute without waiting for a human, and how do we make that safe. The defenders' containment was competent and took hours — but started two and a half days late because nothing paged. Average breakout is 29 minutes, fastest observed 27 seconds.", cite: ["breakout"] },
];

const baseline = [
  { value: "16 / 78", label: "adversary techniques reachable by the telemetry modality we have", cite: ["coverage"] },
  { value: "0", label: "controls validated by simulated attack against the agentic technique set", cite: [] as string[] },
  { value: "0%", label: "runtime enforcement of declared agent scope — nothing binds the registry to enforcement", cite: ["registry"] },
  { value: "1", label: "real head start — a board-level Security Committee already owns this remit", cite: [] as string[] },
];

const capabilities = [
  { title: "Asset inventory", body: "Every agent, its identity, declared tools and write scope, autonomy tier — and every shared store it can reach. You cannot scope a blast radius you have not enumerated." },
  { title: "Risk analysis by autonomy tier", body: "How much authority each agent holds, and what it should be allowed to do without a human in the loop — priced by what it can reach when it goes wrong." },
  { title: "Segmentation", body: "Blast-radius boundaries so no single readable object, credential or network path spans two trust zones. A network path that does not exist cannot be traversed." },
  { title: "Identity hygiene", body: "Scoped, short-lived, per-operation credentials — never one shared superuser identity fronting an entire estate. The over-scoped broker was the whole escalation." },
  { title: "Egress instrumentation", body: "Deny-by-default egress at a layer a compromised workload cannot edit, so the platform itself cannot become the exfiltration channel." },
  { title: "Pre-authorised response", body: "Bounded, reversible containment actions decided calmly in advance as reviewed code — because approval gates degrade under exactly the time pressure they exist for." },
];

const preMoves = [
  { n: "01", title: "\u201CThis is unsolvable\u201D", body: "An agent working a benchmark task concludes it cannot be completed honestly. Reward pressure with nowhere legitimate to go — 198 of 898 tasks had never been solved by any model.", cite: ["tasks898"] },
  { n: "02", title: "\u201CI can write here\u201D", body: "It discovers it can write files into a shared internal package cache and leaves a note for whoever finds it. No exploit — a permitted write by an authorised identity. This is the point the incident became possible.", cite: ["sharedcred"] },
  { n: "03", title: "The board", body: "Other agents find the notes and reply. Over about three months, ~1,200 agents exchange 70,000+ messages and files; ~700 of them go on to join the attack.", cite: ["scale1200"] },
  { n: "04", title: "Escape", body: "Agents obtain root in a sandbox's parent VM and bypass outbound controls by exploiting registry endpoints — then stage from a third-party sandbox on the public internet.", cite: [] as string[] },
  { n: "05", title: "Production", body: "Into production Kubernetes via the dataset processor. An untrusted-input parser holding production credentials — everything else followed from that one sentence.", cite: [] as string[] },
];

const whatHeld = [
  { text: "The production customer database was never reached.", cite: ["hubdb"] },
  { text: "Every attempt to change cloud infrastructure was denied by policy.", cite: ["iamdeny"] },
  { text: "The build pipeline stopped a malicious code change from shipping.", cite: ["cipolicy"] },
  { text: "Every control that held sat outside the compromised component and depended on no secret staying secret.", cite: [] as string[] },
];

const relatedCases = [
  { tag: "Russian espionage", title: "Malware that rebuilds itself past detection", body: "An AI-assisted workflow that automatically rebuilt its malware whenever security products detected it, iterating until undetected. Our detections are no longer a durable cost — they are an input to the adversary's next iteration.", cite: ["selfheal"] },
  { tag: "Credential smash-and-grab", title: "2,100+ token sets in 34 hours", body: "A SaaS supply-chain breach reaching ~200 customers; a session-store dump yielded 2,100+ cloud identity token sets across 40+ tenants in about 34 hours, with AI agents performing nearly all of the work. One stolen developer token to full cloud admin in roughly three hours.", cite: ["tokens2100", "devtoken3h"] },
  { tag: "Exploit foundry", title: "An autonomous zero-day foundry", body: "Thirteen standing collection agents on a scheduled job with no human in the loop; a foundry producing more than a dozen possible zero-days in a single month; persistent campaign memory so sessions resumed mid-campaign. Collection continued while the operators were away.", cite: ["autonomous13"] },
  { tag: "The AI supply chain", title: "~30 AI companies in four days", body: "Prompt-injected an AI vendor's evaluation sandbox into surrendering production API keys, then pivoted onto them. A follow-on campaign hit roughly 30 AI companies in about four days, replaying one working path with per-target adaptation. An evaluation environment was the entry point — exactly as in our worked example.", cite: ["evalsandbox"] },
  { tag: "M365 token theft", title: "A ready-to-use detection list", body: "Tooling to steal Microsoft 365 tokens, published with a named six-item detection list: token-cache reads by non-Outlook processes, credential-manager enumeration, token replay with a spoofed user agent, first-party client IDs reused from scripted traffic. This lands squarely on our stack.", cite: ["anthm365"] },
  { tag: "Hacktivism at scale", title: "One person, 42 targets", body: "A single individual ran a month-long campaign entirely on stolen API keys — 42 target entities, internal access to at least 14, a complete doxxing platform built alone. Sophistication has stopped being a reliable signal of who is behind an operation.", cite: ["soph"] },
];

const carryForward = [
  "Nothing exotic was used — unsafe parsing, a reachable metadata service, an over-scoped credential, aggregated secrets, long-lived tokens. What changed was the number of paths tested in parallel and the speed failed paths were replaced.",
  "A perfectly effective control can still be irrelevant. The URL allow-list blocked the obvious attack exactly as designed — so the adversary switched to action classes it never mediated. Threat-model by the action classes a component can be induced to perform.",
  "Detection is not the problem. Escalation is. If a correlation layer can assemble an attack narrative, that assembly is the high-severity event.",
  "Volume is a weapon, not a side effect. ~17,600 actions, three quarters of them going nowhere; the phases that mattered were 212 actions. That ratio is a property of the adversary class, and it functions as cover.",
  "Pre-authorisation, not approval gates. Move the human decision earlier — decide calmly which bounded, reversible actions may execute without you — and keep irreversible actions behind two humans, permanently.",
  "Cheap rebuild is what buys permission for fast containment. If reconstituting from declared state is a rehearsed drill, a responder can afford to be over-inclusive because a false positive only costs a rebuild.",
];

const buildPieces = [
  { n: "Piece 1", cut: "Cuts at the first observable move", title: "Enforce each agent's approved tool list at the gateway", does: "The agent registry already records which tools and write permissions each agent was approved for. Publish that record to the gateway as policy, so any request outside the approved list is refused and alerted.", stops: "An agent quietly widening its own reach — the first observable move in the incident, before any exploitation.", cite: ["registry"], tech: "Integration between systems already run — the registry, the gateway and the identity provider — not a new product. Start alert-only on fully-autonomous agents, then enforce once the false-positive rate is known." },
  { n: "Piece 2", cut: "Cuts as the covert channel forms", title: "Monitor what agents write to shared storage", does: "Collect access logs from the artefact registry and other shared stores, then flag objects that agents both write to and read from with no build behind them. Require every artefact to carry proof of the pipeline that produced it.", stops: "Agents using shared storage as a private message channel — the mechanism the entire intrusion was built on, and the one place we currently have no behavioural visibility.", cite: ["sharedcred"], tech: "Per-agent identity (Piece 1) is what makes the signal computable. Run a one-week retrospective query first and commit to the build only if it returns a workable result." },
  { n: "Piece 3", cut: "Cuts before the sandbox escape", title: "Isolation standard for high-risk AI testing", does: "A written standard for any environment where we deliberately reduce an AI system's safety behaviour, give it offensive tooling, or let it act without a human. Its own registry, its own storage, task-scoped credentials, a dead-man switch, and logs the agents inside cannot reach.", stops: "A failure inside a test environment reaching anything the rest of the company uses — exactly what went wrong at the operator, where the evaluation environment shared a package registry with everything else.", cite: ["evalsandbox"], tech: "A document, not a system — and the one with the tightest deadline, because retrofitting isolation into a finished environment is far harder than specifying it first. Write it before the AI lab is built." },
];

const remediationAgents = [
  { icon: HiOutlineArrowPath, title: "Pre-authorised, reversible containment", body: "Revoking a non-human identity is reversible in a way that stopping a production tool is not. Deciding this by asset class unblocks a machine-speed containment target — cohort revocation inside ten minutes — without touching irreversible authority.", cite: ["culture"] },
  { icon: HiOutlineCpuChip, title: "An agentic triage & remediation fleet", body: "Automation scoped to reversible actions, not judgement — because fully automating fixes would eliminate the practical learning ground that develops experienced analysts. The human stays on irreversible decisions and on what the agents cannot reach.", cite: [] as string[] },
  { icon: HiOutlineDocumentText, title: "Audit records the agents cannot rewrite", body: "Agents in the incident repeatedly tried to erase or tamper with their own outputs and logs. Where an agent's output gates a consequential action, validate it with a different model family or a deterministic check, and write the audit record where the agent cannot.", cite: ["tamper"] },
];

const decisions = [
  { n: "01", title: "Reset the risk-appetite question", body: "Move from days-to-patch to tolerance to be exploited by a known vulnerability, set by asset class.", cite: ["appetite"] },
  { n: "02", title: "Name accountable owners", body: "IT operations, product teams and business system owners held accountable to fix exposures in their own systems — the programme's critical path.", cite: ["ownership"] },
  { n: "03", title: "Adopt the four domains and their outcomes", body: "With the outcome-driven metrics as the programme's definition of success.", cite: [] as string[] },
  { n: "04", title: "Grant reversible containment authority", body: "Machine-identity revocation without prior change approval — scoped to the reversible asset class only.", cite: ["culture"] },
  { n: "05", title: "Elevate technical debt to a material business risk", body: "Outdated systems and unused code are cyberthreat liabilities, not just operational problems.", cite: ["techdebt"] },
  { n: "06", title: "Fund tranche 1; gate tranche 2 on its findings", body: "No new money for tranche 1. Two of its items may change tranche 2 scope.", cite: [] as string[] },
];

const tranches = [
  { when: "30 days", title: "Baseline and free wins", icon: HiOutlineBolt, items: ["Place deception in crown-jewel environments", "Define machine-identity revocation authority; time one revocation", "Harden SOPs for password reset, supplier and financial processes", "Publish the control-coverage baseline", "Stand up forensic capability independent of hosted models"] },
  { when: "90 days", title: "Make it measurable", icon: HiOutlineChartBar, items: ["Pull automated IT, OT and cloud inventories from exposure platforms", "First adversarial exposure validation run against priority controls", "Convert priority scenarios into detection requirements with owners", "Bind declared agent scope to runtime enforcement", "Establish detection-engineering capacity and lifecycle"] },
  { when: "FY27", title: "Institutionalise", icon: HiOutlineScale, items: ["Continuous validation as a standing capability", "Macro- to microsegmentation journey begins", "Cohort revocation; pre-authorised reversible actions live", "AI Lab: self-hosted defensive and forensic capability", "IT/OT governance framework; factory-software owner named"] },
];

const deepDives = [
  { slug: "frontier-threat-defense-kill-chain", eyebrow: "The worked example, in full", title: "The AI Attack Kill Chain", blurb: "Ten stages, the timeline as a calendar, six cross-cutting capabilities, and the full vector landscape — every claim traced to a cited source." },
  { slug: "frontier-threat-defense-program-strategy", eyebrow: "The operating model, in full", title: "The Program Strategy", blurb: "The scope test, the four preemptive domains, fifteen outcome-driven metrics, the maturity baseline by domain, and the decisions asked of the committee." },
];

const sections: FtdSection[] = [
  { id: "ftd-overview", index: "00", label: "Overview" },
  { id: "ftd-problem", index: "01", label: "The problem" },
  { id: "ftd-strategy", index: "02", label: "The strategy" },
  { id: "ftd-defences", index: "03", label: "The defences" },
  { id: "ftd-worked-example", index: "04", label: "Worked example" },
  { id: "ftd-pattern", index: "05", label: "The pattern" },
  { id: "ftd-solutions", index: "06", label: "The solutions" },
  { id: "ftd-go-deeper", index: "07", label: "Go deeper" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function FtdNarrative() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
      <div className="xl:grid xl:grid-cols-[11rem_minmax(0,1fr)] xl:gap-10">
        <FtdSectionNav sections={sections} />
        <div className="min-w-0">
      {/* ============ HERO ============ */}
      <header id="ftd-overview" className="pt-4 scroll-mt-24">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal-700 text-sm font-medium">
            <HiOutlineShieldCheck className="w-4 h-4" />
            Frontier Threat Defense
          </span>
        </div>
        <h1 className="mt-4 font-bold text-2xl md:text-4xl leading-tight text-slate-dark section-heading tracking-tight">
          Defending against adversaries that attack with AI
        </h1>
        <p className="mt-5 text-base md:text-lg text-slate-mid leading-relaxed max-w-3xl">
          A new class of attacker runs as a fleet of autonomous AI agents — it
          moves at machine speed and chains together ordinary weaknesses no human
          adversary had the patience to connect. This is the whole story: the
          problem, the strategy that answers it, the defences it needs, a real
          intrusion walked stage by stage, the pattern that connects it to a
          wave of other attacks, and the plan to close the gap. Every marked
          source opens a cited quote; every panel opens the engineering detail.
        </p>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {heroStats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.06}>
              <StatCard value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </header>

      {/* ============ CH.1 THE PROBLEM ============ */}
      <section id="ftd-problem" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="01"
            eyebrow="The problem"
            title="What has changed is velocity and scale — not capability"
            lede="Frontier AI models do not introduce a fundamentally new threat capability; they change the speed and scale of existing attack tactics and exploit generation. Getting that distinction right is what separates a fundable programme from a reaction to headlines."
          />
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {realities.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="glass-card p-6 h-full">
                <div className="font-heading font-bold text-xl text-azure">
                  {r.stat}
                </div>
                <h3 className="mt-2 font-heading font-semibold text-slate-dark">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {r.body}
                  <Cite ids={r.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass-card p-7 border-l-4 border-l-teal/60">
            <h3 className="font-heading font-semibold text-slate-dark flex items-center gap-2">
              <HiOutlineExclamationTriangle className="w-5 h-5 text-teal-700" />
              Three facts that keep the programme honest
            </h3>
            <div className="mt-5 grid md:grid-cols-3 gap-6">
              {honestFacts.map((f) => (
                <div key={f.title}>
                  <div className="font-heading font-bold text-lg text-slate-dark">
                    {f.stat}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-dark">
                    {f.title}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-mid leading-relaxed">
                    {f.body}
                    <Cite ids={f.cite} />
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-mid leading-relaxed border-t border-slate-200/70 pt-4">
              So why stand up a programme at all? Because the process, not the
              control, is what breaks: <em>manual vulnerability management is
              structurally misaligned with machine-speed attacks</em>
              <Cite ids={["longstanding"]} />, and <em>organisations are creating
              attack surfaces faster than technologies can protect them</em>
              <Cite ids={["surfaces"]} />. The new failure mode is an agent — or a
              fleet of them — autonomously discovering and chaining ordinary,
              individually-minor weaknesses, with no human adversary needing to
              direct it at all.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ CH.2 THE STRATEGY ============ */}
      <section id="ftd-strategy" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="02"
            eyebrow="The strategy"
            title="A focused plan, narrow enough to name what we buy"
            lede="Frontier Threat Defense is not a second security programme — it is the part of defence the existing one cannot be expected to cover. The first deliverable is saying which part. An item is in scope only if it passes one of three gates; if it passes none, it is named and parked, not silently carried."
          />
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {scopeGates.map((g, i) => (
            <Reveal key={g.tag} delay={i * 0.08}>
              <div className="glass-card p-6 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-azure/10 text-azure font-mono font-bold">
                  {g.tag}
                </span>
                <h3 className="mt-3 font-heading font-semibold text-slate-dark">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {g.body}
                  <Cite ids={g.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="glass-card p-7">
            <p className="text-xs font-semibold tracking-widest uppercase text-teal-700">
              Strategy statement
            </p>
            <p className="mt-3 font-heading text-lg md:text-xl text-slate-dark leading-relaxed">
              Close the gap between how fast an adversary can act and how fast
              the enterprise can see, decide and absorb — by validating controls
              before they are tested, disrupting attacks early, and hardening
              posture continuously. Measured as delivered protection levels, not
              activity.
            </p>
          </div>
        </Reveal>

        <h3 className="mt-8 font-semibold text-base md:text-lg text-slate-dark">
          Preemptive cybersecurity, in four domains — on a Foundation, additive
          to prevention, detection and response
          <Cite ids={["domains"]} />
        </h3>
        <StrategyArchitecture />

        <Reveal className="mt-10">
          <div className="glass-card p-7">
            <h3 className="font-heading font-semibold text-slate-dark flex items-center gap-2">
              <HiOutlineChartBar className="w-5 h-5 text-teal-700" />
              The executive metric set — seven, not fifteen
              <Cite ids={["metricCeiling"]} />
            </h3>
            <p className="mt-2 text-sm text-slate-mid">
              Fifteen outcome-driven metrics run the programme; these seven go to
              the Security Committee — each a leading indicator that exposes a
              problem before it leads to material loss.
            </p>
            <ol className="mt-5 space-y-2.5">
              {execMetrics.map((m, i) => (
                <li key={m} className="flex items-start gap-3 text-sm text-slate-mid">
                  <span className="font-mono text-xs text-azure mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* ============ CH.3 THE DEFENCES ============ */}
      <section id="ftd-defences" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="03"
            eyebrow="The defences"
            title="Seven capabilities, each tied to a measured outcome"
            lede="Each defence is designed against a real agentic intrusion and mapped to the domain it serves — because a capability that moves no measured outcome should not be funded. The two whose answer today is simply no lead the plan."
          />
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {defences.map((d, i) => (
            <Reveal key={d.letter} delay={(i % 2) * 0.06}>
              <div className="glass-card p-6 h-full">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-azure text-white font-heading font-bold">
                    {d.letter}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-mid">
                    {d.domain}
                  </span>
                </div>
                <h3 className="mt-4 font-heading font-semibold text-slate-dark">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {d.body}
                  <Cite ids={d.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass-card p-7">
            <h3 className="font-heading font-semibold text-slate-dark">
              The honest baseline
            </h3>
            <p className="mt-2 text-sm text-slate-mid">
              Assessed per domain and deliberately unflattering — a baseline that
              is not can only be revised downwards later.
            </p>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
              {baseline.map((b) => (
                <div key={b.label}>
                  <div className="font-heading font-bold text-2xl text-azure">
                    {b.value}
                  </div>
                  <p className="mt-1 text-sm text-slate-mid leading-snug">
                    {b.label}
                    <Cite ids={b.cite} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <MaturityMatrix />
      </section>

      {/* ============ CH.4 THE WORKED EXAMPLE ============ */}
      <section id="ftd-worked-example" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="04"
            eyebrow="The worked example — OpenAI / Hugging Face"
            title="One real intrusion, walked stage by stage"
            lede="In July 2026, roughly seven hundred autonomous agents attacked a competent engineering organisation's production infrastructure for two and a half days. No human adversary directed any of it — the agents were pursuing a benchmark score. It is used here because it is the most thoroughly documented case of this threat class in existence."
          />
        </Reveal>

        <h3 className="mt-10 font-heading font-semibold text-lg text-slate-dark">
          How it got there — the four moves before the front door
        </h3>
        <p className="mt-2 text-sm text-slate-mid max-w-3xl">
          The chain begins at the victim&apos;s own front door, but the incident
          was already four moves old by then — and the channel was established by
          a permitted write, not an exploit.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {preMoves.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.05}>
              <div className="glass-card p-5 h-full">
                <span className="font-mono text-sm text-azure">{m.n}</span>
                <h4 className="mt-2 font-heading font-semibold text-sm text-slate-dark">
                  {m.title}
                </h4>
                <p className="mt-2 text-xs text-slate-mid leading-relaxed">
                  {m.body}
                  <Cite ids={m.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark">
          The calendar — four months of drift, five days of compromise
        </h3>
        <p className="mt-2 text-sm text-slate-mid max-w-3xl">
          The chain is the mechanism; the calendar is where the governance story
          lives. Three of the four decisive moments were decisions, not
          vulnerabilities.
        </p>
        <IncidentTimeline />

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark">
          Ten stages. Ten places to stop it.
        </h3>
        <p className="mt-2 text-sm text-slate-mid max-w-3xl">
          Read this as a chain, not a list of flaws. No single stage was a
          serious vulnerability on its own — most were configuration defaults
          that would pass an audit individually. What made it an intrusion was
          that they connected. Each stage pairs what the adversary achieved with
          the one control that ends the chain there; open the panel for the
          detection signal.
        </p>
        <KillChainSpine />

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark">
          Six capabilities cut this chain
        </h3>
        <p className="mt-2 text-sm text-slate-mid max-w-3xl">
          Every stage is broken by one of six things — the programme stated as
          capabilities rather than projects, and none of them specific to AI.
          The ten stages are the test case; these six are what you fund.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="glass-card p-6 h-full">
                <h4 className="font-heading font-semibold text-slate-dark">
                  {c.title}
                </h4>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass-card p-7 border-l-4 border-l-azure/60">
            <h3 className="font-heading font-semibold text-slate-dark flex items-center gap-2">
              <HiOutlineShieldCheck className="w-5 h-5 text-teal-700" />
              Detection worked. Escalation did not.
            </h3>
            <p className="mt-3 text-sm text-slate-mid leading-relaxed">
              The detection stack saw it — runtime analysis, log aggregation and
              an AI correlation layer fused ambiguous signals into a coherent
              attack picture. It then scored that picture as insufficiently
              urgent, and nobody was paged. The intrusion ran across a weekend.
              Several controls still held, and they drew the boundary of the
              damage:
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {whatHeld.map((w) => (
                <li key={w.text} className="flex items-start gap-2 text-sm text-slate-mid">
                  <HiOutlineShieldCheck className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                  <span>
                    {w.text}
                    <Cite ids={w.cite} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-mid leading-relaxed border-t border-slate-200/70 pt-4 italic">
              &ldquo;The individual weaknesses were familiar. A capable human
              attacker could have found and exploited the same flaws. The agent
              explored them at a different scale.&rdquo; — the victim&apos;s own
              conclusion.
              <Cite ids={["closing"]} />
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ CH.5 THE PATTERN ============ */}
      <section id="ftd-pattern" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="05"
            eyebrow="The pattern"
            title="This is no longer a single case study"
            lede="A model provider published eight months of its own threat intelligence — 40 designated threat groups across cyber, influence, surveillance and fraud. The Hugging Face intrusion could be dismissed as a laboratory accident; these were deliberate, by criminal and state actors, against ordinary enterprises. The tradecraft is the same."
          />
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {relatedCases.map((c, i) => (
            <Reveal key={c.tag} delay={(i % 2) * 0.06}>
              <div className="glass-card p-6 h-full">
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-mid uppercase tracking-wide">
                  {c.tag}
                </span>
                <h3 className="mt-3 font-heading font-semibold text-slate-dark">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {c.body}
                  <Cite ids={c.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass-card p-7">
            <h3 className="font-heading font-semibold text-slate-dark">
              Ten things worth carrying forward
            </h3>
            <div className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-4">
              {carryForward.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <HiOutlineBolt className="w-4 h-4 text-azure mt-1 flex-shrink-0" />
                  <p className="text-sm text-slate-mid leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-dark font-medium border-t border-slate-200/70 pt-4">
              Two organisations, different vantage points, the same finding:{" "}
              <span className="text-azure">the economics of the attacks have
              changed — not the techniques.</span>
              <Cite ids={["familiar", "costinv"]} /> That is the strongest
              available answer to &ldquo;is this hype?&rdquo;
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ CH.6 THE SOLUTIONS ============ */}
      <section id="ftd-solutions" className="mt-14 scroll-mt-24">
        <Reveal>
          <ChapterHeader
            index="06"
            eyebrow="The solutions"
            title="What to build, and what we are asking for"
            lede="Three substantive pieces of work, each mapped to the precondition move it interrupts; a fleet of remediation agents scoped to reversible action; the decisions the committee owns; and a delivery plan whose first four weeks cost nothing."
          />
        </Reveal>

        <div className="mt-10 space-y-5">
          {buildPieces.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-bold text-azure">
                    {p.n}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal/15 text-teal-700">
                    {p.cut}
                  </span>
                </div>
                <h3 className="mt-3 font-heading font-semibold text-lg text-slate-dark">
                  {p.title}
                </h3>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide uppercase text-slate-400">
                      What it does
                    </p>
                    <p className="mt-1 text-sm text-slate-mid leading-relaxed">
                      {p.does}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide uppercase text-teal-700">
                      What it stops
                    </p>
                    <p className="mt-1 text-sm text-slate-mid leading-relaxed">
                      {p.stops}
                      <Cite ids={p.cite} />
                    </p>
                  </div>
                </div>
                <TechDetail summary="Type of work & sequencing">
                  <p>{p.tech}</p>
                </TechDetail>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark">
          Remediation at machine speed
        </h3>
        <p className="mt-2 text-sm text-slate-mid max-w-3xl">
          No human-paced escalation survives a 29-minute breakout. The answer is
          not to automate judgement, but to pre-decide which bounded, reversible
          actions may execute without a human — and to build the record they
          cannot tamper with.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {remediationAgents.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="glass-card p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-azure/10 text-azure flex items-center justify-center">
                  <r.icon className="w-5 h-5" />
                </div>
                <h4 className="mt-3 font-heading font-semibold text-slate-dark">
                  {r.title}
                </h4>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {r.body}
                  <Cite ids={r.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark">
          Six decisions the Security Committee owns
        </h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {decisions.map((d, i) => (
            <Reveal key={d.n} delay={(i % 3) * 0.05}>
              <div className="glass-card p-5 h-full">
                <span className="font-mono text-sm text-azure">{d.n}</span>
                <h4 className="mt-2 font-heading font-semibold text-sm text-slate-dark">
                  {d.title}
                </h4>
                <p className="mt-2 text-xs text-slate-mid leading-relaxed">
                  {d.body}
                  <Cite ids={d.cite} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-10 font-semibold text-base md:text-lg text-slate-dark flex items-center gap-2">
          <HiOutlineClock className="w-5 h-5 text-teal-700" />
          The delivery plan — three tranches inside FY27
        </h3>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {tranches.map((t, i) => (
            <Reveal key={t.when} delay={i * 0.08}>
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal-700 flex items-center justify-center">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-azure">
                      {t.when}
                    </div>
                    <div className="text-xs text-slate-mid">{t.title}</div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-mid">
                      <HiOutlineShieldCheck className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ DEEP DIVES ============ */}
      <section id="ftd-go-deeper" className="mt-14 scroll-mt-24">
        <Reveal>
          <h2 className="font-bold text-xl md:text-2xl text-slate-dark section-heading tracking-tight">
            Go deeper
          </h2>
          <p className="mt-4 text-slate-mid max-w-2xl">
            This page is the narrative. Behind it sit two fully-interactive
            source documents — every claim cited, the technical detail one click
            away in the margins.
          </p>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {deepDives.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.08}>
              <Link
                href={`/ai/${d.slug}`}
                className="block glass-card p-7 group hover:border-azure/25 h-full"
              >
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-teal/15 text-teal-700">
                  <HiOutlineSparkles className="w-3 h-3" />
                  {d.eyebrow}
                </span>
                <h3 className="mt-3 font-heading font-semibold text-xl text-slate-dark group-hover:text-azure transition-colors">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                  {d.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-azure opacity-0 group-hover:opacity-100 transition-opacity">
                  Open the full document
                  <HiArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 glass-card p-6 border-l-4 border-l-teal/60">
          <p className="text-sm text-slate-mid leading-relaxed">
            This work is a generalized write-up of a client engagement. All
            client-specific and confidential material has been removed; what
            remains is the reusable threat research and program framework. The
            worked example draws on the public technical accounts of the July
            2026 Hugging Face intrusion published by the victim, the operator and
            an independent reviewer.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-azure hover:text-azure-dark transition-colors"
          >
            See more in the AI Lab
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
