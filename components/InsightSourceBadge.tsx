"use client";

import { BrainCircuit, BarChart3 } from "lucide-react";

export type InsightSource = "bob" | "pattern" | "combined";

type InsightSourceBadgeProps = {
  source: InsightSource;
  confidence?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
};

export function InsightSourceBadge({
  source,
  confidence,
  size = "md",
  showLabel = true
}: InsightSourceBadgeProps) {
  const config = getSourceConfig(source);
  const sizeClasses = getSizeClasses(size);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border ${config.borderColor} ${config.bgColor} ${sizeClasses.padding} backdrop-blur-sm`}
    >
      <div className={`${config.iconColor}`}>{config.icon}</div>
      {showLabel && (
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${config.textColor} ${sizeClasses.text}`}>
            {config.label}
          </span>
          {confidence !== undefined && (
            <>
              <span className="text-white/20">-</span>
              <span className={`${config.textColor} ${sizeClasses.confidence}`}>
                {confidence}%
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

type InsightCardProps = {
  title: string;
  description: string;
  source: InsightSource;
  confidence?: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export function InsightCard({
  title,
  description,
  source,
  confidence,
  icon,
  children
}: InsightCardProps) {
  const config = getSourceConfig(source);

  return (
    <div
      className={`rounded-xl border ${config.borderColor} ${config.cardBg} p-6 backdrop-blur-sm transition-all hover:scale-[1.02]`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && <div className={`${config.iconColor} pt-1`}>{icon}</div>}
          <div className="flex-1">
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="mt-1 text-sm text-white/70">{description}</p>
          </div>
        </div>
        <InsightSourceBadge source={source} confidence={confidence} size="sm" />
      </div>

      {/* Content */}
      {children && <div className="mt-4">{children}</div>}

      {/* Source Attribution */}
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-xs text-white/50">{config.attribution}</p>
      </div>
    </div>
  );
}

type FaultZoneCardWithSourceProps = {
  name: string;
  instabilityIndex: number;
  reasons: string[];
  source: InsightSource;
  confidence?: number;
};

export function FaultZoneCardWithSource({
  name,
  instabilityIndex,
  reasons,
  source,
  confidence
}: FaultZoneCardWithSourceProps) {
  const config = getSourceConfig(source);
  const intensity = getIntensityColor(instabilityIndex);

  return (
    <div
      className={`rounded-xl border ${config.borderColor} ${config.cardBg} p-5 backdrop-blur-sm transition-all hover:scale-[1.02]`}
    >
      {/* Header with Badge */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="flex-1 font-semibold text-white">{name}</h4>
        <InsightSourceBadge source={source} confidence={confidence} size="sm" showLabel={false} />
      </div>

      {/* Instability Bar */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Instability Index</span>
          <span className={`font-bold ${intensity.textColor}`}>{instabilityIndex}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full ${intensity.gradient} transition-all duration-500`}
            style={{ width: `${instabilityIndex}%` }}
          />
        </div>
      </div>

      {/* Reasons */}
      <div className="space-y-2">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-start gap-2 text-sm text-white/70">
            <span className="text-white/40">-</span>
            <span className="flex-1">{reason}</span>
          </div>
        ))}
      </div>

      {/* Source Attribution Footer */}
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
        <div className={`${config.iconColor}`}>{config.icon}</div>
        <span className="text-xs text-white/50">{config.attribution}</span>
      </div>
    </div>
  );
}

// Helper functions
function getSourceConfig(source: InsightSource) {
  switch (source) {
    case "bob":
      return {
        label: "Bob Insight",
        icon: <BrainCircuit className="h-4 w-4" />,
        iconColor: "text-cyan-400",
        textColor: "text-cyan-400",
        borderColor: "border-cyan-500/30",
        bgColor: "bg-gradient-to-br from-cyan-500/10 to-blue-500/5",
        cardBg: "bg-gradient-to-br from-cyan-500/10 to-blue-500/5",
        attribution:
          "IBM Bob identified this through repository-wide reasoning and dependency analysis"
      };
    case "pattern":
      return {
        label: "Pattern Match",
        icon: <BarChart3 className="h-4 w-4" />,
        iconColor: "text-white/60",
        textColor: "text-white/60",
        borderColor: "border-white/10",
        bgColor: "bg-white/5",
        cardBg: "bg-gradient-to-br from-white/5 to-white/0",
        attribution: "Detected through file path pattern matching"
      };
    case "combined":
      return {
        label: "Combined Analysis",
        icon: <BrainCircuit className="h-4 w-4" />,
        iconColor: "text-purple-400",
        textColor: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-gradient-to-br from-purple-500/10 to-blue-500/5",
        cardBg: "bg-gradient-to-br from-purple-500/10 to-blue-500/5",
        attribution: "IBM Bob reasoning validated by pattern matching"
      };
  }
}

function getSizeClasses(size: "sm" | "md" | "lg") {
  switch (size) {
    case "sm":
      return {
        padding: "px-2 py-1",
        text: "text-xs",
        confidence: "text-xs"
      };
    case "md":
      return {
        padding: "px-3 py-1.5",
        text: "text-sm",
        confidence: "text-sm"
      };
    case "lg":
      return {
        padding: "px-4 py-2",
        text: "text-base",
        confidence: "text-base"
      };
  }
}

function getIntensityColor(index: number) {
  if (index >= 86) {
    return {
      gradient: "bg-gradient-to-r from-rose-500 to-orange-500",
      textColor: "text-rose-400"
    };
  } else if (index >= 66) {
    return {
      gradient: "bg-gradient-to-r from-orange-500 to-amber-500",
      textColor: "text-orange-400"
    };
  } else if (index >= 38) {
    return {
      gradient: "bg-gradient-to-r from-amber-500 to-yellow-500",
      textColor: "text-amber-400"
    };
  } else {
    return {
      gradient: "bg-gradient-to-r from-emerald-500 to-cyan-500",
      textColor: "text-emerald-400"
    };
  }
}

// Helper to determine source from fault zone reasons
export function determineInsightSource(reasons: string[]): InsightSource {
  const hasBobReason = reasons.some((r) => r.toLowerCase().includes("bob"));
  const hasPatternReason = reasons.some(
    (r) =>
      !r.toLowerCase().includes("bob") &&
      (r.toLowerCase().includes("file") ||
        r.toLowerCase().includes("path") ||
        r.toLowerCase().includes("pattern"))
  );

  if (hasBobReason && hasPatternReason) return "combined";
  if (hasBobReason) return "bob";
  return "pattern";
}

// Made with Bob
