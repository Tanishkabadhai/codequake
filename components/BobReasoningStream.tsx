"use client";

import { BrainCircuit, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export type BobReasoningStep = {
  id: string;
  timestamp: string;
  action: string;
  insight: string;
  confidence?: number;
  filesAnalyzed?: number;
  status: "pending" | "active" | "complete";
};

type BobReasoningStreamProps = {
  isAnalyzing: boolean;
  onComplete?: () => void;
};

const reasoningSteps: Omit<BobReasoningStep, "status">[] = [
  {
    id: "structure",
    timestamp: "0.3s",
    action: "Reading repository structure",
    insight: "Analyzing repository architecture and dependencies",
    confidence: 100,
    filesAnalyzed: 0
  },
  {
    id: "auth",
    timestamp: "1.2s",
    action: "Analyzing authentication layer",
    insight: "Session validation shared by critical paths",
    confidence: 94,
    filesAnalyzed: 0
  },
  {
    id: "dependencies",
    timestamp: "2.1s",
    action: "Tracing dependency chains",
    insight: "Auth change propagates to payment via middleware",
    confidence: 89,
    filesAnalyzed: 0
  },
  {
    id: "cascade",
    timestamp: "3.4s",
    action: "Calculating cascade risk",
    insight: "High amplification detected in dependency graph",
    confidence: 91,
    filesAnalyzed: 0
  }
];

export function BobReasoningStream({ isAnalyzing, onComplete }: BobReasoningStreamProps) {
  const [steps, setSteps] = useState<BobReasoningStep[]>(
    reasoningSteps.map((step) => ({ ...step, status: "pending" as const }))
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  useEffect(() => {
    if (!isAnalyzing) {
      setSteps(reasoningSteps.map((step) => ({ ...step, status: "pending" as const })));
      setCurrentStepIndex(-1);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    // Simulate streaming steps
    reasoningSteps.forEach((step, index) => {
      const delay = index * 1200; // 1.2 seconds between steps

      // Mark as active
      timers.push(
        setTimeout(() => {
          setCurrentStepIndex(index);
          setSteps((prev) =>
            prev.map((s, i) => ({
              ...s,
              status: i === index ? "active" : i < index ? "complete" : "pending"
            }))
          );
        }, delay)
      );

      // Mark as complete
      timers.push(
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, i) => ({
              ...s,
              status: i <= index ? "complete" : i === index + 1 ? "active" : "pending"
            }))
          );

          // If this is the last step, call onComplete
          if (index === reasoningSteps.length - 1) {
            setTimeout(() => {
              onComplete?.();
            }, 800);
          }
        }, delay + 1000)
      );
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isAnalyzing, onComplete]);

  const completedSteps = steps.filter((s) => s.status === "complete").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm">
            <BrainCircuit className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">IBM Bob Repository Analysis</h3>
            <p className="text-sm text-white/60">
              {isAnalyzing
                ? `Analyzing architecture... ${Math.round(progress)}% complete`
                : "Ready to analyze"}
            </p>
          </div>
        </div>
        {isAnalyzing && (
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">{Math.round(progress)}%</div>
            <div className="text-xs text-white/60">
              {completedSteps}/{steps.length} steps
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Reasoning Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <ReasoningStepCard
            key={step.id}
            step={step}
            isActive={currentStepIndex === index}
            isVisible={isAnalyzing && index <= currentStepIndex + 1}
          />
        ))}
      </div>

      {/* Summary Stats */}
      {isAnalyzing && currentStepIndex >= 0 && (
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {steps[currentStepIndex]?.confidence ?? 0}%
            </div>
            <div className="text-xs text-white/60">Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {steps.filter((s) => s.status === "complete").length}
            </div>
            <div className="text-xs text-white/60">Insights Found</div>
          </div>
        </div>
      )}
    </div>
  );
}

type ReasoningStepCardProps = {
  step: BobReasoningStep;
  isActive: boolean;
  isVisible: boolean;
};

function ReasoningStepCard({ step, isActive, isVisible }: ReasoningStepCardProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`
        transform rounded-xl border p-4 transition-all duration-500
        ${
          step.status === "complete"
            ? "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"
            : step.status === "active"
              ? "scale-[1.02] border-cyan-400/50 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 shadow-lg shadow-cyan-500/20"
              : "border-white/10 bg-white/5"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 pt-1">
          {step.status === "complete" ? (
            <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          ) : step.status === "active" ? (
            <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-white/20" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400">{step.timestamp}</span>
              <span className="text-sm font-semibold text-white">{step.action}</span>
            </div>
            {step.confidence && step.status !== "pending" && (
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
                    style={{ width: `${step.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-cyan-400">{step.confidence}%</span>
              </div>
            )}
          </div>

          {step.status !== "pending" && (
            <p
              className={`text-sm transition-all duration-500 ${
                isActive ? "text-white" : "text-white/80"
              }`}
            >
              {"->"} {step.insight}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
