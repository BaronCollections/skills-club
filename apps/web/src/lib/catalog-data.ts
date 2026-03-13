export type CatalogSkillSeed = {
  slug: string;
  name: string;
  platform: string;
  category: string;
  domain: string;
  summary: string;
  repositoryExternalId: string;
  repositoryFullName: string;
  repositoryOwner: string;
  repositoryName: string;
  repositoryUrl: string;
  repositoryDescription: string;
  defaultBranch: string;
  primaryLanguage: string;
  sourcePath: string;
  sourceUrl: string;
  sourceSha: string;
  versionLabel: string;
  installHint: string;
  license: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  growthPercent: number;
  heatScore: number;
  qualityScore: number;
  complexity: string;
  provenance: string;
  riskLevel: string;
  updatedAt: string;
  indexedAt: string;
  updatedLabel: string;
  whyItMatters: string;
  content: string;
};

export const catalogSkills: CatalogSkillSeed[] = [
  {
    slug: "signal-review",
    name: "Signal Review",
    platform: "Claude Code",
    category: "Code Review",
    domain: "Full Stack",
    summary:
      "A review skill that prioritizes behavioral regressions, missing tests, and release risk before style issues.",
    repositoryExternalId: "100001",
    repositoryFullName: "BaronCollections/signal-review",
    repositoryOwner: "BaronCollections",
    repositoryName: "signal-review",
    repositoryUrl: "https://github.com/BaronCollections/signal-review",
    repositoryDescription:
      "Risk-first review workflows for code changes, release checks, and fix recommendations.",
    defaultBranch: "main",
    primaryLanguage: "Markdown",
    sourcePath: "skills/signal-review/SKILL.md",
    sourceUrl:
      "https://github.com/BaronCollections/signal-review/blob/main/skills/signal-review/SKILL.md",
    sourceSha: "sigrev001",
    versionLabel: "main@sigrev001",
    installHint: "Install into Claude Code or copy SKILL.md into your shared skills directory.",
    license: "MIT",
    stars: 1823,
    forks: 214,
    watchers: 91,
    openIssues: 12,
    growthPercent: 24,
    heatScore: 93,
    qualityScore: 92,
    complexity: "Advanced",
    provenance: "Community",
    riskLevel: "Low",
    updatedAt: "2026-03-13T07:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "2h ago",
    whyItMatters:
      "Turns generic review into a release-oriented workflow with risk summaries and patch-ready guidance.",
    content: `# Signal Review

## Purpose
Review code changes with a bias toward correctness, regressions, test gaps, and rollout safety.

## Workflow
1. Identify behavioral changes.
2. Detect missing coverage and brittle assumptions.
3. Separate critical findings from optional cleanup.
4. Produce an action-first review summary.`,
  },
  {
    slug: "repo-cartographer",
    name: "Repo Cartographer",
    platform: "Codex",
    category: "Discovery",
    domain: "Developer Productivity",
    summary:
      "Maps repository structure, risk hot spots, and likely ownership zones before deep implementation begins.",
    repositoryExternalId: "100002",
    repositoryFullName: "OpenAgentsLab/repo-cartographer",
    repositoryOwner: "OpenAgentsLab",
    repositoryName: "repo-cartographer",
    repositoryUrl: "https://github.com/OpenAgentsLab/repo-cartographer",
    repositoryDescription:
      "Repository scanning prompts and instructions for high-context implementation planning.",
    defaultBranch: "main",
    primaryLanguage: "TypeScript",
    sourcePath: "codex/skills/repo-cartographer/SKILL.md",
    sourceUrl:
      "https://github.com/OpenAgentsLab/repo-cartographer/blob/main/codex/skills/repo-cartographer/SKILL.md",
    sourceSha: "repomap002",
    versionLabel: "main@repomap002",
    installHint: "Use as a repository onboarding skill for Codex-style agents.",
    license: "Apache-2.0",
    stars: 1451,
    forks: 188,
    watchers: 74,
    openIssues: 8,
    growthPercent: 17,
    heatScore: 90,
    qualityScore: 89,
    complexity: "Intermediate",
    provenance: "Community",
    riskLevel: "Low",
    updatedAt: "2026-03-13T04:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "5h ago",
    whyItMatters:
      "Useful for onboarding into unknown codebases and for generating implementation plans with less thrashing.",
    content: `# Repo Cartographer

## Purpose
Build a fast mental model of an unfamiliar repository.

## Output
- system map
- entry points
- hot paths
- likely ownership areas
- hidden migration risks`,
  },
  {
    slug: "launch-dossier",
    name: "Launch Dossier",
    platform: "Cursor",
    category: "Documentation",
    domain: "Product",
    summary:
      "Generates investor-style launch briefs, user-facing release notes, and changelog-ready narratives from raw specs.",
    repositoryExternalId: "100003",
    repositoryFullName: "StudioAtlas/launch-dossier",
    repositoryOwner: "StudioAtlas",
    repositoryName: "launch-dossier",
    repositoryUrl: "https://github.com/StudioAtlas/launch-dossier",
    repositoryDescription:
      "Launch-oriented communication skills for product, engineering, and GTM teams.",
    defaultBranch: "main",
    primaryLanguage: "Markdown",
    sourcePath: ".cursor/skills/launch-dossier/SKILL.md",
    sourceUrl:
      "https://github.com/StudioAtlas/launch-dossier/blob/main/.cursor/skills/launch-dossier/SKILL.md",
    sourceSha: "launch003",
    versionLabel: "main@launch003",
    installHint: "Works well as a post-release writing and announcement skill.",
    license: "MIT",
    stars: 980,
    forks: 95,
    watchers: 42,
    openIssues: 5,
    growthPercent: 31,
    heatScore: 88,
    qualityScore: 87,
    complexity: "Beginner",
    provenance: "Community",
    riskLevel: "Low",
    updatedAt: "2026-03-12T09:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "1d ago",
    whyItMatters:
      "Bridges product, engineering, and marketing by turning internal changes into publishable narratives.",
    content: `# Launch Dossier

## Goal
Turn technical updates into launch assets that are useful for users, internal stakeholders, and changelogs.

## Deliverables
- release notes
- FAQ
- rollout memo
- announcement draft`,
  },
  {
    slug: "ops-pulse",
    name: "Ops Pulse",
    platform: "Agent Skills",
    category: "DevOps",
    domain: "Infrastructure",
    summary:
      "Combines incident summaries, dependency drift checks, and runbook hints into a daily operational snapshot.",
    repositoryExternalId: "100004",
    repositoryFullName: "InfraGuild/ops-pulse",
    repositoryOwner: "InfraGuild",
    repositoryName: "ops-pulse",
    repositoryUrl: "https://github.com/InfraGuild/ops-pulse",
    repositoryDescription:
      "Operational reporting and drift-detection skills for platform and SRE workflows.",
    defaultBranch: "main",
    primaryLanguage: "YAML",
    sourcePath: "skills/ops-pulse/AGENTS.md",
    sourceUrl:
      "https://github.com/InfraGuild/ops-pulse/blob/main/skills/ops-pulse/AGENTS.md",
    sourceSha: "opspulse004",
    versionLabel: "main@opspulse004",
    installHint: "Schedule as a daily digest skill or combine with incident tooling.",
    license: "BSD-3-Clause",
    stars: 1110,
    forks: 142,
    watchers: 55,
    openIssues: 9,
    growthPercent: 12,
    heatScore: 86,
    qualityScore: 85,
    complexity: "Advanced",
    provenance: "Community",
    riskLevel: "Medium",
    updatedAt: "2026-03-13T01:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "8h ago",
    whyItMatters:
      "Useful as a reusable automation skill for engineering managers and platform teams monitoring service health.",
    content: `# Ops Pulse

## Mission
Summarize operational drift, incident posture, and maintenance recommendations.

## Cadence
Daily, with optional hourly checks for critical services.`,
  },
  {
    slug: "growth-loop",
    name: "Growth Loop",
    platform: "Gemini CLI",
    category: "Analysis",
    domain: "Growth",
    summary:
      "Builds experiment backlogs, funnel hypotheses, and measurement plans from product metrics and goals.",
    repositoryExternalId: "100005",
    repositoryFullName: "NorthstarWorks/growth-loop",
    repositoryOwner: "NorthstarWorks",
    repositoryName: "growth-loop",
    repositoryUrl: "https://github.com/NorthstarWorks/growth-loop",
    repositoryDescription:
      "Growth, analytics, and experiment-planning skills built for product teams.",
    defaultBranch: "main",
    primaryLanguage: "Markdown",
    sourcePath: "skills/growth-loop/SKILL.md",
    sourceUrl:
      "https://github.com/NorthstarWorks/growth-loop/blob/main/skills/growth-loop/SKILL.md",
    sourceSha: "growth005",
    versionLabel: "main@growth005",
    installHint: "Best paired with analytics context and product metrics snapshots.",
    license: "MIT",
    stars: 760,
    forks: 80,
    watchers: 33,
    openIssues: 4,
    growthPercent: 42,
    heatScore: 84,
    qualityScore: 83,
    complexity: "Intermediate",
    provenance: "Community",
    riskLevel: "Low",
    updatedAt: "2026-03-13T06:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "3h ago",
    whyItMatters:
      "Shows how AI skills are expanding beyond coding into planning, experimentation, and business workflows.",
    content: `# Growth Loop

## Function
Translate goals and metrics into prioritized experiments with expected signal quality.

## Inputs
- north-star metric
- funnel data
- constraints
- target audience`,
  },
  {
    slug: "design-critic",
    name: "Design Critic",
    platform: "OpenAI Codex",
    category: "Design Review",
    domain: "UX",
    summary:
      "Reviews interface layouts for hierarchy, clarity, motion intent, and consistency with an established visual system.",
    repositoryExternalId: "100006",
    repositoryFullName: "CanvasForge/design-critic",
    repositoryOwner: "CanvasForge",
    repositoryName: "design-critic",
    repositoryUrl: "https://github.com/CanvasForge/design-critic",
    repositoryDescription:
      "Design critique and interaction review skills for teams shipping UI-heavy products.",
    defaultBranch: "main",
    primaryLanguage: "Markdown",
    sourcePath: "openai/skills/design-critic/SKILL.md",
    sourceUrl:
      "https://github.com/CanvasForge/design-critic/blob/main/openai/skills/design-critic/SKILL.md",
    sourceSha: "design006",
    versionLabel: "main@design006",
    installHint: "Use when UI quality, hierarchy, and motion choices need a sharper review pass.",
    license: "MIT",
    stars: 620,
    forks: 70,
    watchers: 25,
    openIssues: 6,
    growthPercent: 19,
    heatScore: 82,
    qualityScore: 81,
    complexity: "Intermediate",
    provenance: "Community",
    riskLevel: "Low",
    updatedAt: "2026-03-12T21:00:00.000Z",
    indexedAt: "2026-03-13T09:00:00.000Z",
    updatedLabel: "12h ago",
    whyItMatters:
      "Useful for product teams that want stronger UI critique than generic accessibility-only checks.",
    content: `# Design Critic

## Scope
Audit layout hierarchy, content flow, and interaction intent.

## Output
- critique notes
- priority-ranked changes
- rationale tied to user outcomes`,
  },
];

