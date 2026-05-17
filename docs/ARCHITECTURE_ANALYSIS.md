# Codequake - Complete Architecture Analysis

## Executive Summary

**Codequake** is an AI-powered architectural instability detection system built for the IBM Bob Hackathon. It transforms repository changes into visual "software shockwaves" by combining local pattern-based analysis with IBM Bob's repository-wide reasoning capabilities.

**Core Concept**: Instead of asking "what files changed?", Codequake asks "where is architectural instability forming, and how could it spread through the system?"

---

## 1. Architecture Overview

### Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glass-morphism effects
- **Visualization**: @xyflow/react (React Flow) for dependency graphs
- **Icons**: Lucide React
- **AI Integration**: IBM Bob API (with fallback demo mode)

### Project Structure

```
codequake/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Entry point (renders RiskDashboard)
│   ├── globals.css              # Global styles and animations
│   └── api/
│       └── bob/
│           └── route.ts         # IBM Bob API integration endpoint
├── components/
│   └── RiskDashboard.tsx        # Main UI component (565 lines)
├── lib/
│   ├── analyzer.ts              # Core instability analysis logic
│   └── sample-data.ts           # Demo data and templates
├── docs/
│   ├── IMPLEMENTATION_PLAN.md   # Development roadmap
│   ├── bob-reports/             # IBM Bob evidence storage
│   ├── demo/                    # Demo scripts
│   └── screenshots/             # UI captures
└── public/
    └── ibm-bob-logo.png         # IBM Bob branding
```

---

## 2. Main Modules

### 2.1 RiskDashboard Component (`components/RiskDashboard.tsx`)

**Purpose**: Single-page application orchestrating the entire user experience.

**Key Responsibilities**:
- Multi-step workflow management (landing → input → reasoning → results)
- State management for repository URL, diff, and Bob insights
- API communication with IBM Bob backend
- Visualization rendering (dependency graphs, fault zones, metrics)

**State Machine**:
```typescript
type Step = "landing" | "input" | "reasoning" | "results";
```

**Sub-Components**:
- `LandingScreen`: Hero section with IBM Bob capabilities showcase
- `InputScreen`: Repository URL and diff input form
- `ReasoningScreen`: Loading state with IBM Bob reasoning visualization
- `ResultsScreen`: Complete analysis dashboard with graphs and metrics
- `TopBar`: Navigation header with progress indicator
- `BobBadge`: IBM Bob branding component
- `Panel`, `GlassButton`, `MiniSignal`: Reusable UI primitives

### 2.2 Analyzer Module (`lib/analyzer.ts`)

**Purpose**: Core instability detection engine combining pattern matching with IBM Bob signals.

**Key Functions**:

1. **`analyzeCodequake(repoUrl, diff, bobInsights)`**
   - Main entry point for analysis
   - Returns `CodequakeAnalysis` object with all metrics

2. **`extractChangedFiles(diff)`**
   - Parses git diff format to identify changed files
   - Fallback regex for non-standard formats

3. **`extractBobSignals(bobInsights)`**
   - Parses IBM Bob reasoning text for architectural keywords
   - Boosts instability score based on Bob's findings
   - Identifies additional fault zones from Bob's analysis

4. **`getIntensity(score)`**
   - Maps 0-100 instability score to severity levels:
     - 0-37: "Low Tremor"
     - 38-65: "Moderate Instability"
     - 66-85: "Major Codequake"
     - 86-100: "Critical Architectural Event"

5. **`buildGraph(files, zones, instabilityIndex)`**
   - Constructs dependency topology visualization
   - Creates nodes (epicenters, fault zones, shockwaves)
   - Creates edges with stress levels for animation

**Instability Patterns** (Pattern Matching Rules):
```typescript
const instabilityPatterns = [
  { pattern: /auth|session|middleware/i, score: 28, zone: "Authentication Fault Zone" },
  { pattern: /payment|checkout|billing/i, score: 30, zone: "Revenue Critical Fault Zone" },
  { pattern: /api|route|controller/i, score: 16, zone: "API Surface Stress Zone" },
  { pattern: /database|db|schema|migration/i, score: 24, zone: "Data Layer Fault Zone" },
  { pattern: /config|env|deploy|infra/i, score: 22, zone: "Deployment Stress Zone" },
  { pattern: /test|spec/i, score: -8, zone: "Test Stabilizer" }
];
```

### 2.3 IBM Bob API Route (`app/api/bob/route.ts`)

**Purpose**: Backend proxy for IBM Bob API integration with graceful fallback.

**Flow**:
1. Receives POST request with `{ repoUrl, diff }`
2. Checks for environment variables:
   - `IBM_BOB_API_URL`
   - `IBM_BOB_API_KEY`
3. If configured: Forwards request to IBM Bob API
4. If not configured: Returns demo fallback with template insights
5. Handles errors gracefully, always returning usable data

**Request Format to IBM Bob**:
```json
{
  "task": "Analyze architectural instability, dependency fault zones, propagation risk, and cascade risk for Codequake.",
  "repositoryUrl": "https://github.com/...",
  "diff": "diff --git a/...",
  "outputFormat": "Return concise architecture reasoning with fault zones, tightly coupled systems, shockwave propagation paths, cascade risk, and test priorities."
}
```

### 2.4 Sample Data Module (`lib/sample-data.ts`)

**Purpose**: Provides realistic demo data for proof-of-concept demonstrations.

**Contents**:
- `sampleDiff`: Example git diff showing auth and payment changes
- `bobInsightTemplate`: Template IBM Bob reasoning output demonstrating expected format

---

## 3. Data Flow

### 3.1 Complete Analysis Pipeline

```
User Input (repo URL + diff)
    ↓
Click "Analyze Architecture"
    ↓
POST /api/bob { repoUrl, diff }
    ↓
┌─────────────────────────────┐
│ IBM Bob API Route           │
│ - Check env variables       │
│ - Call IBM Bob OR fallback  │
│ - Return insights           │
└─────────────────────────────┘
    ↓
analyzeCodequake(repoUrl, diff, bobInsights)
    ↓
┌─────────────────────────────────────────┐
│ Analyzer Pipeline                       │
│ 1. Extract changed files from diff      │
│ 2. Apply pattern matching rules         │
│ 3. Extract Bob signals from insights    │
│ 4. Calculate instability score          │
│ 5. Identify fault zones                 │
│ 6. Build shockwave propagation path     │
│ 7. Generate warnings & test targets     │
│ 8. Build dependency graph visualization │
└─────────────────────────────────────────┘
    ↓
Render Results Dashboard
```

### 3.2 Instability Score Calculation

**Base Score**: `20 + (changedFiles.length * 7)` (capped at 46)

**Pattern Matching Additions**:
- Each matched pattern adds its score (e.g., +28 for auth, +30 for payment)
- Negative scores for stabilizing factors (e.g., -8 for tests)

**IBM Bob Signal Boost**:
- Critical keywords detected: +18 points
  - Keywords: critical, fragile, tightly coupled, revenue, production, downstream, cascade, blast radius
- Shared infrastructure detected: +9 points
  - Keywords: shared, middleware, utility, platform
- Topology stress detected: +8 points
  - Keywords: dependency, imports, graph, topology, coupling

**Cross-Domain Coupling Bonus**:
- If both auth AND payment patterns match: +15 points
- Creates special "Cross-Domain Coupling Fault Zone"

**Final Score**: Clamped to 0-100 range

### 3.3 Data Types

```typescript
type CodequakeAnalysis = {
  instabilityIndex: number;              // 0-100 score
  intensity: CodequakeIntensity;         // Severity level
  changedFiles: string[];                // Extracted from diff
  faultZones: FaultZone[];               // Identified risk areas
  shockwavePath: string[];               // Propagation sequence
  warnings: string[];                    // Architecture warnings
  tests: string[];                       // Recommended test targets
  bobNarrative: string;                  // Human-readable summary
  graph: {                               // Visualization data
    nodes: Array<{
      id: string;
      label: string;
      kind: "epicenter" | "fault-zone" | "shockwave";
      instability: number;
    }>;
    edges: Array<{
      source: string;
      target: string;
      label: string;
      stress: number;
    }>;
  };
};
```

---

## 4. UI Flow and User Journey

### 4.1 Four-Step Workflow

**Step 1: Landing Screen**
- **Purpose**: Introduce Codequake concept and IBM Bob capabilities
- **Key Elements**:
  - Hero headline: "Visualize software shockwaves before they spread"
  - Three IBM Bob capability cards
  - Animated hero visualization with simulated metrics
  - "Start Analysis" CTA button
- **User Action**: Click "Start Analysis"

**Step 2: Input Screen**
- **Purpose**: Collect repository and change information
- **Key Elements**:
  - Repository URL input (pre-filled with example)
  - PR diff textarea (pre-filled with sample diff)
  - Glass-morphism styled form
- **User Action**: Review/edit inputs, click "Analyze Architecture"

**Step 3: Reasoning Screen**
- **Purpose**: Show IBM Bob working (loading state with educational content)
- **Key Elements**:
  - IBM Bob badge prominently displayed
  - Four reasoning steps with checkmarks
  - "Questions Bob answers" panel with sparkle icons
  - Loading indicator on final step
- **User Action**: Wait for analysis, click "View Codequake Report"

**Step 4: Results Screen**
- **Purpose**: Display comprehensive analysis dashboard
- **Key Elements**:
  - IBM Bob Architecture Reasoning Center (hero panel)
  - Codequake Intensity meter with gradient bar
  - Bob-Generated Insight panel
  - Dependency Topology Shockwave (interactive graph)
  - Fault-Zone Map (grid of fault zone cards)
  - Architecture Warnings list
  - Stability Test Targets list
  - Shockwave Propagation path
- **User Action**: Review results, click "New Analysis" to restart

### 4.2 Visual Design System

**Color Palette**:
- **Epicenter**: `#ffb86b` (orange) - Change origin
- **Fault Zone**: `#ff4d7d` (rose) - Risk areas
- **Shockwave**: `#62f4ff` (cyan) - Propagation
- **Success**: Emerald tones
- **Warning**: Amber tones

**Glass-Morphism Effects**:
- Backdrop blur with semi-transparent backgrounds
- Subtle borders with white/10 opacity
- Layered gradients for depth
- Animated aurora backgrounds

**Animations**:
- Liquid aurora background (fixed, animated gradients)
- Pulsing glass orbit rings on landing
- Animated graph edges for high-stress connections
- Spinning refresh icon during loading
- Quake scan effect on topology visualization

---

## 5. Analyzer Logic Deep Dive

### 5.1 Pattern Matching Strategy

The analyzer uses **regex-based pattern matching** on file paths to identify architectural risk zones:

```typescript
// Example: Authentication detection
if (/auth|session|middleware/i.test(filename)) {
  score += 28;
  addFaultZone("Authentication Fault Zone");
}
```

**Why This Works**:
- File naming conventions reveal architectural intent
- Patterns capture domain concepts (auth, payment, database)
- Multiple patterns can match a single file (cumulative risk)

### 5.2 Fault Zone Aggregation

Fault zones are collected in a `Map` to avoid duplicates:

```typescript
const zoneMap = new Map<string, FaultZone>();

// Add reasons to existing zones
const existing = zoneMap.get(zoneName);
const reasons = existing?.reasons ?? [];
if (!reasons.includes(newReason)) {
  reasons.push(newReason);
}
```

Each fault zone tracks:
- **Name**: Human-readable zone identifier
- **Instability Index**: Calculated score (0-100)
- **Reasons**: Array of why this zone is risky

### 5.3 IBM Bob Signal Extraction

The analyzer parses Bob's text response for architectural keywords:

```typescript
function extractBobSignals(bobInsights: string) {
  const normalized = bobInsights.toLowerCase();
  let scoreBoost = 0;
  const zones = [];

  // Critical architecture keywords
  if (/critical|fragile|tightly coupled/.test(normalized)) {
    scoreBoost += 18;
  }

  // Shared infrastructure detection
  if (/shared|middleware|utility/.test(normalized)) {
    scoreBoost += 9;
    zones.push({
      name: "Shared Infrastructure Fault Zone",
      reason: "IBM Bob identified shared infrastructure..."
    });
  }

  return { used: bobInsights.length > 0, scoreBoost, zones };
}
```

**Key Insight**: Bob's natural language reasoning is converted into quantitative risk signals.

### 5.4 Shockwave Path Construction

The propagation path shows how instability travels:

```typescript
function buildShockwavePath(files, zones) {
  return [
    files[0] ?? "Repository change epicenter",  // Origin
    zones[0]?.name ?? "Application Module",     // Primary impact
    zones[1]?.name ?? "Dependent Routes",       // Secondary impact
    "Cascade Risk Boundary",                    // Threshold
    "Production Stability"                      // Final concern
  ];
}
```

This creates a narrative: **Change → Fault Zone → Cascade → Production**

### 5.5 Graph Visualization Construction

The dependency graph is built with three node types:

1. **Epicenter Nodes** (orange): Changed files
2. **Fault Zone Nodes** (rose): Identified risk areas
3. **Shockwave Node** (cyan): Final propagation target

**Edge Styling**:
- **Animated**: When stress ≥ 58%
- **Color**: Rose (#ff4d7d) if stress ≥ 70%, else cyan (#62f4ff)
- **Width**: Proportional to stress level (stress / 22)

**Layout**:
- Epicenters: x=0 (left column)
- Fault Zones: x=330 (middle column)
- Shockwave: x=720 (right column)
- Y-positions: Stacked vertically (index * 110)

---

## 6. IBM Bob Integration Points

### 6.1 Where IBM Bob Fits

IBM Bob serves as the **architecture reasoning engine** that interprets repository-wide context:

```
Local Analyzer (Pattern Matching)
        +
IBM Bob (Repository-Wide Reasoning)
        ↓
    Codequake Analysis
```

**Without Bob**: Pattern matching provides basic instability detection
**With Bob**: Repository-wide context adds architectural depth

### 6.2 Bob's Role in the Product

**1. Repository-Wide Architecture Reading**
- Bob interprets the codebase as connected systems, not isolated files
- Identifies critical modules, shared infrastructure, tight coupling
- Example: "Session validation is reused by middleware, account routes, payment APIs, admin dashboards, and audit logging"

**2. Fault-Zone Reasoning**
- Bob explains WHY coupling and shared middleware become unstable
- Provides human-readable explanations for technical decisions
- Example: "Authentication is tightly coupled to checkout and shared middleware, creating propagation amplification risk"

**3. Cascade-Risk Explanation**
- Bob turns dependency topology into propagation risk narratives
- Identifies downstream systems that deserve stability tests
- Example: "A stricter session audience check can travel into revenue-critical payment paths and route authorization"

### 6.3 Bob API Integration Flow

```typescript
// Frontend calls backend
const response = await fetch("/api/bob", {
  method: "POST",
  body: JSON.stringify({ repoUrl, diff })
});

// Backend routes to IBM Bob
const bobResponse = await fetch(IBM_BOB_API_URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${IBM_BOB_API_KEY}` },
  body: JSON.stringify({
    task: "Analyze architectural instability...",
    repositoryUrl: repoUrl,
    diff: diff,
    outputFormat: "Return concise architecture reasoning..."
  })
});

// Response flows back to analyzer
const insights = await bobResponse.json();
analyzeCodequake(repoUrl, diff, insights);
```

### 6.4 Graceful Degradation

**Demo Mode** (no IBM Bob configured):
- Returns `bobInsightTemplate` with realistic sample reasoning
- Adds note explaining demo fallback
- Product remains fully functional for demonstrations

**Error Handling**:
- API errors return demo fallback with error status
- Network failures don't break the user experience
- Always returns HTTP 200 with usable data

### 6.5 Bob Evidence Collection

The product is designed to capture IBM Bob usage evidence:

**Documentation Requirements**:
- Export Bob reports to `docs/bob-reports/`
- Capture screenshots showing Bob reasoning in UI
- Record demo clips of Bob → Codequake flow

**Suggested Bob Prompts** (from implementation plan):
1. "Explain the architecture of this repository. Identify critical modules, shared infrastructure, and tight coupling."
2. "Map dependency topology between changed files and downstream systems."
3. "Identify architectural fault zones and explain why instability could form there."
4. "Estimate cascade risk and shockwave propagation paths for this PR."
5. "Recommend stability tests that target the highest-risk propagation paths."

---

## 7. Key Architectural Decisions

### 7.1 Single-Page Application

**Decision**: Build entire flow in one React component
**Rationale**: 
- Simplifies state management
- Smooth transitions between steps
- No page reloads during workflow
- Easy to demo in hackathon setting

### 7.2 Hybrid Analysis Approach

**Decision**: Combine local pattern matching with IBM Bob reasoning
**Rationale**:
- Pattern matching provides immediate, deterministic results
- IBM Bob adds repository-wide context and depth
- Graceful degradation when Bob unavailable
- Best of both worlds: speed + intelligence

### 7.3 Visual-First Design

**Decision**: Emphasize cinematic, animated visualizations
**Rationale**:
- "Software shockwaves" concept requires visual metaphor
- Hackathon judges respond to memorable demos
- Glass-morphism and animations create premium feel
- Dependency graphs make abstract concepts concrete

### 7.4 Demo-Ready Fallbacks

**Decision**: Include sample data and demo mode throughout
**Rationale**:
- Hackathon demos can't rely on live APIs
- Judges need to see product working immediately
- Sample data demonstrates realistic use cases
- Reduces setup friction for evaluation

---

## 8. Data Flow Summary Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│  Landing → Input → Reasoning → Results                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (/api/bob)                      │
│  • Check IBM_BOB_API_URL & IBM_BOB_API_KEY                  │
│  • Forward to IBM Bob OR return demo template               │
│  • Handle errors gracefully                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              IBM BOB (External Service)                     │
│  • Repository-wide architecture reasoning                   │
│  • Fault zone identification                                │
│  • Cascade risk analysis                                    │
│  • Test recommendations                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ANALYZER (lib/analyzer.ts)                     │
│  1. Extract changed files from diff                         │
│  2. Apply pattern matching (auth, payment, db, etc.)        │
│  3. Extract Bob signals (keywords → score boost)            │
│  4. Calculate instability index (0-100)                     │
│  5. Map to intensity level (Low → Critical)                 │
│  6. Identify fault zones with reasons                       │
│  7. Build shockwave propagation path                        │
│  8. Generate warnings & test targets                        │
│  9. Construct dependency graph (nodes + edges)              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              VISUALIZATION LAYER                            │
│  • Codequake Intensity meter                                │
│  • Dependency topology graph (React Flow)                   │
│  • Fault zone cards with instability bars                   │
│  • Shockwave propagation list                               │
│  • Architecture warnings & test targets                     │
│  • Bob reasoning narrative                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Conclusion

**Codequake** successfully demonstrates how IBM Bob's repository-wide reasoning can be integrated into a specialized architectural analysis tool. The product combines:

1. **Local Intelligence**: Fast pattern matching for immediate feedback
2. **AI Reasoning**: IBM Bob's deep architectural understanding
3. **Visual Communication**: Cinematic UI that makes abstract concepts tangible
4. **Practical Output**: Actionable warnings and test recommendations

The architecture is designed for **hackathon success**: demo-ready, visually impressive, technically sound, and properly integrated with IBM Bob as the core reasoning engine.

**Key Innovation**: Transforming repository changes from a list of files into a visual "earthquake detection system" for software architecture, powered by IBM Bob's ability to reason across entire codebases.