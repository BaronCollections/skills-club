import { createHash } from "node:crypto";

export type CrawlCadence = "hourly" | "six_hourly" | "daily";
export type CrawlSourceKind =
  | "github_search"
  | "github_repository"
  | "official_docs"
  | "curated_catalog";
export type MatchKind =
  | "SKILL.md"
  | "AGENTS.md"
  | ".cursorrules"
  | "mcp.json"
  | "README.md";

export type CrawlTarget = {
  id: string;
  label: string;
  kind: CrawlSourceKind;
  cadence: CrawlCadence;
  enabled: boolean;
  notes?: string;
  queries?: string[];
  repositories?: string[];
};

export type GitHubRepositorySignal = {
  externalId?: string;
  fullName: string;
  owner: string;
  name: string;
  url: string;
  description?: string;
  defaultBranch?: string;
  primaryLanguage?: string;
  license?: string;
  stars?: number;
  forks?: number;
  watchers?: number;
  openIssues?: number;
  pushedAt?: string;
  archived?: boolean;
};

export type GitHubSkillFileMatch = {
  sourceKind: "github_repository";
  matchedOn: MatchKind;
  repository: GitHubRepositorySignal;
  file: {
    path: string;
    url: string;
    sha?: string;
    content: string;
    discoveredAt: string;
  };
};

export type NormalizedSkillDraft = {
  slug: string;
  name: string;
  summary: string;
  platform: string;
  category: string;
  domain: string;
  complexity: string;
  provenance: string;
  riskLevel: string;
  sourceKind: "github_repository";
  sourcePath: string;
  sourceUrl: string;
  ownerName: string;
  installHint?: string;
  repository: GitHubRepositorySignal;
  version: {
    versionLabel: string;
    sourceSha?: string;
    contentHash: string;
    content: string;
    discoveredAt: string;
    upstreamUpdatedAt?: string;
  };
  classifications: Array<{
    dimension: string;
    value: string;
    confidence: number;
    sourceMethod: "heuristic";
  }>;
};

export const githubSearchTargets: CrawlTarget[] = [
  {
    id: "github-skill-md",
    label: "GitHub SKILL.md search",
    kind: "github_search",
    cadence: "hourly",
    enabled: true,
    queries: ['"SKILL.md" "Claude Code"', '"SKILL.md" "Codex"', '"SKILL.md" "Cursor"'],
    notes: "Highest-signal search seed for skill-native repositories.",
  },
  {
    id: "github-agents-md",
    label: "GitHub AGENTS.md search",
    kind: "github_search",
    cadence: "six_hourly",
    enabled: true,
    queries: ['"AGENTS.md" "skill"', '"AGENTS.md" "skills"'],
    notes: "Finds agent repos exposing reusable instructions with installable behavior.",
  },
  {
    id: "github-cursor-rules",
    label: "GitHub Cursor rules search",
    kind: "github_search",
    cadence: "daily",
    enabled: true,
    queries: ['".cursorrules"', '"cursor rules" "github"'],
    notes: "Secondary source for adjacent artifacts that can be normalized into skill-like records.",
  },
];

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getHeading(content: string) {
  const heading = content
    .split("\n")
    .find((line) => line.trim().startsWith("# "));

  return heading?.replace(/^#\s+/, "").trim();
}

function summarize(content: string) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .slice(0, 2);

  return lines.join(" ").slice(0, 220) || "Imported GitHub skill candidate.";
}

function inferPlatform(signal: string) {
  const value = signal.toLowerCase();

  if (value.includes("claude")) return "Claude Code";
  if (value.includes("cursor")) return "Cursor";
  if (value.includes("gemini")) return "Gemini CLI";
  if (value.includes("openai") || value.includes("codex")) return "OpenAI Codex";
  if (value.includes("mcp")) return "MCP";

  return "Agent Skills";
}

function inferCategory(signal: string) {
  const value = signal.toLowerCase();

  if (value.includes("review")) return "Code Review";
  if (value.includes("design")) return "Design Review";
  if (value.includes("ops") || value.includes("incident")) return "DevOps";
  if (value.includes("doc") || value.includes("launch")) return "Documentation";
  if (value.includes("analysis") || value.includes("metric") || value.includes("growth")) {
    return "Analysis";
  }

  return "Discovery";
}

function inferDomain(signal: string) {
  const value = signal.toLowerCase();

  if (value.includes("infra") || value.includes("ops")) return "Infrastructure";
  if (value.includes("design") || value.includes("ui")) return "UX";
  if (value.includes("growth") || value.includes("metric")) return "Growth";
  if (value.includes("launch") || value.includes("product")) return "Product";

  return "Developer Productivity";
}

function inferComplexity(content: string) {
  const lineCount = content.split("\n").length;

  if (lineCount > 30) return "Advanced";
  if (lineCount > 16) return "Intermediate";

  return "Beginner";
}

export function normalizeGitHubSkillMatch(
  match: GitHubSkillFileMatch,
): NormalizedSkillDraft {
  const signal = [match.repository.fullName, match.file.path, match.file.content].join(
    "\n",
  );
  const name =
    getHeading(match.file.content) ??
    match.repository.name
      .split(/[-_]/g)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  const contentHash = createHash("sha256")
    .update(match.file.content)
    .digest("hex");
  const platform = inferPlatform(signal);
  const category = inferCategory(signal);
  const domain = inferDomain(signal);
  const complexity = inferComplexity(match.file.content);

  return {
    slug: toSlug(`${match.repository.owner}-${name}`),
    name,
    summary: summarize(match.file.content),
    platform,
    category,
    domain,
    complexity,
    provenance: "Community",
    riskLevel: "Unknown",
    sourceKind: "github_repository",
    sourcePath: match.file.path,
    sourceUrl: match.file.url,
    ownerName: match.repository.owner,
    installHint: `Copy ${match.file.path} into your agent skills directory or install via the target platform tooling.`,
    repository: match.repository,
    version: {
      versionLabel: `${match.repository.defaultBranch ?? "main"}@${match.file.sha ?? "unknown"}`,
      sourceSha: match.file.sha,
      contentHash,
      content: match.file.content,
      discoveredAt: match.file.discoveredAt,
      upstreamUpdatedAt: match.repository.pushedAt,
    },
    classifications: [
      { dimension: "platform", value: platform, confidence: 0.85, sourceMethod: "heuristic" },
      { dimension: "category", value: category, confidence: 0.78, sourceMethod: "heuristic" },
      { dimension: "domain", value: domain, confidence: 0.74, sourceMethod: "heuristic" },
      { dimension: "complexity", value: complexity, confidence: 0.68, sourceMethod: "heuristic" },
    ],
  };
}

