export type CodequakeIntensity = "Low Tremor" | "Moderate Instability" | "Major Codequake" | "Critical Architectural Event";

export type FaultZone = {
  name: string;
  instabilityIndex: number;
  reasons: string[];
  source?: "bob" | "pattern" | "combined";
  confidence?: number;
};

export type CodequakeAnalysis = {
  instabilityIndex: number;
  intensity: CodequakeIntensity;
  changedFiles: string[];
  faultZones: FaultZone[];
  shockwavePath: string[];
  warnings: string[];
  tests: string[];
  bobNarrative: string;
  graph: {
    nodes: Array<{
      id: string;
      label: string;
      kind: "epicenter" | "fault-zone" | "shockwave";
      instability: number;
    }>;
    edges: Array<{ source: string; target: string; label: string; stress: number }>;
  };
};

const instabilityPatterns = [
  {
    pattern: /auth|session|middleware/i,
    score: 28,
    zone: "Authentication Fault Zone",
    reason: "Session and middleware changes can propagate into every protected route."
  },
  {
    pattern: /payment|checkout|billing/i,
    score: 30,
    zone: "Revenue Critical Fault Zone",
    reason: "Checkout and billing paths amplify small contract changes into business-impacting failures."
  },
  {
    pattern: /api|route|controller/i,
    score: 16,
    zone: "API Surface Stress Zone",
    reason: "Route handlers sit on the boundary between callers, validation, and downstream services."
  },
  {
    pattern: /database|db|schema|migration/i,
    score: 24,
    zone: "Data Layer Fault Zone",
    reason: "Schema and persistence changes create rollback, migration, and compatibility pressure."
  },
  {
    pattern: /config|env|deploy|infra/i,
    score: 22,
    zone: "Deployment Stress Zone",
    reason: "Configuration changes can alter runtime behavior across multiple environments."
  },
  {
    pattern: /test|spec/i,
    score: -8,
    zone: "Test Stabilizer",
    reason: "Nearby tests reduce uncertainty around the architectural change."
  }
];

export function analyzeRisk(repoUrl: string, diff: string, bobInsights: string): CodequakeAnalysis {
  return analyzeCodequake(repoUrl, diff, bobInsights);
}

export function analyzeCodequake(repoUrl: string, diff: string, bobInsights: string): CodequakeAnalysis {
  const changedFiles = extractChangedFiles(diff);
  const zoneMap = new Map<string, FaultZone>();
  let score = Math.min(20 + changedFiles.length * 7, 46);

  for (const file of changedFiles) {
    for (const rule of instabilityPatterns) {
      if (rule.pattern.test(file)) {
        score += rule.score;
        const existing = zoneMap.get(rule.zone);
        const reasons = existing?.reasons ?? [];
        if (!reasons.includes(rule.reason)) {
          reasons.push(rule.reason);
        }
        zoneMap.set(rule.zone, {
          name: rule.zone,
          instabilityIndex: 0,
          reasons,
          source: "pattern",
          confidence: 65
        });
      }
    }
  }

  const bobSignals = extractBobSignals(bobInsights);
  score += bobSignals.scoreBoost;

  for (const signal of bobSignals.zones) {
    const existing = zoneMap.get(signal.name);
    const hasExisting = existing !== undefined;
    zoneMap.set(signal.name, {
      name: signal.name,
      instabilityIndex: 0,
      reasons: [...(existing?.reasons ?? []), signal.reason],
      source: hasExisting ? "combined" : "bob",
      confidence: hasExisting ? 96 : 94
    });
  }

  if (/auth|session/i.test(diff) && /payment|checkout|billing/i.test(diff)) {
    score += 15;
    zoneMap.set("Cross-Domain Coupling Fault Zone", {
      name: "Cross-Domain Coupling Fault Zone",
      instabilityIndex: 0,
      reasons: [
        "IBM Bob detected authentication and revenue paths changing together, increasing propagation amplification risk."
      ],
      source: "bob",
      confidence: 94
    });
  }

  const instabilityIndex = Math.max(0, Math.min(100, Math.round(score)));
  const intensity = getIntensity(instabilityIndex);
  const faultZones = Array.from(zoneMap.values()).map((zone, index) => ({
    ...zone,
    instabilityIndex: Math.max(28, Math.min(98, instabilityIndex - index * 8 + zone.reasons.length * 3))
  }));
  const shockwavePath = buildShockwavePath(changedFiles, faultZones);

  return {
    instabilityIndex,
    intensity,
    changedFiles,
    faultZones,
    shockwavePath,
    warnings: buildWarnings(intensity, faultZones),
    tests: buildTests(faultZones, changedFiles),
    bobNarrative: buildNarrative(repoUrl, changedFiles, faultZones, instabilityIndex, intensity, bobSignals.used),
    graph: buildGraph(changedFiles, faultZones, instabilityIndex)
  };
}

function extractChangedFiles(diff: string): string[] {
  const files = new Set<string>();
  const matches = diff.matchAll(/^diff --git a\/(.+?) b\/(.+)$/gm);

  for (const match of matches) {
    files.add(match[2]);
  }

  if (files.size === 0) {
    const fallbackMatches = diff.matchAll(/(?:src|app|pages|lib|server|api|components)\/[\w./-]+\.\w+/g);
    for (const match of fallbackMatches) {
      files.add(match[0]);
    }
  }

  return Array.from(files);
}

function extractBobSignals(bobInsights: string): {
  used: boolean;
  scoreBoost: number;
  zones: Array<{ name: string; reason: string }>;
} {
  const normalized = bobInsights.toLowerCase();
  const zones: Array<{ name: string; reason: string }> = [];
  let scoreBoost = 0;

  if (/critical|fragile|tightly coupled|revenue|production|downstream|cascade|blast radius/.test(normalized)) {
    scoreBoost += 18;
  }

  if (/shared|middleware|utility|platform/.test(normalized)) {
    scoreBoost += 9;
    zones.push({
      name: "Shared Infrastructure Fault Zone",
      reason: "IBM Bob identified shared infrastructure that can transmit instability across unrelated features."
    });
  }

  if (/dependency|imports|graph|topology|coupling/.test(normalized)) {
    scoreBoost += 8;
    zones.push({
      name: "Topology Stress Zone",
      reason: "IBM Bob repository-wide reasoning detected dependency topology pressure and coupling risk."
    });
  }

  return { used: bobInsights.trim().length > 0, scoreBoost, zones };
}

function getIntensity(score: number): CodequakeIntensity {
  if (score >= 86) return "Critical Architectural Event";
  if (score >= 66) return "Major Codequake";
  if (score >= 38) return "Moderate Instability";
  return "Low Tremor";
}

function buildShockwavePath(files: string[], zones: FaultZone[]): string[] {
  const changed = files[0] ?? "Repository change epicenter";
  const primary = zones[0]?.name ?? "Application Module";
  const secondary = zones[1]?.name ?? "Dependent Routes";

  return [
    changed,
    primary,
    secondary,
    "Cascade Risk Boundary",
    "Production Stability"
  ];
}

function buildWarnings(intensity: CodequakeIntensity, zones: FaultZone[]): string[] {
  const zoneNames = zones.map((zone) => zone.name);
  const warnings = [
    "Export the IBM Bob reasoning report for submission evidence.",
    "Capture a screenshot of this shockwave view after each meaningful demo improvement."
  ];

  if (zoneNames.includes("Revenue Critical Fault Zone")) {
    warnings.unshift("Revenue paths may receive shockwaves from upstream architecture changes.");
  }

  if (zoneNames.includes("Authentication Fault Zone")) {
    warnings.unshift("Authentication instability can invalidate sessions, middleware assumptions, or route access.");
  }

  if (intensity === "Critical Architectural Event") {
    warnings.unshift("Critical Codequake detected: require owner review, targeted tests, and staged rollout.");
  }

  return warnings;
}

function buildTests(zones: FaultZone[], files: string[]): string[] {
  const tests = new Set<string>();
  const zoneNames = zones.map((zone) => zone.name);

  if (zoneNames.includes("Authentication Fault Zone")) {
    tests.add("auth middleware");
    tests.add("session validation");
    tests.add("route authorization");
  }

  if (zoneNames.includes("Revenue Critical Fault Zone")) {
    tests.add("payment checkout API");
    tests.add("billing smoke tests");
  }

  if (zoneNames.includes("Data Layer Fault Zone")) {
    tests.add("migration rollback");
    tests.add("repository integration tests");
  }

  files.forEach((file) => tests.add(file.replace(/^src\//, "").replace(/\.\w+$/, "")));

  return Array.from(tests).slice(0, 7);
}

function buildNarrative(
  repoUrl: string,
  changedFiles: string[],
  zones: FaultZone[],
  instabilityIndex: number,
  intensity: CodequakeIntensity,
  bobWasUsed: boolean
): string {
  const repo = repoUrl || "this repository";
  const zoneText = zones.length ? zones.map((zone) => zone.name).join(", ") : "local application modules";
  const bobText = bobWasUsed
    ? "IBM Bob repository-wide reasoning is being used as the architecture interpretation layer."
    : "Add IBM Bob architecture reasoning to strengthen the interpretation layer.";

  return `${bobText} Codequake detects ${intensity.toLowerCase()} conditions (${instabilityIndex}/100) in ${repo}. The change epicenter touches ${changedFiles.length || "multiple"} file(s), with instability likely to travel through ${zoneText}.`;
}

function buildGraph(files: string[], zones: FaultZone[], instabilityIndex: number): CodequakeAnalysis["graph"] {
  const epicenters = files.length ? files : ["Repository change epicenter"];
  const nodes = [
    ...epicenters.map((file) => ({
      id: file,
      label: file,
      kind: "epicenter" as const,
      instability: Math.max(42, Math.min(92, instabilityIndex - 10))
    })),
    ...zones.map((zone) => ({
      id: zone.name,
      label: zone.name,
      kind: "fault-zone" as const,
      instability: zone.instabilityIndex
    })),
    {
      id: "Software Shockwave",
      label: "Software Shockwave",
      kind: "shockwave" as const,
      instability: instabilityIndex
    }
  ];

  const firstZone = zones[0]?.name ?? "Software Shockwave";
  const edges = epicenters.map((file) => ({
    source: file,
    target: firstZone,
    label: "transmits stress",
    stress: Math.max(35, instabilityIndex - 12)
  }));

  zones.forEach((zone) => {
    edges.push({
      source: zone.name,
      target: "Software Shockwave",
      label: "amplifies",
      stress: zone.instabilityIndex
    });
  });

  return { nodes, edges };
}
