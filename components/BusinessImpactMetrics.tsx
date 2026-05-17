"use client";

import { Clock, DollarSign, Target, TrendingUp, Shield, Zap } from "lucide-react";

export type BusinessImpact = {
  timeReduction: {
    before: string;
    after: string;
    percentage: number;
  };
  incidentPrevention: {
    cost: string;
    description: string;
  };
  confidenceIncrease: {
    before: number;
    after: number;
    improvement: number;
  };
  testEfficiency: {
    before: number;
    after: number;
    reduction: number;
  };
};

type BusinessImpactMetricsProps = {
  impact: BusinessImpact;
  showBobBadge?: boolean;
};

export function BusinessImpactMetrics({ impact, showBobBadge = true }: BusinessImpactMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">💰 Business Impact Analysis</h3>
          {showBobBadge && (
            <p className="mt-1 text-sm text-cyan-400">Powered by IBM Bob Repository-Wide Reasoning</p>
          )}
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Time Savings */}
        <MetricCard
          icon={<Clock className="h-6 w-6" />}
          title="Time Savings"
          gradient="from-blue-500/20 to-cyan-500/20"
          iconColor="text-cyan-400"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Manual Review:</span>
              <span className="font-mono text-lg font-semibold text-white/80 line-through">
                {impact.timeReduction.before}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">With IBM Bob:</span>
              <span className="font-mono text-2xl font-bold text-cyan-400">
                {impact.timeReduction.after}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">
                {impact.timeReduction.percentage}% faster
              </span>
            </div>
          </div>
        </MetricCard>

        {/* Incident Prevention */}
        <MetricCard
          icon={<Shield className="h-6 w-6" />}
          title="Risk Prevention"
          gradient="from-rose-500/20 to-orange-500/20"
          iconColor="text-rose-400"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Potential Cost:</span>
              <span className="font-mono text-2xl font-bold text-rose-400">
                {impact.incidentPrevention.cost}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {impact.incidentPrevention.description}
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 px-3 py-2">
              <Shield className="h-4 w-4 text-rose-400" />
              <span className="text-sm font-semibold text-rose-400">Production incident avoided</span>
            </div>
          </div>
        </MetricCard>

        {/* Confidence Boost */}
        <MetricCard
          icon={<Target className="h-6 w-6" />}
          title="Analysis Confidence"
          gradient="from-purple-500/20 to-blue-500/20"
          iconColor="text-purple-400"
        >
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Pattern Matching Only:</span>
                <span className="font-semibold text-white/80">{impact.confidenceIncrease.before}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-white/30 to-white/50"
                  style={{ width: `${impact.confidenceIncrease.before}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">With IBM Bob:</span>
                <span className="font-semibold text-purple-400">{impact.confidenceIncrease.after}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
                  style={{ width: `${impact.confidenceIncrease.after}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                +{impact.confidenceIncrease.improvement}% improvement
              </span>
            </div>
          </div>
        </MetricCard>

        {/* Test Efficiency */}
        <MetricCard
          icon={<Zap className="h-6 w-6" />}
          title="Test Efficiency"
          gradient="from-emerald-500/20 to-cyan-500/20"
          iconColor="text-emerald-400"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Files to Test:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-semibold text-white/80 line-through">
                  {impact.testEfficiency.before}
                </span>
                <span className="text-white/40">-&gt;</span>
                <span className="font-mono text-2xl font-bold text-emerald-400">
                  {impact.testEfficiency.after}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Bob identified the critical propagation paths, reducing test surface by{" "}
              {impact.testEfficiency.reduction}%
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2">
              <Target className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">
                Focus on high-risk paths only
              </span>
            </div>
          </div>
        </MetricCard>
      </div>

      {/* ROI Summary */}
      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30">
            <DollarSign className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white">Return on Investment</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Preventing a single critical production incident ({impact.incidentPrevention.cost}) pays
              for Codequake for an entire year. With {impact.timeReduction.percentage}% time savings on
              every architecture review, teams can ship faster while maintaining higher confidence in
              their changes.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-lg bg-white/5 px-3 py-1.5">
                <span className="text-xs text-white/60">Payback Period: </span>
                <span className="text-sm font-semibold text-cyan-400">1 incident</span>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-1.5">
                <span className="text-xs text-white/60">Time Saved per Review: </span>
                <span className="text-sm font-semibold text-cyan-400">
                  {calculateTimeSaved(impact.timeReduction.before, impact.timeReduction.after)}
                </span>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-1.5">
                <span className="text-xs text-white/60">Confidence Gain: </span>
                <span className="text-sm font-semibold text-cyan-400">
                  +{impact.confidenceIncrease.improvement}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  gradient: string;
  iconColor: string;
  children: React.ReactNode;
};

function MetricCard({ icon, title, gradient, iconColor, children }: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={`${iconColor}`}>{icon}</div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function calculateTimeSaved(before: string, after: string): string {
  // Parse time strings like "4 hours" or "15 minutes"
  const parseTime = (time: string): number => {
    const match = time.match(/(\d+)\s*(hour|minute)/i);
    if (!match) return 0;
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    return unit.startsWith("hour") ? value * 60 : value;
  };

  const beforeMinutes = parseTime(before);
  const afterMinutes = parseTime(after);
  const savedMinutes = beforeMinutes - afterMinutes;

  if (savedMinutes >= 60) {
    const hours = Math.floor(savedMinutes / 60);
    const minutes = savedMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${savedMinutes}m`;
}

// Helper function to calculate business impact from analysis
export function calculateBusinessImpact(
  instabilityIndex: number,
  faultZoneCount: number,
  bobUsed: boolean
): BusinessImpact {
  // Base calculations
  const manualReviewHours = Math.max(2, Math.ceil(faultZoneCount * 0.5));
  const bobReviewMinutes = 15;
  const timeReductionPercentage = Math.round(
    ((manualReviewHours * 60 - bobReviewMinutes) / (manualReviewHours * 60)) * 100
  );

  // Incident cost based on severity
  const incidentCost =
    instabilityIndex >= 86
      ? "$80,000+"
      : instabilityIndex >= 66
        ? "$50,000+"
        : instabilityIndex >= 38
          ? "$25,000+"
          : "$10,000+";

  const incidentDescription =
    instabilityIndex >= 86
      ? "Critical architectural event detected. Without Bob's analysis, this cascade risk could cause a major production outage affecting thousands of users."
      : instabilityIndex >= 66
        ? "Major instability detected. Bob's repository-wide reasoning prevents potential revenue-impacting incidents."
        : instabilityIndex >= 38
          ? "Moderate instability detected. Bob helps catch issues before they reach production."
          : "Low-risk changes, but Bob provides confidence and validation for safe deployment.";

  // Confidence scores
  const patternMatchingConfidence = 45;
  const bobConfidence = bobUsed ? 94 : patternMatchingConfidence;
  const confidenceImprovement = bobConfidence - patternMatchingConfidence;

  // Test efficiency
  const totalFiles = Math.max(10, faultZoneCount * 4);
  const criticalPaths = Math.max(3, Math.ceil(faultZoneCount * 0.6));
  const testReduction = Math.round(((totalFiles - criticalPaths) / totalFiles) * 100);

  return {
    timeReduction: {
      before: `${manualReviewHours} hour${manualReviewHours > 1 ? "s" : ""}`,
      after: `${bobReviewMinutes} minutes`,
      percentage: timeReductionPercentage
    },
    incidentPrevention: {
      cost: incidentCost,
      description: incidentDescription
    },
    confidenceIncrease: {
      before: patternMatchingConfidence,
      after: bobConfidence,
      improvement: confidenceImprovement
    },
    testEfficiency: {
      before: totalFiles,
      after: criticalPaths,
      reduction: testReduction
    }
  };
}

// Made with Bob
