# Codequake Implementation Plan

## North Star

Build a memorable hackathon MVP that proves IBM Bob can reason across an entire repository and turn architectural fragility into visible software shockwaves.

## Phase 1: Pivot Existing MVP

- Preserve the repository input, PR diff input, local analyzer, and visualization scaffolding.
- Rebrand RumblingEXE into Codequake.
- Replace merge-risk language with architectural instability language.
- Show Instability Index, Codequake Intensity, fault zones, shockwave propagation, and topology stress.
- Add a backend IBM Bob route with environment-based API configuration.

## Phase 2: IBM Bob Evidence

- Use IBM Bob on a real public repository.
- Export Bob architecture reasoning into `docs/bob-reports/architecture-analysis.pdf`.
- Export Bob dependency topology reasoning into `docs/bob-reports/dependency-topology.pdf`.
- Export Bob cascade-risk reasoning into `docs/bob-reports/cascade-risk-report.pdf`.
- Save Codequake screenshots into `docs/screenshots/`.
- Record clips showing Bob reasoning flowing into the Codequake dashboard.

## Phase 3: Judge Polish

- Tighten demo story around "small weakness, large downstream shockwave."
- Add screenshot placeholders to README after captures exist.
- Build a short slide deck.
- Deploy to Vercel if possible.
- Record final demo narration around: "Codequake visualizes software shockwaves before they spread."

## IBM Bob Prompts To Run

1. Explain the architecture of this repository. Identify critical modules, shared infrastructure, and tight coupling.
2. Map dependency topology between changed files and downstream systems.
3. Identify architectural fault zones and explain why instability could form there.
4. Estimate cascade risk and shockwave propagation paths for this PR.
5. Recommend stability tests that target the highest-risk propagation paths.

## Submission Reminders

- Commit changes frequently.
- Push to GitHub.
- Export IBM Bob reports.
- Capture screenshots.
- Document IBM Bob usage.
- Update README.
- Record demo clips.
- Add architecture outputs to `docs/bob-reports/`.
