import "server-only";

import { db } from "@/lib/db";
import {
  featuredSkills as fallbackFeaturedSkills,
  getSkillBySlug as getFallbackSkillBySlug,
  rankingRows as fallbackRankingRows,
  type RankingRow,
  type SkillRecord,
} from "@/lib/mock-data";

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return `${value}`;
}

function formatSignedPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${Math.round(value)}%`;
}

function formatRelativeTime(date: Date | null | undefined) {
  if (!date) {
    return "unknown";
  }

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 1) {
    return "just now";
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toISOString().slice(0, 10);
}

function mapSkillRecord(record: {
  slug: string;
  name: string;
  summary: string;
  platform: string;
  category: string;
  domain: string;
  complexity: string;
  qualityScore: number;
  growthRate: number;
  lastIndexedAt: Date;
  ownerName: string;
  repository: {
    fullName: string;
    license: string | null;
    stars: number;
  };
  versions: Array<{
    content: string;
  }>;
}): SkillRecord {
  return {
    slug: record.slug,
    name: record.name,
    platform: record.platform,
    category: record.category,
    domain: record.domain,
    description: record.summary,
    source: record.repository.fullName,
    owner: record.ownerName,
    stars: formatCompactNumber(record.repository.stars),
    growth: formatSignedPercent(record.growthRate),
    score: `${Math.round(record.qualityScore || 0)}`,
    updatedAt: formatRelativeTime(record.lastIndexedAt),
    complexity: record.complexity,
    license: record.repository.license ?? "Unknown",
    whyItMatters: record.summary,
    content: record.versions[0]?.content ?? "Content not indexed yet.",
  };
}

export async function getFeaturedSkillRecords(): Promise<SkillRecord[]> {
  try {
    const skills = await db.skill.findMany({
      include: {
        repository: true,
        versions: {
          where: { isLatest: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: [{ heatScore: "desc" }, { updatedAt: "desc" }],
      take: 6,
    });

    if (!skills.length) {
      return fallbackFeaturedSkills;
    }

    return skills.map(mapSkillRecord);
  } catch {
    return fallbackFeaturedSkills;
  }
}

export async function getRankingRowRecords(): Promise<RankingRow[]> {
  try {
    const latestSnapshot = await db.rankingSnapshot.findFirst({
      where: {
        board: "overall",
        window: "weekly",
      },
      orderBy: { recordedAt: "desc" },
    });

    if (!latestSnapshot) {
      return fallbackRankingRows;
    }

    const rows = await db.rankingSnapshot.findMany({
      where: {
        board: "overall",
        window: "weekly",
        recordedAt: latestSnapshot.recordedAt,
      },
      include: {
        skill: {
          include: {
            repository: true,
          },
        },
      },
      orderBy: { rank: "asc" },
      take: 10,
    });

    if (!rows.length) {
      return fallbackRankingRows;
    }

    return rows.map((row) => ({
      rank: row.rank,
      name: row.skill.name,
      platform: row.skill.platform,
      category: row.skill.category,
      creator: row.skill.ownerName,
      heat: `${Math.round(row.score * 105.6).toLocaleString("en-US")}`,
      trend: formatSignedPercent(row.trendPct ?? row.skill.growthRate),
    }));
  } catch {
    return fallbackRankingRows;
  }
}

export async function getSkillDetailRecord(
  slug: string,
): Promise<SkillRecord | null> {
  try {
    const skill = await db.skill.findUnique({
      where: { slug },
      include: {
        repository: true,
        versions: {
          where: { isLatest: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!skill) {
      return getFallbackSkillBySlug(slug) ?? null;
    }

    return mapSkillRecord(skill);
  } catch {
    return getFallbackSkillBySlug(slug) ?? null;
  }
}

export async function getSkillSlugs(): Promise<string[]> {
  try {
    const skills = await db.skill.findMany({
      select: {
        slug: true,
      },
      orderBy: { heatScore: "desc" },
      take: 12,
    });

    if (!skills.length) {
      return fallbackFeaturedSkills.map((skill) => skill.slug);
    }

    return skills.map((skill) => skill.slug);
  } catch {
    return fallbackFeaturedSkills.map((skill) => skill.slug);
  }
}

