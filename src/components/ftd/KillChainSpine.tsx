"use client";

import { Cite, TechDetail, Reveal } from "./FtdPrimitives";
import { HiOutlineBolt } from "react-icons/hi2";

interface Stage {
  n: string;
  title: string;
  achieved: string;
  stops: string;
  detection: string;
  achievedCite?: string[];
  stopsCite?: string[];
  quickFix?: boolean;
}

const stages: Stage[] = [
  {
    n: "01",
    title: "Reconnaissance against the public surface",
    achieved:
      "Found working platform credentials already published on the open internet, created accounts, and began requesting access to restricted datasets.",
    stops:
      "Credentials that expire on their own and are bound to an issuing context — plus decoy credentials that page on first use.",
    detection:
      "Bot and origin detection did fire here — but it was read as abuse telemetry, not intrusion signal. The signal existed; the interpretation did not.",
  },
  {
    n: "02",
    title: "Untrusted input reaches a privileged parser",
    achieved:
      "A stranger's uploaded file made a production service hand over its own credentials and source code — with no code executing at all.",
    stops:
      "The parsing tier holds no production credentials. If the environment contains nothing of value, a file-read oracle yields nothing of value. This single control removes nine later stages.",
    detection:
      "The URL allow-list that existed covered fetch. Nothing covered local file read or execute — so the adversary simply switched to the action class the control never mediated.",
    stopsCite: ["allowlist"],
    quickFix: true,
  },
  {
    n: "03",
    title: "The parser becomes an execution engine",
    achieved:
      "A second malicious file made the same service run the adversary's code, then poll a public dataset every five seconds for instructions — so command-and-control looked like ordinary product traffic.",
    stops:
      "Never evaluate a data field as an instruction; sandbox any template engine touching untrusted input. Give dependency currency a service level — the fix had already shipped upstream.",
    detection:
      "The upstream fix shipped three and a half weeks earlier, as an unlabelled changelog line with no advisory — so patch cadence keyed to CVE severity would never have prioritised it.",
  },
  {
    n: "04",
    title: "A foothold becomes a cluster identity",
    achieved:
      "The compromised container asked the cloud platform who it was and received the host machine's identity — far more powerful than its own. It was the default left in place.",
    stops:
      "Block containers from the cloud metadata service — the single highest-value fix in the chain — plus workload identity instead of host identity.",
    detection:
      "Three independent detections existed here, all near-zero false positive: a container reaching the metadata IP, a node-identity token minted from a pod, and an anomalous caller for the cluster API.",
    stopsCite: ["imds"],
    quickFix: true,
  },
  {
    n: "05",
    title: "A container becomes root on the machine",
    achieved:
      "Nothing refused to start a container with full access to the host, so the adversary took root — then built a fleet across eleven machines that respawned faster than it could be deleted.",
    stops:
      "An admission policy that refuses privileged containers outright. The cheapest high-value item in the whole incident — it needs no engineering.",
    detection:
      "The clearest detection opportunity in the chain: a privileged container has no benign interpretation in this estate and should page unconditionally.",
    stopsCite: ["admission"],
    quickFix: true,
  },
  {
    n: "06",
    title: "One secret store becomes the whole estate",
    achieved:
      "A single stored object held 136 keys. One read produced the network key and the cluster credential everything afterwards depended on — in the victim's words, everything that follows descends from it.",
    stops:
      "Segment secrets along blast-radius boundaries, so no single readable object spans two trust zones. Issue per-operation, not per-cluster.",
    detection:
      "Mass secret enumeration — one identity reading an entire secret store in seconds — is one of the cleanest audit detections that exists.",
    achievedCite: ["secret136"],
  },
  {
    n: "07",
    title: "The access broker becomes administrator everywhere",
    achieved:
      "One shared credential was administrator on every cluster it fronted, and the broker handed its full inventory to a single anonymous caller. Two clusters compromised within one second.",
    stops:
      "One scoped credential per cluster — never one shared across all — and no automation ever bound to a superuser group.",
    detection:
      "One second is faster than any human response, which is why this stage belongs to pre-authorised automated containment rather than to an on-call page.",
    achievedCite: ["broker"],
  },
  {
    n: "08",
    title: "The corporate network becomes the adversary's own",
    achieved:
      "A reusable network key let an internet-hosted container join the corporate network as a trusted peer — 181 devices enrolled, traffic routed through the victim's own gateways, logging suppressed.",
    stops:
      "Joining the network requires device attestation and approval, not merely possession of a key. Plus egress default-deny at a layer a compromised workload cannot edit.",
    detection:
      "181 enrolments against a mesh with ~22 visible peers is an order-of-magnitude anomaly — and the deliberate log suppression is itself a high-fidelity signal.",
    achievedCite: ["egress"],
  },
  {
    n: "09",
    title: "Stolen keys become minted identity",
    achieved:
      "Obtained a signing key — so it could issue its own valid credentials on demand, indistinguishable from real ones. This is the point revoking credentials stops working.",
    stops:
      "Signing keys that cannot be exported from the hardware or service holding them. If signing happens behind an interface that never discloses the key, this stage is impossible.",
    detection:
      "Honest assessment: a correctly forged token looks correct. Detection here is indirect at best — which is why the control has to be architectural, not observational.",
    achievedCite: ["signkey"],
  },
  {
    n: "10",
    title: "The platform itself becomes the exfiltration channel",
    achieved:
      "Reached source control, opened a disguised change to attack the build pipeline, and exfiltrated using no attacker infrastructure at all — it rode the victim's own product in both directions.",
    stops:
      "The build pipeline's execution policy held and stopped the worst outcome. The control has to sit on the product's own write path — network monitoring could not have helped.",
    detection:
      "Fan-out breadth is the signal: one internal service publishing to 100+ distinct external endpoints is anomalous regardless of what each individual request looks like.",
    stopsCite: ["cipolicy"],
  },
];

const readoff = [
  { value: "10", label: "stages, from reconnaissance to exfiltration through the victim's own product", cite: undefined as string[] | undefined },
  { value: "30 days", label: "the cheapest fix — an admission policy refusing privileged containers (stage 05), no engineering", cite: ["admission"] },
  { value: "1 second", label: "fastest escalation — one credential to administrator on two clusters (stage 07)", cite: ["broker"] },
  { value: "8", label: "ordinary controls that held and drew the boundary of the damage", cite: undefined },
];

export default function KillChainSpine() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {readoff.map((r, i) => (
          <Reveal key={r.label} delay={i * 0.05}>
            <div className="glass-card p-4">
              <div className="font-heading font-bold text-xl text-azure">
                {r.value}
              </div>
              <p className="mt-1 text-xs text-slate-mid leading-snug">
                {r.label}
                {r.cite && <Cite ids={r.cite} />}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 relative">
        {/* vertical spine line */}
        <div
          className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-azure/40 via-azure/25 to-teal/40 hidden sm:block"
          aria-hidden
        />
        <ol className="space-y-4">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i, 4) * 0.03}>
              <li className="relative sm:pl-14">
                {/* node */}
                <span
                  className={`hidden sm:flex absolute left-0 top-4 items-center justify-center w-10 h-10 rounded-xl font-mono font-bold text-sm ring-4 ring-white ${
                    s.quickFix
                      ? "bg-teal text-white"
                      : "bg-slate-dark text-white"
                  }`}
                >
                  {s.n}
                </span>
                <div className="glass-card p-5">
                  <div className="flex items-start gap-3">
                    <span className="sm:hidden inline-flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg bg-slate-dark text-white font-mono font-bold text-sm">
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading font-semibold text-slate-dark">
                          {s.title}
                        </h4>
                        {s.quickFix && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-teal/15 text-teal-700">
                            <HiOutlineBolt className="w-3 h-3" />
                            30-day fix
                          </span>
                        )}
                      </div>
                      <div className="mt-3 grid md:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-red-50/70 border border-red-100 p-3">
                          <p className="text-[11px] font-semibold tracking-wide uppercase text-red-700/80">
                            What the adversary achieved
                          </p>
                          <p className="mt-1 text-sm text-slate-mid leading-relaxed">
                            {s.achieved}
                            {s.achievedCite && <Cite ids={s.achievedCite} />}
                          </p>
                        </div>
                        <div className="rounded-lg bg-teal/10 border border-teal/20 p-3">
                          <p className="text-[11px] font-semibold tracking-wide uppercase text-teal-700">
                            What stops it here
                          </p>
                          <p className="mt-1 text-sm text-slate-mid leading-relaxed">
                            {s.stops}
                            {s.stopsCite && <Cite ids={s.stopsCite} />}
                          </p>
                        </div>
                      </div>
                      <TechDetail summary="Detection signal">
                        <p>{s.detection}</p>
                      </TechDetail>
                    </div>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
