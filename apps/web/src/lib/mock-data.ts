import { catalogSkills } from "@/lib/catalog-data";

export type SkillRecord = {
  slug: string;
  name: string;
  platform: string;
  category: string;
  domain: string;
  description: string;
  source: string;
  owner: string;
  stars: string;
  growth: string;
  score: string;
  updatedAt: string;
  complexity: string;
  license: string;
  whyItMatters: string;
  content: string;
};

export type RankingRow = {
  rank: number;
  name: string;
  platform: string;
  category: string;
  creator: string;
  heat: string;
  trend: string;
};

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return `${value}`;
}

function formatSignedPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${value}%`;
}

export const featuredSkills: SkillRecord[] = catalogSkills.map((skill) => ({
  slug: skill.slug,
  name: skill.name,
  platform: skill.platform,
  category: skill.category,
  domain: skill.domain,
  description: skill.summary,
  source: skill.repositoryFullName,
  owner: skill.repositoryOwner,
  stars: formatCompactNumber(skill.stars),
  growth: formatSignedPercent(skill.growthPercent),
  score: `${skill.heatScore}`,
  updatedAt: skill.updatedLabel,
  complexity: skill.complexity,
  license: skill.license,
  whyItMatters: skill.whyItMatters,
  content: skill.content,
}));

export const rankingModes = ["Overall", "Rising", "New", "Category", "Creators"];

export const rankingRows: RankingRow[] = [...catalogSkills]
  .sort((a, b) => b.heatScore - a.heatScore)
  .slice(0, 5)
  .map((skill, index) => ({
    rank: index + 1,
    name: skill.name,
    platform: skill.platform,
    category: skill.category,
    creator: skill.repositoryOwner,
    heat: `${Math.round(skill.heatScore * 105.6).toLocaleString("en-US")}`,
    trend: formatSignedPercent(Math.max(5, Math.round(skill.growthPercent * 0.5))),
  }));

export const selectedStudioSkills = featuredSkills.slice(0, 3);

export const studioDraft = `# Adaptive Review Grid

## Description
Adaptive Review Grid is a fusion skill that blends risk-first code review, repository mapping, and launch-quality explanations.

## Inputs
- pull request diff
- impacted files
- release context
- test coverage or absence notes

## Instructions
1. Detect risky behavioral changes before style issues.
2. Identify ownership zones and architectural blast radius.
3. Explain the likely user-facing impact in plain language.
4. Propose focused tests and fix paths.

## Output Contract
- blocking findings
- recommended tests
- release note draft
- follow-up worklist`;

export const workspaceCollections = [
  {
    title: "Team Baseline",
    description: "The shared set for code review, repo exploration, and deploy prep.",
    count: 18,
  },
  {
    title: "Ops Watch",
    description: "Incident and drift-oriented skills saved for weekly platform reviews.",
    count: 9,
  },
  {
    title: "Experiment Studio",
    description: "Growth and product research skills being tested for the next planning cycle.",
    count: 12,
  },
];

export const activityFeed = [
  "Generated a fusion draft from Signal Review + Repo Cartographer + Launch Dossier.",
  "Saved Growth Loop to Team Baseline.",
  "Tracked Signal Review moving into the top 3 rising list.",
  "Reopened yesterday's publish draft for Ops Pulse.",
];

export const sourceHighlights = [
  "GitHub first ingestion with provenance tracking",
  "Transparent heat score instead of opaque ranking",
  "User-owned token model for AI generation",
  "Ready for README generation and GitHub publish flow",
];

export function getSkillBySlug(slug: string) {
  return featuredSkills.find((skill) => skill.slug === slug);
}
