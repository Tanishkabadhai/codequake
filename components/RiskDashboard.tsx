"use client";

import "@xyflow/react/dist/style.css";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  Github,
  GitMerge,
  Network,
  RadioTower,
  RefreshCw,
  ShieldAlert,
  Siren,
  Sparkles,
  TestTube2,
  Zap
} from "lucide-react";
import Image from "next/image";
import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import { useMemo, useState } from "react";
import { analyzeCodequake } from "@/lib/analyzer";
import { bobInsightTemplate, sampleDiff } from "@/lib/sample-data";

type Step = "landing" | "input" | "reasoning" | "results";

const nodeColor = {
  epicenter: "#ffb86b",
  "fault-zone": "#ff4d7d",
  shockwave: "#62f4ff"
};

const reasoningSteps = [
  "Reading repository topology",
  "Detecting architectural fault zones",
  "Tracing shockwave propagation",
  "Generating IBM Bob architecture insight"
];

const bobCapabilities = [
  {
    title: "Repository-wide architecture reading",
    detail: "Bob interprets the codebase as connected systems, not isolated files."
  },
  {
    title: "Fault-zone reasoning",
    detail: "Bob explains why coupling, shared middleware, and critical paths become unstable."
  },
  {
    title: "Cascade-risk explanation",
    detail: "Bob turns dependency topology into human-readable propagation risk."
  }
];

const bobQuestions = [
  "Which modules form the architectural fault zones?",
  "Where can a small change amplify through dependency chains?",
  "Which downstream systems deserve the first stability tests?",
  "How should reviewers explain this risk before merge?"
];

export function RiskDashboard() {
  const [step, setStep] = useState<Step>("landing");
  const [repoUrl, setRepoUrl] = useState("https://github.com/example/enterprise-commerce");
  const [diff, setDiff] = useState(sampleDiff);
  const [bobInsights, setBobInsights] = useState(bobInsightTemplate);
  const [isRequestingBob, setIsRequestingBob] = useState(false);
  const analysis = useMemo(() => analyzeCodequake(repoUrl, diff, bobInsights), [repoUrl, diff, bobInsights]);
  const flow = useMemo(() => buildFlow(analysis.graph.nodes, analysis.graph.edges), [analysis.graph]);

  async function runReasoning() {
    setStep("reasoning");
    setIsRequestingBob(true);
    try {
      const response = await fetch("/api/bob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, diff })
      });
      const data = (await response.json()) as { insight?: string };
      setBobInsights(data.insight ?? bobInsightTemplate);
    } catch {
      setBobInsights(bobInsightTemplate);
    } finally {
      setIsRequestingBob(false);
    }
  }

  return (
    <main className="codequake-shell min-h-screen overflow-hidden px-4 py-5 text-white md:px-8">
      <div className="liquid-aurora" />
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col">
        <TopBar step={step} onHome={() => setStep("landing")} />
        {step === "landing" && <LandingScreen onStart={() => setStep("input")} />}
        {step === "input" && (
          <InputScreen
            repoUrl={repoUrl}
            diff={diff}
            onRepoUrlChange={setRepoUrl}
            onDiffChange={setDiff}
            onBack={() => setStep("landing")}
            onAnalyze={runReasoning}
          />
        )}
        {step === "reasoning" && (
          <ReasoningScreen
            isLoading={isRequestingBob}
            onBack={() => setStep("input")}
            onViewReport={() => setStep("results")}
          />
        )}
        {step === "results" && (
          <ResultsScreen
            analysis={analysis}
            flow={flow}
            bobInsights={bobInsights}
            onBack={() => setStep("reasoning")}
            onNewAnalysis={() => setStep("input")}
          />
        )}
      </div>
    </main>
  );
}

function TopBar({ step, onHome }: { step: Step; onHome: () => void }) {
  const steps = ["landing", "input", "reasoning", "results"];
  const activeIndex = steps.indexOf(step);

  return (
    <header className="relative z-10 flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <button className="flex items-center gap-3 px-2 text-left" type="button" onClick={onHome}>
        <span className="grid size-9 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-200">
          <RadioTower size={17} />
        </span>
        <span>
          <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">Codequake</span>
          <span className="hidden text-xs text-slate-400 sm:block">Architectural instability detection</span>
        </span>
      </button>
      <div className="hidden items-center gap-2 md:flex">
        {steps.map((item, index) => (
          <span
            key={item}
            className={`h-1.5 rounded-full transition-all ${index <= activeIndex ? "w-10 bg-cyan-300" : "w-4 bg-white/15"}`}
          />
        ))}
      </div>
      <BobBadge />
    </header>
  );
}

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative z-10 grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1fr_0.82fr]">
      <div className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">
          <Siren size={14} />
          Software shockwave radar
        </div>
        <h1 className="text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
          Visualize software shockwaves before they spread.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          AI-powered architectural instability detection for software repositories. Codequake maps fault zones,
          cascade risk, and propagation paths from repository changes.
        </p>
        <div className="mt-7 grid max-w-3xl gap-3 md:grid-cols-3">
          {bobCapabilities.map((capability) => (
            <div key={capability.title} className="liquid-card p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">IBM Bob</p>
              <h3 className="mt-2 text-sm font-semibold text-white">{capability.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{capability.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <GlassButton onClick={onStart} variant="primary">
            Start Analysis
            <ChevronRight size={18} />
          </GlassButton>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-300 backdrop-blur-xl">
            Built for IBM Bob Hackathon
          </div>
        </div>
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[0_30px_120px_rgba(168,85,247,0.25)] backdrop-blur-xl">
        <div className="absolute inset-0 hero-liquid" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex justify-end">
            <BobBadge large />
          </div>
          <div className="glass-orbit mx-auto grid size-64 place-items-center rounded-full border border-white/20 bg-white/[0.04] text-center shadow-[0_0_80px_rgba(98,244,255,0.22)]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Epicenter</p>
              <p className="mt-2 text-5xl font-semibold">100%</p>
              <p className="mt-2 text-sm text-slate-300">critical event simulated</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniSignal label="Fault zones" value="6" />
            <MiniSignal label="Cascade risk" value="High" />
            <MiniSignal label="Bob layer" value="Active" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InputScreen({
  repoUrl,
  diff,
  onRepoUrlChange,
  onDiffChange,
  onBack,
  onAnalyze
}: {
  repoUrl: string;
  diff: string;
  onRepoUrlChange: (value: string) => void;
  onDiffChange: (value: string) => void;
  onBack: () => void;
  onAnalyze: () => void;
}) {
  return (
    <section className="relative z-10 grid flex-1 place-items-center py-10">
      <div className="w-full max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.055] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8">
        <button className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Step 1</p>
        <h2 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Set the architecture epicenter.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Add a repository and optional diff. Codequake will use the existing analyzer and IBM Bob reasoning layer to
          prepare the instability report.
        </p>
        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">GitHub repository</span>
            <input className="glass-input mt-2" value={repoUrl} onChange={(event) => onRepoUrlChange(event.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Optional PR diff / changed files</span>
            <textarea className="glass-input mt-2 min-h-72 font-mono text-xs leading-5" value={diff} onChange={(event) => onDiffChange(event.target.value)} />
          </label>
        </div>
        <div className="mt-7 flex justify-end">
          <GlassButton onClick={onAnalyze} variant="primary">
            Analyze Architecture
            <Zap size={18} />
          </GlassButton>
        </div>
      </div>
    </section>
  );
}

function ReasoningScreen({
  isLoading,
  onBack,
  onViewReport
}: {
  isLoading: boolean;
  onBack: () => void;
  onViewReport: () => void;
}) {
  return (
    <section className="relative z-10 grid flex-1 place-items-center py-10">
      <div className="w-full max-w-5xl rounded-[2rem] border border-white/12 bg-black/35 p-5 backdrop-blur-2xl md:p-8">
        <button className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <BobBadge large />
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">IBM Bob is reasoning across the repository.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Codequake keeps the user inside one product flow while IBM Bob powers the architecture interpretation
              behind the scenes.
            </p>
            <div className="mt-5 rounded-3xl border border-cyan-200/15 bg-cyan-300/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Questions Bob answers</p>
              <div className="mt-3 space-y-2">
                {bobQuestions.map((question) => (
                  <div key={question} className="flex gap-2 text-sm leading-5 text-slate-300">
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-cyan-100" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <GlassButton onClick={onViewReport} variant="primary" disabled={isLoading}>
                {isLoading ? "Reasoning in progress" : "View Codequake Report"}
                <ChevronRight size={18} />
              </GlassButton>
            </div>
          </div>
          <div className="grid gap-4">
            {reasoningSteps.map((item, index) => (
              <div key={item} className="liquid-card flex items-center gap-4 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100">
                  {isLoading && index === 3 ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                </span>
                <div>
                  <p className="font-medium text-white">{item}</p>
                  <p className="text-sm text-slate-400">Topology signal {index + 1} locked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsScreen({
  analysis,
  flow,
  bobInsights,
  onBack,
  onNewAnalysis
}: {
  analysis: ReturnType<typeof analyzeCodequake>;
  flow: { nodes: Node[]; edges: Edge[] };
  bobInsights: string;
  onBack: () => void;
  onNewAnalysis: () => void;
}) {
  return (
    <section className="relative z-10 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back
        </button>
        <GlassButton onClick={onNewAnalysis} variant="secondary">New Analysis</GlassButton>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2rem] border border-cyan-200/20 bg-cyan-300/[0.055] p-5 shadow-[0_30px_110px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BobBadge large />
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
              Reasoning evidence ready
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">IBM Bob Architecture Reasoning Center</h2>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300 md:text-base">
            Codequake uses IBM Bob as the repository-wide interpretation layer, then converts Bob's architecture
            findings into instability scoring, fault-zone mapping, and shockwave visualization.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ReasoningMetric icon={<Network size={17} />} label="Topology" value="Mapped" />
            <ReasoningMetric icon={<GitMerge size={17} />} label="Coupling" value="Explained" />
            <ReasoningMetric icon={<FileText size={17} />} label="Reviewer Brief" value="Generated" />
          </div>
        </div>
        <div className="rounded-[2rem] border border-rose-300/25 bg-rose-500/10 p-6 shadow-[0_30px_100px_rgba(244,63,94,0.14)] backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-100">Codequake Intensity</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{analysis.intensity}</h2>
          <div className="mt-5 h-3 rounded-full bg-white/10">
            <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-rose-400" style={{ width: `${analysis.instabilityIndex}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-300">Instability Index {analysis.instabilityIndex}%</p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Panel title="Bob-Generated Insight" icon={<BrainCircuit size={18} />}>
            <p className="text-sm leading-6 text-slate-300">{analysis.bobNarrative}</p>
            <p className="mt-4 line-clamp-5 rounded-xl border border-white/10 bg-black/25 p-3 font-mono text-xs leading-5 text-cyan-50">{bobInsights}</p>
          </Panel>
          <Panel title="Bob Reasoning Outputs" icon={<Sparkles size={18} />}>
            <div className="grid gap-3">
              {bobCapabilities.map((capability) => (
                <div key={capability.title} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{capability.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{capability.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Shockwave Propagation" icon={<RadioTower size={18} />}>
            <ol className="space-y-3">
              {analysis.shockwavePath.map((item, index) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs text-cyan-100">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Dependency Topology Shockwave" icon={<Network size={18} />}>
            <div className="relative h-[520px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#04060b]">
              <div className="absolute inset-0 quake-scan" />
              <ReactFlow nodes={flow.nodes} edges={flow.edges} fitView nodesDraggable={false} proOptions={{ hideAttribution: true }}>
                <Background color="rgba(98, 244, 255, 0.18)" gap={26} />
                <Controls showInteractive={false} />
              </ReactFlow>
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Fault-Zone Map" icon={<ShieldAlert size={18} />}>
          <div className="grid gap-3 md:grid-cols-2">
            {analysis.faultZones.map((zone) => (
              <div key={zone.name} className="liquid-card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Fault Zone</p>
                <h3 className="mt-1 font-semibold text-white">{zone.name}</h3>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-rose-400" style={{ width: `${zone.instabilityIndex}%` }} />
                </div>
                <p className="mt-2 text-sm text-rose-100">Instability Index: {zone.instabilityIndex}%</p>
              </div>
            ))}
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel title="Architecture Warnings" icon={<AlertTriangle size={18} />}>
            <List items={analysis.warnings} tone="warning" />
          </Panel>
          <Panel title="Stability Test Targets" icon={<TestTube2 size={18} />}>
            <List items={analysis.tests} tone="success" />
          </Panel>
        </div>
      </div>
    </section>
  );
}

function buildFlow(
  graphNodes: Array<{ id: string; label: string; kind: "epicenter" | "fault-zone" | "shockwave"; instability: number }>,
  graphEdges: Array<{ source: string; target: string; label: string; stress: number }>
): { nodes: Node[]; edges: Edge[] } {
  const nodes = graphNodes.map((node, index) => ({
    id: node.id,
    position: {
      x: node.kind === "epicenter" ? 0 : node.kind === "fault-zone" ? 330 : 720,
      y: node.kind === "shockwave" ? 180 : index * 110
    },
    data: { label: `${node.label}\n${node.instability}%` },
    style: {
      width: 220,
      border: `1px solid ${nodeColor[node.kind]}`,
      background: "rgba(8, 12, 24, 0.94)",
      color: "#f8fafc",
      boxShadow: `0 0 34px ${nodeColor[node.kind]}55`,
      whiteSpace: "pre-line",
      fontSize: 12,
      borderRadius: 18,
      padding: 12
    }
  }));

  const edges = graphEdges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: edge.stress >= 58,
    style: { stroke: edge.stress >= 70 ? "#ff4d7d" : "#62f4ff", strokeWidth: Math.max(3, edge.stress / 22) },
    labelStyle: { fill: "#e2e8f0", fontSize: 11 }
  }));

  return { nodes, edges };
}

function BobBadge({ large = false }: { large?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-xl ${large ? "px-4 py-2" : "px-3 py-1.5"}`}>
      <Image src="/ibm-bob-logo.png" alt="IBM Bob logo" width={large ? 28 : 20} height={large ? 28 : 20} className="rounded-full" />
      <span className={`${large ? "text-sm" : "text-xs"} text-slate-200`}>Powered by IBM Bob</span>
    </div>
  );
}

function GlassButton({
  children,
  onClick,
  variant,
  disabled = false
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
  disabled?: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_12px_40px_rgba(98,244,255,0.2)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 ${
        variant === "primary"
          ? "bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-rose-300 text-slate-950"
          : "border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl"
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function MiniSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function ReasoningMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-200/15 bg-black/20 p-4">
      <div className="text-cyan-100">{icon}</div>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function Panel({ children, icon, title }: { children: React.ReactNode; icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="mb-3 flex items-center gap-2 text-white">
        <span className="text-cyan-100">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function List({ items, tone }: { items: string[]; tone: "success" | "warning" }) {
  const color = tone === "success" ? "bg-emerald-300" : "bg-amber-300";
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300">
          <span className={`mt-2 size-1.5 shrink-0 rounded-full ${color}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
