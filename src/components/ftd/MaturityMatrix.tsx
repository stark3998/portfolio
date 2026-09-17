"use client";

import { Cite, Reveal } from "./FtdPrimitives";

interface Row {
  capability: string;
  now: number;
  fy27: number;
  note: string;
  cite?: string[];
}

interface DomainGroup {
  id: string;
  title: string;
  rows: Row[];
}

const groups: DomainGroup[] = [
  {
    id: "D1",
    title: "Exposure management",
    rows: [
      { capability: "Asset & identity discovery", now: 1, fy27: 2, note: "Registry exists but is self-declared" },
      { capability: "Control validation / AEV", now: 1, fy27: 3, note: "Continuous agentic pentest being stood up" },
    ],
  },
  {
    id: "D2",
    title: "Adversary management",
    rows: [
      { capability: "Threat intelligence & scenarios", now: 2, fy27: 3, note: "Strongest existing domain" },
      { capability: "Detection requirements pipeline", now: 0, fy27: 2, note: "No scenario-to-requirement conversion today" },
      { capability: "Deepfake / social-engineering SOPs", now: 0, fy27: 2, note: "The largest gap against the real threat", cite: ["deepfake"] },
    ],
  },
  {
    id: "D3",
    title: "Adversary disruption",
    rows: [
      { capability: "Deception", now: 0, fy27: 2, note: "Nothing placed", cite: ["deception"] },
      { capability: "Machine-identity revocation", now: 0, fy27: 3, note: "No authority, no target time, no rehearsal" },
      { capability: "Threat hunting", now: 1, fy27: 2, note: "Exists, not agent-aware" },
    ],
  },
  {
    id: "D4",
    title: "Posture & policy",
    rows: [
      { capability: "Cloud & AI posture management", now: 1, fy27: 2, note: "Partial; AI-SPM not in place" },
      { capability: "Runtime enforcement of agent scope", now: 0, fy27: 2, note: "Registry is advisory only", cite: ["registry"] },
      { capability: "Segmentation", now: 1, fy27: 2, note: "Macro; microsegmentation is the journey" },
      { capability: "IT/OT governance", now: 0, fy27: 1, note: "A directly-described sector gap" },
    ],
  },
  {
    id: "F",
    title: "Foundation",
    rows: [
      { capability: "Programme governance", now: 2, fy27: 3, note: "Board committee already exists" },
      { capability: "Detection-engineering capacity", now: 1, fy27: 2, note: "Capacity not established" },
      { capability: "Forensic independence", now: 0, fy27: 2, note: "Hosted guardrails refuse defensive work", cite: ["refusal"] },
    ],
  },
];

const milColor = [
  "bg-red-400", // MIL0
  "bg-amber-400", // MIL1
  "bg-azure", // MIL2
  "bg-teal", // MIL3
];

function MilBadge({ level, muted = false }: { level: number; muted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex gap-0.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-1.5 h-3.5 rounded-sm ${
              i <= level
                ? muted
                  ? "bg-slate-300"
                  : milColor[level]
                : "bg-slate-200"
            }`}
          />
        ))}
      </span>
      <span
        className={`font-mono text-xs ${
          muted ? "text-slate-400" : "text-slate-dark font-semibold"
        }`}
      >
        MIL{level}
      </span>
    </span>
  );
}

export default function MaturityMatrix() {
  return (
    <div className="mt-6 glass-card p-6 overflow-hidden">
      <h3 className="font-heading font-semibold text-slate-dark">
        Maturity by domain — assessed now, and the FY27 target
      </h3>
      <p className="mt-2 text-sm text-slate-mid">
        Maturity Indicator Levels run MIL0 (not performed) → MIL3 (guided by
        policy, measured for effectiveness). Deliberately unflattering — a
        baseline that is not can only be revised downwards later.
      </p>

      <div className="mt-5 space-y-5">
        {groups.map((g, gi) => (
          <Reveal key={g.id} delay={gi * 0.04}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-azure">{g.id}</span>
                <span className="font-heading font-semibold text-sm text-slate-dark">
                  {g.title}
                </span>
              </div>
              <div className="mt-2 divide-y divide-slate-200/70">
                {g.rows.map((r) => (
                  <div
                    key={r.capability}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 py-2.5 items-center"
                  >
                    <div className="md:col-span-5">
                      <p className="text-sm text-slate-dark">
                        {r.capability}
                        {r.cite && <Cite ids={r.cite} />}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex items-center gap-2">
                      <MilBadge level={r.now} />
                      <span className="text-slate-300">→</span>
                      <MilBadge level={r.fy27} muted />
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-xs text-slate-mid leading-snug">
                        {r.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200/70 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Now
        </span>
        {["MIL0", "MIL1", "MIL2", "MIL3"].map((l, i) => (
          <span key={l} className="inline-flex items-center gap-1.5 text-xs text-slate-mid">
            <span className={`w-3 h-3 rounded-sm ${milColor[i]}`} />
            {l}
          </span>
        ))}
        <span className="text-xs text-slate-400">
          faded bars → FY27 target
        </span>
      </div>
    </div>
  );
}
